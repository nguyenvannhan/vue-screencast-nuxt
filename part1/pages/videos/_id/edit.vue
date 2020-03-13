<template>
  <div>
    Editing {{ video.name }}
    <nuxt-link :to="`/videos`">
      <button>Go back to show</button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['video'],
  head: {
      title: 'Edit',
  }
}
</script>

<style>

</style>
