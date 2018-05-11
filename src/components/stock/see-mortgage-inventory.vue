<!--抵押入库 查看-->
<template>
  <section class="component see-mortgage-inventory">
    <i-form :model="mortgageInventoryModel" :label-width="90">
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
            <i-input v-model="mortgageInventoryModel.modelofcar" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车身颜色">
            <i-input v-model="mortgageInventoryModel.carColor" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="上牌城市">
            <i-input v-model="mortgageInventoryModel.city" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车牌号码">
            <i-input v-model="mortgageInventoryModel.carNo" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车架号">
            <i-input v-model="mortgageInventoryModel.frameNo" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="发动机号">
            <i-input v-model="mortgageInventoryModel.engineNo" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="初登日期">
            <i-date-picker v-model="mortgageInventoryModel.cardsDate" type="date" readonly></i-date-picker>
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
          <i-form-item label="车辆隶属">
            <i-input v-model="mortgageInventoryModel.carSubjection" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车辆来源">
            <i-input v-model="mortgageInventoryModel.carSource" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="入库日期" prop="warehousingDate">
            <i-date-picker v-model="mortgageInventoryModel.warehousingDate" type="date" readonly></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="里程表值" prop="odometer">
            <i-input v-model="mortgageInventoryModel.odometer" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车况" prop="warehousingSituation">
            <i-select v-model="mortgageInventoryModel.warehousingSituation" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0445')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="登记人">
            <i-input v-model="mortgageInventoryModel.warehousingPerson" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="车况说明">
            <i-input v-model="mortgageInventoryModel.carWarehousingExplain" class="textbox" type="textarea" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="停放状态">
            <i-select placeholder="请选择停放状态" v-model="mortgageInventoryModel.fee" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0451')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="措施内容">
            <i-checkbox-group v-model="cuoContent">
              <i-checkbox v-for="item in content" :key="item.id" :label="item.placingTypeValue" :value="item.id" disabled></i-checkbox>
            </i-checkbox-group>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="情况描述">
            <i-input class="textbox" v-model="mortgageInventoryModel.warehousingDesc" type="textarea" readonly></i-input>
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
      <i-row type="flex" :gutter="16">
        <i-col :span="24">
          <upload-voucher ref="upload-voucher" hiddenUpload hiddenDelete></upload-voucher>
        </i-col>
      </i-row>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { Watch, Prop } from 'vue-property-decorator';
import { Form } from 'iview'
import UploadVoucher from "~/components/common/upload-voucher.vue"
import { AssessMentPlacingService } from '~/services/manage-service/assess-ment-placing.service'
@Component({
  components: {
    UploadVoucher
  }
})
export default class SeeMortgageInventory extends Vue {
  @Dependencies(AssessMentPlacingService) private assessMentPlacingService: AssessMentPlacingService

  @Prop({
    required: true,
    type: Number
  })
  id;

  @Watch('id', { immediate: true })
  onIdChange() {
    this.acquireInventoryData()
  }

  private content: any = []
  private cuoContent: any = []
  private mortgageInventoryModel: any = {
    warehousingSituation: '',
    warehousingDate: '',
    cardsDate: '',
    carColor: '',
    city: '',
    carNo: '',
    frameNo: '',
    engineNo: '',
    modelofcar: '',
    fee: [],
  }

  /**
   * 获取入库信息
   */
  acquireInventoryData() {
    this.assessMentPlacingService.findWarehousingInfoByWarehousingId({ warehousingId: this.id })
      .subscribe(data => {
        // this.mortgageInventoryModel = data
        this.mortgageInventoryModel.modelofcar = data.assessmentPlacingApplyModel.brandName + data.assessmentPlacingApplyModel.seriesName + data.assessmentPlacingApplyModel.carName
        this.mortgageInventoryModel.carColor = data.assessmentPlacingApplyModel.carColor
        this.mortgageInventoryModel.city = this.$city.getCityName((data.assessmentPlacingApplyModel || {}).city)
        this.mortgageInventoryModel.frameNo = data.assessmentPlacingApplyModel.frameNo
        this.mortgageInventoryModel.engineNo = data.assessmentPlacingApplyModel.engineNo
        this.mortgageInventoryModel.cardsDate = this.$filter.dateFormat(data.cardsDate, 'yyyy-MM-dd')
        this.mortgageInventoryModel.carSubjection = data.carSubjection
        this.mortgageInventoryModel.carNo = data.carNo
        this.mortgageInventoryModel.odometer = data.odometer
        this.mortgageInventoryModel.warehousingSituation = data.warehousingSituation
        this.mortgageInventoryModel.warehousingPerson = data.warehousingPerson
        this.mortgageInventoryModel.carWarehousingExplain = data.carWarehousingExplain
        this.mortgageInventoryModel.warehousingDesc = data.warehousingDesc
        this.mortgageInventoryModel.carSource = data.carSource
        this.mortgageInventoryModel.warehousingDate = data.warehousingDate
        this.content = data.assessmentPlacingTypeValueList
        this.mortgageInventoryModel.fee = data.assessmentPlacingTypeValueList.find(v => v.placingTypeId).placingTypeId
        this.cuoContent = data.assessmentPlacingTypeValueList.map(x => x.placingTypeValue)
        let uploadVoucher = this.$refs['upload-voucher'] as UploadVoucher
        uploadVoucher.Reverse(data.assessmentPlacingFileList)
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
  }

}
</script>



<style lang="less" scoped>
.component.see-mortgage-inventory {
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
}
</style>
<style lang="less">
.textbox.ivu-input-wrapper.ivu-input-type {
  width: 550px;
}
</style>
