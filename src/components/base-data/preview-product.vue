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
                    {{productDetailView.periods}}
                </div>
            </data-grid-item>
            <data-grid-item label="产品利率" :span="4">
                <div>
                    {{productDetailView.productRate}}%/月
                </div>
            </data-grid-item>
            <data-grid-item label="还款方式" :span="4">
                <div>
                    {{productDetailView.payWay === 384 ? "等本等息" : "等额等息"}}
                </div>
            </data-grid-item>
            <data-grid-item label="周期类型" :span="4">
                <div>
                    {{productDetailView.periodType === 388 ? "月" : ""}}
                </div>
            </data-grid-item>
            <data-grid-item label="融资金额" :span="8">
                <div>
                    {{productDetailView.financingAmount}}
                </div>
            </data-grid-item>
            <data-grid-item label="账期类型" :span="12">
                <i-radio-group style="float:left;" v-model="accountPeriodsList" ref="accountPeriodsList">
                    <i-radio label="正常账期"></i-radio>
                    <i-radio label="固定账期"></i-radio>
                </i-radio-group>
                <span v-show="productDetailView.paymentType===387">{{productDetailView.paymentDay}}月</span>
            </data-grid-item>
        </data-grid>
        <div class="addPeriodsItem">首付款参数</div>
        <data-grid :labelWidth="100">
            <data-grid-item label="首付款" :span="12">
                <div type="flex" align="middle">
                    <i-radio-group style="float:left;" v-model="initialParams">
                        <i-radio label="无"></i-radio>
                        <i-radio label="有"></i-radio>
                    </i-radio-group>
                    <div v-show="productDetailView.manageCost!=''" style="float:left">
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
                    <i-radio label="无"></i-radio>
                    <i-radio label="有"></i-radio>
                </i-radio-group>
            </data-grid-item>
            <data-grid-item label="保证金比例" :span="12">
                <div v-show="productDetailView.depositCash!=''" style="float:left">
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
                    <i-radio label="无"></i-radio>
                    <i-radio label="有"></i-radio>
                </i-radio-group>
                <div v-show="productDetailView.finalCash != '' " style="float:left;margin-top:4px;">
                    <span>年利率：</span>
                    <span>{{productDetailView.finalCash}}</span>
                    <span style="color:red">%</span>
                </div>
            </data-grid-item>
        </data-grid>
        <div class="addPeriodsItem">管理费参数</div>
        <data-grid :labelWidth="100">
            <data-grid-item label="管理费" :span="12">
                <i-radio-group style="float:left;margin-top:6px;" v-model="manageMoneyParams">
                    <i-radio label="无"></i-radio>
                    <i-radio label="有"></i-radio>
                </i-radio-group>
                <div v-show="productDetailView.manageCost != ''" style="float:left;margin-top:6px;">
                    <span>比例</span>
                    <span>{{productDetailView.manageCost}}</span>
                    <span style="color:red">%</span>
                </div>
            </data-grid-item>
            <data-grid-item label="管理费收取方式" :span="12">
                <i-radio-group v-model="productDetailView.manageCostType" style="float:left">
                    <i-radio label="一次性收取"></i-radio>
                    <i-radio label="分期数收取"></i-radio>
                </i-radio-group>
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
        <i-radio-group v-model="pulishStatus">
            <i-radio label="未发布"></i-radio>
            <i-radio label="已发布"></i-radio>
        </i-radio-group>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import Page from "~/core/page";
import Component from "vue-class-component";
import SvgIcon from "~/components/common/svg-icon.vue";
import { Prop } from "vue-property-decorator";
import { Form } from "iview";
import { Dependencies } from "~/core/decorator";
import { DataGrid, DataGridItem } from "vue-fintech-component";
import { Layout } from "~/core/decorator";
@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class AddPeriods extends Vue {
  @Prop() productDetailView: any;
  @Prop() dpNameTitleView: any;
  private accountPeriodsList: String = "正常账期";
  private initialParams: String = "无";
  private promiseMoenyParams: String = "无";
  private residueParams: String = "无";
  private manageMoneyParams: String = "无";
  private pulishStatus: String = "已发布";

  created() {
    this.class();
  }
  class() {
    if (this.productDetailView.manageCost != "") {
      this.initialParams = "有";
    }
    if (this.productDetailView.paymentType === 387) {
      this.accountPeriodsList = "固定账期";
    }
    if (this.productDetailView.depositCash != "") {
      this.promiseMoenyParams = "有";
    }
    if (this.productDetailView.finalCash != "") {
      this.residueParams = "有";
    }
    if (this.productDetailView.manageCost != "") {
      this.manageMoneyParams = "有";
    }
    if (this.productDetailView.manageCostType === 394) {
      this.productDetailView.manageCostType = "一次性收取";
    } else if (this.productDetailView.manageCostType === 395) {
      this.productDetailView.manageCostType = "分期收取";
    }
    if (this.productDetailView.isPublish === 361) {
      this.pulishStatus = "未发布";
    } else if (this.productDetailView.isPublish === 360) {
      this.pulishStatus = "已发布";
    }
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
