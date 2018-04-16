<template>
  <section class="component add-car">
    <i-row>
      <i-input style="display:inline-block;width:20%;margin-right:10px" placeholder="请输入关键字"></i-input>
      <!--<i-select placeholder="门店" style="margin-left:10px;width:10%;">
        <i-option label="已启用" value="已启用" key="已启用"></i-option>
        <i-option label="未启用" value="未启用" key="未启用"></i-option>
      </i-select>-->
      <i-button class="blueButton">搜索</i-button>
    </i-row>
    <i-row style="margin-top:10px;">
      <i-col :span="4" style="border:1px solid #DDDDDD;height:570px;overflow:auto" :class="{open:isShown,close:!isShown}">
        <i-tree :data="treeData" style="padding:10px;" @on-select-change="cartreeChange"></i-tree>
      </i-col>
      <i-col :span="19">
        <i-row type="flex" justify="start">
          <i-col class="arrowButton" :span="2">
            <div :class="{arrowDown:!isShown,arrowUp:isShown}" @click="showCategory">
              <Icon type="android-arrow-dropleft-circle" color="white" size="16"></Icon>
            </div>
          </i-col>
         <i-col span="22" style="overflow:hidden" v-show="addOpen===true">
            <div>
              <data-box :height="540" ref="databox-add" :columns="carColumns" :data="carDataModel" :noDefaultRow="true"></data-box>
            </div>
          </i-col>
            <i-col span="22" style="overflow:hidden" v-show="addOpen===false">
            <div>
              <data-box :height="540" ref="databox-edit" :columns="carColumns1" :data="carDataModel" :noDefaultRow="true"></data-box>
            </div>
          </i-col>
        </i-row>
      </i-col>
    </i-row>
    <i-row style="margin-top:20px;">
      <i-button class="blueButton" style="float:right" @click="chooseback">选择并返回</i-button>
    </i-row>
  </section>
</template>

<script lang="tsx">
  import Vue from 'vue';
  import DataBox from '~/components/common/data-box.vue';
  import Component from 'vue-class-component';
  import { Upload, Radio } from "iview";
  import {
    Prop
  } from 'vue-property-decorator';
  import {
    Dependencies
  } from '~/core/decorator';
  import {
    ApplyQueryService
  } from '~/services/business-service/apply-query.service';
  import {
    CarService
  } from '~/services/manage-service/car.service';
  import {
    Emit
  } from 'vue-property-decorator';
  import {
    PageService
  } from "~/utils/page.service";

  @Component({
    components: {
      DataBox,
    },
  })
  export default class AddCar extends Vue {
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    @Dependencies(CarService) private carService: CarService;
    @Dependencies(PageService) private pageService: PageService;
    private isShown: Boolean = true;
    private carColumns: any;
    private carColumns1:any;
    private carDataModel:any= [];
    private dataList: any = [];
    private treeData: any = [];
    private treeId: any;
    private multipleSelection: any = [];
    private treeDatas: any = [];
    private vv:any=1;
    private seriesId:any='';
    private brandId:any='';
    private carId:any='';

    @Emit('distributionData')
    distributionData(multipleSelection) {}
    @Emit('close')
    close() {}
    @Emit('complutedtotalPrice')
    complutedtotalPrice(){}
    @Prop() rowData: any;
    @Emit('update:rowData')
    updateRowData(row) {}
    @Prop() addcarData: any;
    @Prop() addOpen:any;
    @Prop() editOpen:any;
    @Prop() index:any;


    @Prop() row: Object;
    created() {
      this.getCarseries();
      this.carColumns = [{
          type: 'selection',
          align: 'center',
          width: 100,
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
        {
          title: '车辆配置',
          key: 'vehicleConfiguration',
          align: 'center',
        },
        {
          title: '上牌地区',
          key: 'registrationArea',
          align: 'center'
        },
        {
          title: '车辆牌照',
          key: 'vehicleLicence',
          align: 'center'
        },
        {
          title: '所在门店',
          key: 'store',
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.status));
          }
        },
      ];
        this.carColumns1 = [{
            align: 'center',
            title: '选择',
            width: 180,
            render: (h, {
              row,
              columns,
              index
            }) => {
            let radioChange=(status) => {
                this.carDataModel.forEach(v=>v.radio=false)
                this.carDataModel[index].radio = status
                this.carDataModel = JSON.parse(JSON.stringify(this.carDataModel))
            };
            return (<i-radio onOn-change={radioChange} value={row.radio}></i-radio>)
            }
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
        {
          title: '车辆配置',
          key: 'vehicleConfiguration',
          align: 'center',
        },
        {
          title: '上牌地区',
          key: 'registrationArea',
          align: 'center'
        },
        {
          title: '车辆牌照',
          key: 'vehicleLicence',
          align: 'center'
        },
        {
          title: '所在门店',
          key: 'store',
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.status));
          }
        },
      ];
    }
    showCategory() {
      this.isShown = !this.isShown;
    }
    /**
     * 清空车辆信息列表
     */
    resetcarDataModel(){
        this.carDataModel=[]
    }
    /**
     * 选择并返回
     */
    chooseback() {
      if(this.addOpen===true){
      let databoxadd:any = this.$refs['databox-add'];
      this.multipleSelection = databoxadd.getCurrentSelection();
        }else{
            let radioRowData=this.carDataModel.find(v=>v.radio===true)
            this.multipleSelection=radioRowData
        }
      if (this.multipleSelection === undefined) {
        this.$Message.warning('请选择车辆！')
        return
      } else {
        if (this.rowData) {
          Object.assign(this.rowData, this.multipleSelection);
          this.addcarData[this.index]=this.multipleSelection
          this.complutedtotalPrice()
        } else {
          this.distributionData(this.addcarData.concat(this.multipleSelection));
          this.multipleSelection = [];
        }
        this.close();
        this.getCarseries()
      }
    }
    /**
     * 根据车系列树获取车列表
     */
    cartreeChange(data) {
      if (data[0].seriesId) {
        this.seriesId= data[0].seriesId;
      }else{
          this.seriesId=''
      }
      if (data[0].brandId) {
        this.brandId = data[0].brandId;
      }else{
        this.brandId=''  
      }
      if (data[0].carId) {
        this.carId = data[0].carId;
      }else{
        this.carId=''  
      }
      this.carService.findAllCarBySeries({
        seriesId: this.seriesId,
        brandId: this.brandId,
        carId: this.carId
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
      this.treeDatas = [];
      series.forEach(item => {
        let lv1Node = {
          title: item.brandName,
          brandId: item.id,
          expand: true,
          children: item.series.map(v => {
            return {
              title: v.seriesName,
              seriesId: v.id,
              expand: true,
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
      this.treeData = [{
        title: "所有品牌",
        expand: true,
        children: this.treeDatas,

      }];
    }
  }

</script>
<style lang="less" scope>
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

</style>
