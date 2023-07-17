import { IsString } from 'class-validator';

export class CreateStoryDto {
  @IsString()
  title: string;

  @IsString()
  text: string;
}
