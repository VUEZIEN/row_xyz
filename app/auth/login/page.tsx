"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";

import * as yup from "yup";
import { LoginPayload } from "../interface";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";
import useAuthModule from "../lib";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .nullable()
    .default("")
    .required("tolong isi terlebih dahulu"),
  password: yup
    .string()
    .nullable()
    .default("")
    .required("tolong isi terlebih dahulu")
    .min(8, "Minimal 8 karakater"),
});

const Login = () => {
  const { useLogin } = useAuthModule();
  const { mutate, isLoading } = useLogin();
  const formik = useFormik<LoginPayload>({
    initialValues: registerSchema.getDefault(),
    validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });
  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  return (
    <section className="m-32">
      <div className="flex items-center justify-center w-full">
        <h1 className="text-2xl font-bold text-gray-800">Login</h1>
      </div>
      <FormikProvider value={formik}>
        <Form className="space-y-5" onSubmit={handleSubmit}>
          <section>
            <Label htmlFor="username" title="Username" />
            <InputText
              value={values.username}
              placeholder="example"
              id="username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              isError={getIn(errors, "username")}
              messageError={getIn(errors, "username")}
            />
          </section>
          <section>
            <div className="flex justify-between">
              <Label htmlFor="password" title="Password" />
              <Link href={"/auth/lupa-password"}>
                <p className="text-sm text-blue-600 decoration-2 hover:underline font-medium">
                  Forgot password?
                </p>
              </Link>
            </div>

            <InputText
              value={values.password}
              placeholder="**********"
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              isError={getIn(errors, "password")}
              messageError={getIn(errors, "password")}
            />
          </section>
          <section className="flex flex-col gap-2">
            <Button
              title="Login"
              width="login"
              isLoading={isLoading}
              isDisabled={isLoading}
            />

            <Link href={"register"}>
              <Button title="Register" width="login" colorSchema="dark" />
            </Link>
          </section>
        </Form>
      </FormikProvider>
    </section>
  );
};

export default Login;
