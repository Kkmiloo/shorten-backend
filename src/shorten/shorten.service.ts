import { Injectable } from '@nestjs/common';
import { CreateShortenDto } from './dto/create-shorten.dto';
import { UpdateShortenDto } from './dto/update-shorten.dto';

@Injectable()
export class ShortenService {
  create(createShortenDto: CreateShortenDto) {
    return 'This action adds a new shorten';
  }

  findAll() {
    return `This action returns all shorten`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shorten`;
  }

  update(id: number, updateShortenDto: UpdateShortenDto) {
    return `This action updates a #${id} shorten`;
  }

  remove(id: number) {
    return `This action removes a #${id} shorten`;
  }
}
