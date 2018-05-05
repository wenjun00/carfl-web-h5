<!--抵押申请-->
<template>
    <section class="component mortgage-car-list">
        <template>
            <i-form class="iForm" ref="basis-form" :label-width="90">
                <i-row type="flex">
                    <i-col>
                        <i-form-item label="客户姓名">
                            <i-input></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col>
                        <i-form-item label="联系电话">
                            <i-input></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col>
                        <i-form-item label="评估编号">
                            <i-input></i-input>
                        </i-form-item>
                    </i-col>
                    <i-button class="iSeek" type="text">搜索</i-button>
                </i-row>
            </i-form>
        </template>
        <data-box ref="data-box" :show-config-column="false" :data="carDataSet" :page="pageService" :columns="carColumns"></data-box>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { PageService } from '~/utils/page.service'
import { Dependencies } from '~/core/decorator'
import { AssessMentApplyService } from '~/services/manage-service/assess-ment-apply.service'
import DataBox from '~/components/common/data-box.vue'

@Component({})
export default class MortgageCarList extends Vue {
  @Dependencies(PageService) pageService: PageService
  @Dependencies(AssessMentApplyService)
  assessMentApplyService: AssessMentApplyService
  @Prop() cardNumber // 身份证号码

  private carDataSet: Array<any> = []
  // 车辆列配置
  private carColumns = [
    {
      type: 'selection',
      width: 60,
      align: 'center'
    },
    {
      title: '品牌',
      align: 'center',
      key: 'brandName'
    },
    {
      title: '系列',
      align: 'center',
      key: 'seriesName'
    },
    {
      title: '型号',
      align: 'center',
      key: 'carName'
    },
    {
      title: '车身颜色',
      align: 'center',
      key: 'vehicleColour'
    },
    {
      title: '车辆排量',
      align: 'center',
      key: 'vehicleEmissions'
    },
    {
      title: '车辆牌照',
      align: 'center',
      key: 'carNo'
    },
    {
      title: '行驶里程(公里)',
      align: 'center',
      key: 'mileage',
      minWidth: this.$common.getColumnWidth(3),
    },
    {
      title: '评估价(元)',
      align: 'center',
      key: 'evaluation',
      render: (h, { row }) =>
        h('span', this.$filter.toThousands(row.evaluation))
    }
  ]

  /**
   * 获取抵押车辆列表
   */
  private getMortgageCatList() {
    this.assessMentApplyService
      .orderMortgageSearch(
        {
          cardNumber: this.cardNumber
        },
        this.pageService
      )
      .subscribe(data => {
        this.carDataSet = data.map(car => ({
          assessmentId: car.id,
          assessmentNo: car.assessmentNo,
          brandName: car.brandName,
          seriesName: car.seriesName,
          carName: car.carName,
          assessmentStatus: car.assessmentStatus,
          assessmentTime: car.assessmentTime,
          vehicleColour: car.carColor,
          vehicleEmissions: car.displacement,
          carNo: car.carNo,
          carSituation: car.carSituation,
          evaluation: car.evaluation,
          mileage: car.mileage
        }))
      })
  }

  /**
   * 获取当前选择项
   */
  public getCurrentSelection() {
    let dataBox = this.$refs['data-box'] as DataBox
    return dataBox.getCurrentSelection()
  }

  mounted() {
    this.getMortgageCatList()
  }
}
</script>

<style lang="less" scoped>
.component.mortgage-car-list {
  .iForm {
    .ivu-input-wrapper,
    .ivu-input-type {
      width: 100px;
    }
    .iSeek {
      height: 32px;
      margin-left: 35px;
    }
  }
}
</style>
