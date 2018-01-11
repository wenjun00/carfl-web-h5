<!--订单信息导出-->
<template>
  <section class="page order-info-export">
    <i-row style="margin-top:10px">
      <span style="font-size:18px;font-weight:bold">订单信息导出</span>
      <span style="margin-left:10px;">订单创建日期：</span>
      <i-input></i-input>~
      <i-input></i-input>
      <i-select style="margin-left:10px;width:10%;">
        <i-option label="群泰上海" value="群泰上海" key="群泰上海"></i-option>
        <i-option label="群泰西安" value="群泰西安" key="群泰西安"></i-option>
        <i-option label="群泰武汉" value="群泰武汉" key="群泰武汉"></i-option>
      </i-select>
      <i-select style="margin-left:10px;width:10%;" placeholder="我的查询模版">
        <i-option label="财务模版1" value="财务模版1" key="财务模版1"></i-option>
        <i-option label="财务模版2" value="财务模版2" key="财务模版2"></i-option>
      </i-select>
      <i-button class="blueButton" style="margin-left:10px;">搜索</i-button>
      <i-button @click="openSearch" style="margin-left:10px">
        <span v-if="!searchOptions">展开</span>
        <span v-if="searchOptions">关闭</span>
        <span>导出配置</span>
      </i-button>
      <div style="font-size:16px;cursor:pointer;display:inline-block;color:#3367A7;float:right;margin:10px" @click="exportTemplate">
        <svg-icon iconClass="daochu"></svg-icon>
        <span style="font-size: 12px;">导出</span>
      </div>
    </i-row>
    <i-row v-if="searchOptions" style="margin:6px;">
      <div class="exportTitle">选购信息</div>
      <div style="padding-bottom:6px;margin-bottom:6px;">
        <Checkbox :indeterminate="buyInfoIndeterminate" :value="buyInfoCheckAll" @click.prevent.native="buyInfoHandleCheckAll">全选</Checkbox>
      </div>
      <CheckboxGroup v-model="buyInfoCheckAllGroup" @on-change="buyInfoCheckAllGroupChange">
        <Checkbox v-for="item in checkBuyList" :label="item.name" :key="item.index"></Checkbox>
      </CheckboxGroup>

      <div class="exportTitle">产品信息</div>
      <div style="padding-bottom:6px;margin-bottom:6px;">
        <Checkbox :indeterminate="prdInfoIndeterminate" :value="prdInfoCheckAll" @click.prevent.native="prdInfoHandleCheckAll">全选</Checkbox>
      </div>
      <CheckboxGroup v-model="prdInfoCheckAllGroup" @on-change="prdInfoCheckAllGroupChange">
        <Checkbox v-for="item in prdInfoList" :label="item.name" :key="item.index"></Checkbox>
      </CheckboxGroup>

      <div class="exportTitle">金融方案</div>
      <div style="padding-bottom:6px;margin-bottom:6px;">
        <Checkbox :indeterminate="financeIndeterminate" :value="financeCheckAll" @click.prevent.native="financeHandleCheckAll">全选</Checkbox>
      </div>
      <CheckboxGroup v-model="financeCheckAllGroup" @on-change="financeCheckAllGroupChange">
        <Checkbox v-for="item in financeInfoList" :label="item.name" :key="item.index"></Checkbox>
      </CheckboxGroup>

      <div class="exportTitle">客户信息</div>
      <div style="padding-bottom:6px;margin-bottom:6px;">
        <Checkbox :indeterminate="customerIndeterminate" :value="customerCheckAll" @click.prevent.native="customerHandleCheckAll">全选</Checkbox>
      </div>
      <CheckboxGroup v-model="customerCheckAllGroup" @on-change="customerCheckAllGroupChange">
        <Checkbox v-for="item in customerInfoList" :label="item.name" :key="item.index"></Checkbox>
      </CheckboxGroup>

      <div class="exportTitle">订单信息</div>
      <div style="padding-bottom:6px;margin-bottom:6px;">
        <Checkbox :indeterminate="orderIndeterminate" :value="orderCheckAll" @click.prevent.native="orderHandleCheckAll">全选</Checkbox>
      </div>
      <CheckboxGroup v-model="orderCheckAllGroup" @on-change="orderCheckAllGroupChange">
        <Checkbox v-for="item in orderInfoList" :label="item.name" :key="item.index"></Checkbox>
      </CheckboxGroup>
      <div style="text-align:center">
        <i-button class="blueButton" style="margin-right:10px" @click="savaAsNewTemplate">另存为模板</i-button>
        <i-button class="blueButton">确认</i-button>
      </div>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>

    <template>
      <i-modal title="另存为模板" width="400" v-model="saveTemplateModal" @on-ok="confirmSaveTemplate">
        <i-form :label-width="110">
          <i-form-item label="模板名称">
            <i-input style="display:inline-block;width:80%"></i-input>
          </i-form-item>
        </i-form>
      </i-modal>
    </template>

    <template>
      <i-modal title="导出" width="400" v-model="templateListModal">
        <i-form :label-width="110">
          <i-form-item label="模板名称">
            <i-select>
              <i-option label="模板1" value="模板1" key="模板1"></i-option>
              <i-option label="模板2" value="模板2" key="模板2"></i-option>
              <i-option label="模板3" value="模板3" key="模板3"></i-option>
            </i-select>
          </i-form-item>
        </i-form>
      </i-modal>
    </template>
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
  export default class OrderInfoExport extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    private saveTemplateModal: Boolean = false;
    private templateListModal: Boolean = false;

    // 选购信息checkbox相关
    private buyInfoCheckAll: Boolean = false;
    private buyInfoIndeterminate: Boolean = false;
    private buyInfoCheckAllGroup: Array < String >= []
    private checkBuyList: Array < any >= []
    // 产品信息checkbox相关
    private prdInfoCheckAll: Boolean = false;
    private prdInfoIndeterminate: Boolean = false;
    private prdInfoCheckAllGroup: Array < String >= []
    private prdInfoList: Array < any >= []
    // 金融方案checkbox相关
    private financeCheckAll: Boolean = false;
    private financeIndeterminate: Boolean = false;
    private financeCheckAllGroup: Array < String >= []
    private financeInfoList: Array < any >= []
    // 客户信息checkbox相关
    private customerCheckAll: Boolean = false;
    private customerIndeterminate: Boolean = false;
    private customerCheckAllGroup: Array < String >= []
    private customerInfoList: Array < any >= []
    // 订单信息checkbox相关
    private orderCheckAll: Boolean = false;
    private orderIndeterminate: Boolean = false;
    private orderCheckAllGroup: Array < String >= []
    private orderInfoList: Array < any >= []

    /**
     * 另存为模板
     */
    savaAsNewTemplate() {
      if (!this.buyInfoCheckAllGroup.length && !this.prdInfoCheckAllGroup.length && !this.financeCheckAllGroup.length &&
        !this.customerCheckAllGroup
        .length && !this.orderCheckAllGroup.length) {
        this.$Modal.info({
          title: '提示',
          content: '请至少选择一项模版导出项'
        })
        return false
      } else {
        this.saveTemplateModal = true
      }
    }
    /**
     * 确定保存模板
     */
    confirmSaveTemplate() {
      this.$Message.success('保存成功！')
    }
    /**
     * 导出
     */
    exportTemplate() {
      this.templateListModal = true
    }
    /**
     * 选购信息
     */
    buyInfoHandleCheckAll() {
      if (this.buyInfoIndeterminate) {
        this.buyInfoCheckAll = false;
      } else {
        this.buyInfoCheckAll = !this.buyInfoCheckAll;
      }
      this.buyInfoIndeterminate = false;

      if (this.buyInfoCheckAll) {
        this.buyInfoCheckAllGroup = this.checkBuyList.map(v => v.name);
      } else {
        this.buyInfoCheckAllGroup = [];
      }
    }
    /**
     * 选购信息
     */
    buyInfoCheckAllGroupChange(data) {
      if (data.length === this.checkBuyList.length) {
        this.buyInfoIndeterminate = false;
        this.buyInfoCheckAll = true;
      } else if (data.length > 0) {
        this.buyInfoIndeterminate = true;
        this.buyInfoCheckAll = false;
      } else {
        this.buyInfoIndeterminate = false;
        this.buyInfoCheckAll = false;
      }
    }
    /**
     * 产品信息
     */
    prdInfoHandleCheckAll() {
      if (this.prdInfoIndeterminate) {
        this.prdInfoCheckAll = false;
      } else {
        this.prdInfoCheckAll = !this.prdInfoCheckAll;
      }
      this.prdInfoIndeterminate = false;

      if (this.prdInfoCheckAll) {
        this.prdInfoCheckAllGroup = this.prdInfoList.map(v => v.name);
      } else {
        this.prdInfoCheckAllGroup = [];
      }
    }
    /**
     * 产品信息
     */
    prdInfoCheckAllGroupChange(data) {
      if (data.length === this.prdInfoList.length) {
        this.prdInfoIndeterminate = false;
        this.prdInfoCheckAll = true;
      } else if (data.length > 0) {
        this.prdInfoIndeterminate = true;
        this.prdInfoCheckAll = false;
      } else {
        this.prdInfoIndeterminate = false;
        this.prdInfoCheckAll = false;
      }
    }

    /**
     * 金融方案信息
     */
    financeHandleCheckAll() {
      if (this.financeIndeterminate) {
        this.financeCheckAll = false;
      } else {
        this.financeCheckAll = !this.financeCheckAll;
      }
      this.financeIndeterminate = false;

      if (this.financeCheckAll) {
        this.financeCheckAllGroup = this.financeInfoList.map(v => v.name);
      } else {
        this.financeCheckAllGroup = [];
      }
    }
    /**
     * 金融方案信息
     */
    financeCheckAllGroupChange(data) {
      if (data.length === this.financeInfoList.length) {
        this.financeIndeterminate = false;
        this.financeCheckAll = true;
      } else if (data.length > 0) {
        this.financeIndeterminate = true;
        this.financeCheckAll = false;
      } else {
        this.financeIndeterminate = false;
        this.financeCheckAll = false;
      }
    }

    /**
     * 客户信息
     */
    customerHandleCheckAll() {
      if (this.customerIndeterminate) {
        this.customerCheckAll = false;
      } else {
        this.customerCheckAll = !this.customerCheckAll;
      }
      this.customerIndeterminate = false;

      if (this.customerCheckAll) {
        this.customerCheckAllGroup = this.customerInfoList.map(v => v.name);
      } else {
        this.customerCheckAllGroup = [];
      }
    }
    /**
     * 客户信息
     */
    customerCheckAllGroupChange(data) {
      if (data.length === this.customerInfoList.length) {
        this.customerIndeterminate = false;
        this.customerCheckAll = true;
      } else if (data.length > 0) {
        this.customerIndeterminate = true;
        this.customerCheckAll = false;
      } else {
        this.customerIndeterminate = false;
        this.customerCheckAll = false;
      }
    }

    /**
     * 订单信息
     */
    orderHandleCheckAll() {
      if (this.orderIndeterminate) {
        this.orderCheckAll = false;
      } else {
        this.orderCheckAll = !this.orderCheckAll;
      }
      this.orderIndeterminate = false;

      if (this.orderCheckAll) {
        this.orderCheckAllGroup = this.orderInfoList.map(v => v.name);
      } else {
        this.orderCheckAllGroup = [];
      }
    }
    /**
     * 订单信息
     */
    orderCheckAllGroupChange(data) {
      if (data.length === this.orderInfoList.length) {
        this.orderIndeterminate = false;
        this.orderCheckAll = true;
      } else if (data.length > 0) {
        this.orderIndeterminate = true;
        this.orderCheckAll = false;
      } else {
        this.orderIndeterminate = false;
        this.orderCheckAll = false;
      }
    }
    created() {
      /**
       * 选购信息
       */
      this.checkBuyList = [{
        index: 1,
        name: '租赁用途'
      }, {
        index: 2,
        name: '自缴费用'
      }, {
        index: 3,
        name: '意向融资金额'
      }, {
        index: 4,
        name: '租赁支付'
      }, {
        index: 5,
        name: '意向期限'
      }, {
        index: 6,
        name: '意向首付比例'
      }, {
        index: 7,
        name: '购车型号'
      }, {
        index: 8,
        name: '购车颜色'
      }, {
        index: 9,
        name: '购车配置'
      }, {
        index: 10,
        name: '车辆排量'
      }, {
        index: 11,
        name: '上牌地区'
      }, {
        index: 12,
        name: '车牌号码'
      }]
      /**
       * 产品信息
       */
      this.prdInfoList = [{
        index: 1,
        name: '产品系列'
      }, {
        index: 2,
        name: '产品名称'
      }, {
        index: 3,
        name: '产品期数'
      }, {
        index: 4,
        name: '产品利率'
      }, {
        index: 5,
        name: '还款方式'
      }, {
        index: 6,
        name: '融资额度'
      }]
      /**
       * 金融方案
       */
      this.financeInfoList = [{
        index: 1,
        name: '首付比例'
      }, {
        index: 2,
        name: '首付金额'
      }, {
        index: 3,
        name: '融资额'
      }, {
        index: 4,
        name: '融资期数'
      }, {
        index: 5,
        name: '月供'
      }, {
        index: 6,
        name: '尾付款'
      }, {
        index: 7,
        name: '路桥费'
      }, {
        index: 8,
        name: '合同金额'
      }]
      /**
       * 客户信息
       */
      this.customerInfoList = [{
        index: 1,
        name: '姓名'
      }, {
        index: 2,
        name: '性别'
      }, {
        index: 3,
        name: '出生日期'
      }, {
        index: 4,
        name: '微信号码'
      }, {
        index: 5,
        name: '手机号（主）'
      }, {
        index: 6,
        name: '手机号（次）'
      }, {
        index: 7,
        name: '婚属状况'
      }, {
        index: 8,
        name: '教育程度'
      }, {
        index: 9,
        name: '家庭座机'
      }, {
        index: 10,
        name: '电费账号'
      }, {
        index: 11,
        name: '电费密码'
      }, {
        index: 12,
        name: '毕业院校'
      }, {
        index: 13,
        name: '身份证号码'
      }, {
        index: 14,
        name: '证件有效期'
      }, {
        index: 15,
        name: '发证机关'
      }, {
        index: 16,
        name: '身份证地址'
      }, {
        index: 17,
        name: '现居住地址'
      }, {
        index: 18,
        name: '现居住地生活时长'
      }, {
        index: 19,
        name: '现居住地房产归属'
      }, {
        index: 20,
        name: '本市自有房产状况及归属'
      }, {
        index: 21,
        name: '本市房产地址'
      }, {
        index: 22,
        name: '本市生活时长'
      }, {
        index: 23,
        name: '职业信息'
      }, {
        index: 24,
        name: '客户来源'
      }]
      /**
       * 订单信息
       */
      this.orderInfoList = [{
        index: 1,
        name: '订单创建日期'
      }, {
        index: 2,
        name: '合同生效日期'
      }, {
        index: 3,
        name: '提车日期'
      }, {
        index: 4,
        name: '合同编号'
      }, {
        index: 5,
        name: '订单状态'
      }, {
        index: 6,
        name: '订单创建人'
      }, {
        index: 7,
        name: '订单创建人归属部门'
      }]
      this.columns1 = [{
          title: "客户名",
          key: "customerName",
          width: 160,
          fixed: 'left',
          align: 'center'
        }, {
          title: "合同号",
          key: "compactId",
          width: 160,
          align: 'center'
        },
        {
          title: "证件号码",
          key: "idCard",
          width: 160,
          align: 'center'
        },
        {
          title: "手机号码",
          key: "phone",
          width: 160,
          align: 'center'
        },
        {
          title: "银行名称",
          key: "bankName",
          width: 100,
          align: 'center'
        },
        {
          title: "银行卡号",
          key: "bankCardId",
          width: 180,
          align: 'center'
        },
        {
          title: "租赁期数",
          key: "rentPeriods",
          width: 100,
          align: 'center'
        },
        {
          title: "融资额",
          key: "financedAmount",
          width: 100,
          align: 'center'
        },
        {
          title: "首付款",
          key: "initialPayment",
          width: 100,
          align: 'center'
        },
        {
          title: "保证金",
          key: "cashDeposit",
          width: 100,
          align: 'center'
        },
        {
          title: "购置税",
          key: "purchaseTax",
          width: 100
        },
        {
          title: "路桥费",
          key: "tollCharge",
          width: 100,
          align: 'center'
        },
        {
          title: "保险费",
          key: "insuranceExpences",
          width: 100,
          align: 'center'
        },
        {
          title: "结算通道",
          key: "settleChannel",
          width: 100,
          align: 'center'
        },
        {
          title: "已还期数",
          key: "alreadyPayPeriods",
          width: 100,
          align: 'center'
        },
        {
          title: "剩余期数",
          key: "residuePeriods",
          width: 100,
          align: 'center'
        },
        {
          title: "月还款额",
          key: "monthPayAmt",
          width: 100,
          align: 'center'
        },
        {
          title: "已还款总额",
          key: "alreadyPayAmount",
          width: 100,
          align: 'center'
        },
        {
          title: "剩余还款总额",
          key: "residuePayAmount",
          width: 120,
          align: 'center'
        },
        {
          title: "租金总额",
          key: "rentTotalAmt",
          width: 100,
          align: 'center'
        },
        {
          title: "租赁状态",
          key: "rentStatus",
          width: 100,
          align: 'center'
        }
      ]

      this.data1 = [{
        customerName: '王炳忠',
        compactId: '524565789',
        idCard: '610303199112251546',
        phone: '15064568989',
        bankName: '建设银行',
        bankCardId: '6227004171150138356',
        rentPeriods: '12',
        financedAmount: '50000',
        initialPayment: '10000',
        cashDeposit: '600',
        purchaseTax: '850',
        tollCharge: '352',
        insuranceExpences: '56',
        settleChannel: '汇付',
        alreadyPayPeriods: '11',
        residuePeriods: '1',
        monthPayAmt: '3500',
        alreadyPayAmount: '38500',
        residuePayAmount: '11500',
        rentTotalAmt: '55000',
        rentStatus: '正常',
        test: 'sdf'
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

<style>
  .exportTitle {
    font-size: 14px;
    font-weight: bold;
    margin-top: 20px;
  }

</style>
