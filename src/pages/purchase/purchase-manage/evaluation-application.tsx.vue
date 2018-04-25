<!--评估申请-->
<template>
    <section class="page evaluation-application">
        <page-header title="评估申请" hidden-print>
            <i-button type="text">新建申请</i-button>
        </page-header>
        <data-form :model="applicationModel">
            <template slot="input">
                <i-form-item prop="carParams" label="品牌型号">
                    <i-input placeholder="请输入品牌、系列" v-model="applicationModel.carParams"></i-input>
                </i-form-item>
                <i-form-item prop="carNo" label="车牌号码">
                    <i-input placeholder="请输入车牌号码" v-model="applicationModel.carNo"></i-input>
                </i-form-item>
                <i-form-item prop="ownerName" label="客户姓名">
                    <i-input placeholder="请输入客户姓名" v-model="applicationModel.ownerName"></i-input>
                </i-form-item>
                <i-form-item prop="isSubmit">
                    <i-checkbox v-model="applicationModel.isSubmit">包含已提交</i-checkbox>
                </i-form-item>
            </template>
        </data-form>
        <data-box :columns="applicationColumns" :data="dataSet" :page="pageService"></data-box>
    </section>
</template>

<script lang="tsx">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import {Button} from 'iview'
import { AssessMentApplyService} from "~/services/manage-service/assess-ment-apply.service";

@Layout('workspace')
@Component({
  components: {}
})
export default class EvaluationApplication extends Page {
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(AssessMentApplyService) private assessMentApplyService: AssessMentApplyService
  private dataSet: Array<any> = []
  private applicationModel: any = {
    carParams: '', //品牌系列
    carNo: '', // 车牌号码
    ownerName: '', // 客户姓名
    isSubmit: false // 包含提交
  }

  private applicationColumns:any =  [{
        title: '操作',
        align: 'center',
        fixed: 'left',
        minWidth: this.$common.getColumnWidth(10),
        render: (h, { row }) => {
            return (
                <div>
                    <i-button type="text">编辑</i-button>
                    <i-button type="text">删除</i-button>
                    <i-button type="text">详情</i-button>
                    <i-button type="text">撤回</i-button>
                </div>
            )
        }
      },
      {
        title: '评估编号',
        editable: true,
        key: 'assessmentNo',
        minWidth: this.$common.getColumnWidth(3),
        align: 'center'
      },
      {
        title: '状态',
        editable: true,
        key: 'assessmentStatus',
        minWidth: this.$common.getColumnWidth(3),
        align: 'center'
      },
      {
        title: '品牌',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'brandName',
        align: 'center'
      },
      {
        title: '系列',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'seriesName',
        align: 'center'
      },
      {
        title: '车型',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'carName',
        align: 'center'
      },
      {
        title: '颜色',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'carColor',
        align: 'center'
      },
      {
        title: '车牌号码',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'carNo',
        align: 'center'
      },
      {
        title: '车架号',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'frameNo',
        align: 'center'
      },
      {
        title: '发动机号',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'engineNo',
        align: 'center'
      },
      {
        title: '客户姓名',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'ownerName',
        align: 'center'
      },
      {
        title: '手机号码',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'ownPhone',
        align: 'center'
      },
      {
        title: '申请人',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        align: 'center'
      },
      {
        title: '申请时间',
        editable: true,
        sortable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'applyTime',
        align: 'center'
      },
      {
        title: '评估人',
        editable: true,
        minWidth: this.$common.getColumnWidth(3),
        key: 'assessmentPerson',
        align: 'center'
      }
    ]

  /**
   *评估申请订单查询
   */
   getApplicationList() {
    this.assessMentApplyService
      .orderSearch(this.applicationModel, this.pageService)
      .subscribe(
        data => {
          this.dataSet = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }

  mounted() {
     this.dataSet=[]
  }
}
</script>

<style lang="less" scoped>
.page.evaluation-application{

}
</style>
