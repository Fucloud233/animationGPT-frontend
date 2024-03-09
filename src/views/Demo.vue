<template>
    <div id="main">
        <!-- 左侧一栏 -->
        <div
            id="operator-wrap"
            class="wrap"
            style="
                padding-right: 15px;
                width: 50%;
                display: flex;
                flex-direction: column;
            "
        >
            <!-- 生成操作区域 -->
            <div
                style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 5px 0 15px 0;
                "
            >
                <h1>{{ $t("demo.title") }}</h1>
                <div style="display: flex; align-items: center">
                    <span style="padding-right: 10px"
                        >{{ $t("demo.inputLang") }}:
                    </span>
                    <el-radio-group v-model="language" size="small">
                        <el-radio-button label="cn">中</el-radio-button>
                        <el-radio-button label="en">En</el-radio-button>
                    </el-radio-group>
                </div>
            </div>

            <el-input
                style="padding-bottom: 15px"
                :placeholder="$t('demo.inputPlaceHolder')"
                rows="6"
                resize="none"
                type="textarea"
                v-model="prompt"
            ></el-input>
            <div style="text-align: right">
                <el-button @click="toClear()">
                    {{ $t("demo.clear") }}
                </el-button>
                <el-button
                    type="primary"
                    :loading="isGenerating"
                    @click="toGenerate()"
                >
                    {{ $t("demo.generate") }}</el-button
                >
            </div>

            <el-divider></el-divider>

            <!-- 参考示例显示 -->
            <h2>{{ $t("demo.refExample") }}</h2>
            <el-scrollbar>
                <ul style="padding-right: 15px; margin: 0">
                    <li v-for="example in $tm('demo.examples')">
                        {{ example }}
                    </li>
                </ul>
            </el-scrollbar>

            <p style="color: #409eff; margin: 10px 0">
                目前可支持地武器动作模态类型： 匕首/大剑/太刀/曲剑/斧/载/锤/拳头
            </p>
        </div>

        <div style="width: 20px"></div>
        <div id="right-wrap" style="width: 50%">
            <!-- 视频播放栏 -->
            <div
                class="wrap"
                style="
                    height: 90%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                "
            >
                <video
                    v-if="videoUrl != undefined"
                    :src="videoUrl"
                    style="height: 100%; width: 100%"
                    :autoplay="true"
                    loop
                ></video>
            </div>
            <!-- 下载栏 -->
            <div
                class="wrap"
                style="
                    height: 8%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                "
            >
                <span style="padding-right: 15px; color: #409eff"
                    >{{ $t("demo.download") }}:</span
                >
                <el-button class="my-btn" @click="toDownloadMP4()">
                    <el-icon><Download /></el-icon>
                    <span>mp4</span>
                </el-button>
                <el-button class="my-btn" @click="toDownloadBVH()">
                    <el-icon><Download /></el-icon>
                    <span>bvh</span>
                </el-button>
            </div>
        </div>
        <!-- header -->
    </div>
</template>

<script lang="ts">
import { Download } from "@element-plus/icons-vue";

import BasicLayout from "../components/layout/Basic.vue";

import { generate, download } from "../api/demo";

export default {
    components: { BasicLayout, Download },
    data() {
        return {
            language: "en",

            prompt: "Please create a motion that represents the power of the figure takes a few slighly hurried steps without raising their arms, it looks they are about to start running but haven't quite yet begun. to create a better world for all." as String,

            isGenerating: false,

            // Notice: 当后台生成成功，二者都非 undefined，因此都可以判断生成情况
            // 用于记录生成回来的视频 URL
            videoUrl: undefined as string | undefined,
            // 用于计入当前的生成结果的id
            curId: undefined as string | undefined,
        };
    },
    methods: {
        async toGenerate() {
            const prompt = this.prompt.trim();
            if (prompt.length === 0) return;

            this.isGenerating = true;

            let result = await generate(prompt, this.language);
            this.videoUrl = result.data as string;
            this.curId = result.id;

            this.isGenerating = false;
        },

        toClear() {
            if (!this.isGenerating) this.videoUrl = undefined;
            this.prompt = "";
            this.curId = undefined;
        },

        toDownloadMP4() {
            if (this.videoUrl == undefined) return;

            const filename = this.curId + ".mp4";
            this.downloadFile(this.videoUrl, filename);
        },
        async toDownloadBVH() {
            if (this.curId == undefined) return;
            const filename = this.curId + ".bvh";

            const result = await download(this.curId);

            this.downloadFile(result.data, filename);
        },
        downloadFile(url: string, filename: string) {
            const link = document.createElement("a");
            link.href = url;
            // 下载文件的名称及文件类型后缀
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
    },
};
</script>

<style>
#main {
    background-color: #f7f7f7;
    height: 100%;
    padding: 25px 50px;
    box-sizing: border-box;

    overflow-y: hidden;

    display: flex;
    /* flex-direction: row; */
    justify-content: space-between;
}

.wrap {
    background-color: white;
    border: 1px gray;
    padding: 20px 25px;
    box-sizing: border-box;

    border-radius: 15px;
    border: 1.5px solid #cfcfcf;
}
#operator-wrap {
    h1 {
        color: #409eff;
        font-size: 32px;
    }
    h2 {
        color: #409eff;
        font-size: 20px;
    }
}
#right-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
