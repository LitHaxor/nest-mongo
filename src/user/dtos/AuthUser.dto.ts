import { IsBoolean, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class LoginDto {
    @ApiProperty({
        default: "username",
    })
    @IsString()
    username: string;

    @ApiProperty({
        default: "password",
    })
    @IsString()
    password: string;
}

export class RegisterDto {
    @ApiProperty({
        default: "username",
    })
    @IsString()
    username: string;

    @ApiProperty({
        default: "password",
    })
    @IsString()
    password: string;

    @ApiProperty({
        default: true,
    })
    @IsBoolean()
    seller: boolean;
}
