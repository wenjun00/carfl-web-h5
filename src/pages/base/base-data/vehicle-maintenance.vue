<template>
    <section class="page prod-config">
        <i-row style="margin-top:20px;">
            <span style="font-size:18px;font-weight:bold;margin-left:8px;">车辆维护</span>
            <i-row>
                <i-col :span="5" style="margin-left:10px;">
                    <div style="width:250px;height:30px;border:1px solid #999999;line-height:30px;font-size:16px;">
                        <div style="width: 4px; height: 15px; background: rgb(38, 94, 162); display: inline-block; margin-left:10px;position:relative;top:2px;"></div>
                        <span style="position:relative;left:5px;">车辆品牌</span>
                        <div style="float:right;display:inline-block;font-weight:bold">
                            <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)">
                                <svg-icon iconClass="tianjiawenjian"></svg-icon>
                            </div>
                            <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)">
                                <svg-icon iconClass="tianjiawenjianjia"></svg-icon>
                            </div>
                            <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)">
                                <svg-icon iconClass="sousuo"></svg-icon>
                            </div>
                        </div>
                    </div>
                    <div style="width:250px;height:600px;border-left:1px solid #999999;border-right:1px solid #999999;border-bottom:1px solid #999999;position:relative;bottom:8px;">
                        <i-tree :data="treeData" style="padding:10px;" @on-select-change="cartreeChange"></i-tree>
                    </div>
                </i-col>
                <i-col :span="17" style="position:relative;bottom:30px;" :pull="1">
                    <i-input style="width:30%;"></i-input>
                    <i-button class="blueButton" style="margin-left:10px" v-model="carParam" placeholder="输入品牌型号进行查询" @click="seach">查询</i-button>
                    <i-table border :columns="carColumns" :data="carDataModel" style="margin-top:20px;"></i-table>
                </i-col>
            </i-row>
        </i-row>
    </section>
</template>
<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { Layout } from "~/core/decorator";
import SvgIcon from "~/components/common/svg-icon.vue";
import { PageService } from "~/utils/page.service";
import { CarService } from "~/services/manage-service/car.service";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class ProdConfig extends Page {
  @Dependencies(CarService) private carService: CarService;
  @Dependencies(PageService) private pageService: PageService;
  private treeData: Array<any> = [];
  private dataList: any = [];
  private treeId: any;
  private carDataModel: Array<any> = [];
  private carColumns: Array<any> = [];
  private carParam: String = "";

  /**
   * 客户素材配置
   */

  created() {
    this.getCarseries();
    this.carColumns = [
      {
        title: "操作",
        align: "center",
        width: 100,
        render: (h, { row, index, column }) => {
          return h("div", [
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                }
              },
              "修改"
            )
          ]);
        }
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
      }
    ];
  }
  /**
   * 根据车系列树获取车列表
   */
  cartreeChange(data) {
    if (data[0].seriesId) {
      this.treeId = data[0].seriesId;
    }
    if (data[0].brandId) {
      this.treeId = data[0].brandId;
    }
    if (data[0].carId) {
      this.treeId = data[0].carId;
    }
    this.carService.findAllCarBySeries(this.treeId).subscribe(
      data => {
        this.carDataModel = data.object;
        console.log(this.carDataModel, 988);
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }
  /**
   * 获取所有车辆系列
   */
  getCarseries() {
    this.carService.findAllCarSeries().subscribe(
      data => {
        this.dataList = data.object;
        this.getTreeDate();
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }
  /**
   * 车系列树遍历
   */
  getTreeDate() {
    let series: Map<string, any> = new Map();
    this.dataList.map(t => {
      if (t.id) {
        series.set(t.id, t);
      }
    });
    this.treeData = [];
    series.forEach(item => {
      let lv1Node = {
        title: "所有品牌",
        expand: true,
        children: [
          {
            title: item.carBrand,
            seriesId: item.id,
            expand: true,
            children: item.series.map(v => {
              return {
                title: v.seriesName,
                brandId: v.id,
                expand: true,
                children: v.cars.map(m => {
                  return {
                    title: m.modelName,
                    carId: m.id
                  };
                })
              };
            })
          }
        ]
      };
      this.treeData.push(lv1Node);
    });
  }

  /**
   * 查询车辆
   */
  //   seach() {
  //     this.carService
  //       .seachCar({
  //         carParam: this.carParam
  //       })
  //       .subscribe(
  //         data => {
  //           this.carDataModel = data.object;
  //         },
  //         ({ msg }) => {
  //           this.$Message.error(msg);
  //         }
  //       );
  //   }
}
</script>
