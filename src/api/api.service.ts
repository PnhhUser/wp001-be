import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ApiService {
    constructor(
        private userService: UserService
    ) { }

    async addUser(userDTO: UserDTO) {

        const salt = await bcrypt.genSalt();
        const user = await this.userService.findByEmail(userDTO.email);

        if (user) {
            throw new UnauthorizedException("This user already exists");
        }


        userDTO.password = await bcrypt.hash(userDTO.password, salt);

        return this.userService.create(userDTO);
    }

    async updateUser(userDTO: UserDTO) {
        const salt = await bcrypt.genSalt();
        userDTO.password = await bcrypt.hash(userDTO.password, salt);

        return this.userService.update(userDTO);
    }

    async getAll() {
        return this.userService.getAll();
    }

    async removeUser(id: number) {
        return this.userService.remove(id)
    }


}
