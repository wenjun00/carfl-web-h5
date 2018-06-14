<template>
  <section class="page login"> 
    <div :class="keyboardFlag.phone || keyboardFlag.code ? 'move-top' : ''" class="imgHeaght">
      <img height="160px" src="/static/images/common/register_login.png">
    </div>
    <van-row class="login-info">
      <van-cell-group>
        <van-field maxlength="11" v-model="loginModel.phoneNumber" label="手机号" placeholder="请输入您的手机号" icon="clear" @click-icon="loginModel.phoneNumber = ''" @focus="onPhoneNumberFocus" />
        <van-number-keyboard :show="keyboardFlag.phone" title="洋葱汽车安全键盘" close-button-text="完成" @blur="keyboardFlag.phone = false" @input="onKeyBoardInputPhone" @delete="onKeyBoardDeletePhone" />
        <van-field maxlength="6" center v-model="loginModel.verifyCode" label="验证码" placeholder="请输入短信验证码" icon="clear" @click-icon="loginModel.verifyCode = ''" @focus="onCodeNumberFocus">
          <van-button slot="button" size="small" type="primary" @click="onVerifyCodeClick" :disabled="leftTime !== 0">{{leftTime > 0 ? leftTime + '秒后重发' : '获取验证码'}}</van-button>
        </van-field>
        <van-number-keyboard :show="keyboardFlag.code" @blur="keyboardFlag.code = false" @input="onKeyBoardInputCode" @delete="onKeyBoardDeleteCode" />
      </van-cell-group>
    </van-row>
    <div class="submit">
      <van-button class="full-radius" type="primary" size="large" @click="onSubmit">登录</van-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { LoginService } from "~/services/manage-service/applogin.service";
import { Dependencies } from "~/core/decorator";
import { Action, Mutation } from "vuex-class";
import AppConfig from "~/config/app.config";
import Register from "~/components/common/register.vue";
import { StorageService } from "~/utils/storage.service";

@Component({
  components: {}
})
export default class Login extends Vue {
  @Dependencies(LoginService) private loginService: LoginService;
  @Mutation updateUserPhone;
  @Action updateUserLoginData;

  // 客户手机号码
  private phoneNumber: string = "";
  private loginModel = {
    phoneNumber: "", // 客户手机号码
    verifyCode: "" //验证码
  };

  // 键盘展示flag
  private keyboardFlag = {
    phone: false,
    code: false
  };

  // 验证规则
  private rules = {
    phoneNumber: {
      validator: this.$validator.phoneNumber,
      message: "请输入正确的手机号"
    }
  };

  // 验证码获取剩余时间
  private leftTime: number = 0;

  mounted() {
    if (StorageService.getItem("account") !== null) {
      this.loginModel.phoneNumber =
        StorageService.getItem("account").phoneNumber || "";
    }
  }

  /**
   * 键盘输入
   * @param val 案件内容
   */
  private onKeyBoardInputPhone(val) {
    if (this.loginModel.phoneNumber.length === 11) return;
    this.loginModel.phoneNumber += val.toString();
  }

  /**
   * 按钮删除操作
   */
  private onKeyBoardDeletePhone() {
    let length = this.loginModel.phoneNumber.length;
    if (length === 0) return;
    this.loginModel.phoneNumber = this.loginModel.phoneNumber.substring(
      0,
      length - 1
    );
  }

  /**
   * 输入验证码
   */
  private onKeyBoardInputCode(val) {
    if (this.loginModel.phoneNumber.length === 4) return;
    this.loginModel.verifyCode += val.toString();
  }

  /**
   * 删除验证码
   */
  private onKeyBoardDeleteCode() {
    let length = this.loginModel.verifyCode.length;
    if (length === 0) return;
    this.loginModel.verifyCode = this.loginModel.verifyCode.substring(
      0,
      length - 1
    );
  }

  /**
   * 获取验证码
   */
  private onVerifyCodeClick(time) {
    this.loginService.getVerifyCode(this.loginModel.phoneNumber).subscribe(
      data => {
        // this.loginModel.verifyCode = data
        this.leftTime = 60;
        let _self = this;
        let setTime = () => {
          setTimeout(() => {
            if (_self.leftTime > 0) {
              _self.leftTime--;
              setTime();
            }
          }, 1000);
        };
        setTime();
      },
      err => this.$toast(err.msg)
    )
  }
  // 获取当前用户有没有订单
  getOrderInfo() {

  }

  /**
   * 提交操作
   */
  private onSubmit() {

    this.$validator.validate(this.loginModel, this.rules).then(error => {
      if (!error) {
        this.loginService.verifyCodeLogin(this.loginModel).subscribe(
          data => {
            let resultData = {
              token: data.token,
              personalId: data.personalId,
              personalName: data.personalName,
              userPhone: this.loginModel.phoneNumber
            }
            this.updateUserLoginData(resultData)
            this.$router.push("/Index");
          },
          err => this.$toast(err.msg)
        )

      } else {
        this.$toast(error);
      }
    });
  }

  private onPhoneNumberFocus(v) {
    (document.activeElement as HTMLElement).blur()
    this.keyboardFlag.phone = true
  }

  private onCodeNumberFocus() {
    (document.activeElement as HTMLElement).blur()
    this.keyboardFlag.code = true
  }
}
</script>
<style lang="less" scoped>
.page.login {
  text-align: center;
  .submit {
    margin-top: 30px;
  }
  .imgHeaght {
    height: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .move-top{
    margin-top: -80px;
  }
}
</style>
