<template>
    <div class="block">
        <div class="block-title">
            <div class="block-title-bg"></div>
            <div class="block-title-txt">
                <span class="block-title-main">{{ text }}</span>
            </div>
        </div>
        <div class="block-content">
            <div class="block-conbg">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            // 标题文字
            type: String,
            default: '',
        },
    },
    data() {
        return {};
    },
    watch: {},
    mounted() {},
    methods: {},
};
</script>

<style lang="less" rel="stylesheet" scoped>
@title_line_time: 500ms;
@title_aux_time: 200ms;
@title_main_time: 800ms;

.block {
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: stretch;
    width: 100%;
    height: 100%;
}

.block-title {
    position: relative;
    display: flex;
    align-items: center;
    height: 68px;
    line-height: 68px;
    padding: 15px 0;
    font-size: 58px;
    font-family: 'ysbth';
}
.block-title-bg {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;
    @direction: to right;
    @stop1: rgba(17, 163, 174, 0.89) 0%;
    @stop2: rgba(30, 147, 186, 0.89) 59%;
    @stop3: rgba(17, 163, 174, 0.29) 100%;
    background-image: linear-gradient(@direction, @stop1, @stop2, @stop3);
    background-image: -ms-linear-gradient(@direction, @stop1, @stop2, @stop3);
    background-image: -moz-linear-gradient(@direction, @stop1, @stop2, @stop3);
    background-image: -webkit-linear-gradient(
        @direction,
        @stop1,
        @stop2,
        @stop3
    );
    background-image: -o-linear-gradient(@direction, @stop1, @stop2, @stop3);
}
.block-title-txt {
    position: relative;
    width: 100%;
    padding-left: 47px;
    color: #fff;
}
.block-title-line {
    position: relative;
    flex: 1;
    height: 40px;
    &:before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0;
        border-bottom: solid 4px @c_main;
    }
}

.block-content {
    flex: 1;
    height: 0;
}
.block-conbg {
    height: 100%;
    background: #043149;
}
</style>
