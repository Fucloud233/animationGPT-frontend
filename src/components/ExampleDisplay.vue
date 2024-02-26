<template>
    <div>
        <!-- example的选择条 -->
        <div class="select-bar">
            <el-button @click="scroll(true)" text style="margin-right: 15px">
                <el-icon><ArrowLeft /></el-icon>
            </el-button>
            <div class="examples-wrap" ref="examplesRef">
                <div v-for="i in Array(30).keys()" class="example-id-wrap">
                    <span
                        :style="{
                            color: i == selectId ? '#409eff' : 'gray',
                        }"
                    >
                        Example {{ formatId(i) }}
                    </span>
                </div>
            </div>
            <el-button @click="scroll(false)" text style="margin-left: 15px">
                <el-icon><ArrowRight /></el-icon>
            </el-button>
        </div>

        <p id="prompt">Text: {{ curPrompt }}</p>
        <div style="display: flex; justify-content: space-between">
            <div class="example-wrap" v-for="example in examples">
                <div class="kind-wrap">{{ example.kind }}</div>
                <el-image :src="example.url"></el-image>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";

export default {
    components: {
        ArrowLeft,
        ArrowRight,
    },

    data() {
        const testUrl = new URL(`../assets/test/animation.gif`, import.meta.url)
            .href;

        // const examplesRef = ref<HTMLDivElement>();

        return {
            curPrompt: "The character runs forward lighty.",

            selectId: 0,
            // examplesRef: examplesRef,

            examples: [
                {
                    kind: "Original SMPL",
                    url: testUrl,
                },
                {
                    kind: "Original",
                    url: testUrl,
                },
                {
                    kind: "S4-50%",
                    url: testUrl,
                },
                {
                    kind: "S4-70%",
                    url: testUrl,
                },
            ],
        };
    },
    methods: {
        formatId(id: number) {
            id += 1;
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

    width: 24%;
}

.kind-wrap {
    background-color: #f0f0f0;
    padding: 5px 10px;
    width: 100%;
    margin-bottom: 15px;
    text-align: center;

    box-sizing: border-box;
}
.el-image {
    width: 100%;
    border: 1px solid #409eff;
}
</style>
