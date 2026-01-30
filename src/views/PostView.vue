<template>
  <HeroBanner :subtitle="postState.post?.title" v-if="postState.post?.title" />
  <ConfirmDialogModal ref="confirmRef" />

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
          <CommentSection :comments="comments" />
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { PostItem, CommentItem } from '@/types'
import { onMounted, ref, reactive, watch } from 'vue'
import HeroBanner from '@/components/HeroBanner.vue'
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
import { useFormatString } from '@/composables/useFormatString'
import { useSinglePost } from '@/composables/useSinglePost'
import BackButton from '@/components/BackButton.vue'
import ConfirmDialogModal from '@/components/ConfirmDialogModal.vue'
import { api } from '@/lib/api'
import { useUsers } from '@/composables/useUsers'
import CommentSection from '@/components/CommentSection.vue'

const route = useRoute()
const router = useRouter()

const postState = reactive({
  post: null as PostItem | null,
  isLoading: true,
})

const comments = ref<CommentItem[]>([])
const confirmRef = ref<InstanceType<typeof ConfirmDialogModal> | null>(null)

const { getUserName } = useUsers()
const { firstLetterUppercase } = useFormatString()

const confirm = (opts?: { title?: string; message?: string }) => {
  if (!confirmRef.value) return Promise.resolve(false)
  return confirmRef.value.show({
    title: opts?.title,
    message: opts?.message,
    confirmText: 'Delete',
    cancelText: 'Cancel',
  })
}

const { deletePost } = useSinglePost(confirm)

const load = async () => {
  postState.isLoading = true
  postState.post = null
  comments.value = []

  const postId = String(route.params.id ?? '')

  try {
    const res = await api.get(`/posts/${postId}`)

    // ✅ handle "200 + {}" as not found
    if (!res.data || Object.keys(res.data).length === 0 || !res.data.id) {
      router.replace({ name: 'not-found' })
      return
    }

    postState.post = res.data

    const commentsRes = await api.get(`/posts/${postId}/comments`)
    comments.value = commentsRes.data
  } catch (error) {
    console.error('Error loading post:', error)
    router.replace({ name: 'not-found' })
  } finally {
    postState.isLoading = false
  }
}

onMounted(load)
watch(() => route.params.id, load)
</script>
