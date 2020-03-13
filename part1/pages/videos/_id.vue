<template>
    <nuxt-child :video="$store.state.currentVideo" />
</template>

<script>
export default {
    head() {
        return {
            title: "",
            titleTemplate: `%s ${this.$store.state.currentVideo.name} - Vue Screencasts`
        };
    },
    async fetch({ $axios, params, store }) {
        console.log(params.id);
        let response = await $axios.get(`/videos/${params.id}`);
        let video = response.data.data;
        video.attributes.id = video.id;

        console.log(video.attributes);
        store.commit("SET_CURRENT_VIDEO", video.attributes);
    }
};
</script>

<style></style>
