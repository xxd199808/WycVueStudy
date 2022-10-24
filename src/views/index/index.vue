<template>
    <div class="wrap-abs">
        <comp-container class="module-first" text="空气质量">
            <div class="content-first">
                <div class="content-left"></div>
                <div class="content-right">
                    <div
                        class="pollute-nav"
                        v-for="(item, index) in aPollute"
                        :key="index"
                    >
                        <div class="pollute-name">{{ item.name }}</div>
                        <div class="pollute-val">{{ item.val }}</div>
                    </div>
                </div>
            </div>
        </comp-container>
    </div>
</template>

<script>
import CompContainer from '@/components/common/container.vue';
export default {
    components: { CompContainer },
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
        };
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
    font-family: 'digital';
}
.pollute-val {
    color: #67b243;
    font-size: 40px;
    font-family: 'digital';
}
</style>
