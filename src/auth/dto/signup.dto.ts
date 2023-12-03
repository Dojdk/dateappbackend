import {
  IsDate,
    IsDateString,
    IsEmail,
    IsISO8601,
    IsNotEmpty,
    IsString,
    Matches,
    Max,
    MinLength,
  } from 'class-validator';
  
  export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?])(?!.*\s).{8,}$/,{message:'Password too weak'})
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    username: string;

    @IsISO8601()
    @IsNotEmpty()
    dateOfBirth: Date;
  }