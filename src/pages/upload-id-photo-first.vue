<template>
  <section class="page uploadIdPhotoFirst">
    <div>
      <van-cell title="选择城市" required is-link :value="provinceCity" @click="optionCity=true" />
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
            <van-uploader class="imgSize headPortrait" capture="camera" result-type="dataUrl" :after-read="onRead('photo',1369)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="photo == ''" name="add" />
              <img height="100%" v-else :src="photo" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard('photo',1369)" v-if="!photo == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard('photo')" v-if="!photo == ''" class="lookiconHead" name="password-view" />
          </van-col>
          <van-col span="11">
            <van-uploader capture="camera" class="imgSize headPortrait" result-type="dataUrl" :after-read="onRead('photoTwo',1370)" accept="image/gif, image/jpeg" multiple>
              <van-icon class="vanIcon" v-if="photoTwo == ''" name="add" />
              <img height="100%" v-else :src="photoTwo" alt="">
            </van-uploader>
            <van-icon @click="closeIdentityCard('photoTwo',1370)" v-if="!photoTwo == ''" class="deleteiconHead" name="close" />
            <van-icon @click="lookIdentityCard('photoTwo')" v-if="!photoTwo == ''" class="lookiconHead" name="password-view" />
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
          <van-field v-model="idcard.name" name="center" placeholder="请输入证件姓名" required label="证件姓名" />
          <van-field v-model="idcard.id_card" name="center" placeholder="请输入证件号码" required label="证件号码" />
          <van-cell title="民族" name="center" required is-link :value="idcard.nationText" @click="pickerDialog=true" />
          <van-cell title="户籍信息" name="center" required is-link :value="idcard.id_card_address | cityConvert " @click="$refs['cityPicker'].show()" />
          <city-picker required ref="cityPicker" @on-confirm="onCityPickerConfirm"></city-picker>
          <van-cell title="有效期限" name="center" required is-link :value="idcard.id_card_validity_period_section" @click="validPeriod=true" />
          <van-datetime-picker v-show="validPeriod" type="date" v-model="currentDate" :min-date="minDate" @cancel="validPeriodCancel" @confirm="validPeriodAffirm" />
        </van-cell-group>
      </van-row>
    </div>
    <van-row>
      <van-button type="primary" class="nextStepSty" @click="addAffirm" bottom-action>下一步</van-button>
    </van-row>
    <!-- 选择民族 -->
    <transition name="fade">
      <van-picker :columns="columns" v-show="pickerDialog" show-toolbar ref="vanpicker" @confirm="onConfirm" @cancel="pickerDialog=false" />
    </transition>

    <!-- 选择下单城市 -->
    <transition name="fade">
      <!-- <van-picker :columns="columnsTwo" v-show="optionCity" show-toolbar @confirm="onConfirmTwo" @cancel="optionCity=false" /> -->
      <van-area :area-list="cityTop" v-show="optionCity" show-toolbar @confirm="onConfirmTwo" @cancel="optionCity=false" :columns-num="2" />
    </transition>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { NetService } from "~/utils/net.service";
import { ImagePreview } from 'vant';
import { State, Mutation, Action } from "vuex-class";
import CityPicker from "~/components/common/city-picker.vue";
import { FilterService } from '~/utils/filter.service'
@Component({
  components: {
    CityPicker,
  }

})
export default class Login extends Vue {
  private value: any = null;
  private arrImg: any = [];
  private photo: any = "";
  private photoTwo: any = "";
  private pickerDialog: boolean = false;  //  民族弹窗
  private optionCity: boolean = false;     // 城市选择弹窗
  private columns: any = [];
  private minDate: any = new Date(1949, 0, 1);
  private validPeriod: boolean = false   // 有效期限
  private currentDate: any = new Date()
  private type: any;
  private idcard: any = {
    id_card: '',  // 身份证号码
    nation: '',   // 民族
    nationText: '', // 民族汉子
    id_card_validity_period_section: '', //身份证有效区间
    name: '',    // 户名
    id_card_address: '', // 身份证地址
    headPhoto: '', // 身份证头像地址
    nationalPhoto: '', // 身份证国徽地址
    province: '',  // 身份证省份
    city: '',    // 身份证城市
    district: '', // 身份证区
    provinceTop: '',// 身份城市 顶部

  }

  @Mutation idcCard
  @Mutation tenantImg
  @State intoA
  @Mutation selectCity
  @State IntoACity
  @Mutation clearSelectCity

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

  //  顶部城市点击事件
  onConfirmTwo(val) {
    if (val[0].code == 110000) {
      let catyAll = {
        id: 902,
        pid: 734,
      }
      this.selectCity(catyAll)

    } else if (val[0].code == 120000) {
      let catyAll = {
        id: 3125,
        pid: 3021,
      }
      this.selectCity(catyAll)
    } else {
      this.$toast('请选择省市');
    }

    this.optionCity = false
  }

  private heandCity = '' // 选择城市
  // 验证规则
  private rules = {
    name: { required: true, message: '请输入用户姓名' },
    id_card: [{ required: true, message: "请输入正确的身份证号码" }, { validator: this.$validator.idCard }],
    nation: { required: true, message: '请选择民族' },
    id_card_address: { required: true, message: '请选择户籍信息' },
    id_card_validity_period_section: { required: true, message: '请输入有效期限', },
  };
  // 选择城市点击事件
  private onCityPickerConfirm(currentCitys) {
    this.idcard.province = currentCitys[0]
    this.idcard.city = currentCitys[1]
    this.idcard.district = currentCitys[2]
    this.idcard.id_card_address = currentCitys

  }
  /**
   * 点击有效期 确定事件
   */
  validPeriodAffirm(val) {
    this.idcard.id_card_validity_period_section = this.$filter.dateFormat(val, "yyyy-MM-dd")
    this.validPeriod = false
  }
  /**
   * 点击有效期取消事件
   */
  validPeriodCancel() {
    this.validPeriod = false
  }

  /**
   * 点击下一步
   */
  addAffirm() {

    this.$validator.validate(this.idcard, this.rules).then(error => {
      if (!error) {
        for (let i in this.arrImg) {
          if (this.arrImg[i].typeName == 1369) {
            this.idcard.headPhoto = this.arrImg[i].materialUrl
          } else if (this.arrImg[i].typeName == 1370) {
            this.idcard.nationalPhoto = this.arrImg[i].materialUrl
          }
        }
        if (this.idcard.headPhoto == '') {
          this.$toast('请先上传身份证头像面');
          return
        }
        if (this.idcard.nationalPhoto == '') {
          this.$toast('请先上传身份证国徽面');
          return
        }
        this.$router.push('/upload-id-photo-two')
        this.idcCard(this.idcard)
        this.tenantImg(this.arrImg)

      } else {
        this.$toast(error);
      }
    });

  }

  /**
   * 点击下拉确定事件
   */

  private onConfirm(val) {
    this.idcard.nation = val.value
    this.idcard.nationText = this.$dict.getDictName(Number(this.idcard.nation))
    this.pickerDialog = false
  }

  //测试图片上传
  onRead(val, number) {
    return ({ file }) => {
      NetService.upload(file).then(x => {
        this[val] = x.url
        for (let i in this.arrImg) {
          if (this.arrImg[i].typeName == number) {
            this.arrImg.splice(i, 1)
          }
        }
        this.arrImg.push({
          // personalId: x.id,
          uploadName: x.realName,
          materialType: x.type,
          dataSize: x.size,
          materialUrl: x.url,
          uploadTime: x.createTime,
          typeName: number,
        })
      }).catch(ex => {
      })
    }
  }
  get provinceTip() {
    return FilterService.cityConvert([this.IntoACity.pid])
  }
  get cityTip() {
    return FilterService.cityConvert([this.IntoACity.id])
  }
  get provinceCity() {
    return `${this.provinceTip} ${this.cityTip}`
  }



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

    if (!!this.intoA.personal) {
      this.idcard = this.intoA.personal
      this.photo = this.idcard.headPhoto
      this.photoTwo = this.idcard.nationalPhoto
    }

    this.clearSelectCity()
    // this.IntoACity = []
    this.columns = this.$dict.getDictData('0486').map(v => {
      return Object.assign({ text: v.label }, v)
    })
    let els: any = document.getElementsByName("center")
    els.forEach(v => {
      v.onclick = () => {
        setTimeout(() => {
          (v as HTMLElement).scrollIntoView(true)
        }, 300);
      }
    })
  }
}
</script>
<style lang="less" scoped>
.page.uploadIdPhotoFirst {
  .nextStepSty {
    margin-top: 30px;
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
    left: 55px;
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
  .van-picker {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 100;
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
  .van-cell__title {
    max-width: 90px;
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
