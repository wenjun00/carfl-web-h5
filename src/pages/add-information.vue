<template>
  <section class="page addInformation">
    <van-row>
      <!-- <div @click="aaa">123123123123123</div> -->
      <p class="base-info-title">
        <span class="star">*</span>承租人手持身份证照片</p>
      <van-row class="imgList">
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('identityCard',1363)" accept="image/gif, image/jpeg" multiple>
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
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('identityCardTwo',1364)" accept="image/gif, image/jpeg" multiple>
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

        <van-row class="heandClass">
          <van-col>户口本（户主页及个人页</van-col>
        </van-row>
        <van-row class="imgList">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg',1354)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg == ''" name="add" />
              <img width="100%" v-else :src="listImg" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard" v-if="!listImg == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard" v-if="!listImg == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
       <van-row class="heandClass">
          <van-col>结婚证</van-col>
        </van-row>
        <van-row class="imgList imglistTwo">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg2',1355)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg2 == ''" name="add" />
              <img width="100%" v-else :src="listImg2" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard" v-if="!listImg2 == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard" v-if="!listImg2 == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
         <van-row class="heandClass">
          <van-col>收入证明（劳动合同/收入证明</van-col>
        </van-row>
        <van-row class="imgList imglistTwo">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg3',1356)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg3 == ''" name="add" />
              <img width="100%" v-else :src="listImg3" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard" v-if="!listImg3 == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard" v-if="!listImg3 == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
         <van-row class="heandClass">
          <van-col>近6个月银行流水（柜台打印盖章/网银现场查询）</van-col>
        </van-row>
        <van-row class="imgList imglistTwo">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg4',1357)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg4 == ''" name="add" />
              <img width="100%" v-else :src="listImg4" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard" v-if="!listImg4 == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard" v-if="!listImg4 == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
         <van-row class="heandClass">
          <van-col>社保查询（柜台打印盖章/网上现场查询）</van-col>
        </van-row>
        <van-row class="imgList imglistTwo">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg5',1358)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg5 == ''" name="add" />
              <img width="100%" v-else :src="listImg5" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard" v-if="!listImg5 == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard" v-if="!listImg5 == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
         <van-row class="heandClass">
          <van-col>房产证明（房产证/按揭合同/购房合同）</van-col>
        </van-row>
        <van-row class="imgList imglistTwo">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg6',1359)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg6 == ''" name="add" />
              <img width="100%" v-else :src="listImg6" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard" v-if="!listImg6 == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard" v-if="!listImg6 == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
         <van-row class="heandClass">
          <van-col>居住证明（本人/直系亲属姓名的水电费.物业费等单据）</van-col>
        </van-row>
        <van-row class="imgList imglistTwo">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg7',1360)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg7 == ''" name="add" />
              <img width="100%" v-else :src="listImg7" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard" v-if="!listImg7 == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard" v-if="!listImg7 == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
         <van-row class="heandClass">
          <van-col>其他照片资料</van-col>
        </van-row>
        <van-row class="imgList imglistTwo">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg8',1361)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg8 == ''" name="add" />
              <img width="100%" v-else :src="listImg8" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard" v-if="!listImg8 == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard" v-if="!listImg8 == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
      </van-collapse-item>
    </van-collapse>
    <van-button type="primary" bottom-action>确认</van-button>
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
import { State, Mutation, Action } from "vuex-class";
import { NetService } from "~/utils/net.service";
@Component({})
export default class Login extends Vue {
  @Mutation tenantImg
  @State intoA
  private arrImg: any = []
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
  private listImg:string = ''
  private listImg2:string = ''
  private listImg3:string = ''
  private listImg4:string = ''
  private listImg5:string = ''
  private listImg6:string = ''
  private listImg7:string = ''
  private listImg8:string = ''
  

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
  aaa() {
    console.log(this.arrImg)
  }
  /**
   * 手持身份证图片事件
   */
  identityCardFun(val, number) {
    return ({ file }) => {
      NetService.upload(file).then(x => {
        this[val] = x.localUrl
        for (let i in this.arrImg) {
          if (this.arrImg[i].typeName == number) {
            this.arrImg.splice(i, 1)
          }
        }
        this.arrImg.push({
          personalId: x.id,
          uploadName: x.realName,
          materialType: x.type,
          dataSize: x.size,
          materialUrl: x.url,
          uploadTime: x.createTime,
          typeName: number,
        })
      })
    }
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

  mounted() {
    this.arrImg = this.intoA.PersonalAdditional
  }


}
</script>
<style lang="less">
.page.addInformation {
  .heandClass {
    display: flex;
    margin: 10px 0 0 0;
    background-color: #e6e6e6;
    padding: 5px;
  }
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
    margin-bottom: 60px;
  }
}
</style>


