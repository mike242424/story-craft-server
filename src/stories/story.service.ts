import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { CreateStoryDto } from './dtos/create-story.dto';
import { UpdateStoryDto } from './dtos/update-story.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
  ) {}

  findAll() {
    return this.storyRepository.find();
  }

  async findOne(id: string) {
    const item = await this.storyRepository.findOne({ where: { id: +id } });

    if (!item) {
      throw new NotFoundException(`Item not found`);
    }
    return item;
  }

  create(createStoryDto: CreateStoryDto) {
    createStoryDto.text += `\n`;
    const item = this.storyRepository.create(createStoryDto);
    return this.storyRepository.save(item);
  }

  async update(id: string, updateStoryDto: UpdateStoryDto) {
    const story = await this.storyRepository.findOne({ where: { id: +id } });

    if (!story) {
      throw new NotFoundException(`Story not found`);
    }

    if (updateStoryDto.text) {
      story.text += ` \n${updateStoryDto.text}\n`;
    }

    return this.storyRepository.save(story);
  }

  async remove(id: string) {
    const story = await this.findOne(id);
    return this.storyRepository.remove(story);
  }
}
