import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateShortenDto } from './dto/create-shorten.dto';
import { UpdateShortenDto } from './dto/update-shorten.dto';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class ShortenService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  async create(createShortenDto: CreateShortenDto) {
    const { longUrl, userId } = createShortenDto;
    const shortCode = await this.generateUniqueShortCode();

    const data: any = {
      longUrl,
      shortCode,
    };

    if (userId) {
      data.userId = userId;
    }

    try {
      const newUrl = await this.uRLs.create({
        data,
      });
      return newUrl;
    } catch (error) {
      this.handleDbError(error);
    }
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

  private generateRandomString() {
    const ALPHABET =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const numCharShort = 7;
    let result = '';

    for (let i = 0; i < numCharShort; i++) {
      const randomIndex = Math.floor(Math.random() * (ALPHABET.length - 1));
      result += ALPHABET[randomIndex];
    }

    return result;
  }
  private async generateUniqueShortCode() {
    let shortCode: string;
    let isUnique = false;

    while (!isUnique) {
      shortCode = this.generateRandomString();

      const existingUrl = await this.uRLs.findUnique({
        where: {
          shortCode: shortCode,
        },
      });

      if (!existingUrl) {
        isUnique = true;
      }
    }

    return shortCode;
  }

  private handleDbError(e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2003') {
        throw new NotFoundException(`Not User`);
      }
    }
  }

  async redirectUrl(shortCode: string) {
    const url = await this.uRLs.findUnique({
      where: {
        shortCode: shortCode,
      },
    });

    if (!url) {
      throw new NotFoundException(`Url Not Found`);
    }

    delete url.userId;

    return url;
  }
}
