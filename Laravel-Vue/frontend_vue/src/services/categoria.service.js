import Api from './api.service'

export default {
    funListar: function(){
        return Api().get(`/categoria`);
    },
    funGuardar: (datos) => {
        return Api().post(`/categoria`, datos);
    },
    mostrar(id){
        return Api().get(`/categoria/${id}`);
    },
    funModificar: (id, datos) => {
        return Api().put(`/categoria/${id}`, datos);

    },
    funEliminar: (id) => {
        return Api().delete(`/categoria/${id}`);
    }
}