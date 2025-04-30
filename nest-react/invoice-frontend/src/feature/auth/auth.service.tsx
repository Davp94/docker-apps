import http from "@/service/axios.instance";
import { LoginDto } from "./login.dto";

export const authLogin = (loginData: LoginDto) => {
    return http.post('/auth/login', loginData);
}