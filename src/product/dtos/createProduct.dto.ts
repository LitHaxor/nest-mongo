import { IsArray, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateProductDto {
    @ApiProperty({
        default: "Product Title",
    })
    @IsString()
    title: string;

    @ApiProperty({
        default: "http://",
    })
    @IsString()
    image: string;

    @ApiProperty({
        default: "['this is one of the best product']",
    })
    @IsArray()
    description: string[];

    @ApiProperty({
        default: 400,
    })
    @IsNumber()
    price: number;
}
