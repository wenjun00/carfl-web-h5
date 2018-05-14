<!--预览期数-->
<template>
  <section class="component preview-periods">
    <div class="addPeriodsItem">自然参数</div>
    <data-grid :labelWidth="100">
      <data-grid-item label="产品序号" :span="4">{{dpNameTitleView.number}}</data-grid-item>
      <data-grid-item label="产品名称" :span="8"> {{dpNameTitleView.name}}</data-grid-item>
      <data-grid-item label="产品期数" :span="4"> {{productDetailView.periods | dictConvert}}</data-grid-item>
      <data-grid-item label="产品月利率" :span="4"> {{productDetailView.productRate | decimalToPrecent(4)}}</data-grid-item>
      <data-grid-item label="还款方式" :span="4">{{productDetailView.payWay | dictConvert}}</data-grid-item>
      <data-grid-item label="周期类型" :span="4"> {{productDetailView.periodType | dictConvert}} </data-grid-item>
      <data-grid-item label="融资金额" :span="8">{{productDetailView.financingAmount}}</data-grid-item>
      <data-grid-item label="账期类型" :span="12">
        <i-radio-group class="item-float-left" v-model="productDetailView.paymentType">
          <i-radio v-for="{value,label} in $dict.getDictData('0409')" :key="value" :label="value" disabled>{{label}}</i-radio>
        </i-radio-group>
        <span class="item-float-left" v-if="productDetailView.paymentType === 387">{{productDetailView.paymentDay + '日'}} </span>
      </data-grid-item>
    </data-grid>
    <div class="addPeriodsItem">管理费参数</div>
    <data-grid :labelWidth="100">
      <data-grid-item label="管理费" :span="12">
        <i-radio-group class="item-float-left item-margin-top6" v-model="manageMoneyParams">
          <i-radio label="无" disabled></i-radio>
          <i-radio label="有" disabled></i-radio>
        </i-radio-group>
        <div v-show="manageMoneyParams==='有'" class="item-float-left item-margin-top6">
          <span>比例</span>
          <span>{{productDetailView.manageCost}}</span>
          <span class="item-color-red">%</span>
        </div>
      </data-grid-item>
      <data-grid-item label="管理费收取方式" :span="12" v-if="manageMoneyParams==='有'">
        <i-radio-group v-model="productDetailView.manageCostType" class="item-float-left">
          <i-radio :label="394" disabled>一次性收取</i-radio>
          <i-radio :label="395" disabled>分期数收取</i-radio>
        </i-radio-group>
        <span v-if="productDetailView.manageCostType===395" class="item-float-left">{{productDetailView.stagingPeriods}}期</span>
      </data-grid-item>
    </data-grid>
    <div class="addPeriodsItem">逾期违约惩罚参数</div>
    <data-grid :labelWidth="100">
      <data-grid-item :span="6" label="征信保护天数">
        <div>
          {{productDetailView.creditProtectDays}}天
        </div>
      </data-grid-item>
      <data-grid-item :span="6" label="逾期保护天数">
        <div>
          {{productDetailView.overdueProtectDays}}天
        </div>
      </data-grid-item>
      <data-grid-item :span="6" label="合同违约金费率">
        <div>
          {{productDetailView.contractBreakRate*100}}%
        </div>
      </data-grid-item>
      <data-grid-item :span="6" label="提前还款费率">
        <div>
          {{productDetailView.prepaymentRate*100}}%
        </div>
      </data-grid-item>
      <data-grid-item :span="12" label="罚息费率">
        <div>
          {{productDetailView.penaltyRate*100}}%/天
        </div>
      </data-grid-item>
    </data-grid>
    <div class="item-zhuangtai-div addPeriodsItem">状态</div>
    <i-radio-group v-model="productDetailView.isPublish">
      <i-radio :label="361" disabled>未发布</i-radio>
      <i-radio :label="360" disabled>已发布</i-radio>
    </i-radio-group>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Page from '~/core/page';
import Component from 'vue-class-component';
import SvgIcon from '~/components/common/svg-icon.vue';
import { Prop, Watch } from 'vue-property-decorator';
import { Form } from 'iview';
import { Dependencies } from '~/core/decorator';
import { DataGrid, DataGridItem } from '@zct1989/vue-component';
import { Layout } from '~/core/decorator';
@Component({
  components: {
    DataGrid,
    DataGridItem,
  },
})
export default class AddPeriods extends Vue {
  @Prop() productDetailView: any;
  @Prop() dpNameTitleView: any;
  private initialParams: String = '无';
  private promiseMoenyParams: String = '无';
  private residueParams: String = '无';
  private manageMoneyParams: String = '无';

  @Watch('productDetailView')
  onProductDetailView() {
    this.initialParams = this.productDetailView.initialPayment ? '有' : '无'
    this.promiseMoenyParams = this.productDetailView.depositCash ? '有' : '无'
    this.residueParams = this.productDetailView.finalCash ? '有' : '无'
    this.manageMoneyParams = this.productDetailView.manageCost ? '有' : '无'
  }
}
</script>

<style lang="less" scoped>
.addPeriodsItem {
  font-size: 14px;
  font-weight: bold;
  margin-top: 16px;
}
.item-float-left {
  float: left;
}
.item-color-red {
  color: red;
}
.item-margin-top6 {
  margin-top: 6px;
}
.item-margin-top2 {
  margin-top: 2px;
}
.item-margin-top4 {
  margin-top: 4px;
}
.item-margin-top10 {
  margin-top: 10px;
}
.item-zhuangtai-div {
  margin-right: 10px;
  display: inline-block;
}
</style>
