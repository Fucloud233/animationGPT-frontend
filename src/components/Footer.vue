<template>
    <div class="icp">
        {{ `© ${year} ${author} ` }}<a href="http://beian.miit.gov.cn/" target="_blank">{{ record }}</a>
    </div>
</template>

<script lang="ts">
// https://blog.csdn.net/yiself/article/details/129405421

export default {
    data() {
        const config = window.config.introduce;

        return {
            year: new Date().getFullYear(),
            author: config.author,
            record: config.record,
        };
    },
};
</script>

<style>
.icp {
    margin: 10px 0;
    text-align: center;
    color: gray;
    font-size: 14px;
}
.icp > a {
    color: gray;
    text-decoration: none;
}
.icp > a:hover {
    color: gray;
    text-decoration: none;
}
</style>
