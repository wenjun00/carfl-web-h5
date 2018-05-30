<template>
  <section class="page register">
    <div class="register-info">
      <p class="register-info-title">欢迎注册汽车金融</p>
    </div>
    <van-cell-group>
      <van-field v-model="registerModel.phoneNumber" label="手机号" placeholder="请输入手机号" error-message="手机号格式错误" />
      <van-field v-model="registerModel.verifyCode" label="手机号" placeholder="请输入验证码" />
      <van-field v-model="registerModel.passWord" label="手机号" placeholder="请输入注册密码" />
    </van-cell-group>

  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default class Register extends Vue {

  private numberKeyBoardShow: boolean = false;
  private registerModel = {
    phoneNumber: '', // 手机号
    verifyCode: '', // 验证码
    passWord: '' // 注册密码
  }

}
</script>

<style lang="less" scoped>
.register-info {
  padding: 30px, auto;
  font-size: 1.5rem;
  &-title {
    padding-left: 30px;
  }
}
</style>

