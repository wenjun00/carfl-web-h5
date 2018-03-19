<!--注册-->
<template>
  <section class="component register">
    <i-form :label-width="70" ref="register-form" :model="registerModel" class="register-form" label-position="left" :rules="rules">
      <i-form-item label="用户名" prop="userUsername">
        <i-input v-model="registerModel.userUsername" style="width:80%;" :maxlength="50" @on-blur="checkUserName"></i-input>
      </i-form-item>
      <i-form-item label="姓名" prop="userRealname">
        <i-input v-model="registerModel.userRealname" style="width:80%;" :maxlength="8"></i-input>
      </i-form-item>
      <i-form-item label="电话" prop="userPhone">
        <i-input v-model="registerModel.userPhone" style="width:80%;" :maxlength="11"  @on-blur="checkUserPhone"></i-input>
      </i-form-item>
      <i-form-item label="密码" prop="userPassword">
        <i-input v-model="registerModel.userPassword" type="password" style="width:80%;" :maxlength="20" @on-blur="checkPwd"></i-input>
      </i-form-item>
      <i-form-item label="确认密码" prop="confirmPwd">
        <i-input v-model="registerModel.confirmPwd" type="password" style="width:80%;" @on-blur="comfirmPw" :maxlength="20"></i-input>
      </i-form-item>
      <i-form-item label="所属公司" prop="company">
        <i-input v-model="registerModel.company" style="width:80%;"></i-input>
      </i-form-item>
      <!-- <i-row style="text-align:center;margin-right:40px;">
        <i-button @click="cancelClick" size="large">取消</i-button>
        <i-button @click="registerClick()" size="large" style="background:#265ea2;color:#fff;margin-left:20px;">注册</i-button>
      </i-row> -->
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import md5 from "md5";
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
  comfirmPw() {
    if (this.registerModel.confirmPwd.length < 6) {
      this.$Message.error("密码长度为6到20位,请重新输入！");
      return false;
    }
    // if (this.registerModel.confirmPwd !== this.registerModel.userPassword) {
    //   this.$Message.error("两次密码输入不一致，请重新输入!");
    //   return false;
    // }
  }
  /**
   * 检查用户名
   */
  checkUserName() {
    if (this.registerModel.userUsername.length < 6 || (/[\u4e00-\u9fa5]+/).test(this.registerModel.userUsername.toString())) {
      this.$Message.error("用户名长度为6到50位且不能为汉字,请重新输入！");
      this.registerModel.userUsername = "";
      return false;
    }
  }
  /**
   * 检查密码长度
   */
  checkPwd() {
    if (this.registerModel.userPassword.length < 6) {
      this.$Message.error("密码长度为6到20位,请重新输入！");
      this.registerModel.userPassword = "";
      return false;
    }
  }
  /**
   * 检查电话号码
   */
  checkUserPhone(){
    if(!((/^1(3|4|5|7|8)\d{9}$/).test(this.registerModel.userPhone.toString()))){
      this.$Message.error("手机号码为11位且不能为汉字以及特殊字符,请重新输入！");
      // this.registerModel.userPhone = "";
      return false;
    }
  }
  /**
   * 重置表单
   */
  resetForm() {
    let register: any = this.$refs["register-form"];
    register.resetFields();
  }
  registerClick() {
    let registerForm: any = this.$refs["register-form"];
    registerForm.validate(valid => {
      if (!valid) return false;
      if (this.registerModel.confirmPwd !== this.registerModel.userPassword) {
        this.$Message.error("两次密码输入不一致，请重新输入!");
        return false;
      }
      this.userService.userRegister({
        userUsername: this.registerModel.userUsername,
        userRealname: this.registerModel.userRealname,
        userPassword: md5(this.registerModel.confirmPwd),
        confirmPwd:  md5(this.registerModel.confirmPwd),
        userPhone: this.registerModel.userPhone,
        company: this.registerModel.company
      }).subscribe(
        data => {
          this.$Message.success("注册成功!");
          this.$emit("close");
          this.resetForm();
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
