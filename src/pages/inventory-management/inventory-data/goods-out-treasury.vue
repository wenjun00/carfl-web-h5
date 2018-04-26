<!--押品出库-->
<template>
  <section class="page goods-out-treasury">
    <page-header title="押品出库" hidden-print></page-header>
    <data-form :model="goodsOutModel">
      <template slot="input">
        <i-form-item prop="brandModel" label="订单编号">
          <i-input  v-model="goodsOutModel.orderNumber"></i-input>
        </i-form-item>
        <i-form-item prop="busNumber" label="品牌系列">
          <i-input v-model="goodsOutModel.bandNumber" placeholder="请录入品牌、系列"></i-input>
        </i-form-item>
        <i-form-item prop="customerName" label="车牌号码">
          <i-input v-model="goodsOutModel.carName"></i-input>
        </i-form-item>
        <i-form-item prop="customerName" label="车架号">
          <i-input v-model="goodsOutModel.customerName"></i-input>
        </i-form-item>
        <i-form-item prop="containsSubmitted">
          <i-checkbox v-model="goodsOutModel.containsOut">包含已出库</i-checkbox>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="goodsOutColumns" :data="dataSet" :page="pageService"></data-box>
       <template>
            <i-modal  width="780" v-model="inventoryModal" title="确认出库" class="edit-from-storage">
                <edit-from-storage ref="edit-from-storage"></edit-from-storage>
                <div slot="footer">
                     <i-button size="large" type="ghost" class="Ghost"  @click="inventoryModal=false">取消</i-button>
                    <i-button size="large"  type="primary" class="blueButton"  @click="inventoryModal=false">确定</i-button>
                </div>
            </i-modal>
        </template>

  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import { Dependencies } from "~/core/decorator";
  import { Layout } from "~/core/decorator";
  import { PageService } from "~/utils/page.service";
  import EditFromStorage from '~/components/base-data/edit-from-storage.vue'
  @Layout("workspace")
  @Component({
    components: {
        EditFromStorage
    }
  })
  export default class GoodsOutTreasury extends Page{
    @Dependencies(PageService) private pageService: PageService;
    private dataSet: Array<any> = []
    private goodsOutModel: any = {
      orderNumber:'',//订单编号
      brandModel: '', //品牌系列
      busNumber: '', // 车牌号码
      customerName: '', // 车架号
      containsOut: false // 包含提交
    }
    private inventoryModal:Boolean = false
    private goodsOutColumns :any =  [{
      title: '操作',
      align: 'center',
      fixed: 'left',
      minWidth: this.$common.getColumnWidth(3),
      render: (h, { row }) => {
        return h('div', [
          h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              style: {
                color: '#265EA2'
              },
               on: {
                click: () => {
                  this.getOutTreasuryList(row)
                }
              }
              
            },
            '出库'
          ),
          h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              style: {
                color: '#265EA2'
              }
            },
            '详情'
          )
        ])
      }
    },
      {
        title: '状态',
        editable: true,
        key: 'a1',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        title: '操作日期',
        editable: true,
        sortable: true,
        key: 'a2',
        align: 'center',
        minWidth: this.$common.getColumnWidth(3)
      },
      {
        title: '操作人',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'a3',
        align: 'center'
      },
      {
        title: '出库门店',
        editable: true,
        key: 'a4',
        minWidth: this.$common.getColumnWidth(3),
        align: 'center'
      },
      {
        title: '订单编号',
        editable: true,
        sortable: true,
        key: 'a5',
        minWidth: this.$common.getColumnWidth(3),
        align: 'center'
      },
      {
        title: '品牌',
        editable: true,
        key: 'a6',
        minWidth: this.$common.getColumnWidth(3),
        align: 'center'
      },
      {
        title: '系列',
        editable: true,
        key: 'a7',
        minWidth: this.$common.getColumnWidth(3),
        align: 'center'
      },
      {
        title: '车辆型号',
        editable: true,
        key: 'a8',
        minWidth: this.$common.getColumnWidth(3),
        align: 'center'
      },
      {
        title: '车身颜色',
        editable: true,
        key: 'a9',
        minWidth: this.$common.getColumnWidth(3),
        align: 'center'
      },
      {
        title: '车牌号码',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'a10',
        align: 'center'
      },
      {
        title: '车架号',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'a11',
        align: 'center'
      },
      {
        title: '发动机号',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'a12',
        align: 'center'
      },
      {
        title: '客户姓名',
        editable: true,
        key: 'a12',
        minWidth: this.$common.getColumnWidth(3),
        align: 'center'
      },
      {
        title: '手机号码',
        editable: true,
        key: 'a13',
        minWidth: this.$common.getColumnWidth(3),
        align: 'center'
      },
      {
        title: '估价员',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'a14',
        align: 'center'
      }]
/**
 * 押品出库
 */
    getOutTreasuryList(row){
        this.inventoryModal = true 
    }


    mounted() {
      this.dataSet = [{
        a1:'123'
      }]
    }

  }
</script>

<style lang="less" scoped>

</style>

