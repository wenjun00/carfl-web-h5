<template>
  <section class="page uploadIdPhotoFirst">
    <van-row>
      <van-steps :active="0" active-color="#FFE44D">
        <van-step>身份证信息</van-step>
        <van-step>驾驶证信息</van-step>
        <van-step>银行卡信息</van-step>
      </van-steps>
    </van-row>
    <p class="base-info-title">请扫描上传承租人身份证照片</p>
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
        <van-col span="12">
          <p style="font-size:14px">头像页</p>
        </van-col>
        <van-col span="12">
          <p style="font-size:14px">国徽页</p>
        </van-col>
      </van-row>
    </van-row>
    <van-row>
      <p class="base-info-title">请确认身份证信息是否一致</p>
      <van-cell-group>
        <van-field placeholder="请输入证件姓名" v-model="idName" label="证件姓名" />
        <van-field placeholder="请输入证件号码" v-model="idNumber" label="证件号码" />
        <van-cell title="民族" is-link :value="value" @click="pickerDialog=true;choose(1)" />
        <van-cell title="户籍信息" is-link :value="value" @click="pickerDialog=true;choose(2)" />
        <van-cell title="有效期限" is-link :value="value" @click="pickerDialog=true;choose(2)" />
      </van-cell-group>
    </van-row>
    <!-- <transition name="fade">
      <van-picker :columns="columns" v-show="pickerDialog" show-toolbar ref="vanpicker" @change="onChange" @confirm="pickerDialog=false" @cancel="pickerDialog=false" />
    </transition> -->
    <van-row>
      <van-button type="primary" @click="$router.push('/upload-id-photo-two')" bottom-action>下一步</van-button>
    </van-row>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ImagePreview } from "vant";
import { NetService } from "~/utils/net.service";

@Component({})
export default class Login extends Vue {
  private idName: any = null;
  private idNumber: any = null;
  private value: any = null;
  private photo: any = "";
  private photoTwo: any = "";
  private pickerDialog: boolean = false;
  private columns: any = ["本科", "专科", "博士"];
  private type: any;
  choose(type) {
    if (type === 1) {
      this.columns = ["未婚", "已婚", "丧偶", "离婚"];
    } else {
      this.columns = ["本科", "专科", "博士"];
    }
  }

  onChange(picker, value, index) {
    if (value) {
      this.columns = value;
    } else {
      this.columns = "本科";
    }
  }
  /**
   * 图片上传
   */
  onRead({ file }) {
    // console.log(val)
    NetService.upload(file).then(x => {
      console.log(x);
    });
    //  document.getElementsByClassName("headPortrait")[0].style.background = 'url(' + val.content + ')';
  }
  onReadTwo(val) {
    this.photoTwo = val.content;
    // console.log(val)
  }
  closeIdentityCard() {
    this.photo = "";
  }
  lookIdentityCard() {
    ImagePreview([this.photo]);
  }
  closeIdentityCardTwo() {
    this.photoTwo = "";
  }
  lookIdentityCardTwo() {
    ImagePreview([this.photoTwo]);
  }
}
</script>
<style lang="less" scoped>
.page.uploadIdPhotoFirst {
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
</style>
<style lang="less">
.page.uploadIdPhotoFirst {
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
  .imgSize.headPortrait.van-uploader {
    display: flex;
    justify-content: center;
  }
}
</style>