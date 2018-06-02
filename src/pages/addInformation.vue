<template>
  <section class="page addInformation">
    <van-row>
      <p class="base-info-title"> <span class="star">*</span>承租人手持身份证照片</p>
      <div class="idPhoto">
        <div class="infoContent">照片</div>
        <div class="background">
          <i class="icon iconfont icon-jianhaob"></i>
        </div>
      </div>
    </van-row>
    <van-row>
      <p class="base-info-title"><span class="star">*</span>承租人手持业务员照片</p>
      <div class="idPhoto">
        <div class="infoContent">合照</div>
        <div class="background">
          <i class="icon iconfont icon-jianhaob"></i>
        </div>
      </div>      
    </van-row>
    <van-cell-group>
        <van-cell title="追加担保人（选填）" is-link :value="value" @click="pickerDialog=true;choose(1)"/>
        <van-cell title="追加资料（选填）" is-link :value="value" @click="pickerDialog=true;choose(2)"/>
      </van-cell-group>
    <transition name="fade">
      <van-picker :columns="columns" v-show="pickerDialog" show-toolbar ref="vanpicker" @change="onChange" @confirm="pickerDialog=false" @cancel="pickerDialog=false" />
    </transition>
    <van-button type="primary" bottom-action>确认并提交</van-button>
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
  private idName: any = null;
  private idNumber: any = null;
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

    onRead() {

    }

  }
</script>
<style lang="less">
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
  p{
    margin: 0;
  }
  .idPhoto {
    width:180px;
    height:110px;
    border: 0.1rem solid #E7E7E7;
    margin: 12px;
    position: relative;
    background:#E7E7E7;
 }
 .star{
    color: #ffe44d; 
    font-size: 2rem;
    vertical-align: middle;
    margin-right:0.2rem;
 }
 .background {
    position:absolute;
    border: 1px solid #E7E7E7;
 
    left: 8.4rem;
    color:#E7E7E7;
   
 }
 .iconfont{
    font-size:1.5rem;
    margin-top: -0.6rem;
    display: inline-block;
    color:#C9C9C9;
    margin-top: -3px;
    border: 1px solid #E7E7E7;
    background:white;
    width: 25px;
    height: 18px;
    line-height:18px;
    margin-left: 18px;
 }
 .infoContent{
  position: absolute;
  left: 42%;
  top: 40%;
  color: #BEBEBE;
 }
</style>
