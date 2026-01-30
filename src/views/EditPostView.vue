<template>
  <section class="bg-gray-50 h-screen">
    <div class="container m-auto max-w-6xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0" v-if="post">
        <BackButton @onBackClick="router.back()" />
        <h2 class="text-3xl font-semibold mb-6">Edit Post</h2>
        <AddEditForm :title="post.title" :body="post.body" :userId="post.userId" @onDataChange="onPostUpdate"
          @onCancelClick="router.back()" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { AddEdit } from '@/types'
import AddEditForm from '@/components/AddEditForm.vue'
import BackButton from '@/components/BackButton.vue'
import { useSinglePost } from '@/composables/useSinglePost'

const route = useRoute()
const router = useRouter()

const postId = route.params.id as string
const { post, fetchPost, updatePost } = useSinglePost()

onMounted(async () => {
  await fetchPost(postId)
})

const onPostUpdate = async (value: AddEdit) => {
  await updatePost(postId, value)
}
</script>
