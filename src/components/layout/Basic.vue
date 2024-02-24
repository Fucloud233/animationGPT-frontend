<template>
    <el-container style="height: 100%">
        <el-header>
            <a href="/" id="title">AnimationGPT</a>

            <!-- <embed src="../../assets/icon/translate.svg" type="image/svg+xml" /> -->
            <SvgIcon name="translate" color="white" />
        </el-header>
        <el-main> <slot name="main"></slot></el-main>
    </el-container>
</template>

<script lang="ts">
import SvgIcon from "../SvgIcon.vue";
// import Translate from "../../assets/icons/translate.svg";

export default { components: { SvgIcon } };
</script>

<style scoped>
#title {
    font-size: 24px;
    text-decoration: none;
    color: white;
    margin: 0;
}
.el-container {
    height: 100%;

    display: flex;
}
.el-header {
    height: 50px;
    background-color: #409eff;

    display: flex;
    align-items: center;
    padding-left: 20px;
    justify-content: space-between;
}
.el-main {
    height: 100%;
    padding: 0;
}
</style>
