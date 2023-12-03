import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
    ) { }

    async getAllUsers() {
        return await this.prisma.user.findMany();
    }

    async getUserPosts(userId: number) {
        return await this.prisma.post.findMany({
            where: {
                authorId: userId,
            }
        });
    }

    


}
