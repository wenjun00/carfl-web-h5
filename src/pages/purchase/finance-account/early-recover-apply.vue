<!--提前收回申请-->
<template>
  <section class="page early-recover-apply special-input">
    <page-header title="提前收回申请">
      <command-button label="添加新申请" @click="clearAll"></command-button>
    </page-header>

    <div class="search-container">
      <i-form ref="customer-form" :model="applyModel" :rules="applyRule" :label-width="90">
        <i-row :gutter="20">
          <i-col :span="12">
            <i-form-item label="证件号码" prop="idCard">
              <i-input type="text" v-model="applyModel.idCard" placeholder="请输入证件号码" @on-change="getUserInfo" :maxlength="18">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="客户姓名" prop="customerName">
              <i-input type="text" v-model="applyModel.customerName" placeholder="请输入客户姓名">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="20">
          <i-col :span="12">
            <i-form-item label="客户电话" prop="mobileMain">
              <i-input type="text" v-model="applyModel.mobileMain" placeholder="请输入客户电话">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="选择订单" prop="orderId">
              <i-select v-model="applyModel.orderId" placeholder="请选择订单" @on-change="selectOrder">
                <i-option v-for="item in orderNumberIdModels" :key="item.orderId" :value="item.orderId" :label="item.orderNumber"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="20">
          <i-col :span="12">
            <i-form-item label="收回类型" prop="withdrawType">
              <i-select v-model="applyModel.withdrawType" placeholder="请选择收回类型">
                <i-option v-for="{value,label} in $dict.getDictData('0117')" :key="value" :label="label" :value="value"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12" :pull="1">
          </i-col>
        </i-row>
        <i-row :gutter="20">
          <i-col :span="24">
            <i-form-item label="备注" prop="remark">
              <i-input class="remark" v-model="applyModel.remark" placeholder="请输入备注"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </div>

    <i-tabs v-show="applyModel.orderId" v-model="materialTabs" class="info-container">
      <i-tab-pane name="gather-detail-early-pay" label="收款明细">
        <gather-detail-early-pay :checkOrderId="checkOrderId" :typeData="typeData" ref="gather-detail-early-pay"></gather-detail-early-pay>
      </i-tab-pane>
      <i-tab-pane name="upload-the-fodder" label="上传素材">
        <upload-the-fodder ref="upload-the-fodder"></upload-the-fodder>
      </i-tab-pane>
    </i-tabs>

    <div v-show="!applyModel.orderId" class="emptyText">
      请先填写证件信息
    </div>
    <div v-show="applyModel.orderId" class="fixed-container">
      <i-button size="large" class="highButton" @click="saveAndCommit">保存并提交</i-button>
    </div>

    <!--编辑收款项-->
    <template>
      <i-modal v-model="modifyGatherItemModal" title="编辑收款项" :width="300">
        <modify-gather-item></modify-gather-item>
      </i-modal>
    </template>
    <!--变更收款项-->
    <template>
      <i-modal v-model="changeGatherItemModal" title="变更收款项">
        <change-gather-item></change-gather-item>
      </i-modal>
    </template>
  </section>
</template>
<script lang="ts">
import Page from '~/core/page';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { ApplyQueryService } from '~/services/business-service/apply-query.service';
import { WithdrawApplicationService } from '~/services/manage-service/withdraw-application.service';
import DataBox from '~/components/common/data-box.vue';
import { PageService } from '~/utils/page.service';
import SvgIcon from '~/components/common/svg-icon.vue';
import { Layout } from '~/core/decorator';
import UploadTheFodder from '~/components/purchase-manage/upload-the-fodder.vue';
import ChangeGatherItem from '~/components/purchase-manage/change-gather-item.vue';
import ModifyGatherItem from '~/components/purchase-manage/modify-gather-item.vue';
import GatherDetailEarlyPay from '~/components/purchase-manage/gather-detail-early-pay.vue';

@Layout('workspace')
@Component({
  components: {
    DataBox,
    SvgIcon,
    UploadTheFodder,
    ChangeGatherItem,
    ModifyGatherItem,
    GatherDetailEarlyPay
  }
})
export default class EarlyRecoverApply extends Page {
  @Dependencies() private pageService: PageService;
  @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
  @Dependencies(WithdrawApplicationService) private withdrawApplicationService: WithdrawApplicationService;
  private customerForm: any = {};
  private currentIdCard: string = "";

  private gatherDetailEarlyPay: any = {};
  private uploadTheFodder: any = {}

  private transFlag: boolean = false;

  private applyModel: any = {}
  private applyRule: Object = {}

  private checkOrderId: Number = 0
  private personalId: Number = 0
  private categoryData: Array<Object>
  private loading: Boolean = false
  private isShown: Boolean = true
  private changeGatherItemModal: Boolean = false
  private modifyGatherItemModal: Boolean = false
  private materialTabs: String = 'gather-detail-early-pay'
  private disabledStatus: String = '' // 子组件中输入框禁用flag
  private orderNumberIdModels: Array<Object> = []
  private orderIdModels: any = {}
  private single: Boolean = false
  private typeData: Boolean = true
  private msg: any = ''
  private saveDraftModel: any = {}

  created() {


    this.categoryData = [
      {
        title: '所有品牌',
        expand: true,
        children: [
          {
            title: '别克',
            expand: true,
            children: [
              {
                title: '君越'
              },
              {
                title: '昂克赛拉',
                expand: true,
                children: [
                  {
                    title: '君越'
                  },
                  {
                    title: '昂克赛拉'
                  }
                ]
              }
            ]
          },
          {
            title: '大众',
            expand: true,
            children: [
              {
                title: '英朗'
              },
              {
                title: '帕萨特',
                expand: true,
                children: [
                  {
                    title: '英朗'
                  },
                  {
                    title: '帕萨特'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]

    this.applyRule = {
      idCard: { required: true, validator: this.$validator.idCard, trigger: 'blur' },
      customerName: { required: true, message: '请输入客户姓名', trigger: 'blur' },
      mobileMain: { required: true, validator: this.$validator.phoneNumber, trigger: 'blur' },
      withdrawType: { required: true, message: '请选择收回类型', trigger: 'change', type: 'number' }
    }

    this.saveDraftModel = {
      addFinanceUploadResources: [], // 新增上传资料列表
      delFinanceUploadResources: [], // 删除上传资料Id列表
      financeUploadResources: [], // 上传素材相关信息
      accountName: '',
      advancePayoffFee: 0, // 提前结清手续费
      id: '', // 申请id
      orderId: '', // 订单id
      otherFee: 0,
      surplusManageFee: 0, // 剩余管理费
      surplusPenalty: 0, // 剩余罚息
      surplusPenaltyFreeze: 0, // 剩余冻结罚金
      surplusPrincipal: 0, // 剩余本金
      totalPayment: 0, // 收款总额
      remark: '', // 备注
      withdrawType: ''
    }

    this.applyModel = {
      idCard: '',
      customerName: '',
      mobileMain: '',
      orderId: '',
      withdrawType: '', // 收回类型
      remark: '', // 备注
      isAddToBlackList: []
    }
  }

  mounted() {
    this.customerForm = this.$refs['customer-form']
    this.gatherDetailEarlyPay = this.$refs['gather-detail-early-pay']
    this.uploadTheFodder = this.$refs['upload-the-fodder']
  }

  /**
   * 多选
   */
  multipleSelect(selection) { }
  /**
    是否显示汽车分类
     */
  showCategory() {
    this.isShown = !this.isShown
  }
  /**
   * 变更收款项
   */
  changeGatherItem() {
    this.changeGatherItemModal = true
  }
  modifyGatherItem() {
    this.modifyGatherItemModal = true
  }

    /**
   * 清空
   */
  clearAll() {
    this.$Modal.confirm({
      title: '提示',
      content:
        '您有未保存的提前结清申请,清空会删除页面内容，是否确认清空申请内容！',
      onOk: () => {
        this.resetPage()
        // 显示遮罩
        this.disabledStatus = 'block'
        // 清空orderId
        this.checkOrderId = 0
      }
    })
  }

  /**
   * 清空
   */
  resetPage(newIdCard?: string) {
    this.transFlag = false
    this.orderNumberIdModels = []
    this.customerForm.resetFields()
    this.applyModel.idCard = newIdCard
    this.gatherDetailEarlyPay.resetTable()
    this.uploadTheFodder.fodder.reset()
  }

  showTab1() {
    if (this.applyModel.idCard.length === 18) {
      this.disabledStatus = 'none'
      this.getOrderInfo()
    } else {
      this.applyModel.customerName = ''
      this.applyModel.mobileMain = ''
    }
  }

  async getUserInfo() {
    // 检测身份证
    if (!await this.checkIdCardValid()) {
      return;
    }

    if (this.currentIdCard && this.currentIdCard !== this.applyModel.idCard) {
      this.$Modal.confirm({
        title: "提醒",
        content: "证件号码更新,是否要重置申请信息?",
        onOk: this.resetPage(this.applyModel.idCard)
      });
    }

    this.currentIdCard = this.applyModel.idCard
    this.getOrderInfo()
  }

  async checkIdCardValid() {
    if (this.applyModel.idCard.length < 18) {
      return;
    }
    // 验证身份证信息
    return await new Promise((reslove, reject) => {
      this.customerForm.validateField('idCard', error => reslove(!error))
    })
  }
  /**
   * 获取订单信息
   */
  getOrderInfo() {
    this.withdrawApplicationService
      .getPersonalProductOrderInfoForAdvance({
        idCard: this.applyModel.idCard,
        customerName: this.applyModel.customerName,
        mobileMain: this.applyModel.mobileMain
      })
      .subscribe(
      data => {
        if (data[0] && data[0].orderNumberIdModels) {
          this.orderNumberIdModels = data[0].orderNumberIdModels
          this.applyModel.customerName = data[0].name
          this.applyModel.mobileMain = data[0].mobileMain
          this.personalId = data[0].personalId
        }
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
      )
  }
  selectOrder(val) {
    if (val) {
      this.checkOrderId = val // 将选择的订单号传给变更收款项按钮点击事件中
      this.saveDraftModel.orderId = val // 保存草稿所需orderId
      this.withdrawApplicationService
        .getAdvanceRevokeApplicationInfo({
          personalId: this.personalId,
          orderId: val
        })
        .subscribe(
        data => {
          this.applyModel.remark = data.remark
          this.applyModel.withdrawType = data.withdrawType
          // 获取收款项和备注信息
          let _gatherDetail: any = this.$refs['gather-detail-early-pay']
          _gatherDetail.makeListdataSet(data)
          if (data.personalBank && data.personalBank.personalName) {
            this.saveDraftModel.accountName = data.personalBank.personalName // 获取保存草稿时需要的accountName
          }
          if (data.withdrawId) {
            this.saveDraftModel.applicationId = data.withdrawId // 获取保存草稿时需要的id
          }
        },
        ({ msg }) => {
          this.msg = msg
          this.$Message.error(msg)
        }
        )
    }
  }
  getgather() {
    let _gatherDetail: any = this.$refs['gather-detail-early-pay']
    let itemList = _gatherDetail.getItem()
    let _uploadthefodder: any = this.$refs['upload-the-fodder']
    this.saveDraftModel.financeUploadResources = _uploadthefodder.fodderList.map(
      v => {
        return {
          materialUrl: v.url
        }
      }
    )
    this.saveDraftModel.otherFee = _gatherDetail.getOtherFee()
    this.saveDraftModel.remark = this.applyModel.remark
    let surplusManageFee = itemList.find(v => v.itemName === 'surplusManageFee')
    if (surplusManageFee) {
      this.saveDraftModel.surplusManageFee = surplusManageFee.itemMoney
    }
    let surplusPenalty = itemList.find(v => v.itemName === 'surplusPenalty')
    if (surplusPenalty) {
      this.saveDraftModel.violateAmount = surplusPenalty.itemMoney
    }
    let surplusPenaltyFreeze = itemList.find(
      v => v.itemName === 'surplusPenaltyFreeze'
    )
    if (surplusPenaltyFreeze) {
      this.saveDraftModel.surplusPenaltyFreeze = surplusPenaltyFreeze.itemMoney
    }
    let surplusPrincipal = itemList.find(v => v.itemName === 'surplusPrincipal')
    if (surplusPrincipal) {
      this.saveDraftModel.surplusPrincipal = surplusPrincipal.itemMoney
    }
    let totalPayment = itemList.find(v => v.itemName === 'totalPayment')
    if (totalPayment) {
      this.saveDraftModel.totalPayment = totalPayment.itemMoney
    }
    let violateAmount = itemList.find(v => v.itemName === 'violateAmount')
    if (violateAmount) {
      this.saveDraftModel.violateAmount = violateAmount.itemMoney
    }
  }

  /**
   * 保存并提交
   */
  saveAndCommit() {
    let customerform: any = this.$refs['customer-form']
    customerform.validate(valid => {
      if (!valid) {
        return false
      } else {
        this.getgather()
        if (this.msg === '该订单有为完成的提前收回申请') {
          this.$Message.warning('请先审批未处理的申请订单！')
          return false
        }
        this.saveDraftModel.withdrawType = this.applyModel.withdrawType
        let saveAndCommitModel = this.saveDraftModel
        this.withdrawApplicationService
          .saveAdvanceRevokeApplication(saveAndCommitModel)
          .subscribe(
          data => {
            this.$Message.success('保存并提交成功！')
            this.resetPage()
          },
          ({ msg }) => {
            this.$Message.error(msg)
          }
          )
      }
    })
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding: 15px;
}
.info-container {
  margin-bottom: 100px;
}

.fixed-container {
  height: 65px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 10;
  text-align: right;
  padding: 10px 20px;
  box-shadow: 0px -5px 10px #ccc;
}

.emptyText {
  font-size: 32px;
  color: #ccc;
  font-weight: bold;
  background: #f2f2f2;
  height: 500px;
  text-align: center;
  line-height: 500px;
  letter-spacing: 1px;
  box-shadow: 0px 0px 5px #ccc;
}

.remark {
  width: 80% !important;
}
</style>
