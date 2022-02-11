<template>
  <div class="home">
    <feed-component
    ></feed-component>
  </div>
</template>

<script>
import feedComponent from '@/components/FeedComponent.vue'

export default {
  name: 'Home',
  components: {
    feedComponent,
  }
}
</script>
