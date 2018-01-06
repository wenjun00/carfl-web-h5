<!--个人客户开户-->
<template>
  <section class="page personal-open-account">
    <span style="font-size:18px;font-weight:bold">个人客户开户</span>
    <i-button @click="getOrderInfoByTime(1)" type="text">昨日</i-button>
    <i-button @click="getOrderInfoByTime(2)" type="text">今日</i-button>
    <i-button @click="getOrderInfoByTime(3)" type="text">本周</i-button>
    <i-button @click="getOrderInfoByTime(4)" type="text">本月</i-button>
    <i-button @click="getOrderInfoByTime(5)" type="text">上月</i-button>
    <i-button @click="getOrderInfoByTime(6)" type="text">最近三月</i-button>
    <i-button @click="getOrderInfoByTime(7)" type="text">本季度</i-button>
    <i-button @click="getOrderInfoByTime(8)" type="text">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">关闭</span>
      <span>高级搜索</span>
    </i-button>
    <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
      <svg-icon style="font-size:24px;" iconClass="dayin"></svg-icon>
      <span style="font-size:12px;">打印</span>
    </div>
    <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
      <svg-icon iconClass="daochu"></svg-icon>
      <span style="font-size:12px;">导出</span>
    </div>
    <i-row v-if="searchOptions" style="margin:6px;">
      <i-select style="display:inline-block;width:10%;margin-left:10px;" placeholder="全部状态">
        <i-option value="拒绝" label="拒绝" key="拒绝"></i-option>
        <i-option value="退单" label="退单" key="退单"></i-option>
        <i-option value="通过" label="通过" key="通过"></i-option>
      </i-select>
      <i-select style="display:inline-block;width:10%;margin-left:10px;" placeholder="全部拒单原因">
        <i-option value="不符合进件操作" label="不符合进件操作" key="不符合进件操作"></i-option>
        <i-option value="欺诈" label="欺诈" key="欺诈"></i-option>
        <i-option value="黑名单" label="黑名单" key="黑名单"></i-option>
        <i-option value="法院执行" label="法院执行" key="法院执行"></i-option>
        <i-option value="还款能力不足" label="还款能力不足" key="还款能力不足"></i-option>
        <i-option value="其他" label="其他" key="其他"></i-option>
      </i-select>
      <i-select style="display:inline-block;width:10%;margin-left:10px;" placeholder="全部拒单细节">
        <i-option value="行业限制" label="拒绝" key="拒绝"></i-option>
        <i-option value="信用卡开户数超标" label="退单" key="退单"></i-option>
        <i-option value="话单非本人名下且不满两年" label="通过" key="通过"></i-option>
        <i-option value="话单本人名下但不满半年" label="通过" key="通过"></i-option>
      </i-select>
      <span style="margin-left:10px">日期：</span>
      <i-input style="display:inline-block;width:10%"></i-input>~
      <i-input style="display:inline-block;width:10%"></i-input>
      <i-button class="blueButton">搜索</i-button>
    </i-row>
    <!--<i-table :columns="columns1" :data="data1" border stripe></i-table>-->
    <data-box :columns="columns1" :data="data1"></data-box>
    <!--弹出框-->
    <template>

    </template>
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置" @on-ok="confirm">
        <!--<i-table :columns="columns2" :data="data2" border stripe @on-select="multipleSelect"></i-table>-->
        <data-box :columns="columns2" :data="data2"></data-box>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>

  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import BankCardInfo from "~/components/finance-manage/bank-card-info.vue";
  import Component from "vue-class-component";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    Dependencies
  } from "~/core/decorator";
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
  export default class PersonalOpenAccount extends Page {
    private columns1: any;
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    private customName: String = "";
    private openColumnsConfig: Boolean = false;
    private columns2: any;
    private data2: Array < Object > = [];
    private data3: Array < Object > = [];
    private checkRadio: String = "融资租赁合同";
    private columns3: any;

    activated() {}
    created() {
      this.columns1 = [{
          align: "center",
          type: "index",
          width: "60",
          renderHeader: (h, {
            column,
            index
          }) => {
            return h(
              "div", {
                on: {
                  click: () => {
                    this.columnsConfig();
                  }
                },
                style: {
                  cursor: "pointer"
                }
              }, [
                h("Icon", {
                  props: {
                    type: "gear-b",
                    size: "20"
                  }
                })
              ]
            );
          }
        },
        {
          title: "操作",
          width: "200",
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
                        title: '银行卡信息',
                        // transfer:false,
                        render: h => h(BankCardInfo)
                      })
                    }
                  }
                },
                "银行卡信息"
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
                    click: () => {}
                  }
                },
                "划扣"
              )
            ]);
          }
        },
        {
          title: "开户日期",
          align: "center",
          key: "openAccountDate"
        },
        {
          align: "center",
          title: "开户类型",
          key: "openAccountType"
        },
        {
          align: "center",
          title: "客户号",
          key: "customerId"
        },
        {
          align: "center",
          title: "客户姓名",
          key: "customerName"
        },
        {
          align: "center",
          title: "证件号码",
          key: "IdCard"
        },
        {
          align: "center",
          title: "预留手机",
          key: "phone"
        }
      ];
      this.columns2 = [{
          title: "序号",
          type: "index",
          width: "80",
          align: "center"
        },
        {
          title: "列名",
          key: "columnsName",
          align: "center"
        },
        {
          type: "selection",
          width: "80",
          align: "center"
        }
      ];
      this.columns3 = [{
          title: "文件名称",
          align: "center",
          key: "fileName"
        },
        {
          type: "selection",
          align: "center",
          width: "80"
        }
      ];
      this.data2 = [{
          columnsName: "开户日期"
        },
        {
          columnsName: "开户类型"
        },
        {
          columnsName: "客户号"
        },
        {
          columnsName: "客户姓名"
        },
        {
          columnsName: "证件号码"
        },
        {
          columnsName: "预留手机"
        }
      ];

      this.data3 = [{
          fileName: "融资租赁申请单"
        },
        {
          fileName: "融资租赁合同正文"
        },
        {
          fileName: "合同附件一(付款时间表)"
        },
        {
          fileName: "合同附件二(配偶确认书)"
        },
        {
          fileName: "合同附件三(共同承租人确认书)"
        },
        {
          fileName: "委托收款合同"
        },
        {
          fileName: "首付款明细"
        },
        {
          fileName: "服务确认书"
        },
        {
          fileName: "责任告知书"
        },
        {
          fileName: "车辆交接单"
        },
        {
          fileName: "车辆出库单"
        },
        {
          fileName: "补充协议（减免）"
        }
      ];

      this.data1 = [{
        openAccountDate: '2017-12-01',
        openAccountType: '汇付',
        customerId: '62103526456',
        customerName: '胡开甲',
        IdCard: '610303199110054516',
        phone: '18899245146'
      }]
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    oneKeyToConnect() {}
    columnsConfig() {
      this.openColumnsConfig = true;
    }
    /**
     * 多选
     */
    multipleSelect(selection) {
      console.log(888, selection);
    }
    /**
     * 切换合同种类
     */
    changeCompactType(type) {
      if (type === "全款销售合同") {
        this.data3 = [{
            fileName: "融资租赁申请单"
          },
          {
            fileName: "融资租赁合同正文"
          },
          {
            fileName: "合同附件一(付款时间表)"
          },
          {
            fileName: "合同附件二(配偶确认书)"
          },
          {
            fileName: "合同附件三(共同承租人确认书)"
          }
        ];
      } else if (type === "长租合同（银行版）") {
        this.data3 = [{
            fileName: "融资租赁申请单"
          },
          {
            fileName: "融资租赁合同正文"
          },
          {
            fileName: "合同附件一(付款时间表)"
          },
          {
            fileName: "合同附件二(配偶确认书)"
          }
        ];
      } else if (type === "长租合同") {
        this.data3 = [{
            fileName: "长期租赁申请单"
          },
          {
            fileName: "长期租赁合同正文"
          },
          {
            fileName: "合同附件一(甲乙双方相关责任条款)"
          },
          {
            fileName: "合同附件二(车辆交接清单)"
          },
          {
            fileName: "委托收款合同"
          },
          {
            fileName: "车辆销售协议"
          },
          {
            fileName: "收款明细"
          },
          {
            fileName: "车辆出库单"
          },
          {
            fileName: "补充协议（减免）"
          }
        ];
      } else {
        this.data3 = [{
            fileName: "融资租赁申请单"
          },
          {
            fileName: "融资租赁合同正文"
          },
          {
            fileName: "合同附件一(付款时间表)"
          },
          {
            fileName: "合同附件二(配偶确认书)"
          },
          {
            fileName: "合同附件三(共同承租人确认书)"
          },
          {
            fileName: "委托收款合同"
          },
          {
            fileName: "首付款明细"
          },
          {
            fileName: "服务确认书"
          },
          {
            fileName: "责任告知书"
          },
          {
            fileName: "车辆交接单"
          },
          {
            fileName: "车辆出库单"
          },
          {
            fileName: "补充协议（减免）"
          }
        ];
      }
    }
    /**
     * 确定
     */
    confirm() {}
  }
</script>