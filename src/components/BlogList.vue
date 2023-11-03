<template>
  <div>
    <h2 class="title">Articles</h2>
    <ul class="list">
      <li v-for="post in paginatedPosts" :key="post.id" @click="goToDetailPage(post.id)" class="item">
        <a class="card">
          <div class="card__img">
            <img :src="post.image" alt="img">
          </div>
          <div class="card__preview">
            {{ post.preview }}
          </div>
          <div class="card__hover">
            <div class="card__hover__text">
              Read more
            </div>
          </div>
        </a>
      </li>
    </ul>

    <div v-if="pagination.totalPages > 1" class="paginator">
      <button @click="goToPage(pagination.currentPage - 1)" class="prev" :class="{ disabled: pagination.currentPage === 1 }">
        <img src="https://www.svgrepo.com/show/533620/arrow-sm-left.svg" alt="prev" class="prev__img">
      </button>
      <div class="paginator__numbers">
        <button v-for="page in displayedPages" :key="page" @click="goToPage(page)" class="paginator__number" :class="{ active: page === pagination.currentPage }">
          {{ page }}
        </button>
      </div>
      <button @click="goToPage(pagination.currentPage + 1)" class="next" :class="{ disabled: pagination.currentPage === pagination.totalPages }">
        <img src="https://www.svgrepo.com/show/533621/arrow-sm-right.svg" alt="prev" class="next__img">
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue';
import router from '../router/index';
import api from '@/api';

interface Post {
  id: number;
  image: string;
  preview: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
}

export default defineComponent({
  name: 'BlogList',
  setup() {
    const posts = ref<Post[]>([]);
    const pagination = reactive<Pagination>({
      currentPage: 1,
      totalPages: 1,
    });


    const goToDetailPage = (id: number) => {
      router.push(`/blog/${id}`);
    };
    const fetchBlogPosts = async () => {
      try {
        const response = await api.get("");
        posts.value = response.data;
        pagination.totalPages = Math.ceil(posts.value.length / 8);
        console.log(posts);
      } catch (error) {
        console.error(error);
      }
    };

    const paginatedPosts = computed(() => {
      const startIndex = (pagination.currentPage - 1) * 8;
      const endIndex = startIndex + 8;
      return posts.value.slice(startIndex, endIndex);
    });
    const displayedPages = computed(() => {
      const totalPages = pagination.totalPages;
      const currentPage = pagination.currentPage;

      const maxDisplayedPages = 5;

      let startPage = Math.max(currentPage - Math.floor(maxDisplayedPages / 2), 1);
      let endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages);

      if (endPage - startPage + 1 < maxDisplayedPages) {
        startPage = Math.max(endPage - maxDisplayedPages + 1, 1);
      }

      if (endPage - startPage + 1 > maxDisplayedPages) {
        endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages);
      }

      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    });

    const goToPage = async (page: number) => {
      try {
        const response = await api.get(`?page=${page}`);
        posts.value = response.data;
        pagination.currentPage = page;
      } catch (error) {
        console.error(error);
      }
    };

    return {
      posts,
      paginatedPosts,
      pagination,
      fetchBlogPosts,
      goToDetailPage,
      goToPage,
      displayedPages,
    };
  },
  mounted() {
    this.fetchBlogPosts();
  },
});
</script>

<style lang="scss">
  .title {
    font-weight: 400;
    font-size: 84px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .item {
    flex-basis: 25%; 
  }
  .card {
    margin-right: 5px;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    &__img {
      margin-bottom: 10px;
    }
    &__preview {
      font-size: 20px;
      line-height: 24px;
      font-weight: 400;
    }
    &:hover .card__hover {
      display: block;
    }
    &__hover {
      display: none;
      &__text {
        color: #E2BEFF;
      }
    }
  }
  .paginator {
    display: flex;
    align-items: center;
    &__numbers {
      margin-right: 20px;
    }
    &__number {
      margin-right: 5px;
      width: 44px;
      height: 44px;
      border: 1px solid grey;
      border-radius: 20%;
      background: #fff;
      &:hover {
        background: #E8E8E8;
        color: black;
      }
    }
  }
  .prev, .next {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    width: 44px;
    height: 44px;
    border: 1px solid grey;
    border-radius: 20%;
    margin-right: 20px;
    &__img{
      width: 20px;
    }
    &:hover {
      background: #E8E8E8;
    }
  }
  .active {
    background: black;
    font-weight: bold;
    color: #fff;
  }
  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }
</style>