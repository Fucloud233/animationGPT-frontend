<template>
    <el-result icon="info" title="404" :sub-title="$t('msg.notFound')">
        <template #extra>
            <el-button type="primary" @click="$router.push('/')">{{ $t("btn.back") }}</el-button>
        </template>
    </el-result>
</template>

<script lang="ts">
export default {};
</script>
