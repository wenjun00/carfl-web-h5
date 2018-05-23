<!--押品评估-->
<template>
  <section class="page evaluation-of-collateral">
    <page-header title="押品评估" hiddenPrint hidden-export></page-header>
    <data-form :model="collateralModel" date-prop="timeSearch" @on-search="getCollateralList">
      <template slot="input">
        <i-form-item prop="carParams" label="品牌型号">
          <i-input placeholder="请输入品牌、系列" v-model="collateralModel.carParams"></i-input>
        </i-form-item>
        <i-form-item prop="carNo" label="车牌号码">
          <i-input placeholder="请输入车牌号" v-model="collateralModel.carNo"></i-input>
        </i-form-item>
        <i-form-item prop="ownerName" label="客户姓名">
          <i-input placeholder="请输入客户姓名" v-model="collateralModel.ownerName"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :columns="collateralColumns" :data="dataSet" :page="pageService" @onPageChange="getCollateralList"></data-box>
  </section>
</template>

<script lang="tsx">
import Page from '~/core/page';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { Layout } from '~/core/decorator';
import { PageService } from '~/utils/page.service';
import SvgIcon from '~/components/common/svg-icon.vue';
import AddCollateral from '~/components/purchase-manage/add-collateral.vue';
import { AssessMentApplyService } from "~/services/manage-service/assess-ment-apply.service";
import { FilterService } from '~/utils/filter.service';
import AddCollateralDetails from '~/components/purchase-manage/add-collateral-details.vue';
import DialogBox from "~/components/common/dialog-box.vue";
import { Button } from "iview";

@Layout('workspace')
@Component({
  components: {
    SvgIcon,
    AddCollateral,
    AddCollateralDetails,
    DialogBox
  }
})
export default class EvaluationOfCollateral extends Page {
  @Dependencies(PageService) private pageService: PageService
  @Dependencies(AssessMentApplyService) private assessMentApplyService: AssessMentApplyService
  private dataSet: Array<any> = []
  private status: Boolean = false
  private assignModal: Boolean = false
  private detailsModal: Boolean = false
  private orderId: any = '' //当前案件的订单ID
  private assessmentStatus: any = ''//当前案件的状态
  private collateralModel: any = {
    carParams: '', //品牌系列
    carNo: '', // 车牌号码
    ownerName: '' // 客户姓名
  }
  private collateralColumns: any = [
    {
      title: '操作',
      align: 'center',
      fixed: 'left',
      minWidth: this.$common.getColumnWidth(3),
      render: (h, { row }) => {
        if (row.assessmentStatus === 1190) {
          return (
            <div>
              <i-button type="text" style="color:#265EA2" onClick={() => { this.collateralClick(row) }}>评估</i-button>
            </div>)
        } else if (row.assessmentStatus === 1191) {
          return (
            <div>
              <i-button type="text" style="color:#265EA2" onClick={() => { this.collateralClickDetails(row) }}>详情</i-button>
            </div>)
        }
      }
    },
    {
      title: '评估编号',
      editable: true,
      sortable: true,
      key: 'assessmentNo',
      align: 'center',
      minWidth: this.$common.getColumnWidth(5)
    },
    {
      title: '状态',
      editable: true,
      key: 'assessmentStatus',
      align: 'center',
      minWidth: this.$common.getColumnWidth(3),
      render: (h, { row }) => {
        return h("span", {}, this.$dict.getDictName(row.assessmentStatus));
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
      key: 'seriesName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '车型',
      editable: true,
      key: 'carName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '颜色',
      editable: true,
      key: 'carColor',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '车牌号码',
      editable: true,
      key: 'carNo',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '车架号',
      editable: true,
      key: 'frameNo',
      minWidth: this.$common.getColumnWidth(6),
      align: 'center'
    },
    {
      title: '发动机号',
      editable: true,
      key: 'engineNo',
      minWidth: this.$common.getColumnWidth(6),
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
      title: '手机号',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'ownPhone',
      align: 'center'
    },
    {
      title: '车况级别',
      editable: true,
      minWidth: this.$common.getColumnWidth(5),
      key: 'carSituation',
      align: 'center',
      render: (h, { row }) => {
        return h("span", {}, this.$dict.getDictName(row.carSituation));
      }
    },
    {
      title: '估价（元）',
      editable: true,
      key: 'evaluation',
      minWidth: this.$common.getColumnWidth(4),
      align: 'center',
      render: (h, { row }) => h('div', {
        style: {
          textAlign: 'right',
          panddingRight: '10px'
        }
      }, this.$filter.toThousands(row.evaluation))
    },
    {
      title: '评估日期',
      editable: true,
      sortable: true,
      key: 'assessmentTime',
      minWidth: this.$common.getColumnWidth(4),
      align: 'center',
      render: (h, { row }) => {
        return h('span', FilterService.dateFormat(row.assessmentTime, 'yyyy-MM-dd'))
      }
    },
    {
      title: '估价员',
      editable: true,
      minWidth: this.$common.getColumnWidth(3),
      key: 'assessmentPerson',
      align: 'center',
    }
  ]
  activated() {
    this.getCollateralList()
  }
  mounted() {
    this.getCollateralList()
  }
  getCollateralList() {
    this.assessMentApplyService.orderBasicSearch(this.collateralModel, this.pageService)
      .subscribe(data => {
        this.dataSet = data
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
  }
  /**
   *  评估弹窗
   */
  collateralClick(row) {
    let addCollateral: any
    let dialog = this.$dialog.show({
      title: '新增评估',
      width: 800,
      footer: (h) => {
        return (
          <div>
            <i-button onClick={() => {
              addCollateral.componentInstance.cancelAssessment()
                .then(() => {
                  this.getCollateralList()
                  dialog.remove()
                }).catch(() => { })
            }}> 终止评估 </i-button>
            <i-button onClick={() => {
              addCollateral.componentInstance.backSerice()
                .then(() => {
                  this.getCollateralList()
                  dialog.remove()
                }).catch(() => { })
            }}> 退件 </i-button>
            <i-button onClick={() => {
              dialog.remove()
            }}> 取消 </i-button>
            <i-button type="primary" onClick={() => {
              addCollateral.componentInstance.trueAssessment()
                .then(() => {
                  this.getCollateralList()
                  dialog.remove()
                }).catch(() => { })
            }}> 确定 </i-button>
          </div>
        );
      },
      render: h => {
        addCollateral = h(AddCollateral, {
          props: {
            assessmentNo: row.assessmentNo
          }
        })
        return addCollateral
      }
    })
  }


  /**
   *  查看详情
   */
  collateralClickDetails(row) {
    this.$dialog.show({
      title: '查看评估',
      footer: true,
      isView: true,
      width:800,
      render: h => h(AddCollateralDetails, { props: { assessmentNo: row.assessmentNo } })
    })
  }
}
</script>

<style scoped>
</style>
