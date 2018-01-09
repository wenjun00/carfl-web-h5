<!--企业开户列表-->
<template>
  <section class="page company-account-list">
    <i-row style="margin-top:10px">
      <span style="font-size:18px;font-weight:bold">企业开户列表</span>
      <i-button @click="getOrderInfoByTime(1)" type="text">昨日</i-button>
      <i-button @click="getOrderInfoByTime(2)" type="text">今日</i-button>
      <i-button @click="getOrderInfoByTime(3)" type="text">本周</i-button>
      <i-button @click="getOrderInfoByTime(4)" type="text">本月</i-button>
      <i-button @click="getOrderInfoByTime(5)" type="text">上月</i-button>
      <i-button @click="getOrderInfoByTime(6)" type="text">最近三月</i-button>
      <i-button @click="getOrderInfoByTime(7)" type="text">本季度</i-button>
      <i-button @click="getOrderInfoByTime(8)" type="text">本年</i-button>
      <i-button @click="openSearch" style="color:#265EA2">
        <span v-if="!searchOptions">展开</span>
        <span v-if="searchOptions">关闭</span>
        <span>高级搜索</span>
      </i-button>
      <i-input placeholder="请录入门店\员工姓名查询" style="display:inline-block;width:16%;margin-left:10px;"></i-input>
      <span style="margin-left:10px;">下载日期：</span>
      <i-date-picker style="display:inline-block;width:10%"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%"></i-date-picker>
      <i-button class="blueButton" style="margin-left:10px;">搜索</i-button>
      <i-button class="blueButton" style="margin-left:10px;" @click="addCompany">新增企业</i-button>
      <i-button class="blueButton" style="margin-left:10px;" @click="transferAccount">转账</i-button>
    </i-row>
    <i-row v-if="searchOptions" style="margin:6px;">
      <i-select style="display:inline-block;width:10%;margin-left:10px;" placeholder="全部状态">
        <i-option value="拒绝" label="拒绝" key="拒绝"></i-option>
        <i-option value="退单" label="退单" key="退单"></i-option>
        <i-option value="通过" label="通过" key="通过"></i-option>
      </i-select>
      <i-select style="display:inline-block;width:10%;margin-left:10px;" placeholder="全部拒单原因">
        <i-option value="不符合进件操作" label="不符合进件操作" key="不符合进件操作"></i-option>
        <i-option value="欺诈" label="欺诈" key="欺诈"></i-option>
        <i-option value="黑名单" label="黑名单" key="黑名单"></i-option>
        <i-option value="法院执行" label="法院执行" key="法院执行"></i-option>
        <i-option value="还款能力不足" label="还款能力不足" key="还款能力不足"></i-option>
        <i-option value="其他" label="其他" key="其他"></i-option>
      </i-select>
      <i-select style="display:inline-block;width:10%;margin-left:10px;" placeholder="全部拒单细节">
        <i-option value="行业限制" label="拒绝" key="拒绝"></i-option>
        <i-option value="信用卡开户数超标" label="退单" key="退单"></i-option>
        <i-option value="话单非本人名下且不满两年" label="通过" key="通过"></i-option>
        <i-option value="话单本人名下但不满半年" label="通过" key="通过"></i-option>
      </i-select>
      <span style="margin-left:10px">日期：</span>
      <i-date-picker style="display:inline-block;width:10%"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%"></i-date-picker>
      <i-button class="blueButton">搜索</i-button>
    </i-row>
    <!--<i-table :columns="columns1" :data="data1" border stripe></i-table>-->
    <data-box :columns="columns1" :data="data1"></data-box>
    <!--弹出框-->
    <template>

    </template>
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置" @on-ok="confirm">
        <data-box :columns="columns2" :data="data2"></data-box>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>

    <!--开户弹窗-->
    <template>
      <i-modal v-model="addCompanyModal" title="开户绑卡" width="800">
        <i-row>
          <i-col :span="12">
            <div style="text-align:center;width:100%;font-size:14px;font-weight:bold">企业信息</div>
            <i-form :label-width="100">
              <i-form-item label="客户类型">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="企业证照类型">
                <i-select style="width:160px;">
                  <i-option label="三证合一企业" value="汇付" key="汇付"></i-option>
                  <i-option label="普通营业执照企业" value="对公" key="对公"></i-option>
                </i-select>
              </i-form-item>
              <i-form-item label="企业类型">
                <i-select style="width:160px;">
                  <i-option label="普通企业" value="身份证" key="身份证"></i-option>
                </i-select>
              </i-form-item>
              <i-form-item label="企业名称">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="营业执照注册号">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="组织机构代码">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="税务登记证号">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="统一社会信用代码">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="证照起始日期">
                <i-date-picker style="width:160px;"></i-date-picker>
              </i-form-item>
              <i-form-item label="证照结束日期">
                <i-date-picker style="width:160px;"></i-date-picker>
              </i-form-item>
              <i-form-item label="企业经营地址">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="企业注册地址">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="企业固定电话">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="经营范围">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="控股股东">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
            </i-form>
          </i-col>
          <i-col :span="12">
            <div style="text-align:center;width:100%;font-size:14px;font-weight:bold">企业法人信息</div>
            <i-form :label-width="100">
              <i-form-item label="法定代表人姓名">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="法人证件类型">
                <i-select style="width:160px;">
                  <i-option label="身份证" value="身份证" key="身份证"></i-option>
                </i-select>
              </i-form-item>
              <i-form-item label="法定证件号码">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="法人证件起始日期">
                <i-date-picker style="width:160px;"></i-date-picker>
              </i-form-item>
              <i-form-item label="法人证件结束日期">
                <i-date-picker style="width:160px;"></i-date-picker>
              </i-form-item>
              <i-form-item label="法定代表人手机号码">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="企业联系人姓名">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="联系人手机号">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="联系人邮箱">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
            </i-form>
            <div style="text-align:center;width:100%;font-size:14px;font-weight:bold">开户信息（取现账户）</div>
            <i-form :label-width="100">
              <i-form-item label="开户银行账户名">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="开户银行">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="开户银行账号">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="开户银行支行名称">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="开户银行省份">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
              <i-form-item label="开户银行城市">
                <i-input style="width:160px;"></i-input>
              </i-form-item>
            </i-form>
          </i-col>
        </i-row>
      </i-modal>
    </template>

    <template>
      <i-modal title="企业取现" v-model="getCashModal">
        <i-form :label-width="100">
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
            <i-select style="width:68%">
              <i-option label="(T+0)即时到账" value="(T+0)即时到账" key="(T+0)即时到账"></i-option>
              <i-option label="(T+1)普通取现，下一个工作日到账" value="(T+1)普通取现，下一个工作日到账" key="(T+1)普通取现，下一个工作日到账"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="取现金额">
            <i-input style="width:160px;"></i-input><span>元</span>
          </i-form-item>
          <i-form-item label="交易密码">
            <i-input style="width:160px;display:inline-block"></i-input>
            <i-button @click="setCode">设置交易密码</i-button>
          </i-form-item>
          <i-form-item label="商户收取服务费金额">
            <i-input style="width:160px;"></i-input><span>元</span>
          </i-form-item>
          <i-form-item label="商户收取服务费子账户号">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="手续服务费对象">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="手续费收取子账户">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="手续费金额">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
        </i-form>
      </i-modal>
    </template>

    <!--设置交易密码-->
    <template>
      <i-modal v-model="setCodeModal" title="设置交易密码">
        <i-form :label-width="100">
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
        <i-form :label-width="100">
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
            <i-input style="width:160px;"></i-input><span>元</span>
          </i-form-item>
          <i-form-item label="出账账户号">
            <i-input style="width:160px;"></i-input>
          </i-form-item>
          <i-form-item label="出账账户余额">
            <i-input style="width:160px;"></i-input><span>元</span>
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
            <i-input style="width:160px;"></i-input><span>元</span>
          </i-form-item>
          </i-form-item>
          <i-form-item label="转账金额">
            <i-input style="width:160px;"></i-input><span>元</span>
          </i-form-item>
        </i-form>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import BankCardInfo from "~/components/finance-manage/bank-card-info.vue";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({

    components: {
      DataBox
    }
  })
  export default class CompanyAccountList extends Page {
    private columns1: any;
    private data1: Array < Object > = [];
    private searchOptions: Boolean = false;
    private customName: String = "";
    private openColumnsConfig: Boolean = false;
    private columns2: any;
    private data2: Array < Object > = [];
    private data3: Array < Object > = [];
    private checkRadio: String = "融资租赁合同";
    private columns3: any;
    private addCompanyModal: Boolean = false;
    private getCashModal: Boolean = false;
    private setCodeModal: Boolean = false;
    private transferAccountModal: Boolean = false;

    /**
     * 转账
     */
    transferAccount() {
      this.transferAccountModal = true
    }
    /**
     * 开户
     */
    addCompany() {
      this.addCompanyModal = true
    }
    /**
     * 设置交易密码
     */
    setCode() {
      this.setCodeModal = true
    }
    created() {
      this.columns1 = [{
          align: "center",
          type: "index",
          width: 60,
          title: '序号'
        },
        {
          title: "操作",
          width: 220,
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("div", [
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.addCompanyModal = true
                    }
                  }
                },
                "修改开户"
              ),
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.getCashModal = true
                    }
                  }
                },
                "取现"
              )
            ]);
          }
        },
        {
          title: "查看",
          width: 240,
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("div", [
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.$Modal.info({
                        title: '银行卡详情',
                        // transfer:false,
                        render: h => h(BankCardInfo)
                      })
                    }
                  }
                },
                "银行卡详情"
              ),
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  },
                  on: {
                    click: () => {
                      this.addCompanyModal = true
                    }
                  }
                },
                "企业信息"
              )
            ]);
          }
        },
        {
          title: "用户客户号",
          align: "center",
          key: "userCustomerId"
        },
        {
          align: "center",
          title: "用户子账户号",
          key: "userSonAccountId"
        },
        {
          align: "center",
          title: "企业证照类型",
          key: "companyLicenseType"
        },
        {
          align: "center",
          title: "企业名称",
          key: "companyName"
        },
        {
          align: "center",
          title: "营业执照注册号",
          key: "businessLicenseId"
        },
        {
          align: "center",
          title: "审核状态",
          key: "approvalStatus"
        }
      ];
      this.columns2 = [{
          title: "序号",
          type: "index",
          width: "80",
          align: "center"
        },
        {
          title: "列名",
          key: "columnsName",
          align: "center"
        },
        {
          type: "selection",
          width: "80",
          align: "center"
        }
      ];
      this.columns3 = [{
          title: "文件名称",
          align: "center",
          key: "fileName"
        },
        {
          type: "selection",
          align: "center",
          width: "80"
        }
      ];
      this.data2 = [{
          columnsName: "用户客户号"
        },
        {
          columnsName: "用户子账户号"
        },
        {
          columnsName: "企业证照类型"
        },
        {
          columnsName: "企业名称"
        },
        {
          columnsName: "营业执照注册号"
        },
        {
          columnsName: "审核状态"
        }
      ];

      this.data3 = [{
          fileName: "融资租赁申请单"
        },
        {
          fileName: "融资租赁合同正文"
        },
        {
          fileName: "合同附件一(付款时间表)"
        },
        {
          fileName: "合同附件二(配偶确认书)"
        },
        {
          fileName: "合同附件三(共同承租人确认书)"
        },
        {
          fileName: "委托收款合同"
        },
        {
          fileName: "首付款明细"
        },
        {
          fileName: "服务确认书"
        },
        {
          fileName: "责任告知书"
        },
        {
          fileName: "车辆交接单"
        },
        {
          fileName: "车辆出库单"
        },
        {
          fileName: "补充协议（减免）"
        }
      ];

      this.data1 = [{
        userCustomerId: '612535456485',
        userSonAccountId: '6485',
        companyLicenseType: '三证合一企业',
        companyName: '开呗（上海）汽车租赁有限公司成都分公司',
        businessLicenseId: '91510107MA61UP7F8M',
        approvalStatus: '待审核'
      }, {
        userCustomerId: '612535456485',
        userSonAccountId: '6485',
        companyLicenseType: '三证合一企业',
        companyName: '开呗（上海）汽车租赁有限公司成都分公司',
        businessLicenseId: '91510107MA61UP7F8M',
        approvalStatus: '待审核'
      }, {
        userCustomerId: '612535456485',
        userSonAccountId: '6485',
        companyLicenseType: '三证合一企业',
        companyName: '开呗（上海）汽车租赁有限公司成都分公司',
        businessLicenseId: '91510107MA61UP7F8M',
        approvalStatus: '待审核'
      }]
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    oneKeyToConnect() {}
    columnsConfig() {
      this.openColumnsConfig = true;
    }
    /**
     * 多选
     */
    multipleSelect(selection) {}
    /**
     * 切换合同种类
     */
    changeCompactType(type) {
      if (type === "全款销售合同") {
        this.data3 = [{
            fileName: "融资租赁申请单"
          },
          {
            fileName: "融资租赁合同正文"
          },
          {
            fileName: "合同附件一(付款时间表)"
          },
          {
            fileName: "合同附件二(配偶确认书)"
          },
          {
            fileName: "合同附件三(共同承租人确认书)"
          }
        ];
      } else if (type === "长租合同（银行版）") {
        this.data3 = [{
            fileName: "融资租赁申请单"
          },
          {
            fileName: "融资租赁合同正文"
          },
          {
            fileName: "合同附件一(付款时间表)"
          },
          {
            fileName: "合同附件二(配偶确认书)"
          }
        ];
      } else if (type === "长租合同") {
        this.data3 = [{
            fileName: "长期租赁申请单"
          },
          {
            fileName: "长期租赁合同正文"
          },
          {
            fileName: "合同附件一(甲乙双方相关责任条款)"
          },
          {
            fileName: "合同附件二(车辆交接清单)"
          },
          {
            fileName: "委托收款合同"
          },
          {
            fileName: "车辆销售协议"
          },
          {
            fileName: "收款明细"
          },
          {
            fileName: "车辆出库单"
          },
          {
            fileName: "补充协议（减免）"
          }
        ];
      } else {
        this.data3 = [{
            fileName: "融资租赁申请单"
          },
          {
            fileName: "融资租赁合同正文"
          },
          {
            fileName: "合同附件一(付款时间表)"
          },
          {
            fileName: "合同附件二(配偶确认书)"
          },
          {
            fileName: "合同附件三(共同承租人确认书)"
          },
          {
            fileName: "委托收款合同"
          },
          {
            fileName: "首付款明细"
          },
          {
            fileName: "服务确认书"
          },
          {
            fileName: "责任告知书"
          },
          {
            fileName: "车辆交接单"
          },
          {
            fileName: "车辆出库单"
          },
          {
            fileName: "补充协议（减免）"
          }
        ];
      }
    }
    /**
     * 确定
     */
    confirm() {}
  }

</script>
