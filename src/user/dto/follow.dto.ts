import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class FollowDto {
    @IsNotEmpty()
    @IsInt()
    readonly followId: number;
}
