<template>
  <nav class="bg-gray-800 border-b border-gray-700" role="navigation">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <router-link class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2">Post Managment</span>
          </router-link>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <router-link to="/" :class="[
                isActiveLink('/') ? 'bg-green-500' : 'hover:bg-green-900 hover:text-white',
                'text-white rounded-md px-3 py-2',
              ]">Blog</router-link>

              <router-link :to="{ name: 'add-post' }" :class="[
                isActiveLink('/posts/add')
                  ? 'bg-green-500'
                  : 'hover:bg-green-900 hover:text-white',
                'text-white rounded-md px-3 py-2',
              ]">
                Add Post
              </router-link>

            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.svg'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'

const isActiveLink = (routePath: string) => {
  const route = useRoute()
  return route.path === routePath
}
</script>

<style scoped>
/* optional styles */
</style>
