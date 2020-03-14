<template>
    <v-card width="340px" hover class="ma-2">
        <nuxt-link :to="`/watch/${video.id}`">
            <v-img :src="video.thumbnail_url" />
            <v-card-title class="black--text">{{ video.name }}</v-card-title>
            <!-- <v-card-text>
            <div class="green--text" v-if="isPlayed(video.id)">
                <font-awesome-icon icon="check"></font-awesome-icon>&nbsp;Played
            </div>
        </v-card-text> -->
        </nuxt-link>
        <v-card-actions class="d-flex flex-wrap">
            <span class="mb-2" v-for="tag_id in video.tag_ids" :key="tag_id">
                <v-btn
                    class="mr-2"
                    color="green lighten-2"
                    small
                    @mousedown.stop
                    :to="`/tags/${tag_id}`"
                >
                    {{ getTag(tag_id).name }}
                </v-btn>
            </span>
        </v-card-actions>
    </v-card>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
    name: "VideoListVideo",
    methods: {
        // ...mapGetters({
        //     getTag: "tags/getTag",
        //     isPlayed: "users/isPlayed"
        // })
        getTag(tagId) {
            return this.tags.find(t => t.id === tagId);
        }
    },
    props: ["video", "tags"]
};
</script>

<style scoped lang="scss">
a {
    text-decoration: none;
}
</style>
