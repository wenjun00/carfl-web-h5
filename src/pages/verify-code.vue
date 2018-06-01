<template>
  <section class="page verify-code">
    <div class="register-info">
      <p class="register-info-title">输入验证码</p>
      <p class="register-info-msg">验证码已发送至 {{userPhone}}</p>
    </div>
    <div>
      <!--验证码输入框-->
      <van-password-input :value="verifyCode" :info="`${time}秒后重发`" @focus="showKeyboard = true" />

      <!-- 数字键盘 -->
      <van-number-keyboard :show="showKeyboard" @blur="showKeyboard = false" @input="onKeyBoardInput" @delete="onKeyBoardDelete" />
    </div>
    <div class="submit">
      <van-button type="primary" size="large" @click="onSubmit">登录</van-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from "vue-property-decorator";

export default class verifyCode extends Vue {
  private userPhone = ''

  private verifyCode: string = ''
  private time: number = 60
  private showKeyboard: boolean = false;

  private onKeyBoardInput(val) {
    this.verifyCode += val.toString()
  }

  private onKeyBoardDelete() {

  }

  private onSubmit() {

  }
}
</script>

<style lang="less" scoped>
.verify-code {
  margin-top: 30px;
  .register-info {
    margin-left: 30px;
    &-title {
      font-size: 1.5rem;
    }
    &-msg {
      font-size: 0.8rem;
    }
  }
  .submit {
    margin-top: 30px;
  }
}
</style>

