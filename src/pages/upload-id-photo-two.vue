<template>
  <section class="page uploadIdPhotoTwo">
    <van-row>
      <van-steps :active="1" active-color="#FFE44D">
        <van-step>身份证信息</van-step>
        <van-step>驾驶证信息</van-step>
        <van-step>银行卡信息</van-step>
      </van-steps>
    </van-row>
     <p class="base-info-title">请扫描上传承租人驾驶证照片</p>
    <van-row>
      <van-row class="photo_container">
        <van-col class="photo_content">
          <img src="../assets/img/drive1.png" style="width:180px;height:110px">
        </van-col>
        <van-col  class="photo_content">
          <img src="../assets/img/drive2.png" style="width:180px;height:110px">
        </van-col>
      </van-row>
      <van-row style="text-align: center">
        <van-col span="12" style="font-size:14px">驾驶证正页</van-col>
        <van-col span="12" style="font-size:14px">驾驶证副页</van-col>
      </van-row>
    </van-row>
    <van-row>
      <p class="base-info-title">请确认驾驶证信息是否一致</p>
      <van-cell-group>
        <van-cell title="有效期限" is-link :value="value" @click="pickerDialog=true;choose(1)" required/>        
        <van-field v-model="idName" label="档案编号" required/>
        <van-cell title="准驾车型" is-link :value="value" @click="pickerDialog=true;choose(2)" required/>
      </van-cell-group>
    </van-row>
    <transition name="fade">
      <van-picker :columns="columns" v-show="pickerDialog" show-toolbar ref="vanpicker" @change="onChange" @confirm="pickerDialog=false" @cancel="pickerDialog=false" />
    </transition>
    <van-button type="primary" @click="$router.push('/upload-id-photo-three')" bottom-action>下一步</van-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({})
export default class Login extends Vue {
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
  .photo_container{
    display: flex;
  }
  .photo_content{
    flex: 1;
    display: flex;
    justify-content: space-around;
    img{
      width: 100%;
      height: 124px;
    }
  } 
  p{
    margin: 0;
  }
  .van-step--horizontal.van-step--finish .van-step__circle, .van-step--horizontal.van-step--finish .van-step__line {
    background-color: #FFE44D;
  }
  .van-step--horizontal.van-step--finish {
    color: #FFE44D;
  }
  .van-step--horizontal:last-child .van-step__title{
    color:gray;
  }
</style>
