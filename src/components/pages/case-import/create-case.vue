<template>
  <section class="component create-case">
    <el-form ref="create-form" :model="createModel">
      <el-row type="flex" :gutter="20">
        <el-col :span="8">
          <el-form-item label="委案日期" prop="commissionDate">
            <el-date-picker type="date" v-model="createModel.commissionDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结案日期" prop="closingDate">
            <el-date-picker type="date" v-model="createModel.closingDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!--<el-form-item label="审批人">
            <el-input placeholder="审批人"></el-input>
          </el-form-item>-->
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="20">
        <el-col :span="8">
          <el-form-item label="委托方" prop="trustee">
            <el-input v-model="createModel.trustee"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同编号" prop="contractNumber">
            <el-input v-model="createModel.contractNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属营业部" prop="businessDepartment">
            <el-input v-model="createModel.businessDepartment"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="20">
        <el-col>
          <el-form-item label="车主姓名" prop="actualName">
            <el-input v-model="createModel.actualName"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="车主电话" prop="phone">
            <el-input v-model="createModel.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="身份证号" prop="idNumber">
            <el-input v-model="createModel.idNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col>
          <el-form-item label="省份" prop="closingDate">
            <el-input v-model="createModel.province"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="城市" prop="city">
            <el-input v-model="createModel.city"></el-input>
          </el-form-item>
        </el-col>
        <el-col></el-col>
      </el-row>
      <el-row type="flex">
        <el-col>
          <el-form-item label="车辆品牌" prop="vehicleBrands">
            <el-input v-model="createModel.vehicleBrands"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="车辆型号" prop="vehicleModel">
            <el-input v-model="createModel.vehicleModel"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="车辆颜色" prop="vehicleColor">
            <el-input v-model="createModel.vehicleColor"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col>
          <el-form-item label="车牌号" prop="licensePlateNumber">
            <el-input v-model="createModel.licensePlateNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="车架号" prop="frameNumber">
            <el-input v-model="createModel.frameNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="发动机号" prop="engineNumber">
            <el-input v-model="createModel.engineNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col>
          <el-form-item label="车辆价格" prop="vehiclePrices">
            <el-input v-model="createModel.vehiclePrices"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="贷款金额" prop="loanAmount">
            <el-input v-model="createModel.loanAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="逾期金额" prop="overdueAmount">
            <el-input v-model="createModel.overdueAmount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col>
          <el-form-item label="合同金额" prop="contractAmount">
            <el-input v-model="createModel.contractAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="逾期期数" prop="overduePeriod">
            <el-input v-model="createModel.overduePeriod"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="还款日" prop="repaymentDate">
            <el-input v-model="createModel.repaymentDate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col>
          <el-form-item label="放款期数" prop="loanPeriod">
            <el-input v-model="createModel.loanPeriod"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="已还期数" prop="expiredPeriod">
            <el-input v-model="createModel.expiredPeriod"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="银行卡号" prop="bankCardNumber">
            <el-input v-model="createModel.bankCardNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="8">
          <el-form-item label="家庭地址" label-width="80px" prop="familyAddress">
            <el-input v-model="createModel.familyAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="8">
          <el-form-item label="公司地址" label-width="80px" prop="companyAddress">
            <el-input v-model="createModel.companyAddress"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button @click="close">取消</el-button>
        <el-button @click="submit">确定</el-button>
      </el-row>
    </el-form>
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
  export default class CreateCase extends Vue {
    @Dependencies(dataImpService) private dataImpService: dataImpService;
    private excelModel: any = {};
    private createModel: any = {
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
      this.dataImpService.manualEnterOrder(this.createModel).subscribe(data => {
        this.$message({
          type: 'success',
          message: '提交成功'
        })
      });
    }
    close(){
      this.$emit('close')
    }
  }

</script>

<style scoped>


</style>
