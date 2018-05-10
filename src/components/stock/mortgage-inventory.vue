<!--抵押入库-->
<template>  
    <section class="component mortgage-inventory">
        <i-form :rules="ruleValidateRule" :model="mortgageInventoryModel" ref="form-item" :label-width="90">
            <!-- 车辆信息 -->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">车辆基本信息</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="所选车辆" >
                        <i-input v-model="mortgageInventoryModel.modelofcar" disabled></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="车身颜色">
                        <i-input  v-model="mortgageInventoryModel.carColor" disabled></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="上牌城市" >
                        <i-input  v-model="mortgageInventoryModel.city" disabled></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="车牌号码" >
                        <i-input  v-model="mortgageInventoryModel.carNo" disabled></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="车架号" >
                        <i-input  v-model="mortgageInventoryModel.frameNo" disabled></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="发动机号" >
                        <i-input  v-model="mortgageInventoryModel.engineNo" disabled></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
          <i-row type="flex" :gutter="110">
            <i-col :span="8">
              <i-form-item label="初登日期" >
                <i-date-picker v-model="mortgageInventoryModel.cardsDate" type="date" disabled></i-date-picker>
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
                    <i-form-item label="车辆隶属" prop="carSubjection">
                        <i-input v-model="mortgageInventoryModel.carSubjection" placeholder="请填写车辆隶属" :maxlength="9"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="车辆来源" >
                        <i-input  v-model="mortgageInventoryModel.carSource" disabled :maxlength="9"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="入库日期"  prop="warehousingDate">
                        <i-date-picker v-model="mortgageInventoryModel.warehousingDate" type="date" placeholder="请填写入库日期"></i-date-picker>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="里程表值"  prop="odometer">
                        <i-input v-model="mortgageInventoryModel.odometer" placeholder="请填写里程表" :maxlength="9"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="车况"  prop="warehousingSituation">
                        <i-select placeholder="请选择车况" v-model="mortgageInventoryModel.warehousingSituation">
                            <i-option v-for="{value,label} in $dict.getDictData('0445')" :key="value" :label="label" :value="value"></i-option>
                        </i-select>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="登记人" prop="warehousingPerson">
                        <i-input placeholder="请选填写登记人" v-model="mortgageInventoryModel.warehousingPerson" :maxlength="9"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="16">
                    <i-form-item label="车况说明" prop="carWarehousingExplain">
                        <i-input v-model="mortgageInventoryModel.carWarehousingExplain" class="textbox" type="textarea"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110" >
                <i-col :span="8">
                    <i-form-item label="停放状态"  prop="placingTypeId">
                        <i-select placeholder="请选择停放状态" @on-change="haltState" v-model="mortgageInventoryModel.placingTypeId">
                            <i-option v-for="{value,label} in $dict.getDictData('0451')" :key="value" :label="label" :value="value"></i-option>
                        </i-select>
                    </i-form-item>
                </i-col>
              <!--<i-col :span="8" v-if="mortgageInventoryModel.placingTypeId === 1227">-->
                <!--<i-form-item label="GPS状态"  prop="placingTypeId">-->
                  <!--<i-select placeholder="请选择GPS状态"  v-model="mortgageInventoryModel.placingTypeId">-->
                    <!--<i-option v-for="{value,label} in $dict.getDictData('0451')" :key="value" :label="label" :value="value"></i-option>-->
                  <!--</i-select>-->
                <!--</i-form-item>-->
              <!--</i-col>-->
            </i-row>
            <i-row type="flex" :gutter="110" v-if="!!mortgageInventoryModel.placingTypeId">
                <i-col>
                    <i-form-item label="措施内容" prop="fee">
                        <i-checkbox-group v-model="mortgageInventoryModel.fee">
                            <i-checkbox  v-for="item in parkingStateShow" :key="item.id" :label="item.parkeAttr" :value="item.id">
                            </i-checkbox>
                        </i-checkbox-group>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="16">
                    <i-form-item label="情况描述" prop="warehousingDesc">
                        <i-input class="textbox" v-model="mortgageInventoryModel.warehousingDesc" type="textarea"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <!-- 文件数量-->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">文件数量({{fileNumberList}})</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="24">
                    <upload-voucher ref="upload-voucher" @financeUploadResources="fileNumber"></upload-voucher>
                </i-col>
            </i-row>
        </i-form>
    </section>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { Form } from 'iview'
import  UploadVoucher from "~/components/common/upload-voucher.vue"
import { AssessMentPlacingService } from '~/services/manage-service/assess-ment-placing.service'
import { CityService } from '~/utils/city.service'
import { FilterService } from "~/utils/filter.service";
@Component({
  components: {
    UploadVoucher
  }
})
export default class addPeople extends Vue {
  @Dependencies(AssessMentPlacingService) private assessMentPlacingService: AssessMentPlacingService
  private fodderList:any = [] //上传文件列
  private mortgageInventoryModel: any = {
    warehousingSituation:'',          // 车况
    warehousingDate:'',               // 入库日期
    cardsDate:'',                     // 上牌日期
    applyId:'',                       // 当前id
    carColor: '',                     // 车辆颜色
    city: '',                         // 车辆城市
    carNo: '',                        // 车牌号码
    frameNo: '',                      // 车架号
    engineNo: '',                     // 发动机号
    modelofcar: '',                   // 所选车辆
    fee: [],                          // 措施内容
    placingTypeId:'',
    assessmentPlacingFileList:'', //文件列表
  }
  private parkingStateShow: any = []
  private parkingState: any = []
  private status: any = {1: [], 2: [], 3: [], 4: [], 5: []}
  private assessmentPlacingTypeValueModelList:any = [{}]
  private id:any = '' //该条数据的订单ID
  private ruleValidateRule: any = {
    warehousingDate: [{required: true, message: '请选入库日期', trigger: 'change', type: 'date'}],
    odometer: [{ required: true, message: '请填写里程表', trigger: 'change' }],
    warehousingSituation: [{required: true, message: '请选择车况', trigger: 'change', type: 'number'}],
    placingTypeId: [{required: true, message: '请选择停放状态', trigger: 'change', type: 'number'}]
  }
  private fileNumberList:any = 0

  created() {
    this.getCheckboxList()
  }
  /**
   * 获取入库信息
   */
  getInventoryData(row) {
    this.id = row.warehousingId
    this.assessMentPlacingService
      .findWarehousingInfoByWarehousingId({ warehousingId: row.warehousingId })
      .subscribe(
        data => {
          this.mortgageInventoryModel.applyId = data.applyId
          this.mortgageInventoryModel.modelofcar = data.assessmentPlacingApplyModel.brandName + data.assessmentPlacingApplyModel.seriesName + data.assessmentPlacingApplyModel.carName
          this.mortgageInventoryModel.carColor = data.assessmentPlacingApplyModel.carColor
          this.mortgageInventoryModel.city = !!data.assessmentPlacingApplyModel.city ? CityService.getCityName(Number(data.assessmentPlacingApplyModel.city)) : ''
          this.mortgageInventoryModel.carNo = data.carNo
          this.mortgageInventoryModel.frameNo = data.assessmentPlacingApplyModel.frameNo
          this.mortgageInventoryModel.engineNo = data.assessmentPlacingApplyModel.engineNo
          this.mortgageInventoryModel.cardsDate = FilterService.dateFormat(data.cardsDate, 'yyyy-MM-dd')
          this.mortgageInventoryModel.carSource = data.carSource
        }, ({ msg }) => {
          this.$Message.error(msg)
        })
    }
  /**
   * 获取下拉框多选框数据
   */
  getCheckboxList() {
    this.assessMentPlacingService.findAllAssessmentPlacingType().subscribe(
      data => {
        this.parkingState = data
        for (let i in this.parkingState) {
          this.status[this.parkingState[i].parkeStatus].push(this.parkingState[i])
        }
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
  }
  /**
   * 停放状态下拉框点击事件
   */
  haltState(val) {
    if (val == 1223) {
      this.parkingStateShow = this.status[1]
    } else if (val == 1224) {
      this.parkingStateShow = this.status[2]
    } else if (val == 1225) {
      this.parkingStateShow = this.status[3]
    } else if (val == 1226) {
      this.parkingStateShow = this.status[4]
    } else if (val == 1227) {
      this.parkingStateShow = this.status[5]
    } else {
      this.parkingStateShow = []
    }
  }
  /**
   * 入库点击确定
   */
  sendInventoryData() {
    let form = <Form>this.$refs['form-item']
    form.validate(valid => {
      if (!valid) return false
    this.mortgageInventoryModel.applyId =  this.mortgageInventoryModel.applyId
    this.mortgageInventoryModel.assessmentPlacingFileList = this.fodderList
    this.assessmentPlacingTypeValueModelList[0].placingTypeId = this.mortgageInventoryModel.placingTypeId
    this.assessmentPlacingTypeValueModelList[0].placingTypeValue= this.mortgageInventoryModel.fee
    this.mortgageInventoryModel.assessmentPlacingTypeValueModelList = this.assessmentPlacingTypeValueModelList
    this.mortgageInventoryModel.id = this.id
    delete this.mortgageInventoryModel.modelofcar
    delete this.mortgageInventoryModel.carColor
    delete this.mortgageInventoryModel.city
    delete this.mortgageInventoryModel.carNoShow
    delete this.mortgageInventoryModel.frameNo
    delete this.mortgageInventoryModel.engineNo
    delete this.mortgageInventoryModel.carSource
    delete this.mortgageInventoryModel.placingTypeId
    delete this.mortgageInventoryModel.fee
    if(!this.mortgageInventoryModel.fee){
      this.$Message.error('请选择措施内容')
      return
    }
      this.assessMentPlacingService
        .createWarehousingOrder(this.mortgageInventoryModel)
        .subscribe(
          data => {
            this.$Message.success('保存成功！')
            this.$emit('close')
            let productForm = this.$refs["form-item"] as Form;
            productForm.resetFields();
            let uploadVoucher = this.$refs['upload-voucher'] as UploadVoucher
            uploadVoucher.reset()
          }, ({ msg }) => {
            this.$Message.error(msg)
          }
        )
    })
  }
  /**
   * 关闭弹窗清空数据
   */
  resetClose(){
    let restoreDatas = <Form>this.$refs["form-item"];
    restoreDatas.resetFields(); 
    this.mortgageInventoryModel.warehousingDesc='' 
  }


  /**
   *  返回上传文件列
   */
  fileNumber(item) {
    this.fodderList = item.map(v => {
      return {
        materialUrl:v.materialUrl,
        materialType: 1228
      }
    })
    this.fileNumberList = item.length
  }
}
</script>



<style lang="less" scoped>
.component.mortgage-inventory {
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
}
</style>
<style lang="less">
.textbox.ivu-input-wrapper.ivu-input-type {
  width: 480px !important;
}
</style>
