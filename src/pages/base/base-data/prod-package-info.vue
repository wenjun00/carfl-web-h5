<!--产品包信息-->
<template>
  <section class="page prod-package-info">
    <i-row style="margin-top:10px;">
      <span style="font-size:18px;font-weight:bold">产品包信息</span>
      <span style="margin-left:10px;">文件名：</span>
      <i-input></i-input>~
      <i-input></i-input>
      <span style="margin-left:10px;">上传时间：</span>
      <i-input></i-input>~
      <i-input></i-input>
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
  export default class ProdPackageInfo extends Page {
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
              }, '预览'),
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                }
              }, '下载'),
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                },
                on:{
                    click:()=>{
                        this.$Modal.confirm({
                            title:'提示',
                            content:'确定删除吗？'
                        })
                    }
                }
              }, '删除')
            ])
          }
        },
        {
          title: "文件名",
          key: "fileName",
          align: 'center'
        },
        {
          title: "上传时间",
          key: "uploadTime",
          align: 'center'
        },
        {
          title: "操作人",
          key: "operator",
          align: 'center'
        },
        {
          title: "备注",
          key: "remark",
          align: 'center'
        }
      ]

      this.data1 = [{
        fileName: '20170901报价.xls',
        uploadTime: '2017-09-01 17:39:00',
        operator: '胡开甲',
        remark: '新增车型报价'
      }]
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    exportMonthReport() {
      console.log(12314)
    }
  }

</script>
