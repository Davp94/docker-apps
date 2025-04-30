<template>
    <div class="card">
        <h1>Personas</h1>
        
        <Button label="Nueva Persona" @click="openDialog" />
        
        <DataTable :value="personas" tableStyle="min-width: 50rem">
            <Column field="id" header="ID"></Column>
            <Column field="nombres" header="NOMBRES"></Column>
            <Column field="apellidos" header="APELLIDOS"></Column>
            <Column >
                <template #body="slotProps">
                    <div v-if="slotProps.data.user">
                        <strong>CORREO: {{ slotProps.data.user?.email }}</strong><br>
                        <small>Creado en: {{ slotProps.data.user?.created_at }}</small>
                    </div>
                    <div v-else>
                        SIN CUENTA DE USUARIO
                        <Button icon="pi pi-plus" severity="info" rounded class="mr-2" @click="openDialogUsuario(slotProps.data)" />

                    </div>
                </template>                
            </Column>
            <Column :exportable="false" style="min-width: 12rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" rounded class="mr-2" @click="editProduct(slotProps.data)" />
                    <Button icon="pi pi-trash" rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>
        </DataTable>


    <Dialog v-model:visible="visible" modal header="Datos Personales" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Asignar Datos Personales.</span>
        <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Nombres</label>
            <InputText id="username" class="flex-auto" autocomplete="off" v-model="persona.nombres" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Apellidos</label>
            <InputText id="email" class="flex-auto" autocomplete="off" v-model="persona.apellidos" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">CI</label>
            <InputText id="email" class="flex-auto" autocomplete="off" v-model="persona.ci" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Guardar" @click="funGuardarPersona"></Button>
        </div>
    </Dialog>

    <Dialog v-model:visible="visibleUser" modal header="Datos Usuario" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Asignar Datos Usuario.</span>
        <span class=" dark:text-surface-200 block mb-8">NOMBRE: {{persona.nombres}}</span>
        <span class=" dark:text-surface-200 block mb-8">APELLIDOS: {{persona.apellidos}}</span>
        <span class=" dark:text-surface-200 block mb-8">CI: {{persona.ci}}</span>



        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Correo</label>
            <InputText id="email" type="email" class="flex-auto" autocomplete="off" v-model="user.email" />
        </div>
        <Message v-if="errors.email" severity="error" size="small" variant="simple">{{ errors.email }}</Message>
        <div class="flex items-center gap-4 mb-8">
            <label for="pass" class="font-semibold w-24">Contraseña</label>
            <InputText id="pass" type="password" class="flex-auto" autocomplete="off" v-model="user.password" />
        </div>
        <Message v-if="errors.password" severity="error" size="small" variant="simple">{{ errors.password }}</Message>

        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Guardar" @click="funAsignarUser()"></Button>
        </div>
    </Dialog>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import personaService from '../../../services/persona.service';

const personas = ref([]);
const visible = ref(false);
const persona = ref({});
const user = ref({});
const errors = ref({})

const visibleUser = ref(false);

onMounted(() => {
    getPersonas()
})

async function getPersonas(){
    const {data} = await personaService.getPersonas();
    personas.value = data;
}

function openDialog(){
    visible.value = true
    persona.value = {}
}

async function funGuardarPersona(){
    const {data} = await personaService.guardarPersona(persona.value);
    visible.value = false

    getPersonas()
}

function openDialogUsuario(per){
    persona.value = per
    visibleUser.value = true;

}

async function funAsignarUser(){
    try {
        const {data} = await personaService.asignarUserPersona(persona.value.id, user.value);
        visibleUser.value = false;
        getPersonas();
        persona.value = {}
        user.value = {}
        
    } catch (error) {
        console.log(error.response.data?.errors);
        errors.value = error.response.data?.errors;
    }
}

</script>