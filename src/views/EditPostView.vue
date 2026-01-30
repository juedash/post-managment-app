<template>
  <section class="bg-gray-50 h-screen">
    <div class="container m-auto max-w-6xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0" v-if="post">
        <BackButton @onBackClick="router.back()" />
        <h2 class="text-3xl font-semibold mb-6">Edit Post</h2>
        <AddEditForm
          :title="post.title"
          :body="post.body"
          :userId="post.userId"
          @onDataChange="onPostUpdate"
          @onCancelClick="router.back()"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { PostItem, AddEdit } from '@/types'
import axios from 'axios'
import AddEditForm from '@/components/AddEditForm.vue'
import { useToast } from 'vue-toastification'
import BackButton from '@/components/BackButton.vue'
import { api } from '@/lib/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const postId = route.params.id
const post = ref<PostItem>()

onMounted(() => {
  api.get(`/posts/${postId}`).then((response) => {
    post.value = response.data
  })
})

const onPostUpdate = (value: AddEdit) => {
  const updatedPost = {
    ...post.value,
    title: value.title,
    body: value.body,
    userId: value.userId,
  }

  api
    .put(`/posts/${postId}`, updatedPost)
    .then(() => {
      toast.success('Post was updated successfully!')
      setTimeout(() => router.push({ name: 'post', params: { id: postId } }), 100)
    })
    .catch(() => toast.error('Something went wrong. Please save the edits again!'))
}
</script>
