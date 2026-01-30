import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { api } from '@/lib/api';

export function useSinglePost(
  confirm: (opts?: { title?: string; message?: string }) => Promise<boolean>
) {
  const router = useRouter()
  const toast = useToast()

  const deletePost = async (postId: number) => {
    const ok = await confirm({
      title: 'Delete post?',
      message: 'Do you really want to delete this post? This cannot be undone.',
    })
    if (!ok) return

    try {
      await api.delete(`/posts/${postId}`)
      toast.success('Post was deleted successfully!')
      router.push('/')
    } catch {
      toast.error('Something went wrong while deleting the post. Please try again!')
    }
  }

  return { deletePost }
}
