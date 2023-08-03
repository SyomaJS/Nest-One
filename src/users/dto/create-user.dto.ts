import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'user1', description: 'Foydalanuvchi nomi' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'user1@mail.uz',
    description: 'Foydalanuvchi pochtasi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Uzbek1$t0n',
    description: 'Foydalanuvchi paroli',
  })
  // @MinLength(6)
  @IsStrongPassword({ minLength: 6 })
  password: string;
}
