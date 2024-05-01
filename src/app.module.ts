import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ShortenModule } from './shorten/shorten.module';

@Module({
  imports: [AuthModule, ShortenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
