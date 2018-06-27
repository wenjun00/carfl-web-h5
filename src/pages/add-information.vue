<template>
  <section class="page addInformation">
    <van-row>
      <p class="base-info-title">
        <span class="star">*</span>承租人手持身份证照片</p>
      <van-row class="imgList">
        <van-col span="11">
          <van-uploader class="imgSize imglistTwo headPortrait" result-type="dataUrl" :after-read="identityCardFun('identityCard',1363)" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="identityCard == ''" name="add" />
            <img height="100%" v-else :src="identityCard" alt="">
          </van-uploader>
          <van-icon @click="closeIdentityCard('identityCard',1363)" v-if="!identityCard == ''" class="deleteiconHead" name="close" />
          <van-icon @click="lookIdentityCard('identityCard')" v-if="!identityCard == ''" class="lookiconHead" name="password-view" />
        </van-col>
      </van-row>
    </van-row>
    <van-row>
      <p class="base-info-title">
        <span class="star">*</span>承租人手持业务员照片</p>
      <van-row class="imgList">
        <van-col span="11">
          <van-uploader class="imgSize imglistTwo headPortrait" result-type="dataUrl" :after-read="identityCardFun('identityCardTwo',1364)" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="identityCardTwo == ''" name="add" />
            <img height="100%" v-else :src="identityCardTwo" alt="">
          </van-uploader>
          <van-icon @click="closeIdentityCard('identityCardTwo',1364)" v-if="!identityCardTwo == ''" class="deleteiconHead" name="close" />
          <van-icon @click="lookIdentityCard('identityCardTwo')" v-if="!identityCardTwo == ''" class="lookiconHead" name="password-view" />
        </van-col>
      </van-row>
    </van-row>
    <!-- <van-field class="suretyClass" v-model="surety" label="追加担保人（选填）" placeholder="请选择追加担保人" @click="suretyBot=true" /> -->
    <!-- 追加担保人 -->
    <!-- <transition name="fade">
      <van-picker :columns="suretys" v-show="suretyBot" show-toolbar ref="vanpicker" @confirm="suretyfirm" @cancel="suretyBot=false" />
    </transition> -->
    <van-collapse v-model="activeNames">
      <van-collapse-item title="追加资料（选填）">
        <van-row class="heandClass ">
          <van-col>户口本（户主页及个人页）</van-col>
        </van-row>
        <van-row class="imgList">
          <van-col span="11">
            <van-uploader class="imgSize imglistTwo headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg',1354)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg == ''" name="add" />
              <img height="100%" v-else :src="listImg" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard('listImg',1345)" v-if="!listImg == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard('listImg')" v-if="!listImg == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
        <van-row class="heandClass">
          <van-col>结婚证</van-col>
        </van-row>
        <van-row class="imgList imglistTwo">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg2',1355)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg2 == ''" name="add" />
              <img height="100%" v-else :src="listImg2" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard('listImg2',1355)" v-if="!listImg2 == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard('listImg2')" v-if="!listImg2 == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
        <van-row class="heandClass">
          <van-col>收入证明（劳动合同/收入证明）</van-col>
        </van-row>
        <van-row class="imgList imglistTwo">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg3',1356)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg3 == ''" name="add" />
              <img height="100%" v-else :src="listImg3" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard('listImg3',1356)" v-if="!listImg3 == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard('listImg3')" v-if="!listImg3 == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
        <van-row class="heandClass">
          <van-col>近6个月银行流水（柜台打印盖章/网银现场查询）</van-col>
        </van-row>
        <van-row class="imgList imglistTwo">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg4',1357)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg4 == ''" name="add" />
              <img height="100%" v-else :src="listImg4" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard('listImg4',1357)" v-if="!listImg4 == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard('listImg4')" v-if="!listImg4 == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
        <van-row class="heandClass">
          <van-col>社保查询（柜台打印盖章/网上现场查询）</van-col>
        </van-row>
        <van-row class="imgList imglistTwo">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg5',1358)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg5 == ''" name="add" />
              <img height="100%" v-else :src="listImg5" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard('listImg5',1358)" v-if="!listImg5 == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard('listImg5')" v-if="!listImg5 == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
        <van-row class="heandClass">
          <van-col>房产证明（房产证/按揭合同/购房合同）</van-col>
        </van-row>
        <van-row class="imgList imglistTwo">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg6',1359)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg6 == ''" name="add" />
              <img height="100%" v-else :src="listImg6" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard('listImg6',1359)" v-if="!listImg6 == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard('listImg6')" v-if="!listImg6 == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
        <van-row class="heandClass">
          <van-col>居住证明（本人/直系亲属姓名的水电费.物业费等单据）</van-col>
        </van-row>
        <van-row class="imgList imglistTwo">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg7',1360)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg7 == ''" name="add" />
              <img height="100%" v-else :src="listImg7" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard('listImg7',1360)" v-if="!listImg7 == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard('listImg7')" v-if="!listImg7 == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
        <van-row class="heandClass">
          <van-col>其他照片资料</van-col>
        </van-row>
        <van-row class="imgList imglistTwo">
          <van-col span="11">
            <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="identityCardFun('listImg8',1361)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="listImg8 == ''" name="add" />
              <img height="100%" v-else :src="listImg8" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard('listImg8',1361)" v-if="!listImg8 == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard('listImg8')" v-if="!listImg8 == ''" class="lookiconHead" name="password-view" />
          </van-col>
        </van-row>
      </van-collapse-item>
    </van-collapse>
    <transition name="fade">
      <van-picker :columns="columns" v-show="pickerDialog" show-toolbar ref="vanpicker" @confirm="pickerDialog=false" @cancel="pickerDialog=false" />
    </transition>
    <van-button @click="IntoASubmit" type="primary" bottom-action>确认并提交</van-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ImagePreview } from 'vant';
import { State, Mutation, Action } from "vuex-class";
import { NetService } from "~/utils/net.service";
import { ProductOrderService } from "~/services/manage-service/product-order.service";
import { Dependencies } from "~/core/decorator";
import { LoginService } from "~/services/manage-service/applogin.service";
import { AppCustomerService } from "~/services/manage-service/app-customer.service";
@Component({})
export default class Login extends Vue {
  @Dependencies(ProductOrderService) private productOrderService: ProductOrderService;
  @Dependencies(AppCustomerService) private appCustomerService: AppCustomerService;
  @Dependencies(LoginService) private loginService: LoginService;
  @Mutation tenantImg
  @Mutation clearIntoA
  @State intoA
  @Mutation selectCity
  @State IntoACity
  @Mutation updateUserOrder
  @State orderInfo
  @State userToken
  @State userData


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
  private listImg: string = ''
  private listImg2: string = ''
  private listImg3: string = ''
  private listImg4: string = ''
  private listImg5: string = ''
  private listImg6: string = ''
  private listImg7: string = ''
  private listImg8: string = ''
  private suretyBot: boolean = false
  private suretys: any = []
  private personalAll: any = {}
  private clientType: any = ''


  /**
   * 进件点击确认提交
   */
  IntoASubmit() {

    let arr = []
    for (let i in this.arrImg) {
      arr.push(this.arrImg[i].typeName)
    }
    if (arr.indexOf(1363) < 0) {
      this.$toast('请上传承租人手持身份证照片')
      return
    }
    if (arr.indexOf(1364) < 0) {
      this.$toast('请上传承租人手持业务员照片')
      return
    }

    //  personal类
    //  （证件页面）idcard
    this.personalAll = {
      ///
      city: this.IntoACity.id,
      province:this.IntoACity.pid,
      productResultId: this.intoA.orderCarTwo.productResultId,
      productId: this.intoA.orderCarTwo.productId,
      initialPayment: this.intoA.orderCarTwo.initialPayment,
      finalCash: this.intoA.orderCarTwo.finalCash,
      financingAmount: this.intoA.orderCarTwo.financingAmount,
      monthlySupply: this.intoA.orderCarTwo.monthlySupply,
      periods: this.intoA.orderCarTwo.periods,
      personal: {
        // driverModel: null, 
        // driverNo: null,        
        // driverTerm:null,
        // idCardAddressDetail:null,
        certificateType:1167,
        headPhoto: this.intoA.personal.headPhoto, // 身份证头像地址
        nationalPhoto: this.intoA.personal.nationalPhoto,  // 身份证国徽地址
        driverPhoto: this.intoA.personalCar.driverPhoto,    // 驾驶证正面
        driverVicePhoto: this.intoA.personalCar.driverVicePhoto,    // 驾驶证副页
        name: this.intoA.personal.name,    //证件姓名
        idCard: this.intoA.personal.id_card,  //证件号码
        nation: this.intoA.personal.nation,   // 民族
        province: this.intoA.personal.province,  // 户籍信息省市
        city: this.intoA.personal.city,       // 户籍信息城市
        district:this.intoA.personal.district, // 户籍信息区
        idCardTerm: this.intoA.personal.id_card_validity_period_section, // 有效期限
        mobileMain: this.intoA.PersonalJob.phone,
        mobileMinor: this.intoA.PersonalJob.contactPhone,
        marital: this.intoA.PersonalJob.marital,    // 婚姻状况
        education: this.intoA.PersonalJob.education,    // 学历信息
        livingSituation: this.intoA.PersonalJob.situation,    // 居住情况
        livingUsefulTime: this.intoA.PersonalJob.agelimit,    // 居住年限
        province1: this.intoA.PersonalJob.province1,    // 居住地区 省
        city1: this.intoA.PersonalJob.city1,    // 居住地区 市
        district1: this.intoA.PersonalJob.district1,    // 居住地区 区
        localHomeAddrDetail: this.intoA.PersonalJob.address,    // 居住地址
        usefulTime: this.intoA.personalCar.useful_time,    // 有效期限
        fileNumber: this.intoA.personalCar.file_number,    // 档案编号
        drivingLicense: this.intoA.personalCar.driving_license,  // 准驾车型
        personalBank: {
          depositProvince: this.intoA.personalBank.locationProvince, // 银行开户省份
          depositCity: this.intoA.personalBank.locationCity,    // 银行开户市
          depositBank: this.intoA.personalBank.deposit_bank,    // 开户银行
          cardNumber: this.intoA.personalBank.card_number,    // 银行卡号
          reservedPhoneNumber: this.intoA.personalBank.reserved_phone_number,    // 预留手机号
        },
        personalJob: {
          jobType: this.intoA.PersonalJob.working,     //还是工作情况
          workingCondition: this.intoA.PersonalJob.working,    // 工作情况
          companyName: this.intoA.PersonalJob.companyName,    // 单位名称
          companyNature: this.intoA.PersonalJob.natureUnit,    // 单位性质
          companyhostAddr: this.intoA.PersonalJob.companyAdress,    // 单位地址
          companyPhone: this.intoA.PersonalJob.companyPhone,    // 单位电话
          workingYears: this.intoA.PersonalJob.yearsWorking,    // 工作年限
          basicSalary: Number(this.intoA.PersonalJob.afterSalary),    // 税后月薪
          // companyhostAddr: null,        
          // jobType: null,                             
          // localHomeAddrDetail: null,     
        },
      },

      orderCar: {
        brandName: this.intoA.orderCar.brandName,
        interiorColor: this.intoA.orderCar.interiorColor,
        modelName: this.intoA.orderCar.modelName,
        seriesName: this.intoA.orderCar.seriesName,
        vehicleColor: this.intoA.orderCar.vehicleColor,
        vehicleId:this.intoA.orderCar.vehicleId,
      },
      personalContacts: [
        {
          relation: this.intoA.PersonalContact.relation,    // 承租人关系
          name: this.intoA.PersonalContact.username,    // 联系人姓名
          phone: this.intoA.PersonalContact.phone    // 联系人姓名
        }, {
          relation: this.intoA.PersonalContact.relationTwo,    // 承租人关系
          name: this.intoA.PersonalContact.usernameTwo,    // 联系人姓名
          phone: this.intoA.PersonalContact.phoneTwo    // 联系人姓名
        }
      ],
    }

    this.personalAll.personalAdditionals = this.intoA.PersonalAdditional
    // this.personalAll.orderCar = this.intoA.orderCar
    this.productOrderService.createOrder(this.personalAll).subscribe(
      data => {
        this.clearIntoA()
        //调用登陆接口获取订单信息
        // this.$toast('数据正在审核中，请稍后请重新登陆')
        this.$toast("提交成功")
        this.$router.push({
          name: 'Home',
        })
        this.getLogoIndent()
      },
      err => {
        this.$toast(err.msg)
      }

    )
  }

  // 进件成功后,查询订单号
  getLogoIndent() {
    let userAll = {
      token: this.userToken
    }

    this.loginService.getOrderNoByToken(userAll).subscribe(
      data => {
        console.log(data)
        this.updateUserOrder(data)
      },
      err => this.$toast(err.msg)
    )
  }

  /**
   * 手持身份证图片事件
   */
  identityCardFun(val, number) {
    return ({ file }) => {
      NetService.upload(file).then(x => {
        this[val] = x.url
        for (let i in this.arrImg) {
          if (this.arrImg[i].typeName == number) {
            this.arrImg.splice(i, 1)
          }
        }
        this.arrImg.push({
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

  // 点击追加担保人确定事件
  suretyfirm() { }


  /**
   * 图片删除
   */
  closeIdentityCard(val, number) {
    this[val] = ''
    for (let i in this.arrImg) {
      if (this.arrImg[i].typeName == number) {
        this.arrImg.splice(i, 1)
      }
    }

  }
  /**
   * 图片预览
   */
  lookIdentityCard(val) {
    ImagePreview([this[val]]);
  }




  mounted() {
    this.arrImg = this.intoA.PersonalAdditional
   
  }


}
</script>
<style lang="less">
.page.addInformation {
  .headPortrait {
    display: flex;
    align-items: center;
    padding: 5px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .imglistTwo {
    margin-left: 15px;
  }
  .van-cell__title {
    max-width: 100%;
  }
  .heandClass {
    display: flex;
    margin: 10px 0 0 0;
    background-color: #e6e6e6;
    padding: 5px;
    font-size: 14px;
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
    left: -55px;
    color: cornflowerblue;
    font-size: 25px;
  }
  .deleteiconHead {
    position: relative;
    top: -105px;
    left: 80px;
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
    width: 100%;
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
  // .van-button--bottom-action.van-button--primary {
  //   background-color: #ffe44d;
  //   position: fixed;
  //   bottom: 0rem;
  // }
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


