<template>
    <div id="title-area">
        <div class="cover">游戏动作</div>
        <div class="title">AnimationGPT 动作大模型</div>
        <div>
            <el-button
                class="my-btn"
                style="box-shadow: 0 0 5px"
                v-for="router in routers"
                @click="router.action"
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
        <p>
            Though the advancement of pre-trained large language models unfolds,
            the exploration of building a unified model for language and other
            multimodal data, such as motion, remains challenging and untouched
            so far. Fortunately, human motion displays a semantic coupling akin
            to human language, often perceived as a form of body language. By
            fusing language data with large-scale motion models, motion-language
            pre-training that can enhance the performance of motion-related
            tasks becomes feasible. Driven by this insight, we propose
            MotionGPT, a unified, versatile, and user-friendly motion-language
            model to handle multiple motion-relevant tasks. Specifically, we
            employ the discrete vector quantization for human motionand transfer
            3D motion into motion tokens, similar to the generation process
            ofword tokens. Building upon this “motion vocabulary”, we perform
            language modeling on both motion and text in a unified manner,
            treating human motion as a specific language. Moreover, inspired by
            prompt learning, we pre-train MotionGPT with a mixture of
            motion-language data and fine-tune it on prompt-based
            question-and-answer tasks. Extensive experiments demonstrate that
            MotionGPT achieves state-of-the-art performances on multiple motion
            tasks including text-driven motion generation, motion captioning,
            motion prediction, and motion in-between.
        </p>

        <ExampleDisplay />

        <SubTitle top="Our" bottom="Method" />
        <p>
            To involve large language data and models in the motion generation
            tasks, we propose a unified motion-language framework named
            MotionGPT. MotionGPT consists of a motion tokenizer responsible for
            converting raw motion data into discrete motion tokens, as well as a
            motion-aware language model that learns to understand the motion
            tokens from large language pre-training models by corresponding
            textual descriptions.
        </p>
        <el-image :src="methodUrl"></el-image>

        <el-divider></el-divider>
    </div>
</template>

<script lang="ts">
import SvgIcon from "../components/SvgIcon.vue";
import SubTitle from "../components/SubTitle.vue";
import ExampleDisplay from "../components/ExampleDisplay.vue";

export default {
    components: {
        SvgIcon,
        SubTitle,
        ExampleDisplay,
    },
    data() {
        return {
            methodUrl: new URL(`../assets/test/method.png`, import.meta.url)
                .href,
            routers: [
                {
                    name: "app",
                    label: "Demo",
                    action: () => {
                        this.$router.push("/demo");
                    },
                },
                {
                    name: "article",
                    label: "Article",
                    action: () => {
                        window.location.href = "https://www.zhihu.com/";
                    },
                },
                {
                    name: "github",
                    label: "Github",
                    action: () => {
                        window.location.href =
                            "https://github.com/fyyakaxyy/animationGPT";
                    },
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
        text-align: center;
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

    p {
        font-size: 18px;
        line-height: 1.5em;
    }
}
</style>
