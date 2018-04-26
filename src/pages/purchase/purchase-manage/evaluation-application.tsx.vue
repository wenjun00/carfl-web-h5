<!--评估申请-->
<template> 
    <section class="page evaluation-application">
        <page-header title="评估申请" hidden-print>
            <i-button type="text">新建申请</i-button>
        </page-header>
        <data-form :model="applicationModel" @on-search="getApplicationList">
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
                    <i-checkbox v-model="whetherInclude">包含已提交</i-checkbox>
                </i-form-item>
            </template>
        </data-form> 
        <data-box :columns="applicationColumns" :data="dataSet" :page="pageService"></data-box>

        <template>
            <i-modal  width="680" v-model="applicationModal" title="查看详情" class="apply-for-application">
                <apply-for-application ref="apply-for-application"></apply-for-application>
                <div slot="footer">
                    <i-button size="large" type="ghost"  @click="applicationModal=false">关闭</i-button>
                </div>
            </i-modal>
        </template>
    </section>
</template>


     


<script lang="tsx">
import Page from '~/core/page'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import { Button } from 'iview'
import { FilterService } from '~/utils/filter.service'
import { AssessMentApplyService } from '~/services/manage-service/assess-ment-apply.service'
import ApplyForApplication from '~/components/purchase-manage/apply-for-application.vue'
import { Modal } from 'iview'

@Layout('workspace')
@Component({
  components: {
    ApplyForApplication
  }
})
export default class EvaluationApplication extends Page {
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(AssessMentApplyService)
  private assessMentApplyService: AssessMentApplyService
  private applicationModal: Boolean = false
  private whetherInclude: Boolean = false;
  private dataSet: Array<any> = []
  private applicationModel: any = {
    carParams: '', //品牌系列
    carNo: '', // 车牌号码
    ownerName: '', // 客户姓名
    isSubmit: '0' // 包含提交
  }
  private assessmentNo:String = ''           // 车辆详情号
  private applicationColumns: any = [
    {
      title: '操作',
      align: 'center',
      fixed: 'left',
      minWidth: this.$common.getColumnWidth(4),
      render: (h, { row }) => {
        // 1187 (待提交), 1189(待領取), 1190(待评估), 1191(已评估)
        return (
          <div>
            <i-button  type="text"
             v-show={row.assessmentStatus === 1187}
             >
              编辑
            </i-button>
            <i-button  type="text"
             v-show={row.assessmentStatus === 1189} 
             onClick={() =>{
                      this.$Modal.confirm({
                        title: '提示',
                        content: '您确定是否删除？',
                        onOk: () => {
                          this.deleteRow(row);
                        },
                      });
                    }}
            >
              删除
            </i-button>
            <i-button
              v-show={[1189, 1190, 1191].includes(row.assessmentStatus)}
              type="text"
              onClick={() => this.getDetailsList(row)}
            >
              详情
            </i-button>
            <i-button  type="text"
            v-show={row.assessmentStatus === 1189}
             onClick={() => this.getWithdrawRow(row)}
            >
              撤回
            </i-button>
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
      align: 'center',
      render: (h, { row }) => {
        return h('span', {}, this.$dict.getDictName(row.assessmentStatus))
      }
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
      align: 'center',
      render: (h, { row }) => {
        return h('span', FilterService.dateFormat(row.applyTime, 'yyyy-MM-dd'))
      }
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
   this.applicationModel.isSubmit = this.whetherInclude  ?'1' :'0'
    this.assessMentApplyService
      .orderSearch(this.applicationModel, this.pageService)
      .subscribe(
        data => {
          this.dataSet = data
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
  /**
   * 评估申请查看详情
   */
  getDetailsList({assessmentNo}) {
    this.applicationModal = true
    let applyForApplication = this.$refs['apply-for-application'] as ApplyForApplication
    applyForApplication.getApplicationDetail(assessmentNo)
  }

   /**
     * 评估申请删除
     */
    deleteRow(row) {
     
    }
  /**
   * 评估申请撤回
   */
   getWithdrawRow(row){
      this.$Modal.confirm({
      title: '提示',
      content: '是否确定撤回评估申请？撤回后可重新编辑并提交。',
      onOk: () => {
       this.assessMentApplyService.withdrawStatus(
           {
            orderId:row.orderId,
            status: row.assessmentStatus
            }
        )
        .subscribe(
        data => {
         this.$Message.success("撤回申请成功");
         this.getApplicationList()
        },
        ({ msg }) => {
        this.$Message.error(msg)
        }
        )


       
            
      }
    })
   }
     
  mounted() {
    this.getApplicationList()
  }
}
</script>

<style lang="less" scoped>
.page.evaluation-application {
}
</style>
<style lang="less" scoped>
.apply-for-application {
 .ivu-modal-footer{
    text-align: center;
 }
}
</style>
