<template>
    <div id="title-area">
        <div class="cover">游戏动作</div>
        <div class="title">AnimationGPT 动作大模型</div>
        <div>
            <el-button
                class="my-btn"
                style="box-shadow: 0 0 5px"
                v-for="router in routers"
            >
                <SvgIcon
                    :name="router.name"
                    color="#409eff"
                    :size="18"
                ></SvgIcon
                ><span>{{ router.label }}</span></el-button
            >
        </div>
        <p style="margin: 30px 0 40px 0">
            Yihao Liao, Yiyu Fu, Ziming Cheng ,Jiangfeiyang Wang
        </p>
    </div>

    <div id="body-area">
        <SubTitle top="Article" bottom="Abstract" />
    </div>
</template>

<script lang="ts">
import SvgIcon from "../components/SvgIcon.vue";
import SubTitle from "../components/SubTitle.vue";

export default {
    components: {
        SvgIcon,
        SubTitle,
    },
    data() {
        return {
            routers: [
                {
                    name: "app",
                    label: "Demo",
                    url: "/demo",
                },
                {
                    name: "article",
                    label: "Article",
                    url: "www.baidu.com",
                },
                {
                    name: "github",
                    label: "Github",
                    url: "/demo",
                },
            ],
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
        margin-top: 40px;
        margin-bottom: 50px;

        position: relative;
    }

    .cover {
        color: white;
        font-size: 128px;
        font-weight: bold;
        opacity: 0.5;
        text-align: center;
        letter-spacing: 30px;

        width: 100%;
        left: 50%;
        transform: translateX(-50%);

        user-select: none;

        position: absolute;

        margin-top: 0;
    }
}

#body-area {
    padding: 30px 150px;
}
</style>
