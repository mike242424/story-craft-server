import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoryModule } from './stories/story.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    StoryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      synchronize: false,
      ssl: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
