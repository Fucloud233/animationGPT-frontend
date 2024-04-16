<template>
    <div>
        <SelectBar :size="examplesSize" :onchange="changeExample"></SelectBar>

        <!-- 2. Prompt文本-->
        <p id="prompt">{{ $t("introduce.prompt") }}: {{ curPrompt }}</p>

        <!-- 3. 显示视频播放-->
        <div style="display: flex; flex-direction: column" ref="examples">
            <!-- 根据examples数量动态控制 -->
            <!-- 标题栏单独一行，视频显示单独一行 -->
            <div class="example-wrap" style="margin-bottom: 15px">
                <div class="kind-wrap" :style="{ width: exampleVideoSize }" v-for="example in examples">
                    <span>{{ example.label }}</span>
                </div>
            </div>

            <div class="example-wrap">
                <div
                    v-loading="isLoadingExample"
                    class="example-video"
                    :style="{
                        height: exampleVideoSize,
                        width: exampleVideoSize,
                    }"
                    v-for="example in examples"
                >
                    <!-- <video
                        :src="example.url"
                        @canplaythrough="loadExample()"
                        ref="exampleVideo"
                        :width="exampleVideoSize"
                        v-show="!isLoadingExample"
                        :autoplay="true"
                        :loop="true"
                        :muted="true"
                    /> -->
                    <!-- 使用 mp4 播放 -->
                    <img
                        :src="example.url"
                        @load="loadExample()"
                        ref="exampleVideo"
                        :width="exampleVideoSize"
                        v-show="!isLoadingExample"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { getUrlFromPicBed } from "../../utils";

import SelectBar from "./SelectBar.vue";

export default {
    components: {
        SelectBar,
    },

    data() {
        // 需要展示的类型
        const examplesConfig = window.config.examples;

        const kindList = examplesConfig.kindList;
        const kindLabelList = examplesConfig.kindLabelList;
        const defaultId = 0;

        let examples = [] as { value: string; label: string; url: string }[];
        for (let i = 0; i < kindList.length; i++) {
            examples.push({
                value: kindList[i],
                label: kindLabelList[i],
                url: "",
            });
        }

        return {
            selectId: defaultId,
            examples: examples,
            examplesSize: examplesConfig.size,

            // 图片加载状态
            isLoadingExample: false,
            exampleLoadCount: 0,

            exampleVideoSize: "",
        };
    },
    mounted() {
        this.changeExample(this.selectId);
        this.updateExampleVideoSize();

        // 动态修改视频的宽度
        window.addEventListener("resize", () => {
            this.updateExampleVideoSize();
        });
    },
    computed: {
        curPrompt() {
            const exampleList = this.$tm("introduce.examples") as Array<string>;
            return exampleList[this.selectId];
        },
    },
    methods: {
        updateExampleVideoSize() {
            const exampleRef = this.$refs.examples as HTMLDivElement;
            const n: number = this.examples.length;
            this.exampleVideoSize = (exampleRef.clientWidth * (1 - n * 0.01)) / n + "px";
        },

        changeExample(i: number) {
            this.selectId = i;

            // 更新示例图片URL
            for (let example of this.examples) {
                // let name = `examples/${example.value}/${this.formatId(i)}`;
                // example.url = getWebpUrl(name);
                example.url = getUrlFromPicBed(example.value, i);
            }

            this.isLoadingExample = true;
        },

        // 图片加载完毕调用
        loadExample() {
            this.exampleLoadCount += 1;

            if (this.exampleLoadCount == this.examples.length) {
                this.isLoadingExample = false;
                this.exampleLoadCount = 0;
            }
        },
    },
};
</script>

<style scoped>
#prompt {
    text-align: center;
    font-size: 20px;
    font-weight: bold;

    margin: 30px 0;
}
.example-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.kind-wrap {
    background-color: #f0f0f0;
    padding: 10px 10px;
    text-align: center;
    box-sizing: border-box;

    /* 设置内部文字垂直对齐 */
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.example-video {
    width: 100%;
    border: 1px solid #409eff;
}
</style>
