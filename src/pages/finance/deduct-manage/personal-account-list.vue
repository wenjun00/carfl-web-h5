<!--个人开户列表-->
<template>
  <section class="page personal-account-list">
      <page-header title="个人开户列表" hiddenPrint></page-header>
    <i-row class="data-form">
      <i-button @click="getTimeSearch(1)" type="text" v-auth="458">昨日</i-button>
      <i-button @click="getTimeSearch(2)" type="text" v-auth="458">今日</i-button>
      <i-button @click="getTimeSearch(3)" type="text" v-auth="458">本周</i-button>
      <i-button @click="getTimeSearch(4)" type="text" v-auth="458">本月</i-button>
      <i-button @click="getTimeSearch(5)" type="text" v-auth="458">上月</i-button>
      <i-button @click="getTimeSearch(6)" type="text" v-auth="458">最近三月</i-button>
      <i-button @click="getTimeSearch(7)" type="text" v-auth="458">本季度</i-button>
      <i-button @click="getTimeSearch(8)" type="text" v-auth="458">本年</i-button>
      <i-button @click="openSearch" class="commend.item" v-auth="457">
        <span v-if="!searchOptions">展开</span>
        <span v-if="searchOptions">收起</span>
        <span>高级搜索</span>
      </i-button>
    </i-row>
    <i-row v-if="searchOptions"  class="second-data-form">
      <i-input class="second-data-one" placeholder="请录入客户姓名\证件号码\联系号码查询" v-model="gatherModel.orderInfo"></i-input>
      <span class="second-data-two">日期：</span>
      <i-date-picker class="second-data-three" v-model="gatherModel.createDateStart"></i-date-picker>~
      <i-date-picker class="second-data-three"v-model="gatherModel.createDateEnd"></i-date-picker>
      <i-button class="blueButton" @click="getGatherListByCondition">搜索</i-button>
    </i-row>
    <data-box :id="456" :columns="columns1" :data="data1" @onPageChange="getGatherListByCondition" :page="pageService"></data-box>

    <!--<div class="submitBar">
      <i-row type="flex" align="middle" style="padding:5px">
        <i-col :span="8" push="1">
          <span>申请人：administrator</span>
        </i-col>
        <i-col :span="10" pull="4">
          <span>申请时间： 2017-12-01 13:56:45</span>
        </i-col>
        <i-col :span="6" style="text-align:right;">
          <i-button class="highButton" style="margin-left:10px;" @click="createAccount">客户开户</i-button>
        </i-col>
      </i-row>
    </div>-->
    <!--开户弹窗-->
    <template>
      <i-modal v-model="dialog.create" title="开户绑卡" width="400">
        <create-personal-account ref="create-personal-account"></create-personal-account>
        <div slot="footer">
          <i-button @click="dialog.create=false">取消</i-button>
          <i-button class="blueButton" @click="createConfirm">确认开户</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="dialog.cardInfo" :transfer="false" class="bankCardInfo" title="银行卡信息" width="400">
        <bank-card-info ref="bank-card-info" @change="dialog.cardInfo=false,getGatherListByCondition()"></bank-card-info>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="deductModal" title="划扣" width="930">
        <deduct ref="deduct"></deduct>
        <div slot="footer"></div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import BankCardInfo from "~/components/finance-manage/bank-card-info.vue";
  import CreatePersonalAccount from "~/pages/finance/deduct-manage/personal-account-list/create-personal-account.vue";
  import Component from "vue-class-component";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import Deduct from '~/components/finance-manage/deduct.vue'
  import { Dependencies } from "~/core/decorator";
  import { Layout } from "~/core/decorator";
  import { ChargeBackService } from "~/services/manage-service/charge-back.service";
  import { PageService } from "~/utils/page.service";
  import { FilterService } from "~/utils/filter.service"

  @Layout("workspace")
  @Component({

    components: {
      CreatePersonalAccount,
      DataBox,
      BankCardInfo,
      SvgIcon,
      Deduct
    }
  })
  export default class PersonalAccountList extends Page {
    @Dependencies(ChargeBackService) private chargeBackService: ChargeBackService;
    @Dependencies(PageService) private pageService: PageService;
    private columns1: any;
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    private customName: String = "";
    private checkRadio: String = "融资租赁合同";
    private dialog: any = {
      create: false,
      cardInfo: false
    }
    private deductModal: Boolean = false;
    private gatherModel: any = {
      orderInfo: '',
      createDateStart: '',
      createDateEnd: '',
      timeSearch: ''
    }
    getTimeSearch(val) {
      this.gatherModel.orderInfo = ''
      this.gatherModel.createDateStart = ''
      this.gatherModel.createDateEnd = ''
      this.gatherModel.timeSearch = val
      this.getGatherListByCondition()
      this.gatherModel.timeSearch = ''
    }
    /**
     * 获取列表
     */
    getGatherListByCondition() {
      this.chargeBackService.getPersonalAccountList(this.gatherModel, this.pageService).subscribe(val => {
        this.data1 = val
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
    }
    /**
     * 开户确定
     */
    createConfirm() {
      let create: any = this.$refs['create-personal-account']
      this.chargeBackService.createPersonalAccount(create.model).subscribe(val => {
        this.$Message.info('操作成功！')
        this.dialog.create = false
        this.getGatherListByCondition()
      }, ({ msg }) => {
        this.$Message.error(msg)
      })
    }
    created() {
      this.getGatherListByCondition()
      this.columns1 = [
        {
          title: "操作",
          width: 220,
          align: "center",
          render: (h, { row, column, index }) => {
            return h("div", [ h("i-button", {
              props: {
                type: "text"
              },
              style: {
                color: "#265EA2"
              },
              on: {
                click: () => {
                  let create: any = this.$refs['create-personal-account']
                  create.refresh(row)
                  this.dialog.create = true
                }
              }
            }, "客户开户"),h("i-button", {
              props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.dialog.cardInfo = true
                    let _card: any = this.$refs['bank-card-info']
                    _card.refresh(row)
                  }
                }
              }, "银行卡信息"), h("i-button", {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    let _deduct: any = this.$refs.deduct
                    _deduct.refresh(row)
                    this.deductModal = true
                  }
                }
              }, "划扣")]);
          }
        },
        {
          title: "开户日期",
          align: "center",
          key: "openAccountDate",
          render: (h, { row, column, index }) => {
            return h('span', FilterService.dateFormat(row.openAccountDate, 'yyyy-MM-dd'))
          }
        },
        {
          align: "center",
          title: "开户类型",
          key: "accountType",
          render: (h, { row, column, index }) => {
            return h("span", {}, this.$dict.getDictName(Number(row.accountType)));
          }
        },
        {
          align: "center",
          title: "客户号",
          key: "clientNumber"
        },
        {
          align: "center",
          title: "客户姓名",
          key: "name"
        },
        {
          align: "center",
          title: "证件号码",
          key: "certificateNumber"
        },
        {
          align: "center",
          title: "预留手机",
          key: "reservedPhoneNumber"
        }
      ];
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    oneKeyToConnect() {}
    /**
     * 多选
     */
    multipleSelect(selection) {
    }
  }

</script>

<style lang="less">
  .page.personal-account-list{
    .data-form{
      margin-top:10px;
      .commend{
        font-size:18px;
        font-weight:bold
      }
      .commend.item{
        color:#265EA2
      }
      .second-commend{
        float:right;
        margin-right:10px;
        margin-top:10px;
        .second-commend-item{
          font-size:16px;
          cursor:pointer;
          display:inline-block;
          margin-left:10px;
          color:#3367A7;
          .second-commend-item-son{
            font-size: 12px;
          }
        }
      }
    }
    .second-data-form{
      margin:6px;
      position:relative;
      right:6px;
      .second-data-one{
        display:inline-block;
        width:18%;
        margin-left:20px;
      }
      .second-data-two{
        margin-left:10px;
      }
      .second-data-three{
        display:inline-block;
        width:10%
      }
    }
  }
  .bankCardInfo {
    .ivu-modal-footer {
      display: none;
    }
  }

</style>
