import { BaseResponsePagination, BaseResponseSuccess } from "@/lib/axiosClient";

interface Book {
  id?: number;
  judul: string;
  cover: string;
  tahun_terbit: number;
  harga: number;
  penulis: string;
  deskripsi: string;
  is_deleted?: any;
}

export interface BookList extends BaseResponsePagination {
  data: Book[];
}

export interface BookCreateResponse {
  status: string;
  message: string;
  data?: Book;
}

export interface BookListFilter extends Partial<Book> {
  keyword?: string;
  page: number;
  pageSize: number;
}

export interface BookDetailResponse extends Book {}

export interface BookUpdateResponse {
  status: string;
  message: string;
  data?: Book;
}

export interface deleteBook extends Pick<Book, "is_deleted"> {}
export interface RestoreBook extends Pick<Book, "is_deleted"> {}

export interface UpdateBook
  extends Pick<
    Book,
    "judul" | "cover" | "tahun_terbit" | "harga" | "penulis" | "deskripsi"
  > {
  file?: File;
}

export interface CreateBook
  extends Pick<
    Book,
    "judul" | "cover" | "tahun_terbit" | "harga" | "penulis" | "deskripsi"
  > {
  file?: File;
}
