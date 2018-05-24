<template>   
  <section class="page open-account">
    <page-header title="客户开户"  hiddenPrint hiddenExport></page-header>
    <data-form hidden-date-search :model="openAccountModel" :page="pageService" @on-search="getCustomerOpenAccount" >
      <template slot="input">
        <!-- <i-form-item prop="keyWord">
          <i-input v-model="openAccountModel.keyWord" placeholder="请输入客户姓名\证件号码\联系号码查询"></i-input>
        </i-form-item> -->
        <i-form-item prop="personalName" label="客户姓名">
          <i-input v-model="openAccountModel.personalName" placeholder="请输入客户姓名"></i-input>
        </i-form-item>
        <i-form-item prop="idCard" label="证件号码">
          <i-input v-model="openAccountModel.idCard" placeholder="请输入证件号码"></i-input>
        </i-form-item>
        <i-form-item prop="tel" label="联系电话">
          <i-input v-model="openAccountModel.tel" placeholder="请输入联系电话"></i-input>
        </i-form-item>

      </template>
    </data-form>
    <data-box :id="180" :columns="columns1" :data="openAccountList" ref="databox" @onPageChange="getCustomerOpenAccount" :page="pageService"></data-box>

    <!--绑卡弹窗-->
    <template>
      <i-modal class="open-account-window" v-model="openBindCard" title="绑定银行卡" :width="400">
      </i-modal>
    </template>
    <!--结算通道-->
    <template>
      <i-modal v-model="openAccountChannel" title="结算通道" :width="300">
        <i-form :label-width="60">
          <i-form-item label="结算通道">
            <i-select style="width:150px;" v-model="settleChannel">
              <i-option v-for="{value,label} in $dict.getDictData('0105')" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="openAccountChannel=false">取消</i-button>
          <i-button class="blueButton" @click="confirmModifySettleChannel">确定</i-button>
        </div>
      </i-modal>
    </template>

    <!--更换银行卡-->
    <template>
      <i-modal class="bank-popover" v-model="openChangeBankCard" title="更换银行卡" :width="480">
        <i-steps :current="current" class="binding-choose">
          <i-step title="解绑"></i-step>
          <i-step title="绑卡"></i-step>
        </i-steps>
        <i-form class="back-type" :label-width="110">
          <i-form-item label="账户类型">
            <i-input class="input-form" v-model="accountType"></i-input>
          </i-form-item>
          <i-form-item label="客户姓名">
            <i-input class="input-form" v-model="customerName"></i-input>
          </i-form-item>
          <i-form-item label="证件类型" v-if="current===2">
            <i-input class="input-form" v-model="certificateType"></i-input>
          </i-form-item>
          <i-form-item label="证件号码" v-if="current===2">
            <i-input class="input-form" v-model="certificateId"></i-input>
          </i-form-item>
          <i-form-item label="身份证号码" v-if="current===0">
            <i-input class="input-form" v-model="idCard"></i-input>
          </i-form-item>
          <i-form-item label="开户银行">
            <i-input class="input-form" v-model="bank"></i-input>
          </i-form-item>
          <i-form-item label="开户省市">
            <!--<i-input v-model="province" style="width:80px;" placeholder="请选择省份"></i-input><i-input v-model="city" placeholder="请选择城市" style="width:80px;"></i-input>-->
            <i-select class="select-city">
              <i-option label="陕西省" value="陕西省" key="陕西省"></i-option>
            </i-select>
            <i-select style="width:80px;">
              <i-option label="西安市" value="西安市" key="西安市"></i-option>
              <i-option label="宝鸡市" value="宝鸡市" key="宝鸡市"></i-option>
              <i-option label="咸阳市" value="咸阳市" key="咸阳市"></i-option>
              <i-option label="渭南市" value="渭南市" key="渭南市"></i-option>
              <i-option label="铜川市" value="铜川市" key="铜川市"></i-option>
              <i-option label="榆林市" value="榆林市" key="榆林市"></i-option>
              <i-option label="延安市" value="延安市" key="延安市"></i-option>
              <i-option label="汉中市" value="汉中市" key="汉中市"></i-option>
              <i-option label="安康市" value="安康市" key="安康市"></i-option>
              <i-option label="商洛市" value="商洛市" key="商洛市"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="银行预留手机号">
            <i-input class="input-form" v-model="bankLeavePhone"></i-input>
          </i-form-item>
          <i-form-item label="验证码" v-if="current===0">
            <i-input class="input-form" v-model="qCode"></i-input>
            <i-button class="back-button" @click='sendQcode'>发送验证码
              <span>60</span>
            </i-button>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="confirmUnBindCard" class="blueButton" v-if="current===0">确认解绑</i-button>
          <i-button @click="confirmBindCard" class="blueButton" v-if="current===1">确认绑卡</i-button>
        </div>
      </i-modal>
    </template>

    <!--help-->
    <template>
      <i-modal title="验卡失败原因" v-model="openHelp" :width="600" class-name="no-footer">
        <data-box :columns="columnsHelp" :data="dataHelp" hideColumnsConfig :noDefaultRow="true"></data-box>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from '~/core/page'
  import Component from 'vue-class-component'
  import DataBox from '~/components/common/data-box.vue'
  import {
    Dependencies
  } from '~/core/decorator'
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    Layout
  } from '~/core/decorator'
  import {
    PersonalService
  } from '~/services/manage-service/personal.service'
  import {
    PageService
  } from '~/utils/page.service'
  import {
    FilterService
  } from '~/utils/filter.service'
  import CustomerOpenAccount from "~/components/purchase-manage/customer-open-account.vue";
  import CheckBankCard from "~/components/purchase-manage//check-bank-card.vue"

  @Layout('workspace')
  @Component({
    components: {
      DataBox,
      SvgIcon,
      CustomerOpenAccount,
      CheckBankCard
    }
  })
  export default class OpenAccount extends Page {
    @Dependencies(PersonalService) private personalService: PersonalService
    @Dependencies(PageService) private pageService: PageService

    private columns1: any
    private columns2: any
    private columnsHelp: any
    private openAccountList: Array < Object > = []
    private data2: Array < Object >
    private searchOptions: Boolean = false
    private customName: String = ''
    private openColumnsConfig: Boolean = false
    private openCreateAccount: Boolean = false
    private accountType: String = '个人用户'
    private customerName: String = '刘佳'
    private customPhone: String = '18292536450'
    private idCard: String = '610303199111142641'
    private bank: String = '中国建设银行'
    private bankCardId: String = '6227004171150138350'
    private bankLeavePhone: String = '15091146267'
    private qCode: String = ''
    private timeout: any = 60
    private openAccountChannel: Boolean = false
    private openBindCard: Boolean = false
    private openChangeBankCard: Boolean = false
    private current: any = 0
    private certificateType: String = '身份证'
    private certificateId: String = ''
    private openHelp: Boolean = false
    private dataHelp: Array < Object > = []
    private settleChannel: any = '' // 结算通道
    private personalBankId: any = '' // 用户账户id
    private openAccountModel: any = {
      personalName:'', // 客户姓名
      idCard:'',   // 证件号码
      tel:'',      // 联系电话
      timeSearch: '',
    }
    mounted() {
      this.getCustomerOpenAccount()
    }
    created() {
      this.columns1 = [{
          title: '操作',
          minWidth: this.$common.getColumnWidth(5),
          align: 'center',
          fixed: 'left',
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row.accountStatus === 98) {
              return h(
                'i-button', {
                  props: {
                    type: 'text'
                  },
                  style: {
                    color: '#265EA2'
                  },
                  on: {
                    click: () => {
                      this.createAccount(row)
                    }
                  }
                },
                '开户'
              )
            } else if (row.accountStatus === 99) {
              return h("div", [
                // h(
                //   'i-button', {
                //     props: {
                //       type: 'text'
                //     },
                //     style: {
                //       color: '#265EA2'
                //     },
                //     on: {
                //       click: () => {
                //         this.changeCard(row)
                //       }
                //     }
                //   },
                //   '换卡'
                // ),
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
                        this.changeCard(row)
                      }
                    }
                  },
                  '查看'
                )
              ]);
            } else if (row.accountStatus === 100) {
              return h("div", [
                    // h(
                    //   'i-button', {
                    //     props: {
                    //       type: 'text'
                    //     },
                    //     style: {
                    //       color: '#265EA2'
                    //     },
                    //     on: {
                    //       click: () => {
                    //         this.bindCard(row)
                    //       }
                    //     }
                    //   },
                    //   '绑卡'
                    // ),
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
                        this.changeCard(row)
                      }
                    }
                  },
                  '查看'
                )
              ]);
            }
          }
        },
        {
          title: '客户姓名',
          //   editable: true,
          key: 'name',
          align: 'center',
          minWidth: this.$common.getColumnWidth(3),
        },
        {
          title: '性别',
          //   editable: true,
          key: 'sex',
          align: 'center',
          minWidth: this.$common.getColumnWidth(3),
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', {}, this.$dict.getDictName(row.sex))
          }
        },
        {
          title: '证件号码',
          //   editable: true,
          key: 'idCard',
          align: 'center',
          minWidth: this.$common.getColumnWidth(6),
        },
        {
          title: '手机号码',
          //   editable: true,
          key: 'mobileMain',
          align: 'center',
          minWidth: this.$common.getColumnWidth(5),
        },
        {
          title: '开户状态',
          //   editable: true,
          key: 'accountStatus',
          align: 'center',
          minWidth: this.$common.getColumnWidth(3),
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', {}, this.$dict.getDictName(row.accountStatus))
          }
        },
        {
          align: 'center',
          title: '操作时间',
          //   editable: true,
          key: 'operateTime',
          minWidth: this.$common.getColumnWidth(6),
          render: (h, {
            row,
            column,
            index
          }) => {
            return h(
              'span',
              FilterService.dateFormat(row.operateTime, 'yyyy-MM-dd hh:mm:ss')
            )
          }
        }, {
          align: 'center',
          title: '创建日期',
          //   editable: true,
          key: 'createTime',
          minWidth: this.$common.getColumnWidth(6),
          render: (h, {
            row,
            column,
            index
          }) => {
            return h(
              'span',
              FilterService.dateFormat(row.createTime, 'yyyy-MM-dd hh:mm:ss')
            )
          }
        },
        {
          title: '客户号',
          editable: true,
          key: 'customId',
          align: 'center',
          minWidth: this.$common.getColumnWidth(5),
        },
        {
          title: '验卡失败原因',
          key: 'faileReason',
          align: 'center',
          minWidth: this.$common.getColumnWidth(5),
        },
        // {
        //   title: '验卡失败原因',
        //   key: 'faileReason',
        // //   editable: true,
        //   minWidth: this.$common.getColumnWidth(6),
        //   renderHeader: (h, {
        //     column,
        //     index
        //   }) => {
        //     return h(
        //       'div', {
        //         on: {
        //           click: () => {
        //             this.openHelpPage()
        //           }
        //         },
        //         style: {
        //           cursor: 'pointer'
        //         }
        //       }, [
        //         h('span', {}, '验卡失败原因'),
        //         h('Icon', {
        //           props: {
        //             type: 'help-circled',
        //             size: '20'
        //           }
        //         })
        //       ]
        //     )
        //   },
        //   align: 'center'
        // },
        {
          title: '结算通道',
          //   editable: true,
          minWidth: this.$common.getColumnWidth(4),
          key: 'defaultChannel',
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h(
              'i-button', {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    this.settleChannelClick(row)
                  }
                },
                style: {
                  color: '#265ea2'
                }
              },
              this.$dict.getDictName(row.defaultChannel)
            )
          }
        }
      ]
      this.columns2 = [{
          title: '序号',
          type: 'index',
          minWidth: 80,
          align: 'center'
        },
        {
          title: '列名',
          key: 'columnsName',
          align: 'center'
        },
        {
          type: 'selection',
          minWidth: 80,
          align: 'center'
        }
      ]
      this.columnsHelp = [{
          title: '银行',
          key: 'bankName',
          align: 'center',
          width: 60
        },
        {
          title: '验卡失败原因',
          key: 'checkCardFailReason',
          align: 'center',
          width: 400
        },
        {
          title: '咨询电话',
          key: 'bankPhone',
          align: 'center',
          width: 100
        }
      ]
      this.data2 = [{
          columnsName: '客户姓名'
        },
        {
          columnsName: '证件号码'
        },
        {
          columnsName: '联系号码'
        },
        {
          columnsName: '是否开户'
        },
        {
          columnsName: '绑定银行'
        },
        {
          columnsName: '银行卡号'
        },
        {
          columnsName: '客户号'
        },
        {
          columnsName: '验卡失败原因'
        },
        {
          columnsName: '结算通道'
        }
      ]
    }
    /**
     * 确认修改结算通道
     */
    confirmModifySettleChannel() {
      this.personalService
        .modifySettleChannel({
          settleChannel:this.settleChannel,
          personalId:this.personalBankId
        })
        .subscribe(
          data => {
            this.$Message.success('修改成功！')
            this.openAccountChannel = false
            this.getCustomerOpenAccount()
          },
          ({
            msg
          }) => {
            this.$Message.error(msg)
          }
        )
    }
    /**
     * 修改结算通道
     */
    settleChannelClick(row) {
      // 获取确认修改时需要的两个参数
      this.personalBankId = row.id
      this.openAccountChannel = true
    }
    /**
     * 获取客户开户列表
     */
    getCustomerOpenAccount() {
      this.personalService
        .getCustomerList(this.openAccountModel, this.pageService)
        .subscribe(
          data => {
            this.openAccountList = data
          },
          ({
            msg
          }) => {
            this.$Message.error(msg)
          }
        )
    }
    /**
     * 导出
     */
    exportDatabox() {}
    /**
     * 按时间搜索列表
     */
    getOrderInfoByTime(val) {
      this.openAccountModel.timeSearch = val
      this.openAccountModel.keyWord = ''
      this.getCustomerOpenAccount()
      this.openAccountModel.timeSearch = ''
    }
    openSearch() {
      this.searchOptions = !this.searchOptions
    }
    /**
     * 确认解绑
     */
    confirmUnBindCard() {
      if (this.current === 2) {
        this.current = 0
      } else {
        this.current += 1
      }
    }
    /**
     * 确认绑卡
     */
    confirmBindCard() {
      this.current = 0
      this.openChangeBankCard = false
    }
    /**
     * 发送验证码
     */
    sendQcode() {
      // let a = setInterval(() => {
      //   this.timeout--;
      //   if (this.timeout === -1) {
      //     this.timeout = 60;
      //   }
      // }, 1000);
    }
    /**
     * 开户
     */
    createAccount(row) {
      let dialog = this.$dialog.show({
        title: '开户申请',
        footer: true,
        size: 'small',
        onOk: customerOpenAccount => {
          customerOpenAccount.openaccountClick().then(() => {
            this.getCustomerOpenAccount()
          })
        },
        onCancel: () => {},
        render: h => {
          return h(CustomerOpenAccount, {
            props: {
              row
            }
          });
        }
      })
    }
    /**
     * 查看
     */
    changeCard(row) {
      this.personalService.checkBankCard({
        personalId: row.id
      }).subscribe(
        data => {
          let dialog = this.$dialog.show({
            title: '客户开户信息',
            footer: false,
            size: 'small',
            onOk: checkBankCard => {},
            onCancel: () => {},
            render: h => {
              return h(CheckBankCard, {
                props: {
                  data
                }
              });
            }
          })
        },
        ({
          msg
        }) => {
          this.$Message.error(msg)
        }
      );
      //   this.openChangeBankCard = true
    }
    /**
     * 绑卡
     */
    bindCard(row) {
      this.openBindCard = true
    }
    /**
     * 对公
     */
    faceToPuclic(row) {
      this.openAccountChannel = true
    }
    /**
     * 打开帮助页
     */
    openHelpPage() {
      this.openHelp = true
    }
    /**
     * 打印
     */
    printPage() {}
  }

</script>
<style lang="less" scoped>
  .page.open-account {
    .seek-day {
      margin-top: 10px;
    }
  }

</style>

<style lang="less" scoped>
  .open-account-window {
    .form-window {
      position: relative;
      left: 30px;
      .open-input {
        width: 160px;
      }
      .select-pull-down {
        width: 80px;
      }
      .blue-button {
        background: #265ea2;
        color: #fff;
      }
    }
    .blue-button {
      background: #265ea2;
      color: #fff;
    }
  }

  .bank-popover {
    .binding-choose {
      margin-left: 40px;
    }
    .back-type {
      margin-top: 20px;
    }
    .input-form {
      width: 160px;
    }
    .select-city {
      width: 80px;
    }
    .back-button {
      display: inline-block;
      margin-left: 8px;
    }
  }

</style>
