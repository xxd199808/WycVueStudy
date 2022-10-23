<template>
    <div id="app"
         class="flex-col">
        <router-view class="flex1" />
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {

            }
        },
        mounted() {
        }
    }
</script>

<style lang="less" rel="stylesheet">
    #app {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
    }
</style>
