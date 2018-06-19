<template>
  <section class="page customInformation">
    <van-row>
      <p class="base-info-title">基本信息</p>
      <van-cell-group>
        <van-field v-model="inforModel.phone" disabled label="手机号码" placeholder="请输入手机号" required />
        <van-field v-model="inforModel.contactPhone" label="联系号码" placeholder="客户第二个手机号" />
        <van-cell title="婚姻状况" required is-link :value="inforModel.falseMarital" @click="marriageBot=true" />
        <van-cell title="学历信息" required is-link :value="inforModel.falseeducation" @click="educationBot=true" />
      </van-cell-group>
      <van-number-keyboard :show="show.phone" close-button-text="完成" @blur="show.phone = false" @input="inputPhone" @delete="deletePhone"></van-number-keyboard>
      <van-number-keyboard :show="show.contactPhone" close-button-text="完成" @blur="show.contactPhone = false" @input="contactPhone" @delete="deleteContactPhone"></van-number-keyboard>
      <!-- 婚姻状况 -->
      <transition name="fade">
        <van-picker :columns="marriages" v-show="marriageBot" show-toolbar ref="vanpicker" @confirm="marriagefirm" @cancel="marriageBot=false" />
      </transition>
      <!-- 学历信息 -->
      <transition name="fade">
        <van-picker :columns="educations" v-show="educationBot" show-toolbar ref="vanpicker" @confirm="educationfirm" @cancel="educationBot=false" />
      </transition>
      <!-- 居住情况 -->
      <transition name="fade">
        <van-picker :columns="situations" v-show="situationBot" show-toolbar ref="vanpicker" @confirm="situationfirm" @cancel="situationBot=false" />
      </transition>
      <!-- 居住年限 -->
      <transition name="fade">
        <van-picker :columns="agelimits" v-show="agelimitBot" show-toolbar ref="vanpicker" @confirm="agelimitfirm" @cancel="agelimitBot=false" />
      </transition>
      <!-- 工作情况 -->
      <transition name="fade">
        <van-picker :columns="workings" v-show="workingBot" show-toolbar ref="vanpicker" @confirm="workingfirm" @cancel="workingBot=false" />
      </transition>
      <!-- 单位性质 -->
      <transition name="fade">
        <van-picker :columns="natureUnits" v-show="natureUnitBot" show-toolbar ref="vanpicker" @confirm="natureUnitfirm" @cancel="natureUnitBot=false" />
      </transition>
      <!-- 工作年限 -->
      <transition name="fade">
        <van-picker :columns="yearsWorkings" v-show="yearsWorkingBot" show-toolbar ref="vanpicker" @confirm="yearsWorkingfirm" @cancel="yearsWorkingBot=false" />
      </transition>

    </van-row>
    <van-row>
      <p class="base-info-title">居住信息</p>
      <van-cell-group>
        <van-cell title="居住情况" required is-link :value="inforModel.falseSituation" @click="situationBot=true" />
        <van-cell title="居住年限" required is-link :value="inforModel.falseAgelimit" @click="agelimitBot=true" />
        <van-cell title="居民地区" required is-link :value="inforModel.area | cityConvert " @click="$refs['cityPicker'].show()" />
        <city-picker required ref="cityPicker" @on-confirm="onCityPickerConfirm"></city-picker>

        <van-field type="textarea" class="address" v-model="inforModel.address" label="居民地址" required placeholder="请输入详细的居民地址精确到门牌号" />
      </van-cell-group>
      <van-popup v-model="show.living" position="bottom">
        <van-picker :columns="columns" show-toolbar @change="onChange" @confirm="show.living=false" @cancel="show.living=false" />
      </van-popup>
      <van-popup v-model="show.livingYear" position="bottom">
        <van-picker :columns="columns" show-toolbar @change="onChange" @confirm="show.livingYear=false" @cancel="show.livingYear=false" />
      </van-popup>

    </van-row>
    <van-row>
      <p class="base-info-title">工作信息</p>
      <van-cell-group>
        <van-cell title="工作情况" required is-link :value="inforModel.falseWorking" @click="workingBot=true" />
        <van-field v-model="inforModel.companyName" label="单位名称" placeholder="请输入完整的公司名称" />
        <van-cell title="单位性质" is-link :value="inforModel.falsenatureUnit" @click="natureUnitBot=true" />
        <van-field v-model="inforModel.companyAdress" label="单位地址" />
        <van-field v-model="inforModel.companyPhone" label="单位电话" placeholder="请输入公司电话" />
        <van-cell title="工作年限" is-link :value="inforModel.falseYearsWorking" @click="yearsWorkingBot=true" />
        <van-field v-model="inforModel.afterSalary" label="税后月薪" placeholder="请输入您税后的月薪" />
      </van-cell-group>
    </van-row>
    <van-button type="primary" class="nextStepSty" bottom-action @click="informationAffirm">下一步</van-button>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AreaData from "~/assets/area"
import { State, Mutation, Action } from "vuex-class";
import CityPicker from "~/components/common/city-picker.vue";
import { CityService } from "~/utils/city.service";

@Component({
  components: {
    CityPicker,
  }
  // ,
  // filters:{
  //   cityConvert: (values:Array<Number>) =>{
  //     let citys:any = CityService.getCityName(values[0],values[1],values[2])
  //     return citys.join(' ')
  //   }
  // }
})
export default class Login extends Vue {
  @State intoA
  @Mutation going
  @State userData
  private marriageBot: boolean = false   // 婚姻状况
  private marriages: any = []
  private educationBot: boolean = false   // 学历信息
  private educations: any = []
  private situationBot: boolean = false  // 居住情况
  private situations: any = []
  private agelimitBot: boolean = false  // 居住年限
  private agelimits: any = []
  private workingBot: boolean = false  // 工作情况
  private workings: any = []
  private natureUnitBot: boolean = false // 单位性质
  private natureUnits: any = []
  private yearsWorkingBot: boolean = false // 工作年限
  private yearsWorkings: any = []



  private value: any = null

  private inforModel = {
    phone: "",           // 手机号码
    contactPhone: "",    // 联系号码（次）
    area: "",            // 居住地区
    address: "",         // 居住地址
    companyName: "",     // 单位名称
    companyAdress: "",   // 单位地址
    companyPhone: "",    // 单位电话
    afterSalary: null,     // 税后月薪
    falseMarital: '',     // 婚姻状况文字
    marital: "",         // 婚姻状况id
    falseeducation: '',   // 学历信息文字
    education: '',        // 学历信息id
    falseSituation: '',   // 居住情况文字
    situation: '',        // 居住情况id
    falseAgelimit: '',    // 居住年限文字
    agelimit: '',         // 居住年限
    falseWorking: '',     // 工作情况文字
    working: '',          // 工作情况id
    falsenatureUnit: "",  // 单位性质文字
    natureUnit: '',       // 单位性质id
    falseYearsWorking: '', // 工作年限制文字
    yearsWorking: '',      // 工作年限id
    province1: '',         // 居住地区省市
    city1: '',             // 居住地区城市
    district1: '',         // 居住地区区域

  }

  private show = {
    phone: false, // 电话键盘
    contactPhone: false,
    living: false, // 居住情况
    livingYear: false, // 居住年限
    area: false, // 区域选择器
    marital: false, // 结婚情况
    educate: false // 学历信息
  }
  private columns = {
    educate: ['本科', '专科', '博士'],
    dataList: AreaData,
    marital: ["未婚", "已婚", "丧偶", "离婚"]
  }


  private onCityPickerConfirm(currentCitys) {
    this.inforModel.province1 = currentCitys[0]
    this.inforModel.city1 = currentCitys[1]
    this.inforModel.district1 = currentCitys[2]
    this.inforModel.area = currentCitys
  }

  /**
   * 婚姻状况点击确定
   */
  marriagefirm(val) {
    this.inforModel.marital = val.value
    this.inforModel.falseMarital = this.$dict.getDictName(Number(this.inforModel.marital))
    this.marriageBot = false
  }
  /**
   * 学历信息点击确定
   */
  educationfirm(val) {
    this.inforModel.education = val.value
    this.inforModel.falseeducation = this.$dict.getDictName(Number(this.inforModel.education))
    this.educationBot = false
  }
  /**
   * 居住情况点击确定
   */
  situationfirm(val) {
    this.inforModel.situation = val.value
    this.inforModel.falseSituation = this.$dict.getDictName(Number(this.inforModel.situation))
    this.situationBot = false
  }


  /**
   * 居住年限
   */
  agelimitfirm(val) {
    this.inforModel.agelimit = val.value
    this.inforModel.falseAgelimit = this.$dict.getDictName(Number(this.inforModel.agelimit))
    this.agelimitBot = false
  }
  /**
   * 工作情况
   */
  workingfirm(val) {
    this.inforModel.working = val.value
    this.inforModel.falseWorking = this.$dict.getDictName(Number(this.inforModel.working))
    this.workingBot = false
  }
  /**
   * 单位性质点击确定
   */
  natureUnitfirm(val) {
    this.inforModel.natureUnit = val.value
    this.inforModel.falsenatureUnit = this.$dict.getDictName(Number(this.inforModel.natureUnit))
    this.natureUnitBot = false
  }
  /**
   * 工作年限点击确定
   */
  yearsWorkingfirm(val) {
    this.inforModel.yearsWorking = val.value
    this.inforModel.falseYearsWorking = this.$dict.getDictName(Number(this.inforModel.yearsWorking))
    this.yearsWorkingBot = false
  }
  // 验证规则
  private rules = {
    contactPhone: [{ message: "请输入正确的联系号码" }, { validator: this.$validator.phoneNumber }],
    falseMarital: { required: true, message: '请选择婚姻状况' },
    falseeducation: { required: true, message: '请选择学历信息' },
    falseSituation: { required: true, message: '请选择居住情况' },
    falseAgelimit: { required: true, message: '请选择居住年限' },
    area: { required: true, message: '请选择居民地区' },
    address: { required: true, message: '请输入居民地址' },
    falseWorking: { required: true, message: '请选择工作情况' },
    // companyPhone: [{ message: "请输入正确的单位电话" }, { validator: this.verifyPhone }],
    // companyName:{ required: true, message: '请输入单位名称' },
    // falsenatureUnit:{ required: true, message: '请选择单位性质' },
  };
  // verifyPhone(rule, value, callback) {
  //   if (value !== '') {
  //     if (!(/^((\d{3,4}-)|\d{3.4}-)?\d{7,8}$/).test(value)) {
  //       callback(new Error('请输入正确的单位电话'));
  //     } 
  //   }else{
  //     callback()
  //   }
  // }

  /**
  * 基本信息 点击下一步
  */
  informationAffirm() {
    this.$validator.validate(this.inforModel, this.rules).then(error => {
      if (!error) {
        this.going(this.inforModel)
        this.$router.push('/contact-information')

      } else {
        this.$toast(error);
      }
    });

  }


  mounted() {
    // 获取婚姻状况
    this.marriages = this.$dict.getDictData('0003').map(v => {
      return Object.assign({ text: v.label }, v)
    })
    // 获取学历信息
    this.educations = this.$dict.getDictData('0002').map(v => {
      return Object.assign({ text: v.label }, v)
    })
    // 居住情况
    this.situations = this.$dict.getDictData('0462').map(v => {
      return Object.assign({ text: v.label }, v)
    })
    // 居住年限
    this.agelimits = this.$dict.getDictData('0463').map(v => {
      return Object.assign({ text: v.label }, v)
    })
    // 工作情况
    this.workings = this.$dict.getDictData('0460').map(v => {
      return Object.assign({ text: v.label }, v)
    })
    // 工作性质
    this.natureUnits = this.$dict.getDictData('0012').map(v => {
      return Object.assign({ text: v.label }, v)
    })
    // 工作年限
    this.yearsWorkings = this.$dict.getDictData('0461').map(v => {
      return Object.assign({ text: v.label }, v)
    })
    // 获取登陆人手机号
    this.inforModel.phone = this.userData.userPhone
    // console.log(this.userData,'phone')


  }


  /**
   * 数字键盘输入-手机号码
   */
  inputPhone(val) {
    if (this.inforModel.phone.length === 11) return
    this.inforModel.phone += val.toString()
  }
  /**
   * 数字键盘输入-联系号码
   */
  contactPhone(val) {
    if (this.inforModel.contactPhone.length === 11) return
    this.inforModel.contactPhone += val.toString()
  }
  /**
   * 按钮删除操作-手机号码
   */
  deletePhone() {
    let length = this.inforModel.phone.length
    if (length === 0) return
    this.inforModel.phone = this.inforModel.phone.substring(0, length - 1)
  }
  /**
   * 按钮删除操作-联系号码
   */
  deleteContactPhone() {
    let length = this.inforModel.contactPhone.length
    if (length === 0) return
    this.inforModel.phone = this.inforModel.contactPhone.substring(0, length - 1)
  }
  onChange(picker, values, index) {
    console.log(values, 'value')
    if (values) {
      this.inforModel.marital = values;
    } else {
      this.inforModel.marital = "";
    }
  }
  private onCodeNumberFocus() {
    (document.activeElement as HTMLElement).blur()
    this.show.contactPhone = true
    this.show.phone = true
  }

  // onAreaConfirmClick(val) {
  //   // console.log(val)
  //   this.inforModel.province1 = val[0].name
  //   this.inforModel.city1 = val[1].name
  //   this.inforModel.district1 = val[2].name
  //   if (val && val.length >= 2) {
  //     this.inforModel.area = val[0].name + " " + val[1].name + " " + val[2].name
  //   }
  //   this.show.area = false
  // }

}
</script>
<style lang="less" scoped>
.nextStepSty{
  margin-top: 30px;
}
.address {
  height: 50px;
}
.van-cell--required::before {
  left: -0.3rem;
  bottom: 0.3rem;
  font-size: 36px;
  color: #ffe44d;
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
}
.van-cell--required[data-v-21fd4166]::before {
  top: 0.9rem;
}
</style>
 
 <style lang="less" >
.page.customInformation {
  .van-field__control {
    text-align: right;
    padding-left: 24px;
    box-sizing: border-box;
  }
}
</style>