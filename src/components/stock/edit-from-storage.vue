<!--抵押出库-->
<template>
  <section class="component edit-from-storage">
    <i-form :label-width="90" :model="outTreasuryModel" :rules="ruleValidateRule" ref="form-item">
      <!-- 车辆信息 -->
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a class="information">车辆基本信息</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="16">
        <i-col :span="12">
          <i-form-item label="所选车辆">
            <i-input v-model="outTreasuryModel.modelofcar" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车身颜色">
            <i-input v-model="outTreasuryModel.carColor" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="上牌城市">
            <i-input v-model="outTreasuryModel.city" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车牌号码">
            <i-input v-model="outTreasuryModel.carNo" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车架号">
            <i-input v-model="outTreasuryModel.frameNo" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="发动机号">
            <i-input v-model="outTreasuryModel.engineNo" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="初登日期">
            <i-date-picker type="date" v-model="outTreasuryModel.cardsDate" disabled></i-date-picker>
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
      <i-row type="flex" :gutter="16">
        <i-col :span="12">
          <i-form-item label="车辆隶属" prop="carSubjection">
            <i-input placeholder="请填写车辆隶属" v-model="outTreasuryModel.carSubjection" :maxlength="10"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="里程表值" prop="odometer">
            <i-input placeholder="请填写里程表" v-model="outTreasuryModel.odometer" :maxlength="10"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="出库日期" prop="placingDate">
            <i-date-picker type="date" placeholder="请填写出库日期" v-model="outTreasuryModel.placingDate"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="出库类型" prop="placingType">
            <i-select placeholder="请填写出库类型" v-model="outTreasuryModel.placingType">
              <i-option v-for="{value,label} in $dict.getDictData('0446')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车况" prop="placingSituation">
            <i-select placeholder="请选择车况" v-model="outTreasuryModel.placingSituation">
              <i-option v-for="{value,label} in $dict.getDictData('0445')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="经办人" prop="placingPerson">
            <i-input placeholder="请填写经办人" v-model="outTreasuryModel.placingPerson" :maxlength="10"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="16">
          <i-form-item label="车况说明" prop="carPlacingExplain">
            <i-input class="textbox" type="textarea" v-model="outTreasuryModel.carPlacingExplain"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="16">
          <i-form-item label="情况描述" prop="placingDesc">
            <i-input class="textbox" type="textarea" v-model="outTreasuryModel.placingDesc"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <!-- 车辆素材-->
      <div v-for="(item,index) in $dict.getDictData('0452').filter(v=>v.value !== 1228)" :key="index">
        <i-row class="data-form">
          <i-col>
            <div class="data-form-item"></div>
            <span class="redColor">*</span>
            <a class="information">{{item.label}}</a>
          </i-col>
        </i-row>
        <div @click="carValue(item.value)">
          <i-row type="flex" :gutter="16">
            <i-col>
              <upload-voucher ref="upload-voucher" @financeUploadResources="fileNumber"></upload-voucher>
            </i-col>
          </i-row>
        </div>
      </div>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { CityService } from '~/utils/city.service';
import { Form } from 'iview';
import UploadVoucher from "~/components/common/upload-voucher.vue";
import { AssessMentPlacingService } from "~/services/manage-service/assess-ment-placing.service";
import { FilterService } from '~/utils/filter.service';
import { Prop, Watch } from 'vue-property-decorator';

@Component({
  components: {
    UploadVoucher
  }
})
export default class EditFromStorage extends Vue {
  @Dependencies(AssessMentPlacingService) private assessMentPlacingService: AssessMentPlacingService
  /**
   * 该条数据的订单ID
   */
  @Prop({
    required: true
  }) id;

  @Watch('id', { immediate: true })
  onDataChange() {
    this.outTreasury()
  }


  private outTreasuryModel: any = {
    carColor: '', // 车辆颜色
    city: '',  // 车辆城市
    carNo: '', // 车牌号码
    frameNo: '', // 车架号
    engineNo: '',  // 发动机号
    modelofcar: '', // 所选车辆
    carSubjection: '',
    cardsDate: '',
    odometer: '',
    placingDate: '',
    placingSituation: '',
    placingPerson: '',
    carPlacingExplain: '',
    placingDesc: '',
    applyId: '',
    id: '',
    assessmentPlacingFileList: '', //文件列表
    placingType: ''
  }
  private ruleValidateRule: any = {
    odometer: [{ required: true, message: '请填写里程表', trigger: 'change' }],
    placingDate: [{ required: true, message: '请选出库日期', trigger: 'change', type: 'date' }],
    placingType: [{ required: true, message: '请选择出库类型', trigger: 'change', type: 'number' }],
    placingSituation: [{ required: true, message: '请选择车况', trigger: 'change', type: 'number' }]
  }

  private fodderList: any = [] //上传文件列
  private carStatus: any = ''
  /**
   *  获取出库信息
   */
  outTreasury() {
    this.assessMentPlacingService.findPlacingByPlacingId({ placingId: this.id })
      .subscribe(data => {
        this.outTreasuryModel.applyId = data.applyId
        this.outTreasuryModel.carNo = data.carNo
        this.outTreasuryModel.modelofcar = data.assessmentPlacingApplyModel.brandName + data.assessmentPlacingApplyModel.seriesName + data.assessmentPlacingApplyModel.carName
        this.outTreasuryModel.carColor = data.assessmentPlacingApplyModel.carColor
        this.outTreasuryModel.city = this.$city.getCityName((data.assessmentPlacingApplyModel || {}).city)
        this.outTreasuryModel.frameNo = data.assessmentPlacingApplyModel.frameNo
        this.outTreasuryModel.engineNo = data.assessmentPlacingApplyModel.engineNo
        this.outTreasuryModel.carSubjection = data.carSubjection
        this.outTreasuryModel.cardsDate = FilterService.dateFormat(data.cardsDate, 'yyyy-MM-dd')
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
  }
  /**
   *  确认出库
   */
  confirmTreasury() {
    let form = <Form>this.$refs['form-item']

    return new Promise((resolve, reject) => {
      form.validate(result => {
        if (!result) return reject()

        this.outTreasuryModel.id = this.id
        this.outTreasuryModel.assessmentPlacingFileList = this.fodderList
        this.assessMentPlacingService.createPlacingOrder(this.outTreasuryModel)
          .subscribe(data => {
            this.$Message.success('保存成功')
            resolve()
          }, ({ msg }) => {
            this.$Message.error(msg)
            reject()
          })
      })
    })
  }
  /**
   *  返回上传文件列
   */
  fileNumber(item) {
    this.fodderList = this.fodderList.concat(item.map(v => {
      return {
        materialUrl: v.materialUrl,
        materialType: this.carStatus
      }
    }))
  }
  carValue(val) {
    this.carStatus = val
  }
}
</script>
<style lang="less" scoped>
.component.edit-from-storage {
  .data-form {
    margin-top: 5px;
    margin-bottom: 20px;
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
  .redColor {
    color: red;
    font-size: 24px;
    position: relative;
    top: 8px;
  }
}
</style>
<style lang="less">
.textbox.ivu-input-wrapper.ivu-input-type {
  width: 480px;
}
</style>
