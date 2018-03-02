<template>
  <section class="page open-account">
    <span class="form-title">客户开户</span>
    <i-button @click="getOrderInfoByTime(0)" type="text">昨日</i-button>
    <i-button @click="getOrderInfoByTime(1)" type="text">今日</i-button>
    <i-button @click="getOrderInfoByTime(2)" type="text">本周</i-button>
    <i-button @click="getOrderInfoByTime(3)" type="text">本月</i-button>
    <i-button @click="getOrderInfoByTime(4)" type="text">上月</i-button>
    <i-button @click="getOrderInfoByTime(5)" type="text">最近三月</i-button>
    <i-button @click="getOrderInfoByTime(6)" type="text">本季度</i-button>
    <i-button @click="getOrderInfoByTime(7)" type="text">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>高级搜索</i-button>
    <div style="float:right;margin-right:10px;margin-top:10px;">
      <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7" @click="printPage">
        <svg-icon style="font-size:24px;" iconClass="dayin"></svg-icon>
        <span style="font-size:12px;">打印</span>
      </div>
      <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
        <svg-icon iconClass="daochu"></svg-icon>
        <span @click="exportDatabox" style="font-size: 12px;">导出</span>
      </div>
    </div>
    <i-row v-if="searchOptions" style="margin:6px;">
      <i-input v-model="openAccountModel.personalInfo" style="display:inline-block;width:16%;margin-right:10px;" placeholder="请输入客户姓名\证件号码\联系号码查询"></i-input>
      <i-button class="blueButton" @click="getCustomerOpenAccount">搜索</i-button>
    </i-row>
    <data-box :id="180" :columns="columns1" :data="openAccountList" ref="databox" @onPageChange="getCustomerOpenAccount" :page="pageService"></data-box>
    <!--开户弹窗-->
    <template>
      <i-modal v-model="openCreateAccount" title="开户申请" width="500">
        <i-form :label-width="110" style="position:relative;left:30px;">
          <i-form-item label="开户渠道">
            <i-select style="width:160px;">
              <i-option label="汇付" value="汇付" key="汇付"></i-option>
              <i-option label="对公" value="对公" key="对公"></i-option>
              <i-option label="富友" value="富友" key="富友"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="账户类型">
            <i-input v-model="accountType" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="客户姓名">
            <i-input v-model="customerName" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="客户手机号">
            <i-input v-model="customPhone" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="身份证号码">
            <i-input v-model="idCard" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="开户银行">
            <i-input v-model="bank" style="width:160px;"></i-input>
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
            <i-input v-model="bankCardId" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="银行预留手机号">
            <i-input v-model="bankLeavePhone" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="验证码">
            <i-input v-model="qCode" style="width:160px;"></i-input>
            <i-button style="display:inline-block;margin-left:8px;" @click='sendQcode' class="blueButton">发送验证码
              <span>{{timeout}}</span>
            </i-button>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button class="blueButton">确认并返回</i-button>
        </div>
      </i-modal>
    </template>

    <!--绑卡弹窗-->
    <template>
      <i-modal v-model="openBindCard" title="绑定银行卡" width="400">
        <i-form :label-width="110">
          <i-form-item label="账户类型">
            <i-input v-model="accountType" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="客户姓名">
            <i-input v-model="customerName" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="客户手机号">
            <i-input v-model="customPhone" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="身份证号码">
            <i-input v-model="idCard" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="开户银行">
            <i-input v-model="bank" style="width:160px;"></i-input>
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
            <i-input v-model="bankCardId" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="银行预留手机号">
            <i-input v-model="bankLeavePhone" style="width:160px;"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button class="blueButton" @click="openBindCard=false">确认绑卡</i-button>
        </div>
      </i-modal>
    </template>
    <!--结算通道-->
    <template>
      <i-modal v-model="openAccountChannel" title="结算通道" width="300">
        <i-form :label-width="60">
          <i-form-item label="结算通道">
            <i-select style="width:150px;" v-model="settleChannel">
              <i-option v-for="{value,label} in $dict.getDictData('0107')" :key="value" :label="label" :value="value"></i-option>
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
      <i-modal v-model="openChangeBankCard" title="更换银行卡" width="480">
        <i-steps :current="current" style="margin-left:40px;">
          <i-step title="解绑"></i-step>
          <i-step title="绑卡"></i-step>
        </i-steps>
        <i-form :label-width="110" style="margin-top:20px;">
          <i-form-item label="账户类型">
            <i-input v-model="accountType" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="客户姓名">
            <i-input v-model="customerName" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="证件类型" v-if="current===2">
            <i-input v-model="certificateType" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="证件号码" v-if="current===2">
            <i-input v-model="certificateId" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="身份证号码" v-if="current===0">
            <i-input v-model="idCard" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="开户银行">
            <i-input v-model="bank" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="开户省市">
            <!--<i-input v-model="province" style="width:80px;" placeholder="请选择省份"></i-input><i-input v-model="city" placeholder="请选择城市" style="width:80px;"></i-input>-->
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
          <i-form-item label="银行预留手机号">
            <i-input v-model="bankLeavePhone" style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="验证码" v-if="current===0">
            <i-input v-model="qCode" style="width:160px;"></i-input>
            <i-button style="display:inline-block;margin-left:8px;" @click='sendQcode' class="blueButton">发送验证码
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
      <i-modal title="验卡失败原因" v-model="openHelp" width="600" class-name="no-footer">
        <data-box :columns="columnsHelp" :data="dataHelp" hideColumnsConfig :noDefaultRow="true"></data-box>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import DataBox from "~/components/common/data-box.vue";
  import {
    Dependencies
  } from "~/core/decorator";
  import SvgIcon from "~/components/common/svg-icon.vue";
  import {
    Layout
  } from "~/core/decorator";
  import {
    PersonalService
  } from "~/services/manage-service/personal.service";
  import {
    PageService
  } from "~/utils/page.service";
  @Layout("workspace")
  @Component({
    components: {
      DataBox,
      SvgIcon
    }
  })
  export default class OpenAccount extends Page {
    @Dependencies(PersonalService) private personalService: PersonalService;
    @Dependencies(PageService) private pageService: PageService;

    private columns1: any;
    private columns2: any;
    private columnsHelp: any;
    private openAccountList: Array < Object > = [];
    private data2: Array < Object > ;
    private searchOptions: Boolean = false;
    private customName: String = "";
    private openColumnsConfig: Boolean = false;
    private openCreateAccount: Boolean = false;
    private accountType: String = "个人用户";
    private customerName: String = "刘佳";
    private customPhone: String = "18292536450";
    private idCard: String = "610303199111142641";
    private bank: String = "中国建设银行";
    private bankCardId: String = "6227004171150138350";
    private bankLeavePhone: String = "15091146267";
    private qCode: String = "";
    private timeout: any = 60;
    private openAccountChannel: Boolean = false;
    private openBindCard: Boolean = false;
    private openChangeBankCard: Boolean = false;
    private current: any = 0;
    private certificateType: String = "身份证";
    private certificateId: String = "";
    private openHelp: Boolean = false;
    private dataHelp: Array < Object > = [];
    private settleChannel: Number = 0; // 结算通道
    private personalBankId: Number = 0; // 用户账户id
    private openAccountModel: any = {
      timeSearch: "",
      personalInfo: ""
    };
    mounted() {
      this.getCustomerOpenAccount();
    }
    created() {
      this.columns1 = [{
          title: "操作",
          width: 100,
          align: "center",
          fixed: "left",
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row.isAccount === 98) {
              return h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.createAccount(row);
                    }
                  }
                },
                "开户"
              );
            } else if (row.isAccount === 99) {
              return h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.changeCard(row);
                    }
                  }
                },
                "换卡"
              );
            } else if (row.isAccount === 100) {
              return h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.bindCard(row);
                    }
                  }
                },
                "绑卡"
              );
            }
          }
        },
        {
          title: "客户姓名",
          editable: true,
          key: "personalName",
          align: "center"
        },
        {
          title: "证件号码",
          editable: true,
          key: "idCard",
          align: "center"
        },
        {
          title: "联系号码",
          editable: true,
          key: "mobileMain",
          align: "center"
        },
        {
          title: "是否开户",
          editable: true,
          key: "isAccount",
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.isAccount));
          }
        },
        {
          title: "绑卡银行",
          editable: true,
          key: "boundBank",
          align: "center"
        },
        {
          title: "银行卡号",
          editable: true,
          key: "bankCard",
          align: "center"
        },
        {
          title: "客户号",
          editable: true,
          key: "customId",
          align: "center"
        },
        {
          key: "faileReason",
          // editable: true,
          width: 140,
          renderHeader: (h, {
            column,
            index
          }) => {
            return h(
              "div", {
                on: {
                  click: () => {
                    this.openHelpPage();
                  }
                },
                style: {
                  cursor: "pointer"
                }
              }, [
                h("span", {}, "验卡失败原因"),
                h("Icon", {
                  props: {
                    type: "help-circled",
                    size: "20"
                  }
                })
              ]
            );
          },
          align: "center"
        },
        {
          title: "结算通道",
          editable: true,
          width: 200,
          key: "settlementChannel",
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h(
              "i-button", {
                props: {
                  type: "text"
                },
                on: {
                  click: () => {
                    this.settleChannelClick(row);
                  }
                },
                style: {
                  color: "#265ea2"
                }
              },
              this.$dict.getDictName(row.settlementChannel)
            );
          }
        }
      ];
      this.columns2 = [{
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "列名",
          key: "columnsName",
          align: "center"
        },
        {
          type: "selection",
          width: 80,
          align: "center"
        }
      ];
      this.columnsHelp = [{
          title: "银行",
          key: "bankName",
          align: "center",
          width: 60
        },
        {
          title: "验卡失败原因",
          key: "checkCardFailReason",
          align: "center",
          width: 400
        },
        {
          title: "咨询电话",
          key: "bankPhone",
          align: "center",
          width: 100
        }
      ];
      this.data2 = [{
          columnsName: "客户姓名"
        },
        {
          columnsName: "证件号码"
        },
        {
          columnsName: "联系号码"
        },
        {
          columnsName: "是否开户"
        },
        {
          columnsName: "绑定银行"
        },
        {
          columnsName: "银行卡号"
        },
        {
          columnsName: "客户号"
        },
        {
          columnsName: "验卡失败原因"
        },
        {
          columnsName: "结算通道"
        }
      ];
    }
    /**
     * 确认修改结算通道
     */
    confirmModifySettleChannel() {
      this.personalService
        .modifySettleChannel({
          settleChannel: this.settleChannel,
          id: this.personalBankId
        })
        .subscribe(
          data => {
            this.$Message.success("修改成功！");
            this.openAccountChannel = false
            this.getCustomerOpenAccount()
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    /**
     * 修改结算通道
     */
    settleChannelClick(row) {
      // 获取确认修改时需要的两个参数
      this.personalBankId = row.personalBankId;
      this.settleChannel = row.settlementChannel;
      this.openAccountChannel = true;
    }
    /**
     * 获取客户开户列表
     */
    getCustomerOpenAccount() {
      this.personalService
        .getCustomerAccountList(this.openAccountModel, this.pageService)
        .subscribe(
          data => {
            this.openAccountList = data;
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    /**
     * 导出
     */
    exportDatabox() {}
    /**
     * 按时间搜索列表
     */
    getOrderInfoByTime(val) {
      this.openAccountModel.timeSearch = val;
      this.openAccountModel.personalInfo = "";
      this.getCustomerOpenAccount();
      this.openAccountModel.timeSearch = "";
    }
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    /**
     * 确认解绑
     */
    confirmUnBindCard() {
      if (this.current === 2) {
        this.current = 0;
      } else {
        this.current += 1;
      }
    }
    /**
     * 确认绑卡
     */
    confirmBindCard() {
      this.current = 0;
      this.openChangeBankCard = false;
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
      this.openCreateAccount = true;
    }
    /**
     * 换卡
     */
    changeCard(row) {
      this.openChangeBankCard = true;
    }
    /**
     * 绑卡
     */
    bindCard(row) {
      this.openBindCard = true;
    }
    /**
     * 对公
     */
    faceToPuclic(row) {
      this.openAccountChannel = true;
    }
    /**
     * 打开帮助页
     */
    openHelpPage() {
      this.openHelp = true;
    }
    /**
     * 打印
     */
    printPage() {}
  }

</script>
