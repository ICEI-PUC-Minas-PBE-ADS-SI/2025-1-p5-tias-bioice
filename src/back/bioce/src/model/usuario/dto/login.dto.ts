import { IsString, MaxLength } from "class-validator";

export class LoginDTO {
    @IsString()
    @MaxLength(255)
    email: string;

    @IsString()
    @MaxLength(255)
    senha: string;
}