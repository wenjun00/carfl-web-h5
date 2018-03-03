<!--修改分公司信息-->
<template>
  <section class="component modify-branch-info">
    <i-form ref="branch-form" :model="formItemParent" :rules="formRules" :label-width="85" label-position="left">
      <i-form-item label="公司简称：" prop="companyChinaname">
        <i-input v-model="formItemParent.companyChinaname" placeholder="请输入公司简称"></i-input>
      </i-form-item>
      <i-form-item label="所在省份：" prop="companyProvince">
        <i-select style="width:100%" placeholder="选择省" v-model="formItemParent.companyProvince" clearable>
          <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="所在市" prop="companyCity">
        <i-select style="width:100%" placeholder="选择市" v-model="formItemParent.companyCity" clearable>
          <i-option v-for="{value,label} in this.formItemParent.companyProvince ? this.$city.getCityData({ level: 1, id: this.formItemParent.companyProvince }) : []" :key="value" :label="label" :value="value"></i-option>
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
        <i-switch size="large" @on-change="change" v-model="formItemParent.companyStatus">
          <span slot="open">启用</span>
          <span slot="close">停用</span>
        </i-switch>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { DataGrid, DataGridItem } from '@zct1989/vue-component';
import { Form } from 'iview';
import { CompanyService } from '~/services/manage-service/company.service';
import { Dependencies } from '~/core/decorator';
import { Prop } from 'vue-property-decorator';
import { ifError } from 'assert';

@Component({
	components: {
		DataGrid,
		DataGridItem,
	},
})
export default class ModifyBranchInfo extends Vue {
	@Dependencies(CompanyService) private companyService: CompanyService;
	private formRules: any;
	private formItemParent: any = {
		id: '',
		companyChinaname: '',
		companyProvince: '',
		companyCity: '',
		bankAccount: '',
		depositBank: '',
		cardNumber: '',
		branchName: '',
		companyAddress: '',
		companyEngname: '',
		companyFax: '',
		companyLegperson: '',
		companyLinkman: '',
		companyPhone: '',
		companyRemark: '',
		companyStatus: '',
	};

	created() {
		/**
		 *验证
		 */
		this.formRules = {
			companyChinaname: [
				{
					required: true,
					message: '请输入公司简称',
					trigger: 'blur',
				},
				{ max: 10, message: '长度不能超过10个字符', trigger: 'blur' },
			],
			companyProvince: [
				{
					required: true,
					message: '请选择省份',
					trigger: 'change',
					type: 'number',
				},
				{ max: 10, message: '长度不能超过10个字符', trigger: 'blur' },
			],
			companyCity: [
				{
					required: true,
					message: '请选择城市',
					trigger: 'change',
					type: 'number',
				},
				{ max: 10, message: '长度不能超过10个字符', trigger: 'blur' },
			],
			bankAccount: [
				{
					required: true,
					message: '请输入银行户名',
					trigger: 'blur',
				},
				{ max: 10, message: '长度不能超过10个字符', trigger: 'blur' },
			],
			depositBank: [
				{
					required: true,
					message: '请输入开户银行',
					trigger: 'blur',
				},
				{ max: 10, message: '长度不能超过10个字符', trigger: 'blur' },
			],
			cardNumber: [
				{
					required: true,
					message: '请输入银行卡号',
					trigger: 'blur',
				},
				{ max: 10, message: '长度不能超过10个字符', trigger: 'blur' },
			],
			branchName: [
				{
					required: true,
					message: '请输入支行名称',
					trigger: 'blur',
				},
				{ max: 10, message: '长度不能超过10个字符', trigger: 'blur' },
			],
		};
	}
	/**@
	 * 点击确定按钮
	 */
	makeData(row) {
		this.formItemParent.id = row.id;
		this.formItemParent.companyChinaname = row.companyChinaname;
		this.formItemParent.companyProvince = row.companyProvince;
		this.formItemParent.companyCity = row.companyCity;
		this.formItemParent.bankAccount = row.bankAccount;
		this.formItemParent.depositBank = row.depositBank;
		this.formItemParent.cardNumber = row.cardNumber;
		this.formItemParent.branchName = row.branchName;
		this.formItemParent.companyAddress = row.companyAddress;
		this.formItemParent.companyEngname = row.companyEngname;
		this.formItemParent.companyFax = row.companyFax;
		this.formItemParent.companyLegperson = row.companyLegperson;
		this.formItemParent.companyLinkman = row.companyLinkman;
		this.formItemParent.companyPhone = row.companyPhone;
		this.formItemParent.companyRemark = row.companyRemark;
		this.formItemParent.companyStatus = !row.companyStatus ? true : false;
	}
	confirmModify() {
		if (this.formItemParent.companyStatus) {
			this.formItemParent.companyStatus = 0;
		} else {
			this.formItemParent.companyStatus = 1;
		}
		let formVal = <Form>this.$refs['branch-form'];
		formVal.validate(valid => {
			if (valid) {
				this.companyService.createOrModifyCompany(this.formItemParent).subscribe(
					val => {
						this.$Message.success('修改成功！');
						this.$emit('close');
					},
					({ msg }) => {
						this.$Message.error(msg);
					}
				);
			}
		});
	}
	/**
	 * 修改器用/停用
	 */
	change(status) {
		if (status) {
			this.formItemParent.companyStatus = true;
		} else {
			this.formItemParent.companyStatus = false;
		}
	}
}
</script>

<style lang="less">

</style>
