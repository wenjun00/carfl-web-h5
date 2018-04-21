<template>
  <section class="component add-car row">
    <div class="series-container">
      <i-tree class="series-tree" :data="seriesDataSet" @on-select-change="onSelectSeriesChange"></i-tree>
    </div>
    <div class="car-container col-span">
      <data-box :height="540" ref="data-box" :columns="carColumns" :data="carDataSet" :noDefaultRow="true"></data-box>
    </div>
  </section>
</template>

<script lang="tsx">
import Vue from "vue";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import { Upload, Radio } from "iview";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { ApplyQueryService } from "~/services/business-service/apply-query.service";
import { CarService } from "~/services/manage-service/car.service";
import { Emit } from "vue-property-decorator";
import { PageService } from "~/utils/page.service";

@Component({
  components: {
    DataBox
  }
})
export default class AddCar extends Vue {
  @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
  @Dependencies(CarService) private carService: CarService;
  @Dependencies(PageService) private pageService: PageService;

  private isShown: Boolean = true;
  private carDataSet: any = [];
  private seriesDataSet: any = [];

  /**
   * 车辆列配置
   */
  private carColumns: any = [
    {
      type: "selection",
      align: "center",
      width: 100,
      editable: true
    },
    {
      title: "车辆品牌",
      key: "brandName",
      align: "center"
    },
    {
      title: "车辆型号",
      key: "modelName",
      align: "center"
    },
    {
      title: "车身颜色",
      key: "carColour",
      align: "center"
    },
    {
      title: "车辆排量",
      key: "carEmissions",
      align: "center"
    },
    {
      title: "车辆配置",
      key: "vehicleConfiguration",
      align: "center"
    },
    {
      title: "上牌地区",
      key: "registrationArea",
      align: "center"
    },
    {
      title: "车辆牌照",
      key: "vehicleLicence",
      align: "center"
    },
    {
      title: "所在门店",
      key: "store",
      align: "center"
    },
    {
      title: "状态",
      key: "status",
      align: "center",
      render: (h, { row }) => {
        return <p>{this.$dict.getDictName(row.status)}</p>;
      }
    }
  ];

  mounted() {
    this.getCarSeries();
  }

  /**
   * 返回当前选择项
   */
  getCurrentSelection() {
    let databoxadd: any = this.$refs["data-box"];
    return databoxadd.getCurrentSelection();
  }

  /**
   * 根据车系列树获取车列表
   */
  onSelectSeriesChange([node]) {
    this.carService
      .findAllCarBySeries({
        seriesId: node.seriesId,
        brandId: node.brandId,
        carId: node.carId
      })
      .subscribe(
        data => {
          this.carDataSet = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }

  /**
   * 获取所有车辆系列
   */
  getCarSeries() {
    this.carService.findAllCarSeries().subscribe(
      data => {
        // 获取车辆列表
        let getCarList = car => ({
          title: car.modelName,
          carId: car.id
        });

        // 获取系列列表
        let getSeriesList = series => ({
          title: series.seriesName,
          seriesId: series.id,
          expand: true,
          children: series.cars.map(getCarList)
        });

        // 获取品牌列表
        let getBrandList = brand => ({
          expand: true,
          title: brand.brandName,
          brandId: brand.id,
          children: brand.series.map(getSeriesList)
        });

        // 生成数据集
        this.seriesDataSet = [
          {
            title: "所有品牌",
            expand: true,
            children: data.map(getBrandList)
          }
        ];
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }
}
</script>
<style lang="less" scoped>
.component.add-car {
  .series-container {
    padding: 10px;
    height: 560px;
    width:200px;
    flex-basis: 200px;
    overflow: auto;

    .series-tree {
      padding: 5px 20px;
      border: solid 1px #ccc;
      height: 100%;
      overflow: auto;
    }
  }

  .car-container {
  }
}
</style>
