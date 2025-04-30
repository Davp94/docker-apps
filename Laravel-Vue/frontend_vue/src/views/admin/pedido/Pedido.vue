<template>
    <div class="card">
        <DataTable :value="pedidos" tableStyle="min-width: 50rem">
            <Column field="fecha" header="FECHA"></Column>
            <Column field="cliente" header="CLIENTE">
                                <template #body="slotProps">

                <span class="text-surface-500 dark:text-surface-400 block mb-8">CLIENTE: {{ slotProps.data.cliente.nombre_completo }}.</span>
                <span class="text-surface-500 dark:text-surface-400 block mb-8">CI/NIT: {{ slotProps.data.cliente.ci_nit }}.</span>


                                </template>

            </Column>
            <Column field="estado" header="ESTADO"></Column>

            <Column field="productos" header="Productos" style="min-width: 4rem">
                <template #body="slotProps">

                    <Button label="Mostrar Detalle Pedido" @click="abrirDetallePedido(slotProps.data)" />

                </template>
            </Column>
        </DataTable>


        <Dialog v-model:visible="visiblePedido" modal header="Detalle Pedido" :style="{ width: '40rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">CLIENTE: {{ pedido.cliente.nombre_completo }}.</span>
    <span class="text-surface-500 dark:text-surface-400 block mb-8">CI/NIT: {{ pedido.cliente.ci_nit }}.</span>

    <span class="text-surface-500 dark:text-surface-400 block mb-8">CORREO: {{ pedido.cliente.correo }}.</span>

    <span class="text-surface-500 dark:text-surface-400 block mb-8">TELEFONO: {{ pedido.cliente.telefono }}.</span>


    <div class="flex items-center gap-4 mb-4">

        <DataTable :value="pedido.productos">
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="NOMBRE"></Column>
            <Column field="pivot.cantidad" header="Cantidad"></Column>
            <Column field="precio" header="PRECIO"></Column>
        </DataTable>

    </div>
    <div class="flex justify-end gap-2">
        <Button type="button" label="Cerrar" severity="secondary" @click="visiblePedido = false"></Button>
    </div>
</Dialog>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import pedidoService from '../../../services/pedido.service';


const pedidos = ref([]);
const visiblePedido = ref(false);
const pedido = ref({})

onMounted(() => {
    getPedidos()
})

const getPedidos = async () => {
    const {data} = await pedidoService.funListar();
    pedidos.value = data.data;
}

const abrirDetallePedido = (det_pedido) => {
    pedido.value = det_pedido
    visiblePedido.value = true;
}
</script>