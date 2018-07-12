<template>
  <section class="page login">
    <div :class="{'move-top1' : keyboardFlag.phone, 'move-top2': keyboardFlag.code }" class="imgHeaght">
      <img height="160px" src="/static/images/common/register_login.png">
    </div>
    <van-row class="login-info">
      <van-cell-group>
        <van-field v-model.lazy="loginModel.phoneNumber" type="number" label="手机号" placeholder="请输入您的手机号" icon="clear" @click-icon="loginModel._phoneNumber = ''" />
        <van-field v-model.lazy="loginModel.verifyCode" type="number" label="验证码" placeholder="请输入短信验证码" icon="clear" @click-icon="loginModel._verifyCode = ''">
          <van-button slot="button" size="small" type="primary" @click="onVerifyCodeClick" :disabled="leftTime !== 0">{{leftTime > 0 ? leftTime + '秒后重发' : '获取验证码'}}</van-button>
        </van-field>
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
import { State, Action, Mutation } from "vuex-class";
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
  @Mutation updateUserOrder;
  @Mutation promptlyMakeControl

  // 客户手机号码
  private phoneNumber: string = "";
  private loginModel = {
    _phoneNumber: "",
    get phoneNumber() {
      return this._phoneNumber
    },
    set phoneNumber(val) {
      if (val && val.length <= 11) {
        this._phoneNumber = val
      }
      if (val.length === 0) {
        this._phoneNumber = ''
      }

    }, // 客户手机号码
    _verifyCode: "",
    get verifyCode(): string {
      return this._verifyCode
    },
    set verifyCode(v: string) {
      if (v && v.length <= 6) {
        this._verifyCode = v;
      }
      if (v.length === 0) {
        this._verifyCode = '';
      }
    }
  };
  private authCode: '' // 存store 验证码 

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
   * 获取验证码
   */
  private onVerifyCodeClick(time) {
    this.loginService.getVerifyCode(this.loginModel.phoneNumber).subscribe(
      data => {
        // this.authCode = data
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

  /**
   * 提交操作
   */
  private onSubmit() {
    if (this.loginModel.phoneNumber == '') {
      this.$toast('请输入手机号')
      return
    }
    if (this.loginModel.verifyCode == '') {
      this.$toast('请输入验证码')
      return
    }
    this.$validator.validate(this.loginModel, this.rules).then(error => {
      if (error) {
        return this.$toast(error);
      }

      this.loginService.verifyCodeLogin(this.loginModel).subscribe(
        data => {
          let resultData = {
            token: data.token,
            personalId: data.personalId,
            personalName: data.personalName,
            userPhone: this.loginModel.phoneNumber,
            // authCode: this.authCode
            authCode: this.loginModel.verifyCode,
          }
          this.promptlyMakeControl(false)
          this.updateUserLoginData(resultData)
          this.updateUserOrder(data.orderNo)
          this.$router.push("/Index");
        },
        err => {
          this.$toast(err.msg)
          this.loginModel.verifyCode = ''
        }
      )


    });
  }

}
</script>
<style lang="less" scoped>
.page.login {
  text-align: center;
  .submit {
    margin-top: 20px;
    height: 80px;
  }
  .imgHeaght {
    height: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .move-top {
    &1 {
      margin-top: -200px;
    }
    &2 {
      margin-top: -230px;
    }
  }
}
</style>

