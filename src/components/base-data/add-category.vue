<template>
  <i-form ref="add-category" :model="addCategory" :rules="ruleCategory" :label-width="80">
    <i-form-item label="参数名称" prop="paramName">
      <i-input v-model="addCategory.paramName"></i-input>
    </i-form-item>
  </i-form>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { Form } from 'iview';
import { Dependencies } from '~/core/decorator';
import { CarParamTypeControllerService } from '~/services/manage-service/car-param-type-controller.service';

@Component({
	components: {},
})
export default class AddApprovalReason extends Vue {
	@Dependencies(CarParamTypeControllerService) private carParamTypeControllerService: CarParamTypeControllerService;
	private addCategory: any = {};
	private ruleCategory: any = {};
	private carParams: any = {};
	created() {
		this.ruleCategory = {
			paramName: [
				{ required: true, message: '请输入参数类别名称', trigger: 'blur' },
				{ max: 10, message: '长度不能超过10个字符', trigger: 'blur' },
			],
		};
		this.addCategory = {
			paramName: '',
			carId: '',
		};
	}

	addCategoryFun(carId) {
		let formValid = <Form>this.$refs['add-category'];
		this.addCategory.carId = carId;
		formValid.validate(valid => {
			if (!valid) return false;
			this.carParamTypeControllerService.saveOrUpdate(this.addCategory).subscribe(
				val => {
					this.$emit('close');
					this.$Message.success('新增类别成功！');
				},
				({ msg }) => {
					this.$Message.error(msg);
				}
			);
		});
	}
	restForm() {
		let form: any = this.$refs['add-category'];
		form.resetFields();
	}
}
</script>
