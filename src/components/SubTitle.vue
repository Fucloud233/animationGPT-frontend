<template>
    <div>
        <p id="top">{{ top }}</p>
        <p id="bottom">{{ bottom }}</p>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        top: String,
        bottom: String,
    },
};
</script>

<style scoped>
#top {
    font-size: 22px;
    margin-bottom: 5px;
    color: #409eff;
}
#bottom {
    font-size: 26px;
    margin-top: 0;
    font-weight: bold;
}
</style>
