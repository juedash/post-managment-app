import { ref, onMounted } from 'vue'
import type { PostItem } from '@/types'
import { api } from '@/lib/api'
import { useToast } from 'vue-toastification'

type UsePostsOptions = {
  immediate?: boolean
}

export function usePosts(options: UsePostsOptions = {}) {
  const { immediate = true } = options

  const posts = ref<PostItem[]>([])
  const isLoading = ref<boolean>(false)
  const error = ref<unknown>(null)

  const toast = useToast();

  const fetchPosts = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await api.get('/posts')
      posts.value = response.data
    } catch (e) {
      error.value = e
      toast.error('Something went wrong. Please reload the page!')
    } finally {
      isLoading.value = false
    }
  }

  if (immediate) {
    onMounted(fetchPosts)
  }

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
  }
}
