<!--预览期数-->
<template>
  <section class="component add-periods">
    <div class="addPeriodsItem">自然参数</div>
    <data-grid :labelWidth="100">
      <data-grid-item label="产品序号" :span="4">
        <div>
          {{dpNameTitleView.number}}
        </div>
      </data-grid-item>
      <data-grid-item label="产品名称" :span="8">
        <div>
          {{dpNameTitleView.name}}
        </div>
      </data-grid-item>
      <data-grid-item label="产品期数" :span="4">
        <div>
          {{$dict.getDictName(productDetailView.periods)}}
        </div>
      </data-grid-item>
      <data-grid-item label="产品利率" :span="4">
        <div>
          {{productDetailView.productRate}}%/月
        </div>
      </data-grid-item>
      <data-grid-item label="还款方式" :span="4">
        <div>
          {{$dict.getDictName(productDetailView.payWay)}}
        </div>
      </data-grid-item>
      <data-grid-item label="周期类型" :span="4">
        <div>
          {{$dict.getDictName(productDetailView.periodType)}}
        </div>
      </data-grid-item>
      <data-grid-item label="融资金额" :span="8">
        <div>
          {{productDetailView.financingAmount}}
        </div>
      </data-grid-item>
      <data-grid-item label="账期类型" :span="12">
        <i-radio-group style="float:left;" v-model="productDetailView.paymentType">
          <i-radio :label="386" disabled>正常账期</i-radio>
          <i-radio :label="387" disabled>固定账期</i-radio>
        </i-radio-group>
        <span v-show="productDetailView.paymentType===387">{{productDetailView.paymentDay}}日</span>
      </data-grid-item>
    </data-grid>
    <div class="addPeriodsItem">首付款参数</div>
    <data-grid :labelWidth="100">
      <data-grid-item label="首付款" :span="12">
        <div type="flex" align="middle">
          <i-radio-group style="float:left;" v-model="initialParams">
            <i-radio label="无" disabled></i-radio>
            <i-radio label="有" disabled></i-radio>
          </i-radio-group>
          <div v-show="initialParams==='有'" style="float:left">
            <span>比例</span>
            <span>{{productDetailView.manageCost}}</span>
            <span style="color:red">%</span>
          </div>
        </div>
      </data-grid-item>
    </data-grid>
    <div class="addPeriodsItem">保证金参数</div>
    <data-grid :labelWidth="100">
      <data-grid-item label="保证金" :span="12">
        <i-radio-group style="float:left;margin-top:6px;" v-model="promiseMoenyParams">
          <i-radio label="无" disabled></i-radio>
          <i-radio label="有" disabled></i-radio>
        </i-radio-group>
      </data-grid-item>
      <data-grid-item label="保证金比例" :span="12" v-if="promiseMoenyParams==='有'">
        <div style="float:left">
          <span style="margin-right:10px;">比例</span>
          <span>{{productDetailView.depositCash}}</span>
          <span style="color:red">%</span>
          <span>{{productDetailView.depositCashType === 396 ? "退还" : "不退还"}}</span>
        </div>
      </data-grid-item>
    </data-grid>
    <div class="addPeriodsItem">尾付款参数</div>
    <data-grid :labelWidth="100">
      <data-grid-item label="尾付款" :span="12">
        <i-radio-group style="float:left;margin-top:2px;" v-model="residueParams">
          <i-radio label="无" disabled></i-radio>
          <i-radio label="有" disabled></i-radio>
        </i-radio-group>
        <div v-show="residueParams==='有'" style="float:left;margin-top:4px;">
          <span>月利率：</span>
          <span>{{productDetailView.finalCash}}</span>
          <span style="color:red">%</span>
        </div>
      </data-grid-item>
    </data-grid>
    <div class="addPeriodsItem">管理费参数</div>
    <data-grid :labelWidth="100">
      <data-grid-item label="管理费" :span="12">
        <i-radio-group style="float:left;margin-top:6px;" v-model="manageMoneyParams">
          <i-radio label="无" disabled></i-radio>
          <i-radio label="有" disabled></i-radio>
        </i-radio-group>
        <div v-show="manageMoneyParams==='有'" style="float:left;margin-top:6px;">
          <span>比例</span>
          <span>{{productDetailView.manageCost}}</span>
          <span style="color:red">%</span>
        </div>
      </data-grid-item>
      <data-grid-item label="管理费收取方式" :span="12" v-if="manageMoneyParams==='有'">
        <i-radio-group v-model="productDetailView.manageCostType" style="float:left">
          <i-radio :label="394" disabled>一次性收取</i-radio>
          <i-radio :label="395" disabled>分期数收取</i-radio>
        </i-radio-group>
        <span v-if="productDetailView.manageCostType===395">{{productDetailView.stagingPeriods}}期</span>
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
          {{productDetailView.contractBreakRate}}%
        </div>
      </data-grid-item>
      <data-grid-item :span="6" label="提前还款费率">
        <div>
          {{productDetailView.prepaymentRate}}%
        </div>
      </data-grid-item>
      <data-grid-item :span="12" label="罚息费率">
        <div>
          {{productDetailView.penaltyRate}}%/天
        </div>
      </data-grid-item>
    </data-grid>
    <div style="margin-right:10px;display:inline-block" class="addPeriodsItem">状态</div>
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
	class() {
    this.productDetailView.manageCost?this.initialParams = '有':this.initialParams = '无';
    this.productDetailView.depositCash?this.promiseMoenyParams = '有':this.promiseMoenyParams = '无';
    this.productDetailView.finalCash?this.residueParams = '有':this.residueParams = '无';
    this.productDetailView.manageCost?this.manageMoneyParams = '有':this.manageMoneyParams = '无';
	}
}
</script>

<style lang="less">
.addPeriodsItem {
	font-size: 14px;
	font-weight: bold;
	margin-top: 16px;
}
</style>
