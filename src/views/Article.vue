<template>
    <div id="main">
        <ArticleContent style="max-width: 80%" />
    </div>
</template>

<script lang="ts">
import ArticleContent from "../assets/article.md";
import "../assets/theme/index.css";

export default {
    components: {
        ArticleContent,
    },
};
</script>

<style>
#main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
}
</style>
