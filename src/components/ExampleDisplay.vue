<template>
    <div>
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
export default {
    data() {
        return {
            curPrompt: "The character runs forward lighty.",

            testUrl: new URL(`../assets/test/animation.gif`, import.meta.url)
                .href,

            examples: [
                {
                    kind: "Original SMPL",
                    url: this.testUrl,
                },
                {
                    kind: "Original",
                    url: this.testUrl,
                },
                {
                    kind: "S4-50%",
                    url: this.testUrl,
                },
                {
                    kind: "S4-70%",
                    url: this.testUrl,
                },
            ],
        };
    },
};
</script>

<style scoped>
#prompt {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
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
