<!--选购材料-->
<template>
  <section class="component choose-buy-materials">
    <i-col span="24" style="line-height:30px" class="form-title">选购信息</i-col>
    <!--<span class="form-title">选购信息</span>-->
    <i-form ref="customer-form" :model="chooseBuyModel" :label-width="100">
      <i-col span="12">
        <i-form-item label="申请省份" prop="province">
          <i-input type="text" v-model="chooseBuyModel.province" placeholder="请输入申请省份">
          </i-input>
        </i-form-item>
      </i-col>
      <i-col span="12">
        <i-form-item label="申请城市" prop="city">
          <i-input type="text" v-model="chooseBuyModel.city" placeholder="请输入申请城市">
          </i-input>
        </i-form-item>
      </i-col>
      <i-col span="12">
        <i-form-item label="所属公司" prop="company">
          <i-input type="text" v-model="chooseBuyModel.company" placeholder="请输入所属公司">
          </i-input>
        </i-form-item>
      </i-col>
      <i-col span="12">
        <i-form-item label="融资租赁用途" prop="usedMode">
          <i-input type="text" v-model="chooseBuyModel.usedMode" placeholder="请输入融资租赁用途">
          </i-input>
        </i-form-item>
      </i-col>
      <i-col span="24">
        <i-form-item label="自缴费用" prop="freeMoney">
          <i-input type="text" v-model="chooseBuyModel.freeMoney" placeholder="请输入自缴费用">
          </i-input>
        </i-form-item>
      </i-col>
      <i-col span="12">
        <i-form-item label="意向融资金额" prop="hopeMoney">
          <i-input type="text" v-model="chooseBuyModel.hopeMoney" placeholder="请输入意向融资金额">
          </i-input>
        </i-form-item>
      </i-col>
      <i-col span="12">
        <i-form-item label="意向期限" prop="hopeTime">
          <i-input type="text" v-model="chooseBuyModel.hopeTime" placeholder="请输入意向期限">
          </i-input>
        </i-form-item>
      </i-col>
      <i-col span="12">
        <i-form-item label="租金支付" prop="moneyPay">
          <i-input type="text" v-model="chooseBuyModel.moneyPay" placeholder="请输入租金支付">
          </i-input>
        </i-form-item>
      </i-col>
      <i-col span="12">
        <i-form-item label="意向首付比例" prop="hopeProportion">
          <i-input type="text" v-model="chooseBuyModel.hopeProportion" placeholder="请输入意向首付比例">
          </i-input>
        </i-form-item>
      </i-col>
    </i-form>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({})
  export default class ChooseBuyMaterials extends Vue {
    private chooseBuyModel: any;

    created() {
      // 设置表单数据
      this.chooseBuyModel = {
        province: "",
        city: "",
        company: "",
        usedMode: "",
        freeMoney: "",
        hopeMoney: "",
        hopeTime: "",
        moneyPay: "",
        hopeProportion: ""        
      };
    }

  }
</script>

<style lang="less" scope>

</style>