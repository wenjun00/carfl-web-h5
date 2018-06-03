<template>
  <section class="page contactInformation">
    <van-row>
      <p class="base-info-title">联系人一</p>
      <van-cell-group>
        <van-cell title="与承租人关系" is-link :value="value" @click="show.relation1=true" required/>
        <van-field v-model="contactModel.username" label="姓名" placeholder="请输入联系人姓名" required/>
        <van-field v-model="contactModel.phone" label="手机号" placeholder="请输入联系人手机号" required/>
      </van-cell-group>
      <van-popup v-model="show.relation1" position="bottom">
        <van-picker :columns="columns.relation1" show-toolbar @change="onChange" @confirm="show.relation1=false" @cancel="show.relation1=false" />
      </van-popup>
    </van-row>
    <van-row>
      <p class="base-info-title">联系人二</p>
      <van-cell-group>
        <van-cell title="与承租人关系" is-link :value="value" @click="show.relation2=true" required/>
        <van-field v-model="conModel.username" label="姓名" placeholder="请输入联系人姓名" required/>
        <van-field v-model="conModel.phone" label="手机号" placeholder="请输入联系人手机号" required/>
      </van-cell-group>
    </van-row>
    <van-popup v-model="show.relation2" position="bottom">
      <van-picker :columns="columns.relation2" show-toolbar @change="onChange" @confirm="show.relation2=false" @cancel="show.relation2=false" />
    </van-popup>
    <van-button type="primary" bottom-action>下一步</van-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Login extends Vue {
  private contactModel = {
    phone: "",
    username:""
  }
  private conModel = {
    phone: "",
    username:""
  }
  private columns = {
    relation1: '',
    relation2: ''
  }
  private show = {
    relation1: false,
    relation2: false,
  }
  private value: any = null;
  private type: any;
  // choose(type) {
  //   if(type===1){
  //     this.columns = ["未婚", "已婚", "丧偶", "离婚"];
  //   }else{
  //     this.columns = ['本科', '专科', '博士'];
  //   }
  // }

  onChange(picker, value, index) {
    if (value) {
      this.columns.relation1 = value;
    } else {
      this.columns.relation2 = '';
    }
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
