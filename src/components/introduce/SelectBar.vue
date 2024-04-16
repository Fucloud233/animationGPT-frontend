<template>
    <!-- 1. example的选择条 -->
    <div class="select-bar" ref="selectBar">
        <el-button @click="scroll(true)" text style="margin-right: 15px">
            <el-icon><ArrowLeft /></el-icon>
        </el-button>
        <div v-for="i in getRange()" class="example-id-wrap" ref="exampleElement">
            <!-- 按钮点击切换视频 -->
            <el-button
                :style="{
                    color: i == selectId ? '#409eff' : 'gray',
                }"
                @click="changeExample(i)"
                link
            >
                Example {{ formatId(i) }}
            </el-button>
        </div>
        <el-button @click="scroll(false)" text style="margin-left: 15px">
            <el-icon><ArrowRight /></el-icon>
        </el-button>
    </div>
</template>

<script lang="ts">
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";

export default {
    components: {
        ArrowLeft,
        ArrowRight,
    },
    props: {
        size: {
            type: Number,
            required: true,
        },
        defaultId: {
            type: Number,
            default: 0,
        },
        onchange: {
            type: Function,
        },
    },
    data() {
        return {
            selectId: 0,

            pageNum: 0,
            pageSize: 1,
            curPageNum: 0,
        };
    },
    mounted() {
        this.updateSelectBarSize();

        window.addEventListener("resize", () => {
            this.updateSelectBarSize();
        });
    },
    computed: {},
    methods: {
        updateSelectBarSize() {
            const barDiv = this.$refs.selectBar as HTMLDivElement;
            // Notice: 这里会存在多个选项，因此要选择其中一个
            const elementDivs = this.$refs.exampleElement as HTMLDivElement[];

            this.pageSize = Math.max(Math.floor(barDiv.clientWidth / elementDivs[0].clientWidth) - 1, 1);
            this.pageNum = Math.ceil(this.size / this.pageSize);

            this.curPageNum = Math.floor(this.selectId / this.pageSize);
        },

        scroll(isLeft: boolean) {
            if (isLeft) {
                if (this.curPageNum <= 0) return;
                this.curPageNum--;
            } else {
                if (this.curPageNum >= this.pageNum - 1) return;
                this.curPageNum++;
            }
        },
        changeExample(i: number) {
            this.selectId = i;

            if (this.onchange != undefined) this.onchange(i);
        },
        formatId(id: number) {
            var result = id + 1;
            return result < 10 ? "0" + result : result;
        },
        getRange() {
            const start = this.curPageNum * this.pageSize;
            const length =
                (this.curPageNum + 1) * this.pageSize <= this.size ? this.pageSize : this.size % this.pageSize;

            if (length == 0) return [0].values();

            const range = Array(length)
                .fill(0)
                .map((_element, index) => start + index);

            return range.values();
        },
    },
};
</script>

<style>
.select-bar {
    display: flex;
    justify-content: space-between;
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
</style>
