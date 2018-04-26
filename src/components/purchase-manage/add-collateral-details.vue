<template>
  <section class="component add-collateral">
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
            <i-input disabled v-model="customerModel.carAllName"></i-input>
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
            <i-date-picker type="date" placeholder="年/月/日" v-model="customerModel.firstTime"></i-date-picker>
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
            <i-date-picker type="date" placeholder="年/月/日" v-model="customerModel.factoryTime"></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="15">
          <i-form-item label="行驶里程" prop="mileage">
            <i-input  v-model="customerModel.mileage"></i-input>
            <span>万公里</span>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="行驶证号" prop="drivingNo">
            <i-input v-model="customerModel.drivingNo"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="15">
          <i-form-item label="过户次数" prop="transferNo">
            <i-input v-model="customerModel.transferNo"></i-input>
            <span>次</span>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="车辆用途" prop="carPurpose">
            <i-select v-model="customerModel.carPurpose">
              <i-option v-for="{value,label} in $dict.getDictData('0447')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="变速箱形式" prop="transmission">
            <i-select v-model="customerModel.transmission">
              <i-option v-for="{value,label} in $dict.getDictData('0448')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row type="flex" :gutter="110">
        <i-col :span="8">
          <i-form-item label="驱动形式" prop="driver">
            <i-select v-model="customerModel.driver">
              <i-option v-for="{value,label} in $dict.getDictData('0449')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="8">
          <i-form-item label="排量" prop="displacement">
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
      <i-row type="flex" :gutter="85">
        <i-col v-for="item in appearance" :key="item.id">
          <i-form-item :label="item.attrName">
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
          <i-form-item :label="item.attrName">
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
          <i-form-item :label="item.attrName">
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
          <i-form-item label="车况" prop="carSituation">
            <i-select v-model="customerModel.carSituation">
              <i-option v-for="{value,label} in $dict.getDictData('0450')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="15">
          <i-form-item label="估价" prop="evaluation">
            <i-input v-model="customerModel.evaluation"></i-input>
            <span>万元</span>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row>
        <i-col>
          <i-form-item label="备注" class="large">
            <i-input type="textarea" v-model="customerModel.remarks" :rows="4" ></i-input>
          </i-form-item>
        </i-col>
      </i-row>

      <i-row>
        <i-col>
          <upload-voucher  ref="upload-voucher" ></upload-voucher>
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
    private customerModel: any = {}

    /**
     *  获取详情数据
     */
    getDetailsData(){

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

