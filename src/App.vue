<template>
  <NavBar />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { onMounted } from 'vue'

onMounted(() => {
  localStorage.setItem('user', '1')
})
</script>
