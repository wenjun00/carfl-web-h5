<template>
  <section class="component add-collateral">
    <!-- <span>选购信息</span> -->
    <i-row class="data-form">
      <i-col>
        <div class="data-form-item"></div>
        <a  class="information">选购信息</a>
      </i-col>
    </i-row>
    <i-form :rules="ruleValidateRule" :model="customerModel" ref="form-item">

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="所选车辆" :label-width="90">
            <i-input disabled v-model="carInformation"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="车身颜色"  :label-width="90">
            <i-input disabled v-model="customerModel.carColor"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="上牌城市" :label-width="90">
            <i-input disabled v-model="customerModel.city"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="车牌号码"  :label-width="90">
            <i-input disabled v-model="customerModel.carNo"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="发动机号" :label-width="90">
            <i-input disabled v-model="customerModel.engineNo"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="客户姓名"  :label-width="90">
            <i-input disabled v-model="customerModel.ownerName"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="车架号" :label-width="90">
            <i-input disabled v-model="customerModel.frameNo"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="手机号码"  :label-width="90">
            <i-input disabled v-model="customerModel.ownPhone"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="初登日期" prop="firstTime" :label-width="90">
            <i-date-picker type="date" placeholder="年/月/日" v-model="basicList[0].firstTime"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="证件号码"  :label-width="90">
            <i-input disabled v-model="customerModel.idCard"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="出厂日期" prop="factoryTime" :label-width="90">
            <i-date-picker type="date" placeholder="年/月/日" v-model="basicList[0].factoryTime"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="15">
          <i-form-item label="行驶里程" prop="mileage" :label-width="90" >
            <i-input  v-model="basicList[0].mileage"></i-input>
            <span>万公里</span>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="行驶证号" prop="drivingNo" :label-width="90">
            <i-input v-model="basicList[0].drivingNo"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="15">
          <i-form-item label="过户次数" prop="transferNo" :label-width="90">
            <i-input v-model="basicList[0].transferNo"></i-input>
            <span>次</span>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="车辆用途" prop="carPurpose" :label-width="90">
            <i-select v-model="basicList[0].carPurpose">
              <i-option v-for="{value,label} in $dict.getDictData('0447')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="变速箱形式" prop="transmission" :label-width="90">
            <i-select v-model="basicList[0].transmission">
              <i-option v-for="{value,label} in $dict.getDictData('0448')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="驱动形式" prop="driver" :label-width="90">
            <i-select v-model="basicList[0].driver">
              <i-option v-for="{value,label} in $dict.getDictData('0449')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="排量" prop="displacement" :label-width="90">
            <i-input v-model="basicList[0].displacement"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <!-- <span>外观</span> -->
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a  class="information">外观</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="85">
        <i-col v-for="item in appearance" :key="item.id">
          <i-form-item :label="item.attrName"  :label-width="90">
            <i-radio-group   v-model="item.attrValue">
              <i-radio :label="1">正常</i-radio>
              <i-radio :label="0">异常</i-radio>
            </i-radio-group>
          </i-form-item>
        </i-col>
      </i-row>

      <!-- <span>内饰检测</span> -->
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a  class="information">内饰检验</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="85">
        <i-col v-for="item in interiorInspection" :key="item.id">
          <i-form-item :label="item.attrName"  :label-width="90">
            <i-radio-group   v-model="item.attrValue">
              <i-radio :label="1">正常</i-radio>
              <i-radio :label="0">异常</i-radio>
            </i-radio-group>
          </i-form-item>
        </i-col>
      </i-row>

      <!-- <span>机舱/底盘</span> -->
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a  class="information">机舱/底盘</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="85">
        <i-col v-for="item in engineRoom" :key="item.id">
          <i-form-item :label="item.attrName"  :label-width="90">
            <i-radio-group   v-model="item.attrValue">
              <i-radio :label="1">正常</i-radio>
              <i-radio :label="0">异常</i-radio>
            </i-radio-group>
          </i-form-item>
        </i-col>
      </i-row>

      <!-- <span>评估结果</span> -->
      <i-row class="data-form">
        <i-col>
          <div class="data-form-item"></div>
          <a  class="information">评估结果</a>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="车况" prop="carSituation" :label-width="90">
            <i-select v-model="basicList[0].carSituation">
              <i-option v-for="{value,label} in $dict.getDictData('0450')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="15">
          <i-form-item label="估价" prop="evaluation" :label-width="90">
            <i-input v-model="basicList[0].evaluation"></i-input>
            <span>万元</span>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row>
        <i-col :span="24">
          <i-form-item label="备注" :label-width="90">
            <i-input type="textarea" v-model="basicList[0].remarks" :rows="4"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <upload-voucher  ref="upload-voucher" @financeUploadResources="fileNumber"></upload-voucher>
        </i-col>
      </i-row>

    </i-form>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import { Dependencies } from '~/core/decorator'
  import Component from "vue-class-component";
  import { AssessMentApplyService} from "~/services/manage-service/assess-ment-apply.service";
  import { CityService } from '~/utils/city.service'
  import UploadVoucher from "~/components/common/upload-voucher.vue"
  import { Form } from 'iview'

  @Component({
    components: {
      UploadVoucher
    }
  })
  export default class AddCollateral extends Vue {
    @Dependencies(AssessMentApplyService) private assessMentApplyService: AssessMentApplyService
    private customerModel: any = {
      basicList:'',

    };
    private basicList:any =[{}]
    private fodderList:any = [] //上传文件列
    private appearance :any = [] //得到评估外观数据
    private interiorInspection :any = [] //得到评估内饰检验数据
    private engineRoom :any = [] //得到评估机舱底盘数据
    private row:any = [] //父组件传的值
    private carInformation:any = '' //所选车辆
    private ruleValidateRule: any = {
      firstTime: [{required: true, message: "请选择初登日期", trigger: 'change', type: 'number'}],
      factoryTime: [{required: true, message: "请选择出厂日期", trigger: "change",type: 'number'}],
      mileage: [{required: true, message: "请输入行驶里程", trigger: "blur"}],
      drivingNo: [{required: true, message: "请输入行驶证号", trigger: "blur"}],
      transferNo: [{required: true, message: "请输入过户次数", trigger: "blur"}],
      carPurpose: [{required: true, message: "请选择车辆用途", trigger: "change",type: 'number'}],
      transmission: [{required: true, message: "请选择形式", trigger: "change",type: 'number'}],
      driver: [{required: true, message: "请选择驱动形式", trigger: "change",type: 'number'}],
      displacement: [{required: true, message: "请输入排量", trigger: "blur"}],
      carSituation:[{required: true, message: "请输入排量", trigger: "blur"}],
      evaluation:[{required: true, message: "请输入排量", trigger: "blur"}]
    }
    /**
     *
     * @param 查询评估信息
     */
    getBrash(row){
      this.row = row
      this.assessMentApplyService.beginOrderAssess({assessmentNo:row.assessmentNo})
        .subscribe( data => {
          this.appearance = data.basicList[0].carAttrList.filter(v=> v.attrType === 1).map(x=>({
            attrName:x.attrName,
            id: x.id,
            attrType:x.attrType,
            attrValue: 2,
            attrCode:x.attrCode
          }))
          this.interiorInspection = data.basicList[0].carAttrList.filter(v=> v.attrType === 2).map(x=>({
            attrName:x.attrName,
            id: x.id,
            attrType:x.attrType,
            attrValue: 2,
            attrCode:x.attrCode
          }))
          this.engineRoom = data.basicList[0].carAttrList.filter(v=> v.attrType === 3).map(x=>({
            attrName:x.attrName,
            id: x.id,
            attrType:x.attrType,
            attrValue: 2,
            attrCode:x.attrCode
          }))
          this.customerModel.city = !!data.city? CityService.getCityName(Number(data.city)):''
          this.customerModel.carColor = data.carColor
          this.customerModel.carNo = data.carNo
          this.customerModel.engineNo = data.engineNo
          this.customerModel.ownerName = data.ownerName
          this.customerModel.frameNo = data.frameNo
          this.customerModel.ownPhone = data.ownPhone
          this.customerModel.idCard = data.idCard
          this.customerModel.id = data.id
          this.customerModel.assessmentStatus = data.assessmentStatus
          this.basicList[0].id = data.basicList[0].id
          this.carInformation = data.applyCars[0].carAllName
        })
     }

    /**
     *  确定新增评估
     */
    trueAssessment(){
      let form = <Form>this.$refs['form-item']
      form.validate(valid => {
        if (!valid) return false
        this.basicList[0].carAttrList = this.appearance.concat(this.interiorInspection).concat(this.engineRoom)
        this.basicList[0].carBasicFileList = this.fodderList
        this.customerModel.basicList = this.basicList
        console.log(this.customerModel)
        this.assessMentApplyService.saveAssessmentBasicInfo(this.customerModel)
          .subscribe( data => {
            this.$Message.success("保存成功！")
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
      this.fodderList = item;
    }
    /**
     *  取消评估
     */
    cancelAssessment(){
      this.$Modal.confirm({
        title: '提示',
        content: '是否确定不再进行当前评估？',
        onOk: () => {
          this.assessMentApplyService.terminationStatus({orderId:this.row.id,status:this.row.assessmentStatus})
            .subscribe(data => {
                this.$Message.success("终止评估成功！")
                this.$emit('close');
              }, ({ msg }) => {
                this.$Message.error(msg)
              })
          }
        })
    }
    /**
     *  退件
     */
    backSerice(){
      this.$Modal.confirm({
        title: '提示',
        content: '是否将订单返回修改？再次提交后将继续由您进行评估。',
        onOk: () => {
          this.assessMentApplyService.backPieceStatus({orderId:this.row.id,status:this.row.assessmentStatus})
            .subscribe(data => {
              this.$Message.success("退件成功！")
              this.$emit('close');
            }, ({ msg }) => {
              this.$Message.error(msg)
            })
        }
      })
    }

  }
</script>

<style lang="less" scoped>
  .component.add-collateral{
    .data-form{
      margin-top:5px;
      .data-form-item {
        width: 7px;
        height: 25px;
        background: #265ea2;
        display: inline-block;
        margin-right: 6px;
        position: relative;
        top: 4px;
      }
      .information{
        font-size: 16px;
        color: black;
      }
    }
  }

</style>

