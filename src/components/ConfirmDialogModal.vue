<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      @click.self="cancel"
    >
      <div
        class="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
        role="dialog"
        aria-modal="true"
      >
        <h3 class="text-lg font-semibold text-slate-900">{{ title }}</h3>
        <p class="mt-2 text-sm leading-6 text-slate-600">
          {{ message }}
        </p>

        <div class="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.99]"
            @click="cancel"
          >
            {{ cancelText }}
          </button>

          <button
            type="button"
            class="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 active:scale-[0.99]"
            @click="confirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ConfirmationModalOptions as Options } from '@/types'

const open = ref(false)

const title = ref('Confirm')
const message = ref('Are you sure?')
const confirmText = ref('Delete')
const cancelText = ref('Cancel')

let resolveFn: ((v: boolean) => void) | null = null

function show(options: Options = {}) {
  title.value = options.title ?? 'Confirm'
  message.value = options.message ?? 'Are you sure?'
  confirmText.value = options.confirmText ?? 'Confirm'
  cancelText.value = options.cancelText ?? 'Cancel'

  open.value = true

  return new Promise<boolean>((resolve) => {
    resolveFn = resolve
  })
}

function close(result: boolean) {
  open.value = false
  resolveFn?.(result)
  resolveFn = null
}

function confirm() {
  close(true)
}

function cancel() {
  close(false)
}

defineExpose({ show })
</script>
