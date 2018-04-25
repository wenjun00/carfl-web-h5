<!--评估任务池-->
<template>
    <section class="page evaluation-task-pool">
        <page-header title="评估任务池" hidden-print>
            <i-button type="text" @click="allReceive">批量领取</i-button>
        </page-header>
        <data-form :model="taskpoolModel" @on-search="getPoolList" :page="pageService" date-prop="timeSearch">
            <template slot="input">
                <i-form-item prop="brandModel" label="品牌型号">
                    <i-input placeholder="请输入品牌、系列" v-model="taskpoolModel.carParams"></i-input>
                </i-form-item>
                <i-form-item prop="busNumber" label="车牌号码">
                    <i-input placeholder="请输入车牌号码" v-model="taskpoolModel.carNo"></i-input>
                </i-form-item>
                <i-form-item prop="customerName" label="客户姓名">
                    <i-input placeholder="请输入客户姓名" v-model="taskpoolModel.ownerName"></i-input>
                </i-form-item>
            </template>
        </data-form>
        <data-box :columns="taskpoolColumns" :data="dataSet" :page="pageService"></data-box>

    </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import { Button } from 'iview'
import { AssessMentApplyService } from "~/services/manage-service/assess-ment-apply.service";

@Layout('workspace')
@Component({
  components: {}
})
export default class EvaluationTaskPool extends Page {
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(AssessMentApplyService) private assessMentApplyService: AssessMentApplyService
  private dataSet: Array<any> = []
  private taskpoolModel: any = {
    carParams: '', //品牌系列
    carNo: '', // 车牌号码
    ownerName: '' // 客户姓名
  }
  private taskpoolColumns:any = [
    {
      type: 'selection',
      align: 'center',
      fixed: 'left',
      width:40,
    },
    {
      title: '操作',
      align: 'center',
      fixed: 'left',
      render: (h, { row}) => {
        return h('div', [
          h(
            'i-button',
            {
              props: {
                type: 'text'
              },
              style: {
                color: '#265EA2'
              },
              on: {
                click: () => {
                  this.receive(row)
                }
              }
            },
            '领取'
          )
        ])
      }
    },
    {
      title: '评估编号',
      editable: true,
      sortable: true,
      key: 'a1',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '品牌',
      editable: true,
      key: 'a2',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '系列',
      editable: true,
      key: 'a3',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '车型',
      editable: true,
      key: 'a4',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '颜色',
      editable: true,
      key: 'a5',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '车牌号码',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName1',
      align: 'center'
    },
    {
      title: '车架号',
      editable: true,
      key: 'operatorName2',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '发动机号',
      editable: true,
      key: 'operatorName3',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '客户姓名',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'operatorName4',
      align: 'center'
    },
    {
      title: '手机号',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'a10',
      align: 'center'
    }
  ]

  mounted() {
    this.getPoolList()
  }
  activated() {
    this.getPoolList()
  }
  /**
   *  搜索评估任务池
   */
  getPoolList(){
    this.assessMentApplyService.orderPoolSearch(this.taskpoolModel,this.pageService)
      .subscribe( data => {
        this.dataSet =data
      },({msg}) => {
        this.$Message.error(msg)
      })
  }
  /**
   *  批量领取
   */
  allReceive(){

  }
  /**
   *  领取
   */
  receive(row) {

  }
}
</script>

<style scoped>

</style>
