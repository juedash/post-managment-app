import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { api } from '@/lib/api'
import type { PostItem, AddEdit } from '@/types'

type ConfirmFn = (opts?: { title?: string; message?: string }) => Promise<boolean>

export function useSinglePost(confirm?: ConfirmFn) {
  const router = useRouter()
  const toast = useToast()

  const post = ref<PostItem | null>(null)
  const isLoading = ref(false)

  const fetchPost = async (postId: string | number) => {
    isLoading.value = true
    try {
      const { data } = await api.get<PostItem>(`/posts/${postId}`)
      post.value = data
      return data
    } catch (e) {
      toast.error('Error loading post.')
      throw e
    } finally {
      isLoading.value = false
    }
  }

  const updatePost = async (postId: string | number, value: AddEdit) => {
    const current = post.value
    if (!current) {
      toast.error('Post not loaded yet.')
      return
    }

    const updatedPost: PostItem = {
      ...current,
      title: value.title ?? current.title,
      body: value.body ?? current.body,
      userId: value.userId ?? current.userId,
    }

    try {
      await api.put(`/posts/${postId}`, updatedPost)
      post.value = updatedPost
      toast.success('Post was updated successfully!')
      setTimeout(() => router.push({ name: 'post', params: { id: postId } }), 100)
      return updatedPost
    } catch (e) {
      toast.error('Something went wrong. Please save the edits again!')
      throw e
    }
  }

  const deletePost = async (postId: number) => {
    if (confirm) {
      const ok = await confirm({
        title: 'Delete post?',
        message: 'Do you really want to delete this post? This cannot be undone.',
      })
      if (!ok) return
    }

    try {
      await api.delete(`/posts/${postId}`)
      toast.success('Post was deleted successfully!')
      router.push('/')
    } catch (e) {
      toast.error('Something went wrong while deleting the post. Please try again!')
      throw e
    }
  }

  return {
    post,
    isLoading,
    fetchPost,
    updatePost,
    deletePost,
  }
}
