import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  Max,
  IsObject,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import { User } from '../auth/auth.entity';
import { Type } from 'class-transformer';

export class BookDto {
  @IsNotEmpty()
  @IsString()
  judul: string;

  @IsNotEmpty()
  @IsString()
  cover: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(2010)
  @Max(2024)
  tahun_terbit: number;

  @IsNotEmpty()
  @IsNumber()
  harga: number;

  @IsNotEmpty()
  @IsString()
  penulis: string;

  @IsNotEmpty()
  @IsString()
  deskripsi: string;
}

export class UpdateBookDto {
  @IsNotEmpty()
  @IsString()
  judul: string;

  @IsNotEmpty()
  @IsString()
  cover: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(2010)
  @Max(2024)
  tahun_terbit: number;

  @IsNotEmpty()
  @IsNumber()
  harga: number;

  @IsNotEmpty()
  @IsString()
  penulis: string;

  @IsNotEmpty()
  @IsString()
  deskripsi: string;
}

export class DeleteDto extends User {
  @IsObject()
  @IsOptional()
  delete_by: { id: number };
}

export class findAll extends PageRequestDto {
  @IsString()
  @IsOptional()
  judul: string;

  @IsString()
  @IsOptional()
  cover: string;

  @IsString()
  @IsOptional()
  penulis: string;

  @IsString()
  @IsOptional()
  deskripsi: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  harga: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tahun_terbit: number;

  @IsString()
  @IsOptional()
  keyword: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  is_deleted: boolean;
}
