<template>
  <Form @submit="onSubmit" :validation-schema="schema" class="space-y-4" v-slot="{ meta }">
    <div>
      <label class="block text-gray-700 font-bold mb-2">Title</label>
      <Field name="title" type="text"
        class="border border-gray-300 rounded w-full py-2 px-3 focus:border-green-600 focus:outline-none" />
      <ErrorMessage name="title" class="text-red-500 text-sm" />
    </div>

    <div>
      <label for="userId" class="block text-gray-700 font-bold mb-2">Author</label>
      <Field name="userId" as="select" id="userId"
        class="border border-gray-300 rounded py-2 px-3 w-full focus:border-green-600 focus:outline-none focus:invalid:border-pink-500">
        <option selected disabled :value="0">-- Select an author --</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </Field>
      <ErrorMessage name="userId" class="text-red-500 text-sm" />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2">Description</label>
      <Field name="body" as="textarea"
        class="border border-gray-300 rounded w-full py-2 px-3 min-h-[200px] resize-y focus:border-green-600 text-base leading-relaxed font-sans focus:outline-none" />
      <ErrorMessage name="body" class="text-red-500 text-sm mt-1" />
    </div>
    <div class="flex gap-2 justify-end">
      <button type="button" @click="emit('onCancelClick')"
        class="block border text-right py-2 px-6 rounded-xl hover:bg-gray-700 hover:text-white right-0 mb-6">
        Cancel
      </button>
      <button type="submit" :disabled="!meta.touched" :class="[
        'block text-white text-right py-2 px-6 rounded-xl  right-0 mb-6',
        meta.touched ? ' bg-black hover:bg-gray-700' : 'bg-gray-300',
      ]">
        Save
      </button>
    </div>
  </Form>
</template>
<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { object, string, number } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import type { AddEdit } from '@/types'
import { useUsers } from '@/composables/usersComposable'

const { users } = useUsers()

const props = withDefaults(
  defineProps<{
    title?: string
    body?: string
    userId?: number | null
  }>(),
  {
    title: '',
    body: '',
    userId: 0,
  },
)

const schema = toTypedSchema(
  object({
    title: string().required('Title is required').default(props.title),
    body: string().required('Description is required').default(props.body),
    userId: number().required('Author is required').default(props.userId),
  }),
)

const emit = defineEmits<{
  (e: 'onDataChange', payload: AddEdit): void
  (e: 'onCancelClick'): void
}>()

const onSubmit = (values: AddEdit) => {
  emit('onDataChange', values)
}
</script>
