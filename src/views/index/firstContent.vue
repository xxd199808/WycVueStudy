<template>
    <div>
        <sub-container>
            <div>
                1111111111
            </div>
        </sub-container>
    </div>
</template>

<script>
    import SubContainer from './container.vue'
    export default {
        //**** el, name
        //**** components, directives
        //**** extends, mixins, provide/inject
        //**** props, data, computed
        components: {
            SubContainer
        },
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
