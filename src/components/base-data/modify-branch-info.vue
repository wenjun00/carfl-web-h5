<!--冲抵顺序配置-->
<template>
    <section class="component modify-branch-info">
        <i-form ref="branch-form" :model="formItemParent" :rules="formRules" :label-width="100">
            <i-form-item label="公司简称：" prop="companyChinaname">
                <i-input v-model="formItemParent.companyChinaname" placeholder="请输入公司简称"></i-input>
            </i-form-item>
            <i-form-item label="所在省份：" prop="companyProvince">
                <i-select style="width:100%" placeholder="选择省" v-model="formItemParent.companyProvince" clearable>
                    <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
                </i-select>
            </i-form-item>
            <i-form-item label="所在城市：" prop="companyCity">
                <i-select style="width:100%" placeholder="选择市" v-model="formItemParent.companyCity" clearable>
                    <i-option v-for="{value,label} in this.formItemParent.province ? this.$city.getCityData({ level: 1, id: this.formItemParent.province }) : []" :key="value" :label="label" :value="value"></i-option>
                </i-select>
            </i-form-item>
            <i-form-item label="银行户名：" prop="bankAccount">
                <i-input v-model="formItemParent.bankAccount" placeholder="请输入银行户名"></i-input>
            </i-form-item>
            <i-form-item label="开户银行：" prop="depositBank">
                <i-input v-model="formItemParent.depositBank" placeholder="请输入开户银行"></i-input>
            </i-form-item>
            <i-form-item label="银行卡号：" prop="cardNumber">
                <i-input v-model="formItemParent.cardNumber" placeholder="请输入银行卡号"></i-input>
            </i-form-item>
            <i-form-item label="支行名称：" prop="branchName">
                <i-input v-model="formItemParent.branchName" placeholder="请输入支行名称"></i-input>
            </i-form-item>
            <i-form-item label="状态：">
                <i-switch size="large" @on-change="change">
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
import { Prop } from "vue-property-decorator";
import { ifError } from "assert";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class ModifyBranchInfo extends Vue {
  @Dependencies(CompanyService) private companyService: CompanyService;
  @Prop() formItemParent: any;
  private formRules: any;
  private formItem: any;

  created() {
    this.formItemParent = {
      companyChinaname: "",
      companyProvince: "",
      companyCity: "",
      bankAccount: "",
      depositBank: "",
      cardNumber: "",
      branchName: "",
      companyStatus: ""
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
          message: "请选择省份",
          trigger: "change",
          type: "number"
        }
      ],
      companyCity: [
        {
          required: true,
          message: "请选择城市",
          trigger: "change",
          type: "number"
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
  /**@
   * 点击确定按钮
   */
  confirmModify() {
    let formVal = <Form>this.$refs["branch-form"];
    console.log(this.formItemParent);
    formVal.validate(valid => {
      if (valid) {
        this.$emit("close");
        this.companyService
          .createOrModifyCompany(this.formItemParent)
          .subscribe(val => {
            this.$Message.success(val.msg == "" ? "修改成功！" : val.msg);
          });
      } else {
        this.$Message.error("Fail!");
      }
    });
  }
  /**
   * 修改器用/停用
   */
  change(status) {
    this.formItemParent.companyStatus = status;
    if (this.formItemParent.companyStatus === true) {
      return (this.formItemParent.companyStatus = 1);
    } else {
      return (this.formItemParent.companyStatus = 0);
    }
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
