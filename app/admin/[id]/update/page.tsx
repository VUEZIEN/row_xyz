"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import useUserModule from "../../lib";
import Link from "next/link";
import { BookCreateSchema, option } from "../../add/page";
import useBookModule from "../../lib";
import { UpdateBook } from "../../interface";
import Image from "next/image";

const UpdateBook = ({ params }: { params: { id: string } }) => {
  const { useDetail, useUpdateBook } = useBookModule();
  const { mutate, isLoading } = useUpdateBook(+params.id);
  const { data, isFetching } = useDetail(params.id);
  const formik = useFormik<UpdateBook>({
    initialValues: {
      judul: data?.judul || "",
      cover: data?.cover || "",
      tahun_terbit: data?.tahun_terbit || 2011,
      harga: data?.harga || 0,
      penulis: data?.penulis || "",
      deskripsi: data?.deskripsi || "",
    },
    validationSchema: BookCreateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          window.location.href = "/admin";
        },
      });
    },
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
  } = formik;

  return (
    <section className="flex items-center absolute justify-center w-full h-full">
      <section className="w-1/3">
        <h2 className="text-xl font-bold text-gray-500">Update Book</h2>
        <Image
          src={values.cover}
          alt="img"
          width={50}
          height={50}
        />
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <Label htmlFor="judul" title="judul" />
              <InputText
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.judul}
                placeholder="judul"
                id="judul"
                name="judul"
                isError={!!errors.judul}
                messageError={errors.judul}
              />
            </section>
            <section>
            <input
              type="file"
              id="cover"
              onChange={(event: any) => {
                const file = event.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                  setFieldValue("cover", reader.result);
                };
                reader.readAsDataURL(file);
                setFieldValue("file", file);

                console.log(file);
              }}
            />
            </section>
            <section>
              <Label htmlFor="tahun_terbit" title="tahun_terbit" />
              <Select
                value={values.tahun_terbit}
                onBlur={handleBlur}
                id="tahun_terbit"
                name="tahun_terbit"
                options={option}
                isError={!!errors.tahun_terbit}
                messageError={errors.tahun_terbit}
                onChange={handleChange}
              />
            </section>
            <section>
              <Label htmlFor="harga" title="harga" />
              <InputText
                onChange={handleChange}
                onBlur={formik.handleBlur}
                value={values.harga}
                placeholder="harga"
                id="harga"
                name="harga"
                isError={!!errors.harga}
                messageError={errors.harga}
              />
            </section>
            <section>
              <Label htmlFor="penulis" title="penulis" />
              <InputText
                onBlur={formik.handleBlur}
                onChange={handleChange}
                value={values.penulis}
                placeholder="penulis"
                id="penulis"
                name="penulis"
                isError={!!errors.penulis}
                messageError={errors.penulis}
              />
            </section>
            <section>
              <Label htmlFor="deskripsi" title="deskripsi" />
              <InputText
                onBlur={formik.handleBlur}
                onChange={handleChange}
                value={values.deskripsi}
                placeholder="deskripsi"
                id="deskripsi"
                name="deskripsi"
                isError={!!errors.deskripsi}
                messageError={errors.deskripsi}
              />
            </section>
            <section className="flex gap-3 flex-col">
              <Button width="lg1" title="Simpan" colorSchema="dark" />
              <Link href={"/admin"}>
                <Button
                  width="lg1"
                  type="button"
                  title="Cancel"
                  colorSchema="red"
                />
              </Link>
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default UpdateBook;