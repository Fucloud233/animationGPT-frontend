<template>
    <div id="title-area">
        <div class="cover">{{ $t("introduce.coverTitle") }}</div>
        <div class="title">{{ $t("introduce.mainTitle") }}</div>
        <div class="jump">
            <el-button class="my-btn" style="box-shadow: 0 0 5px" v-for="router in routers" @click="router.action">
                <SvgIcon :name="router.name" color="#409eff" :size="18"></SvgIcon
                ><span>{{ router.label }}</span></el-button
            >
        </div>
        <p style="margin: 30px 0 40px 0; position: relative">Yihao Liao, Yiyu Fu, Ziming Cheng, Jiangfeiyang Wang</p>
    </div>

    <div id="body-area">
        <!-- 摘要 -->
        <SubBlock top-title="article" main-title="abstract">
            <template #tail> <ExampleDisplay></ExampleDisplay></template>
        </SubBlock>

        <!-- 方法 -->
        <SubBlock top-title="our" main-title="method">
            <template #tail> <el-image :src="methodUrl"></el-image></template>
        </SubBlock>

        <!-- 数据集 -->
        <SubBlock top-title="our" main-title="datasets">
            <template #tail> <BilibiliVideo :bvid="bvid" :cid="cid"></BilibiliVideo></template>
        </SubBlock>

        <el-divider></el-divider>
        <Footer></Footer>
    </div>
</template>

<script lang="ts">
import SvgIcon from "../components/SvgIcon.vue";
import SubBlock from "../components/introduce/SubBlock.vue";
import ExampleDisplay from "../components/introduce/ExampleDisplay.vue";
import BilibiliVideo from "../components/introduce/BilibiliVideo.vue";

import Footer from "../components/Footer.vue";

export default {
    components: {
        SvgIcon,
        SubBlock,
        ExampleDisplay,
        BilibiliVideo,
        Footer,
    },
    data() {
        const config = window.config.introduce;
        return {
            methodUrl: new URL(`../assets/method.png`, import.meta.url).href,
            routers: [
                {
                    name: "app",
                    label: "Demo",
                    action: () => {
                        this.$router.push({ name: "demo" });
                    },
                },
                {
                    name: "article",
                    label: "Article",
                    action: () => {
                        // this.$router.push({ name: "article" });
                        window.location.href = config.articleUrl;
                    },
                },
                {
                    name: "github",
                    label: "Github",
                    action: () => {
                        window.location.href = "https://github.com/fyyakaxyy/animationGPT";
                    },
                },
            ],

            cid: config.cid,
            bvid: config.bvid,
        };
    },
};
</script>

<style scoped>
#title-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    height: fit-content;
    background-color: #deeeff;
    .title {
        color: #409eff;
        font-size: 72px;
        font-weight: bold;
        text-align: center;
        margin-top: 40px;
        margin-bottom: 50px;

        user-select: none;

        position: relative;
    }

    .cover {
        color: white;
        font-size: 128px;
        font-weight: bold;
        opacity: 0.5;
        text-align: center;
        letter-spacing: 15px;

        width: 100%;
        left: 50%;
        transform: translateX(-50%);

        user-select: none;

        position: absolute;

        margin-top: 0;
    }

    .jump {
        position: relative;
    }
}

#body-area {
    padding: 15px 15%;
    font-size: 18px;
    line-height: 1.5em;
    white-space: pre-wrap;
    text-align: justify;
}
</style>
