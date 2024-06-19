import {
    IsEmail,
    IsEmpty,
    IsNotEmpty,
    MaxLength,
    MinLength
} from "class-validator";

export class LoginDTO {

    @IsNotEmpty()
    @IsEmail({}, { message: "Invalid email" })
    email: string;


    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

}
