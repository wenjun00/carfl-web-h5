<template>
  <section class="component add-collateral-details">
    <!-- <span>选购信息</span> -->
    <i-row class="data-form">
      <i-col>
        <div class="data-form-item"></div>
        <a  class="information">选购信息</a>
      </i-col>
    </i-row>
    <i-form  :model="customerModel" ref="form-item" :label-width="90">
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="所选车辆">
            <i-input disabled v-model="customerModel.carAllName" ></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="车身颜色">
            <i-input disabled v-model="customerModel.carColor"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="上牌城市">
            <i-input disabled v-model="customerModel.city"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="车牌号码">
            <i-input disabled v-model="customerModel.carNo"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="发动机号">
            <i-input disabled v-model="customerModel.engineNo"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="客户姓名">
            <i-input disabled v-model="customerModel.ownerName"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="车架号">
            <i-input disabled v-model="customerModel.frameNo"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="手机号码">
            <i-input disabled v-model="customerModel.ownPhone"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="初登日期" prop="firstTime">
            <i-date-picker type="date" placeholder="年/月/日" v-model="customerModel.firstTime" readonly></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="证件号码">
            <i-input disabled v-model="customerModel.idCard"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="出厂日期" prop="factoryTime">
            <i-date-picker type="date" placeholder="年/月/日" v-model="customerModel.factoryTime" readonly></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="15">
          <i-form-item label="行驶里程" prop="mileage">
            <i-input  v-model="customerModel.mileage" readonly></i-input>
            <span>万公里</span>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="行驶证号" prop="drivingNo">
            <i-input v-model="customerModel.drivingNo" readonly></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="15">
          <i-form-item label="过户次数" prop="transferNo">
            <i-input v-model="customerModel.transferNo" readonly></i-input>
            <span>次</span>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="车辆用途" prop="carPurpose">
            <i-select v-model="customerModel.carPurpose" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0447')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="变速箱形式" prop="transmission">
            <i-select v-model="customerModel.transmission" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0448')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="驱动形式" prop="driver">
            <i-select v-model="customerModel.driver" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0449')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="排量" prop="displacement">
            <i-input v-model="customerModel.displacement" readonly></i-input>
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
        <i-col v-for="item in appearance" :key="item.attrCode">
          <i-form-item :label="item.attrName">
            <i-radio-group   v-model="item.attrValue">
              <i-radio :label="1" disabled>正常</i-radio>
              <i-radio :label="0" disabled>异常</i-radio>
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
        <i-col v-for="item in interiorInspection" :key="item.attrCode">
          <i-form-item :label="item.attrName">
            <i-radio-group   v-model="item.attrValue">
              <i-radio :label="1" disabled>正常</i-radio>
              <i-radio :label="0" disabled>异常</i-radio>
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
        <i-col v-for="item in engineRoom" :key="item.attrCode">
          <i-form-item :label="item.attrName">
            <i-radio-group   v-model="item.attrValue">
              <i-radio :label="1" disabled>正常</i-radio>
              <i-radio :label="0" disabled>异常</i-radio>
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
          <i-form-item label="车况" prop="carSituation" >
            <i-select v-model="customerModel.carSituation" disabled>
              <i-option v-for="{value,label} in $dict.getDictData('0450')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="15">
          <i-form-item label="估价" prop="evaluation">
            <i-input v-model="customerModel.evaluation" readonly></i-input>
            <span>万元</span>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row>
        <i-col>
          <i-form-item label="备注" class="large">
            <i-input type="textarea" v-model="customerModel.remarks" :rows="4" readonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row>
        <i-col>
          <upload-voucher  ref="upload-voucher" hiddenUpload hiddenDelete></upload-voucher>
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
  import { FilterService } from "~/utils/filter.service";

  @Component({
    components: {
      UploadVoucher
    }
  })
  export default class AddCollateralDetails extends Vue {
    @Dependencies(AssessMentApplyService) private assessMentApplyService: AssessMentApplyService
    private customerModel: any = {
      city:'',
      carColor:'',
      carNo:'',
      engineNo:'',
      ownerName:'',
      frameNo:'',
      ownPhone:'',
      idCard:'',
      carAllName:'',
      firstTime:'',
      factoryTime:'',
      mileage:'',
      drivingNo:'',
      transferNo:'',
      carPurpose:'',
      transmission:'',
      driver:'',
      displacement:'',
      carSituation:'',
      evaluation:'',
      remarks:'',
    }
    private fodderList:any = [] //上传文件列
    private appearance :any = [] //得到评估外观数据
    private interiorInspection :any = [] //得到评估内饰检验数据
    private engineRoom :any = [] //得到评估机舱底盘数据
    /**
     *  获取详情数据
     */
    getDetailsData(row){
      this.assessMentApplyService.findBasicInfoByOrderNumber({assessmentNo:row.assessmentNo})
        .subscribe( data => {
          this.customerModel.city = !!data.city? CityService.getCityName(Number(data.city)):''
          this.customerModel.carColor = data.carColor
          this.customerModel.carNo = data.carNo
          this.customerModel.engineNo = data.engineNo
          this.customerModel.ownerName = data.ownerName
          this.customerModel.frameNo = data.frameNo
          this.customerModel.ownPhone = data.ownPhone
          this.customerModel.idCard = data.idCard
          this.customerModel.carAllName = data.applyCars[0].carAllName
          this.customerModel.firstTime = FilterService.dateFormat(data.basicList[0].firstTime, 'yyyy-MM-dd')
          this.customerModel.factoryTime = FilterService.dateFormat(data.basicList[0].factoryTime, 'yyyy-MM-dd')
          this.customerModel.mileage =data.basicList[0].mileage
          this.customerModel.drivingNo =data.basicList[0].drivingNo
          this.customerModel.transferNo =data.basicList[0].transferNo
          this.customerModel.carPurpose =data.basicList[0].carPurpose
          this.customerModel.transmission = data.basicList[0].transmission
          this.customerModel.driver =data.basicList[0].driver
          this.customerModel.displacement =data.basicList[0].displacement
          this.customerModel.carSituation =data.basicList[0].carSituation
          this.customerModel.evaluation = this.$filter.toThousands(data.basicList[0].evaluation)
          this.customerModel.remarks = data.basicList[0].remarks
          this.appearance = data.basicList[0].carAttrList.filter(v=> v.attrType === 1).map(x=>({
            attrName:x.attrName,
            attrValue:Number(x.attrValue),
            attrCode:x.attrCode
          }))
          this.interiorInspection = data.basicList[0].carAttrList.filter(v=> v.attrType === 2).map(x=>({
            attrName:x.attrName,
            attrValue: Number(x.attrValue),
            attrCode:x.attrCode
          }))
          this.engineRoom = data.basicList[0].carAttrList.filter(v=> v.attrType === 3).map(x=>({
            attrName:x.attrName,
            attrValue: Number(x.attrValue),
            attrCode:x.attrCode
          }))
          let uploadVoucher = this.$refs['upload-voucher'] as UploadVoucher
          uploadVoucher.Reverse(data.basicList[0].carFileList)
        },({msg}) => {
          this.$Message.error(msg)
        })
    }
  }
</script>

<style lang="less" scoped>
  .component.add-collateral-details{
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

