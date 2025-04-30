import Api from './api.service'

export default {
    funListar: function(page=1, limit=5, q=''){
        return Api().get(`/pedido?page=${page}&limit=${limit}&q=${q}`);
    },
    funGuardar: (datos) => {
        return Api().post(`/pedido`, datos);
    },
    mostrar(id){
        return Api().get(`/pedido/${id}`);
    },
    funModificar: (id, datos) => {
        return Api().put(`/pedido/${id}`, datos);
    },
    funEliminar: (id) => {
        return Api().delete(`/pedido/${id}`);
    }
}