<template>
  <section class="page addInformation">
    <van-row v-for="(item,index) in list" :key="index">
      <p class="base-info-title">{{item.title}}</p>
      <van-row>
        <van-col span="12">
          <div class="idPhoto" :ref="item.name">
            <div class="infoContent">{{item.imgLeft}}</div>
            <div class="background">
              <i class="icon iconfont icon-jianhaob"></i>            
            </div>
          </div>
        </van-col>
        <van-col  span="12">
          <div class="idPhoto line" >
            <div class="infoContent"  @click="getRef(item.name)">
              <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple>
                <van-icon  class="icon iconfont icon-jiahao add"/>
              </van-uploader>
            </div>
          </div>
        </van-col>
      </van-row>
    </van-row>  
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
  private backgroundImage:any={};
  private imageName:any="";
  private photo:any ="";
  private list:any = [
    {
      title:"户口本（户主页及个人页）",
      imgLeft:"户口本照片",
      name:"photo1"

    },
    {
      title:"结婚证",
      imgLeft:"结婚证照片",
      name:"photo2"
    },
    {
      title:"收入证明（劳动合同/收入证明）",
      imgLeft:"收入证明照片",
      name:"photo3"
    },
    {
      title:"近6个月银行流水（柜台打印盖章/网银现场查询）",
      imgLeft:"银行流水",
      name:"photo4"
    },
    {
      title:"社保查询（柜台打印盖章/网上现场查询）",
      imgLeft:"社保查询",
      name:"photo5"
    },
    {
      title:"房产证明（房产证/按揭合同/购房合同）",
      imgLeft:"房产证明",
      name:"photo6"
    },
    {
      title:"居住证明（本人/直系亲属姓名的水电费.物业费等单据）",
      imgLeft:"居住证明",
      name:"photo7"
    },
    {
      title:"其他照片资料",
      imgLeft:"其他照片",
      name:"photo8"
    },
  ]
  getRef(ref){
    this.photo = this.$refs[ref][0];
    console.log(this.photo,22)
  }
  onRead(file){
    this.imageName=file.content;
     console.log(file,22)
    this.photo.style.backgroundImage = 'url(' + this.imageName + ')';
    this.photo.style.left= "12px;"

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
    height:110px;
    border: 0.1rem solid #E7E7E7;
    margin: 12px;
    position: relative;
    background:#E7E7E7;
    background-repeat: no-repeat;
    background-size: contain;
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
    margin-left: 2px;
    box-sizing: border-box;
 }
 .infoContent{
  position: absolute;
  left: 30%;
  top: 40%;
  color: #BEBEBE;
 }
 .line{
   border:1px dashed #BABABA;
 }
 .add{
    font-size: 50px;
    background: transparent;
    margin-left: 8px;
  }
</style>
