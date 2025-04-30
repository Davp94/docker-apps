<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'ADMIN',
        items: [
            { label: 'Administración', icon: 'pi pi-fw pi-home', to: '/admin' },
            { label: 'Mi Perfil', icon: 'pi pi-fw pi-user', to: '/admin/perfil' }
        ]
    },
    {
        label: 'Gestión Seguridad',
        items: [
            { label: 'Usuarios', icon: 'pi pi-fw pi-id-card', to: '/admin/usuario' },
            { label: 'Roles', icon: 'pi pi-fw pi-check-square', to: '/admin/role' },
            { label: 'Datos Personales', icon: 'pi pi-fw pi-check-square', to: '/admin/persona' }

           
        ]
    },
    {
        label: 'Inventarios',
        icon: 'pi pi-fw pi-briefcase',
        items: [
            {
                label: 'Categoria',
                icon: 'pi pi-fw pi-globe',
                to: '/admin/inventario/categoria'
            },
            {
                label: 'Productos',
                icon: 'pi pi-fw pi-box',
                to: '/admin/inventario/producto'
            }
        ]
    },
    {
        label: 'Gestión Pedidos',
        icon: 'pi pi-fw pi-briefcase',
        items: [
            {
                label: 'Pedidos',
                icon: 'pi pi-fw pi-table',
                to: '/admin/pedido'
            },
            {
                label: 'Nuevo Pedido',
                icon: 'pi pi-fw pi-box',
                to: '/admin/pedido/nuevo'
            },
            {
                label: 'Clientes',
                icon: 'pi pi-fw pi-users',
                to: '/admin/cliente'
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
