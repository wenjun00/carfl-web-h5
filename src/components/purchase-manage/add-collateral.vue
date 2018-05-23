<template>
  <section class="component add-collateral">

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
    <i-form :rules="ruleValidateRule" :model="customerModel" ref="form-item" :label-width="90">
      <i-row type="flex" :gutter="8">
        <i-col :span="12">
          <i-form-item label="出厂日期" prop="factoryTime">
            <i-date-picker type="date" placeholder="出厂日期" v-model="customerModel.factoryTime" :editable="false"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="初登日期" prop="firstTime">
            <i-date-picker type="date" placeholder="初登日期" v-model="customerModel.firstTime" :editable="false" :disabled="!customerModel.factoryTime"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="行驶里程" prop="mileage">
            <i-input v-model="customerModel.mileage" :maxlength="6"></i-input>
            <span>公里</span>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="行驶证号" prop="drivingNo">
            <i-input v-model="customerModel.drivingNo" :maxlength="18"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="过户次数" prop="transferNo">
            <i-input-number v-model="customerModel.transferNo" :min="0" :max="20"></i-input-number>
            <span>次</span>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="车辆用途" prop="carPurpose">
            <i-select v-model="customerModel.carPurpose">
              <i-option v-for="{value,label} in $dict.getDictData('0447')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="变速箱形式" prop="transmission">
            <i-select v-model="customerModel.transmission">
              <i-option v-for="{value,label} in $dict.getDictData('0448')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="驱动形式" prop="driver">
            <i-select v-model="customerModel.driver">
              <i-option v-for="{value,label} in $dict.getDictData('0449')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="排量" prop="displacement">
            <i-input v-model="customerModel.displacement" :maxlength="3"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-collapse v-model="currentPanel" accordion>
        <i-panel name="1">
          外观
          <template slot="content">
            <add-collateral-option v-model="appearance"></add-collateral-option>
          </template>
        </i-panel>
        <i-panel name="2">
          内饰检测
          <template slot="content">
            <add-collateral-option v-model="interiorInspection"></add-collateral-option>
          </template>
        </i-panel>
        <i-panel name="3">
          机舱/底盘
          <template slot="content">
            <add-collateral-option v-model="engineRoom"></add-collateral-option>
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
            <i-select v-model="customerModel.carSituation">
              <i-option v-for="{value,label} in $dict.getDictData('0450')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="估价" prop="evaluation">
            <i-input-number v-model="customerModel.evaluation" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse" :min="0" :max="99999999"></i-input-number>
            <span>元</span>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="备注">
            <i-input type="textarea" class="large-input" v-model="customerModel.remarks" :rows="1"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <div class="item-group">
        <span class="item-title"></span>
        <span class="information">附件信息</span>
      </div>
      <i-row>
        <i-col>
          <upload-voucher ref="upload-voucher" @financeUploadResources="fileNumber"></upload-voucher>
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
export default class AddCollateral extends Vue {
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
  private ruleValidateRule: any = {
    factoryTime: [{ required: true, message: "请选择出厂日期", trigger: "change", type: 'date' }],
    firstTime: { required: true, validator: this.validatorfirstTime, trigger: 'change' },
    mileage: [
      { required: true, message: "请输入行驶里程", trigger: "blur" },
      { pattern: /^[1-9]\d*$/g, message: "行驶里程不能为小数", trigger: "blur" }],
    drivingNo: [
      { required: true, message: "请输入行驶证号", trigger: "blur" },
      { type: 'string', min: 18, max: 18, message: "请输入18位行驶证号", trigger: "blur" }],
    transferNo: { required: true, message: "请输入过户次数", trigger: "change", type: 'number' },
    carPurpose: [{ required: true, message: "请选择车辆用途", trigger: "change", type: 'number' }],
    transmission: [{ required: true, message: "请选择形式", trigger: "change", type: 'number' }],
    driver: [{ required: true, message: "请选择驱动形式", trigger: "change", type: 'number' }],
    displacement: [
      { required: true, message: "请输入排量", trigger: "blur" },
      { type: 'string', max: 3, message: "排量不能超过3位", trigger: "blur" }],
    carSituation: [{ required: true, message: "请选择车况", trigger: 'change', type: 'number' }],
    evaluation: { required: true, message: "请输入估价", trigger: 'change', type: 'number' }
  }


  /**
   * 初次登记日期校验
   */
  private validatorfirstTime(rule, value, callback) {
    if (!value) {
      callback(new Error('请选择初登日期'))
    } else {
      let startDate = this.customerModel.factoryTime
      if (value <= startDate) {
        callback(new Error('初登日期不能早于出厂日期'))
      } else {
        callback()
      }
    }
  }


  /**
   *
   * @param 查询评估信息
   */
  getBrash() {
    this.assessMentApplyService.beginOrderAssess({ assessmentNo: this.assessmentNo })
      .subscribe(data => {
        // console.log(data)
        this.appearance = data.basicList[0].carAttrList.filter(v => v.attrType === 1).map(x => ({
          attrName: x.attrName,
          attrType: x.attrType,
          attrValue: 2,
          attrCode: x.attrCode
        }))
        this.interiorInspection = data.basicList[0].carAttrList.filter(v => v.attrType === 2).map(x => ({
          attrName: x.attrName,
          attrType: x.attrType,
          attrValue: 2,
          attrCode: x.attrCode
        }))
        this.engineRoom = data.basicList[0].carAttrList.filter(v => v.attrType === 3).map(x => ({
          attrName: x.attrName,
          attrType: x.attrType,
          attrValue: 2,
          attrCode: x.attrCode
        }))

        // 只显示 所以不用下拉框组件，节省UI性能
        this.tempShowModel.city = this.$city.getCityName(data.city)
        this.tempShowModel.province = this.$city.getCityName(data.province)

        this.customerModel.carColor = data.carColor
        this.customerModel.carNo = data.carNo;
        this.customerModel.engineNo = data.engineNo
        this.customerModel.ownerName = data.ownerName
        this.customerModel.frameNo = data.frameNo
        this.customerModel.ownPhone = data.ownPhone
        this.customerModel.idCard = data.idCard
        this.customerModel.carAllName = data.applyCars[0].carAllName

        this.submitModel = data
        this.submitModel.assessmentStatus = 1191 //保存是案件状态变更1191
      }, err => this.$Message.error(err.msg))
  }
  /**
   *  确定新增评估
   */
  trueAssessment() {
    return new Promise((resolve, reject) => {
      let form = this.$refs['form-item'] as any
      form.validate(valid => {
        if (!valid) return reject()
        this.customerModel.carAttrList = this.appearance.concat(this.interiorInspection).concat(this.engineRoom)
        this.customerModel.carBasicFileList = this.fodderList

        // 删除原来的basicList
        delete this.submitModel.basicList
        // 转换时间
        let firstTime = this.$filter.dateFormat(this.customerModel.firstTime)
        let factoryTime = this.$filter.dateFormat(this.customerModel.factoryTime)
        // 增加现有数据model
        this.submitModel.assessmentBasicModel = Object.assign(this.customerModel, { firstTime: firstTime, factoryTime: factoryTime })
        this.assessMentApplyService.saveAssessmentBasicInfo(this.submitModel)
          .subscribe(data => {
            this.$Message.success("保存成功！")
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
    this.fodderList = item;
  }
  /**
   *  取消评估
   */
  cancelAssessment() {
    return new Promise((resolve, reject) => {
      this.$Modal.confirm({
        title: '提示',
        content: '是否确定不再进行当前评估？',
        onOk: () => {
          this.assessMentApplyService.terminationStatus({ orderId: this.row.id, status: this.row.assessmentStatus })
            .subscribe(data => {
              this.$Message.success("终止评估成功！")
              resolve()
            }, ({ msg }) => {
              this.$Message.error(msg)
              reject()
            })
        }
      })
    })
  }
  /**
   *  退件
   */
  backSerice() {
    return new Promise((resolve, reject) => {
      this.$Modal.confirm({
        title: '提示',
        content: '是否将订单返回修改？再次提交后将继续由您进行评估。',
        onOk: () => {
          this.assessMentApplyService.backPieceStatus({ orderId: this.row.id, status: this.row.assessmentStatus })
            .subscribe(data => {
              this.$Message.success("退件成功！")
              resolve()
            }, ({ msg }) => {
              this.$Message.error(msg)
              reject()
            })
        }
      })
    })
  }

  mounted() {
    this.getBrash()
  }

}
</script>

<style lang="less" scoped>
.component.add-collateral {
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
.component.add-collateral {
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

