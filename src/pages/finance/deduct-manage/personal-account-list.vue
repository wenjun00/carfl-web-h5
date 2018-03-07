<!--个人开户列表-->
<template>
  <section class="page personal-account-list">
    <i-row style="margin-top:10px">
      <span style="font-size:18px;font-weight:bold">个人开户列表</span>
      <i-button @click="getTimeSearch(1)" type="text">昨日</i-button>
      <i-button @click="getTimeSearch(2)" type="text">今日</i-button>
      <i-button @click="getTimeSearch(3)" type="text">本周</i-button>
      <i-button @click="getTimeSearch(4)" type="text">本月</i-button>
      <i-button @click="getTimeSearch(5)" type="text">上月</i-button>
      <i-button @click="getTimeSearch(6)" type="text">最近三月</i-button>
      <i-button @click="getTimeSearch(7)" type="text">本季度</i-button>
      <i-button @click="getTimeSearch(8)" type="text">本年</i-button>
      <i-button @click="openSearch" style="color:#265EA2">
        <span v-if="!searchOptions">展开</span>
        <span v-if="searchOptions">收起</span>
        <span>高级搜索</span>
      </i-button>
      <div style="float:right;margin-right:10px;margin-top:10px;">
        <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon iconClass="daochu"></svg-icon>
          <span style="font-size: 12px;">导出</span>
        </div>
      </div>
    </i-row>
    <i-row v-if="searchOptions" style="margin:6px;position:relative;right:6px;">
      <i-input style="display:inline-block;width:18%;margin-left:20px;" placeholder="请录入客户姓名\证件号码\联系号码查询" v-model="gatherModel.orderInfo"></i-input>
      <span style="margin-left:10px">日期：</span>
      <i-date-picker style="display:inline-block;width:10%" v-model="gatherModel.createDateStart"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%" v-model="gatherModel.createDateEnd"></i-date-picker>
      <i-button class="blueButton" @click="getGatherListByCondition">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="data1"></data-box>

    <div class="submitBar">
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
    </div>
    <!--开户弹窗-->
    <template>
      <i-modal v-model="openCreateAccount" title="开户绑卡" width="400">
        <i-form :label-width="110">
          <i-form-item label="账户类型">
            <i-select style="width:160px;">
              <i-option label="汇付" value="汇付" key="汇付"></i-option>
              <i-option label="对公" value="对公" key="对公"></i-option>
              <i-option label="富友" value="富友" key="富友"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="客户姓名">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="证件类型">
            <i-select style="width:160px;">
              <i-option label="身份证" value="身份证" key="身份证"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="证件号码">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="开户银行">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="开户省市">
            <i-select style="width:80px;">
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
          <i-form-item label="银行卡号">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="银行预留手机号">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <!--<i-form-item label="验证码">
            <i-input style="width:160px;"></i-input>
            <i-button style="display:inline-block;margin-left:8px;" class="blueButton" size="small">发送验证码<span>60</span></i-button>
          </i-form-item>-->
        </i-form>
        <div slot="footer">
          <i-button @click="openCreateAccount=false">取消</i-button>
          <i-button class="blueButton" @click="openCreateAccount=false">确认开户</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="bankCardInfoModal" :transfer="false" class="bankCardInfo" title="银行卡信息" width="400">
        <bank-card-info ref="bank-card-info"></bank-card-info>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="deductModal" title="划扣" width="930">
        <deduct></deduct>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import BankCardInfo from "~/components/finance-manage/bank-card-info.vue";
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
    private openCreateAccount: Boolean = false;
    private bankCardInfoModal: Boolean = false;
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
     * 开户
     */
    createAccount() {
      this.openCreateAccount = true
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
                    this.bankCardInfoModal = true
                    let card: any = this.$refs['bank-card-info']
                    card.refresh(row)
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
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.openAccountDate, 'yyyy-MM-dd'))
          }
        },
        {
          align: "center",
          title: "开户类型",
          key: "accountType",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.accountType));
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
  .bankCardInfo {
    .ivu-modal-footer {
      display: none;
    }
  }

</style>
