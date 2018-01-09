<!--黑名单-->
<template>
  <section class="page black-list">
    <span class="form-title">黑名单</span>
    <i-button type="text">昨日</i-button>
    <i-button type="text">今日</i-button>
    <i-button type="text">本周</i-button>
    <i-button type="text">本月</i-button>
    <i-button type="text">上月</i-button>
    <i-button type="text">最近三月</i-button>
    <i-button type="text">本季度</i-button>
    <i-button type="text">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">关闭</span>
      <span>高级搜索</span>
    </i-button>
    <i-row v-if="searchOptions" style="margin:6px;">
      <i-input style="display:inline-block;width:18%;margin-left:20px;" placeholder="请录入客户姓名\证件号码\联系号码查询"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-input style="display:inline-block;width:10%"></i-input>~
      <i-input style="display:inline-block;width:10%"></i-input>
      <span style="margin-left:10px;">省市：</span>
      <i-select style="width:80px;margin-left:10px;" placeholder="选择省">
        <i-option label="陕西省" value="陕西省" key="陕西省"></i-option>
      </i-select>
      <i-select style="width:80px;margin-left:10px;" placeholder="选择市">
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
      <span style="margin-left:10px;">产品类型</span>
      <i-select style="width:10%;">
        <i-option label="直租" value="直租" key="直租"></i-option>
        <i-option label="车贷" value="车贷" key="车贷"></i-option>
      </i-select>
      <!--<i-checkbox style="margin-left:10px;">包含已处理</i-checkbox>-->
      <i-button style="margin-left:10px" class="blueButton">搜索</i-button>
    </i-row>

    <data-box :columns="columns1" :data="data1"></data-box>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    Layout
  } from "~/core/decorator";
  import PurchaseInformation from "~/components/purchase-query/purchase-information.vue";

  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      PurchaseInformation
    }
  })
  export default class BlackList extends Page {
    private columns1: any;
    private data1: Array < Object > = [];
    private columns2: any;
    private data2: Array < Object > = [];
    private orderModal: Boolean = false;
    private searchOptions: Boolean = false;

    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    created() {
      this.columns1 = [{
          align: "center",
          type: "index",
          width: 60,
          title: '序号'
        },
        {
          title: "操作",
          width: 220,
          align: "center",
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
                      this.$Modal.info({
                        title: '黑名单详情',
                        width: '900',
                        render: h => h(PurchaseInformation)
                      })
                    }
                  }
                },
                "查看"
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
                        content: '确定移出吗？',
                        onOk: () => {
                          this.data1.forEach((x, i) => {
                            if (i === index) {
                              this.data1.splice(i, 1)
                            }
                          })
                        }
                      })
                    }
                  }
                },
                "移出"
              )
            ]);
          }
        },
        {
          key: 'step',
          align: 'center',
          title: '环节'
        },
        {
          title: "订单状态",
          align: "center",
          key: "orderStatus",
          render: (h, {
            row,
            columns,
            index
          }) => {
            if (row.orderStatus === '拒绝') {
              return h('span', {
                style: {
                  color: 'red'
                }
              }, row.orderStatus)
            } else {
              return h('span', {
                style: {
                  color: 'black'
                }
              }, row.orderStatus)
            }
          }
        },
        {
          align: "center",
          title: "订单创建时间",
          key: "orderCreateTime",
          width: 180
        },
        {
          align: "center",
          title: "进入资源池时间",
          key: "orderPoolTime",
          width: 180
        },
        {
          align: "center",
          title: "省份",
          key: "province"
        },
        {
          align: "center",
          title: "城市",
          key: "city"
        },
        {
          align: "center",
          title: "订单类型",
          key: "orderType"
        },
        {
          align: "center",
          title: "产品名称",
          key: "prdName"
        },
        {
          align: "center",
          title: "客户姓名",
          key: "customerName"
        },
        {
          align: "center",
          title: "证件号",
          key: "idCard",
          width: 180
        },
        {
          align: "center",
          title: "手机号",
          key: "phone",
          width: 120
        }
      ];

      this.data1 = [{
        orderStatus: '面审通过',
        step: '面审',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '宝鸡',
        orderType: '直租',
        customerName: '刘佳',
        idCard: '610303199111142564',
        prdName: '直租',
        phone: '15094156575'
      }, {
        orderStatus: '拒绝',
        step: '复审',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '宝鸡',
        orderType: '直租',
        customerName: '刘陇刚',
        prdName: '直租',
        idCard: '610303198911041564',
        phone: '13096133575'
      }, {
        orderStatus: '面审通过',
        step: '终审',
        orderCreateTime: '2017-12-01 13:56:03',
        orderPoolTime: '2017-12-02 11:36:26',
        province: '陕西',
        city: '渭南',
        orderType: '直租',
        customerName: '王泽杰',
        prdName: '直租',
        idCard: '610303199111142564',
        phone: '15989756575'
      }]

      this.columns2 = [{
        align: 'center',
        title: '处理时间',
        key: 'handleTime'
      }, {
        align: 'center',
        key: 'operator',
        title: '操作人'
      }, {
        align: 'center',
        key: 'step',
        title: '环节'
      }]

      this.data2 = [{
        handleTime: '2017-12-06 18:45:36',
        operator: '刘佳',
        step: '提交审批'
      }, {
        handleTime: '2017-12-06 18:45:36',
        operator: '李健',
        step: '面审'
      }, {
        handleTime: '2017-12-06 18:45:36',
        operator: '吴小川',
        step: '提交审批'
      }]
    }
    /**
     * 领取
     */
    getOrder(row) {
      this.orderModal = true
    }
  }

</script>

<style>


</style>
