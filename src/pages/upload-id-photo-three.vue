<template>
  <section class="page uploadIdPhotoThree">
    <van-cell title="选择城市" required is-link :value="IntoACity | cityConvert " @click="optionCity=true" />
    <van-row>
      <van-steps :active="2" active-color="#FFE44D">
        <van-step>身份证信息</van-step>
        <van-step>驾驶证信息</van-step>
        <van-step>银行卡信息</van-step>
      </van-steps>
    </van-row>
    <p class="base-info-title">请上传承租人银行卡照片</p>
    <van-row>
      <van-row class="imgList">
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="onRead" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="photo == ''" name="add" />
            <img width="100%" v-else :src="photo" alt="">
          </van-uploader>
          <van-icon @click="closeIdentityCard('photo',1373)" v-if="!photo == ''" class="deleteiconHead" name="close" />
          <van-icon @click="lookIdentityCard('photo')" v-if="!photo == ''" class="lookiconHead" name="password-view" />
        </van-col>
        <van-col span="11">
          <van-uploader class="imgSize headPortrait" result-type="dataUrl" :after-read="onReadTwo" accept="image/gif, image/jpeg" multiple>
            <van-icon class="vanIcon" v-if="photoTwo == ''" name="add" />
            <img width="100%" v-else :src="photoTwo" alt="">
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
        <!-- <van-field v-model="depositBank" required label="开户银行" placeholder="请选择准开户银行" @click="pickerDialog=true" /> -->
         <van-cell title="开户银行" required is-link :value="depositBank" @click="pickerDialog=true" />

        <van-field placeholder="请输入开户卡号" v-model="personalBank.card_number" label="银行卡号" required/>

        <van-cell title="银行开户所在地" required is-link :value="personalBank.location | cityConvert " @click="$refs['cityPicker'].show()" />
        <city-picker required ref="cityPicker" @on-confirm="onCityPickerConfirm"></city-picker>

        <van-field v-model="personalBank.reserved_phone_number" label="预留手机号" placeholder="请输入预留手机号" required/>
      </van-cell-group>
    </van-row>
    <transition name="fade">
      <van-picker :columns="columns" v-show="pickerDialog" show-toolbar ref="vanpicker" @confirm="onConfirm" @cancel="pickerDialog=false" />
    </transition>
    <!-- 选择下单城市 -->
    <transition name="fade">
      <van-picker :columns="columnsTwo" v-show="optionCity" show-toolbar @confirm="onConfirmTwo" @cancel="optionCity=false" />
    </transition>

    <van-button type="primary" bottom-action @click="addAffirm">下一步</van-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ImagePreview } from 'vant';
import { State, Mutation, Action } from "vuex-class";
import { NetService } from "~/utils/net.service";
import CityPicker from "~/components/common/city-picker.vue";
import { elementAt } from "rxjs/operators";
import { String } from "core-js";
@Component({
  components: {
    CityPicker,
  }

})
export default class Login extends Vue {

  private idName: any = null;
  private arrAll: any = []
  private idNumber: any = null;
  private value: any = null;
  private photo: any = "";
  private photoTwo: any = ''
  private pickerDialog: boolean = false;
  private columns: any = [];
  private type: any;
  private depositBank: string = ""
  private personalBank: any = {
    reserved_phone_number: '',  //预留手机号
    deposit_bank: '',   // 开户银行
    card_number: '',    // 银行卡号
    location: '',        // 开户地区汉子
    locationProvince: '',  // 开户省 id
    locationCity: '',      // 开户市 id
  }
  private optionCity: boolean = false;     // 城市选择弹窗
  private columnsTwo: any = [
    {
      text: '郑州',
      val: '902'
    }, {
      text: '南宁',
      val: '3125'
    }
  ];
  /***
  * 选择下单城市确定事件
  */
  private onConfirmTwo(val) {
    this.selectCity([Number(val.val)])
    //  console.log(this.IntoACity)
    this.optionCity = false
  }
  // 选择银行户籍点击确定
  private onCityPickerConfirm(currentCitys) {

    this.personalBank.locationProvince = currentCitys[0]
    this.personalBank.locationCity = currentCitys[1]
    this.personalBank.location = currentCitys

  }

  /**
   * 点击下一步
   */
  addAffirm() {
    // console.log(this.arrAll)
    let arr = []
    for (let i in this.arrAll) {
      arr.push(this.arrAll[i].typeName)
    }
    if (arr.indexOf(1373) < 0) {
      this.$toast('请上传银行卡正面信息');
      return
    }
    if (arr.indexOf(1374) < 0) {
      this.$toast('请上传银行卡负面信息');
      return
    }
    if (!this.IntoACity) {
      this.$toast('请选择城市');
      return
    }
    this.$validator.validate(this.personalBank, this.rules).then(error => {
      if (!error) {
        this.$router.push('/custom-information')
        this.bankCard(this.personalBank)

      } else {
        this.$toast(error);
      }
    });
  }


  /**
   * 点击开户银行
   */

  private onConfirm(val) {
    this.personalBank.deposit_bank = val.value
    this.depositBank = this.$dict.getDictName(this.personalBank.deposit_bank)
    console.log(this.personalBank.deposit_bank)

    this.pickerDialog = false
  }

  mounted() {
    this.arrAll = this.intoA.PersonalAdditional
    this.columns = this.$dict.getDictData('0456').map(v => {
      return Object.assign({ text: v.label }, v)
    })
  }

  @Mutation bankCard
  @Mutation tenantImg
  @State intoA
  @Mutation selectCity
  @State IntoACity

  // 验证规则
  private rules = {
    deposit_bank: { required: true, message: '请选择开户银行' },
    card_number: [{ required: true, message: "请输入正确的银行卡号" }, { validator: this.$validator.bankNumber }],
    reserved_phone_number: [{ required: true, message: "请输入正确的手机号" }, { validator: this.$validator.phoneNumber }],

  };



  /**
* 图片上传
*/
  onRead({ file }) {
    NetService.upload(file).then(x => {
      this.photo = x.localUrl
      for (let i in this.arrAll) {
        if (this.arrAll[i].typeName == 1373) {
          this.arrAll.splice(i, 1)
        }
      }
      this.arrAll.push({
        uploadName: x.realName,
        materialType: x.type,
        dataSize: x.size,
        materialUrl: x.url,
        uploadTime: x.createTime,
        typeName: 1373,
      })
    });
  }
  onReadTwo({ file }) {
    NetService.upload(file).then(x => {
      this.photoTwo = x.localUrl
      for (let i in this.arrAll) {
        if (this.arrAll[i].typeName == 1374) {
          this.arrAll.splice(i, 1)
        }
      }
      this.arrAll.push({
        // personalId: x.id,
        uploadName: x.realName,
        materialType: x.type,
        dataSize: x.size,
        materialUrl: x.url,
        uploadTime: x.createTime,
        typeName: 1374,
      })

    });
  }
  /**
 * 图片删除
 */
  closeIdentityCard(val, number) {
    this[val] = ''
    for (let i in this.arrAll) {
      if (this.arrAll[i].typeName == number) {
        this.arrAll.splice(i, 1)
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
    height: 120px;
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
 
  }
  .imgSize.headPortrait.van-uploader {
    display: flex;
    justify-content: center;
  }
}
</style>
