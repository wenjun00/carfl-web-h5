<template>
  <section class="page vehicle-maintenance">
    <span class="form-title">车辆维护</span>
    <i-row>
      <i-col :span="4" style="border:1px solid #dddddd;padding:20px 0;height:590px;">
        <i-row style="border-bottom:1px solid #dddddd;position:relative;bottom:18px;">
          <div style="width: 4px; height: 15px; background: rgb(38, 94, 162); display: inline-block; margin-left:10px;position:relative;top:2px;"></div>
          <span style="position:relative;left:5px;font-size:16px;">车辆品牌</span>
        </i-row>
        <div style="height: 561px;overflow-y: auto;overflow-x: hidden;position:relative;bottom:18px">
          <i-tree :data="treeData" @on-select-change="cartreeChange"></i-tree>
        </div>
      </i-col>
      <i-col :span="19" style="margin-left:15px;height:590px;border:1px solid #dddddd;padding:20px">
        <i-row>
          <i-row>
            <i-col :span="16" v-if='carId'>
              <div>型号名称：{{carName}}</div>
              <div style="margin-top:10px">可选颜色：
                <span v-if="colorListShow" v-for="item in colorPa" :key="item" style="margin-left:10px;">{{item}}</span>
              </div>
              <div style="margin-top:10px">型号参数：</div>
            </i-col>
            <i-col :span="8">
              <i-button class="highButton" @click="editParam" v-if="dataLength" style="float:right;margin-right:50px">编辑参数</i-button>
            </i-col>
          </i-row>
          <i-row>
            <i-col class="parms_container" :span="2">
              <div v-for="item in carTypes" :key="item.id" @click="paramDetail(item)" :class="{'carTypesCss':checkId===item.id}">{{item.paramName}}</div>
              <span class="textButton" @click="addType" v-if="carId" style="margin-top:10px">+添加类别</span>
            </i-col>
            <div style="margin-left:70px;overflow: auto;height:450px;position: relative">
            <i-col :span="22" v-if="dataLength">
              <i-table v-if="viewStatus" :columns="carColumns" :data="paramList"></i-table>
              <i-form class="table_container" v-else>
                <i-row type="flex">
                  <i-col :span="12">参数名称</i-col>
                  <i-col :span="12">参数值</i-col>
                </i-row>
                <i-row v-for="item in paramList" :key="item.id" type="flex" align="middle">
                  <i-col :span="12">
                    <i-form-item style="margin-top:10px;">
                      <i-input v-model="item.name"></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col :span="12">
                    <i-form-item style="margin-top:10px;">
                      <i-input v-model="item.value"></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
              </i-form>
              <i-button type="text" style="color:#265ea2;" @click="addItem">+添加参数</i-button>
            </i-col>
              <div v-if="!dataLength" class="empty_text">空空如也，请选择车辆^_^</div>

            </div>
          </i-row>

        </i-row>
      </i-col>
    </i-row>

    <template>
      <i-modal v-model="addVehicleModal" title="新增车辆" @on-visible-change="addVehicleChange">
        <add-vehicle ref="add-vehicle" @close="closeAndRefreshVehicle"></add-vehicle>
        <div slot="footer">
          <i-button @click="cancleAddVehicle">取消</i-button>
          <i-button class="blueButton" @click="confirmAddVehicle">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addSeriesModal" title="新增车系">
        <add-car-series ref="add-car-series" @closeAndRefreshTree="closeCarSeries"></add-car-series>
        <div slot="footer">
          <i-button @click="cancleSeries">取消</i-button>
          <i-button class="blueButton" @click="confirmCarSeries">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addBrandModal" title="新增品牌">
        <i-form>
          <i-form-item label="品牌名称">
            <i-input v-model="addBrandName" style="width:80%;"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="cancleAddBrand">取消</i-button>
          <i-button class="blueButton" @click="confirmAddBrand">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addCategoryModal" title="添加类别">
        <add-category ref="add-category" @close="closeAndCategory"></add-category>
        <div slot="footer">
          <i-button @click="cancleAddCategory">取消</i-button>
          <i-button class="blueButton" @click="confirmAddCategory">确定</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>
<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import AddVehicle from "~/components/base-data/add-vehicle.vue";
import AddCategory from "~/components/base-data/add-category.vue";
import AddCarSeries from "~/components/base-data/add-car-series.vue";

import { Dependencies } from "~/core/decorator";
import { Layout } from "~/core/decorator";
import SvgIcon from "~/components/common/svg-icon.vue";
import { PageService } from "~/utils/page.service";
import { CarService } from "~/services/manage-service/car.service";
import { CarParamTypeControllerService } from "~/services/manage-service/car-param-type-controller.service";
import { CarParamControllerService } from "~/services/manage-service/car-param-controller.service";
import { WSASERVICE_NOT_FOUND } from "constants";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon,
    AddVehicle,
    AddCategory,
    AddCarSeries
  }
})
export default class VehicleMaintenance extends Page {
  @Dependencies(CarParamTypeControllerService)
  private CarParamTypeControllerService: CarParamTypeControllerService;
  @Dependencies(CarParamControllerService)
  private carParamControllerService: CarParamControllerService;

  @Dependencies(CarService) private carService: CarService;
  @Dependencies(PageService) private pageService: PageService;
  private treeData: Array<any> = [];
  private dataList: Array<any> = [];
  private carId: Number = 0;
  private carDataModel: Array<any> = [];
  private carColumns: Array<any> = [];
  private carParam: String = "";
  private editmessage: any = {};
  private editModal: Boolean = false;
  private addVehicleModal: Boolean = false; // 添加车辆
  private treeDatas: any = [];
  private viewStatus: Boolean = true;
  private dataLength: Boolean = false;
  private carTypes: any = {};
  private paramList: Array<any> = [];
  private oneParamCode: any = {}; //基本参数
  private typeCode: String = ""; //类型码
  private colorPa: Array<any> = []; //车身颜色
  private colorModel: any = {};
  private carName: String = "";
  private checkId: Number = 1;
  private colorListShow: Boolean = false;
  private modifyModel: Array<any> = [];
  private addSeriesModal: Boolean = false;
  private addBrandModal: Boolean = false;
  private addCategoryModal: Boolean = false;
  private carData: any = {};
  private brandId: Number = 0;
  private addBrandName: String = ""; // 新增品牌的名称

  created() {
    this.getCarseries();
    this.carColumns = [
      {
        title: "参数名称",
        key: "name",
        align: "center"
      },
      {
        title: "参数值",
        key: "value",
        align: "center"
      },
      {
        title: "操作",
        align: "center",
        render: (h, { row, column, index }) => {
          return h("div", [
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "提示",
                      content: "确定删除这条参数吗？",
                      onOk: () => {
                        this.deleteFun(row);
                      }
                    });
                  }
                }
              },
              "删除"
            )
          ]);
        }
      }
    ];
  }

  /**
   * 添加系列
   */
  addSeries(data) {
    this.brandId = data.brandId;
    this.addSeriesModal = true;
  }
  /**
   * 添加车辆
   */
  addVehicle(data) {
    this.addVehicleModal = true;
    let _addVehicle: any = this.$refs["add-vehicle"];
    _addVehicle.getAllBrand(data.seriesId);
  }
  addVehicleChange(val) {
    if (!val) {
      this.cancleAddVehicle();
    }
  }
  /**
   * 关闭新增车系
   */
  closeCarSeries() {
    this.addSeriesModal = false;
    this.getCarseries();
  }
  /**
   * 取消新增车系
   */
  cancleSeries() {
    this.addSeriesModal = false;
  }
  /**
   * 确定新增车系
   */
  confirmCarSeries() {
    let _addSeries: any = this.$refs["add-car-series"];
    _addSeries.confirmAddSeries(this.brandId);
  }
  /**
   * 根据车系列树获取车参数类型
   */
  cartreeChange(data) {
    if (data[0] && data[0].carId) {
      this.carName = data[0].title; // 车辆名称
      this.carId = data[0].carId;
      this.carData = data;
      this.CarParamTypeControllerService.getCarParamTypeByCarId({
        carId: this.carId
      }).subscribe(
        val => {
          this.carTypes = val.carParams;
          // this.paramList = [];
          this.oneParamCode = val.carParams[0];
          if (this.oneParamCode) {
            this.typeCode = this.oneParamCode.paramCode;
          }
          val.carParams.length
            ? (this.dataLength = true)
            : (this.dataLength = false);
          if (val.length !== 0) {
            this.colorPa = val.carColors;
            this.colorListShow = true; //判断车辆颜色按钮组显示与否
            let colorObject = val.carParams.filter(
              v => v.paramName === "车身颜色"
            );
            let colorName = this.colorPa.filter(v => v.value === "0");
            this.paramDetail(this.oneParamCode);
          } else {
            this.colorListShow = false;
          }
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
    }
  }
  /**
   * 点击基本参数类型获取参数信息
   */
  paramDetail(item) {
    if (item) {
      this.oneParamCode = item;
      this.typeCode = item.paramCode;
      this.checkId = item.id;
      this.carParamControllerService
        .getCarParamByCode({
          code: item.paramCode
        })
        .subscribe(
          val => {
            this.paramList = val;
          },
          ({ msg }) => {
            this.$Message.error(msg);
          }
        );
    }
  }
  /**
   * 获取所有车辆系列
   */
  getCarseries() {
    this.carService.findAllCarSeries().subscribe(
      data => {
        this.dataList = data;
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
    this.treeDatas = [];
    series.forEach(item => {
      let lv1Node = {
        title: item.brandName,
        brandId: item.id,
        expand: true,
        render: (h, { root, node, data }) => {
          return h(
            "span",
            {
              style: {
                display: "inline-block",
                width: "100%"
              },
              on: {
                click: () => {
                  this.addSeries(data);
                }
              }
            },
            [
              h("span", [
                h("span", data.title),
                h("Icon", {
                  props: {
                    type: "android-add"
                  },
                  style: {
                    marginLeft: "8px",
                    color: "#265ea2",
                    cursor: "pointer"
                  }
                })
              ])
            ]
          );
        },
        children: item.series.map(v => {
          return {
            title: v.seriesName,
            seriesId: v.id,
            expand: true,
            render: (h, { root, node, data }) => {
              return h(
                "span",
                {
                  style: {
                    display: "inline-block",
                    width: "100%"
                  },
                  on: {
                    click: () => {
                      this.addVehicle(data);
                    }
                  }
                },
                [
                  h("span", [
                    h("span", data.title),
                    h("Icon", {
                      props: {
                        type: "android-add"
                      },
                      style: {
                        marginLeft: "8px",
                        color: "#265ea2",
                        cursor: "pointer"
                      }
                    })
                  ])
                ]
              );
            },
            children: v.cars.map(m => {
              return {
                title: m.modelName,
                carId: m.id
              };
            })
          };
        })
      };
      this.treeDatas.push(lv1Node);
    });
    this.treeData = [
      {
        title: "所有品牌",
        expand: true,
        children: this.treeDatas,
        render: (h, { root, node, data }) => {
          return h(
            "span",
            {
              style: {
                display: "inline-block",
                width: "100%"
              },
              on: {
                click: () => {
                  this.addBrand();
                }
              }
            },
            [
              h("span", [
                h("span", data.title),
                h("Icon", {
                  props: {
                    type: "android-add"
                  },
                  style: {
                    marginLeft: "8px",
                    color: "#265ea2",
                    cursor: "pointer"
                  }
                })
              ])
            ]
          );
        }
      }
    ];
  }
  /**
   * 取消新增车辆
   */
  cancleAddVehicle() {
    this.addVehicleModal = false;
    let _addVehicle: any = this.$refs["add-vehicle"];
    _addVehicle.reset();
  }
  /**
   * 确定新增车辆
   */
  confirmAddVehicle() {
    let _addVehicle: any = this.$refs["add-vehicle"];
    _addVehicle.addVehicle();
  }
  closeAndRefreshVehicle() {
    this.getCarseries();
    this.addVehicleModal = false;
  }
  /**
   * 取消新增参数类别
   */
  cancleAddCategory() {
    this.addCategoryModal = false;
    let _addVehicle: any = this.$refs["add-category"];
    _addVehicle.restForm();
  }
  /**
   * 确定新增参数
   */
  confirmAddCategory() {
    let _addVehicle: any = this.$refs["add-category"];
    _addVehicle.addCategoryFun(this.carId);
  }
  closeAndCategory() {
    this.cartreeChange(this.carData);
    this.addCategoryModal = false;
  }
  /**
   * 编辑参数/保存
   */
  editParam(val) {
    if (val.target.innerHTML == "编辑参数") {
      val.target.innerHTML = "保存";
      this.viewStatus = false;
    } else if (val.target.innerHTML == "保存") {
      val.target.innerHTML = "编辑参数";
      this.viewStatus = true;
      this.saveFun();
    }
  }
  /**
   * 保存 提交
   */
  saveFun() {
    this.modifyModel = this.paramList;
    this.carParamControllerService
      .saveOrUpdate({
        carParams: this.modifyModel
      })
      .subscribe(
        val => {
          this.$Message.success("修改成功！");
          this.refreshParamsList(this.typeCode);
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 刷新参数列表
   */
  refreshParamsList(paramCode) {
    this.carParamControllerService
      .getCarParamByCode({
        code: paramCode
      })
      .subscribe(
        val => {
          this.paramList = val;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 删除参数
   */
  deleteFun(row) {
    this.carParamControllerService
      .deleteCarParam({
        id: row.id
      })
      .subscribe(
        val => {
          this.$Message.success("删除成功！");
          this.refreshParamsList(this.typeCode);
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 新增参数
   */
  addItem() {
    this.paramList.push({
      name: "",
      value: "",
      typeCode: ""
    });
    this.paramList.forEach(v => (v.typeCode = this.typeCode));
  }
  /**
   * 确定新增品牌
   */
  confirmAddBrand() {
    this.carService
      .createCarBrand({
        brandName: this.addBrandName
      })
      .subscribe(
        data => {
          this.$Message.success("新增品牌成功！");
          this.getCarseries();
          this.cancleAddBrand();
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 取消新增品牌
   */
  cancleAddBrand() {
    this.addBrandModal = false;
    this.addBrandName = "";
  }
  /**
   * 新增品牌
   */
  addBrand() {
    this.addBrandModal = true;
  }
  /**
   * 添加类别
   */
  addType() {
    this.addCategoryModal = true;
  }
}
</script>
<style lang="less" scope>
.parms_container {
  width: 48px;
  div {
    padding: 8px 0;
    text-align: center;
    color: rgb(212, 211, 211);
    cursor: pointer;
  }
  .carTypesCss {
    color: black;
    font-weight: bold;
  }
}

.avtive {
  color: #000;
}

.table_container {
  // text-align-last: center;
  text-align: center;
  border: 1px solid #dddd;
  .ivu-row-flex {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e9eaec;
    background: #f8f8f9;
  }
  .ivu-row {
    border-bottom: 1px solid #e9eaec;
  }
  .ivu-form-item-content {
    margin-top: 10px;
  }
}

.textButton {
  width: 61px;
  color: #265ea2;
  display: inline-block;
  cursor: pointer;
}

.empty_text {
  height: 300px;
  text-align: center;
  line-height: 400px;
  position: absolute;
  top:0;
  left:350px;
}

.delete {
  cursor: pointer;
  color: #265ea2;
}
</style>
