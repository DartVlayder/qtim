<template>
  <div>
    <h2 class="title">{{ post?.title }}</h2>
    <img :src="post?.image" alt="img" class="img">
    <div class="about">about</div>
    <p class="description">{{ post?.description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/api';

interface Post {
  id: number;
  title: string;
  image: string;
  description: string;
}

export default defineComponent({
  name: 'BlogDetail',
  setup() {
    const post = ref<Post | null>(null);
    const route = useRoute();

    const fetchPost = async () => {
      try {
        const response = await api.get(route.params.id as string);
        post.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchPost();
      console.log(post);
      
    });

    return {
      post,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  font-weight: 400;
  font-size: 84px;
  margin-bottom: 20px;
}
.img {
  margin-bottom: 20px;
}
.about {
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 16px;
}
.description {
  max-width: 40%;
  font-weight: 400;
  font-size: 36px;
  line-height: 44.64px;
}
</style>