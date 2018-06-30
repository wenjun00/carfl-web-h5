<template>
  <section class="page uploadIdPhotoThree">
    <van-cell title="选择城市" required is-link :value="[IntoACity.id] | cityConvert " @click="optionCity=true" />
    <van-row>
      <van-steps :active="2" active-color="#FFE44D">
        <van-step>身份证信息</van-step>
        <van-step>驾驶证信息</van-step>
        <van-step>银行卡信息</van-step>
      </van-steps>
    </van-row>
    <p class="base-info-title">请上传承租人银行卡照片
      <router-link to="/support-bank">
        <span class="supportBank">支持银行</span>
      </router-link>
    </p>
    <van-row>
      <van-row class="imgList">
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="onRead" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="photo == ''" name="add" />
            <img height="100%" v-else :src="photo" alt="">
          </van-uploader>
          <van-icon @click="closeIdentityCard('photo',1373)" v-if="!photo == ''" class="deleteiconHead" name="close" />
          <van-icon @click="lookIdentityCard('photo')" v-if="!photo == ''" class="lookiconHead" name="password-view" />
        </van-col>
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="onReadTwo" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="photoTwo == ''" name="add" />
            <img height="100%" v-else :src="photoTwo" alt="">
          </van-uploader>
          <van-icon @click="closeIdentityCard('photoTwo',1374)" v-if="!photoTwo == ''" class="deleteiconHead" name="close" />
          <van-icon @click="lookIdentityCard('photoTwo')" v-if="!photoTwo == ''" class="lookiconHead" name="password-view" />
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
        <van-cell title="开户银行" required is-link :value="personalBank.depositBank" @click="pickerDialog=true" />

        <van-field name="center" placeholder="请输入开户卡号" v-model="personalBank.card_number" label="银行卡号" required/>

        <van-cell title="开户地址" required is-link :value="province+city" @click="$refs['cityPicker'].show()" />
        <polis-Picker required ref="cityPicker" @on-confirm="onCityPickerConfirm"></polis-picker>

        <van-field name="center" maxlength="11" v-model="personalBank.reserved_phone_number" label="预留手机号" placeholder="请输入预留手机号" required/>
      </van-cell-group>
    </van-row>
    <!-- 开户银行 -->
    <transition name="fade">
      <van-picker :columns="columns" v-show="pickerDialog" show-toolbar ref="vanpicker" @confirm="onConfirm" @cancel="pickerDialog=false" />
    </transition>
    <!-- 选择下单城市 -->
    <transition name="fade">
      <van-area :area-list="cityTop" v-show="optionCity" show-toolbar @confirm="onConfirmTwo" @cancel="optionCity=false" :columns-num="2" />
    </transition>

    <van-button type="primary" class="nextStepSty" bottom-action @click="addAffirm">下一步</van-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ImagePreview } from "vant";
import { State, Mutation, Action } from "vuex-class";
import { NetService } from "~/utils/net.service";
import CityPicker from "~/components/common/city-picker.vue";
import { elementAt } from "rxjs/operators";
import { ProductOrderService } from "~/services/manage-service/product-order.service";
import { FddApiService } from "~/services/manage-service/fdd-api.service";
import { Dependencies } from "~/core/decorator";
import PolisPicker from "~/components/common/polis-picker.vue";
import { FilterService } from '~/utils/filter.service'
@Component({
  components: {
    CityPicker,
    PolisPicker
  }
})
export default class Login extends Vue {
  @Dependencies(ProductOrderService)
  private productOrderService: ProductOrderService;
  @Dependencies(FddApiService) private fddApiService: FddApiService;
  private idName: any = null;
  private arrAll: any = [];
  private idNumber: any = null;
  private value: any = null;
  private photo: any = "";
  private photoTwo: any = "";
  private pickerDialog: boolean = false;
  private columns: any = [];
  private type: any;
  // private depositBank: string = "";
  private personalBank: any = {
    reserved_phone_number: "", //预留手机号
    deposit_bank: "", // 开户银行
    card_number: "", // 银行卡号
    location: "", // 开户地区汉字
    locationProvince: "", // 开户省 id
    locationCity: "" ,// 开户市 id
    depositBank:"", // 开户银行
  };
  private optionCity: boolean = false; // 城市选择弹窗
  // 顶部下拉数据
  private cityTop = {
    province_list: {
      110000: '河南',
      120000: '广西',
    },
    city_list: {
      110100: '郑州',
      120100: '南宁',
    },
    county_list: {
      110101: '东城区',
    }
  }
  /***
   * 选择下单城市确定事件
   */
  //  顶部城市点击事件
  onConfirmTwo(val) {
    if (val[0].code == 110000) {
      let catyAll = {
        id: 902,
        pid: 734,
      }
      this.selectCity(catyAll)

    } else {
      let catyAll = {
        id: 3125,
        pid: 3021,
      }
      this.selectCity(catyAll)
    }
    this.optionCity = false
  }
  // 选择银行户籍点击确定 
  private onCityPickerConfirm(currentCitys) {
    this.personalBank.locationProvince = currentCitys[0];
    this.personalBank.locationCity = currentCitys[1];
    this.personalBank.location = currentCitys;
  }
   get province(){
     return FilterService.polisConvertTwo(this.personalBank.location)
   }
   get city(){
     return FilterService.polisConvert(this.personalBank.location)
   }

  /**
   * 四要素判断
   */
  // elementsValidation() {
  //   let fourElements = {
  //     customerName: this.intoA.personal.name,  // 客户姓名
  //     idCard: this.intoA.personal.id_card,        // 身份证号
  //     bankNo: this.personalBank.card_number,        // 银行卡号
  //     mobile:this.personalBank.reserved_phone_number,        // 电话号码
  //   }
  //   this.fddApiService.getInvokeFourElementVerify(fourElements).subscribe(
  //     data => {
  //       console.log('看这里')
  //     },
  //     err => {
  //       console.log('错误这里')
  //       this.$toast(err.msg)
  //     }
  //   )
  // }

  /**
   * 点击下一步
   */
  addAffirm() {
    let arr = [];
    for (let i in this.arrAll) {
      arr.push(this.arrAll[i].typeName);
    }
    if (arr.indexOf(1373) < 0) {
      this.$toast("请上传银行卡正面信息");
      return;
    }
    if (arr.indexOf(1374) < 0) {
      this.$toast("请上传银行卡负面信息");
      return;
    }
    if (!this.IntoACity) {
      this.$toast("请选择城市");
      return;
    }
    this.$validator.validate(this.personalBank, this.rules).then(error => {
      if (!error) {
        this.$router.push("/custom-information");
        this.bankCard(this.personalBank);
      } else {
        this.$toast(error);
      }
    });
  }

  /**
   * 点击开户银行
   */

  private onConfirm(val) {
    this.personalBank.deposit_bank = val.bankCode;
    this.personalBank.depositBank = val.bankName;
    this.pickerDialog = false;
  }
  /***
   * 获取开户银行
   */
  getOredrMessage() {
    this.productOrderService.getBankCodeList().subscribe(
      data => {
        this.columns = data.map(v => {
          return Object.assign({ text: v.bankName }, v);
        });
      },
      err => this.$toast(err.msg)
    );
  }

  mounted() {
    this.getOredrMessage();
    if(!!this.intoA.personalBank){
       this.personalBank = this.intoA.personalBank

       for(let i of this.intoA.PersonalAdditional){
          if(i.typeName === 1373){
              this.photo = i.materialUrl
          }
          if(i.typeName === 1374){
             this.photoTwo = i.materialUrl
          }
       }
      
    }

    let els: any = document.getElementsByName("center");
    els.forEach(v => {
      v.onclick = () => {
        setTimeout(() => {
          (v as HTMLElement).scrollIntoView(true);
        }, 300);
      };
    });

    this.arrAll = this.intoA.PersonalAdditional;
  }

  @Mutation bankCard;
  @Mutation tenantImg;
  @State intoA;
  @Mutation selectCity;
  @State IntoACity;

  // 验证规则
  private rules = {
    deposit_bank: { required: true, message: "请选择开户银行" },
    card_number: [
      { required: true, message: "请输入正确的银行卡号" },
      { validator: this.$validator.bankNumber }
    ],
    reserved_phone_number: [
      { required: true, message: "请输入正确的手机号" },
      { validator: this.$validator.phoneNumber }
    ],
    location: { required: true, message: "请选择开户地址" }
  };

  /**
   * 图片上传
   */
  onRead({ file }) {
    NetService.upload(file).then(x => {
      this.photo = x.url;
      for (let i in this.arrAll) {
        if (this.arrAll[i].typeName == 1373) {
          this.arrAll.splice(i, 1);
        }
      }
      this.arrAll.push({
        uploadName: x.realName,
        materialType: x.type,
        dataSize: x.size,
        materialUrl: x.url,
        uploadTime: x.createTime,
        typeName: 1373
      });
    });
  }
  onReadTwo({ file }) {
    NetService.upload(file).then(x => {
      this.photoTwo = x.url;
      for (let i in this.arrAll) {
        if (this.arrAll[i].typeName == 1374) {
          this.arrAll.splice(i, 1);
        }
      }
      this.arrAll.push({
        // personalId: x.id,
        uploadName: x.realName,
        materialType: x.type,
        dataSize: x.size,
        materialUrl: x.url,
        uploadTime: x.createTime,
        typeName: 1374
      });
    });
  }
  /**
   * 图片删除
   */
  closeIdentityCard(val, number) {
    this[val] = "";
    for (let i in this.arrAll) {
      if (this.arrAll[i].typeName == number) {
        this.arrAll.splice(i, 1);
      }
    }
  }

  /**
   * 图片预览
   */
  lookIdentityCard(val) {
    ImagePreview([this[val]]);
  }
}
</script>
<style lang="less" scoped>
.page.uploadIdPhotoThree {
  .van-picker {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 100;
  }
  .nextStepSty {
    margin-top: 30px;
  }
  .supportBank {
    color: #ffdd44;
    font-weight: 600;
    float: right;
    padding-right: 12px;
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
  .headPortrait {
    display: flex;
    align-items: center;
    padding: 5px;
    box-sizing: border-box;
    overflow: hidden;
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
    height: 120px;
    .imgSize {
      height: 110px;
      border: 1px solid #6666;
      width: 90%;
      margin-top: 10px;
      background: #e7e7e7;
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
  }
  .imgSize.headPortrait.van-uploader {
    display: flex;
    justify-content: center;
  }
  .van-field__control {
    text-align: right;
    padding-left: 24px;
    box-sizing: border-box;
  }
}
</style>
