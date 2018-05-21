<!--新增车系-->
<template>
  <i-form ref="add-series" :label-width="80">
    <i-form-item label="车辆系列" prop="seriesName">
      <i-input v-model="seriesName"></i-input>
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
  private seriesName: String = "";
  created() {}
  /**
   * 确定新增系列
   */
  confirmAddSeries(brandId) {
    // 判断是否只有空格
      if ((/^[ ]*$/).test(this.seriesName)) {
         this.$Message.error("请填写新增车系名称");
       return
      } 
    this.carService
      .createCarSeries({
        brandId: brandId,
        seriesName: this.seriesName
      })
      .subscribe(
        data => {
          this.$Message.success("新增车辆系列成功！");
          this.$emit("closeAndRefreshTree");
          this.seriesName = "";
          // this.restForm();
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  restForm() {
    let form: any = this.$refs["add-series"];
    form.resetFields();
  }
}
</script>
