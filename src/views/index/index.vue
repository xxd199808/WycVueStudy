<template>
    <div class="wrap-abs">
        <comp-container class="module-first" text="标题">
            <div class="content-first"></div>
        </comp-container>
    </div>
</template>

<script>
import CompContainer from '@/components/common/container.vue';
export default {
    components: { CompContainer },
    data() {
        return {};
    },
    mounted() {},
    beforeDestroy() {},
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
.content-first {
}
</style>
