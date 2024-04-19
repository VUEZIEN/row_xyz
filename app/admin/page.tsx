/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import useBookModule from "./lib";
import { useConfirmDelete } from "@/hook/useConfirmDelete";
import { useDisclosure } from "@/hook";
import { Drawer } from "@/components/Drawer";
import Filter from "./module/filter";
import { Pagination } from "@/components/Pagination";
import Search from "./module/search";

const Admin = () => {
  const { useBookList, useDeleteBook, useRestoreBook } = useBookModule();
  const { mutate: deleteMutate } = useDeleteBook();
  const { mutate: restoreMutate } = useRestoreBook();
  const router = useRouter();

  const { onClose, isOpen, onOpen } = useDisclosure();
  const {
    data,
    handleFilter,
    params,
    isFetching,
    handleClear,
    handlePage,
    setParams,
    handlePageSize,
  } = useBookList();

  const handleDelete = useConfirmDelete({
    onSubmit: (id) => {
      deleteMutate(id);
    },
  });

  const handleRestore = (id: number) => {
    restoreMutate(id);
  };

  // if (isFetching) {
  //   return (
  //     <>
  //       <div className="bg-white/20 backdrop-blur-xl flex-col w-full h-screen flex justify-center items-center">
  //         <picture>
  //           <img src="/loading.png" alt="" className="w-72 h-72" />
  //         </picture>
  //         <span className="font-bold text-xl">Ngeleg ini...</span>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClear={handleClear}
        onSubmit={handleFilter}
        onClose={onClose}
        title="Filter Book"
      >
        <Filter params={params} setParams={setParams} />
      </Drawer>
      <div className="p-6 flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              router.push("/admin/add");
            }}
            width="filter"
            colorSchema="emerlard"
            title="tambah"
          />
          <Button
            title="Filter"
            width="filter"
            onClick={onOpen}
            colorSchema="dark"
          />
        </div>
        <Search onchange={handleFilter} />
      </div>

      <div className="flex justify-center items-center flex-wrap gap-10">
        {data?.data.map((book, index) => (
          <section
            className="flex flex-col gap-3 justify-center items-center"
            key={index}
          >
            <button
              onClick={() => {
                router.push(`admin/${book.id}/update`);
              }}
              disabled={book.is_deleted}
            >
              <div
                className={`group relative block rounded-xl overflow-hidden dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${
                  book.is_deleted
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 cursor-auto"
                }`}
              >
                <div className="aspect-w-12 w-[377px] h-[251px] aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
                  <img
                    className="group-hover:scale-105 object-fill transition-transform duration-500 ease-in-out rounded-xl w-full"
                    src={book.cover}
                    alt="Image Description"
                  />
                </div>
                <div className="absolute bottom-0 start-0 end-0 p-2 sm:p-4">
                  <div className="text-sm font-bold text-gray-800 rounded-lg bg-white p-4 md:text-xl dark:bg-gray-800 dark:text-gray-200">
                    {book.judul}
                  </div>
                </div>
              </div>
            </button>
            {!book.is_deleted && (
              <Button
                title="Delete"
                width="filter"
                colorSchema="red"
                onClick={() => {
                  handleDelete(book.id || 0);
                }}
              />
            )}
            {book.is_deleted && (
              <Button
                title="Restore"
                width="filter"
                colorSchema="blue"
                onClick={() => {
                  handleRestore(book.id || 0);
                }}
              />
            )}
          </section>
        ))}
      </div>
      <div className="m-5">
        <Pagination
          page={params.page}
          pageSize={params.pageSize}
          handlePageSize={handlePageSize}
          handlePage={handlePage}
          pagination={data?.pagination}
        />
      </div>
    </>
  );
};

export default Admin;
