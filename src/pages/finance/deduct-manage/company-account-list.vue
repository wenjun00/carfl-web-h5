<!--企业开户列表-->
<template>
  <section class="page company-account-list">
    <page-header title="企业开户列表" hiddenPrint hiddenExport>
      <command-button label="企业开户" @click="openCompany"></command-button>
    </page-header>
    <data-form date-prop="timeSearch" :model="openAccountModel" :page="pageService" @on-search="CompanyAccountSearch" hidden-reset>
      <template slot="input">
        <i-form-item prop="companyName" label="企业名称">
          <i-input v-model="openAccountModel.companyName"></i-input>
        </i-form-item>
        <i-form-item prop="companyLicensenNmber" label="营业执照注册号">
          <i-input v-model="openAccountModel.companyLicensenNmber"></i-input>
        </i-form-item>
        <i-form-item prop="accountNumber" label="用户客户号">
          <i-input v-model="openAccountModel.accountNumber"></i-input>
        </i-form-item>
        <!--<i-form-item prop="personalInfo" label="用户子账户名">
          <i-input v-model="openAccountModel.companyLicensenNmber"></i-input>
        </i-form-item>
        <i-form-item prop="personalInfo" label="审核状态">
          <i-input v-model="openAccountModel.companyLicensenNmber"></i-input>
        </i-form-item>-->
      </template>
    </data-form>
    <data-box :columns="columns1" :data="accountData" @onPageChange="CompanyAccountSearch" :page="pageService"></data-box>

    <!--弹出框-->
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置" @on-ok="confirm">
        <i-table :columns="columns2" :data="data2"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal title="企业取现" v-model="getCashModal" class="company_getCash">
        <i-form :label-width="145" label-position="left">
          <i-form-item label="用户客户号">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="取现卡号">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="账户余额">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="取现方式">
            <i-select v-model="cashModel.cashWay" @on-change="changeGetCashWay">
              <i-option label="(T+0)即时到账" value="(T+0)即时到账" key="(T+0)即时到账"></i-option>
              <i-option label="(T+1)普通取现，下一个工作日到账" value="(T+1)普通取现，下一个工作日到账" key="(T+1)普通取现，下一个工作日到账"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="取现金额">
            <i-input style="width:160px;" v-model="cashModel.cashNum"></i-input>
            <span>元</span>
          </i-form-item>
          <i-form-item label="交易密码">
            <i-input style="width:160px;display:inline-block" v-model="cashModel.pwd"></i-input>
            <i-button @click="setCode" class="blueButton">设置交易密码</i-button>
          </i-form-item>
          <i-form-item label="商户收取服务费金额">
            <i-input style="width:160px;"></i-input>
            <span>元</span>
          </i-form-item>
          <i-form-item label="商户收取服务费子账户号">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="手续服务费对象">
            <i-select>
              <i-option label="向商户收取" value="向商户收取"></i-option>
              <i-option label="向用户收取" value="向用户收取"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="手续费收取子账户">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="手续费金额">
            <i-input style="width:160px;" v-model="cashModel.serviceCharge"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="getCashModal=false">取消</i-button>
          <i-button class="blueButton" @click="confirmGetCash">确定</i-button>
        </div>
      </i-modal>
    </template>

    <!--设置交易密码-->
    <template>
      <i-modal v-model="setCodeModal" title="设置交易密码">
        <i-form :label-width="110">
          <i-form-item label="原交易密码：">
            <i-input></i-input>
          </i-form-item>
          <i-form-item label="新交易密码：">
            <i-input placeholder="请输入新的6位交易密码"></i-input>
          </i-form-item>
          <i-form-item label="确认新交易密码：">
            <i-input placeholder="请再次输入"></i-input>
          </i-form-item>
        </i-form>
      </i-modal>
    </template>

    <!--转账-->
    <template>
      <i-modal v-model="transferAccountModal" title="转账">
        <i-form :label-width="110">
          <i-form-item label="转账类型">
            <i-select style="width:85%">
              <i-option label="商户转企业用户" value="商户转企业用户" key="商户转企业用户"></i-option>
              <i-option label="企业用户转商户" value="企业用户转商户" key="企业用户转商户"></i-option>
              <i-option label="用户转用户" value="用户转用户" key="用户转用户"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="出账公司">
            <i-select style="width:85%">
              <i-option label="开呗（上海）汽车租赁有限公司成都分公司" value="开呗（上海）汽车租赁有限公司成都分公司" key="开呗（上海）汽车租赁有限公司成都分公司"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="出账客户号">
            <i-input style="width:160px;"></i-input>
            <span>元</span>
          </i-form-item>
          <i-form-item label="出账账户号">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="出账账户余额">
            <i-input style="width:160px;"></i-input>
            <span>元</span>
          </i-form-item>
          <i-form-item label="入账公司">
            <i-select style="width:85%">
              <i-option label="开呗（上海）汽车租赁有限公司成都分公司" value="开呗（上海）汽车租赁有限公司成都分公司" key="开呗（上海）汽车租赁有限公司成都分公司"></i-option>
              <i-option label="开呗（西安）汽车租赁有限公司成都分公司" value="开呗（西安）汽车租赁有限公司成都分公司" key="开呗（西安）汽车租赁有限公司成都分公司"></i-option>
              <i-option label="开呗（武汉）汽车租赁有限公司成都分公司" value="开呗（武汉）汽车租赁有限公司成都分公司" key="开呗（武汉）汽车租赁有限公司成都分公司"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="入账客户号">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="入账账户号">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="入账账户余额">
            <i-input style="width:160px;"></i-input>
            <span>元</span>
          </i-form-item>
          <i-form-item label="转账金额">
            <i-input style="width:160px;"></i-input>
            <span>元</span>
          </i-form-item>
        </i-form>
      </i-modal>
    </template>

    <!--企业银行卡详情-->
    <template>
      <i-modal v-model="companyBankCardInfoModal" title="银行卡详情" :transfer="false" :width="800" class="companyBankCardInfo">
        <company-bank-card @close="close"></company-bank-card>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import DataBox from '~/components/common/data-box.vue'
import BankCardInfo from '~/components/finance-manage/bank-card-info.vue'
import AddCompany from '~/components/finance-manage/add-company.vue'
import CompanyInformation from '~/components/finance-manage/company-information.vue'

import CompanyBankCard from '~/components/finance-manage/company-bank-card.vue'
import Component from 'vue-class-component'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { CompanyAccountService } from "~/services/manage-service/company-account.service";
import { PageService } from "~/utils/page.service";
import { BankcardDetailService } from "~/services/manage-service/bankcard-detail.service";

@Layout('workspace')
@Component({
  components: {
    DataBox,
    CompanyBankCard,
    AddCompany,
    CompanyInformation
  }
})
export default class CompanyAccountList extends Page {
  @Dependencies(BankcardDetailService) private bankcardDetailService: BankcardDetailService;
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(CompanyAccountService) private companyAccountService: CompanyAccountService;
  private columns1: any
  private data1: Array<Object> = []
  private searchOptions: Boolean = false
  private customName: String = ''
  private openColumnsConfig: Boolean = false
  private columns2: any
  private data2: Array<Object> = []
  private data3: Array<Object> = []
  private checkRadio: String = '融资租赁合同'
  private columns3: any
  private getCashModal: Boolean = false
  private setCodeModal: Boolean = false
  private transferAccountModal: Boolean = false
  private companyBankCardInfoModal: Boolean = false
  private cashModel: any;
  private accountData: any = [];
  private dsds: any = {};
  private bankInfo: any = [];
  private openAccountModel: any = {
    companyName: '', // 企业名称
    companyLicensenNmber: '', // 企业执照注册号
    accountNumber: '', // 用户客户号
    //   用户子账户名
    // 审核状态
    timeSearch: ''
  };
  /**
   * 转账
   */
  transferAccount() {
    this.transferAccountModal = true
  }
  mounted() {
    this.CompanyAccountSearch()
  }
  getbankInfo(row) {
    this.bankcardDetailService
      .getAllBankCards({
        id: row.id
      })
      .subscribe(
      val => {
        this.bankInfo = val
        this.companyBankCardInfoModal = true
      },
      ({
            msg
          }) => {
        this.$Message.error(msg);
      }
      );
  }
  /**
   * 搜索
   */
  CompanyAccountSearch() {
    this.companyAccountService
      .getAllAccountWithPage(this.pageService)
      .subscribe(
      val => {
        console.log(val, 'val')
        this.accountData = val;
      },
      ({
            msg
          }) => {
        this.$Message.error(msg);
      }
      );
  }
  close() {
    this.companyBankCardInfoModal = false
  }
  /**
   * 企业信息
   */
  companyInformation(row) {
    this.companyAccountService
      .finAccountDetail({
        id: row.id
      })
      .subscribe(
      val => {
        let dialog = this.$dialog.show({
          title: '企业信息',
          footer: false,
          onOk: companyInformation => {  },
          onCancel: () => { },
          render: h => {
            return h(CompanyInformation, {
              props: {
                val
              }
            });
          }
        })
      },
      ({
            msg
          }) => {
        this.$Message.error(msg);
      }
      );
  }
  /**
   * 修改企业开户
   */
  modifyAccount(row) {
    this.companyAccountService
      .finAccountDetail({
        id: row.id
      })
      .subscribe(
      val => {
        let modifyData: any = val
        let dialog = this.$dialog.show({
          title: '修改企业开户',
          footer: true,
          onOk: addCompany => {
            addCompany.modifyAccountClick()
          },
          onCancel: () => { },
          render: h => {
            return h(AddCompany, {
              props: {
                modifyData
              }
            });
          }
        })
      },
      ({
            msg
          }) => {
        this.$Message.error(msg);
      }
      );
  }
  /**
   * 新增企业
   */
  openCompany() {
    let dialog = this.$dialog.show({
      title: '新增企业开户',
      footer: true,
      onOk: addCompany => {
        addCompany.openaccountClick()
      },
      onCancel: () => { },
      render: h => {
        return h(AddCompany, {});
      }
    })
  }
  /**
   * 设置交易密码
   */
  setCode() {
    this.setCodeModal = true
  }
  created() {
    this.cashModel = {
      pwd: '',
      cashNum: '',
      cashWay: '',
      serviceCharge: ''
    }
    this.columns1 = [{
      title: '操作',
      minWidth: this.$common.getColumnWidth(5),
      fixed: 'left',
      align: 'center',
      render: (h, {
            row,
        column,
        index
          }) => {
        return h('div', [
          h(
            'i-button', {
              props: {
                type: 'text'
              },
              style: {
                color: '#265EA2'
              },
              on: {
                click: () => {
                  this.modifyAccount(row)
                }
              }
            },
            '修改开户'
          )
          //   h(
          //     'i-button', {
          //       props: {
          //         type: 'text'
          //       },
          //       style: {
          //         color: '#265EA2'
          //       },
          //       on: {
          //         click: () => {
          //           this.getCashModal = true
          //         }
          //       }
          //     },
          //     '取现'
          //   )
        ])
      }
    },
    {
      title: '查看',
      minWidth: this.$common.getColumnWidth(4),
      align: 'center',
      render: (h, {
            row,
        column,
        index
          }) => {
        return h('div', [
        //   h(
        //     'i-button', {
        //       props: {
        //         type: 'text'
        //       },
        //       style: {
        //         color: '#265EA2'
        //       },
        //       on: {
        //         click: () => {
        //           this.getbankInfo(row)
        //         }
        //       }
        //     },
        //     '银行卡详情'
        //   ),
          h(
            'i-button', {
              props: {
                type: 'text'
              },
              style: {
                color: '#265EA2'
              },
              on: {
                click: () => {
                  this.companyInformation(row)
                }
              }
            },
            '企业信息'
          )
        ])
      }
    },
    {
      title: '用户客户号',
      align: 'center',
      key: 'accountNumber',
      minWidth: this.$common.getColumnWidth(6)
    },
    {
      align: 'center',
      title: '用户子账户号',
      key: 'subAccountNumber',
      minWidth: this.$common.getColumnWidth(6)
    },
    {
      align: 'center',
      title: '企业证照类型',
      minWidth: this.$common.getColumnWidth(4),
      key: 'certificateType'
    },
    {
      align: 'center',
      title: '企业名称',
      minWidth: this.$common.getColumnWidth(10),
      key: 'companyName'
    },
    {
      align: 'center',
      title: '营业执照注册号',
      minWidth: this.$common.getColumnWidth(6),
      key: 'companyLicensenNmber'
    },
    {
      align: 'center',
      title: '审核状态',
      minWidth: this.$common.getColumnWidth(3),
      key: 'verifyStatus'
    }
    ]
    this.columns2 = [{
      title: '序号',
      type: 'index',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      title: '列名',
      key: 'columnsName',
      minWidth: this.$common.getColumnWidth(3),
      align: 'center'
    },
    {
      type: 'selection',
      width: 40,
      align: 'center'
    }
    ]
    this.columns3 = [{
      title: '文件名称',
      align: 'center',
      minWidth: this.$common.getColumnWidth(5),
      key: 'fileName'
    },
    {
      type: 'selection',
      align: 'center',
      minWidth: this.$common.getColumnWidth(3)
    }
    ]
    this.data2 = [{
      columnsName: '用户客户号'
    },
    {
      columnsName: '用户子账户号'
    },
    {
      columnsName: '企业证照类型'
    },
    {
      columnsName: '企业名称'
    },
    {
      columnsName: '营业执照注册号'
    },
    {
      columnsName: '审核状态'
    }
    ]

    this.data3 = [{
      fileName: '融资租赁申请单'
    },
    {
      fileName: '融资租赁合同正文'
    },
    {
      fileName: '合同附件一(付款时间表)'
    },
    {
      fileName: '合同附件二(配偶确认书)'
    },
    {
      fileName: '合同附件三(共同承租人确认书)'
    },
    {
      fileName: '委托收款合同'
    },
    {
      fileName: '首付款明细'
    },
    {
      fileName: '服务确认书'
    },
    {
      fileName: '责任告知书'
    },
    {
      fileName: '车辆交接单'
    },
    {
      fileName: '车辆出库单'
    },
    {
      fileName: '补充协议（减免）'
    }
    ]
  }
  getOrderInfoByTime() { }
  openSearch() {
    this.searchOptions = !this.searchOptions
  }
  oneKeyToConnect() { }
  columnsConfig() {
    this.openColumnsConfig = true
  }
  changeGetCashWay(val) {
    if (val === '(T+0)即时到账') {
      this.cashModel.serviceCharge = '2'
    }
  }
  /**
   * 多选
   */
  multipleSelect(selection) { }
  /**
   * 切换合同种类
   */
  changeCompactType(type) {
    if (type === '全款销售合同') {
      this.data3 = [{
        fileName: '融资租赁申请单'
      },
      {
        fileName: '融资租赁合同正文'
      },
      {
        fileName: '合同附件一(付款时间表)'
      },
      {
        fileName: '合同附件二(配偶确认书)'
      },
      {
        fileName: '合同附件三(共同承租人确认书)'
      }
      ]
    } else if (type === '长租合同（银行版）') {
      this.data3 = [{
        fileName: '融资租赁申请单'
      },
      {
        fileName: '融资租赁合同正文'
      },
      {
        fileName: '合同附件一(付款时间表)'
      },
      {
        fileName: '合同附件二(配偶确认书)'
      }
      ]
    } else if (type === '长租合同') {
      this.data3 = [{
        fileName: '长期租赁申请单'
      },
      {
        fileName: '长期租赁合同正文'
      },
      {
        fileName: '合同附件一(甲乙双方相关责任条款)'
      },
      {
        fileName: '合同附件二(车辆交接清单)'
      },
      {
        fileName: '委托收款合同'
      },
      {
        fileName: '车辆销售协议'
      },
      {
        fileName: '收款明细'
      },
      {
        fileName: '车辆出库单'
      },
      {
        fileName: '补充协议（减免）'
      }
      ]
    } else {
      this.data3 = [{
        fileName: '融资租赁申请单'
      },
      {
        fileName: '融资租赁合同正文'
      },
      {
        fileName: '合同附件一(付款时间表)'
      },
      {
        fileName: '合同附件二(配偶确认书)'
      },
      {
        fileName: '合同附件三(共同承租人确认书)'
      },
      {
        fileName: '委托收款合同'
      },
      {
        fileName: '首付款明细'
      },
      {
        fileName: '服务确认书'
      },
      {
        fileName: '责任告知书'
      },
      {
        fileName: '车辆交接单'
      },
      {
        fileName: '车辆出库单'
      },
      {
        fileName: '补充协议（减免）'
      }
      ]
    }
  }
  /**
   * 确定
   */
  confirm() { }
  /**
   * 确认取现
   */
  confirmGetCash() {
    if (this.cashModel.cashNum <= 0) {
      this.$Modal.info({
        title: '提示',
        content: '请录入取现金额'
      })
    } else {
      this.getCashModal = false
    }
  }
}

</script>

<style lang="less">
.page.company-account-list {
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
  .data-form {
    margin-top: 10px;
    .commend {
      font-size: 18px;
      font-weight: bold;
    }
    .commend.item {
      color: #265ea2;
    }
  }
  .second-data-form {
    margin: 6px;
    .second-data-one {
      display: inline-block;
      width: 15%;
    }
    .second-data-two {
      margin-left: 10px;
    }
    .second-data-three {
      display: inline-block;
      width: 10%;
    }
    .second-data-four {
      display: inline-block;
      width: 10%;
      margin-left: 10px;
    }
  }
}

.openAccount_modal {
  .ivu-form {
    position: relative;
    left: 16px;
  }
  .ivu-select,
  .ivu-select-single {
    width: 58%;
  }
}

.company_getCash {
  .ivu-form {
    position: relative;
    left: 26px;
  }
  .ivu-select,
  .ivu-select-single {
    width: 47%;
  }
}

.companyBankCardInfo {
  .ivu-modal-footer {
    display: none;
  }
}
</style>
