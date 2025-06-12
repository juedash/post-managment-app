<template>
  <section class="bg-gray-50 h-screen">
    <div class="container m-auto max-w-6xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0">
        <BackButton @onBackClick="router.back()" />
        <h2 class="text-3xl font-semibold mb-6">Create a new post</h2>
        <AddEditForm @onDataChange="createNewItem" @onCancelClick="router.back()" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AddEditForm from '@/components/AddEditForm.vue'
import type { AddEdit } from '@/types'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import BackButton from '@/components/BackButton.vue'

const toast = useToast()
const router = useRouter()

const createNewItem = (values: AddEdit) => {
  axios
    .post(`/api/posts`, values)
    .then(() => {
      toast.success('Post was saved successfully!')
      router.push({ name: 'home' })
    })
    .catch(() => toast.error('Something went wrong. Please add the post again!'))
}
</script>
