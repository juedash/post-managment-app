<template>
  <article class="bg-white rounded-xl shadow-md relative flex flex-col h-full">
    <router-link :to="{ name: 'post', params: { id: post?.id } }" class="flex flex-col h-full">
      <div class="p-4 flex flex-col flex-grow">
        <h3 class="text-xl font-bold">{{ firstLetterUppercase(post?.title) }}</h3>

        <div class="flex-grow my-4">
          <div>
            {{ firstLetterUppercase(truncatedDesc) }}
          </div>
        </div>

        <div class="pt-4 border-t border-gray-100 flex justify-between items-center">
          <div class="text-orange-700 flex items-center gap-1 text-sm">
            <i class="pi pi-user" aria-hidden="true" />
            {{ user }}
          </div>
          <button
            class="text-gray-700 hover:text-gray-900 group flex items-center gap-1 text-sm"
            :aria-label="`Read full post: ${post?.title}`"
            type="button"
          >
            <span class="group-hover:underline">Read more </span
            ><i class="pi pi-angle-double-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFormatString } from '@/composables/stringsComposable'

const props = defineProps({
  post: {
    type: Object,
  },
  user: {
    type: String,
  },
})

const { firstLetterUppercase } = useFormatString()

const truncatedDesc = computed(() => {
  const desc = props.post?.body
  return desc.substring(0, 120) + '...'
})
</script>
