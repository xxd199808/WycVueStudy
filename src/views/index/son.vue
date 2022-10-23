<template>
    <div>
        ---------------------------------
        我是son
        {{icon1}}
        {{res}}
        <button @click="femits">子传腹</button>
    </div>
</template>

<script>
    export default {
        name: "son",
        //**** el, name
        //**** components, directives
        //**** extends, mixins, provide/inject
        //**** props, data, computed
        props: {
            icon1: {
                type: Number,
                default: 0
            },
            res: {
                type: Object,
                default: () => { }
            }
        },
        data() {
            return {
                sondata: '6666'
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
            fClickSon() {
                console.log('我是子组件')
            },
            fClickSon2() {
                console.log(".........");
            },
            femits() {
                this.$emit('e', this.sondata)
            }
            //*** 开放给父子组件的接口方法
            //*** 事件响应函数
            //*** 其他
        }
        //**** template, render
    }
</script>

<style lang="less" rel="stylesheet" scoped>
</style>
