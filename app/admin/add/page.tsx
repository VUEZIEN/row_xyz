"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import Link from "next/link";
import useBookModule from "../lib";
import Image from "next/image";
import { BookCreateResponse, BookList, CreateBook } from "../interface";

export const BookCreateSchema = yup.object().shape({
    judul: yup
      .string()
      .nullable()
      .default("")
  
      .required("Wajib isi"),
    cover: yup.string().nullable().default("").required("Wajib isi"),
    tahun_terbit: yup
      .number()
      .nullable()
      .default(0)
  
      .required("Wajib isi"),
    harga: yup
      .number()
      .nullable()
      .default(0)
  
      .required("Wajib isi"),
    penulis: yup
      .string()
      .nullable()
      .default("")
  
      .required("Wajib isi"),
    deskripsi: yup
      .string()
      .nullable()
      .default("")
  
      .required("Wajib isi"),
  });
  
  export const option = [
    {
      value: 2010,
      label: "2010",
    },
    {
      value: 2011,
      label: "2011",
    },
    {
      value: 2013,
      label: "2013",
    },
    {
      value: 2014,
      label: "2014",
    },
    {
      value: 2015,
      label: "2015",
    },
    {
      value: 2016,
      label: "2016",
    },
    {
      value: 2017,
      label: "2017",
    },
    {
      value: 2018,
      label: "2018",
    },
    {
      value: 2019,
      label: "2019",
    },
    {
      value: 2020,
      label: "2020",
    },
    {
      value: 2021,
      label: "2021",
    },
    {
      value: 2022,
      label: "2022",
    },
    {
      value: 2023,
      label: "2023",
    },
    {
      value: 2024,
      label: "2024",
    },
  ];

const CreateUser = () => {
  const { useCreateBook } = useBookModule();
  const { mutate, isLoading } = useCreateBook();
  const formik = useFormik<CreateBook>({
    initialValues: BookCreateSchema.getDefault(),
    validationSchema: BookCreateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          resetForm();
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
    <section className="flex items-center justify-center w-full h-screen absolute top-[5vh]">
      <section className="w-1/3">
        <h2 className="text-xl font-bold text-gray-500">Tambah Book</h2>
        value : {JSON.stringify(values)}
        <div>
        <Image
          src={values.cover || "/avatar.jpg"}
          alt="img"
          width={50}
          height={50}
        />
      </div>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <Label htmlFor="judul" title="judul" />
              <InputText
                onChange={handleChange}
                // onChange={(e) => {
                //   setFieldValue("nama", e.target.value);
                //   if (e.target.value === "ariiq") {
                //     setFieldValue("nama", e.target.value);
                //   }
                // }}
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

                // if (file.type !== "image/jpeg") {
                //   return alert("type tidak sesauai");
                // }

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

export default CreateUser;