import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from 'src/entities/user.entity';
import { Enable2FAType } from 'src/constants';

import * as speakeasy from 'speakeasy';
import { UpdateResult } from 'typeorm';
import { log } from 'console';



@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async enable2FA(userId: number): Promise<Enable2FAType> {
        const user = await this.userService.getById(userId); //1
        if (user.enable2FA) {
            //2
            return { secret: user.twoFASecret };
        }
        const secret = speakeasy.generateSecret(); //3
        console.log("auth service: ", secret);
        user.twoFASecret = secret.base32; //4
        await this.userService.updateSecretKey(user.id, user.twoFASecret); //5

        return {
            secret: user.twoFASecret,
        }; //6
    }

    async sendOTP(userId: number): Promise<{ code: string }> {
        const user = await this.userService.getById(userId);

        const code = speakeasy.totp({
            secret: user.twoFASecret,
            encoding: 'base32',
        });

        return {
            code: code
        }
    }

    async validate2FAToken(
        userId: number,
        token: string,
    ): Promise<{ verified: boolean }> {
        try {
            // find the user on the based on id
            const user = await this.userService.getById(userId);


            // verify the secret with token by calling the speakeasy verify method
            const verified = speakeasy.totp.verify({
                secret: user.twoFASecret,
                token: token,
                encoding: 'base32',
                step: 30
            });

            // if validated then sends the json web token in the response
            if (verified) {
                return { verified: true };
            } else {
                return { verified: false };
            }
        } catch (err) {
            throw new UnauthorizedException('Error verifying token');
        }
    }

    async disable2FA(userId: number): Promise<UpdateResult> {
        return this.userService.disable2FA(userId);
    }


    async validateApiKey(apiKey: string): Promise<UserEntity> {
        return this.userService.findByApiKey(apiKey);
    }

    async login(loginDTO: LoginDTO): Promise<{ accessToken: string } | { validate2FA: string; message: string }> {

        const user = await this.userService.findByEmail(loginDTO.email);

        if (!user) {
            throw new UnauthorizedException('Could not find user');
        }


        const passwordMatched = await bcrypt.compare(
            loginDTO.password,
            user.password,
        );

        if (passwordMatched) {
            delete user.password;
            const payload = {
                email: user.email,
                sub: user.id,
            };


            if (user.enable2FA && user.twoFASecret) {
                //1.
                // sends the validateToken request link
                // else otherwise sends the json web token in the response
                return {
                    //2.
                    validate2FA: 'http://localhost:3000/auth/validate-2fa',
                    message:
                        'Please sends the one time password/token from your Google Authenticator App',
                };
            }

            return {
                accessToken: this.jwtService.sign(payload)
            };
        } else {
            throw new UnauthorizedException('Password does not match');
        }
    }
}
