<template>
  <section class="page customInformation">
    <van-row>
      <p class="base-info-title">基本信息</p>
      <van-cell-group>
        <van-field v-model="inforModel.phone" label="手机号码" placeholder="请输入手机号" required @click="show.phone = true"/>
        <van-field v-model="inforModel.contactPhone" label="联系号码" placeholder="客户第二个手机号" @click="show.phone = true"/>
        <van-cell title="婚姻状况" is-link :value="inforModel.marital" @click="show.marital = true;" required/>
        <van-cell title="学历信息" is-link :value="inforModel.educate" @click="show.educate = true;" required/>
      </van-cell-group>
      <van-number-keyboard :show="show.phone" close-button-text="完成" @blur="show.phone = false" @input="inputPhone" @delete="deletePhone"></van-number-keyboard>
      <van-number-keyboard :show="show.contactPhone" close-button-text="完成" @blur="show.contactPhone = false" @input="contactPhone" @delete="deleteContactPhone"></van-number-keyboard>
      <van-popup v-model="show.marital" position="bottom">
        <van-picker :columns="columns.marital" show-toolbar @change="onChange" @confirm="show.marital=false" @cancel="show.marital=false" />
      </van-popup>
      <van-popup v-model="show.educate" position="bottom">
        <van-picker :columns="columns.educate" show-toolbar @change="onChange" @confirm="show.educate=false" @cancel="show.educate=false" />
      </van-popup>
    </van-row>
    <van-row>
      <p class="base-info-title">居住信息</p>
      <van-cell-group>
        <van-cell title="居住情况" is-link :value="value" @click="show.living = true" required/>
        <van-cell title="居住年限" is-link :value="value" @click="show.livingYear = true" required/>
        <van-cell title="居民地区" is-link :value="inforModel.area" @click="show.area = true" required/>
        <van-field type="textarea" class="address" v-model="inforModel.address" label="居民地址" placeholder="请输入详细的居民地址精确到门牌号" required/>
      </van-cell-group>
      <van-popup v-model="show.living" position="bottom">
        <van-picker :columns="columns" show-toolbar @change="onChange" @confirm="show.living=false" @cancel="show.living=false" />
      </van-popup>
      <van-popup v-model="show.livingYear" position="bottom">
        <van-picker :columns="columns" show-toolbar @change="onChange" @confirm="show.livingYear=false" @cancel="show.livingYear=false" />
      </van-popup>
      <van-popup v-model="show.area" position="bottom">
        <van-area title="选择所在城市" :columns-num="3" :area-list="columns.dataList" @cancel="show.area==false" @confirm="onAreaConfirmClick"></van-area>
      </van-popup>
    </van-row>
    <van-row>
      <p class="base-info-title">工作信息</p>
      <van-cell-group>
        <van-cell title="工作情况" is-link :value="value" @click="pickerDialog=true" required/>
        <van-field v-model="inforModel.companyName" label="单位名称" placeholder="请输入完整的公司名称" />
        <van-cell title="单位性质" is-link :value="value" @click="pickerDialog=true" />
        <van-field v-model="inforModel.companyAdress" label="单位地址" />
        <van-field v-model="inforModel.companyPhone" label="单位电话" placeholder="请输入公司电话" />
        <van-cell title="工作年限" is-link :value="value" @click="pickerDialog=true" />
        <van-field v-model="inforModel.afterSalary" label="税后月薪" placeholder="请输入您税后的月薪" />
      </van-cell-group>
    </van-row>
    <van-button type="primary" bottom-action>下一步</van-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AreaData from "~/assets/area"

@Component({})
export default class Login extends Vue {
  private inforModel = {
    phone: "",
    contactPhone: "",
    area: "",
    address: "",
    companyName: "",
    companyAdress: "",
    companyPhone: "",
    afterSalary: "",
    marital: ""
  }
  private show = {
    phone: false, // 电话键盘
    contactPhone:false,
    living: false, // 居住情况
    livingYear: false, // 居住年限
    area: false, // 区域选择器
    marital: false, // 结婚情况
    educate: false // 学历信息
  }
  private columns = {
    educate: ['本科', '专科', '博士'],
    dataList: AreaData,
    marital: ["未婚", "已婚", "丧偶", "离婚"]
  }
  private value: any =null


  
  /**
   * 数字键盘输入-手机号码
   */
  inputPhone(val) {
    if(this.inforModel.phone.length === 11) return
    this.inforModel.phone += val.toString()
  }
  /**
   * 数字键盘输入-联系号码
   */
  contactPhone(val) {
    if(this.inforModel.contactPhone.length === 11) return
    this.inforModel.contactPhone += val.toString()
  }
  /**
   * 按钮删除操作-手机号码
   */
  deletePhone() {
    let length = this.inforModel.phone.length 
    if(length === 0) return
    this.inforModel.phone=this.inforModel.phone.substring(0, length-1)
  }
  /**
   * 按钮删除操作-联系号码
   */
  deleteContactPhone() {
    let length = this.inforModel.contactPhone.length 
    if(length === 0) return
    this.inforModel.phone=this.inforModel.contactPhone.substring(0, length-1)
  }
  onChange(picker,values,index) {
    console.log(values, 'value')
    if (values) {
      this.inforModel.marital = values;
    } else {
      this.inforModel.marital = "";
    }
  }

  onAreaConfirmClick(val) {
    if(val&&val.length >= 2) {
      this.inforModel.area = val[0].name+" "+val[1].name+" "+val[2].name
    }
    this.show.area=false
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
