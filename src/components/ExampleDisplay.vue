<template>
    <div>
        <!-- 1. example的选择条 -->
        <div class="select-bar">
            <el-button @click="scroll(true)" text style="margin-right: 15px">
                <el-icon><ArrowLeft /></el-icon>
            </el-button>
            <div class="examples-wrap" ref="examplesRef">
                <div v-for="i in Array(30).keys()" class="example-id-wrap">
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
        <div style="display: flex; justify-content: space-between">
            <!-- 根据examples数量动态控制 -->
            <div
                class="example-wrap"
                v-for="example in examples"
                :style="{ width: videoSize, height: videoSize }"
            >
                <div class="kind-wrap">{{ example.kind }}</div>
                <el-image :src="example.url"></el-image>
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
        const kindList = ["Original", "S4-50", "S4-70"];
        const defaultId = 0;

        let examples = [] as { kind: string; url: string }[];
        for (let kind of kindList) {
            examples.push({
                kind: kind,
                url: "",
            });
        }

        return {
            selectId: defaultId,
            examples: examples,
            videoSize: 100 / examples.length - 1 + "%",
        };
    },
    mounted() {
        this.changeExample(this.selectId);
    },
    computed: {
        curPrompt() {
            const exampleList = this.$tm("introduce.examples") as Array<string>;
            return exampleList[this.selectId];
        },
    },
    methods: {
        changeExample(i: number) {
            this.selectId = i;

            // 更新示例图片URL
            for (let example of this.examples) {
                let name = `example/${example.kind}/${this.formatId(i)}`;
                example.url = getGifUrl(name);
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
            const div = this.$refs.examplesRef as HTMLDivElement;

            let step = (div.scrollWidth / 30) * 5;
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
.el-image {
    width: 100%;
    border: 1px solid #409eff;
}
</style>
