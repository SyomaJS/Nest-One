import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { Post } from './models/post.model';
import { FilesModule } from '../files/files.module';

@Module({
  imports:[SequelizeModule.forFeature([User,Post]),FilesModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports:[PostsService]
})
export class PostsModule {}
