<template>
  <section class="component add-collateral">
    <!-- <span>选购信息</span> -->
    <i-row class="data-form">
      <i-col>
        <div class="data-form-item"></div>
        <a  class="information">选购信息</a>
      </i-col>
    </i-row>
    <i-form :rules="ruleValidateRule" :model="customerModel">

      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="所选车辆" :label-width="90">
            <i-input disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="车身颜色"  :label-width="90">
            <i-input disabled v-model="customerModel.carColor"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="上牌城市" :label-width="90">
            <i-input disabled v-model="customerModel.city"></i-input>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="车牌号码"  :label-width="90">
            <i-input disabled v-model="customerModel.carNo"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="发动机号" :label-width="90">
            <i-input disabled v-model="customerModel.engineNo"></i-input>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="客户姓名"  :label-width="90">
            <i-input disabled v-model="customerModel.ownerName"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="车架号" :label-width="90">
            <i-input disabled v-model="customerModel.frameNo"></i-input>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="手机号码"  :label-width="90">
            <i-input disabled v-model="customerModel.ownPhone"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="初登日期" prop="firstTime" :label-width="90" >
            <i-date-picker type="date" placeholder="年/月/日" v-model="customerModel.firstTime"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="证件号码"  :label-width="90">
            <i-input disabled v-model="customerModel.idCard"></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="出厂日期" prop="factoryTime" :label-width="90">
            <i-date-picker type="date" placeholder="年/月/日" v-model="customerModel.factoryTime"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="行驶里程" prop="mileage" :label-width="90" >
            <i-input  v-model="customerModel.mileage"></i-input>
            <span>万公里</span>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="行驶证号" prop="drivingNo" :label-width="90">
            <i-input v-model="customerModel.drivingNo"></i-input>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="过户次数" prop="transferNo" :label-width="90">
            <i-input v-model="customerModel.transferNo"></i-input>
            <span>次</span>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="车辆用途" prop="carPurpose" :label-width="90">
            <i-select v-model="customerModel.carPurpose">
              <i-option v-for="{value,label} in $dict.getDictData('0447')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="变速箱形式" prop="transmission" :label-width="90">
            <i-select v-model="customerModel.transmission">
              <i-option v-for="{value,label} in $dict.getDictData('0448')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="驱动形式" prop="driver" :label-width="90">
            <i-select v-model="customerModel.driver">
              <i-option v-for="{value,label} in $dict.getDictData('0449')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="排量" prop="displacement" :label-width="90">
            <i-input v-model="customerModel.displacement"></i-input>
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
      <i-row type="flex" :gutter="200">
        <i-col v-for="item in appearance" :key="item.id">
          <i-form-item :label="item.attrValue"  :label-width="90">
            <i-radio-group   v-model="formItem.radio">
              <i-radio label="male">正常</i-radio>
              <i-radio label="female">异常</i-radio>
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
      <i-row type="flex" :gutter="200">
        <i-col v-for="item in interiorInspection" :key="item.id">
          <i-form-item :label="item.attrValue"  :label-width="90">
            <i-radio-group   v-model="formItem.radio">
              <i-radio label="male">正常</i-radio>
              <i-radio label="female">异常</i-radio>
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
      <i-row type="flex" :gutter="200">
        <i-col v-for="item in engineRoom" :key="item.id">
          <i-form-item :label="item.attrValue"  :label-width="90">
            <i-radio-group   v-model="formItem.radio">
              <i-radio label="male">正常</i-radio>
              <i-radio label="female">异常</i-radio>
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
        <i-col>
          <i-form-item label="车况" prop="m1" :label-width="90">
            <i-select >carSituation
              <i-option v-for="{value,label} in $dict.getDictData('0450')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="估价" prop="m2" :label-width="90">
            <i-input></i-input>
            <span>万元</span>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row>
        <i-col type="flex" :gutter="110">
          <i-form-item label="备注" :label-width="90">
            <i-input type="textarea" ></i-input>
          </i-form-item>
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

  @Component({
    components: {}
  })
  export default class AddCollateral extends Vue {
    @Dependencies(AssessMentApplyService) private assessMentApplyService: AssessMentApplyService
    private customerModel: any = {

    };
    private formItem :any = {
      radio:''
    }
    private appearance :any = [] //得到评估外观数据
    private interiorInspection :any = [] //得到评估内饰检验数据
    private engineRoom :any = [] //得到评估机舱底盘数据
    private ruleValidateRule: any = {
      firstTime: [{required: true, message: "请选择初登日期", trigger: "blur"},],
      factoryTime: [{required: true, message: "请选择出厂日期", trigger: "blur"},],
      mileage: [{required: true, message: "请输入行驶里程", trigger: "blur"},],
      drivingNo: [{required: true, message: "请输入行驶证号", trigger: "blur"},],
      transferNo: [{required: true, message: "请输入过户次数", trigger: "blur"},],
      carPurpose: [{required: true, message: "请选择车辆用途", trigger: "blur"},],
      transmission: [{required: true, message: "请选择变速箱形式", trigger: "blur"},],
      driver: [{required: true, message: "请选择驱动形式", trigger: "blur"},],
      displacement: [{required: true, message: "请输入排量", trigger: "blur"},]
    }

    /**
     *
     * @param 查询评估信息
     */
    getBrash(val){
      this.assessMentApplyService.beginOrderAssess({assessmentNo:val})
        .subscribe( data => {
          this.customerModel = data
          this.appearance = data.basicList[0].carAttrList.filter(v=> v.attrType === 1)
          this.interiorInspection = data.basicList[0].carAttrList.filter(v=> v.attrType === 2)
          this.engineRoom = data.basicList[0].carAttrList.filter(v=> v.attrType === 3)
          this.customerModel.city = CityService.getCityName(Number(data.city))
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

