import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterDTO } from 'src/dto/register.dto';
import { LoginDTO } from 'src/dto/login.dto';
import { UserDTO } from 'src/dto/user.dto';
import { Enable2FAType } from 'src/constants';
import { JwtAuthGaurd } from './jwt.guard';
import { ValidateTokenDTO } from 'src/dto/ValidateTokenDTO';
import { UpdateResult } from 'typeorm';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }


    @Post('login')
    async login(
        @Body()
        loginDTO: LoginDTO,
    ) {
        const token = await this.authService.login(loginDTO);

        return token;
    }

    @Get('enable-2fa')
    @UseGuards(JwtAuthGaurd)
    enable2FA(
        @Request()
        req,
    ): Promise<Enable2FAType> {
        console.log(req.user);
        return this.authService.enable2FA(req.user.userId);
    }

    @Get("code-2fa")
    @UseGuards(JwtAuthGaurd)
    getOtpCode(
        @Request()
        req
    ) {
        console.log(req.user);
        return this.authService.sendOTP(req.user.userId);
    }

    @Post('validate-2fa')
    @UseGuards(JwtAuthGaurd)
    validate2FA(
        @Request()
        req,
        @Body()
        ValidateTokenDTO: ValidateTokenDTO,
    ): Promise<{ verified: boolean }> {
        return this.authService.validate2FAToken(
            req.user.userId,
            ValidateTokenDTO.token,
        );
    }



    @Get('disable-2fa')
    @UseGuards(JwtAuthGaurd)
    disable2FA(
        @Request()
        req,
    ): Promise<UpdateResult> {
        return this.authService.disable2FA(req.user.userId);
    }
}
