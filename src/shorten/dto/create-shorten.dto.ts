import { IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';

export class CreateShortenDto {
  @IsString()
  @IsUrl()
  longUrl: string;

  @IsOptional()
  @IsUUID()
  userId?: string;
}
