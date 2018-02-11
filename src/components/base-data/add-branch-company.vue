<!--新增分公司-->
<template>
  <section class="component add-branch-company">
    <i-form :label-width="80" class="addCompany" :model="addBranchModel" ref="add-company" :rules="rules" label-position="left">
      <i-row>
        <i-col :span="12">
          <i-form-item label="公司简称" prop="companyChinaname">
            <i-input v-model="addBranchModel.companyChinaname"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="11" :push="1">
          <i-form-item label="户名" prop="bankAccount">
            <i-input v-model="addBranchModel.bankAccount"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="所在省" prop="companyProvince">
            <i-select style="100%" placeholder="选择省" v-model="addBranchModel.companyProvince" clearable>
              <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="11" :push="1">
          <i-form-item label="所在市" prop="companyCity">
            <i-select style="100%" placeholder="选择市" v-model="addBranchModel.companyCity" clearable>
              <i-option v-for="{value,label} in this.addBranchModel.companyProvince ? this.$city.getCityData({ level: 1, id: this.addBranchModel.companyProvince }) : []" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="开户银行" prop="depositBank">
            <i-input v-model="addBranchModel.depositBank"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="11" :push="1">
          <i-form-item label="银行卡号" prop="cardNumber">
            <i-input v-model="addBranchModel.cardNumber"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="是否启用">
            <i-switch v-model="status"></i-switch>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { Form } from 'iview';
import { Dependencies } from '~/core/decorator';
import { ManageService } from '~/services/manage-service/manage.service';
import { CompanyService } from '~/services/manage-service/company.service';
@Component({
	components: {},
})
export default class AddBranchCompany extends Vue {
	@Dependencies(CompanyService) private companyService: CompanyService;
	private addBranchModel: any = {
		companyChinaname: '',
		bankAccount: '',
		companyProvince: '',
		companyCity: '',
		depositBank: '',
		cardNumber: '',
		companyStatus: true,
	};
	private rules: any;
	private status: any;

	created() {
		this.status = true;
		this.rules = {
			companyChinaname: [
				{
					required: true,
					message: '请输入公司简称',
					trigger: 'blur',
				},
			],
			bankAccount: [
				{
					required: true,
					message: '请输入公司简称',
					trigger: 'blur',
				},
			],
			companyProvince: [
				{
					required: true,
					message: '请选择省份',
					trigger: 'change',
					type: 'number',
				},
			],
			companyCity: [
				{
					required: true,
					message: '请选择城市',
					trigger: 'change',
					type: 'number',
				},
			],
			depositBank: [
				{
					required: true,
					message: '请输入开户银行',
					trigger: 'change',
				},
			],
			cardNumber: [
				{
					required: true,
					message: '请输入银行卡号',
					trigger: 'change',
				},
			],
		};
	}
	/**
	 * 确认新增公司
	 */
	confirmAddCompany() {
		if (this.status) {
			this.addBranchModel.companyStatus = 0;
		} else {
			this.addBranchModel.companyStatus = 1;
		}
		console.log(this.status, this.addBranchModel.companyStatus, 989);
		let _addForm: any = this.$refs['add-company'];
		_addForm.validate(valid => {
			if (valid) {
				this.companyService.createOrModifyCompany(this.addBranchModel).subscribe(
					data => {
						this.$Message.success('新增成功！');
						this.resetForm();
						this.$emit('close');
					},
					({ msg }) => {
						this.$Message.error(msg);
					}
				);
			}
		});
	}
	resetForm() {
		let _addUserForm: any = this.$refs['add-company'];
		_addUserForm.resetFields();
	}
	mounted() {}
}
</script>
<style lang="less">
.addCompany {
	// position: relative;
	// right: 10px;
}
</style>
