<template>
  <section class="page personal-mortgage-application">
    <page-header title="个人抵押贷款申请">
      <command-button type="text" label="业务流程图" @click="onShowBusinessFlow"></command-button>
    </page-header>

    <i-form v-model="basisModel" :rules="basisRules" :label-width="120">
      <i-row>
        <i-col :span="12">
          <i-form-item label="证件号码" prop="cardNumber">
            <i-input v-model="basisModel.cardNumber"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="企业名称">
            <i-input v-model="basisModel.customterName"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="手机号码">
            <i-input v-model="basisModel.phoneNumber"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="归属业务员">
            <i-input v-model="basisModel.saler.userRealname" @on-focus="onShowSalerList" readyonly></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>

    <i-tabs>
      <i-tab-pane v-for="(tab,index) in applicationTabs" :key="tab.name" :label="tab.label" :name="tab.name" :disabled="currentStep<index">
        <component :is="tab.name" :ref="tab.name"></component>
      </i-tab-pane>
    </i-tabs>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import { Layout } from "~/core/decorator";
import SalesmanName from "~/components/purchase-manage/salesman-name.vue";
import PersonalCustomerInfo from "~/components/customer/personal/personal-customer-info.vue";
import MortgageApplication from "~/components/purchase-manage/mortgage/mortgage-application.vue";
@Layout("workspace")
@Component({
  components: {
    MortgageApplication,
    PersonalCustomerInfo
  }
})
export default class PersonalMortgageApplication extends Page {
  private currentStep = -1;

  // 基础数据表单
  private basisModel = {
    cardNumber: "", // 证件号码
    customterName: "", // 企业名称
    phoneNumber: "", // 手机号码
    saler: {} // 销售员
  };

  // 基础数据验证
  private basisRules = {
    cardNumber: [
      {
        required: true,
        message: "请输入证件号码",
        trigger: "blur"
      },
      {
        validator: this.$validator.idCard,
        trigger: "blur"
      }
    ],
    customterName: [
      {
        required: true,
        message: "请输入企业姓名",
        trigger: "change"
      }
    ],
    phoneNumber: [
      {
        required: true,
        message: "请输入客户电话",
        trigger: "change"
      },
      {
        validator: this.$validator.phoneNumber,
        trigger: "blur"
      }
    ],
    saler: [
      {
        required: true,
        message: "请选择归属业务员",
        trigger: "change"
      }
    ]
  };

  // 业务选项卡列表
  private applicationTabs = [
    {
      name: "mortgage-application",
      label: "申请资料"
    },
    {
      name: "personal-customer-info",
      label: "客户资料"
    }
    // {
    //   name: "customer-job",
    //   label: "客户职业"
    // },
    // {
    //   name: "customer-account",
    //   label: "客户联系人"
    // },
    // {
    //   name: "customer-origin",
    //   label: "客户来源"
    // }
  ];

  /**
   * 查看业务流程图
   */
  private onShowBusinessFlow() {
    this.$dialog.show({
      width: "90%",
      render: h => {
        return h(
          "div",
          {
            style: {
              overflow: "auto"
            }
          },
          [
            h("img", {
              attrs: {
                src: "/static/images/common/yewuliucheng-bg.jpg"
              }
            })
          ]
        );
      }
    });
  }

  onShowSalerList() {
    let dialog = this.$dialog.show({
      title: "销售员列表",
      footer: true,
      onOk: salesmanName => {
        let currentRow = salesmanName.getCurrentRow();
        if (!currentRow) {
          this.$Message.error("请选择对应销售员");
          return false;
        }

        // 更新销售人员信息
        this.basisModel.saler = currentRow;
        // .salesmanName = currentRow.userRealname;
        // this.customerModel.salesmanId = currentRow.id;
      },
      render: h => {
        return h(SalesmanName);
      }
    });
  }
}
</script>
<style lang="less" scoped>
.page.personal-mortgage-application {
  & > * {
    margin-bottom: 10px;
  }
}
</style>
