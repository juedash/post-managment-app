<template>
  <section class="container-xl lg:container px-2 md:mx-auto my-6">
    <div
      v-if="isLoading"
      class="text-center text-gray-500 py-6 w-full h-64 flex items-center"
    >
      <PacmanLoader class="mx-auto text-gray-500" />
    </div>

    <div v-else>
      <div v-if="posts.length">
        <div class="flex justify-center lg:justify-between flex-wrap gap-2">
          <label for="search-bar" class="sr-only">Search posts by title</label>
          <input
            id="search-bar"
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="border-b border-gray-400 py-2 px-3 w-full lg:w-1/3 focus:border-green-600 focus:outline-none"
          />

          <label for="users" class="sr-only">Filter posts by user</label>
          <select
            id="users"
            name="filter-by-user"
            v-model="selectedUser"
            class="border border-gray-400 rounded py-2 px-3 lg:right-0 focus:border-green-600 focus:outline-none focus:invalid:border-pink-500"
          >
            <option :value="null">All users</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6 mt-12 mb-6">
          <PostListItem
            v-for="post in displayedPosts"
            :key="post.id"
            :post="post"
            :user="getUserName(post.userId)"
          />
        </div>
      </div>

      <div v-else class="flex flex-col items-center w-full gap-4 mt-26">
        <h2 class="text-xl">No posts published yet!</h2>
        <router-link
          class="block border text-center py-2 px-6 rounded-md hover:bg-gray-700 hover:text-white"
          :to="{ name: 'add-post' }"
        >
          Add post <i class="pi pi-plus ml-1"></i>
        </router-link>
      </div>

      <button
        v-if="loadedItems < filteredPosts.length && filteredPosts.length > 15"
        class="block bg-black text-white text-center py-2 px-6 rounded-xl hover:bg-gray-700 mx-auto mb-6"
        type="button"
        aria-label="load 15 more posts"
        @click="loadMoreHandeling"
      >
        Load older posts
      </button>
    </div>
  </section>
</template>


<script setup lang="ts">
import PostListItem from '@/components/PostListItem.vue'
import { ref, computed } from 'vue'
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
import type { PostItem } from '@/types'
import { useUsers } from '@/composables/useUsers'
import { usePosts } from '@/composables/usePosts'
import { type PropType } from 'vue'

defineProps({
  limit: {
    type: Number as PropType<number>,
    default: 6,
  },
})

const { users, getUserName } = useUsers()
const { posts, isLoading } = usePosts()

const selectedUser = ref<number | null>(null)
const loadedItems = ref<number>(15)
const searchQuery = ref<string>('')

const filteredPosts = computed(() => {
  const searchLower = searchQuery.value.toLowerCase()

  return posts.value
    .filter((post: PostItem) => !selectedUser.value || post.userId === selectedUser.value)
    .filter((post) => post.title?.toLowerCase().includes(searchLower))
})

const displayedPosts = computed(() => filteredPosts.value.slice(0, loadedItems.value))

const loadMoreHandeling = () => {
  loadedItems.value += 15
}
</script>

