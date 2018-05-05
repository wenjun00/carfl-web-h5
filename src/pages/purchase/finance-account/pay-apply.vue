<!--付款申请-->
<template>
  <section class="page pay-apply">
    <page-header title="放款申请">
      <command-button label="清空" @click="clearAll"></command-button>
    </page-header>

    <div class="search-container">
      <i-form ref="customer-form" :model="applyModel" :rules="applyRule" :label-width="90">
        <i-row :gutter="20">
          <i-col span="12">
            <i-form-item label="证件号码" prop="idCard">
              <i-input type="text" v-model="applyModel.idCard" placeholder="请输入证件号码" @on-change="getUserInfo" :maxlength="18">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="客户姓名" prop="name">
              <i-input type="text" v-model="applyModel.name" @on-blur="searchInfo" placeholder="请输入客户姓名">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="20">
          <i-col span="12">
            <i-form-item label="客户电话" prop="mobileNumber">
              <i-input type="text" v-model="applyModel.mobileNumber" placeholder="请输入客户电话">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="选择订单" prop="orderNumber">
              <i-select v-model="applyModel.orderNumber" placeholder="请选择订单" @on-change="changeOrder($event)">
                <i-option v-for="item in orderList" :value="item.orderId" :label="item.orderNumber" :key="item.orderId"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <!--<i-row :gutter="20">-->
        <!--<i-col span="12">-->
        <!--<i-form-item label="付款类型" prop="refundType">-->
        <!--<i-select v-model="applyModel.refundType" placeholder="请选择付款类型">-->
        <!--<i-option v-for="{value,label} in $dict.getDictData('0430')" :key="value" :label="label" :value="value"></i-option>-->
        <!--</i-select>-->
        <!--</i-form-item>-->
        <!--</i-col>-->
        <!--<i-col span="12">-->
        <!--<i-form-item label="备注" prop="remark">-->
        <!--<i-input type="text" style="width:77%;" v-model="applyModel.remark" placeholder="请输入备注">-->
        <!--</i-input>-->
        <!--</i-form-item>-->
        <!--</i-col>-->
        <!--</i-row>-->
      </i-form>
    </div>

    <i-tabs v-show="applyModel.orderNumber" v-model="materialTabs" class="info-container">
      <i-tab-pane name="pay-detail" label="付款明细">
        <pay-detail  ref="payDetail" :totalMoneyTwo="totalMoneyTwo"></pay-detail>
      </i-tab-pane>
      <i-tab-pane name="upload-the-fodder" label="上传素材">
        <div style="font-size: 16px;font-weight: bolder;margin-left:10px">文件数量</div>
        <upload-voucher @financeUploadResources="fileNumber" ref="upload-voucher"></upload-voucher>
      </i-tab-pane>
    </i-tabs>

    <div v-show="!applyModel.orderNumber" class="emptyText">
      请先填写证件信息
    </div>
    <div class="fixed-container" v-show="applyModel.orderNumber">
      <i-button size="large" class="highButton" @click="saveSubmit">保存并提交</i-button>
    </div>

    <!--编辑收款项-->
    <!--<template>-->
    <!--<i-modal v-model="modifyGatherItemModal" title="编辑收款项" :width="300">-->
    <!--<modify-gather-item></modify-gather-item>-->
    <!--</i-modal>-->
    <!--</template>-->

    <!--变更收款项-->
    <!--<template>-->
    <!--<i-modal v-model="changeGatherItemModal" title="变更收款项">-->
    <!--<change-gather-item></change-gather-item>-->
    <!--</i-modal>-->
    <!--</template>-->
  </section>
</template>
<script lang="ts">
  import Page from '~/core/page'
  import Component from 'vue-class-component'
  import { RefundApplicationService } from '~/services/manage-service/refund-application.service'
  import { Dependencies } from '~/core/decorator'
  import { ApplyQueryService } from '~/services/business-service/apply-query.service'
  import DataBox from '~/components/common/data-box.vue'
  import { PageService } from '~/utils/page.service'
  import SvgIcon from '~/components/common/svg-icon.vue'
  import { Layout } from '~/core/decorator'
  import UploadTheMaterial from '~/components/purchase-manage/upload-the-material.tsx.vue'
  import ModifyGatherItem from '~/components/purchase-manage/modify-gather-item.vue'
  import ChangeGatherItem from '~/components/purchase-manage/change-gather-item.vue'
  import PayDetail from '~/components/purchase-manage/pay-detail.vue'
  import UploadVoucher from "~/components/common/upload-voucher.vue"

  @Layout('workspace')
  @Component({
    components: {
      DataBox,
      SvgIcon,
      UploadVoucher,
      ModifyGatherItem,
      ChangeGatherItem,
      PayDetail
    }
  })
  export default class PayApply extends Page {
    @Dependencies(RefundApplicationService) private refundApplicationService: RefundApplicationService;
    @Dependencies(PageService) private pageService: PageService;
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;

    private customerForm: any = {}
    private transFlag: boolean = false;
    private payDetail: any = {}
    private UploadVoucher: any = {}
    private currentIdCard: string = ""

    private applyModel: any = {}
    private paramsData: any = {}
    private applyRule: Object = {}
    private modifyGatherItemModal: Boolean = false
    private changeGatherItemModal: Boolean = false
    private materialTabs: String = 'pay-detail'
    private disabledStatus: String = '' // 子组件中输入框禁用flag
    private orderList: Array<any> = []
    private dataSet: Array<any> = []
    private checkOrderId: Number = 0
    private saveData: any = {}
    private fodderList:any = [] //上传文件列
    private totalMoney :any = ''
    private totalMoneyTwo:any = ''

    created() {

      this.applyModel = {
        orderNumber: '', // 订单号
        name: '', // 客户姓名
        idCard: '', // 证件号
        mobileNumber: '', // 客户电话
        refundType: '', // 退款类型
        remark: '' // 备注
      }

      this.applyRule = {
        idCard: { required: true, validator: this.$validator.idCard, trigger: 'blur' },
        name: { required: true, message: '请输入客户姓名', trigger: 'blur' },
        mobileNumber: { required: true, message: '请输入客户电话', validator: this.$validator.phoneNumber, trigger: 'blur' },
        refundType: { required: true, message: '请选择付款类型', trigger: 'change', type: 'number' }
      }

      this.paramsData = {
        itemList: [],
        remark: '',
        recordStatus: '',
        refundTotalAmount: ''
      }

      this.saveData = {
        orderId: '', // 订单id
        refundTotalAmount : '',
        resourceList: [] // 上传资料
      }
    }

    mounted() {
      this.customerForm = this.$refs['customer-form']
      this.payDetail = this.$refs['payDetail']
      this.UploadVoucher = this.$refs['upload-voucher']
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
     * 页面重置
     */
    resetPage(newIdCard?: string) {
      this.transFlag = false
      this.orderList = []
      this.customerForm.resetFields()
      this.payDetail.resetTable()
      this.UploadVoucher.reset()
      this.applyModel.idCard = newIdCard
    }

    /**
     * 证件号、订单号、客户姓名查询订单/账户/付款信息
     */
    getAllMessage() {
      this.refundApplicationService
        .getAllMessageByParams(this.applyModel)
        .subscribe(
          data => {
            this.totalMoney = data
            if (data) {
              this.orderList = data[0].orderNumberIdModels
              if (data[0] && data[0].orderNumberIdModels) {
                this.applyModel.name = data[0].name
                this.applyModel.mobileNumber = data[0].mobileMain
              }
              this.dataSet = data
            }
          },
          ({ msg }) => {
            this.$Message.error(msg)
          }
        )
    }

    submitData(item) {
      this.refundApplicationService
        .saveSubmitApplication(this.paramsData)
        .subscribe(val => {
          console.log(val)
        })
    }

    /**
     * 保存并提交
     */
    saveSubmit() {
      this.customerForm.validate(valid => {
        if (!valid) {
          return false
        } else {

          // let _message: any = this.$refs['payDetail']
          // this.saveData.bankListk = _message.accountInfoList
          // let gatherItem: any = Object.assign(_message.gatherItemList)
          // this.saveData.refundTotalAmount =
          //   gatherItem.length > 0
          //     ? gatherItem.find(v => v.itemName === 'totalPayment').refundAmount
          //     : ''
          // this.saveData.recordStatus = 1129
          // this.saveData.refundType = this.applyModel.refundType
          // this.saveData.remark = this.applyModel.remark
          // this.saveData.itemList = gatherItem.splice(
          //   0,
          //   _message.gatherItemList.length - 1
          // )
          this.saveData.itemList = this.totalMoneyTwo.applicationCollectMoneyItems.map(v=>{
            return {
              refundItem:v.itemName,
              refundAmount:v.itemMoney
            }
          })
          this.saveData.orderId = this.applyModel.orderNumber
          this.saveData.resourceList = this.fodderList
          this.saveData.refundTotalAmount = Number(this.totalMoneyTwo.totalPayment)
          this.refundApplicationService
            .paymentApply(this.saveData)
            .subscribe(
              data => {
                this.$Message.success('保存并提交成功！')
                this.resetPage()
              },
              err => this.$Message.error(err.msg))
        }
      })
    }
    /**
     * 输入姓名搜索
     */
    searchInfo() {
      this.getAllMessage()
    }
    /**
     * 订单号change
     */
    changeOrder(item) {
      if (item) {
        this.refundApplicationService.getQueryLoanTermById({personalId :this.totalMoney[0].personalId,orderId :item})
          .subscribe( data => {
            this.totalMoneyTwo = data
          },({msg}) => {
            this.$Message.error(msg)
          })
        // this.saveData.orderId = this.dataSet.find(
        //   v => v.orderNumber === item
        // ).orderId
        // this.checkOrderId = this.dataSet.find(v => v.orderNumber === item).orderId
        // let _message: any = this.$refs['payDetail']
        // _message.refresh(this.dataSet.find(v => v.orderNumber === item))
      }
    }
    multipleSelect(selection) { }
    modifyGatherItem() {
      this.modifyGatherItemModal = true
    }
    /**
     *  返回上传文件列
     */
    fileNumber(item) {
      this.fodderList = item;
    }
    /**
     * 变更收款项
     */
    changeGatherItem() {
      this.changeGatherItemModal = true
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
      this.getAllMessage()
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
</style>
