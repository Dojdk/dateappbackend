import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    @Get('me')
    getUser(@Request() req) {
        console.log(req.userId);
        return req.user;
    }
    
}
