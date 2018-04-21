//新增产品系列
<template>
  <i-form ref="add-series" :model="addSeries" :rules="rulesAdd" :label-width="80">
    <i-form-item label="系列名称" prop="name">
      <i-input v-model="addSeries.name" :maxlength="20"></i-input>
    </i-form-item>
  </i-form>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { DataGrid, DataGridItem } from '@zct1989/vue-component';
import { Form } from 'iview';
import { Dependencies } from '~/core/decorator';
import { ProductSeriesService } from '~/services/manage-service/product-series.service';

@Component({
	components: {
		DataGrid,
		DataGridItem,
	},
})
export default class addSeries extends Vue {
	@Dependencies(ProductSeriesService) private productSeriesService: ProductSeriesService;
	private addSeries: any = {};
	private rulesAdd: any = {};
	created() {
		this.rulesAdd = {
			// number: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
			name: [{ required: true, message: '您输入的内容不能为空', trigger: 'blur' }],
		};
	}
	reset(){
    let _addseries: any = this.$refs['add-series']
    _addseries.resetFields()
  }
	vaildFun(seriesId) {
    delete this.addSeries.parentId
		let form = <Form>this.$refs['add-series'];
    if(seriesId !== -1) {
		  this.addSeries.parentId = seriesId;
    }
		form.validate(valid => {
			if (!valid) return false;
			this.productSeriesService.createOrModifyProductSeries(this.addSeries).subscribe(
				val => {
					this.$emit('close');
					this.$Message.success('新增产品系列成功！');
					this.reset()
				},
				({ msg }) => {
					this.$Message.error(msg);
				}
			);
		});
	}
}
</script>
