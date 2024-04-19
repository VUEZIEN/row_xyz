import { BaseResponseSuccess, axiosClient } from "@/lib/axiosClient";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../interface";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hook/useToast";
import { useState } from "react";
import { signIn } from "next-auth/react";
import useAxiosAuth from "@/hook/useAuthAxios";
import { useSession } from "next-auth/react";
import useUploadFile from "@/hook/useUploadFile";

const useAuthModule = () => {
  const { toastError, toastSuccess, toastWarning } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const { uploadSingle } = useUploadFile();

  const register = async (
    payload: RegisterPayload
  ): Promise<RegisterResponse> => {
    return axiosClient.post(`/auth/register`, payload).then((res) => res.data);
  };

  const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    return axiosClient.post("/auth/login", payload).then((res) => res.data);
  };

  const useLogin = () => {
    const { mutate, isLoading } = useMutation(
      (payload: LoginPayload) => login(payload),
      {
        onSuccess: async (response) => {
          toastSuccess(response.message);
          await signIn("credentials", {
            id: response.data.id,
            name: response.data.nama,
            username: response.data.username,
            email: response.data.email,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            redirect: false,
          });

          router.push("/admin");
        },
        onError: (error: any) => {
          if (error.response.status == 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
          }
        },
      }
    );
    return { mutate, isLoading };
  };

  const useRegister = () => {
    const [erorvalidation, setErorvalidation] = useState<string[]>([]);
    const handleTyping = (name: string) => {
      setErorvalidation((value) => {
        const filter = value.filter(
          (item: string) => item?.includes(name) === false
        );

        return filter;
      });
    };
    const handeleMessage = (name: string) => {
      const message = erorvalidation.find((item: string) =>
        item?.includes(name)
      );

      return message;
    };

    const { mutate, isLoading } = useMutation({
      mutationFn: (payload: RegisterPayload) => register(payload),
      onSuccess: (res) => {
        toastSuccess(res.message);
      },
      onError: (err: any) => {
        console.log("error", err);

        if (err.response.status === 302) {
          return toastWarning(err.response.data.message);
        } else if (err.response.status === 400) {
          setErorvalidation(err.response.data.message);
          return toastWarning(err.response.data.message);
        }

        toastError();
      },
    });

    return { mutate, isLoading, handeleMessage, handleTyping };
  };

  return {
    useRegister,
    useLogin,
  };
};

export default useAuthModule;
