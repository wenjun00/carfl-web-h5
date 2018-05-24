<template>
  <section class="component add-collateral-details">

    <div class="item-group">
      <span class="item-title"></span>
      <span class="information">押品基础信息</span>
    </div>
    <data-grid :labelWidth="90" labelAlign="right" contentAlign="left">
      <data-grid-item label="客户姓名" :span="4">{{customerModel.ownerName}}</data-grid-item>
      <data-grid-item label="手机号码" :span="4">{{customerModel.ownPhone}}</data-grid-item>
      <data-grid-item label="证件号码" :span="4">{{customerModel.idCard}}</data-grid-item>
      <data-grid-item label="所选车辆" :span="4">{{customerModel.carAllName}}</data-grid-item>
      <data-grid-item label="车身颜色" :span="4">{{customerModel.carColor}}</data-grid-item>
      <data-grid-item label="车牌号码" :span="4">{{customerModel.carNo}}</data-grid-item>
      <data-grid-item label="车牌归属" :span="4">{{`${tempShowModel.province} ${tempShowModel.city}`}}</data-grid-item>
      <data-grid-item label="发动机号" :span="4">{{customerModel.engineNo}}</data-grid-item>
      <data-grid-item label="车架号" :span="4">{{customerModel.frameNo}}</data-grid-item>
    </data-grid>

    <!-- <span>选购信息</span> -->
    <div class="item-group">
      <span class="item-title"></span>
      <span class="information">选购信息</span>
    </div>
    <i-form :model="customerModel" ref="form-item" :label-width="90">
      <i-row type="flex" :gutter="8">
        <i-col :span="12">
          <i-form-item label="出厂日期" prop="factoryTime">
            <i-date-picker type="date" placeholder="出厂日期" v-model="customerModel.factoryTime" readonly></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="初登日期" prop="firstTime">
            <i-date-picker type="date" placeholder="初登日期" v-model="customerModel.firstTime" readonly></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="行驶里程" prop="mileage">
            <i-input v-model="customerModel.mileage" readonly></i-input>
            <span>公里</span>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="行驶证号" prop="drivingNo">
            <i-input v-model="customerModel.drivingNo" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="过户次数" prop="transferNo">
            <i-input-number v-model="customerModel.transferNo" readonly></i-input-number>
            <span>次</span>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车辆用途" prop="carPurpose">
            <i-select v-model="customerModel.carPurpose" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0447')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="变速箱形式" prop="transmission">
            <i-select v-model="customerModel.transmission" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0448')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="驱动形式" prop="driver">
            <i-select v-model="customerModel.driver" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0449')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="排量" prop="displacement">
            <i-input v-model="customerModel.displacement" readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-collapse v-model="currentPanel" accordion>
        <i-panel name="1">
          外观
          <template slot="content">
            <add-collateral-option v-model="appearance" disabled></add-collateral-option>
          </template>
        </i-panel>
        <i-panel name="2">
          内饰检测
          <template slot="content">
            <add-collateral-option v-model="interiorInspection" disabled></add-collateral-option>
          </template>
        </i-panel>
        <i-panel name="3">
          机舱/底盘
          <template slot="content">
            <add-collateral-option v-model="engineRoom" disabled></add-collateral-option>
          </template>
        </i-panel>
      </i-collapse>

      <!-- <span>评估结果</span> -->
      <div class="item-group">
        <span class="item-title"></span>
        <span class="information">评估结果</span>
      </div>
      <i-row type="flex" :gutter="8">
        <i-col :span="12">
          <i-form-item label="车况" prop="carSituation">
            <i-select v-model="customerModel.carSituation" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0450')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="估价" prop="evaluation">
            <i-input v-model="customerModel.evaluation" readonly></i-input>
            <span>元</span>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="备注">
            <i-input type="textarea" class="large-input" v-model="customerModel.remarks" :rows="1" readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <div class="item-group">
        <span class="item-title"></span>
        <span class="information">附件信息</span>
      </div>
      <i-row>
        <i-col>
          <upload-voucher ref="upload-voucher" hiddenUpload hiddenDelete></upload-voucher>
        </i-col>
      </i-row>

    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Dependencies } from '~/core/decorator'
import Component from "vue-class-component";
import { Emit, Prop } from "vue-property-decorator";
import { AssessMentApplyService } from "~/services/manage-service/assess-ment-apply.service";
import UploadVoucher from "~/components/common/upload-voucher.vue"
import { Form } from 'iview'
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import AddCollateralOption from "~/components/purchase-manage/add-collateral-option.vue";

@Component({
  components: {
    UploadVoucher,
    DataGrid,
    DataGridItem,
    AddCollateralOption
  }
})
export default class AddCollateralDetails extends Vue {
  @Dependencies(AssessMentApplyService) private assessMentApplyService: AssessMentApplyService

  @Prop()
  assessmentNo

  private currentPanel: string = "1"
  private submitModel: any = {}

  private tempShowModel = {
    city: '',
    province: ''
  }


  private customerModel: any = {
    firstTime: '',
    factoryTime: '',
    mileage: '',
    drivingNo: '',
    transferNo: null,
    carPurpose: "",
    transmission: "",
    driver: "",
    displacement: '',
    carSituation: "",
    evaluation: null,
    remarks: '',
    carColor: '',
    carNo: '',
    engineNo: '',
    ownerName: '',
    frameNo: '',
    ownPhone: '',
    idCard: '',
    carAllName: '',
    carAttrList: [],
    carFileList: []
  }
  private basicList: any = [{}]
  private fodderList: any = [] //上传文件列
  private appearance: any = [] //得到评估外观数据
  private interiorInspection: any = [] //得到评估内饰检验数据
  private engineRoom: any = [] //得到评估机舱底盘数据
  private row: any = [] //父组件传的值
  private carInformation: any = '' //所选车辆



  /**
   *
   * @param 查询评估信息
   */
  getBrash() {
    this.assessMentApplyService.findBasicInfoByOrderNumber({ assessmentNo: this.assessmentNo })
      .subscribe(data => {
        this.tempShowModel.city = this.$city.getCityName(Number(data.city))
        this.tempShowModel.province = this.$city.getCityName(Number(data.province))

        this.customerModel.carColor = data.carColor
        this.customerModel.carNo = data.carNo
        this.customerModel.engineNo = data.engineNo
        this.customerModel.ownerName = data.ownerName
        this.customerModel.frameNo = data.frameNo
        this.customerModel.ownPhone = data.ownPhone
        this.customerModel.idCard = data.idCard
        this.customerModel.carAllName = data.applyCars[0].carAllName
        this.customerModel.firstTime = this.$filter.dateFormat(data.basicList[0].firstTime, 'yyyy-MM-dd')
        this.customerModel.factoryTime = this.$filter.dateFormat(data.basicList[0].factoryTime, 'yyyy-MM-dd')
        this.customerModel.mileage = data.basicList[0].mileage
        this.customerModel.drivingNo = data.basicList[0].drivingNo
        this.customerModel.transferNo = data.basicList[0].transferNo
        this.customerModel.carPurpose = data.basicList[0].carPurpose
        this.customerModel.transmission = data.basicList[0].transmission
        this.customerModel.driver = data.basicList[0].driver
        this.customerModel.displacement = data.basicList[0].displacement
        this.customerModel.carSituation = data.basicList[0].carSituation
        this.customerModel.evaluation = this.$filter.toThousands(data.basicList[0].evaluation)
        this.customerModel.remarks = data.basicList[0].remarks
        this.appearance = data.basicList[0].carAttrList.filter(v => v.attrType === 1).map(x => ({
          attrName: x.attrName,
          attrValue: Number(x.attrValue),
          attrCode: x.attrCode
        }))
        this.interiorInspection = data.basicList[0].carAttrList.filter(v => v.attrType === 2).map(x => ({
          attrName: x.attrName,
          attrValue: Number(x.attrValue),
          attrCode: x.attrCode
        }))
        this.engineRoom = data.basicList[0].carAttrList.filter(v => v.attrType === 3).map(x => ({
          attrName: x.attrName,
          attrValue: Number(x.attrValue),
          attrCode: x.attrCode
        }))
        let uploadVoucher = this.$refs['upload-voucher'] as UploadVoucher
        uploadVoucher.Reverse(data.basicList[0].carFileList)
      }, err => this.$Message.error(err.msg))
  }

  mounted() {
    this.getBrash()
  }

}
</script>

<style lang="less" scoped>
.component.add-collateral-details {
  .item-group {
    line-height: 25px;
    height: 25px;
    margin: 10px 0;
    .item-title {
      height: 25px;
      width: 7px;
      background: #265ea2;
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

<style lang="less" >
.component.add-collateral-details {
  .ivu-collapse-content,
  .ivu-collapse-content-box {
    padding: 0;
  }
  .ivu-form-item {
    .ivu-form-item-content {
      .large-input {
        width: 90%;
      }
    }
  }
}
</style>

