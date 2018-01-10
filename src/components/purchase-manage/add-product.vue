<template>
  <section class="component add-product">
    <i-row>
      <i-input style="display:inline-block;width:20%;margin-right:10px" placeholder="请输入关键字"></i-input>
      <i-button class="blueButton">搜索</i-button>
    </i-row>
    <i-row style="margin-top:10px;">
      <i-col :span="4" style="border:1px solid #DDDDDD;height:570px;overflow:auto" :class="{open:isShown,close:!isShown}">
        <i-tree :data="categoryData" style="padding:10px;"></i-tree>
      </i-col>
      <i-col :span="20">
        <i-row type="flex" justify="start">
          <i-col class="arrowButton" :span="2">
            <div :class="{arrowDown:!isShown,arrowUp:isShown}" @click="showCategory">
              <Icon type="android-arrow-dropleft-circle" color="white" size="16"></Icon>
            </div>
          </i-col>
          <i-col span="22" style="overflow:auto">
            <div>
              <data-box :columns="carColumns" :data="carData" border stripe></data-box>
            </div>
          </i-col>
        </i-row>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    ApplyQueryService
  } from "~/services/business-service/apply-query.service";
  @Component({

    components: {
      DataBox
    }
  })
  export default class AddProduct extends Vue {
    private isShown: Boolean = true;
    private carColumns: any;
    private carData: Array < Object > = [];
    private checkRadio: String = ""
    private categoryData: Array < Object > ;
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    @Prop() row: Object;
    created() {
      this.categoryData = [{
        title: '开呗融资租赁',
        expand: true,
        children: [{
          title: '直租',
          expand: true,
          children: [{
              title: '群泰融资'
            },
            {
              title: '开呗长租',
            },
            {
              title: '龙江',
            },
            {
              title: '中金',
            }
          ]
        }]
      }]
      this.carColumns = [{
        align: 'center',
        width: 60,
        type: 'selection'
      }, {
        title: '期数(月)',
        key: 'periods',
        align: 'center',
        width: 100
      }, {
        title: '账期类型',
        key: 'paymentType',
        align: 'center',
        width: 120
      }, {
        title: '产品利率',
        key: 'prdInterestRate',
        align: 'center',
        width: 100
      }, {
        title: '还款方式',
        key: 'repayType',
        align: 'center',
        width: 100
      }, {
        title: '融资金额(元)',
        key: 'financeMoney',
        align: 'center',
        width: 110
      }, {
        title: '首付款',
        key: 'initialPay',
        align: 'center',
        width: 100
      }, {
        title: '保证金',
        key: 'promisePay',
        align: 'center',
        width: 100
      }, {
        title: '尾付款',
        key: 'lastPay',
        align: 'center',
        width: 100
      }, {
        title: '管理费',
        key: 'managePay',
        align: 'center',
        width: 100
      }, {
        title: '状态',
        key: 'status',
        align: 'center'
      }]

      this.carData = [{
        periods: '12期',
        paymentType: '固定账期(5日)',
        prdInterestRate: '0.99',
        repayType: '等本等息',
        financeMoney: '10000~30000',
        initialPay: '0%~25%',
        promisePay: '1000',
        lastPay: '',
        managePay: '',
        status: '已发布'
      }, {
        periods: '12期',
        paymentType: '固定账期(5日)',
        prdInterestRate: '0.99',
        repayType: '等本等息',
        financeMoney: '10000~30000',
        initialPay: '0%~30%',
        promisePay: '1200',
        lastPay: '5000',
        managePay: '',
        status: '已发布'
      }, {
        periods: '12期',
        paymentType: '固定账期(5日)',
        prdInterestRate: '1.05',
        repayType: '等本等息',
        financeMoney: '10000~30000',
        initialPay: '0%~25%',
        promisePay: '500',
        lastPay: '',
        managePay: '',
        status: '已发布'
      }, {
        periods: '12期',
        paymentType: '固定账期(5日)',
        prdInterestRate: '1.23',
        repayType: '等本等息',
        financeMoney: '10000~30000',
        initialPay: '0%~25%',
        promisePay: '1000',
        lastPay: '',
        managePay: '120',
        status: '已发布'
      }]

    }


    showCategory() {
      this.isShown = !this.isShown
    }
  }

</script>
<style lang="less" scope>
  .open {
    max-width: auto;
    overflow: hidden;
  }

  .close {
    max-width: 0;
    min-width: 0;
    overflow: hidden;
  }

  .arrowUp {
    transform: rotate(0deg); // transition: transform ease-in 0.2s;
    cursor: pointer;
  }

  .arrowDown {
    transform: rotate(180deg); // transition: transform ease-in 0.2s;
    cursor: pointer;
  }

  .arrowButton {
    line-height: 570px;
    height: 100%;
    background: #265EA2;
    text-align: center;
    width: 20px;
  }

</style>
