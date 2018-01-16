<!--查询模版管理-->
<template>
  <section class="page query-template-manage">
    <i-row style="margin-top:10px;">
      <span style="font-size:18px;font-weight:bold">查询模版管理</span>
      <i-select style="margin-left:10px;width:10%;">
        <i-option label="订单信息" value="订单信息" key="订单信息"></i-option>
        <i-option label="车辆信息" value="车辆信息" key="车辆信息"></i-option>
      </i-select>
      <i-button class="blueButton" style="margin-left:10px;">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderService
  } from "~/services/business-service/order.service";
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      SvgIcon
    }
  })
  export default class QueryTemplateManage extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;

    created() {
      this.columns1 = [{
          title: "序号",
          width: 60,
          type: 'index',
          align: 'center'
        },
        {
          title: "操作",
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                }
              }, '查看'),
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '确定删除吗？'
                    })
                  }
                }
              }, '删除')
            ])
          }
        },
        {
          title: "模版类型",
          key: "templateType",
          align: 'center'
        },
        {
          title: "模版名称",
          key: "templateName",
          align: 'center'
        },
        {
          title: "创建人",
          key: "creator",
          align: 'center'
        }
      ]

      this.data1 = [{
        templateType: '订单信息',
        templateName: '左拉的常用查询模板1',
        creator: '左拉'
      }]
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    exportMonthReport() {
    }
  }

</script>
