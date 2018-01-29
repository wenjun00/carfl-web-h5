<!--全额付款申请客户资料-->
<template>
  <section class="component customer-materials-all">
    <i-tab-pane name="customerItem" label="客户资料">
      <span class="form-title">个人信息</span>
      <i-row>
        <i-form ref="parchase-form" :model="customerData" :label-width="110">
          <i-row>
            <i-col span="12" class="bigSelect">
              <i-form-item label="购车方" prop="customerName">
                <i-input v-model="customerData.customerName"></i-input>
              </i-form-item>
            </i-col>
            <i-col span="12" pull="3" class="bigSelect">
              <i-form-item label="联系电话" prop="customerPhone">
                <i-input v-model="customerData.customerPhone"></i-input>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="12">
              <i-form-item label="证件类型" prop="certificateType">
                <i-input type="text" v-model="customerData.certificateType">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="12" pull="3">
              <i-form-item label="证件号码" prop="certificateNumber">
                <i-input type="text" v-model="customerData.certificateNumber">
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col :span="12">
              <i-form-item label="联系地址">
                <i-row>
                  <i-row>
                    <i-col :span="4">
                      <i-select placeholder="省" v-model="customerData.province">
                        <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
                      </i-select>
                    </i-col>
                    <i-col :span="4">
                      <i-select placeholder="市" v-model="customerData.city">
                        <i-option v-for="{value,label} in this.customerData.province ? this.$city.getCityData({ level: 1, id: this.customerData.province }) : []"
                          :key="value" :label="label" :value="value"></i-option>
                      </i-select>
                    </i-col>
                    <i-col :span="4">
                      <i-select placeholder="区" v-model="customerData.area">
                        <i-option v-for="{value,label} in this.customerData.city ? this.$city.getCityData({ level: 1, id: this.customerData.city }) : []"
                          :key="value" :label="label" :value="value"></i-option>
                      </i-select>
                    </i-col>
                  </i-row>
                  <i-row>
                    <i-input type="text" v-model="customerData.idCardAddressDetail" placeholder="请具体到门牌号"></i-input>
                  </i-row>
                </i-row>
              </i-form-item>
            </i-col>
            <i-col :span="12" pull="3">
              <i-form-item label="邮政编码" prop="postalCode">
                <i-input type="text" v-model="customerData.postalCode">
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col :span="12">
              <i-form-item label="代办服务" prop="phone">
                <i-checkbox-group v-model="customerData.orderServiceList">
                  <i-checkbox label="上牌" :value="200"></i-checkbox>
                  <i-checkbox label="办理保险" :value="201"></i-checkbox>
                  <i-checkbox label="代缴购置税" :value="202"></i-checkbox>
                  <i-checkbox label="代缴车船税" :value="203"></i-checkbox>
                  <i-checkbox label="按揭贷款" :value="204"></i-checkbox>
                  <i-checkbox label="车辆装潢" :value="205"></i-checkbox>
                  <i-checkbox label="代缴其他费用" :value="206"></i-checkbox>
                  <i-checkbox label="其他" :value="207"></i-checkbox>
                </i-checkbox-group>
              </i-form-item>
            </i-col>
          </i-row>
        </i-form>
      </i-row>
    </i-tab-pane>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  // import {
  //   Prop
  // } from "vue-property-decorator";

  @Component({})
  export default class CustomerMaterialsAll extends Vue {
    private customerData: any = {
      customerName: '', // 购车方
      customerPhone: '', // 联系电话
      certificateType: '', // 证件类型
      certificateNumber: '', // 证件号码
      province: '', // 省
      city: '', // 市
      area: '', // 区
      postalCode: '', // 邮政编码
      idCardAddressDetail: '', // 箱子地址
      orderServiceList: ''
    }
    mounted() {}
  }

</script>

<style lang="less" scope>


</style>
