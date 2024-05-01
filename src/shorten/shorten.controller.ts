import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortenService } from './shorten.service';
import { CreateShortenDto } from './dto/create-shorten.dto';
import { UpdateShortenDto } from './dto/update-shorten.dto';

@Controller('shorten')
export class ShortenController {
  constructor(private readonly shortenService: ShortenService) {}

  @Post()
  create(@Body() createShortenDto: CreateShortenDto) {
    return this.shortenService.create(createShortenDto);
  }

  @Get()
  findAll() {
    return this.shortenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShortenDto: UpdateShortenDto) {
    return this.shortenService.update(+id, updateShortenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortenService.remove(+id);
  }
}
