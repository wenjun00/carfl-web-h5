<!--全额付款客户资料-->
<template>
  <section class="component choose-buy-materials-all">
    <div class="form-title">选购信息</div>
    <i-row class="proCity">
      <i-form ref="parchase-form" :rules="applyRule" :label-width="110">
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
          <i-form-item label="所属公司" prop="">
            <i-select v-model="choosebusyData.companyId" clearable>
              <i-option v-for="item in companyObject" :key="item.id" :value="item.id" :label="item.companyChinaname"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-form>
    </i-row>
    <i-table :columns="columns1" :data="carDataModal" :width="1100"></i-table>
    <div>
      <Icon type="plus" style="position:relative;left:26px;color:#265ea2"></Icon>
      <i-button @click="addModalOpen" style="margin-left:10px;color:#265ea2" type="text">添加车辆</i-button>
    </div>
  </section>
</template>

<script lang="ts">
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
  @Component({
    components: {
      SvgIcon,
      DataBox
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
    private carDataModal: Array < Object > = []; // 车辆信息
    private choosebusyData: any = {
      province: '', // 省份
      city: '', // 城市
      companyId: '' // 所属公司
    };
    private companyObject: Array < Object >= []; // 公司信息

    applyRule: Object = {};
    @Prop()
    disabledStatus: String;


    created() {
      // 获取公司名称
      this.companyService.getAllCompany().subscribe(val => {
        this.companyObject = val.object
      })
      this.carService.findAllCarSeries().subscribe(val => {
        this.carDataModal = val.object
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
                    this.addCar = true;
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
                    this.data1.forEach((x, i) => {
                      if (i === index) {
                        this.data1.splice(i, 1)
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
        key: 'columnsName',
        align: 'center'
      }, {
        title: '车身颜色',
        key: 'color',
        align: 'center'
      }, {
        title: '单价（元）',
        key: 'price',
        align: 'center'
      }, {
        title: '数量',
        key: 'amount',
        align: 'center'
      }, {
        title: '车牌号码',
        key: 'carNumber',
        align: 'center'
      }]
    }
    addModalOpen() {
      this.addOrEditFlag = true
      this.editCarModal = true
    }
  }

</script>

<style lang="less" scope>
// .choose-buy-materials {
  //   .ivu-select-selection {
  //     display: inline-block;
  //     border-style: none;
  //     border-bottom-style: solid;
  //     border-radius: 0;
  //   }
  // }
  // .calculate {
  //   .ivu-modal-footer {
  //     display: none!important;
  //   }
  // }

</style>
