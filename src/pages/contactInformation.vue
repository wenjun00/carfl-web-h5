<template>
  <section class="page contactInformation">
    <van-row>
      <p class="base-info-title">联系人一</p>
      <van-cell-group>
        <van-cell title="与承租人关系" is-link :value="value" @click="pickerDialog=true;choose(1)" required/>
        <van-field v-model="username" label="姓名" placeholder="请输入联系人姓名" required/>
        <van-field v-model="phone" label="手机号" placeholder="请输入联系人手机号" required/>
      </van-cell-group>
    </van-row>
    <van-row>
      <p class="base-info-title">联系人二</p>
      <van-cell-group>
        <van-cell title="与承租人关系" is-link :value="value" @click="pickerDialog=true;choose(1)" required/>
        <van-field v-model="username" label="姓名" placeholder="请输入联系人姓名" required/>
        <van-field v-model="phone" label="手机号" placeholder="请输入联系人手机号" required/>
      </van-cell-group>
    </van-row>
    <transition name="fade">
      <van-picker :columns="columns" v-show="pickerDialog" show-toolbar ref="vanpicker" @change="onChange" @confirm="pickerDialog=false" @cancel="pickerDialog=false" />
    </transition>
    <van-button type="primary" bottom-action>下一步</van-button>
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
  private phone: any = null;
  private username: any = null;
  private value: any = null;
  
  private pickerDialog: boolean = false;
  private columns: any = ['本科', '专科', '博士'];
  private type: any;
  choose(type) {
    if(type===1){
      this.columns = ["未婚", "已婚", "丧偶", "离婚"];
    }else{
      this.columns = ['本科', '专科', '博士'];
    }
  }

    onChange(picker, value, index) {
      if (value) {
        this.columns = value;
      } else {
        this.columns = '本科';
      }
    }

    onClickRight() {

    }

  }
</script>
<style lang="less" scoped>
  .van-picker {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 100;
  }
  .fade-enter-active,
  .fade-leave-active {
  transition: bottom 0.5s;
  }
  .fade-enter, .fade-leave-to{
  bottom: -388px;
  }

  .base-info-title {
    color: gray;
    padding: 12px;
    font-size: 0.8rem;
    border-bottom: 1px solid #E8E8E8;
  }
  .van-cell--required::before {
    left: -0.3rem;
    bottom: 0.3rem;
    font-size: 36px;
    color: #FFE44D;
  }
  .van-cell{
    margin: 0 auto 0 3%;
    border-bottom: 1px solid #E8E8E8;
    width:97%;
  }
  .van-button--bottom-action.van-button--primary {
    background-color: #FFE44D;
    position: fixed;
    bottom: 0rem;
  }
</style>
