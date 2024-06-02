import {
  BadRequestException,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  constructor(private readonly jtwService: JwtService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...data } = createUserDto;

      const user = await this.user.create({
        data: { ...data, password: bcrypt.hashSync(password, 10) },
      });

      delete user.password;
      delete user.active;
      delete user.token;

      return { ...user, token: this.getJwtToken({ email: user.email }) };
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.user.findFirst({
      where: { email },
      select: {
        password: true,
        active: true,
        email: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException(`Not Valid Credential (email)`);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException(`Not Valid Credential (password)`);
    }
    delete user.password;
    delete user.active;

    return { ...user, token: this.getJwtToken({ email: user.email }) };
  }

  findOneByEmail(email: string) {
    const user = this.user.findFirst({ where: { email } });
    return user;
  }

  findAll() {
    const users = this.user.findMany({ include: { urls: true } });
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  handleDbErrors(e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log(e.meta);
        throw new BadRequestException(`The ${e.meta.target} already exists`);
      }
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jtwService.sign(payload);

    return token;
  }
}
