import { BaseResponseSuccess } from "@/lib/axiosClient";

interface User {
  id?: number;
  nama: string;
  username: string
  email: string;
  password: string;
  refresh_token: string;
  access_token: string;
}



export interface LoginPayload extends Pick<User, "username" | "password"> {}
export interface RegisterResponse extends BaseResponseSuccess {}

export interface RegisterPayload
  extends Pick<User, "nama" | "email" | "password"| "username"> {}
export interface LoginResponse extends BaseResponseSuccess {
  data: User;
}
