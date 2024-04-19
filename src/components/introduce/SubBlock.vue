<template>
    <SubTitle :top="$t(`introduce.title.h1.${topTitle}`)" :bottom="$t(`introduce.title.h1.${mainTitle}`)" />
    <p>{{ $t(`introduce.content.${mainTitle}`) }}</p>
    <slot name="tail"></slot>
</template>

<script lang="ts">
import SubTitle from "./SubTitle.vue";

export default {
    props: {
        mainTitle: {
            type: String,
            required: true,
        },
        topTitle: {
            type: String,
            required: true,
        },
    },
    components: {
        SubTitle,
    },
};
</script>
