import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FollowsService } from 'src/follows/follows.service';

@Module({
    controllers: [UserController],
    providers: [UserService,FollowsService],
})
export class UserModule {

}
