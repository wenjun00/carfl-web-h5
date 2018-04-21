<!--全额付款客户资料-->
<template>
  <section class="component choose-buy-materials-all">
    <div class="form-title">选购信息</div>
    <i-row class="proCity">
      <i-form :rules="applyRule" ref="parchase-form" :label-width="110" :model="choosebusyData">
        <i-col span="12">
          <i-form-item label="申请省份" prop="province">
            <i-select placeholder="选择省" v-model="choosebusyData.province" clearable>
              <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="申请城市" prop="city">
            <i-select v-model="choosebusyData.city" placeholder="选择市" clearable>
              <i-option v-for="{value,label} in this.choosebusyData.province ? this.$city.getCityData({ level: 1, id: this.choosebusyData.province }) : []"
                :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="所属公司" prop="companyId">
            <i-select v-model="choosebusyData.companyId" clearable>
              <i-option v-for="item in companyObject" :key="item.id" :value="item.id" :label="item.companyChinaname"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-form>
    </i-row>
    <i-table :columns="columns1" :data="addcarData" :width="1100"></i-table>
    <div>
      <Icon class="icon-module" type="plus"></Icon>
      <i-button class="add-rook" @click="addModalOpen" type="text">添加车辆</i-button>
      <span class="total-title">总价</span>
      <span class="total-content">{{totalPrice}}</span>
    </div>
    <!--添加车辆弹框-->
    <template>
      <i-modal :title="addOrEditFlag?'添加车辆':'编辑车辆'" width="1200" v-model="editCarModal" :trandfer="false" class="add-car">
        <add-car ref="add-car" :addOpen="addOpen"  @distributionData="distributionData" :addcarData.sync="addcarData" :rowData.sync="rowData" @close="editCarModal=false,rowData=null"></add-car>
      </i-modal>
    </template>
  </section>
</template>

<script lang="tsx">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import DataBox from "~/components/common/data-box.vue"
  import {
    ApplyQueryService
  } from "~/services/business-service/apply-query.service";
  import {
    CompanyService
  } from "~/services/manage-service/company.service";
  import {
    CarService
  } from "~/services/manage-service/car.service";
  import {
    Prop
  } from "vue-property-decorator";
  import AddCar from "~/components/purchase-manage/add-car.tsx.vue";
  import {
    Input,
    Button
  } from "iview";

  @Component({
    components: {
      SvgIcon,
      DataBox,
      AddCar
    }
  })
  export default class ChooseBuyMaterialsAll extends Vue {
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    @Dependencies(CompanyService) private companyService: CompanyService;
    @Dependencies(CarService) private carService: CarService;
    private columns1: any;
    private data1: Array < Object > = [];
    private editCarModal: Boolean = false;
    private addOrEditFlag: Boolean = false;
    private addCar: Boolean = false;
    private totalPrice: any = '';
    private carDataModal: Array < Object > = []; // 车辆信息
    private choosebusyData: any = {
      province: '', // 省份
      city: '', // 城市
      companyId: '' // 所属公司
    };
    private companyObject: Array < Object >= []; // 公司信息
    private addcarData: any = [];
    private rowData: any = null;
    private saveData: any = null;
    private addOpen: Boolean = false;

    private applyRule: any = {
      province: [{
        required: true,
        message: '请选择申请省份',
        trigger: 'change',
        type: 'number',
      }],
      city: [{
        required: true,
        message: '请选择申请城市',
        trigger: 'change',
        type: 'number',
      }]
    };
    @Prop()
    disabledStatus: String;
    @Prop() currentRowData: any;
    created() {

      //   console.log(this.currentRowData.addcarData, 800)
      //   this.addcarData = this.currentRowData.addcarData
      // 获取公司名称
      this.companyService.getAllEnableCompany().subscribe(val => {
        this.companyObject = val
      })
      this.carService.findAllCarSeries().subscribe(val => {
        this.carDataModal = val
      })

      this.columns1 = [{
          title: '操作',
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("div", [
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                        this.addOpen=false
                      this.editCarModal = true;
                      this.rowData = row
                    }
                  }
                },
                "编辑"
              ),
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '提示',
                        content: '确定删除吗？',
                        onOk: () => {
                          this.addcarData.splice(index, 1);
                          this.complutedtotalPrice()
                        }
                      })
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }, {
          title: '品牌/型号',
          key: 'modelName',
          align: 'center'
        }, {
          title: '车身颜色',
          key: 'carColour',
          align: 'center'
        }, {
          title: '单价（元）',
          key: 'carAmount',
          align: 'center',
           render: (h, {
              row,
              column,
              index
            }) => {
       let removeHandle = (ss) => {
            let ssf:any=ss.target.value
              this.addcarData[index].carAmount = ssf
              let patt1:any = /[0-9]+/;
              if(!patt1.test(ssf)){
                  ss.target.value=0
                  this.addcarData[index].carAmount = ssf
              }
             this.complutedtotalPrice()
            };
            return (
                <i-input style="width:80px" onOn-blur={removeHandle} value={row.carAmount}> </i-input>);
            }
        }, {
          title: '数量',
          key: 'carNumber',
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            let removeHandle = (ss) => {
              this.addcarData[index].carNumber = ss.target.value
              let patt1:any = /^[1-9]\d*$/;
              if(!patt1.test(ss.target.value)){
                ss.target.value=1
                this.addcarData[index].carNumber = ss.target.value
              }
             this.complutedtotalPrice()
            };
            return (
                <i-input index={index} style="width:80px" onOn-blur={removeHandle} value={row.carNumber}> </i-input>);
            }
        },{
            title: '车牌号码',
            key: 'vehicleLicence',
            align: 'center'
        }]
      }
      /**
       * 计算车辆总价
       */
      complutedtotalPrice(){
       let sum:any=0;
             this.addcarData.forEach(v=>{
                    sum=sum+(Number(v.carAmount)*(Number(v.carNumber)||0)||0)
                });
            this.totalPrice=sum.toFixed(2)   
      }
      Reverse(data) {
        this.choosebusyData.companyId = data.companyId
        this.choosebusyData.city = data.city
        this.choosebusyData.province = data.province
      }
      addModalOpen() {
        this.addOpen=true
        this.addOrEditFlag = true
        this.editCarModal = true
        // 清空添加车辆信息
        let addcarRefresh:any=this.$refs['add-car']
        addcarRefresh.getCarseries()
        addcarRefresh.resetcarDataModel()
      }
      distributionData(data) {
        data.vehicleColour = data.map(v => v.carColour)
        this.addcarData = data
        let sum:any=0
        data.forEach(v=>{
        sum=sum+(Number(v.carAmount)||0)
        })
        this.totalPrice=sum
      }
    }

</script>

<style lang="less" scoped>
    .component.choose-buy-materials-all{
        .icon-module{
            position:relative;
            left:26px;
            color:#265ea2
        }
        .add-rook{
            margin-left:10px;
            color:#265ea2;
        }
        .total-title{
            margin-left:155px;
            font-weight:bold;
        }
        .total-content{
            margin-left:325px;
            font-weight:bold;
        }
        .add-car {
        .ivu-modal-footer {
        display: none!important;
        }
     }
    } 



  

</style>
