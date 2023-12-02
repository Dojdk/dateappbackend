import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signUp(dto: SignUpDto) {
        const password = await argon.hash(dto.password);
        try {
            const emailUsed = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            });
            if (emailUsed) {
                throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);
            }
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password,
                    username: dto.username,
                },
            });

            return user;
        } catch (error) {
            throw error;
        }
    }

    async signIn(dto: SignInDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            });
            if (!user) {
                throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
            }

            const validPassword = await argon.verify(user.password, dto.password);

            if (!validPassword) {
                throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
            }

            return user;
        } catch (error) {
            throw error;
        }
    }
}
