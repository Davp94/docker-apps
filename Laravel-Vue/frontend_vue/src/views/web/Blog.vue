<template>
   
 <button @click="obtenerPublicaciones()">Obtener Datos</button>
    <br>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>TITULO</th>
          <th>DESCRIPCION</th>
          <th>IMAGEN</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="publi in publicaciones">
          <td>{{ publi.id }}</td>
          <td>{{publi.title}}</td>
          <td></td>
          <td>
            <img :src="publi.cover_image" alt="" width="150px">
          </td>
        </tr>
      </tbody>
    </table>
    {{ publicaciones }}
  
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { RouterLink } from 'vue-router';
  
    // variables
    const publicaciones = ref([])
  
    // onMounted
    onMounted(() => {
      obtenerPublicaciones()
    });
  
    // funciones
    function obtenerPublicaciones(){
      fetch('https://dev.to/api/articles')
        .then(response => response.json())
        .then(json => {
          publicaciones.value = json
        })
    }
  
  </script>
  
  <style>
  
  </style>
  