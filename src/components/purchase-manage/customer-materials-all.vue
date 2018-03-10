<!--全额付款申请客户资料-->
<template>
  <section class="component customer-materials-all">
    <i-tab-pane name="customerItem" label="客户资料">
      <span class="form-title">个人信息</span>
      <i-row>
        <i-form ref="parchase-form" :rules="rules" :model="customerData" :label-width="110">
          <i-row>
            <i-col span="12" class="bigSelect">
              <i-form-item label="购车方" prop="name">
                <i-input v-model="customerData.name"></i-input>
              </i-form-item>
            </i-col>
            <i-col span="12" pull="3" class="bigSelect">
              <i-form-item label="联系电话" prop="mobileMain">
                <i-input v-model="customerData.mobileMain"></i-input>
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
              <i-form-item label="证件号码" prop="idCard">
                <i-input type="text" v-model="customerData.idCard">
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <i-col :span="12">
              <i-form-item label="联系地址" prop="idCardAddressDetail">
                <i-row>
                  <i-row>
                    <i-col :span="4">
                      <i-select style="width:80px" placeholder="省" v-model="customerData.province">
                        <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
                      </i-select>
                    </i-col>
                    <i-col :span="4">
                      <i-select style="width:80px" placeholder="市" v-model="customerData.city">
                        <i-option v-for="{value,label} in this.customerData.province ? this.$city.getCityData({ level: 1, id: this.customerData.province }) : []"
                          :key="value" :label="label" :value="value"></i-option>
                      </i-select>
                    </i-col>
                    <i-col :span="4">
                      <i-select style="width:80px" placeholder="区" v-model="customerData.localHomeAddr">
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
              <i-form-item label="代办服务" prop="orderServiceList">
                <i-checkbox-group v-model="customerData.orderServiceList">
                  <i-checkbox :label="200" :value="200">上牌</i-checkbox>
                  <i-checkbox :label="201" :value="201">办理保险</i-checkbox>
                  <i-checkbox :label="202" :value="202">代缴购置税</i-checkbox>
                  <i-checkbox :label="203" :value="203">代缴车船税</i-checkbox>
                  <i-checkbox :label="204" :value="204">按揭贷款</i-checkbox>
                  <i-checkbox :label="205" :value="205">车辆装潢</i-checkbox>
                  <i-checkbox :label="206" :value="206">代缴其他费用</i-checkbox>
                  <i-checkbox :label="207" :value="207">其他</i-checkbox>
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
  import Vue from 'vue';
  import Component from 'vue-class-component';
  // import {
  //   Prop
  // } from "vue-property-decorator";

  @Component({})
  export default class CustomerMaterialsAll extends Vue {
    private customerData: any = {
      name: '', // 购车方
      mobileMain: '', // 联系电话
      certificateType: '', // 证件类型
      idCard: '', // 证件号码
      province: '', // 省
      city: '', // 市
      localHomeAddr: '', // 区
      postalCode: '', // 邮政编码
      idCardAddressDetail: '', // 箱子地址
      orderServiceList: [], // 代办服务
    };
    private rules: any = {
      certificateType: [{
        required: true,
        message: '请输入证件类型',
        trigger: 'blur',
      }],
      idCardAddressDetail: [{
        required: true,
        message: '请输入详细地址信息',
        trigger: 'blur',
      }],
      postalCode: [{
        required: true,
        message: '请输入邮政编码',
        trigger: 'blur',
      }],
      orderServiceList: [{
        required: true,
        message: '选择代办服务',
        trigger: 'change',
        type: 'array'
      }],
      mobileMain: [{
        required: true,
        message: '请输入联系电话',
        trigger: 'blur',
      }],
    }
    /**
     * 信息反显
     */
    Reverse(data) {
      this.customerData = data.personal
      this.customerData.orderServiceList = data.orderServices.map(v => v.service)
    }
    getinfo(data) {
      //   this.customerData = data
      //   this.customerData.mobileMain = data.customerPhone
    }
    // mounted() {}
    // whgwgdhwgdh() {
    //   console.log(this.customerData.orderServiceList, 700)
    // }
  }

</script>

<style lang="less" scope>
  .customer-materials-all {
    .ivu-select-selection {
      width: 100%!important;
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

</style>
