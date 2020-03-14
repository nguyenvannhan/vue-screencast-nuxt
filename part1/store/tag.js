export const state = () => ({
    tags: []
});

export const mutations = {
    SET_TAGS(state, tags) {
        state.tags = tags;
    },
    CREATE_TAG(state, tag) {
        state.tags = state.tags.concat(tag);
    },
    UPDATE_TAG_NAME(state, tag) {
        let tagToUPdate = state.tags.find(t => t.id == tag.id);
        tagToUPdate.name = tag.name;
    },
    DELETE_TAG(state, { id }) {
        state.tags = state.tags.filter(t => t.id != id);
    },
    CONNECT_TAG_TO_VIDEO(state, { video, tag }) {
        video.tag_ids = video.tag_ids.concat(tag.id);
        tag.video_ids = tag.video_ids.concat(video.id);
    },
    DISCONNECT_TAG_FROM_VIDEO(state, { video, tag }) {
        video.tag_ids = video.tag_ids.filter(t_id => t_id != tag.id);
        tag.video_ids = tag.video_ids.filter(v_id => v_id != video.id);
    }
};

export const actions = {
    async loadTags({ commit }) {
        let response = await Api().get("/tags");

        let tags = response.data.data;
        tags.forEach(t => {
            t.attributes.id = t.id;
        });

        commit(
            "SET_TAGS",
            tags.map(t => t.attributes)
        );
    },
    async createTag({ commit }, { name }) {
        let response = await Api().post("/tags", { name: name });
        let createdTag = response.data.data;
        createdTag.attributes.id = createdTag.id;
        createdTag = createdTag.attributes;

        commit("CREATE_TAG", createdTag);

        return createdTag;
    },
    updateTagName({ commit }, tag) {
        Api().put(`tags/${tag.id}`, { name: tag.name });
        commit("UPDATE_TAG_NAME", tag);
    },
    deleteTag({ commit }, { id }) {
        Api().delete(`tags/${id}`);

        commit("DELETE_TAG", { id });
    },
    connectTagToVideo({ commit }, { video, tag }) {
        Api().post("/video-tags", {
            video_id: video.id,
            tag_id: tag.id
        });
        commit("CONNECT_TAG_TO_VIDEO", { video, tag });
    },
    disconnectTagFromVideo({ commit }, { video, tag }) {
        Api().post("/video-tags/delete", {
            video_id: video.id,
            tag_id: tag.id
        });
        commit("DISCONNECT_TAG_FROM_VIDEO", { video, tag });
    }
};

export const getters = {
    getTag: state => id => {
        return state.tags.find(t => t.id == id);
    }
};
