<template>
    <div>
        <h1>Videos</h1>

        <div v-for="video in $store.state.videos" :key="video.id">
            <nuxt-link :to="`/videos/${video.id}`">{{ video.name }}.</nuxt-link>
            <nuxt-link :to="`/videos/${video.id}/edit`">
                <button>Edit</button>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    head: {
        title: "Vue Screencasts - Video List"
    },
    async fetch({ $axios, store }) {
        let response = await $axios.get("/videos");
        let videos = response.data.data;

        videos.forEach(v => (v.attributes.id = v.id));

        store.commit(
            "SET_VIDEOS",
            videos.map(v => v.attributes)
        );
    },
    computed: {
        ...mapState({
            video: "currentVideo"
        })
    }
};
</script>

<style></style>
