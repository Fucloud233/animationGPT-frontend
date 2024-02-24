<template>
    <!-- 通过变量设置属性 -->
    <Icon :style="{ width: width, fill: color }"></Icon>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    width: {
        type: Number,
        default: 32,
    },
    color: {
        type: String,
        default: "black",
    },
});

const Icon = defineAsyncComponent(
    () => import(`../assets/icons/${props.name}.svg`)
);
</script>
