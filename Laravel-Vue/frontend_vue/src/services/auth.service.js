import Api, { ApiAuth } from "./api.service";

export default {
    login(credenciales){
        return ApiAuth().post("/v1/auth/login", credenciales);
    },
    register(datos){
        return ApiAuth().post("/v1/auth/register", datos);
    },
    perfil(){
        return Api().get("/v1/auth/profile");
    },
    logout(){
        return Api().post("/v1/auth/logout");
    },
}
