<!--注册-->
<template>
  <section class="component register">
    <i-form :label-width="70" ref="register" :model="registerModel" class="register-form" label-position="right" :rules="rules">
      <i-form-item label="用户名" prop="userUsername">
        <i-input v-model="registerModel.userUsername" style="width:80%;"></i-input>
      </i-form-item>
      <i-form-item label="姓名" prop="userRealname">
        <i-input v-model="registerModel.userRealname" style="width:80%;"></i-input>
      </i-form-item>
      <i-form-item label="电话" prop="userPhone">
        <i-input v-model="registerModel.userPhone" style="width:80%;"></i-input>
      </i-form-item>
      <i-form-item label="密码" prop="userPassword">
        <i-input v-model="registerModel.userPassword" type="password" style="width:80%;"></i-input>
      </i-form-item>
      <i-form-item label="确认密码" prop="confirmPwd">
        <i-input v-model="registerModel.confirmPwd" type="password" style="width:80%;"></i-input>
      </i-form-item>
      <i-form-item label="所属公司" prop="company">
        <i-input v-model="registerModel.company" style="width:80%;"></i-input>
      </i-form-item>
      <i-row style="text-align:center;margin-right:40px;">
        <i-button @click="cancelClick" size="large">取消</i-button>
        <i-button @click="registerClick()" size="large" style="background:#265ea2;color:#fff;margin-left:20px;">注册</i-button>
      </i-row>
    </i-form>

  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { UserService } from "~/services/manage-service/user.service";
import { Form } from "iview";
@Component({
  components: {}
})
export default class Register extends Vue {
  @Dependencies(UserService) private userService: UserService;
  private registerModel: any = {
    userUsername: "",
    userRealname: "",
    userPassword: "",
    confirmPwd: "",
    userPhone: "",
    company: ""
  };
  private rules: any;

  created() {
    this.rules = {
      userUsername: [
        {
          required: true,
          message: "用户名不能为空",
          trigger: "blur"
        }
      ],
      userRealname: [
        {
          required: true,
          message: "姓名不能为空",
          trigger: "blur"
        }
      ],
      userPassword: [
        {
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        }
      ],
      confirmPwd: [
        {
          required: true,
          message: "确认密码不能为空",
          trigger: "blur"
        }
      ],
      userPhone: [
        {
          required: true,
          message: "电话不能为空",
          trigger: "blur"
        }
      ]
    };
  }
  cancelClick() {
    this.$emit("close");
    let register: any = this.$refs["register"];
    register.resetFields();
  }
  registerClick() {
    let registerForm: any = this.$refs["register"];
    registerForm.validate(valid => {
      if (!valid) return false;
      this.userService.userRegister(this.registerModel).subscribe(
        data => {
          this.$Message.success("注册成功!");
          this.$emit("close");
          let register: any = this.$refs["register"];
          register.resetFields();
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
    });
  }
}
</script>

<style lang="less">
.register {
  .ivu-form {
    position: relative;
    left: 40px;
  }
}
</style>
