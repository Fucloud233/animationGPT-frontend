<template>
    <p>{{ curText }}</p>
</template>

<script lang="ts">
export default {
    data() {
        const defaultId = 0;

        return {
            curText: this.texts[defaultId],
            curTextId: defaultId,
        };
    },
    props: {
        delay: {
            type: Number,
            default: 1,
        },
        texts: {
            type: Array<String>,
            default: [],
        },
    },
    mounted() {
        window.setInterval(() => {
            this.changeText();
        }, this.delay * 1000);
    },
    watch: {
        // Notice: 监听语言变化，立即更新
        "$i18n.locale": {
            handler(_val, _oldVal) {
                this.changeText();
            },
        },
    },
    methods: {
        changeText() {
            this.curTextId = (this.curTextId + 1) % 3;
            this.curText = this.texts[this.curTextId];
        },
    },
};
</script>
