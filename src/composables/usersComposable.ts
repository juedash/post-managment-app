import axios from 'axios'
import { onMounted, ref } from 'vue'
import type { UserItem } from '@/types'

export function useUsers() {
  const users = ref<UserItem[]>([])

  const fetchUsers = async () => {
    axios.get('/api/users').then((response) => (users.value = response.data))
  }

  onMounted(() => {
    fetchUsers()
  })

  const getUserName = (id: number): string => {
    const user = users.value.find((u) => u.id === id)
    return user ? user.name : 'Anonymous'
  }

  const getUserNameShort = (id: number): string => {
    const user = users.value.find((u) => u.id === id)
    return user ? user.username : 'Anonymous'
  }

  return {
    users,
    getUserName,
    getUserNameShort,
  }
}
