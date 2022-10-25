<template>
    <div class="wrap-abs">
        <comp-container class="module-first"
                        text="空气质量">
            <!-- 内容 -->
            <sub-content-first></sub-content-first>
        </comp-container>
    </div>
</template>

<script>
    import CompContainer from '@/components/common/container.vue'
    import SubContentFirst from './index/content-first.vue'
    export default {
        components: { CompContainer, SubContentFirst },
        data() {
            return {
            };
        },
        mounted() { },
        beforeDestroy() { },
        methods: {},
    };
</script>

<style lang="less" rel="stylesheet" scoped>
    .module-first {
        position: absolute;
        left: 50px;
        top: 50px;
        width: 800px;
        height: 400px;
    }
</style>
