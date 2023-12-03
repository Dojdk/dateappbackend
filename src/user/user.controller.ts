import { Controller, Get, Post, UseGuards, Request, Patch, Body, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { FollowDto } from './dto/follow.dto';
import { UserService } from './user.service';
import { FollowsService } from 'src/follows/follows.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private UserService: UserService,
        private FollowsService: FollowsService,
    ) { }
    @Get('me')
    getUser(@Request() req: any) {
        return req.user;
    }

    @Get('all')
    getAllUsers() {
        return this.UserService.getAllUsers();
    }

    @Get('posts')
    getUserPosts(@Request() req: any) {
        return this.UserService.getUserPosts(req.user.id);
    }

    @Post('follow')
    followUser(@Request() req: any, @Body() dto: FollowDto) {
        return this.FollowsService.followUser(req.user.id, dto.followId);
    }

    @Delete('unfollow')
    unfollowUser(@Request() req: any, @Body() dto: FollowDto) {
        return this.FollowsService.unfollowUser(req.user.id, dto.followId);

    }

    @Get('followers')
    getFollowers(@Request() req: any) {
        return this.FollowsService.getFollowers(req.user.id);
    }

    @Get('following')
    getFollowing(@Request() req: any) {
        return this.FollowsService.getFollowing(req.user.id);
    }
}
