<template>
  <section>
    <div class="xl:flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold">Comments</h3>

      <button type="button" @click="toggleForm"
        class="bg-black hover:bg-gray-700 text-white font-semibold py-1 px-3 rounded-md text-sm focus:outline-none">
        <i :class="isFormOpen ? 'pi pi-times' : 'pi pi-comments'" aria-hidden="true"></i>
        {{ isFormOpen ? 'Close' : 'Add your comment' }}
      </button>
    </div>

    <div v-if="isFormOpen" class="mb-6 bg-white rounded-lg border p-4">
      <label class="sr-only" for="comment">Your comment</label>

      <textarea id="comment" ref="commentEl" v-model.trim="newComment" rows="4" placeholder="Write your comment..."
        class="w-full border rounded-md p-3 focus:outline-none focus:border-green-600" />

      <div class="mt-3 flex gap-2 justify-end">
        <button type="button" @click="cancel" class="px-3 py-1 rounded-md border hover:bg-gray-50">
          Cancel
        </button>

        <button type="button" :disabled="!newComment" @click="submit"
          class="px-3 py-1 rounded-md bg-black text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
          Post
        </button>
      </div>
    </div>

    <div v-for="comment in comments" :key="comment?.id">
      <h4 class="text-green-800 text-lg font-bold mb-2">{{ comment?.name }}</h4>
      <p class="mb-4">{{ comment?.body || '' }}</p>
      <div class="mb-4 text-sm small text-right">
        <p class="font-semibold">{{ comment?.name }}</p>
        <p class=" text-gray-400 lowercase">{{ comment?.email }}</p>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { CommentItem } from '@/types'

defineProps<{
  comments: CommentItem[]
}>()

const isFormOpen = ref(false)
const newComment = ref('')
const commentEl = ref<HTMLTextAreaElement | null>(null)

const toggleForm = async () => {
  isFormOpen.value = !isFormOpen.value

  if (isFormOpen.value) {
    await nextTick()
    commentEl.value?.focus()
  }
}

const cancel = () => {
  newComment.value = ''
  isFormOpen.value = false
}

const submit = () => {
  console.log('New comment:', newComment.value)

  newComment.value = ''
  isFormOpen.value = false
}
</script>
