<template>
    <div v-if="tag">
        <h1 class="display-3 ma-4 d-flex justify-center">
            Videos with Tag "{{ tag.name }}"
        </h1>
        <div class="d-flex flex-wrap">
            <div v-for="video in videoOnTag" :key="video.id">
                <VideoListVideo :video="video" :tags="tags"></VideoListVideo>
            </div>
        </div>
    </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
import VideoListVideo from "@/components/VideoListVideo.vue";

export default {
    async asyncData({ $axios, params }) {
        let response = await $axios.get(`/tags/${params.id}`);

        let tag = response.data.data;
        tag.attributes.id = tag.id;

        let videos = tag.relationships.videos.data;
        videos.forEach(v => (v.attributes.id = v.id));

        let tagsResponse = await $axios.get("/tags");
        let tags = tagsResponse.data.data;
        tags.forEach(t => (t.attributes.id = t.id));

        return {
            tag: tag.attributes,
            videoOnTag: videos.map(v => v.attributes),
            tags: tags.map(t => t.attributes)
        };
    },
    components: {
        VideoListVideo
    },
    computed: {
        // ...mapState(["videos"]),
        // ...mapGetters({
        //     getTag: "tags/getTag"
        // }),
        // tag() {
        //     return this.getTag(this.$route.params.id);
        // },
        // videoOnTag() {
        //     return this.videos.filter(v => this.tag.video_ids.includes(v.id));
        // }
    }
};
</script>
