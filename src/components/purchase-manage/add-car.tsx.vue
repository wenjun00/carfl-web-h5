<template>
  <section class="component add-car">
    <i-row class="data-container">
      <i-col span="4" class="item-sousuo-col">
        <i-tree class="item-sousuo-tree" :data="seriesDataSet" @on-select-change="onSelectSeriesChange"></i-tree>
      </i-col>
      <i-col class="item-data-box" span="20">
        <data-box :height="540" ref="data-box" :columns="carColumns" :data="carDataSet" :noDefaultRow="true"></data-box>
      </i-col>
    </i-row>
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

  private carColumns: any = [
    {
      type: "selection",
      align: "center",
      width: 100
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
        return h("p", {}, this.$dict.getDictName(row.status));
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
   * 选择并返回
   */
  chooseback() {
    // if (this.addOpen === true) {
    //   let databoxadd: any = this.$refs["data-box"];
    //   this.multipleSelection = databoxadd.getCurrentSelection();
    // } else {
    //   let radioRowData = this.carDataSet.find(v => v.radio === true);
    //   this.multipleSelection = radioRowData;
    // }
    // if (this.multipleSelection === undefined) {
    //   this.$Message.warning("请选择车辆！");
    //   return;
    // } else {
    //   if (this.rowData) {
    //     Object.assign(this.rowData, this.multipleSelection);
    //     this.addcarData[this.index] = this.multipleSelection;
    //     this.complutedtotalPrice();
    //   } else {
    //     this.distributionData(this.addcarData.concat(this.multipleSelection));
    //     this.multipleSelection = [];
    //   }
    //   this.close();
    // }
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
  .open {
    max-width: auto;
    overflow: hidden;
  }

  .close {
    max-width: 0;
    min-width: 0;
    overflow: hidden;
  }

  .arrowUp {
    transform: rotate(0deg); // transition: transform ease-in 0.2s;
    cursor: pointer;
  }

  .arrowDown {
    transform: rotate(180deg); // transition: transform ease-in 0.2s;
    cursor: pointer;
  }

  .arrowButton {
    line-height: 570px;
    height: 100%;
    background: #265ea2;
    text-align: center;
    width: 20px;
  }
  .item-sousuo-input {
    display: inline-block;
    width: 20%;
    margin-right: 10px;
  }
  .data-container {
    margin-top: 10px;
  }
  .item-sousuo-col {
    border: 1px solid #dddddd;
    height: 570px;
    overflow: auto;
  }
  .item-sousuo-tree {
    padding: 10px;
  }
  .item-data-box {
    overflow: hidden;
  }
  .item-xuanze-row {
    margin-top: 20px;
  }
  .item-xuanze-button {
    float: right;
  }
}
</style>
