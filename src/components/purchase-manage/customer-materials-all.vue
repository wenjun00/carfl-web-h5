<!--全额付款申请客户资料-->
<template>
  <section class="component customer-materials-all">
    <i-card title="个人信息">
      <i-form ref="parchase-form" :rules="customerRules" :model="customerModel" :label-width="90">
        <i-row>
          <i-col :span="12">
            <i-form-item label="购车方" prop="name">
              <i-input v-model="customerModel.name"></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="联系电话" prop="mobileMain">
              <i-input v-model="customerModel.mobileMain"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col :span="12">
            <i-form-item label="证件类型" prop="certificateType">
              <i-select v-model="customerModel.certificateType">
                <i-option v-for="{value,label} in $dict.getDictData('0433')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="证件号码" prop="idCard">
              <i-input type="text" v-model="customerModel.idCard">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-form-item label="联系地址" prop="idCardAddressDetail">
            <i-row>
              <i-row type="flex" :gutter="16">
                <i-col>
                  <i-select class="city-select" placeholder="省" v-model="customerModel.province" transfer>
                    <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-select class="city-select" placeholder="市" :disabled="!customerModel.province" v-model="customerModel.city" transfer>
                    <i-option v-for="{value,label} in this.customerModel.province ? this.$city.getCityData({ level: 1, id: this.customerModel.province }) : []" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-select class="city-select" placeholder="区" :disabled="!customerModel.city" v-model="customerModel.localHomeAddr" transfer>
                    <i-option v-for="{value,label} in this.customerModel.city ? this.$city.getCityData({ level: 1, id: this.customerModel.city }) : []" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-input class="city-input" type="text" v-model="customerModel.idCardAddressDetail" placeholder="请具体到门牌号"></i-input>
                </i-col>
              </i-row>
            </i-row>
          </i-form-item>
        </i-row>
        <i-row>
          <i-col :span="12">
            <i-form-item label="邮政编码" prop="postalCode">
              <i-input type="text" v-model="customerModel.postalCode">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col>
            <i-form-item label="代办服务" prop="orderServiceList">
              <i-checkbox-group v-model="customerModel.orderServiceList">
                <i-checkbox v-for="{value,label} of $dict.getDictData('0313')" :key="value" :value="value" :label="label"></i-checkbox>
              </i-checkbox-group>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </i-card>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { CityService } from "~/utils/city.service";

@Component({})
export default class CustomerMaterialsAll extends Vue {
  private customerModel: any = {};
  private customerRules: any = {};

  //  个人信息 card
  private parchaseForm: any = {};
  // 页面流程检测规则
  private customRules: any = {}

  created() {
    this.customerRules = {
      name: { required: true, message: "请输入购车方用户名称", trigger: "blur" },
      certificateType: { required: true, message: "请输入证件类型", trigger: "change", type: "number" },
      idCardAddressDetail: { required: true, message: "请输入详细地址信息", trigger: "blur" },
      idCard: [
        { required: true, message: "请输入证件号码", trigger: "blur" },
        { validator: this.$validator.idCard, trigger: "blur" }],
      postalCode: { required: true, message: "请输入邮政编码", trigger: "blur" },
      orderServiceList: { required: true, message: "选择代办服务", trigger: "change", type: "array" },
      mobileMain: [
        { required: true, message: "请输入联系电话", trigger: "blur" },
        { validator: this.$validator.phoneNumber, trigger: "blur" }]
    };
    this.customerModel = {
      name: "", // 购车方
      mobileMain: "", // 联系电话
      certificateType: "", // 证件类型
      idCard: "", // 证件号码
      province: "", // 省
      city: "", // 市
      localHomeAddr: "", // 区
      postalCode: "", // 邮政编码
      idCardAddressDetail: "", // 箱子地址
      orderServiceList: [] // 代办服务
    };

    this.customRules = {
      parchaseForm: {
        validator: this.$validator.formValidate
      }
    }
  }

  mounted() {
    this.parchaseForm = this.$refs["parchase-form"];
  }

  /**
   * 信息反显
   */
  Reverse(data) {
    data.personal.localHomeAddr = Number(data.personal.localHomeAddr);
    data.personal.city = CityService.getCityParent(
      Number(data.personal.localHomeAddr)
    )[1];
    data.personal.province = CityService.getCityParent(
      Number(data.personal.localHomeAddr)
    )[0];
    data.orderServiceList = data.orderServices.map(v => v.service);
    this.customerModel = data.personal;
  }

  getinfo(data) {
    this.customerModel = Object.assign({}, data);
    this.customerModel.mobileMain = data.customerPhone;
  }

  /**
   * 页面重置
   */
  resetPage() {
    this.parchaseForm.resetFileds();
  }

  /**
   * 检测当前页面是否验证通过
   */
  /**
   * 验证数据
   */
  async validate() {
    console.log('1111')
    console.log(222, this.parchaseForm, 111)
    // 自定义验证
    let result = await this.$validator
      .validate({
        parchaseForm: this.$refs['parchase-form']
      }, this.customRules)
      .then(error => {
         if (!error) {
          return true;
        }
        this.$Message.error(error);
      });
    return result;
  }
}
</script>

<style lang="less">
.component.customer-materials-all {
  .ivu-select {
    &.city-select {
      width: 120px !important;
      .ivu-select-selection {
        width: 120px !important;
      }
    }
  }
  .city-input {
    .ivu-input {
      width: 400px;
    }
  }
}
</style>
