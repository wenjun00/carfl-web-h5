//新增素材
<template>
  <i-form ref="add-material" :model="addMaterial" :rules="rulesMaterial" :label-width="80">
    <i-form-item label="素材名称" prop="name">
      <i-input v-model="addMaterial.name"></i-input>
    </i-form-item>
    <i-form-item label="是否启用" prop="isNecessary">
      <i-switch v-model="addMaterial.isNecessary" size="large">
        <span slot="open">启用</span>
        <span slot="close">停用</span>
      </i-switch>
    </i-form-item>
  </i-form>

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { Form } from 'iview';
import { Dependencies } from '~/core/decorator';
import { PersonalMaterialService } from '~/services/manage-service/personal-material.service';

@Component({
	components: {},
})
export default class AddMaterial extends Vue {
	@Dependencies(PersonalMaterialService) private personalMaterialService: PersonalMaterialService;
	private addMaterial: any = {
		name: '',
		isNecessary: '停用',
	};
	private rulesMaterial: any = {};
	created() {
		this.rulesMaterial = {
			name: [
				{ required: true, message: '请输入素材名称', trigger: 'blur' },
				{ type: 'string', max: 20, message: '长度不能超过20个字符', trigger: 'blur' },
			],
		};
	}
	formRules(type) {
		let form = <Form>this.$refs['add-material'];
		console.log(this.addMaterial.isNecessary, 333);
		form.validate(valid => {
			if (!valid) return false;
			this.addMaterial.type = type;
			this.addMaterial.isNecessary == true
				? (this.addMaterial.isNecessary = 0)
				: (this.addMaterial.isNecessary = 1);
			this.personalMaterialService.createOrModifyPersonalMaterial(this.addMaterial).subscribe(
				val => {
					this.$Message.success('新增成功！');
					this.$emit('close');
					this.reset();
				},
				({ msg }) => {
					this.$Message.error(msg);
				}
			);
		});
	}
	reset() {
		let formSet: any = <Form>this.$refs['add-material'];
		formSet.resetFields();
	}
}
</script>
