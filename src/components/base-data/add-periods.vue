<!--新增期数-->
<template>
  <section class="component add-periods">
    <div class="addPeriodsItem">自然参数</div>
    <data-grid :labelWidth="100">
      <data-grid-item label="产品序号" :span="4">
        <div>
          LCP0009
        </div>
      </data-grid-item>
      <data-grid-item label="产品名称" :span="8">
        <div>
          融资租赁
        </div>
      </data-grid-item>
      <data-grid-item label="产品期数" :span="4">
        <div>
          <i-input></i-input>
        </div>
      </data-grid-item>
      <data-grid-item label="产品利率" :span="4">
        <div>
          <i-input style="display:inline-block;width:80%;"></i-input>%/月
        </div>
      </data-grid-item>
      <data-grid-item label="还款方式" :span="4">
        <div>
          <i-select>
            <i-option label="等本等息" value="等本等息" key="等本等息"></i-option>
            <i-option label="等额等息" value="等额等息" key="等额等息"></i-option>
          </i-select>
        </div>
      </data-grid-item>
      <data-grid-item label="周期类型" :span="4">
        <div>
          <i-select>
            <i-option label="月" value="" key="月"></i-option>
          </i-select>
        </div>
      </data-grid-item>
      <data-grid-item label="融资金额" :span="8">
        <div>
          <i-input style="width:45%"></i-input>~
          <i-input style="width:45%"></i-input>
        </div>
      </data-grid-item>
      <data-grid-item label="账期类型" :span="12">
        <div>
          <i-radio-group style="float:left;margin-top:6px;" v-model="accountPeriodsList" @on-change="changeAccountType">
            <i-radio label="正常账期"></i-radio>
            <i-radio label="固定账期"></i-radio>
          </i-radio-group>
          <i-select style="width:40%;float:left" :disabled="disabled">
            <i-option label="1日" key="1日" value="1日"></i-option>
            <i-option label="2日" key="2日" value="2日"></i-option>
            <i-option label="3日" key="3日" value="3日"></i-option>
            <i-option label="4日" key="4日" value="4日"></i-option>
            <i-option label="5日" key="5日" value="5日"></i-option>
            <i-option label="6日" key="6日" value="6日"></i-option>
            <i-option label="7日" key="7日" value="7日"></i-option>
            <i-option label="8日" key="8日" value="8日"></i-option>
            <i-option label="9日" key="9日" value="9日"></i-option>
            <i-option label="10日" key="10日" value="10日"></i-option>
          </i-select>
        </div>
      </data-grid-item>
    </data-grid>
    <div class="addPeriodsItem">首付款参数</div>
    <data-grid :labelWidth="100">
      <data-grid-item label="首付款" :span="12">
        <i-radio-group style="float:left;margin-top:6px;" v-model="initialParams" @on-change="changeInitialParams">
          <i-radio label="无"></i-radio>
          <i-radio label="有"></i-radio>
        </i-radio-group>
        <div v-show="initialParamsShow" style="float:left">
          <span>比例</span>
          <i-input style="width:45%;display:inline-block;margin-left:10px;"></i-input><span style="color:red">%</span><span style="color:blue">如果有多个则用分号隔开</span>
        </div>
      </data-grid-item>
    </data-grid>
    <div class="addPeriodsItem">保证金参数</div>
    <data-grid :labelWidth="100">
      <data-grid-item label="保证金" :span="12">
        <i-radio-group style="float:left;margin-top:6px;" v-model="promiseMoenyParams" @on-change="changePromiseMoenyParams">
          <i-radio label="无"></i-radio>
          <i-radio label="有"></i-radio>
        </i-radio-group>
      </data-grid-item>
      <data-grid-item label="保证金比例" :span="12">
        <div v-show="promiseMoneyShow" style="float:left">
          <span style="margin-right:10px;">比例</span>
          <i-input style="width:20%;display:inline-block"></i-input><span style="color:red">%</span>
          <i-select placeholder="缴纳方式" style="width:20%;display:inline-block">
            <i-option label="退还" value="退还" key="退还"></i-option>
            <i-option label="不退还" value="不退还" key="不退还"></i-option>
          </i-select>
          <span style="color:blue">如果有多个则用分号隔开</span>
        </div>
      </data-grid-item>
    </data-grid>
    <div class="addPeriodsItem">尾付款参数</div>
    <data-grid :labelWidth="100">
      <data-grid-item label="尾付款" :span="12">
        <i-radio-group style="float:left;margin-top:6px;" v-model="residueParams" @on-change="changeResidueParams">
          <i-radio label="无"></i-radio>
          <i-radio label="有"></i-radio>
        </i-radio-group>
        <div v-show="residueParamsShow" style="float:left">
          <span>年利率</span>
          <i-input style="width:45%;display:inline-block;margin-left:10px;"></i-input><span style="color:red">%</span><span style="color:blue">如果有多个则用分号隔开</span>
        </div>
      </data-grid-item>
    </data-grid>
    <div class="addPeriodsItem">管理费参数</div>
    <data-grid :labelWidth="100">
      <data-grid-item label="管理费" :span="12">
        <i-radio-group style="float:left;margin-top:6px;" v-model="manageMoneyParams" @on-change="changeManageMoney">
          <i-radio label="无"></i-radio>
          <i-radio label="有"></i-radio>
        </i-radio-group>
        <div v-show="manageParamsShow" style="float:left">
          <span>比例</span>
          <i-input style="width:45%;display:inline-block;margin-left:10px;"></i-input><span style="color:red">%</span><span style="color:blue">如果有多个则用分号隔开</span>
        </div>
      </data-grid-item>
      <data-grid-item label="管理费收取方式" :span="12">
        <i-radio-group v-model="manageType" style="float:left">
          <i-radio label="一次性收取"></i-radio>
          <i-radio label="分期数收取"></i-radio>
        </i-radio-group>
      </data-grid-item>
    </data-grid>
    <div class="addPeriodsItem">逾期违约惩罚参数</div>
    <data-grid :labelWidth="100">
      <data-grid-item :span="6" label="征信保护天数">
        <div>
          <i-input style="width:25%;display:inline-block"></i-input>天
        </div>
      </data-grid-item>
      <data-grid-item :span="6" label="逾期保护天数">
        <div>
          <i-input style="width:25%;display:inline-block"></i-input>天
        </div>
      </data-grid-item>
      <data-grid-item :span="6" label="合同违约金费率">
        <div>
          <i-input style="width:25%;display:inline-block"></i-input>%
        </div>
      </data-grid-item>
      <data-grid-item :span="6" label="提前还款费率">
        <div>
          <i-input style="width:25%;display:inline-block"></i-input>%
        </div>
      </data-grid-item>
      <data-grid-item :span="12" label="罚息费率">
        <div>
          <i-input style="width:25%;display:inline-block"></i-input>%/天
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
  import Component from "vue-class-component";
  import {
    DataGrid,
    DataGridItem
  } from "fintech-vue-component";
  @Component({
    components: {
      DataGrid,
      DataGridItem
    }
  })
  export default class AddPeriods extends Vue {
    private accountPeriodsList: String = "正常账期"
    private initialParams: String = "无"
    private promiseMoenyParams: String = "无"
    private residueParams: String = "无"
    private manageMoneyParams: String = "无"
    private manageType: String = "一次性收取"
    private pulishStatus: String = "已发布"
    private disabled: Boolean = false;
    private initialParamsShow: Boolean = false;
    private changePromiseMoenyShow: Boolean = false;
    private promiseMoneyShow: Boolean = false;
    private residueParamsShow: Boolean = false;
    private manageParamsShow: Boolean = false;

    created() {

    }
    changeAccountType(val) {
      if (val === '正常账期') {
        this.disabled = true
      } else {
        this.disabled = false
      }
    }
    changeInitialParams(val) {
      if (val === '无') {
        this.initialParamsShow = false
      } else {
        this.initialParamsShow = true
      }
    }
    changePromiseMoenyParams(val) {
      if (val === '无') {
        this.promiseMoneyShow = false
      } else {
        this.promiseMoneyShow = true
      }
    }
    changeResidueParams(val) {
      if (val === '无') {
        this.residueParamsShow = false
      } else {
        this.residueParamsShow = true
      }
    }
    changeManageMoney(val) {
      if (val === "无") {
        this.manageParamsShow = false
      } else {
        this.manageParamsShow = true
      }
    }
  }
</script>

<style lang="less">
  .addPeriodsItem {
    font-size: 14px;
    font-weight: bold;
    margin-top:16px;
  }
</style>