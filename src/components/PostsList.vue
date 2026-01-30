<template>
  <section class="container-xl lg:container px-2 md:mx-auto my-6">
    <div class="text-center text-gray-500 py-6 w-full h-64 flex items-center" v-if="postState.isLoading">
      <PacmanLoader class="mx-auto text-gray-500" />
    </div>
    <div v-else>
      <div v-if="postState.posts.length">
        <div class="flex justify-center lg:justify-between flex-wrap gap-2">
          <label for="search-bar" class="sr-only">Filter posts by user</label>
          <input v-model="searchQuery" type="text" placeholder="Search..."
            class="border-b border-gray-400 py-2 px-3 w-full lg:w-1/3 focus:border-green-600 focus:outline-none" />
          <label for="users" class="sr-only">Filter posts by user</label>
          <select name="filter-by-user" id="users" v-model="selectedUser"
            class="border border-gray-400 rounded py-2 px-3 lg:right-0 focus:border-green-600 focus:outline-none focus:invalid:border-pink-500">
            <option selected :value="null">All users</option>
            <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
          </select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6 mt-12 mb-6">
          <PostListItem v-for="post in displayedPosts" :key="post?.id" :post="post" :user="getUserName(post?.userId)" />
        </div>
      </div>
      <div v-else class="flex flex-col items-center w-full gap-4 mt-26">
        <h2 class="text-xl">No posts published yet!</h2>
        <router-link class="block border text-center py-2 px-6 rounded-md hover:bg-gray-700 hover:text-white" :to="{
          name: 'add-post',
        }">Add post <i class="pi pi-plus ml-1"></i>
        </router-link>
      </div>
      <button class="block bg-black text-white text-center py-2 px-6 rounded-xl hover:bg-gray-700 mx-auto mb-6"
        aria-label="load 15 more posts" @click="loadMoreHandeling"
        v-if="loadedItems < postState.posts?.length && filteredPosts.length > 15">
        Load older posts
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import PostListItem from '@/components/PostListItem.vue'
import type { PostItem } from '@/types'
import { ref, onMounted, computed, reactive, type PropType } from 'vue'
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
import axios from 'axios'
import { useUsers } from '@/composables/useUsers'
defineProps({
  limit: {
    type: Number as PropType<number>,
    default: 6,
  },
})

const postState = reactive({
  posts: [] as PostItem[],
  isLoading: true as boolean,
})

const { users, getUserName } = useUsers()
const selectedUser = ref<number | null>(null)
const loadedItems = ref<number>(15)
const searchQuery = ref<string>('')

onMounted(() => {
  axios
    .get('/api/posts')
    .then((response) => {
      postState.posts = response.data
    })
    .finally(() => (postState.isLoading = false))
})

const filteredPosts = computed(() => {
  const searchLower = searchQuery.value.toLowerCase()

  return postState.posts
    .filter((post: PostItem) => !selectedUser.value || post?.userId === selectedUser.value)
    .filter((post) => post?.title?.toLowerCase().includes(searchLower))
})

const displayedPosts = computed(() => {
  return filteredPosts.value?.slice(0, loadedItems.value)
})

const loadMoreHandeling = () => {
  loadedItems.value += 15
}
</script>
