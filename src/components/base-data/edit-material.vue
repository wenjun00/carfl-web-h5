//新增素材
<template>
  <i-form ref="edit-material" :model="editMaterial" :rules="rulesMaterial" :label-width="80">
    <i-form-item label="素材名称" prop="name">
      <i-input v-model="editMaterial.name"></i-input>
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
export default class EditMaterial extends Vue {
	@Dependencies(PersonalMaterialService) private personalMaterialService: PersonalMaterialService;
	@Prop() propId: any;
	private editMaterial: any = {};
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
		let form = <Form>this.$refs['edit-material'];
		form.validate(valid => {
			if (!valid) return false;
			this.editMaterial.id = this.propId;
			this.editMaterial.type = type;
			this.personalMaterialService.createOrModifyPersonalMaterial(this.editMaterial).subscribe(
				val => {
					this.$Message.success('修改成功！');
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
