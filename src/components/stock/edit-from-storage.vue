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
                    <a class="information">库放信息</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="车辆隶属">
                        <i-input placeholder="请填写车辆隶属" v-model="outTreasuryModel.carSubjection" :maxlength="10"></i-input>
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
                        <i-input placeholder="请填写牌照号码" v-model="outTreasuryModel.carNo" :maxlength="10"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="上牌日期">
                        <i-date-picker type="date" placeholder="请填写上牌日期" v-model="outTreasuryModel.cardsDate"></i-date-picker>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="里程表值" prop="odometer">
                        <i-input placeholder="请填写里程表" v-model="outTreasuryModel.odometer" :maxlength="10"></i-input>
                    </i-form-item>
                </i-col>
                 <i-col :span="8">
                    <i-form-item label="出库日期" prop="placingDate">
                        <i-date-picker type="date" placeholder="请填写出库日期" v-model="outTreasuryModel.placingDate"></i-date-picker>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                  <i-form-item label="出库类型" prop="placingType">
                    <i-select placeholder="请填写出库类型" v-model="outTreasuryModel.placingType">
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
                    <i-form-item label="车况" prop="placingSituation">
                        <i-select placeholder="请选择车况" v-model="outTreasuryModel.placingSituation">
                          <i-option v-for="{value,label} in $dict.getDictData('0445')" :key="value" :label="label" :value="value"></i-option>
                        </i-select>
                    </i-form-item>
                </i-col>
              <i-col :span="8">
                <i-form-item label="经办人">
                  <i-input placeholder="请填写经办人" v-model="outTreasuryModel.placingPerson" :maxlength="10"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="16">
                    <i-form-item label="车况说明">
                        <i-input  class="textbox" type="textarea" v-model="outTreasuryModel.carPlacingExplain"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="16">
                    <i-form-item label="情况描述">
                        <i-input class="textbox" type="textarea" v-model="outTreasuryModel.placingDesc"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
          <!-- 车辆素材-->
          <div v-for="item in $dict.getDictData('0452').filter(v=>v.value !== 1228)">
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <span class="redColor">*</span>
                    <a class="information">{{item.label}}</a>
                </i-col>
            </i-row>
            <div @click="carValue(item.value)">
              <i-row type="flex" :gutter="110">
                <i-col>
                  <upload-voucher  ref="upload-voucher" @financeUploadResources="fileNumber" ></upload-voucher>
                </i-col>
              </i-row>
            </div>
          </div>
        </i-form>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Dependencies } from '../../core/decorator'
import { CityService } from '../../utils/city.service'
import { Form } from 'iview'
import UploadVoucher from "../common/upload-voucher.vue"
import { AssessMentPlacingService } from "~/services/manage-service/assess-ment-placing.service";

@Component({
  components: {
    UploadVoucher
  }
})
export default class EditFromStorage extends Vue {
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
    applyId:'',
    id:'',
    assessmentPlacingFileList:'', //文件列表
    placingType:''
  }
  private ruleValidateRule: any = {
    odometer: [{ required: true, message: '请填写里程表', trigger: 'change' }],
    placingDate:[{required: true, message: '请选出库日期', trigger: 'change', type: 'date'}],
    placingType: [{required: true, message: '请选择出库类型', trigger: 'change', type: 'number'}],
    placingSituation: [{required: true, message: '请选择车况', trigger: 'change', type: 'number'}]
  }
  private id:any = '' //该条数据的订单ID
  private fodderList:any = [] //上传文件列
  private carStatus:any = ''
  /**
   *  获取出库信息
   */
  outTreasury(row){
    this.id = row.placingId
    this.assessMentPlacingService.findPlacingByPlacingId({placingId:row.placingId})
      .subscribe( data => {
        this.outTreasuryModel.applyId = data.applyId
        this.outTreasuryModel.modelofcar = data.assessmentPlacingApplyModel.brandName + data.assessmentPlacingApplyModel.seriesName + data.assessmentPlacingApplyModel.carName
        this.outTreasuryModel.carColor = data.assessmentPlacingApplyModel.carColor
        this.outTreasuryModel.city = !!data.assessmentPlacingApplyModel.city ? CityService.getCityName(Number(data.assessmentPlacingApplyModel.city)) : ''
        this.outTreasuryModel.carNoShow = data.assessmentPlacingApplyModel.carNo
        this.outTreasuryModel.frameNo = data.assessmentPlacingApplyModel.frameNo
        this.outTreasuryModel.engineNo = data.assessmentPlacingApplyModel.engineNo
      },({msg}) => {
        this.$Message.error(msg)
      })
    }
  /**
   *  确认出库
   */
  confirmTreasury(){
    let form = <Form>this.$refs['form-item']
    form.validate(valid => {
      if (!valid) return false
      this.outTreasuryModel.id = this.id
      this.outTreasuryModel.assessmentPlacingFileList = this.fodderList
      delete this.outTreasuryModel.modelofcar
      delete this.outTreasuryModel.carColor
      delete this.outTreasuryModel.city
      delete this.outTreasuryModel.carNoShow
      delete this.outTreasuryModel.frameNo
      delete this.outTreasuryModel.engineNo
      this.assessMentPlacingService.createPlacingOrder(this.outTreasuryModel)
        .subscribe( data => {
          this.$Message.success('保存成功')
          this.$emit('close');
        },({msg}) => {
          this.$Message.error(msg)
        })
    })
  }
  /**
   *  返回上传文件列
   */
  fileNumber(item) {
    this.fodderList = this.fodderList.concat(item.map(v=>{
      return {
        materialUrl:v.materialUrl,
        materialType:this.carStatus
      }
    }))
    console.log(this.fodderList)
  }
  carValue(val){
    this.carStatus = val
  }
}
</script>
<style lang="less" scoped>
.component.edit-from-storage {
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
