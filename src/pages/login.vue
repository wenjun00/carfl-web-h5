<template>
  <section class="page login-page theme-defaultaasd">
    <i-row type="flex" justify="center" align="middle" class="full-absolute">
      <i-form ref="login-form" :model="loginModel" :rules="loginRule" :label-width="80" class="login-form">
        <i-form-item label="用户名" prop="username">
          <i-input type="text" v-model="loginModel.username" placeholder="请输入用户名" @on-keyup.enter="submitForm">
            <i-icon type="ios-person-outline" slot="prepend"></i-icon>
          </i-input>
        </i-form-item>
        <i-form-item label="密码" prop="password">
          <i-input type="password" v-model="loginModel.password" placeholder="请输入密码" @on-keyup.enter="submitForm">
            <i-icon type="ios-person-outline" slot="prepend"></i-icon>
          </i-input>
        </i-form-item>
        <i-form-item :label-width="0" style="text-align:center">
          <i-button type="primary" class="submit_btn" @click="submitForm">登录</i-button>
        </i-form-item>
      </i-form>
    </i-row>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { LoginService } from "~/services/business-service/login.service";
import { Dependencies } from "~/core/decorator";
import { Mutation } from "vuex-class";
import AppConfig from '~/config/app.config'

@Component({})
export default class Login extends Vue {
  @Dependencies(LoginService) private loginService: LoginService;
  @Mutation("updateUserToken") updateUserToken;
  @Mutation("updateUserData") updateUserData;

  private loginRule: Object = {};
  private loginModel: any;

  created() {
    // 设置表单数据
    this.loginModel = {
      username: "",
      password: ""
    };

    // 设置验证规则
    this.loginRule = {
      username: [
        {
          required: true,
          message: "用户名不能为空",
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        }
      ]
    };
  }

  /**
   * 提交登录表单
   */
  submitForm() {
    let loginForm: any = this.$refs["login-form"];
    loginForm.validate(success => {
      if (!success) {
        return;
      }

      this.loginService
        .login({
          username: this.loginModel.username,
          password: this.loginModel.password
        })
        .subscribe(
          ({token,user}) => {
            this.updateUserToken(token);
            this.updateUserData(user);
            this.$router.push('/')
          },
          ({ msg }) => {

          }
        );
    });
  }
}
</script>

<style lang="less">
.login-form {
  width: 350px;
}

.submit_btn {
  width: 120px;
}
</style>
