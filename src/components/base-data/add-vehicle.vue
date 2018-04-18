<!--新增车辆-->
<template>
  <section class="component add-vehicle">
    <i-form :label-width="110" ref="add-vehicle" :model="addVehicleModel" :rules="rules">
      <i-form-item label="车辆品牌" prop="brandId">
        <i-select class="data-form-item" v-model="addVehicleModel.brandId" @on-change="changeBrand" disabled>
          <i-option v-for="item in allBrand" :key="item.id" :value="item.id" :label="item.brandName"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="车辆系列" prop="seriesId">
        <i-select class="data-form-item" v-model="addVehicleModel.seriesId" disabled>
          <i-option v-for="item in allSeries" :key="item.id" :value="item.id" :label="item.seriesName"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="车辆型号" prop="modelName">
        <i-input class="data-form-item" v-model="addVehicleModel.modelName"></i-input>
      </i-form-item>
      <i-form-item label="车辆颜色" prop="carColour">
        <i-input class="data-form-item" v-model="addVehicleModel.carColour"></i-input>
        <span style="color:red">多种颜色请用；隔开</span>
      </i-form-item>
      <i-form-item label="车辆排量" prop="carEmissions">
        <i-input class="data-form-item" v-model="addVehicleModel.carEmissions"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DataBox from "~/components/common/data-box.vue";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { CarService } from "~/services/manage-service/car.service";
import { Form } from "iview";
@Component({
  components: {
    DataBox
  }
})
export default class AddVehicle extends Vue {
  @Dependencies(CarService) private carService: CarService;
  private addVehicleModel = {
    brandId: "",
    seriesId: "",
    modelName: "",
    carColour: "",
    carEmissions: ""
  };
  private rules: any;
  private allBrand: Array<any> = []; // 所有品牌
  private allSeries: Array<any> = []; // 所有系列
  @Prop() row: Object;

  created() {
    this.rules = {
      brandId: [
        {
          trigger: "blur",
          message: "请选择车辆品牌",
          required: true,
          type: "number"
        }
      ],
      seriesId: [
        {
          trigger: "change",
          message: "请选择车辆系列",
          required: true,
          type: "number"
        }
      ],
      modelName: [
        {
          trigger: "blur",
          message: "请输入车辆型号",
          required: true
        }
      ],
      carColour: [
        {
          trigger: "blur",
          message: "请输入车辆颜色",
          required: true
        }
      ],
      carEmissions: [
        {
          trigger: "blur",
          message: "请输入车辆排量",
          required: true
        }
      ]
    };
  }
  addVehicle() {
    let _addVehicleForm = <Form>this.$refs["add-vehicle"];
    _addVehicleForm.validate(valid => {
      if (valid) {
        this.carService.addVehicle(this.addVehicleModel).subscribe(
          data => {
            this.$Message.success("新增车辆成功！");
            this.$emit("close");
            this.reset();
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
      }
    });
  }
  reset() {
    let _addRole = <Form>this.$refs["add-vehicle"];
    _addRole.resetFields();
  }
  getAllBrand(seriesId) {
    this.addVehicleModel.seriesId = seriesId;
    this.carService.getAllBrand().subscribe(
      data => {
        this.allBrand = data;
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );

    /**
     * 获取品牌id
     */
    this.carService
      .getCarBrandBySeriesId({
        seriesId: seriesId
      })
      .subscribe(
        data => {
          this.addVehicleModel.brandId = data.brandId;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  changeBrand(val) {
    if (val) {
      this.carService
        .getSeriesByBrandId({
          brandId: val
        })
        .subscribe(data => {
          this.allSeries = data;
        });
    }
  }
}
</script>

<style lang="less" scoped>
.component.add-vehicle{
    .data-form-item{
        width: 260px;
    }
}
</style>
