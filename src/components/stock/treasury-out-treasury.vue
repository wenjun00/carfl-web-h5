<!--抵押出库-->
<template>
  <section class="component treasury-out-treasury">
    <i-form :label-width="90">
      <!-- 车辆信息 -->
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">车辆基本信息</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="所选车辆">
            <i-input v-model="outTreasuryModel.modelofcar" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="车身颜色">
            <i-input v-model="outTreasuryModel.carColor" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="上牌城市">
            <i-input v-model="outTreasuryModel.city" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="车牌号码">
            <i-input v-model="outTreasuryModel.carNoShow" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="车架号">
            <i-input v-model="outTreasuryModel.frameNo" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="发动机号">
            <i-input v-model="outTreasuryModel.engineNo" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <!-- 库房信息 -->
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">库房信息</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="车辆隶属">
            <i-input placeholder="请填写车辆隶属" v-model="outTreasuryModel.carSubjection" readonly></i-input>
          </i-form-item>
        </i-col>
        <!--<i-col :span="8">-->
        <!--<i-form-item label="停放库位">-->
        <!--<i-input></i-input>-->
        <!--</i-form-item>-->
        <!--</i-col>-->
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="牌照号码">
            <i-input placeholder="请填写牌照号码" v-model="outTreasuryModel.carNo" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="上牌日期">
            <i-date-picker type="date" placeholder="请填写上牌日期" v-model="outTreasuryModel.cardsDate" readonly></i-date-picker>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="里程表值">
            <i-input placeholder="请填写里程表" v-model="outTreasuryModel.odometer" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="出库日期">
            <i-date-picker type="date" placeholder="请填写出库日期" v-model="outTreasuryModel.placingDate" readonly></i-date-picker>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="出库类型">
            <i-select placeholder="请填写出库类型" v-model="outTreasuryModel.placingType" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0446')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--<i-col :span="8">-->
        <!--<i-form-item label="GPS状态">-->
        <!--<i-select placeholder="请选择状态">-->
        <!--&lt;!&ndash; <i-option></i-option> &ndash;&gt;-->
        <!--</i-select>-->
        <!--</i-form-item>-->
        <!--</i-col>-->
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="车况">
            <i-select placeholder="请选择车况" v-model="outTreasuryModel.placingSituation" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0445')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="经办人">
            <i-input placeholder="请填写经办人" v-model="outTreasuryModel.placingPerson" readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="16">
          <i-form-item label="车况说明">
            <i-input  class="textbox" type="textarea" v-model="outTreasuryModel.carPlacingExplain" readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="16">
          <i-form-item label="情况描述">
            <i-input class="textbox" type="textarea" v-model="outTreasuryModel.placingDesc" readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <!-- 车辆素材-->
        <i-row class="data-form" v-show="pictureOne.length">
          <i-col>
            <div class="data-form-item"></div>
            <a class="information">{{this.$dict.getDictName(1229)}}</a>
          </i-col>
        </i-row>
        <i-row type="flex" :gutter="110" >
          <i-col :span="24">
            <upload-voucher  ref="upload-voucher" hiddenUpload hiddenDelete></upload-voucher>
          </i-col>
        </i-row>

      <i-row class="data-form" v-show="pictureTwo.length">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">{{this.$dict.getDictName(1230)}}</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110" >
        <i-col :span="24">
          <upload-voucher  ref="upload-voucher-two" hiddenUpload hiddenDelete></upload-voucher>
        </i-col>
      </i-row>

      <i-row class="data-form" v-show="pictureThree.length">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">{{this.$dict.getDictName(1231)}}</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110" >
        <i-col :span="24">
          <upload-voucher  ref="upload-voucher-three" hiddenUpload hiddenDelete></upload-voucher>
        </i-col>
      </i-row>

      <i-row class="data-form" v-show="pictureFour.length">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">{{this.$dict.getDictName(1232)}}</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110" >
        <i-col :span="24">
          <upload-voucher  ref="upload-voucher-four" hiddenUpload hiddenDelete></upload-voucher>
        </i-col>
      </i-row>

      <i-row class="data-form" v-show="pictureFive.length">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">{{this.$dict.getDictName(1233)}}</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110" >
        <i-col :span="24">
          <upload-voucher  ref="upload-voucher-five" hiddenUpload hiddenDelete></upload-voucher>
        </i-col>
      </i-row>

      <i-row class="data-form" v-show="pictureSix.length">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">{{this.$dict.getDictName(1234)}}</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110" >
        <i-col :span="24">
          <upload-voucher  ref="upload-voucher-six" hiddenUpload hiddenDelete></upload-voucher>
        </i-col>
      </i-row>

      <i-row class="data-form" v-show="pictureSeven.length">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">{{this.$dict.getDictName(1235)}}</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110" >
        <i-col :span="24">
          <upload-voucher  ref="upload-voucher-seven" hiddenUpload hiddenDelete></upload-voucher>
        </i-col>
      </i-row>

      <i-row class="data-form" v-show="pictureEight.length">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">{{this.$dict.getDictName(1236)}}</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110" >
        <i-col :span="24">
          <upload-voucher  ref="upload-voucher-eight" hiddenUpload hiddenDelete></upload-voucher>
        </i-col>
      </i-row>

      <i-row class="data-form" v-show="pictureNine.length">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">{{this.$dict.getDictName(1262)}}</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110" >
        <i-col :span="24">
          <upload-voucher  ref="upload-voucher-nine" hiddenUpload hiddenDelete></upload-voucher>
        </i-col>
      </i-row>

    </i-form>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Dependencies } from '../../core/decorator'
  import { CityService } from '../../utils/city.service'
  import { Form } from 'iview'
  import  UploadVoucher from "~/components/common/upload-voucher.vue"
  import { AssessMentPlacingService } from "~/services/manage-service/assess-ment-placing.service";
  import { FilterService } from '~/utils/filter.service'

  @Component({
    components: {
      UploadVoucher
    }
  })
  export default class TreasuryOutTreasury extends Vue {
    @Dependencies(AssessMentPlacingService) private assessMentPlacingService: AssessMentPlacingService
    private outTreasuryModel:any = {
      carColor: '', // 车辆颜色
      city: '',  // 车辆城市
      carNo: '', // 车牌号码
      frameNo: '', // 车架号
      engineNo: '',  // 发动机号
      modelofcar: '', // 所选车辆
      carSubjection:'',
      carNoShow:'',
      cardsDate:'',
      odometer:'',
      placingDate:'',
      placingSituation:'',
      placingPerson:'',
      carPlacingExplain:'',
      placingDesc:'',
      assessmentPlacingFileList:'', //文件列表
      placingType:''
    }
    private pictureOne:any = [] //1229
    private pictureTwo:any = [] //1230
    private pictureThree:any = [] //1231
    private pictureFour:any = [] //1232
    private pictureFive:any = [] //1233
    private pictureSix:any = [] //1234
    private pictureSeven:any = [] //1235
    private pictureEight:any = [] //1236
    private pictureNine:any = [] //1262
    /**
     *  获取出库信息
     */
    outTreasury(row){
      this.assessMentPlacingService.findPlacingByPlacingId({placingId:row.placingId})
        .subscribe( data => {
          this.outTreasuryModel.applyId = data.applyId
          this.outTreasuryModel.modelofcar = data.assessmentPlacingApplyModel.brandName + data.assessmentPlacingApplyModel.seriesName + data.assessmentPlacingApplyModel.carName
          this.outTreasuryModel.carColor = data.assessmentPlacingApplyModel.carColor
          this.outTreasuryModel.city = !!data.assessmentPlacingApplyModel.city ? CityService.getCityName(Number(data.assessmentPlacingApplyModel.city)) : ''
          this.outTreasuryModel.carNoShow = data.assessmentPlacingApplyModel.carNo
          this.outTreasuryModel.frameNo = data.assessmentPlacingApplyModel.frameNo
          this.outTreasuryModel.engineNo = data.assessmentPlacingApplyModel.engineNo
          this.outTreasuryModel.carSubjection = data.carSubjection
          this.outTreasuryModel.carNo = data.carNo
          this.outTreasuryModel.cardsDate = FilterService.dateFormat(data.cardsDate, 'yyyy-MM-dd')
          this.outTreasuryModel.odometer = data.odometer
          this.outTreasuryModel.placingSituation = data.placingSituation
          this.outTreasuryModel.carPlacingExplain = data.carPlacingExplain
          this.outTreasuryModel.placingDesc = data.placingDesc
          this.outTreasuryModel.placingDate = FilterService.dateFormat(data.placingDate, 'yyyy-MM-dd')
          this.outTreasuryModel.placingType = data.placingType
          this.outTreasuryModel.placingPerson = data.placingPerson
          this.pictureOne = data.assessmentPlacingFileList.filter(x=>x.materialType === 1229)
          this.pictureTwo = data.assessmentPlacingFileList.filter(x=>x.materialType === 1230)
          this.pictureThree = data.assessmentPlacingFileList.filter(x=>x.materialType === 1231)
          this.pictureFour = data.assessmentPlacingFileList.filter(x=>x.materialType === 1232)
          this.pictureFive = data.assessmentPlacingFileList.filter(x=>x.materialType === 1233)
          this.pictureSix = data.assessmentPlacingFileList.filter(x=>x.materialType === 1234)
          this.pictureSeven = data.assessmentPlacingFileList.filter(x=>x.materialType === 1235)
          this.pictureEight = data.assessmentPlacingFileList.filter(x=>x.materialType === 1236)
          this.pictureNine = data.assessmentPlacingFileList.filter(x=>x.materialType === 1262)
          let uploadVoucherOne = this.$refs['upload-voucher'] as UploadVoucher
          uploadVoucherOne.Reverse(this.pictureOne)
          let uploadVoucherTwo = this.$refs['upload-voucher-two'] as UploadVoucher
          uploadVoucherTwo.Reverse(this.pictureTwo)
          let uploadVoucherThree = this.$refs['upload-voucher-three'] as UploadVoucher
          uploadVoucherThree.Reverse(this.pictureThree)
          let uploadVoucherFour = this.$refs['upload-voucher-four'] as UploadVoucher
          uploadVoucherFour.Reverse(this.pictureFour)
          let uploadVoucherFive = this.$refs['upload-voucher-five'] as UploadVoucher
          uploadVoucherFive.Reverse(this.pictureFive)
          let uploadVoucherSix = this.$refs['upload-voucher-six'] as UploadVoucher
          uploadVoucherSix.Reverse(this.pictureSix)
          let uploadVoucherSeven = this.$refs['upload-voucher-seven'] as UploadVoucher
          uploadVoucherSeven.Reverse(this.pictureSeven)
          let uploadVoucherEight = this.$refs['upload-voucher-eight'] as UploadVoucher
          uploadVoucherEight.Reverse(this.pictureEight)
          let uploadVoucherNine = this.$refs['upload-voucher-nine'] as UploadVoucher
          uploadVoucherNine.Reverse(this.pictureNine)
        },({msg}) => {
          this.$Message.error(msg)
        })
    }
  }
</script>
<style lang="less" scoped>
  .component.treasury-out-treasury {
    .data-form {
      margin-top: 5px;
      .data-form-item {
        width: 7px;
        height: 25px;
        background: #1d4f88;
        display: inline-block;
        margin-right: 6px;
        position: relative;
        top: 4px;
      }
      .information {
        font-size: 16px;
        color: black;
      }
    }
    .redColor{
      color: red;
      font-size: 24px;
      position: relative;
      top: 8px;
    }
  }
</style>
<style lang="less">
  .textbox.ivu-input-wrapper.ivu-input-type{
    width: 480px;
  }
</style>
