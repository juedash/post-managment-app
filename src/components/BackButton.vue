<template>
  <section>
    <div class="container m-auto py-6">
      <button
        class="text-black hover:text-gray-700 flex items-center"
        @click="$emit('onBackClick')"
      >
        <i class="pi pi-arrow-circle-left mr-2"></i> Back
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits(['onBackClick'])
</script>
