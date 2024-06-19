import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { ApiService } from './api.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGaurd } from 'src/auth/jwt.guard';

@Controller('api')
export class ApiController {
    constructor(private apiService: ApiService) {

    }

    @Post("addUser")
    @UseGuards(JwtAuthGaurd)
    AddUser(@Body() userDTO: UserDTO) {
        return this.apiService.addUser(userDTO);
    }

    @Put("updateUser")
    @UseGuards(JwtAuthGaurd)
    UpdateUser(@Body() userDTO: UserDTO) {

        return this.apiService.updateUser(userDTO)
    }


    @Get("users")
    // @UseGuards(AuthGuard('bearer'))
    @UseGuards(JwtAuthGaurd)
    getAllUser() {
        return this.apiService.getAll();
    }

    @Delete("RemoveUser")
    @UseGuards(JwtAuthGaurd)
    RemoveUser(@Body() userDTO: UserDTO) {
        return this.apiService.removeUser(userDTO.id);
    }

}
