import Api from './api.service'

export default {
    funListar: function(){
        return Api().get(`/cliente`);
    },
    funGuardar: (datos) => {
        return Api().post(`/cliente`, datos);
    },
    mostrar(id){
        return Api().get(`/cliente/${id}`);
    },
    funModificar: (id, datos) => {
        return Api().put(`/cliente/${id}`, datos);

    },
    funEliminar: (id) => {
        return Api().delete(`/cliente/${id}`);
    },
    funBusquedaCliente: (q="") => {
        return Api().get(`/cliente/buscar?q=${q}`);
    }
}