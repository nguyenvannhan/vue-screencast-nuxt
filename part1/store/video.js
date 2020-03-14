export const state = () => ({
    videos: []
});

export const mutations = {
    SET_VIDEOS(state, videos) {
        state.videos = videos;
    },
    ADD_VIDEO(state, video) {
        let videos = state.videos.concat(video);
        state.videos = videos;
    },
    DELETE_VIDEO(state, videoId) {
        let videos = state.videos.filter(v => v.id != videoId);
        state.videos = videos;
    },
    EDIT_VIDEO(state, video) {
        state.videos.forEach(v => {
            if (v.id == video.id) {
                v = video;
            }
        });
    }
};

export const actions = {
    async loadVideos({ commit }) {
        let response = await Api().get("/videos");
        let videos = response.data.data;

        videos.forEach(v => {
            v.attributes.id = v.id;
            v.attributes.tag_ids = v.relationships.tags.data.map(t => t.id);
        });

        commit(
            "SET_VIDEOS",
            videos.map(v => v.attributes)
        );
    },
    async createVideo({ commit }, video) {
        let response = await Api().post("/videos", video);

        let savedVideo = response.data.data;

        savedVideo = { id: savedVideo.id, ...savedVideo.attributes };
        commit("ADD_VIDEO", savedVideo);
        return savedVideo;
    },
    async deleteVideo({ commit }, video) {
        let response = await Api().delete(`/videos/${video.id}`);

        if (response.status == 200 || response.status == 204) {
            commit("DELETE_VIDEO", video.id);
        }
    },
    async editVideo({ commit }, video) {
        let response = await Api().put(`/videos/${video.id}`, video);

        let newVideo = response.data.data;

        newVideo = { id: newVideo.id, ...newVideo.attributes };

        commit("EDIT_VIDEO", newVideo);

        return newVideo;
    }
};
