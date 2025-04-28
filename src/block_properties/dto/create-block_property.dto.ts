import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBlockPropertyDto {
  @ApiProperty({ example: 1, description: "Block id", required: true })
  @IsNotEmpty()
  @IsNumber()
  blockId: number;

  @ApiProperty({ example: 1, description: "Property id", required: true })
  @IsNotEmpty()
  @IsNumber()
  propertyId: number;

  @ApiProperty({
    example: "Assalamu alaykum",
    description:
      "Aytaylik 1 id'li block'ning type text, 2'idli property'ning nomi content. \
    Shu block'idni blockId'ga property'idni propertyId'ga yozamiz va value'siga text'ning content'ini yozamiz",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  value: string;
}
