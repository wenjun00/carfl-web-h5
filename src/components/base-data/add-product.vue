//新增产品
<template>
  <i-form ref="add-product" :model="addProduct" :rules="rulesAdd" :label-width="80">
    <i-form-item label="产品序号" prop="number">
      <i-input v-model="addProduct.number"></i-input>
    </i-form-item>
    <i-form-item label="产品名称" prop="name">
      <i-input v-model="addProduct.name"></i-input>
    </i-form-item>
    <i-form-item label="资金渠道">
      <Select v-model="addProduct.capitaChannels" style="width:100px">
        <Option value="382" key="382" label="自有资金"></Option>
      </Select>
    </i-form-item>
  </i-form>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { DataGrid, DataGridItem } from 'vue-fintech-component';
import { Form } from 'iview';
import { Dependencies } from '~/core/decorator';
import { ProductService } from '~/services/manage-service/product.service';

@Component({
	components: {
		DataGrid,
		DataGridItem,
	},
})
export default class AddProduct extends Vue {
	@Dependencies(ProductService) private productService: ProductService;
	private addProduct: any = {};
	private rulesAdd: any = {};
	created() {
		this.rulesAdd = {
			number: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
			name: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
			capitaChannels: [{ required: true, message: '请选择资金渠道', trigger: 'change' }],
		};
	}
	vaildFun(seriesId) {
		let form = <Form>this.$refs['add-product'];
		this.addProduct.seriesId = seriesId;
		form.validate(valid => {
			if (!valid) return false;
			this.productService.createOrModifyProduct(this.addProduct).subscribe(
				val => {
					this.$emit('close');
					this.$Message.success('新增产品成功！');
				},
				({ msg }) => {
					this.$Message.error(msg);
				}
			);
		});
	}
}
</script>
<style lang="less" scoped>
.ivu-modal-body {
	height: 600px;
	overflow: auto;
}
</style>
