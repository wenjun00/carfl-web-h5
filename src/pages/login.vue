<template>
  <section class="page login-page theme-default">
    <el-row type="flex" class="full-absolute" justify="center" align="middle">
      <el-form ref="login-form" :model="loginModel" :rules="loginRule" label-width="80px" class="login-form">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginModel.username" placeholder="请输入用户名" @on-keyup.enter="submitForm">
            <!-- <i type="ios-person-outline" slot="prepend"></i> -->
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginModel.password" placeholder="请输入密码" @on-keyup.enter="submitForm">
            <!-- <el-icon type="ios-person-outline" slot="prepend"></el-icon> -->
          </el-input>
        </el-form-item>
        <el-form-item label-width="0px" style="text-align:center">
          <el-button type="primary" class="submit_btn" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { Mutation } from "vuex-class";
import { AuthService } from "~/services/auth.service";

@Component({})
export default class Login extends Vue {
  @Dependencies(AuthService) private authService: AuthService;
  @Mutation("updateUserToken") updateUserToken;
  @Mutation("updateUserData") updateUserData;
  @Mutation("updateUserRole") updateUserRole;
  @Mutation("updateUserResource") updateUserResource;

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

      this.authService
        .login({
          username: this.loginModel.username,
          password: this.loginModel.password
        })
        .subscribe(
          ({ token, organization, operator: { id, username, role } }) => {
            // 更新用户token
            this.updateUserToken(token);

            // 更新用户数据
            this.updateUserData({
              id,
              username
            });

            // 更新用户角色
            this.updateUserRole({
              id: role.id,
              name: role.id
            });

            // 更新用户资源
            this.updateUserResource(role.resources);

            // 跳转工作区
            this.$router.push("/test1");
          },
          ({ msg }) => {
            this.$message.error(msg);
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
