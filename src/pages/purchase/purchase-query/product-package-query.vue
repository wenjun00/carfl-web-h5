<!--产品包查询-->
<template>
  <section class="page product-package-query">
    <span class="form-title">产品包查询</span>
    <i-button @click="getOrderInfoByTime(1)" type="text">昨日</i-button>
    <i-button @click="getOrderInfoByTime(2)" type="text">今日</i-button>
    <i-button @click="getOrderInfoByTime(3)" type="text">本周</i-button>
    <i-button @click="getOrderInfoByTime(4)" type="text">本月</i-button>
    <i-button @click="getOrderInfoByTime(5)" type="text">上月</i-button>
    <i-button @click="getOrderInfoByTime(6)" type="text">最近三月</i-button>
    <i-button @click="getOrderInfoByTime(7)" type="text">本季度</i-button>
    <i-button @click="getOrderInfoByTime(8)" type="text">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2"><span v-if="!searchOptions">展开</span><span v-if="searchOptions">关闭</span>高级搜索</i-button>
    <i-row v-if="searchOptions" style="margin-top:20px;margin-left:16px;">
      <i-date-picker placeholder="起始日期"></i-date-picker>
      <i-date-picker placeholder="终止日期"></i-date-picker>
      <i-input style="width:10%;" placeholder="文件名查询"></i-input>
      <i-button class="blueButton">搜索</i-button>
    </i-row>
    <i-row style="margin-top:20px">
      <data-box :columns="queryColumns" :data="queryData"></data-box>
    </i-row>
    <!--列配置-->
    <template>
      <i-modal v-model="columnsManage" title="列配置">
        <i-table :columns="columns2" :data="data2" border stripe></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>

    <!--预览-->
    <template>
      <i-modal v-model="previewModal" title="查看" width="800">
        <div style="width:760px;height:500px;background-image:url('/static/images/common/previewImg.png');background-repeat:no-repeat"></div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderQueryService
  } from "~/services/business-service/order-query.service";
  import PurchaseInformation from "~/components/purchase-query/purchase-information.vue";
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({
    components: {
      DataBox
    }
  })
  export default class ProductPackageQuery extends Page {
    @Dependencies(OrderQueryService) private orderQueryService: OrderQueryService;
    private queryColumns: any;
    private queryData: Array < Object > = [];
    private data2: Array < Object > = [];
    private columns2: any;
    private columnsManage: Boolean = false;
    private searchOptions: Boolean = false;
    private previewModal: Boolean = false;

    created() {
      this.queryColumns = [{
          align: 'center',
          type: 'index',
          width: 80,
          renderHeader: (h, {
            row,
            column,
            index
          }) => {
            return h('div', {
              on: {
                click: () => {
                  this.columnsManage = true
                }
              },
              style: {
                cursor: 'pointer'
              }
            }, [
              h('Icon', {
                props: {
                  type: 'gear-b',
                  size: '20'
                }
              })
            ])
          }
        }, {
          title: '操作',
          width: 200,
          align: 'center',
          render: (h, params) => {

            return h('div', [
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265ea2'
                },
                on: {
                  click: () => {

                  }
                }
              }, '下载'),
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265ea2'
                },
                on: {
                  click: () => {
                    this.previewModal = true
                  }
                }
              }, '查看')
            ])

          }
        },
        {
          title: '文件名',
          align: 'center',
          key: 'fileName'
        },
        {
          align: 'center',
          title: '上传时间',
          key: 'uploadTime'
        },
        {
          align: 'center',
          title: '操作人',
          key: 'customName'
        },
        {
          align: 'center',
          title: '备注',
          key: 'remark'
        }
      ]
      /**@argument列配置 */
      this.columns2 = [{
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
      }, {
        title: '列名',
        key: 'columnsName',
        align: 'center'
      }, {
        type: 'selection',
        width: 80,
        align: 'center'
      }]
      this.data2 = [{
        columnsName: '订单编号'
      }, {
        columnsName: '订单创建时间'
      }, {
        columnsName: '订单类型'
      }, {
        columnsName: '产品名称'
      }, {
        columnsName: '客户姓名'
      }, {
        columnsName: '证件号码'
      }, {
        columnsName: '最近合同生成日期'
      }]
      this.orderQueryService.getProductQuery().subscribe(({
        val
      }) => {
        this.queryData = val
      })
    }
    openSearch() {
      this.searchOptions = !this.searchOptions
    }
  }

</script>

<style lang="less" scope>


</style>