<!--个人开户列表-->
<template>
  <section class="page personal-account-list">
    <i-row style="margin-top:10px">
      <span style="font-size:18px;font-weight:bold">个人开户列表</span>
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
      <div style="float:right;margin-right:10px;margin-top:10px;">
        <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon iconClass="daochu"></svg-icon>
          <span style="font-size: 12px;">导出</span>
        </div>
      </div>
    </i-row>
    <i-row v-if="searchOptions" style="margin:6px;position:relative;right:6px;">
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
      <i-date-picker style="display:inline-block;width:10%"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%"></i-date-picker>
      <i-button class="blueButton">搜索</i-button>
    </i-row>
    <!--<i-table :columns="columns1" :data="data1" border stripe></i-table>-->
    <data-box :columns="columns1" :data="data1"></data-box>

    <div class="submitBar">
      <i-row type="flex" align="middle" style="padding:5px">
        <i-col :span="8" push="1">
          <span>申请人：胡开甲</span>
        </i-col>
        <i-col :span="10" pull="4">
          <span>申请时间： 2017-12-01 13:56:45</span>
        </i-col>
        <i-col :span="6" style="text-align:right;">
          <i-button class="highButton" style="margin-left:10px;" @click="createAccount">客户开户</i-button>
        </i-col>
      </i-row>
    </div>
    <!--弹出框-->
    <template>

    </template>
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置" @on-ok="confirm">
        <!--<i-table :columns="columns2" :data="data2" border stripe @on-select="multipleSelect"></i-table>-->
        <i-table :columns="columns2" :data="data2"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>

    <!--开户弹窗-->
    <template>
      <i-modal v-model="openCreateAccount" title="开户绑卡" width="400">
        <i-form :label-width="110">
          <i-form-item label="账户类型">
            <i-select style="width:160px;">
              <i-option label="汇付" value="汇付" key="汇付"></i-option>
              <i-option label="对公" value="对公" key="对公"></i-option>
              <i-option label="富友" value="富友" key="富友"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="客户姓名">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="证件类型">
            <i-select style="width:160px;">
              <i-option label="身份证" value="身份证" key="身份证"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="证件号码">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="开户银行">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="开户省市">
            <i-select style="width:80px;">
              <i-option label="陕西省" value="陕西省" key="陕西省"></i-option>
            </i-select>
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
          <i-form-item label="银行卡号">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="银行预留手机号">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <!--<i-form-item label="验证码">
            <i-input style="width:160px;"></i-input>
            <i-button style="display:inline-block;margin-left:8px;" class="blueButton" size="small">发送验证码<span>60</span></i-button>
          </i-form-item>-->
        </i-form>
        <div slot="footer">
          <i-button @click="openCreateAccount=false">取消</i-button>
          <i-button class="blueButton" @click="openCreateAccount=false">确认开户</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="bankCardInfoModal" :transfer="false" class="bankCardInfo" title="银行卡信息" width="400">
        <bank-card-info></bank-card-info>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="deductModal" title="划扣" width="930">
        <deduct></deduct>
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
  import Deduct from '~/components/finance-manage/deduct.vue'
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
      BankCardInfo,
      SvgIcon,
      Deduct
    }
  })
  export default class PersonalAccountList extends Page {
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
    private openCreateAccount: Boolean = false;
    private bankCardInfoModal: Boolean = false;
    private deductModal: Boolean = false;

    /**
     * 开户
     */
    createAccount() {
      this.openCreateAccount = true
    }
    created() {
      this.columns1 = [{
          align: "center",
          type: "index",
          width: 60,
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
                      this.bankCardInfoModal = true
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
                    click: () => {
                      this.deductModal = true
                    }
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
          width: 80,
          align: "center"
        },
        {
          title: "列名",
          key: "columnsName",
          align: "center"
        },
        {
          type: "selection",
          width: 80,
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
          width: 80
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
      }, {
        openAccountDate: '2017-12-01',
        openAccountType: '汇付',
        customerId: '62103526456',
        customerName: '胡开甲',
        IdCard: '610303199110054516',
        phone: '18899245146'
      }, {
        openAccountDate: '2017-12-01',
        openAccountType: '汇付',
        customerId: '62103526456',
        customerName: '胡开甲',
        IdCard: '610303199110054516',
        phone: '18899245146'
      }, {
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

<style lang="less">
  .bankCardInfo {
    .ivu-modal-footer {
      display: none;
    }
  }

</style>
