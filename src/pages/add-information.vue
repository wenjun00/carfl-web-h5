<template>
  <section class="page addInformation">
    <van-row>
      <p class="base-info-title">
        <span class="star">*</span>承租人手持身份证照片</p>
      <van-row class="imgList">
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="identityCard == ''" name="add" />
            <img width="100%" v-else :src="identityCard" alt="">
          </van-uploader>
          <van-icon @click="closeIdentityCard" v-if="!identityCard == ''" class="deleteiconHead" name="close" />
          <van-icon @click="lookIdentityCard" v-if="!identityCard == ''" class="lookiconHead" name="password-view" />
        </van-col>
      </van-row>
    </van-row>
    <van-row>
      <p class="base-info-title">
        <span class="star">*</span>承租人手持业务员照片</p>
      <van-row class="imgList">
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardTwoFun" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="identityCardTwo == ''" name="add" />
            <img width="100%" v-else :src="identityCardTwo" alt="">
          </van-uploader>
          <van-icon @click="closeIdentityCardTwo" v-if="!identityCardTwo == ''" class="deleteiconHead" name="close" />
          <van-icon @click="lookIdentityCardTwo" v-if="!identityCardTwo == ''" class="lookiconHead" name="password-view" />
        </van-col>
      </van-row>
    </van-row>
    <van-cell title="追加担保人（选填）" is-link :value="value" @click="pickerDialog=true" />
    <van-collapse v-model="activeNames">
      <van-collapse-item title="追加资料（选填）">
        <van-row v-for="(item,index) in list" :key="index">
          <p class="base-info-title">{{item.title}}</p>
          <van-row class="base-idPhoto">
            <van-col span="12">
              <div class="idPhoto" :ref="item.name">
                <div class="infoContent">{{item.imgLeft}}</div>
                <div class="background">
                  <van-icon v-if="item.ShowHidden" @click="closeList(item.name)" class="deleteicon" name="close" />
                  <van-icon v-if="item.ShowHidden" @click="lookList(item.name)" class="lookicon" name="password-view" />
                </div>
              </div>
            </van-col>
            <van-col span="12">
              <div class="idPhoto line">
                <div class="infoContent" @click="getRef(item.name)">
                  <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple>
                    <van-icon class="vanIcon" name="add" />
                  </van-uploader>
                </div>
              </div>
            </van-col>
          </van-row>
        </van-row>
        <van-button type="primary" bottom-action>确认</van-button>
      </van-collapse-item>
    </van-collapse>
    <transition name="fade">
      <van-picker :columns="columns" v-show="pickerDialog" show-toolbar ref="vanpicker" @change="onChange" @confirm="pickerDialog=false" @cancel="pickerDialog=false" />
    </transition>
    <van-button type="primary" bottom-action>确认并提交</van-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ImagePreview } from 'vant';
@Component({})
export default class Login extends Vue {
  private idName: any = null;
  private idNumber: any = null;
  private value: any = null;
  private activeNames = []; // 当前激活的面板
  private pickerDialog: boolean = false;
  private columns: any = ['本科', '专科', '博士'];
  private type: any;
  private imageName: any = "";
  private identityCard: any = '';  // 手持身份证照片
  private showName: any = ''
  private identityCardTwo: any = '';
  private photo: any = "";

  private list: any = [
    {
      title: "户口本（户主页及个人页）",
      imgLeft: "户口本照片",
      name: "photo1",
      ShowHidden: '',

    },
    {
      title: "结婚证",
      imgLeft: "结婚证照片",
      ShowHidden: '',
      name: "photo2"
    },
    {
      title: "收入证明（劳动合同/收入证明）",
      imgLeft: "收入证明照片",
      ShowHidden: '',
      name: "photo3"
    },
    {
      title: "近6个月银行流水（柜台打印盖章/网银现场查询）",
      imgLeft: "银行流水",
      ShowHidden: '',
      name: "photo4"
    },
    {
      title: "社保查询（柜台打印盖章/网上现场查询）",
      imgLeft: "社保查询",
      ShowHidden: '',
      name: "photo5"
    },
    {
      title: "房产证明（房产证/按揭合同/购房合同）",
      imgLeft: "房产证明",
      ShowHidden: '',
      name: "photo6"
    },
    {
      title: "居住证明（本人/直系亲属姓名的水电费.物业费等单据）",
      imgLeft: "居住证明",
      ShowHidden: '',
      name: "photo7"
    },
    {
      title: "其他照片资料",
      imgLeft: "其他照片",
      ShowHidden: '',
      name: "photo8"
    },
  ]
  getRef(ref) {
    this.photo = this.$refs[ref][0];
    this.showName = ref
  }
  /**
   * 手持身份证图片事件
   */
  identityCardFun(val) {
    this.identityCard = val.content
  }
  // 删除手持身份证图片事件
  closeIdentityCard() {
    this.identityCard = ''
  }
  // 预览手持身份证
  lookIdentityCard() {
    ImagePreview([this.identityCard]);
  }
  closeIdentityCardTwo() {
    this.identityCardTwo = ''
  }
  lookIdentityCardTwo() {
    ImagePreview([this.identityCardTwo]);
  }
  // 删除户口等每个点击的图片
  closeList(ref) {
    this.photo = this.$refs[ref][0];
    this.photo.style.backgroundImage = 'url("")';
    // console.log(ref)
    for (let i in this.list) {
      if (ref == this.list[i].name) {
        this.list[i].ShowHidden = 0
      }
    }
  }
  // 查看户口每个点击的图片
  lookList(ref) {
    this.photo = this.$refs[ref][0];
    let a = this.photo.style.backgroundImage = 'url(' + this.imageName + ')'
    let b = a.substring(4)
    let c = b.substring(0, b.length - 1);
    // console.log(ref)
    ImagePreview([c]);

  }


  identityCardTwoFun(val) {
    this.identityCardTwo = val.content
  }

  /**
   * 页面点击上传图片
   */
  onRead(file) {
    this.imageName = file.content;
    this.photo.style.backgroundImage = 'url(' + this.imageName + ')';
    this.photo.style.left = "12px;"

    for (let i in this.list) {
      if (this.showName == this.list[i].name) {
        this.list[i].ShowHidden = 1
      }
    }

  }
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
}
</script>
<style lang="less">
.page.addInformation {
  .lookicon {
    color: cornflowerblue;
    font-size: 20px;
    position: absolute;
    top: 10px;
    left: 5px;
  }
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
  .imgList {
    text-align: center;
    .imgSize {
      height: 110px;
      border: 1px solid #6666;
      width: 100%;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #e7e7e7;
    }
  }
  .idPhoto.line {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .vanIcon {
    font-size: 40px;
    color: #bebebe;
  }
  .deleteicon {
    color: cornflowerblue;
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 5px;
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
  p {
    margin: 0;
  }
  .idPhoto {
    // width: 180px;
    height: 110px;
    border: 0.1rem solid #e7e7e7;
    margin: 12px;
    position: relative;
    background: #e7e7e7;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #bebebe;
  }
  .star {
    color: #ffe44d;
    font-size: 2rem;
    vertical-align: middle;
    margin-right: 0.2rem;
  }

  .iconfont {
    font-size: 1.5rem;
    margin-top: -0.6rem;
    display: inline-block;
    color: #c9c9c9;
    margin-top: -3px;
    border: 1px solid #e7e7e7;
    background: white;
    width: 25px;
    height: 18px;
    line-height: 18px;
    margin-left: 18px;
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
    border-bottom: 1px solid #e8e8e8;
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
  .idPhoto {
    height: 110px;
    border: 0.1rem solid #e7e7e7;
    margin: 3px;
    position: relative;
    background: #e7e7e7;
    background-repeat: no-repeat;
    background-size: contain;
  }
  // .background {
  //   position: absolute;
  //   border: 1px solid #e7e7e7;
  //   left: 8.4rem;
  //   color: #e7e7e7;
  // }
  .iconfont {
    font-size: 1.5rem;
    margin-top: -0.6rem;
    display: inline-block;
    color: #c9c9c9;
    margin-top: -3px;
    border: 1px solid #e7e7e7;
    background: white;
    width: 25px;
    height: 18px;
    line-height: 18px;
    margin-left: 2px;
    box-sizing: border-box;
  }
  .line {
    border: 1px dashed #bababa;
  }
  .add {
    font-size: 50px;
    background: transparent;
    margin-left: 8px;
  }
  .van-collapse-item__content {
    padding: 0;
    margin-bottom: 50px;
  }
}
</style>


