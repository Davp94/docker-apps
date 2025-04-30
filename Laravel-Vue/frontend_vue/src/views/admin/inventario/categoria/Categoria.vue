<template>
    <div class="card">
        <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent"
    animationDuration=".5s" aria-label="Custom ProgressSpinner" v-if="cargando" />

    <Button label="Nueva Categoria" @click="funNuevoCategoria()" />

    <DataTable :value="categorias" tableStyle="min-width: 50rem">
        <Column field="id" header="ID"></Column>
        <Column field="nombre" header="Nombre"></Column>
        <Column field="detalle" header="Detalle"></Column>
        <Column field="estado" header="ESTADO">
        
            <template #body="slotProps">
                <Tag severity="success" value="ACTIVO" v-if="slotProps.data.estado"></Tag>
                <Tag severity="danger" value="INACTIVO" v-else></Tag>
            </template>

        </Column>

        <Column :exportable="false" style="min-width: 12rem">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" rounded class="mr-2" @click="editarCategoria(slotProps.data)" v-if="slotProps.data.estado" />
                <Button icon="pi pi-lock" rounded severity="danger" @click="confirmarEliminacionCategoria(slotProps.data)" />
            </template>
        </Column>
    </DataTable>


    <Dialog v-model:visible="visibleCategoria" modal header="Categoria" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Información de Categoria.</span>
        <div class="flex items-center gap-4 mb-4">
            <label for="nombre" class="font-semibold w-24">Nombre</label>
            <InputText id="nombre" class="flex-auto" autocomplete="off" v-model="categoria.nombre" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="det" class="font-semibold w-24">Detalle</label>
            <InputText id="det" class="flex-auto" autocomplete="off" v-model="categoria.detalle" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancelar" severity="secondary" @click="visibleCategoria = false"></Button>
            <Button type="button" label="Guardar" @click="funGuardar()"></Button>
        </div>
    </Dialog>

    <Dialog v-model:visible="visibleDelete" modal header="Eliminar Categoria" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Está seguro de Eliminarla Categoria?.</span>
       
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancelar" severity="secondary" @click="visibleDelete = false"></Button>
            <Button type="button" label="Eliminar" @click="eliminarCategoria()"></Button>
        </div>
    </Dialog>
    </div>
</template>

<script setup>
import {ref, onMounted } from 'vue'
import categoriaService from "@/services/categoria.service"
import Swal from 'sweetalert2';

const categorias = ref([]);
const cargando = ref(false);
const categoria = ref({});
const visibleCategoria = ref(false);
const visibleDelete = ref(false);

onMounted(() => {
    obtenerCategorias()
});

const obtenerCategorias = async () => {
    cargando.value = true
    const { data } = await categoriaService.funListar();
    categorias.value = data;
    cargando.value = false
}

const editarCategoria = (cat) => {
    categoria.value = cat;
    visibleCategoria.value = true;

}
const confirmarEliminacionCategoria = (cat) => {
    categoria.value = cat;
    visibleDelete.value = true

}

const funNuevoCategoria = () => {
    categoria.value = {};
    visibleCategoria.value = true;
}

const funGuardar = async () => {
    try {
        if(categoria.value.id){

            const {data} = await categoriaService.funModificar(categoria.value.id, categoria.value);
            visibleCategoria.value = false;
            obtenerCategorias();
    
            Swal.fire({
                title: "Categoria Actualizada!",
                text: "ok Para continuar!",
                icon: "success"
            });


        }else{
            const {data} = await categoriaService.funGuardar(categoria.value);
            visibleCategoria.value = false;
            obtenerCategorias();
    
            Swal.fire({
                title: "Categoria Registrada!",
                text: "ok Para continuar!",
                icon: "success"
            });

        }
        
    } catch (error) {
        Swal.fire({
            title: "Problemas al registrar!",
            text: "ok Para continuar!",
            icon: "warn"
        });
    }
    
}

const eliminarCategoria = async () => {
    const {data} = await categoriaService.funEliminar(categoria.value.id);

    visibleDelete.value = false;
    obtenerCategorias()
}

</script>