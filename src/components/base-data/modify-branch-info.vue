<!--冲抵顺序配置-->
<template>
    <section class="component modify-branch-info">
        <i-form ref="formItem" :model="formItem" :rules="formRules" :label-width="80">
            <i-form-item label="公司简称：" prop="companyChinaname">
                <i-input v-model="formItem.companyChinaname" placeholder="请输入公司简称"></i-input>
            </i-form-item>
            <i-form-item label="所在省份：" prop="companyProvince">
                <i-input v-model="formItem.companyProvince" placeholder="请输入所在省份"></i-input>
            </i-form-item>
            <i-form-item label="所在城市：" prop="companyCity">
                <i-input v-model="formItem.companyCity" placeholder="请输入所在城市"></i-input>
            </i-form-item>
            <i-form-item label="银行户名：" prop="bankAccount">
                <i-input v-model="formItem.bankAccount" placeholder="请输入银行户名"></i-input>
            </i-form-item>
            <i-form-item label="开户银行：" prop="depositBank">
                <i-input v-model="formItem.depositBank" placeholder="请输入开户银行"></i-input>
            </i-form-item>
            <i-form-item label="银行卡号：" prop="cardNumber">
                <i-input v-model="formItem.cardNumber" placeholder="请输入银行卡号"></i-input>
            </i-form-item>
            <i-form-item label="支行名称：" prop="branchName">
                <i-input v-model="formItem.branchName" placeholder="请输入支行名称"></i-input>
            </i-form-item>
            <i-form-item label="状态：">
                <i-switch size="large" v-model="formItem.companyStatus">
                    <span slot="open">启用</span>
                    <span slot="close">停用</span>
                </i-switch>
            </i-form-item>
            </form>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { DataGrid, DataGridItem } from "vue-fintech-component";
import { Form } from "iview";
import { CompanyService } from "~/services/manage-service/company.service";
import { Dependencies } from "~/core/decorator";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class ModifyBranchInfo extends Vue {
  @Dependencies(CompanyService) private companyService: CompanyService;
  private formItem: any;
  private formRules: any;
  created() {
    this.formItem = {
      companyChinaname: "",
      companyProvince: "",
      companyCity: "",
      bankAccount: "",
      depositBank: "",
      cardNumber: "",
      branchName: "",
      companyStatus: false
    };
    /**
     *验证
     */
    this.formRules = {
      companyChinaname: [
        {
          required: true,
          message: "您输入的内容不能为空",
          trigger: "blur"
        }
      ],
      companyProvince: [
        {
          required: true,
          message: "您输入的内容不能为空",
          trigger: "blur"
        }
      ],
      companyCity: [
        {
          required: true,
          message: "您输入的内容不能为空",
          trigger: "blur"
        }
      ],
      bankAccount: [
        {
          required: true,
          message: "您输入的内容不能为空",
          trigger: "blur"
        }
      ],
      depositBank: [
        {
          required: true,
          message: "您输入的内容不能为空",
          trigger: "blur"
        }
      ],
      cardNumber: [
        {
          required: true,
          message: "您输入的内容不能为空",
          trigger: "blur"
        }
      ],
      branchName: [
        {
          required: true,
          message: "您输入的内容不能为空",
          trigger: "blur"
        }
      ]
    };
  }
  confirmModify() {
    let formVal = <Form>this.$refs["formItem"];
    formVal.validate(valid => {
      if (valid) {
        this.$emit("close");
        this.companyService
          .createOrModifyCompany(this.formItem)
          .subscribe(val => {
            this.$Message.success(val.msg == "" ? "修改成功！" : val.msg);
          });
      } else {
        this.$Message.error("Fail!");
      }
    });
  }
}
</script>

<style lang="less">
.addPeriodsItem {
  font-size: 14px;
  font-weight: bold;
  margin-top: 16px;
}
</style>
