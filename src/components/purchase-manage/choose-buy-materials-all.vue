<!--全额付款客户资料-->
<template>
  <section class="component choose-buy-materials-all">
    <div class="form-title">选购信息</div>
    <i-row class="proCity">
      <i-form ref="parchase-form" :rules="applyRule" :label-width="110">
        <i-col span="12">
          <i-form-item label="申请省份" prop="">
            <i-select style="width:80px;">
              <i-option label="陕西省" value="陕西省" key="陕西省"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="申请城市" prop="">
            <i-select style="width:80px;">
              <i-option label="西安市" value="西安市" key="西安市"></i-option>
              <i-option label="宝鸡市" value="宝鸡市" key="宝鸡市"></i-option>
              <i-option label="咸阳市" value="咸阳市" key="咸阳市"></i-option>
              <i-option label="渭南市" value="渭南市" key="渭南市"></i-option>
              <i-option label="铜川市" value="铜川市" key="铜川市"></i-option>
              <i-option label="榆林市" value="榆林市" key="榆林市"></i-option>
              <i-option label="延安市" value="延安市" key="延安市"></i-option>
              <i-option label="汉中市" value="汉中市" key="汉中市"></i-option>
              <i-option label="安康市" value="安康市" key="安康市"></i-option>
              <i-option label="商洛市" value="商洛市" key="商洛市"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="所属公司" prop="">
            <i-select style="width:80px;">
              <i-option label="群泰西安" value="群泰西安" key="群泰西安"></i-option>
              <i-option label="群泰上海" value="群泰上海" key="群泰上海"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-form>
    </i-row>
    <i-table :columns="columns1" :data="data1" :width="1100"></i-table>
    <div>
      <Icon type="plus" style="position:relative;left:26px;color:#265ea2"></Icon>
      <i-button @click="addModalOpen" style="margin-left:10px;color:#265ea2" type="text">添加车辆</i-button>
    </div>
    <div style="height:60px;width:100%;">
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
    private columns1: any;
    private data1: Array < Object > = [];
    private editCarModal: Boolean = false;
    private addOrEditFlag: Boolean = false;
    private addCar: Boolean = false;

    applyRule: Object = {};
    @Prop()
    disabledStatus: String;


    created() {
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
  .choose-buy-materials {
    .ivu-select-selection {
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

  .calculate {
    .ivu-modal-footer {
      display: none!important;
    }
  }

</style>
