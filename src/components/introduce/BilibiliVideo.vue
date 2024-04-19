<template>
    <iframe
        :src="url"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        style="width: 100%; aspect-ratio: 16/9"
    >
    </iframe>
</template>

<script lang="ts">
export default {
    props: {
        bvid: {
            type: String,
            required: true,
        },
        cid: String,
    },
    data() {
        return {
            url: "",
        };
    },
    mounted() {
        var baseUrl = `https://player.bilibili.com/player.html?danmaku=0&bvid=${this.bvid}`;

        if (this.cid != undefined && this.cid != "") baseUrl += "&cid=" + this.cid;

        this.url = baseUrl;
    },
};
</script>
