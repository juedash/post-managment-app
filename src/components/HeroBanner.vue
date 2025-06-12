<template>
  <section class="py-20 bg-cover bg-center" :style="{ backgroundImage: `url('${bgImage}')` }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div class="text-center">
        <slot name="header" class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          <h1 class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            {{ firstLetterUppercase(title) }}
          </h1>
        </slot>
        <slot>
          <p class="my-4 text-xl text-white">
            {{ firstLetterUppercase(subtitle) }}
          </p>
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import bgImage from '@/assets/blog-background.jpg'
import { useFormatString } from '@/composables/stringsComposable'

defineProps({
  title: {
    type: String,
    default: 'Blog',
  },
  subtitle: {
    type: String,
    default: 'Latest posts',
  },
})

const { firstLetterUppercase } = useFormatString()
</script>
