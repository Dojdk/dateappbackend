import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowsService {
    constructor(private prisma: PrismaService) { }

    async followUser(userId: number, followId: number) {
        try {
            const followExists = await this.prisma.follows.findFirst({
                where: {
                    followedById: userId,
                    followingId: followId,
                }
            });

            if (followExists) {
                throw new BadRequestException('Already following');
            }

            const follow = await this.prisma.follows.create({
                data: {
                    followedBy: {
                        connect: { id: userId },
                    },
                    following: {
                        connect: { id: followId },
                    },
                },
            });
            return follow;
        } catch (err) {
            throw err;
        }
    }

    async unfollowUser(userId: number, followId: number){
        try{
            const followExists = await this.prisma.follows.findFirst({
                where: {
                    followedById: userId,
                    followingId: followId,
                }
            });

            if (!followExists) {
                throw new BadRequestException('Already unfollowed');
            }

            const follow = await this.prisma.follows.delete({
                where: {
                    followingId_followedById: {
                        followedById: userId,
                        followingId: followId,
                    },
                },
            });

            return follow;
        }catch(error){
            throw error;
        }
    }

    async getFollowers(userId: number) {
        try {
            const followers = await this.prisma.follows.findMany({
                where: {
                    followingId: userId,
                },
                include: {
                    followedBy: true,
                },
            });
            return followers;
        } catch (err) {
            throw err;
        }
    }

    async getFollowing(userId: number) {
        try {
            const following = await this.prisma.follows.findMany({
                where: {
                    followedById: userId,
                },
                include: {
                    following: true,
                },
            });
            return following;
        } catch (err) {
            throw err;
        }
    }
}
