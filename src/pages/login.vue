<template>
  <section class="login-page theme-defaultaasd">
    <i-row type="flex" justify="center" align="middle" class="full-absolute">
      <div class="login-bg">
      </div>
      <div>
        <div style="position: relative;left: 350px;color:#fff;text-align:center;margin-bottom:28px;">
          <img src="/static/images/common/LOGO.png" alt="">
          <span style="font-size:12px;margin-left:4px;">v1.0.0</span>
        </div>
        <div class="loginContainer">
          <div style="font-size:20px;color:#1D4F8B;font-weight:bold;margin-bottom:20px;margin-left:56px;font-family:AdobeHeitiStd-Regular">登录</div>
          <i-form ref="login-form" :model="loginModel" :rules="loginRule" :label-width="80" class="login-form">
            <i-form-item prop="username">
              <i-input type="text" size="large" v-model="loginModel.username" placeholder="用户名" @on-keyup.enter="submitForm">
              </i-input>
            </i-form-item>
            <i-form-item prop="password">
              <i-input type="password" size="large" v-model="loginModel.password" placeholder="密码" @on-keyup.enter="submitForm">
              </i-input>
            </i-form-item>
            <!--<i-form-item label="验证码" prop="password">
            <i-input type="password" v-model="loginModel.password" placeholder="请输入密码" @on-keyup.enter="submitForm">
              <i-icon type="ios-person-outline" slot="prepend"></i-icon>
            </i-input>
          </i-form-item>-->
            <i-form-item>
              <i-checkbox>
                <span>记住用户名与密码</span>
              </i-checkbox>
              <i-button type="text" style="float:right;color:#1D4F8B" @click="register">注册</i-button>
            </i-form-item>
            <i-form-item :label-width="0" style="text-align:center">
              <i-button class="submit_btn blueButton" @click="submitForm">登录</i-button>
            </i-form-item>
          </i-form>
        </div>
      </div>
    </i-row>
    <div style="width:100%;color:#999999;position:absolute;bottom:20px;text-align:center">© 2018 Zhiwang All Rights Reserved. For Internal Use Only</div>

    <template>
      <i-modal title="新用户注册" v-model="registerModal" class="register_modal">
        <register @close="registerModal=false"></register>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {
    LoginService
  } from '~/services/login.service';
  import {
    Dependencies
  } from '~/core/decorator';
  import {
    Mutation
  } from 'vuex-class';
  import AppConfig from '~/config/app.config';
  import Register from '~/components/common/register.vue';

  @Component({
    components: {
      Register,
    },
  })
  export default class Login extends Vue {
    @Dependencies(LoginService) private loginService: LoginService;
    @Mutation('updateUserToken') updateUserToken;
    @Mutation('updateUserData') updateUserData;

    private loginRule: Object = {};
    private loginModel: any;
    private registerModal: Boolean = false;
    created() {
      // 设置表单数据
      this.loginModel = {
        username: '',
        password: '',
      };

      // 设置验证规则
      this.loginRule = {
        username: [{
          required: true,
          message: '用户名不能为空',
          trigger: 'blur',
        }, ],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur',
        }, ],
      };
    }

    /**
     * 提交登录表单
     */
    submitForm() {
      let loginForm: any = this.$refs['login-form'];
      loginForm.validate(success => {
        if (!success) {
          return;
        }

        this.loginService
          .login({
            username: this.loginModel.username,
            password: this.loginModel.password,
            loginDevice: 414,
            loginType: 411,
          })
          .subscribe(
            data => {
              this.updateUserToken(data.token);
              this.updateUserData(data.user);
              console.log('login', data.user);
              this.$router.push('/home');
            },
            ({
              msg
            }) => {
              this.$Message.error(msg);
            }
          );
      });
    }
    register() {
      this.registerModal = true;
    }
  }

</script>
<style lang="less">
  .full-absolute {
    background: #265ea3;
  }
  
  .login-bg {
    width: 500px;
    height: 500px;
    background: url('/static/images/common/login-bg.png');
    position: absolute;
    left: 140px;
    background-repeat: no-repeat;
    background-size: 500px 500px;
  }
  
  .login-form {
    width: 350px;
    position: relative;
    right: 23px;
  }
  
  .submit_btn {
    width: 270px;
    height: 40px;
    background: #265ea2;
    color: #fff;
  }
  
  .submit_btn:hover {
    background: #1d4f8b;
    color: #fff;
  }
  
  .loginContainer {
    border: 1px solid #dddddd;
    background: white;
    height: 409px;
    width: 378px;
    padding-top: 50px;
    position: relative;
    left: 350px;
    bottom: 20px;
  }
  
  .register_modal {
    .ivu-modal-footer {
      display: none;
    }
  }

</style>
