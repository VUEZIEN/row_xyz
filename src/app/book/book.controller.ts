import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto, UpdateBookDto, findAll } from './book.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { JwtGuard } from '../auth/auth.guard';
@UseGuards(JwtGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('create')
  async createBool(@Body() addBookDto: BookDto) {
    return this.bookService.Create(addBookDto);
  }

  @Get('list')
  async findAll(@Pagination() query: findAll) {
    return this.bookService.findAll(query);
  }

  @Get('detail/:id')
  findOneBook(@Param('id') id: string) {
    return this.bookService.getDetail(Number(id));
  }

  @Put('update/:id')
  updateKategori(
    @Param('id') id: string,
    @Body() updateProdukDto: UpdateBookDto,
  ) {
    return this.bookService.updateBook(Number(id), updateProdukDto);
  }
  @Delete('delete/:id')
  deleteKategori(@Param('id') id: string) {
    return this.bookService.deleteBook(Number(id));
  }

  @Put(':id/restore')
  async restoreBook(@Param('id') id: number) {
    return this.bookService.restoreBook(id);
  }
}
