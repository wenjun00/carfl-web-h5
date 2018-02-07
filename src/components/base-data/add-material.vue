//新增素材
<template>
  <i-form ref="add-material" :model="addMaterial" :rules="rulesMaterial" :label-width="80">
    <i-form-item label="素材名称" prop="name">
      <i-input v-model="addMaterial.name"></i-input>
    </i-form-item>
    <i-form-item label="是否启用" prop="isSelect">
      <Checkbox v-model="addMaterial.isSelect"></Checkbox>
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
	private addMaterial: any = {};
	private rulesMaterial: any = {};
	created() {
		this.rulesMaterial = {
			name: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
		};
	}
	formRules(type) {
		let form = <Form>this.$refs['add-material'];
		form.validate(valid => {
			this.addMaterial.type = type;
			this.addMaterial.isSelect == true ? (this.addMaterial.isSelect = 0) : (this.addMaterial.isSelect = 1);
			this.personalMaterialService.createOrModifyPersonalMaterial(this.addMaterial).subscribe(
				val => {
					this.$Message.success('新增成功！');
					this.$emit('close');
				},
				({ msg }) => {
					this.$Message.error(msg);
				}
			);
		});
	}
}
</script>
