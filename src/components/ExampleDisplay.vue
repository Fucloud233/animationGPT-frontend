<template>
    <div>
        <!-- 1. example的选择条 -->
        <div class="select-bar">
            <el-button @click="scroll(true)" text style="margin-right: 15px">
                <el-icon><ArrowLeft /></el-icon>
            </el-button>
            <div class="examples-wrap" ref="examplesRef">
                <div v-for="i in Array(examplesSize).keys()" class="example-id-wrap">
                    <!-- 按钮点击切换视频 -->
                    <el-button
                        :style="{
                            color: i == selectId ? '#409eff' : 'gray',
                        }"
                        @click="changeExample(i)"
                        link
                    >
                        Example {{ formatId(i + 1) }}
                    </el-button>
                </div>
            </div>
            <el-button @click="scroll(false)" text style="margin-left: 15px">
                <el-icon><ArrowRight /></el-icon>
            </el-button>
        </div>

        <!-- 2. Prompt文本-->
        <p id="prompt">{{ $t("introduce.prompt") }}: {{ curPrompt }}</p>

        <!-- 3. 显示视频播放-->
        <div style="display: flex; justify-content: space-between" ref="examples">
            <!-- 根据examples数量动态控制 -->
            <div class="example-wrap" v-for="example in examples">
                <div class="kind-wrap">{{ example.label }}</div>
                <div
                    v-loading="isLoadingExample"
                    class="example-video"
                    :style="{
                        height: exampleVideoSize,
                        width: exampleVideoSize,
                    }"
                >
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
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { getGifUrl } from "../utils";

export default {
    components: {
        ArrowLeft,
        ArrowRight,
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
        window.onresize = () => {
            this.updateExampleVideoSize();
        };
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
                let name = `example/${example.value}/${this.formatId(i)}`;
                example.url = getGifUrl(name);
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
        formatId(id: number) {
            if (id < 10) {
                return "0" + id;
            } else {
                return id;
            }
        },
        scroll(isLeft: boolean) {
            // 使用总宽度来控制左右滑动的距离
            const div = this.$refs.examplesRef as HTMLDivElement;

            let step = div.clientWidth;
            if (isLeft) {
                step = -step;
            }

            if (div != undefined) {
                div.scrollLeft += step;
            }
        },
    },
};
</script>

<style scoped>
.select-bar {
    display: flex;
    padding: 8px 0 8px 0;
    border-top: 1.5px solid #409eff;
    border-bottom: 1.5px solid #409eff;
}
.examples-wrap {
    display: flex;
    flex-direction: row;

    overflow-x: hidden;
}
.example-id-wrap {
    display: flex;
    align-items: center;

    /* 设置不换行 */
    white-space: nowrap;

    padding: 0 20px;
    box-sizing: border-box;
}

#prompt {
    text-align: center;
    font-size: 20px;
    font-weight: bold;

    margin: 30px 0;
}
.example-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.kind-wrap {
    background-color: #f0f0f0;
    padding: 10px 10px;
    width: 100%;
    margin-bottom: 15px;
    font-size: 16px;
    text-align: center;

    box-sizing: border-box;
}
.example-video {
    width: 100%;
    border: 1px solid #409eff;
}
</style>
