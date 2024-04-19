import useAxiosAuth from "@/hook/useAuthAxios";
import { usePagination } from "@/hook/usePagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookCreateResponse,
  BookDetailResponse,
  BookList,
  BookListFilter,
  BookUpdateResponse,
  CreateBook,
  RestoreBook,
  UpdateBook,
  deleteBook,
} from "../interface";
import { useToast } from "@/hook/useToast";
import useUploadFile from "@/hook/useUploadFile";

const useBookModule = () => {
  const axiosAuthClient = useAxiosAuth();
  const queryClient = useQueryClient();
  const { toastError, toastSuccess, toastWarning } = useToast();
  const { uploadSingle } = useUploadFile();


  const defaultParams: BookListFilter = {
    judul: "",
    penulis: "",
    tahun_terbit: undefined,
    page: 1,
    pageSize: 10,
  };
  const getBookList = async (params: BookListFilter): Promise<BookList> => {
    return axiosAuthClient
      .get("/book/list", { params })
      .then((res) => res.data);
  };

  const useBookList = () => {
    const {
      params,
      setParams,
      handleFilter,
      handleClear,
      handlePageSize,
      handlePage,
      filterParams,
    } = usePagination(defaultParams);

    const { data, isFetching, isLoading, isError } = useQuery(
      ["/book/list", [filterParams]],
      () => getBookList(filterParams),
      {
        keepPreviousData: true,

        select: (response) => response,
      }
    );

    return {
      data,
      isFetching,
      isLoading,
      isError,
      params,
      setParams,
      handlePageSize,
      handlePage,
      handleFilter,
      handleClear,
    };
  };

  const useDeleteBook = (payload: deleteBook = { is_deleted: false }) => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosAuthClient.delete(`/book/delete/${id}`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          // payload.is_deleted = true;
          queryClient.invalidateQueries(["/book/list"]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            return toastWarning(error.response.data.message);
          }
  
          if (error.response.status == 400) {
            return toastWarning(error.response.data.message.toString());
          }
  
          toastError();
        },
      }
    );
  
    return { mutate, isLoading };
  };
  const useRestoreBook = (payload: RestoreBook = { is_deleted: true }) => {
    const { mutate, isLoading } = useMutation(
      (id: number) => {
        return axiosAuthClient.put(`/book/${id}/restore`);
      },
      {
        onSuccess: (response) => {
          toastSuccess(response.data.message);
          // payload.is_deleted = false;
          queryClient.invalidateQueries(["/book/list"]);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            return toastWarning(error.response.data.message);
          }
  
          if (error.response.status == 400) {
            return toastWarning(error.response.data.message.toString());
          }
  
          toastError();
        },
      }
    );
  
    return { mutate, isLoading };
  };
  

  const updateBook = async (
    payload: UpdateBook,
    id: number
  ): Promise<BookUpdateResponse> => {
    if (payload.file !== undefined) {
      const res = await uploadSingle(payload.file);
      console.log("res", res);

      payload = {
        ...payload,
        cover: res.data.file_url,
      };
    }
    return axiosAuthClient
      .put(`/book/update/${id}`, payload)
      .then((res) => res.data);
  };

  const useUpdateBook = (id: number) => {
    const { isLoading, mutate } = useMutation(
      (payload: UpdateBook) => updateBook(payload, id),
      {
        onSuccess: (response) => {
          toastSuccess(response.message);
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            return toastWarning(error.response.data.message);
          }

          if (error.response.status == 400) {
            return toastWarning(error.response.data.message.toString());
          }

          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };

  const getDetail = async (id: string): Promise<BookDetailResponse> => {
    return axiosAuthClient
      .get(`/book/detail/${id}`)
      .then((res) => res.data.data);
  };

  const useDetail = (id: string) => {
    const { data, isLoading, isFetching } = useQuery(
      ["/book/detail", { id }],
      () => getDetail(id),
      {
        select: (response) => response,
      }
    );

    return { data, isFetching, isLoading };
  };

  const createBook = async (
    payload: CreateBook
  ): Promise<BookCreateResponse> => {
    if (payload.file !== undefined) {
      const res = await uploadSingle(payload.file);
      console.log("res", res);

      payload = {
        ...payload,
        cover: res.data.file_url,
      };
    }
    return axiosAuthClient
      .post(`/book/create`, payload)
      .then((res) => res.data);
  };

  const useCreateBook = () => {
    const { isLoading, mutate } = useMutation(
      (payload: CreateBook) => createBook(payload),
      {
        onSuccess: (response) => {
          toastSuccess(response.message);
        },
        onError: (gagal) => {
          console.log("error", gagal);
          toastError();
        },
      }
    );
    return { mutate, isLoading };
  };

  return {
    useBookList,
    useCreateBook,
    useDetail,
    useUpdateBook,
    useDeleteBook,
    useRestoreBook
  };
};

export default useBookModule;
