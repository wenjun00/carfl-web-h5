//新增素材类型
<template>
  <i-form ref="add-material-type" :model="addMaterialType" :rules="rulesMaterial" :label-width="100">
    <i-form-item label="素材类型名称" prop="name">
      <i-input v-model="addMaterialType.name"></i-input>
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
export default class AddMaterialType extends Vue {
	@Dependencies(PersonalMaterialService) private personalMaterialService: PersonalMaterialService;
	@Prop() propId: any;
	private addMaterialType: any = {};
	private rulesMaterial: any = {};
	created() {
		this.rulesMaterial = {
			name: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
		};
	}
	formRules(type) {
		let form = <Form>this.$refs['add-material-type'];
		form.validate(valid => {
			if (!valid) return false;
			// this.addMaterialType.id = this.propId;
			// this.addMaterialType.type = type;
			this.personalMaterialService.createOrModifyPersonalMaterial(this.addMaterialType).subscribe(
				val => {
					this.$Message.success('新增素材类型成功！');
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
