import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async signUp(dto: SignUpDto) {
        const password = await argon.hash(dto.password);
        try {
            const emailUsed = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            });
            if (emailUsed) {
                throw new BadRequestException('Email already used');
            }
            const date= new Date(dto.dateOfBirth);
            const age = new Date().getFullYear() - date.getFullYear();
            if (age < 18) {
               
                throw new BadRequestException('You must be at least 18 years old');
            };

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password,
                    username: dto.username,
                    dateOfBirth: date,
                },
            });

            return this.signToken(user.id);
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

            return this.signToken(user.id);
        } catch (error) {
            throw error;
        }
    }
    async signToken(userId: number,): Promise<{ access_token: string }> {
        const payload = { sub: userId };
        const accessToken = this.jwtService.sign(payload);
        return { access_token: accessToken };
    };
}
