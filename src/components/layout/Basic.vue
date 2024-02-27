<template>
    <el-container style="height: 100%">
        <el-header>
            <el-button
                @click="$router.push({ name: 'introduce' })"
                id="title"
                link
                >AnimationGPT</el-button
            >

            <el-dropdown>
                <span style="outline: unset">
                    <SvgIcon name="translate" color="white"></SvgIcon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <!-- 切换语言 -->
                        <div v-for="lang in langList">
                            <el-dropdown-item
                                v-if="$i18n.locale != lang.value"
                                @click="changeLanguage(lang.value)"
                            >
                                {{ lang.label }}
                            </el-dropdown-item>
                        </div>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-header>
        <el-main> <slot name="main"></slot></el-main>
    </el-container>
</template>

<script lang="ts">
import SvgIcon from "../SvgIcon.vue";

export default {
    components: { SvgIcon },
    data() {
        return {
            langList: [
                {
                    value: "zhCN",
                    label: "简体中文",
                },
                {
                    value: "enUS",
                    label: "English",
                },
            ],
        };
    },
    methods: {
        changeLanguage(lang: string) {
            this.$router.push({
                params: {
                    ...this.$route.params,
                    lang: lang,
                },
            });
        },
    },
};
</script>

<style scoped>
#title {
    font-size: 24px;
    text-decoration: none;
    color: white;
    margin: 0;
}
.el-container {
    height: 100%;

    display: flex;
}
.el-header {
    height: 50px;
    background-color: #409eff;

    display: flex;
    align-items: center;
    padding-left: 20px;
    justify-content: space-between;
}
.el-main {
    height: 100%;
    padding: 0;
}
</style>
