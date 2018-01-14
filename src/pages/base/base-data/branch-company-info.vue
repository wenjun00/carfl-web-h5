<!--分公司信息-->
<template>
  <section class="page branch-company-info">
    <i-row style="margin-top:10px;">
      <span style="font-size:18px;font-weight:bold">分公司信息</span>
      <span style="margin-left:10px;">关键字搜索：</span>
      <i-input style="width:15%" placeholder="请输入公司名称、户名、开户银行、银行卡号搜索"></i-input>
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
  export default class BranchCompanyInfo extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;

    created() {
      this.columns1 = [{
          title: "序号",
          width: 60,
          type: 'index',
          align: 'center',
          fixed: 'left'
        },
        {
          title: "操作",
          align: 'center',
          fixed: 'left',
          width: 250,
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row.firmShortName === '群泰上海') {
              return h('div', [
                h('i-button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#265EA2'
                  }
                }, '修改'),
                h('i-button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#265EA2'
                  },
                  on: {
                    click: () => {
                      this.$Modal.success({
                        title: '提示',
                        content: '停用成功！'
                      })
                    }
                  }
                }, '停用')
              ])
            } else if (row.firmShortName === '群泰西安') {
              return h('div', [
                h('i-button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#265EA2'
                  },
                  on: {
                    click: () => {
                      this.$Modal.success({
                        title: '提示',
                        content: '启用成功！'
                      })
                    }
                  }
                }, '启用')
              ])
            }
          }
        },
        {
          title: "公司简称",
          key: "firmShortName",
          align: 'center',
          fixed: 'left',
          width: 160
        },
        {
          title: "所在省",
          key: "belongProvince",
          align: 'center',
          width: 160
        },
        {
          title: "所在市",
          key: "belongCity",
          align: 'center',
          width: 160
        },
        {
          title: "户名",
          key: "companyName",
          align: 'center',
          width: 260
        },
        {
          title: "开户银行",
          key: "openAccountBank",
          align: 'center',
          width: 260
        },
        {
          title: "银行卡号",
          key: "bankCardId",
          align: 'center',
          width: 260
        },
        {
          title: "支行名称",
          key: "branchBankName",
          align: 'center',
          width: 260
        },
        {
          title: "状态",
          key: "status",
          align: 'center',
          width: 90
        }
      ]

      this.data1 = [{
        firmShortName: '群泰上海',
        belongProvince: '上海',
        belongCity: '上海',
        companyName: '群泰(上海)融资租赁有限公司',
        openAccountBank: '中国建设银行',
        bankCardId: '6227004171150138360',
        branchBankName: '闵行分行',
        status: '启用'
      }, {
        firmShortName: '群泰西安',
        belongProvince: '陕西',
        belongCity: '西安',
        companyName: '群泰(西安)融资租赁有限公司',
        openAccountBank: '中国建设银行',
        bankCardId: '6227006871560138120',
        branchBankName: '大雁塔分行',
        status: '停用'
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
