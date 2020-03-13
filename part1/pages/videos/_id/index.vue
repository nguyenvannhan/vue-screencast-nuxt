<template>
  <div>We are in video {{ video.name }}</div>
</template>

<script>
export default {
  props: ['video'],
  head: {
      title: 'Watch',
  }
}
</script>

<style>
</style>
