<template>
  <section class="page prod-config">
    <span class="form-title">车辆维护</span>
    <i-row>
      <i-col :span="4" style="border:1px solid #dddddd;padding:20px 0;height:590px;">
        <!--<div style="width: 4px; height: 15px; background: rgb(38, 94, 162); display: inline-block; margin-left:10px;position:relative;top:2px;"></div>-->
        <i-row style="border-bottom:1px solid #dddddd;position:relative;bottom:10px;">
          <span style="position:relative;left:5px;">车辆品牌</span>
          <div style="float:right;display:inline-block;font-weight:bold;position:relative;bottom:6px;">
            <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)" @click="addVehicle">
              <svg-icon iconClass="tianjiawenjian"></svg-icon>
            </div>
            <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)">
              <svg-icon iconClass="tianjiawenjianjia"></svg-icon>
            </div>
            <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)">
              <svg-icon iconClass="sousuo"></svg-icon>
            </div>
          </div>
        </i-row>
        <div>
          <i-tree :data="treeData" style="padding:10px;" @on-select-change="cartreeChange"></i-tree>
        </div>
      </i-col>
      <i-col :span="20">
        <i-row>
          <i-input style="width:12%;margin-left:20px"></i-input>
          <i-button class="blueButton" style="margin-left:10px" v-model="carParam" placeholder="输入品牌型号进行查询" @click="seach">搜索</i-button>
        </i-row>
        <data-box border :columns="carColumns" :data="carDataModel" style="margin-top:20px;" @onPageChange="seach" :page="pageService"></data-box>
      </i-col>
    </i-row>
    <template>
      <i-modal v-model="editModal" title="修改车辆信息" style="width:800px;">
        <edit-car-maintenance :editMessage="editmessage" ref="edit-car-maintenance" @close="closeAndRefresh"></edit-car-maintenance>
        <div slot="footer">
          <i-button class="Ghost" @click="closeFun">取消</i-button>
          <i-button class="blueButton" @click="submitButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="addVehicleModal" title="新增车辆">
        <add-vehicle ref="add-vehicle" @close="closeAndRefreshVehicle"></add-vehicle>
        <div slot="footer">
          <i-button @click="cancleAddVehicle">取消</i-button>
          <i-button class="blueButton" @click="confirmAddVehicle">确定</i-button>
        </div>
      </i-modal>
    </template>

  </section>
</template>
<script lang="ts">
  import Page from '~/core/page';
  import DataBox from '~/components/common/data-box.vue';
  import Component from 'vue-class-component';
  import EditCarMaintenance from '~/components/base-data/edit-car-maintenance.vue';
  import {
    Dependencies
  } from '~/core/decorator';
  import {
    Layout
  } from '~/core/decorator';
  import SvgIcon from '~/components/common/svg-icon.vue';
  import {
    PageService
  } from '~/utils/page.service';
  import {
    CarService
  } from '~/services/manage-service/car.service';
  import AddVehicle from '~/components/base-data/add-vehicle.vue'
  @Layout('workspace')
  @Component({
    components: {
      DataBox,
      SvgIcon,
      EditCarMaintenance,
      AddVehicle
    }
  })
  export default class ProdConfig extends Page {
    @Dependencies(CarService) private carService: CarService;
    @Dependencies(PageService) private pageService: PageService;
    private treeData: Array < any > = [];
    private dataList: any = [];
    private treeId: any;
    private carDataModel: Array < any > = [];
    private carColumns: Array < any > = [];
    private carParam: String = '';
    private editmessage: any = {};
    private editModal: Boolean = false;
    private addVehicleModal: Boolean = false; // 添加车辆
    private checkData: any;
    /**
     * 客户素材配置
     */

    created() {
      this.getCarseries();
      this.carColumns = [{
          title: '操作',
          align: 'center',
          width: 100,
          render: (h, {
            row,
            index,
            column
          }) => {
            return h('div', [
              h(
                'i-button', {
                  props: {
                    type: 'text',
                  },
                  style: {
                    color: '#265EA2',
                  },
                  on: {
                    click: () => {
                      this.editFun(row);
                    },
                  },
                },
                '修改'
              ),
            ]);
          },
        },
        {
          title: '车辆品牌',
          key: 'brandName',
          align: 'center',
        },
        {
          title: '车辆型号',
          key: 'modelName',
          align: 'center',
        },
        {
          title: '车身颜色',
          key: 'carColour',
          align: 'center',
        },
        {
          title: '车辆排量',
          key: 'carEmissions',
          align: 'center',
        },
      ];
    }
    /**
     * 添加车辆
     */
    addVehicle() {
      this.addVehicleModal = true
      let _addVehicle: any = this.$refs['add-vehicle']
      _addVehicle.getAllBrand()
    }
    /**
     * 根据车系列树获取车列表
     */
    cartreeChange(data) {
      this.checkData = data
      if (data[0].seriesId) {
        this.treeId = data[0].seriesId;
      }
      if (data[0].brandId) {
        this.treeId = data[0].brandId;
      }
      if (data[0].carId) {
        this.treeId = data[0].carId;
      }
      this.carService.findAllCarBySeries({
        seriesId: this.treeId
      }).subscribe(
        data => {
          this.carDataModel = data;
        },
        ({
          msg
        }) => {
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
          this.dataList = data;
          this.getTreeDate();
        },
        ({
          msg
        }) => {
          this.$Message.error(msg);
        }
      );
    }
    /**
     * 车系列树遍历
     */
    getTreeDate() {
      let series: Map < string, any > = new Map();
      this.dataList.map(t => {
        if (t.id) {
          series.set(t.id, t);
        }
      });
      this.treeData = [];
      series.forEach(item => {
        let lv1Node = {
          title: '所有品牌',
          expand: true,
          children: [{
            title: item.brandName,
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
                    carId: m.id,
                  };
                }),
              };
            }),
          }, ],
        };
        this.treeData.push(lv1Node);
      });
    }
    /**
     * 取消新增车辆
     */
    cancleAddVehicle() {
      this.addVehicleModal = false
      let _addVehicle: any = this.$refs['add-vehicle']
      _addVehicle.reset()
    }
    /**
     * 确定新增车辆
     */
    confirmAddVehicle() {
      let _addVehicle: any = this.$refs['add-vehicle']
      _addVehicle.addVehicle()
    }
    /**
     * 查询车辆
     */
    seach() {
      this.carService
        .seachCar({
          carParam: this.carParam,
        })
        .subscribe(
          data => {
            this.carDataModel = data;
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    /**@augments
     * 编辑
     */
    editFun(row) {
      this.editModal = true;
      let editOpen: any = this.$refs['edit-car-maintenance'];
      editOpen.makeData(row);
    }
    closeFun() {
      this.editModal = false;
    }
    closeAndRefresh() {
      this.editModal = false;
      this.cartreeChange(this.checkData)
    }
    submitButton() {
      let editOpen: any = this.$refs['edit-car-maintenance'];
      editOpen.vaildFun();
    }
    closeAndRefreshVehicle() {
      this.getCarseries()
      this.addVehicleModal = false
    }
  }

</script>
