<template>
  <div>
    <Breadcrumb :model="items">
      <template #item="{ item }">
        <RouterLink class="cursor-pointer" :to="item.url">
          <span :class="item.icon"></span> {{ item.titulo }}
        </RouterLink>
      </template>
      <template #separator> / </template>
    </Breadcrumb>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  {
    icon: "pi pi-sitemap",
    url: "/admin/inventario/categoria",
    titulo: "Categoria",
  },
  { icon: "pi pi-book", url: "/admin/inventario/producto", titulo: "Producto" },
]);
</script>
