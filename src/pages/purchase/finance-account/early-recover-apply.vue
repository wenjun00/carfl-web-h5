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
        <gather-detail-early-pay :typeData="true" ref="gather-detail-early-pay"></gather-detail-early-pay>
      </i-tab-pane>
      <i-tab-pane name="upload-the-fodder" label="上传素材">
        <upload-the-fodder ref="upload-the-fodder"></upload-the-fodder>
      </i-tab-pane>
    </i-tabs>

    <div v-show="!applyModel.orderId" class="emptyText">
      请先填写证件信息
    </div>
    <div v-show="applyModel.orderId && !hasApprove" class="fixed-container">
      <i-button size="large" class="highButton" @click="saveAndCommit">保存并提交</i-button>
    </div>
  </section>
</template>
<script lang="ts">
import Page from '~/core/page';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { WithdrawApplicationService } from '~/services/manage-service/withdraw-application.service';
import { Layout } from '~/core/decorator';
import UploadTheFodder from '~/components/purchase-manage/upload-the-fodder.vue';
import GatherDetailEarlyPay from '~/components/purchase-manage/gather-detail-early-pay.vue';

@Layout('workspace')
@Component({
  components: {
    UploadTheFodder,
    GatherDetailEarlyPay
  }
})
export default class EarlyRecoverApply extends Page {
  @Dependencies(WithdrawApplicationService) private withdrawApplicationService: WithdrawApplicationService;
  private customerForm: any = {};
  private currentIdCard: string = "";

  private gatherDetailEarlyPay: any = {};
  private uploadTheFodder: any = {}

  private transFlag: boolean = false;

  private applyModel: any = {}
  private applyRule: Object = {}
  private personalId: Number = 0
  private materialTabs: String = 'gather-detail-early-pay'
  private disabledStatus: String = '' // 子组件中输入框禁用flag
  private orderNumberIdModels: Array<Object> = []
  private saveDraftModel: any = {}
  private hasApprove = true; // 改订单不可被提交

  created() {
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
  * 清空
  */
  private clearAll() {
    this.$Modal.confirm({
      title: '提示',
      content:
        '您有未保存的提前结清申请,清空会删除页面内容，是否确认清空申请内容！',
      onOk: () => {
        this.resetPage()
        // 显示遮罩
        this.disabledStatus = 'block'
      }
    })
  }

  /**
   * 清空
   */
  private resetPage(newIdCard?: string) {
    this.transFlag = false
    this.orderNumberIdModels = []
    this.customerForm.resetFields()
    this.applyModel.idCard = newIdCard
    this.gatherDetailEarlyPay.resetTable()
    this.uploadTheFodder.fodder.reset()
  }


  private async getUserInfo() {
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

  private async checkIdCardValid() {
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
  private getOrderInfo() {
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
        }, err => this.$Message.error(err.msg)
      )
  }

  /**
   * 订单改变的时候
  */
  private selectOrder(val) {
    if (val) {
      this.saveDraftModel.orderId = val // 保存草稿所需orderId

      //先让收费项目获取基础数据，
      this.gatherDetailEarlyPay.changeGatherItem(val).then(() => {
        //然后设置还原数据
        this.withdrawApplicationService
          .getAdvanceRevokeApplicationInfo(this.personalId, val)
          .subscribe(
            data => {
              this.applyModel.remark = data.remark
              this.applyModel.withdrawType = data.withdrawType
              // 获取收款项和备注信息
              this.gatherDetailEarlyPay.makeListdataSet(data)
              if (data.personalBank && data.personalBank.personalName) {
                this.saveDraftModel.accountName = data.personalBank.personalName // 获取保存草稿时需要的accountName
              }
              this.hasApprove = false
            }, err => {
              this.$Message.error(err.msg)

            })
      }).catch(() => { })
    }
  }

  private getgather() {
    let _uploadthefodder: any = this.$refs['upload-the-fodder']
    this.saveDraftModel.financeUploadResources = _uploadthefodder.fodderList.map(
      v => {
        return {
          materialUrl: v.url
        }
      }
    )
    this.saveDraftModel.remark = this.applyModel.remark

    // 获取各项费用
    for (let key in this.saveDraftModel) {
      let row = this.gatherDetailEarlyPay.saleItemList.find(v => v.itemName === key && v._checked)
      if (row) {
        this.saveDraftModel[key] = row.itemMoney
      }
    }
    this.saveDraftModel.totalPayment = this.gatherDetailEarlyPay.totalMoney
  }

  /**
   * 保存并提交
   */
  private saveAndCommit() {
    let customerform: any = this.$refs['customer-form']
    customerform.validate(valid => {
      if (!valid) {
        return false
      } else {
        if (this.gatherDetailEarlyPay.totalMoney === 0) {
          this.$Message.warning('未添加收款项，请添加收款项！')
          return false
        }
        this.getgather()
        this.saveDraftModel.withdrawType = this.applyModel.withdrawType
        let saveAndCommitModel = this.saveDraftModel
        this.withdrawApplicationService
          .saveAdvanceRevokeApplication(saveAndCommitModel)
          .subscribe(
            data => {
              this.$Message.success('保存并提交成功！')
              this.resetPage()
            }, err => this.$Message.error(err.msg))
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
