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
                    <el-radio-group v-model="needTranslate" size="small">
                        <el-radio-button label="true">中</el-radio-button>
                        <el-radio-button label="false">En</el-radio-button>
                    </el-radio-group>
                </div>
            </div>

            <el-input
                style="padding-bottom: 15px"
                :placeholder="$t('demo.inputPlaceHolder')"
                rows="6"
                resize="none"
                type="textarea"
            ></el-input>
            <div style="text-align: right">
                <el-button> {{ $t("demo.clear") }} </el-button>
                <el-button type="primary"> {{ $t("demo.generate") }}</el-button>
            </div>

            <el-divider></el-divider>

            <!-- 参考示例显示 -->
            <h2>{{ $t("demo.refExample") }}</h2>
            <el-scrollbar>
                <ul style="padding: 0 10px 0 15px; margin: 0">
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
                    :src="videoUrl"
                    style="height: 100%; width: 100%"
                    controls
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
                <el-button class="my-btn">
                    <el-icon><Download /></el-icon>
                    <span>mp4</span>
                </el-button>
                <el-button class="my-btn">
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

export default {
    components: { BasicLayout, Download },
    data() {
        return {
            videoUrl: new URL(`../assets/test/video.mp4`, import.meta.url).href,

            needTranslate: false,
        };
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
