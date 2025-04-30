import Api from './api.service'

export default {
    funListar: function(page=1, limit=5, q=''){
        return Api().get(`/producto?page=${page}&limit=${limit}&q=${q}`);
    },
    funGuardar: (datos) => {
        return Api().post(`/producto`, datos);
    },
    mostrar(id){
        return Api().get(`/producto/${id}`);
    },
    funModificar: (id, datos) => {
        return Api().put(`/producto/${id}`, datos);
    },
    funEliminar: (id) => {
        return Api().delete(`/producto/${id}`);
    },
    funSubirImagen: (id, formdata) => {
        return Api().post(`/producto/${id}/subir-imagen`, formdata);
    },
}