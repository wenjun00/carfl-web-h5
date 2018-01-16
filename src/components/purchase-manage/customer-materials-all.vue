<!--全额付款申请客户资料-->
<template>
  <section class="component customer-materials-all">
    <i-tab-pane name="customerItem" label="客户资料">
      <span class="form-title">个人信息</span>
      <i-row>
        <i-form ref="parchase-form" :label-width="110">
          <i-row>
            <i-col span="12" class="bigSelect">
              <i-form-item label="购车方" prop="idCard">
                <i-select v-model="purchaseData.province">
                  <i-option label="中国人寿" value="中国人寿" key="中国人寿"></i-option>
                  <i-option label="中国平安" value="中国平安" key="中国平安"></i-option>
                </i-select>
              </i-form-item>
            </i-col>
            <i-col span="12" pull="3" class="bigSelect">
              <i-form-item label="联系电话" prop="userName">
                <i-input></i-input>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col span="12">
              <i-form-item label="证件类型" prop="phone">
                <i-input type="text" v-model="purchaseData.company">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="12" pull="3">
              <i-form-item label="证件号码" prop="phone">
                <i-input type="text" v-model="purchaseData.company">
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col :span="12">
              <i-form-item label="联系地址">
                <i-row>
                  <i-col :span="8">
                    <i-select>
                      <i-option label="陕西" value="陕西" key="陕西"></i-option>
                    </i-select>
                  </i-col>
                  <i-col :span="8">
                    <i-select>
                      <i-option label="西安" value="西安" key="西安"></i-option>
                    </i-select>
                  </i-col>
                  <i-col :span="8">
                    <i-select>
                      <i-option label="雁塔" value="雁塔" key="雁塔"></i-option>
                      <i-option label="碑林" value="碑林" key="碑林"></i-option>
                      <i-option label="未央" value="未央" key="未央"></i-option>
                      <i-option label="长安" value="长安" key="长安"></i-option>
                      <i-option label="临潼" value="临潼" key="临潼"></i-option>
                    </i-select>
                  </i-col>
                </i-row>
              </i-form-item>
            </i-col>
            <i-col :span="12" pull="3">
              <i-form-item label="邮政编码" prop="phone">
                <i-input type="text" v-model="purchaseData.company">
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col :span="12">
              <i-form-item label="代办服务" prop="phone">
                <i-checkbox-group>
                  <i-checkbox label="上牌"></i-checkbox>
                  <i-checkbox label="办理保险"></i-checkbox>
                  <i-checkbox label="代缴购置税"></i-checkbox>
                  <i-checkbox label="代缴车船税"></i-checkbox>
                  <i-checkbox label="按揭贷款"></i-checkbox>
                  <i-checkbox label="车辆装潢"></i-checkbox>
                  <i-checkbox label="代缴其他费用"></i-checkbox>
                  <i-checkbox label="其他"></i-checkbox>
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

  export default class CustomerMaterialsAll extends Vue {
    private purchaseData: Object = {
      province: '',
      city: '',
      company: ''
    }
    mounted() {}
  }

</script>

<style lang="less" scope>


</style>
