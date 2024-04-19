import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookDto, UpdateBookDto, findAll } from './book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Like, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import {
  ResponsePagination,
  ResponseSuccess,
} from 'src/interface/response.interface';
import BaseResponse from 'src/utils/response/base.response';
@Injectable()
export class BookService extends BaseResponse {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @Inject(REQUEST) private req: any,
  ) {
    super();
  }
  async findAll(query: findAll): Promise<ResponsePagination> {
    const {
      page,
      pageSize,
      judul,
      tahun_terbit,
      harga,
      penulis,
      deskripsi,
      keyword,
      is_deleted,
    } = query;

    const filterQuery: { [key: string]: any } = {};
    const filterKeyword = [];

    if (keyword) {
      filterKeyword.push(
        { judul: Like(`%${keyword}%`) },
        { tahun_terbit: Like(`%${keyword}%`) },
        { harga: Like(`%${keyword}%`) },
        { penulis: Like(`%${keyword}%`) },
        { deskripsi: Like(`%${keyword}%`) },
      );
    } else {
      if (judul) filterQuery.judul = Like(`%${judul}%`);
      if (tahun_terbit) filterQuery.tahun_terbit = tahun_terbit;
      if (harga) filterQuery.harga = harga;
      if (penulis) filterQuery.penulis = Like(`%${penulis}%`);
      if (deskripsi) filterQuery.deskripsi = Like(`%${deskripsi}%`);
      if (is_deleted !== undefined) filterQuery.is_deleted = is_deleted;
    }

    const total = await this.bookRepository.count({
      where: keyword ? filterKeyword : filterQuery,
    });

    const result = await this.bookRepository.find({
      where: keyword ? filterKeyword : filterQuery,
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
      select: [
        'id',
        'judul',
        'cover',
        'tahun_terbit',
        'harga',
        'penulis',
        'deskripsi',
        'is_deleted',
      ],
    });

    return this._pagination('oke', result, total, page, pageSize);
  }

  async Create(payload: BookDto): Promise<ResponseSuccess> {
    try {
      if (!payload) {
        throw new BadRequestException('Semua kolom harus diisi');
      }
      if (payload.tahun_terbit < 2010 || payload.tahun_terbit > 2024) {
        throw new BadRequestException(
          'Tahun terbit harus di antara 2010 dan 2024',
        );
      }
      await this.bookRepository.save(payload);

      return this._success('Buku berhasil ditambahkan');
    } catch (error) {
      throw new BadRequestException('Data tidak valid');
    }
  }

  async getDetail(id: number): Promise<ResponseSuccess> {
    const detailBook = await this.bookRepository.findOne({
      where: {
        id,
      },
    });

    if (detailBook === null) {
      throw new NotFoundException(`Produk dengan id ${id} tidak ditemukan`);
    }
    return this._success('Berhasil Mendapatkan Buku', detailBook);
  }

  async updateBook(
    id: number,
    updateProdukDto: UpdateBookDto,
  ): Promise<ResponseSuccess> {
    const check = await this.bookRepository.findOne({
      where: {
        id,
      },
    });

    if (!check)
      throw new NotFoundException(`buku deengan id ${id} tidak ditemukan`);

    const update = await this.bookRepository.save({
      ...updateProdukDto,
      id: id,
    });

    return this._success('Berhasil MengUpdate Data', update);
  }

  async deleteBook(id: number): Promise<ResponseSuccess> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Buku tidak ditemukan');
    }
    book.is_deleted = true;
    await this.bookRepository.save(book);
    return this._success('delete buku berhasil');
  }

  async restoreBook(id: number): Promise<ResponseSuccess> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Buku tidak ditemukan');
    }
    book.is_deleted = false;
    book.delete_by = null;
    await this.bookRepository.save(book);
    return this._success('Pemulihan buku berhasil');
  }
}
