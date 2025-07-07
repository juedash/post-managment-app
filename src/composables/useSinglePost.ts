import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import axios from 'axios'

export function useSinglePost() {
  const router = useRouter()
  const toast = useToast()

  const deletePost = (postId: number) => {
    if (window.confirm('Do you want to delete the item?')) {
      axios
        .delete(`/api/posts/${postId}`)
        .then(() => {
          toast.success('Post was deleted successfully!')
          router.push('/')
        })
        .catch(() => {
          toast.error('Something went wrong while deleting the post. Please try again!')
        })
    }
  }

  return {
    deletePost,
  }
}
