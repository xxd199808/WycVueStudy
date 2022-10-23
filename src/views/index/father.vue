<template>
    <div>
        <button @click="fClickFather">点击</button>
        <button @click="fcli">点击触发son的。。。</button>
        <br>
        <br>
        我是son
        <sub-son :icon1="icon"
                 :res="aa"
                 ref="son"
                 @e="feee"></sub-son>

        <div>
            {{sondatas}}
        </div>

        <el-input v-model="searchText"></el-input>
        <el-button @click="fClickTab">查询</el-button>
    </div>
</template>

<script>
    import SubComp1 from '';
    import SubComp2 from '';
    import SubComp3 from '';
    import SubComp4 from '';
    import SubComp5 from '';
    import SubComp6 from '';
    import SubComp7 from '';
    import SubComp8s from '';
    //import { GetSearch } from '@/api/appdm'
    import SubSon from './son.vue'
    export default {
        name: "father",
        components: {
            SubSon
        },

        data() {
            return {
                icon: 123456,
                aa: {},
                sondatas: "",
                searchText: ''
            }
        },
        computed: {
            curComp() {
                if (1) {
                    return 'SubComp1'
                } else {
                    return 'SubComp2'
                }

            }
        },
        mounted() {
            this.fR()
        },
        beforeDestroy() {
        },

        methods: {
            fClickFather() {
                this.$refs.son.fClickSon()
            },
            fcli() {
                this.$refs.son.fClickSon2()
            },
            fR() {
                let result = { name: 'w', age: '12' };
                this.aa = result;
            },
            feee(i) {
                this.sondatas = i
            },
            fClickTab() {
                let param = {
                    search: this.searchText
                };
                GetSearch(param).then((data) => {
                    // data:   {
                    //        no: '11111',
                    //        name: 'aaaa',
                    //        tel: "1233445",
                    //        sushe: "101"
                    //    }
                })
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
