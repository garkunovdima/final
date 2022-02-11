<template>
  <div class="my-4">
    <div v-for="post in posts" :key="post">
      <post-component :crudrule="crudrule" :post="post"></post-component>
    </div>
  </div>
</template>
<script>
import PostComponent from "@/components/PostComponent.vue";

export default {
  name: "FeedComponent",
  props: {
    data: { default: [] },
    crudrule: { type: Boolean, default: false },
  },
  components: { PostComponent },
  computed: {
    posts() {
      return this.$store.getters["posts/posts"];
    },
  },
  mounted() {
    this.$store.dispatch("posts/gotPosts", this.data);
  },
};
</script>
<style scoped>
</style>