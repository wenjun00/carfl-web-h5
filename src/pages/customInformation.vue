<template>
  <section class="page customInformation">
    <van-row>
      <p class="base-info-title">基本信息</p>
      <van-cell-group>
        <van-field v-model="phone" label="手机号码" placeholder="请输入手机号" required/>
        <van-field v-model="contactPhone" label="联系号码" placeholder="客户第二个手机号" />
        <van-cell title="婚姻状况" is-link :value="value" @click="pickerDialog=true;choose(1)" required/>
        <van-cell title="学历信息" is-link :value="value" @click="pickerDialog=true;choose(2)" required/>
      </van-cell-group>
    </van-row>
    <van-row>
      <p class="base-info-title">居住信息</p>
      <van-cell-group>
        <van-cell title="居民情况" is-link :value="value" @click="pickerDialog=true" required/>
        <van-cell title="学历年限" is-link :value="value" @click="pickerDialog=true" required/>
        <van-cell title="居民地区" is-link :value="value" @click="pickerDialog=true" required/>
        <van-field type="textarea" class="address" v-model="address" label="居民地址" placeholder="请输入详细的居民地址精确到门牌号" required/>
      </van-cell-group>
    </van-row>
    <van-row>
      <p class="base-info-title">工作信息</p>
      <van-cell-group>
        <van-cell title="工作情况" is-link :value="value" @click="pickerDialog=true" required/>
        <van-field v-model="companyName" label="单位名称" placeholder="请输入完整的公司名称" />
        <van-cell title="单位性质" is-link :value="value" @click="pickerDialog=true" />
        <van-field v-model="companyAdress" label="单位地址" />
        <van-field v-model="companyPhone" label="单位电话" placeholder="请输入公司电话" />
        <van-cell title="工作年限" is-link :value="value" @click="pickerDialog=true" />
        <van-field v-model="afterSalary" label="税后月薪" placeholder="请输入您税后的月薪" />
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
  private contactPhone: any = null;
  private address: any = null;
  private value: any = null;
  private companyName: any = null;
  private companyAdress: any = null;
  private companyPhone: any = null;
  private afterSalary: any = null;
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
  .van-cell--required::before {
    left: -0.3rem;
    bottom: 0.3rem;
    font-size: 36px;
    color: #FFE44D;
  }
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
  .fade-enter, .fade-leave-to {
    bottom: -388px;
  }
  .base-info-title {
    color: gray;
    padding: 12px;
    font-size: 0.8rem;
    border-bottom: 1px solid #E8E8E8;
  }
  .van-cell{
    margin: 0 auto 0 3%;
    border-bottom: 1px solid #E8E8E8;
    width:97%;
  }
  .van-button--bottom-action.van-button--primary {
    background-color: #FFE44D;
  }
  .van-cell--required[data-v-21fd4166]::before{
    top: .9rem;
  }
</style>
