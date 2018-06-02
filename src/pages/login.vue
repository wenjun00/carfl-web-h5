<template>
  <section class="page login">
    <van-row>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </van-row>
    <van-row class="login-info">
      <van-cell-group>
        <van-field v-model="loginModel.username" placeholder="请输入用户名" />
        <van-field v-model="loginModel.password" type="password" placeholder="请输入密码" />
      </van-cell-group>
      <van-col span="12" offset="12" class="register">
        <router-link to="/AddDocumentInfor">注册</router-link>
      </van-col>
    </van-row>
    <van-row class="login">
      <van-button type="primary" size="large">登录</van-button>
    </van-row>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { LoginService } from "~/services/manage-service/login.service";
import { Dependencies } from "~/core/decorator";
import { Action } from "vuex-class";
import AppConfig from "~/config/app.config";
import Register from "~/components/common/register.vue";
import { StorageService } from "~/utils/storage.service";

@Component({
  components: {
    Register
  }
})
export default class Login extends Vue {
  @Dependencies(LoginService) private loginService: LoginService;
  @Action("updateUserLoginData") updateUserLoginData;

  private images = ['/static/images/common/111.jpg', '/static/images/common/111.jpg', '/static/images/common/111.jpg']

  private loginRule: Object = {};
  private loginModel: any = {
    username: "",
    password: "",
  };
  private registerModal: Boolean = false;

  mounted() {
    if (StorageService.getItem("account") !== null) {
      this.loginModel.username = StorageService.getItem("account").username;
      this.loginModel.password = StorageService.getItem("account").password;
    }
  }
  created() {
    // 设置表单数据
    // this.loginModel = {};

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
   * 取消注册
   */
  cancelRegister() {
    this.registerModal = false;
    let _register: any = this.$refs["register"];
    _register.resetForm();
  }

  /**
   * 确定注册
   */
  confirmRegister() {
    let _register: any = this.$refs["register"];
    _register.registerClick();
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
          password: this.loginModel.password,
          loginDevice: 414,
          loginType: 411
        })
        .subscribe(
          async data => {
            // 更新基础数据
            await this.updateUserLoginData(data);
            // 进入首页
            this.$router.push("/home");

            if (this.loginModel.remember) {
              StorageService.setItem("account", {
                username: this.loginModel.username,
                password: this.loginModel.password,
                timing: new Date(
                  +new Date() + 1000 * 60 * 60 * 24 * 7
                ).valueOf() // 默认七天过期
              });
            } else {
              StorageService.removeItem("account");
            }
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    });
  }

}
</script>
<style lang="less" scoped>
.login-info {
  margin-top: 50px;
}
.register {
  font-size: 14px;
  text-align: right;
  padding-right: 20px;
}

.login {
  margin-top: 20px;
}
</style>
