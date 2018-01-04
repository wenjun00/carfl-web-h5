<template>
  <section class="component approval-handle">
    <el-row type="flex" justify="center">
      <el-button @click="close">取消</el-button>
      <el-button @click="submit">确定</el-button>
    </el-row>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import {
    Layout
  } from "~/core/decorator";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import app from '~/config/app.config'
  import {
    dataImpService
  } from "~/services/data-imp.service";

  @Component({})
  export default class ApprovalHandle extends Vue {
    @Dependencies(dataImpService) private dataImpService: dataImpService;
    private excelModel: any = {};
    private approvalModel: any = {
      actualName: '',
      bankCardNumber: '',
      businessDepartment: '',
      city: '',
      closingDate: '',
      commissionDate: '',
      companyAddress: '',
      contractAmount: '',
      contractNumber: '',
      engineNumber: '',
      expireDate: '2017-12-31',
      expiredPeriod: '',
      familyAddress: '',
      frameNumber: '',
      idNumber: '',
      licensePlateNumber: '',
      loanAmount: '',
      loanPeriod: '',
      overdueAmount: '',
      overduePeriod: '',
      phone: '',
      province: '',
      repaymentDate: '',
      trustee: '',
      vehicleBrands: '',
      vehicleColor: '',
      vehicleModel: '',
      vehiclePrices: ''
    };
    /**
     * 新增案件提交
     */
    submit() {
      this.dataImpService.manualEnterOrder(this.approvalModel).subscribe(data => {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
      });
    }
    close() {
      this.$emit('close')
    }
  }

</script>

<style scoped>


</style>
