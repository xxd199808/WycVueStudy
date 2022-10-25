<template>
    <div class="content-first">
        <div class="content-left"></div>
        <div class="content-right">
            <div class="pollute-nav"
                 v-for="(item, index) in aPollute"
                 :key="index">
                <div class="pollute-name">{{ item.name }}</div>
                <div class="pollute-val">{{ item.val }}</div>
            </div>
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
                aPollute: [
                    { name: 'PM2.5', val: '26.11' },
                    { name: 'PM10', val: '37.0' },
                    { name: 'SO2', val: '3.0' },
                    { name: 'NO2', val: '11.22' },
                    { name: 'O3', val: '69.0' },
                    { name: 'CO', val: '0.85' },
                ],
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
    .content-first {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }
    .content-left {
        width: 300px;
        height: 300px;
        background: url(~@/assets/images/components/project/index/left-content.png)
            no-repeat center;
        background-size: 100% 100%;
    }
    .content-right {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
    .pollute-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 220px;
        height: 60px;
        margin-top: 10px;
        padding: 0 15px;
        background-color: #1c425c;
    }
    .pollute-name {
        color: #fff;
        font-size: 18px;
        font-family: "digital";
    }
    .pollute-val {
        color: #67b243;
        font-size: 40px;
        font-family: "digital";
    }
</style>
