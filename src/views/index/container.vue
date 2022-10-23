<template>
    <div>
        <div class="container-head">
            头部
        </div>
        <div class="container-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        //**** el, name
        //**** components, directives
        //**** extends, mixins, provide/inject
        //**** props, data, computed
        data() {
            return {
            }
        },
        //**** watch
        //**** 生命周期钩子：mounted, updated, beforeDestroy 等
        mounted() {
        },
        beforeDestroy() {
        },
        //**** methods
        methods: {
            //*** 开放给父子组件的接口方法
            //*** 事件响应函数
            //*** 其他
        }
        //**** template, render
    }
</script>

<style lang="less" rel="stylesheet" scoped>
</style>