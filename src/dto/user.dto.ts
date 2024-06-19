import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDTO {

    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    phonenumber: string;

    @IsNotEmpty()
    role: number;

    @IsNotEmpty()
    createDate: Date;

    @IsNotEmpty()
    updateDate: Date;

    @IsNotEmpty()
    isDelete: boolean;

}
