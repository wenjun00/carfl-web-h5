<!--抵押申请-->
<template>
  <section class="component mortgage-car-list">
    <data-box ref="data-box" :show-config-column="false" :data="carDataSet" :page="pageService" :columns="carColumns"></data-box>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { PageService } from "~/utils/page.service";
import { Dependencies } from "~/core/decorator";
import { AssessMentApplyService } from "~/services/manage-service/assess-ment-apply.service";
import DataBox from "~/components/common/data-box.vue";

@Component({})
export default class MortgageCarList extends Vue {
  @Dependencies(PageService) pageService: PageService;
  @Dependencies(AssessMentApplyService)
  assessMentApplyService: AssessMentApplyService;
  @Prop() cardNumber; // 身份证号码

  private carDataSet: Array<any> = [];
  // 车辆列配置
  private carColumns = [
    {
      type: "selection",
      width: 60,
      align: "center"
    },
    {
      title: "品牌",
      align: "center",
      key: "brandName"
    },
    {
      title: "系列",
      align: "center",
      key: "seriesName"
    },
    {
      title: "型号",
      align: "center",
      key: "carName"
    },
    {
      title: "车身颜色",
      align: "center",
      key: "carColor"
    },
    {
      title: "车辆排量",
      align: "center",
      key: "displacement"
    },
    {
      title: "车辆牌照",
      align: "center",
      key: "carNo"
    },
    {
      title: "行驶里程(公里)",
      align: "center",
      key: "mileage"
    },
    {
      title: "评估价(元)",
      align: "center",
      key: "evaluation",
      render: (h, { row }) =>
        h("span", this.$filter.toThousands(row.evaluation))
    }
  ];

  /**
   * 获取抵押车辆列表
   */
  private getMortgageCatList() {
    this.assessMentApplyService
      .orderMortgageSearch(
        {
          cardNumber: "110101190001010011"
        },
        this.pageService
      )
      .subscribe(data => {
        this.carDataSet = data;
      });
  }

  /**
   * 获取当前选择项
   */
  public getCurrentSelection() {
    let dataBox = this.$refs["data-box"] as DataBox;
    return dataBox.getCurrentSelection();
  }

  mounted() {
    this.getMortgageCatList();
  }
}
</script>
  
<style lang="less" scoped>
.component.mortgage-car-list {
}
</style>
