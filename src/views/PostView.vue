<template>
  <HeroBanner :subtitle="postState.post?.title" />
  <div class="text-center text-gray-500 py-6 w-full h-64 flex items-center" v-if="postState.isLoading">
    <PacmanLoader class="mx-auto text-gray-500" />
  </div>
  <section class="bg-gray-50 m-auto h-max" v-else-if="postState.post?.title">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
        <main class="md:col-span-2">
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <BackButton @onBackClick="router.back()" />
            <h1 class="text-3xl font-bold mb-4">
              {{ postState.post?.title && firstLetterUppercase(postState.post?.title) }}
            </h1>
            <RouterLink :to="`/${postState.post?.userId}/posts`"
              class="flex gap-2 items-center group text-sm md:text-base">
              <i class="pi pi-user text-orange-700 text-xl" aria-hidden="true"></i>
              <p class="text-orange-700 group-hover:underline">
                {{ postState.post?.userId && getUserName(postState.post?.userId) }}
              </p>
            </RouterLink>
            <div class="text-gray-500 my-4 flex align-middle justify-center md:justify-start">
              {{ postState.post?.body || '' }}
            </div>
            <div class="flex gap-2 justify-center md:justify-start">
              <RouterLink :to="`/posts/edit/${postState.post?.id}`"
                class="inline-flex items-center gap-1 rounded-md bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 text-sm font-medium">
                <i class="pi pi-pencil" aria-hidden="true"></i> Edit
              </RouterLink>
              <button @click="deletePost(postState.post?.id)"
                class="inline-flex items-center gap-1 rounded-md bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 text-sm font-medium">
                <i class="pi pi-trash" aria-hidden="true"></i> Delete
              </button>
            </div>
          </div>
        </main>

        <aside class="md:col-span-1">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="xl:flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold">Comments</h3>
              <button
                class="bg-black hover:bg-gray-700 text-white font-semibold py-1 px-3 rounded-md text-sm focus:outline-none">
                <i class="pi pi-comments"></i>
                Add your comment
              </button>
            </div>

            <div v-for="comment in comments" :key="comment?.id">
              <h4 class="text-green-800 text-lg font-bold mb-2">{{ comment?.name }}</h4>

              <p class="mb-4">
                {{ comment?.body || '' }}
              </p>
              <p class="mb-4 text-sm text-gray-400 lowercase">{{ comment?.email }}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { PostItem, CommentItem } from '@/types'
import { onMounted, ref, reactive } from 'vue'
import axios from 'axios'
import HeroBanner from '@/components/HeroBanner.vue'
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
import { useUsers } from '@/composables/usersComposable'
import { useFormatString } from '@/composables/stringsComposable'
import { useSinglePost } from '@/composables/singlePostComposable'
import BackButton from '@/components/BackButton.vue'

const route = useRoute()
const postId = route.params.id
const router = useRouter()

const postState = reactive({
  post: {} as PostItem,
  isLoading: true as boolean,
})

const comments = ref<CommentItem[]>([])

const { getUserName } = useUsers()
const { firstLetterUppercase } = useFormatString()
const { deletePost } = useSinglePost()

onMounted(() => {
  axios
    .get(`/api/posts/${postId}`)
    .then((response) => {
      postState.post = response.data
    })
    .catch((error) => {
      console.error('Error loading post:', error)
    })
    .finally(() => {
      postState.isLoading = false
    })
})

axios.get(`/api/posts/${postId}/comments`).then((response) => {
  comments.value = response.data
})
</script>
