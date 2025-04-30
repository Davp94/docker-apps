import Api from "./api.service";

export default {

    getPersonas(){
        return Api().get("/persona");
    },

    guardarPersona(datos){
        return Api().post("/persona", datos);
    },

    asignarUserPersona(id, datos){
        return Api().post(`/persona/${id}/adduser`, datos);
    }

}
