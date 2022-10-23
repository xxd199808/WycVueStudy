<template>
    <div class="sidemenu">
        <div class="sidemenu-module"
             v-for="(oMenu,nMenuIdx) in aMenu"
             :class="{_fold: oMenu.fold}"
             :key="nMenuIdx">
            <div class="sidemenu-item"
                 :class="{_active: oMenu === oCurMenu}"
                 @click="fMenuClick(oMenu)">
                <div class="sidemenu-item-label">{{oMenu.label}}</div>
                <div class="sidemenu-item-arrow"
                     v-if="oMenu.children.length > 0"
                     @click="fMenuArrowClick($event,oMenu)"></div>
            </div>
            <div class="sidemenu-item-child">
                <div class="sidemenu-item"
                     v-for="(oChild,nChildIdx) in oMenu.children"
                     :class="{_active: oChild === oCurMenu}"
                     @click="fMenuClick(oChild)"
                     :key="nMenuIdx + '_' + nChildIdx">
                    <div class="sidemenu-item-label">{{oChild.label}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const DATA = {
        menu: [
            {
                label: 'mod0',
                val: 'mod0',
                router: '',
                fold: true,
                children: [
                    { label: 'view0', router: '/mod0/view0' }
                ]
            },
            {
                label: 'mod1',
                val: 'mod1',
                router: '',
                fold: true,
                children: [
                    { label: 'view0', router: '/mod1/view0' }
                ]
            },
        ]
    };

    export default {
        props: {
            msg: String
        },
        data() {
            return {
                aMenu: [],
                oCurMenu: {}
            }
        },
        mounted() {
            this.aMenu = DATA.menu;
        },
        methods: {
            //菜单点击事件
            fMenuClick(oMenu) {
                if (this.oCurMenu !== oMenu) {
                    this.oCurMenu = oMenu;
                    this.$emit('menu-click', oMenu);
                }
            },
            //箭头点击事件
            fMenuArrowClick(ev, oMenu) {
                oMenu.fold = !oMenu.fold;
                ev.stopPropagation();
            }
        }
    }
</script>

<style lang="less" rel="stylesheet" scoped>
    .sidemenu {
        height: 100%;
        color: #fff;
        background: #2a3f54;
        .l_noscrollbar();
        overflow: auto;
    }
    .sidemenu-item {
        display: flex;
        align-items: center;
        height: 54px;
        padding: 0 20px 0 4px;
        border-left: 4px solid transparent;
        font-size: 20px;
        cursor: pointer;
        &:hover {
            background: #11263a;
        }
        &._active {
            background: #11263a;
            border-color: #1fb5ac;
        }
        & + & {
            margin-top: 1px;
        }
    }
    .sidemenu-item-child {
        background: #1f364d;
        & > .sidemenu-item {
            padding-left: 24px;
            font-size: 18px;
        }
    }
    .sidemenu-item-label {
        flex: 1;
    }
    .sidemenu-item-arrow {
        width: 20px;
        height: 20px;
        background: url("~@/assets/images/components/project/sidemenu/icon_arrow.png")
            center no-repeat;
        transition: all 200ms;
    }
    //菜单折叠
    .sidemenu-module._fold {
        height: 54px;
        overflow: hidden;
        & > .sidemenu-item > .sidemenu-item-arrow {
            transform: rotate(-90deg);
        }
    }
</style>
