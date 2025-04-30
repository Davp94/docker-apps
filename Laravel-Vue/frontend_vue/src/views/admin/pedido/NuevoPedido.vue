<template>
    <div class="flex h-screen p-4 space-x-4 bg-gray-100">
        <div class="w-2/3 bg-white p-4 rounded shadow overflow-y-auto">
            <h2 class="text-xl font-semibold mb-4">Productos</h2>
            <DataTable
            ref="dt"
            :value="products"
            lazy
            :loading="loading"
            :totalRecords="totalRecords"
            @page="onPage($event)"
            dataKey="id"
            :paginator="true"
            :rows="5"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} productos"
        >
            <template #header>
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <h4 class="m-0">Gestionar Productos</h4>
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="buscar" placeholder="Buscar..." @keyup.enter="getProductos()" />
                    </IconField>
                </div>
            </template>
    
            <Column field="id" header="ID" sortable style="min-width: 1rem"></Column>
            <Column field="nombre" header="NOMBRE" sortable style="min-width: 8rem"></Column>
            <Column header="IMAGEN">
                <template #body="slotProps">
                    <Image v-if="slotProps.data.imagen" :src="`http://127.0.0.1:8000/${slotProps.data.imagen}`" :alt="slotProps.data.nombre" class="rounded" style="width: 64px" preview />
                </template>
            </Column>
            <Column field="precio" header="PRECIO" sortable style="min-width: 4rem">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.precio) }}
                </template>
            </Column>
            <Column field="stock" header="C" sortable style="min-width: 2rem"></Column>

            <Column field="categoria.nombre" header="CATEGORIA" sortable style="min-width: 4rem"></Column>
            
            <Column field="estado" header="Estado" sortable style="min-width: 2rem">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.estado" :severity="getStatusLabel(slotProps.data.estado)" />
                </template>
            </Column>
            <Column :exportable="false" style="min-width: 8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-plus" rounded class="mr-2" severity="warn" @click="funAddCarrito(slotProps.data)" />

                </template>
            </Column>
        </DataTable>

        </div>
        <div class="w-1/3 flex flex-col space-y-4">
            <div class="bg-white p-4 rounded shadow overflow-y-auto">
                <h2 class="text-xl font-semibold mb-4">Carrito</h2>
                <DataTable :value="carrito">
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="cantidad" header="cantidad"></Column>
                    <Column field="precio" header="Precio"></Column>
                </DataTable>

            </div>
            <div class="bg-white p-4 rounded shadow">
                <h2 class="text-xl font-semibold mb-4">Cliente</h2>

                <Button label="Nuevo Cliente" @click="visibleCliente = true" />
                <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="buscar_cliente" placeholder="Buscar..." @keyup.enter="getClienteBusqueda()" />
                    </IconField>
                <div class="card" v-if="cliente_seleccionado.id">
                    <strong>NOMBRES: {{ cliente_seleccionado.nombre_completo }}</strong>
                    <br>
                    <strong>CI/NIT: {{ cliente_seleccionado.ci_nit }}</strong>
                    <strong>TELEFONO: {{ cliente_seleccionado.telefono }}</strong>
                    <br>
                    <strong>CORREO: {{ cliente_seleccionado.correo }}</strong>
                    <br>

                    <strong>DIRECCION: {{ cliente_seleccionado.direccion }}</strong>
                    
                </div>


            </div>
            <div class="bg-white p-4 rounded shadow">
                <h2 class="text-xl font-semibold mb-4">Pedido</h2>

                Observación
                <Textarea></Textarea>

                <Button label="Generar Pedido" @click="funGuardarPedido()" />


            </div>
        </div>
    </div>

<Dialog v-model:visible="visibleCliente" modal header="Datos Cliente" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Datos del Cliente.</span>
    <div class="flex items-center gap-4 mb-4">
        <label for="nc" class="font-semibold w-24">Nombre Completo</label>
        <InputText id="nc" class="flex-auto" autocomplete="off" v-model="cliente.nombre_completo" />
    </div>
    <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24">Correo</label>
        <InputText id="email" class="flex-auto" autocomplete="off" v-model="cliente.correo"  />
    </div>
    <div class="flex items-center gap-4 mb-8">
        <label for="ci_nit" class="font-semibold w-24">CI/Nit</label>
        <InputText id="ci_nit" class="flex-auto" autocomplete="off" v-model="cliente.ci_nit"  />
    </div>
    <div class="flex items-center gap-4 mb-8">
        <label for="tel" class="font-semibold w-24">Telefono/Cel</label>
        <InputText id="tel" class="flex-auto" autocomplete="off" v-model="cliente.telefono"  />
    </div>
    <div class="flex items-center gap-4 mb-8">
        <label for="dir" class="font-semibold w-24">Dirección</label>
        <InputText id="dir" class="flex-auto" autocomplete="off" v-model="cliente.direccion"  />
    </div>
    <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="visibleCliente = false"></Button>
        <Button type="button" label="Guardar" @click="funGuardar()"></Button>
    </div>
</Dialog>


</template>

<script setup>

import {ref, onMounted} from "vue"
import productoService from "@/services/producto.service"
import categoriaService from "@/services/categoria.service"
import clienteService from "../../../services/cliente.service";
import Swal from "sweetalert2";
import pedidoService from "../../../services/pedido.service";


onMounted(() => {
    getProductos();

})

const products = ref([]);
const buscar = ref("");
const loading = ref(false);
const totalRecords = ref(0);
const lazyParams = ref({});
const dt = ref();
const categorias = ref([])
const carrito = ref([])
const visibleCliente = ref(false);
const cliente = ref({});
const cliente_seleccionado = ref({})
const buscar_cliente = ref("");

const onPage = (event) => {
    lazyParams.value = event;

    getProductos()
}


const getProductos = async () => {
    loading.value = true;
    const respuesta = await productoService.funListar(lazyParams.value.page + 1, lazyParams.value.rows, buscar.value);
    products.value = respuesta.data.data;
    totalRecords.value = respuesta.data.total;

    loading.value = false;
}

const getClienteBusqueda = async () => {
    const {data} = await clienteService.funBusquedaCliente(buscar_cliente.value);
    cliente_seleccionado.value = data;
}

const formatCurrency = (value) => {
    if(value)
        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    return;
};

const getStatusLabel = (status) => {
    switch (status) {
        case true:
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case false:
            return 'danger';

        default:
            return null;
    }
};

const funAddCarrito = (prod) => {
    carrito.value.push({id: prod.id, cantidad: 1, precio: prod.precio, nombre: prod.nombre})
}

const funGuardar = async () => {
    try {
        const {data} = await clienteService.funGuardar(cliente.value);
        cliente_seleccionado.value = data.cliente;
        visibleCliente.value = false;
        
        Swal.fire({
                title: "Cliente Registrado!",
                text: "ok Para continuar!",
                icon: "success"
            });

    } catch (error) {
        Swal.fire({
                title: "Error al registrar al Cliente!",
                text: "ok Para continuar!",
                icon: "error"
            });
    }
}

const funGuardarPedido = async () => {
    let datos = {
        cliente_id: cliente_seleccionado.value.id,
        productos: carrito.value
    }

    const {data} = await pedidoService.funGuardar(datos);

    cliente_seleccionado.value = {}
    carrito.value = [];

    Swal.fire({
                title: "Pedido Registrado!",
                text: "ok Para continuar!",
                icon: "success"
            });
}
</script>