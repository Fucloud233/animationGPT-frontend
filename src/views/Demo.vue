<template>
    <div id="main">
        <!-- 左侧一栏 -->
        <div
            id="operator-wrap"
            class="wrap"
            style="padding-right: 15px; width: 50%; display: flex; flex-direction: column"
        >
            <!-- 生成操作区域 -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 5px 0 15px 0">
                <h1>{{ $t("demo.title") }}</h1>
                <!-- <div style="display: flex; align-items: center">
                    <span style="padding-right: 10px">{{ $t("demo.inputLang") }}: </span>
                    <el-radio-group v-model="language" size="small">
                        <el-radio-button label="cn">中</el-radio-button>
                        <el-radio-button label="en">En</el-radio-button>
                    </el-radio-group>
                </div> -->
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
                <el-button type="primary" :loading="isGenerating" @click="toGenerate()" :disabled="!demoOk">
                    {{ $t("demo.generate") }}</el-button
                >
            </div>

            <el-divider></el-divider>

            <!-- 参考示例显示 -->
            <h2>{{ $t("demo.refExample") }}</h2>
            <el-scrollbar>
                <ul style="padding-right: 15px; margin: 0">
                    <li v-for="example in $tm('demo.examples')">
                        <a @click="selectExample(example)" style="color: black; text-decoration: none">{{ example }}</a>
                    </li>
                </ul>
            </el-scrollbar>

            <p style="color: #409eff; margin: 10px 0">
                {{ $t("demo.supportedWeapon") }}
            </p>
        </div>

        <div style="width: 20px"></div>
        <div id="right-wrap" style="width: 50%">
            <!-- 视频播放栏 -->
            <div class="wrap" style="height: 90%; display: flex; align-items: center; justify-content: center">
                <video
                    v-if="videoUrl != undefined"
                    :src="videoUrl"
                    style="height: 100%; width: 100%"
                    :autoplay="true"
                    loop
                ></video>
            </div>
            <!-- 下载栏 -->
            <div class="wrap" style="height: 8%; display: flex; align-items: center; justify-content: center">
                <span style="padding-right: 15px; color: #409eff">{{ $t("demo.download") }}:</span>
                <el-button class="my-btn" @click="toDownload(ResultFileKind.Mp4)" :disabled="!demoOk">
                    <el-icon><Download /></el-icon>
                    <span>{{ ResultFileKind.Mp4 }}</span>
                </el-button>
                <el-button class="my-btn" @click="toDownload(ResultFileKind.Bvh)" :disabled="!demoOk">
                    <el-icon><Download /></el-icon>
                    <span>{{ ResultFileKind.Bvh }}</span>
                </el-button>
            </div>
        </div>
        <!-- header -->
    </div>

    <el-dialog v-model="showDialog" title="Tips" width="500">
        <span>This is a message</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="showDialog = false">Cancel</el-button>
                <el-button
                    type="primary"
                    @click="
                        showDialog = false;
                        toGenerate();
                    "
                >
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { Download } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";

import BasicLayout from "../components/layout/Basic.vue";

import { generate, download } from "../api/demo";
import { messages } from "../utils/message";
import { ResultFileKind } from "../utils/file";
import { LanguageKind, checkLanguage } from "../utils/language";

export default {
    components: { BasicLayout, Download, ResultFileKind },
    data() {
        // const isEnglish = this.$i18n.locale == "enUS";

        return {
            // language: isEnglish ? LanguageKind.EN : LanguageKind.CN,
            language: LanguageKind.EN,

            prompt: "",

            demoOk: window.config.demoOk,

            isGenerating: false,
            showDialog: false,

            // Notice: 当后台生成成功，二者都非 undefined，因此都可以判断生成情况
            // 生成结果的 视频连接 与 会话 id
            videoUrl: undefined as string | undefined,
            curId: undefined as string | undefined,

            // Notice: 此处用于使 enum 类型生效
            ResultFileKind: ResultFileKind,
        };
    },
    mounted() {
        // 可以手动设置是否可以使用 Demo 运行
        if (window.config.demoOk) return;

        ElMessageBox.alert(this.$t("demo.tipsForDemoNotOK"), this.$t("demo.tips"), {
            confirmButtonText: this.$t("btn.yes"),
            showClose: false,
        }).then(() => this.$router.push("/"));
    },
    methods: {
        async toGenerate() {
            const prompt = this.prompt.trim();

            if (prompt.length === 0) {
                messages.promptIsEmpty();
                return;
            }

            // 验证输入的语言与选择的语言是否匹配
            if (!checkLanguage(prompt, this.language)) {
                const result = await ElMessageBox.alert(this.$t("demo.tipsForCNInput"), this.$t("demo.tips"), {
                    showCancelButton: true,
                    confirmButtonText: this.$t("btn.yes"),
                    cancelButtonText: this.$t("btn.no"),
                })
                    .then(() => true)
                    .catch(() => false);

                if (!result) return;
            }

            // 调用 API 生成动画
            this.isGenerating = true;

            let result = await generate(prompt, this.language);

            if (result.data != undefined) {
                this.videoUrl = result.data.url as string;
                this.curId = result.data.id;

                messages.generateSuccess();
            } else if (result.translateError) messages.translateError();
            else messages.generateError();

            this.isGenerating = false;
        },

        toClear() {
            if (!this.isGenerating) this.videoUrl = undefined;
            this.prompt = "";
            this.curId = undefined;
        },

        async toDownload(kind: ResultFileKind) {
            if (this.videoUrl == undefined || this.curId == undefined) {
                messages.motionNotGenerated();
                return;
            }

            let filename = "";
            switch (kind) {
                case ResultFileKind.Mp4:
                    filename = this.curId + ".mp4";
                    this.downloadFile(this.videoUrl, filename);
                    break;
                case ResultFileKind.Bvh:
                    filename = this.curId + ".bvh";
                    const result = await download(this.curId);
                    this.downloadFile(result.data, filename);
                    break;
            }
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

        async selectExample(prompt: string) {
            if (this.prompt == prompt) return;

            if (this.prompt == undefined || this.prompt == "") {
                this.prompt = prompt;
                return;
            }

            const result = await ElMessageBox.alert(this.$t("demo.tipsForOverridePrompt"), this.$t("demo.tips"), {
                showCancelButton: true,
                confirmButtonText: this.$t("btn.yes"),
                cancelButtonText: this.$t("btn.no"),
            })
                .then(() => true)
                .catch(() => false);

            if (!result) return;

            this.prompt = prompt;
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
