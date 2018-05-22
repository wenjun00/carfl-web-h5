<!--新增车系-->
<template>
  <i-form :rules="carSeriesRule" :model="carSeriesModel" ref="form-item" :label-width="80">
    <i-form-item label="车辆系列" prop="seriesName">
      <i-input v-model.trim="carSeriesModel.seriesName"></i-input>
    </i-form-item>
  </i-form>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Form } from "iview";
import { Dependencies } from "~/core/decorator";
import { CarService } from "~/services/manage-service/car.service";

@Component({
  components: {}
})
export default class AddApprovalReason extends Vue {
  @Dependencies(CarService) private carService: CarService;
  private carSeriesModel: any = {
    seriesName: ''
  };

  private carSeriesRule: any = {
    seriesName: [{ required: true, message: '请输入车辆系列名称', trigger: 'blur', }],
  }

  created() { }
  /**
   * 确定新增系列
   */
  confirmAddSeries(brandId) {
    let form = <Form>this.$refs['form-item']
    form.validate(valid => {
      if (!valid) return false
      this.carService
        .createCarSeries({
          brandId: brandId,
          seriesName: this.carSeriesModel.seriesName
        })
        .subscribe(
          data => {
            this.$Message.success("新增车辆系列成功！");
            this.$emit("closeAndRefreshTree");
            this.carSeriesModel.seriesName = "";
            // this.restForm();
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    })
  }
  //关闭车系
  resetClose(){
    this.carSeriesModel.seriesName=''
    }



  restForm() {
    let form: any = this.$refs["form-item"];
    form.resetFields();
  }
}
</script>
