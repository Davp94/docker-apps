import Api from "./api.service";

export default {

    getUsuarios(){
        return Api().get("/user");
    }

}
