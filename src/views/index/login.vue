<template>
    <div class="login-wrap">
        <div class="login-con">
            <sub-logo />
            <div class="login-tit">后台管理系统</div>
            <div class="login-form"
                 @keyup.enter="fInputKeyupEnter">
                <div class="login-label _username">用户名</div>
                <div class="login-ipt">
                    <input type="text"
                           class="login-input"
                           placeholder="请输入用户名"
                           v-model="oForm.username" />
                </div>
                <div class="login-label _password">密码</div>
                <div class="login-ipt">
                    <input type="password"
                           class="login-input"
                           placeholder="请输入密码"
                           v-model="oForm.password" />
                </div>
            </div>
            <div class="login-tips">{{sTip}}</div>
            <div class="login-btn"
                 @click="fLoginBtnClick">登 录</div>
        </div>
    </div>
</template>

<script>
    import { URLS_COM } from '@/urls.js';
    import SubLogo from './login/logo.vue'

    export default {
        name: 'login',
        components: {
            SubLogo
        },
        data() {
            return {
                oForm: {
                    username: '',
                    password: ''
                },
                sTip: ''
            }
        },
        methods: {
            //输入框回车抬起事件
            fInputKeyupEnter() {
                this.fLogin();
            },
            //登录按钮点击事件
            fLoginBtnClick() {
                this.fLogin();
            },
            //登录
            fLogin() {
                if (!this.oForm.username) {
                    this.sTip = '请输入用户名';// 设置提示消息
                    return;
                }
                if (!this.oForm.password) {
                    this.sTip = '请输入密码';// 设置提示消息
                    return;
                }
                //登录请求
                this.G_API.fRequest({
                    url: URLS_COM.d_login,
                    data: this.oForm
                }).then((data) => {
                    console.log(data);
                    // this.sTip = '提示消息';// 设置提示消息
                    this.$router.go(-1);// 返回页面
                });
            }
        }
    }
</script>

<style lang="less" rel="stylesheet" scoped>
    .login-wrap {
        display: flex;
        justify-content: flex-end;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        min-width: 1300px;
        min-height: 650px;
        overflow: hidden;
    }
    .login-con {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 732px;
        height: 100%;
        background: rgba(255, 255, 255, 0.7);
        box-shadow: -20px 0 30px rgba(0, 0, 0, 0.3);
    }
    .login-tit {
        color: #1fb5ac;
        font-size: 48px;
        font-family: "zzgflht";
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    }
    .login-form {
        width: 70.5%;
        margin: 70px 0 0;
    }
    .login-label {
        margin: 12px 0;
        padding-left: 52px;
        line-height: 40px;
        font-size: 30px;
        background: left center no-repeat;
        &._username {
            background-image: url("~@/assets/images/views/index/login/icon_user.png");
        }
        &._password {
            background-image: url("~@/assets/images/views/index/login/icon_pwd.png");
        }
    }
    .login-ipt {
        width: 100%;
        margin: 0 0 24px;
    }
    .login-input {
        width: 100%;
        height: 58px;
        padding: 0 20px;
        border: 1px solid #c9c9c9;
        background: #fff;
        border-radius: 8px;
        font-size: 24px;
        outline: none;
    }
    .login-tips {
        height: 30px;
        margin: 10px 0 30px;
        line-height: 30px;
        color: red;
        font-size: 26px;
    }

    .login-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70.5%;
        height: 58px;
        border-radius: 10px;
        background: #1fb5ac;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        font-size: 32px;
        color: #fff;
        cursor: pointer;
    }
    .login-btn:hover {
        opacity: 0.8;
    }
</style>
