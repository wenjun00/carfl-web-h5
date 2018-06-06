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
      <van-row class="imgList">
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="onRead" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="photo == ''" name="add" />
            <img width="100%" v-else :src="photo" alt="">
          </van-uploader>
          <van-icon @click="closeIdentityCard" v-if="!photo == ''" class="deleteiconHead" name="close" />
          <van-icon @click="lookIdentityCard" v-if="!photo == ''" class="lookiconHead" name="password-view" />
        </van-col>
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="onReadTwo" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="photoTwo == ''" name="add" />
            <img width="100%" v-else :src="photoTwo" alt="">
          </van-uploader>
          <van-icon @click="closeIdentityCardTwo" v-if="!photoTwo == ''" class="deleteiconHead" name="close" />
          <van-icon @click="lookIdentityCardTwo" v-if="!photoTwo == ''" class="lookiconHead" name="password-view" />
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
        <van-field v-model="peopleCar.useful_time" placeholder="请输入有效期限" label="有效期限" required/>
        <van-field v-model="peopleCar.file_number" placeholder="请输入档案编号" label="档案编号" required/>
        <van-field v-model="drivingType" label="准驾车型" placeholder="请选择准驾车型" @click="pickerDialog=true" />
      </van-cell-group>
    </van-row>

    <transition name="fade">
      <van-picker :columns="columns" v-show="pickerDialog" show-toolbar ref="vanpicker" @confirm="onConfirm" @cancel="pickerDialog=false" />
    </transition>
    <van-button type="primary" @click="$router.push('/upload-id-photo-three')" bottom-action>下一步</van-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ImagePreview } from 'vant';
import { State, Mutation, Action } from "vuex-class";
@Component({})
export default class Login extends Vue {
  private idName: any = null;
  private idNumber: any = null;
  private value: any = null;
  private photo: any = "";
  private photoTwo: any = ''
  private pickerDialog: boolean = false;
  private columns: any = [];
  private type: any;
  private drivingType: string = ''
  private peopleCar: any = {
    useful_time: '',  // 有效期限
    file_number: '',  // 档案编号
    driving_license: '', // 准驾车型
    driverPhoto:'',   // 驾驶证正面
    driverVicePhoto:'', // 驾驶证负面
  }

  @Mutation choosePeople
  
  /**
  * 点击准驾车型确定事件
  */

  private onConfirm(val) {
    this.peopleCar.driving_license = val.value
    this.drivingType = this.$dict.getDictName(Number(this.peopleCar.driving_license))
    this.pickerDialog = false
  }

  /**
  * 图片上传
  */
  onRead(val, b) {
    // console.log(val)
    this.photo = val.content
  }
  onReadTwo(val) {
    this.photoTwo = val.content
    // console.log(val)
  }
  closeIdentityCard() {
    this.photo = ''
  }
  lookIdentityCard() {
    ImagePreview([this.photo]);
  }
  closeIdentityCardTwo() {
    this.photoTwo = ''
  }
  lookIdentityCardTwo() {
    ImagePreview([this.photoTwo]);
  }
  mounted() {
    this.choosePeople(this.peopleCar)
    this.columns = this.$dict.getDictData('0487').map(v => {
      return Object.assign({ text: v.label }, v)
    })

  }

}
</script>
<style lang="less" scoped>
.page.uploadIdPhotoTwo {
  .lookiconHead {
    position: relative;
    top: -105px;
    left: -65px;
    color: cornflowerblue;
    font-size: 25px;
  }
  .deleteiconHead {
    position: relative;
    top: -105px;
    left: 65px;
    color: cornflowerblue;
    font-size: 20px;
  }
  .headPortrait {
    display: flex;
    align-items: center;
    padding: 5px;
    box-sizing: border-box;
  }
  .vanIcon {
    font-size: 40px;
    line-height: 150px;
    color: #bebebe;
  }
  .imgList {
    text-align: center;
    display: flex;
    justify-content: center;
    .imgSize {
      height: 110px;
      border: 1px solid #6666;
      width: 90%;
      margin-top: 10px;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: bottom 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    bottom: -388px;
  }

  .base-info-title {
    color: gray;
    padding: 12px;
    font-size: 0.8rem;
    border-bottom: 1px solid #e8e8e8;
  }

  .photo_container {
    display: flex;
  }
  .photo_content {
    flex: 1;
    display: flex;
    justify-content: space-around;
    img {
      width: 100%;
      height: 124px;
    }
  }
  p {
    margin: 0;
  }
}
</style>
<style lang="less">
.page.uploadIdPhotoTwo {
  .van-step--horizontal.van-step--finish .van-step__circle,
  .van-step--horizontal.van-step--finish .van-step__line {
    background-color: #ffe44d;
  }
  .van-step--horizontal.van-step--finish {
    color: #ffe44d;
  }
  .van-step--horizontal:last-child .van-step__title {
    color: gray;
  }
  .van-cell--required::before {
    left: -0.3rem;
    bottom: 0.3rem;
    font-size: 36px;
    color: #ffe44d;
  }
  .van-cell {
    margin: 0 auto 0 3%;
    border-bottom: 1px solid #e8e8e8;
    width: 97%;
  }
  .van-button--bottom-action.van-button--primary {
    background-color: #ffe44d;
    position: fixed;
    bottom: 0rem;
  }
  .van-picker {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 100;
  }
  .icon.iconfont.icon-jiahao.add.van-icon.van-icon-undefined {
    font-size: 60px;
    line-height: 150px;
  }
  .imgSize.headPortrait.van-uploader {
    display: flex;
    justify-content: center;
  }
}
</style>
