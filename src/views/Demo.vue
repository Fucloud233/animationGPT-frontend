<template>
    <BasicLayout>
        <template #main>
            <div id="main">
                <div
                    id="operator-wrap"
                    class="wrap"
                    style="padding-right: 15px; width: 50%"
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
                        <h1>AI动作生成</h1>
                        <div style="display: flex; align-items: center">
                            <span style="padding-right: 10px">输入语言: </span>
                            <el-radio-group
                                v-model="needTranslate"
                                size="small"
                            >
                                <el-radio-button label="true"
                                    >中</el-radio-button
                                >
                                <el-radio-button label="false"
                                    >En</el-radio-button
                                >
                            </el-radio-group>
                        </div>
                    </div>

                    <el-input
                        style="padding-bottom: 15px"
                        placeholder="请输入提示词以生成动作..."
                        rows="6"
                        resize="none"
                        type="textarea"
                    ></el-input>
                    <div style="text-align: right">
                        <el-button> 清除 </el-button>
                        <el-button type="primary">立即生成</el-button>
                    </div>

                    <el-divider></el-divider>

                    <!-- 参考示例显示 -->
                    <h2>参考示例</h2>
                    <el-scrollbar style="height: 39%">
                        <ul style="padding: 0 10px 0 15px; margin: 0">
                            <li v-for="example in examples">
                                {{ example.zh }}
                            </li>
                        </ul>
                    </el-scrollbar>

                    <p style="color: #409eff; margin: 10px 0">
                        目前可支持地武器动作模态类型：
                        匕首/大剑/太刀/曲剑/斧/载/锤/拳头
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
                        <el-button class="my-btn">
                            <el-icon><Download /></el-icon> <span>mp4下载</span>
                        </el-button>
                        <el-button class="my-btn">
                            <el-icon><Download /></el-icon> <span>bvh下载</span>
                        </el-button>
                    </div>
                </div>
                <!-- header -->
            </div>
        </template>
    </BasicLayout>
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
            examples: [
                {
                    zh: "角色双手自然下垂与身体两侧，身体中心稍微下压，向左缓慢移动",
                },
                { zh: "角色轻盈向前跑动" },
                { zh: "角色轻盈地向前方翻滚，快速地起身" },
                {
                    zh: "角色受击，身体大硬直，均速起身，惊慌失措地身体失衡向左退，右手挥舞在空中",
                },
                {
                    zh: "角色右手持大剑，蓄力重击。角色双腿半蹲，上半身微微向右侧侧身，紧接着向前劈砍。最后回到原始站立姿势。",
                },
                {
                    zh: "角色双持戟进行蓄力重击，扎实地侧身扭腰向左，右腿向前迈步，双手共握武器，从左后蓄力，然后向前连续挥两圈。",
                },
                {
                    zh: "角色左手持刺剑进行轻击，轻盈地右手挽一个刀花后向前刺击，同时向前碎步，随后恢复站姿。",
                },
                {
                    zh: "角色向右转身，扎马步，右手将模丸插入左手刀鞘中蓄力，然后顺时针转身向前挥。",
                },
            ],
        };
    },
};
</script>

<style>
body {
    /* overflow-y: hidden; */
}

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

/* .set-other-btn {
    color: #fff;
    background-color: #fa4eab;
    border-color: #fa4eab;
}
.set-other-btn:hover {
    background-color: #fe83c6;
    border-color: #fe83c6;
}

.set-other-btn:focus {
    background-color: #fe83c6;
    border-color: #fe83c6;
} */
</style>
