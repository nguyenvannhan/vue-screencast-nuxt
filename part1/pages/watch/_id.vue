<template>
    <v-container>
        <v-row>
            <v-col md="9" cols="12">
                <div
                    ref="videoPlayer"
                    class="video-player-box"
                    v-video-player:myVideoPlayer="playerOptions"
                ></div>
                <!-- @ended="markPlayed" -->
            </v-col>

            <v-col md="3" cols="12">
                <div class="display-1">{{ video.name }}</div>
                <!-- <div class="green--text" v-if="isPlayed(video.id)">
                    <font-awesome-icon icon="check"></font-awesome-icon
                    >&nbsp;Played
                </div>
                <div v-else>
                    <v-btn x-small @click="markPlayed" v-if="currentUser.name"
                        >Mark Played</v-btn
                    >
                </div> -->
                <div v-html="video.description"></div>

                <span v-for="tag_id in video.tag_ids" :key="tag_id">
                    <v-btn color="green lighten-2" class="mr-1 mb-1">
                        {{ getTag(tag_id) && getTag(tag_id).name }}
                    </v-btn>
                    <!-- :to="{ name: 'tag', params: { id: tag_id } }" -->
                </span>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import "video.js/dist/video-js.css";
import Vue from "vue";

// import { mapGetters, mapState } from "vuex";

if (process.browser) {
    const VueVideoPlayer = require("vue-video-player/dist/ssr");
    Vue.use(VueVideoPlayer);
}

export default {
    async asyncData({ $axios, params }) {
        let response = await $axios.get(`/videos/${params.id}`);
        let video = response.data.data;

        video.attributes.id = video.id;
        video.attributes.tag_ids = video.relationships.tags.data.map(t => t.id);

        let tags = video.relationships.tags.data;
        tags.forEach(t => {
            t.attributes.id = t.id;
        });

        return {
            video: video.attributes,
            tags: tags.map(t => t.attributes)
        };
    },
    computed: {
        // video() {
        //     return this.videos.find(vid => vid.id == this.$route.params.id);
        // }
        // ...mapGetters({
        //     getTag: "tags/getTag",
        //     isPlayed: "users/isPlayed"
        // }),
        // ...mapState({
        //     videos: state => state.videos.videos,
        //     currentUser: state => state.users.currentUser
        // }),
        playerOptions() {
            return {
                language: "en",
                playbackRates: [0.7, 1.0, 1.5, 2.0, 2.5, 3.0],
                sources: [
                    {
                        type: "video/mp4",
                        src: this.video.video_url
                    }
                ],
                poster: this.video.thumbnail_url,
                fluid: true
            };
        }
    },
    // methods: {
    //     markPlayed() {
    //         this.$store.dispatch("users/markPlayed", this.video.id);
    //     }
    // }

    methods: {
        getTag(tagId) {
            return this.tags.find(t => t.id === tagId);
        }
    }
};
</script>

<style lang="scss"></style>
