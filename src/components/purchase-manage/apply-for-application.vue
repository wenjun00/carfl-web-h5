<!--查看申请-->
<template>
  <section class="component for-application">
      <i-form :model="detailsModel">
            <i-row>
                <i-col :span="24">
                    <i-form-item label="所选车辆" prop="selectedVehicles">
                        <i-input readonly v-model="selectedVehicles"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
           <i-row>
                <i-col :span="12">
                    <i-form-item label="上牌城市" prop="city">
                        <i-input readonly v-model="detailsModel.city"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="12" :push="1">
                    <i-form-item label="车身颜色" prop="carColor">
                         <i-input readonly v-model="detailsModel.carColor"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
             <i-row>
                <i-col :span="12">
                    <i-form-item label="发动机号" prop="engineNo">
                        <i-input readonly v-model="detailsModel.engineNo"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="12" :push="1">
                    <i-form-item label="车牌号码" prop="carNo">
                         <i-input readonly v-model="detailsModel.carNo"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
             <i-row>
                <i-col :span="12">
                    <i-form-item label="车架号码" prop="frameNo">
                        <i-input readonly v-model="detailsModel.frameNo"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="12" :push="1">
                    <i-form-item label="客户姓名" prop="ownerName">
                         <i-input readonly v-model="detailsModel.ownerName"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
             <i-row>
                <i-col :span="12">
                    <i-form-item label="证件号码" prop="idCard">
                        <i-input readonly v-model="detailsModel.idCard"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="12" :push="1">
                    <i-form-item label="手机号码" prop="ownPhone">
                         <i-input readonly v-model="detailsModel.ownPhone"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
        </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { FormatInputPathObject } from "path";
import { AssessMentApplyService } from '~/services/manage-service/assess-ment-apply.service'
import { FilterService } from '~/utils/filter.service'
import { CityService } from '~/utils/city.service'
import { Form } from "iview";
@Component({
  components: {}
})
export default class addPeople extends Vue {
  @Dependencies(AssessMentApplyService)
  private assessMentApplyService: AssessMentApplyService
  private selectedVehicles:String = ''
   private detailsModel:any = {
       applyCars:{},      // 所选车辆
       city: '',            // 上牌城市
       carColor:'',        // 车身颜色
       engineNo:'',        // 发动机号
       carNo:'',           // 车牌号码
       frameNo:'',         // 车架号码
       ownerName:'',       // 客户姓名
       idCard:'',          // 证件号码
       ownPhone:'',        // 手机号码
    }

  /**
   * 获取评估申请查看详情
   */
  getApplicationDetail(row) {
    this.assessMentApplyService.findOrderInfoByOrderNumber(row.assessmentNo)
    .subscribe(
        data => {
          this.detailsModel.applyCars = data.applyCars ? data.applyCars : ''
          this.selectedVehicles = this.detailsModel.applyCars[0].brandName + this.detailsModel.applyCars[0].carModel+ this.detailsModel.applyCars[0].carParam
          this.detailsModel.carColor = !!data.carColor? data.carColor : ''
          this.detailsModel.engineNo = !!data.engineNo? data.engineNo : ''
          this.detailsModel.carNo = !!data.carNo? data.carNo : ''
          this.detailsModel.frameNo = !!data.frameNo? data.frameNo : ''
          this.detailsModel.ownerName = !!data.ownerName? data.ownerName : ''
          this.detailsModel.idCard = !!data.idCard? data.idCard : ''
          this.detailsModel.ownPhone = !!data.ownPhone? data.ownPhone : ''
          this.detailsModel.city = !!data.city? CityService.getCityName(Number(data.city)):''
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
}
</script>
