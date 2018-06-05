<template>
  <section class="page uploadIdPhotoThree">
    <van-row>
      <van-steps :active="2" active-color="#FFE44D">
        <van-step>身份证信息</van-step>
        <van-step>驾驶证信息</van-step>
        <van-step>银行卡信息</van-step>
      </van-steps>
    </van-row>
    <p class="base-info-title">请上传承租人银行卡照片</p>
    <van-row>
      <!-- <van-row class="photo_container">
        <van-col class="photo_content">
          <img src="../assets/img/bankcard1.png" style="width:180px;height:110px">
        </van-col>
        <van-col  class="photo_content">
          <img src="../assets/img/bankcard2.png" style="width:180px;height:110px">
        </van-col>
      </van-row> -->
      <van-row class="imgList">
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="onRead" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="photo == ''" name="add" />
            <img height="100%" width="100%" v-else :src="photo" alt="">
          </van-uploader>
        </van-col>
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="onReadTwo" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="photoTwo == ''" name="add" />
            <img height="100%" width="100%" v-else :src="photoTwo" alt="">
          </van-uploader>
        </van-col>
      </van-row>
      <van-row style="text-align: center">
        <van-col span="12" style="font-size:14px">银行卡正面</van-col>
        <van-col span="12" style="font-size:14px">银行卡反面</van-col>
      </van-row>
    </van-row>
    <van-row>
      <p class="base-info-title">请确认银行卡信息是否一致</p>
      <van-cell-group>
        <van-cell title="开户银行" is-link :value="value" @click="pickerDialog=true;choose(1)" required/>
        <van-field placeholder="请输入开户卡号" v-model="idName" label="银行卡号" required/>
        <van-field v-model="idNumber" label="预留手机号" placeholder="请输入预留手机号" required/>
      </van-cell-group>
    </van-row>
    <transition name="fade">
      <van-picker :columns="columns" v-show="pickerDialog" show-toolbar ref="vanpicker" @change="onChange" @confirm="pickerDialog=false" @cancel="pickerDialog=false" />
    </transition>
    <van-button type="primary" bottom-action @click="$router.push('/custom-information')">下一步</van-button>
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
  private photo: any = "";
  private photoTwo: any = ''

  private pickerDialog: boolean = false;
  private columns: any = ['本科', '专科', '博士'];
  private type: any;
  choose(type) {
    if (type === 1) {
      this.columns = ["未婚", "已婚", "丧偶", "离婚"];
    } else {
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

}
</script>
<style lang="less" scoped>
.page.uploadIdPhotoThree {
  .vanIcon {
    font-size: 40px;
    line-height: 150px;
  }
  .imgList {
    text-align: center;
    display: flex;
    justify-content: center;
    .imgSize {
      height: 150px;
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
.page.uploadIdPhotoThree {
  .van-picker {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 100;
  }
  .van-step--horizontal.van-step--finish .van-step__circle,
  .van-step--horizontal.van-step--finish .van-step__line {
    background-color: #ffe44d;
  }
  .van-step__title {
    color: #ffe44d;
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
  
}
</style>
