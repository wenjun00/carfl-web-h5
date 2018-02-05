<!--注册-->
<template>
  <section class="component register">
    <i-form :label-width="70" ref="register" :model="registerModel" class="register-form" label-position="right" :rules="rules">
      <i-form-item label="用户名" prop="userName">
        <i-input v-model="registerModel.userName" style="width:80%;"></i-input>
      </i-form-item>
      <i-form-item label="姓名" prop="realName">
        <i-input v-model="registerModel.realName" style="width:80%;"></i-input>
      </i-form-item>
      <i-form-item label="电话" prop="phone">
        <i-input v-model="registerModel.phone" style="width:80%;"></i-input>
      </i-form-item>
      <i-form-item label="密码" prop="pwd">
        <i-input v-model="registerModel.pwd" type="password" style="width:80%;"></i-input>
      </i-form-item>
      <i-form-item label="确认密码" prop="confirmPwd">
        <i-input v-model="registerModel.confirmPwd" type="password" style="width:80%;"></i-input>
      </i-form-item>
      <i-form-item label="所属公司" prop="belongFirm">
        <i-input v-model="registerModel.belongFirm" style="width:80%;"></i-input>
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
  import {
    Form
  } from 'iview'
  @Component({
    components: {}
  })
  export default class Register extends Vue {
    private registerModel: any;
    private rules: any

    created() {
      this.rules = {
        userName: [{
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        }],
        realName: [{
          required: true,
          message: '姓名不能为空',
          trigger: 'blur'
        }],
        pwd: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }],
        confirmPwd: [{
          required: true,
          message: '确认密码不能为空',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '电话不能为空',
          trigger: 'blur'
        }]
      }
      this.registerModel = {
        userName: '',
        realName: '',
        pwd: '',
        confirmPwd: '',
        phone: ''
      }
    }
    cancelClick() {
      this.$emit('close')
    }
    registerClick() {
      let registerForm = < Form > this.$refs['register']
      registerForm.validate((valid) => {
        if (valid) {
          this.$Message.success('注册成功!');
          this.$emit('close')
        }
      })
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
