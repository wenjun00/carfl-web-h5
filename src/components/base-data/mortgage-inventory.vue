<!--抵押入库 入库-->
<template>  
    <section class="component mortgage-inventory">
        <i-form :rules="ruleValidateRule" :model="mortgageInventoryModel" ref="form-item">
            <!-- 车辆信息 -->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">车辆基本信息</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="所选车辆" :label-width="90">
                        <i-input v-model="mortgageInventoryModel.modelofcar" readonly></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="车身颜色" :label-width="90">
                        <i-input readonly v-model="mortgageInventoryModel.carColor"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="上牌城市" :label-width="90">
                        <i-input readonly v-model="mortgageInventoryModel.city"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="车牌号码" :label-width="90">
                        <i-input readonly v-model="mortgageInventoryModel.carNoShow"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="车架号" :label-width="90">
                        <i-input readonly v-model="mortgageInventoryModel.frameNo"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="发动机号" :label-width="90">
                        <i-input readonly v-model="mortgageInventoryModel.engineNo "></i-input>
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
                    <i-form-item label="车辆隶属" :label-width="90">
                        <i-input v-model="mortgageInventoryModel.carSubjection" placeholder="请填写车辆隶属"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="车辆来源" :label-width="90">
                        <i-input readonly v-model="mortgageInventoryModel.carSource"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="牌照号码" :label-width="90">
                        <i-input placeholder="请填写牌照号码" v-model="mortgageInventoryModel.carNo"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="上牌日期" :label-width="90">
                        <i-date-picker v-model="mortgageInventoryModel.cardsDate" type="date" placeholder="请填写上牌日期"></i-date-picker>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="入库日期" :label-width="90" prop="warehousingDate">
                        <i-date-picker v-model="mortgageInventoryModel.warehousingDate" type="date" placeholder="请填写入库日期"></i-date-picker>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="里程表值" :label-width="90" prop="odometer">
                        <i-input v-model="mortgageInventoryModel.odometer" placeholder="请填写里程表"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="车况" :label-width="90" prop="warehousingSituation">
                        <i-select placeholder="请选择车况" v-model="mortgageInventoryModel.warehousingSituation">
                            <i-option v-for="{value,label} in $dict.getDictData('0445')" :key="value" :label="label" :value="value"></i-option>
                        </i-select>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="登记人" :label-width="90">
                        <i-input placeholder="请选填写登记人" v-model="mortgageInventoryModel.warehousingPerson"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="16">
                    <i-form-item label="车况说明" :label-width="90">
                        <i-input v-model="mortgageInventoryModel.carWarehousingExplain" class="textbox" type="textarea"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col>
                    <i-form-item label="停放状态" :label-width="90" prop="placingTypeId">
                        <i-select placeholder="请选择停放状态" @on-change="haltState" v-model="mortgageInventoryModel.placingTypeId">
                            <i-option v-for="{value,label} in $dict.getDictData('0451')" :key="value" :label="label" :value="value"></i-option>
                        </i-select>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col>
                    <i-form-item label="措施内容" :label-width="90">
                        <i-checkbox-group v-model="mortgageInventoryModel.fee">
                            <i-checkbox v-for="item in parkingStateShow" :key="item.id" :label="item.parkeAttr" :value="item.id">
                            </i-checkbox>
                        </i-checkbox-group>
                    </i-form-item>

                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="16">
                    <i-form-item label="情况描述" :label-width="90">
                        <i-input class="textbox" v-model="mortgageInventoryModel.warehousingDesc" type="textarea"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <!-- 文件数量-->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">文件数量</a>
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
import { Prop } from 'vue-property-decorator'
import { Dependencies } from '~/core/decorator'
import { FormatInputPathObject } from 'path'
import { FilterService } from '~/utils/filter.service'
import { Form } from 'iview'
import UploadVoucher from '~/components/common/upload-voucher.vue'
import { AssessMentPlacingService } from '~/services/manage-service/assess-ment-placing.service'
import { CityService } from '~/utils/city.service'
@Component({
  components: {
    UploadVoucher
  }
})
export default class addPeople extends Vue {
  @Dependencies(AssessMentPlacingService)
  private assessMentPlacingService: AssessMentPlacingService
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
    assessmentPlacingTypeValueList:[ {
      placingId: '',
      placingTypeId: '',
      placingTypeValue: ''
    }]
  }
  private parkingStateShow: any = []
  private parkingState: any = []
  private status: any = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
  }


  private ruleValidateRule: any = {
    warehousingDate: [
      {
        required: true,
        message: '请选入库日期',
        trigger: 'change',
        type: 'date'
      }
    ],
    odometer: [{ required: true, message: '请填写里程表', trigger: 'change' }],
    warehousingSituation: [
      {
        required: true,
        message: '请选择车况',
        trigger: 'change',
        type: 'number'
      }
    ],
    placingTypeId: [
      {
        required: true,
        message: '请选择停放状态',
        trigger: 'change',
        type: 'number'
      }
    ]
  }
  /**
   * 获取入库信息
   */
  getInventoryData(row) {
      this.$common.reset(this.mortgageInventoryModel);
      this.mortgageInventoryModel.warehousingDate =''         
      this.mortgageInventoryModel.cardsDate= ''      
      this.mortgageInventoryModel.warehousingSituation = ''  
    //   this.mortgageInventoryModel.placingTypeId = ''           
    this.assessMentPlacingService
      .findWarehousingInfoByWarehousingId({ warehousingId: row.warehousingId })
      .subscribe(
        data => {
          this.mortgageInventoryModel.applyId = data.applyId
          this.mortgageInventoryModel.modelofcar =
            data.assessmentPlacingApplyModel.brandName +
            data.assessmentPlacingApplyModel.seriesName +
            data.assessmentPlacingApplyModel.carName
          this.mortgageInventoryModel.carColor =
            data.assessmentPlacingApplyModel.carColor
          this.mortgageInventoryModel.city = !!data.assessmentPlacingApplyModel
            .city
            ? CityService.getCityName(
                Number(data.assessmentPlacingApplyModel.city)
              )
            : ''
          this.mortgageInventoryModel.carNoShow =
            data.assessmentPlacingApplyModel.carNo
          this.mortgageInventoryModel.frameNo =
            data.assessmentPlacingApplyModel.frameNo
          this.mortgageInventoryModel.engineNo =
            data.assessmentPlacingApplyModel.engineNo
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
  /**
   * 获取下拉框多选框数据
   */
  getCheckboxList() {
    this.assessMentPlacingService.findAllAssessmentPlacingType().subscribe(
      data => {
        this.parkingState = data
        this.status = {
          1: [],
          2: [],
          3: [],
          4: [],
          5: []
        }
        for (let i in this.parkingState) {
          this.status[this.parkingState[i].parkeStatus].push(
            this.parkingState[i]
          )
        }
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
    )
  }

  /**
   * 停放状态下拉框点击事件
   */
  haltState(a) {
    if (a == 1223) {
      this.parkingStateShow = this.status[1]
    } else if (a == 1224) {
      this.parkingStateShow = this.status[2]
    } else if (a == 1225) {
      this.parkingStateShow = this.status[3]
    } else if (a == 1226) {
      this.parkingStateShow = this.status[4]
    } else if (a == 1227) {
      this.parkingStateShow = this.status[5]
    } else {
      this.parkingStateShow = []
    }
  }

  /**
   * 入库点击确定
   */
  sendInventoryData() {
    this.mortgageInventoryModel.applyId =  this.mortgageInventoryModel.applyId
    // this.mortgageInventoryModel.assessmentPlacingTypeValueList[0].placingTypeId = this.mortgageInventoryModel.placingTypeId
    this.mortgageInventoryModel.carBasicFileList = this.fodderList
    delete this.mortgageInventoryModel.modelofcar
    delete this.mortgageInventoryModel.carColor
    delete this.mortgageInventoryModel.city
    delete this.mortgageInventoryModel.carNoShow
    delete this.mortgageInventoryModel.frameNo
    delete this.mortgageInventoryModel.engineNo

    let form = <Form>this.$refs['form-item']
    form.validate(valid => {
      if (!valid) return false
      this.assessMentPlacingService
        .createWarehousingOrder(this.mortgageInventoryModel)
        .subscribe(
          data => {
            this.$Message.success('保存成功！')
            this.$emit('close')
            let uploadVoucher = this.$refs['upload-voucher'] as UploadVoucher
            uploadVoucher.reset()
          },
          ({ msg }) => {
            this.$Message.error(msg)
          }
        )
    })
  }
 /**
     *  返回上传文件列
     */
    fileNumber(item) {
      this.fodderList = item;
    }

  mounted() {
    this.getCheckboxList()
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
