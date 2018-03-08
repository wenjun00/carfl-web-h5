<!--客户还款查询（客户结算号）-->
<template>
  <section class="component customer-settle-modal">
    <i-select style="margin-top:10px;" v-model="settleChannel" @on-change="changeSettle">
      <i-option label="汇付" :key="162" :value="162"></i-option>
      <i-option label="富友" :key="163" :value="163"></i-option>
      <i-option label="对公转账" :key="164" :value="164"></i-option>
    </i-select>
    <data-grid style="margin-top:10px;" :labelWidth="120">
      <data-grid-item label="账户类型" :span="12">
        <template>
          <div>
            <span>{{customerSettleModel.personalBank?$dict.getDictName(customerSettleModel.personalBank.accountType):''}}</span>
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="客户姓名" :span="12">
        <template>
          <div>
            <span>{{customerSettleModel.personalName?customerSettleModel.personalName:''}}</span>
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="客户联系电话" :span="12">
        <template>
          <div>
            <span>{{customerSettleModel.personalName?customerSettleModel.mobilePhone:''}}</span>
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="身份证号码" :span="12">
        <template>
          <div>
            <span>{{customerSettleModel.personalName?customerSettleModel.idCard:''}}</span>
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="开户银行" :span="12">
        <template>
          <div>
            <span>{{customerSettleModel.personalBank?customerSettleModel.personalBank.depositBank:''}}</span>
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="开户省市" :span="12">
        <template>
          <div>
            <span>{{customerSettleModel.personalBank?customerSettleModel.personalBank.depositCity:''}}</span>
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="银行卡号" :span="12">
        <template>
          <div>
            <span>{{customerSettleModel.personalBank?customerSettleModel.personalBank.cardNumber:''}}</span>
          </div>
        </template>
      </data-grid-item>
      <data-grid-item label="银行预留手机号" :span="12">
        <template>
          <div>
            <span>{{customerSettleModel.personalBank?customerSettleModel.personalBank.reservedPhoneNumber:''}}</span>
          </div>
        </template>
      </data-grid-item>
    </data-grid>
    <!--<i-button class="blueButton" @click="closeModal" style="position:absolute;margin-left:50%;margin-top:20px;">关闭</i-button>-->
  </section>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Emit } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { PersonalService } from "~/services/manage-service/personal.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import Vue from "vue";

@Component({
  components: {
    DataGrid,
    DataGridItem
  }
})
export default class CustomerSettleModal extends Vue {
  @Dependencies(PersonalService) private personalService: PersonalService;

  @Emit("closeModal")
  closeCustomerModal() {}
  private customerSettleModel: any = {
    personalBank: {
      settleChannel: ""
    }
  };
  private clientNumber: number = 0;
  private settleChannel: number = 0;
  activated() {}
  created() {}
  /**
   * 关闭
   */
  closeModal() {
    this.closeCustomerModal();
  }
  /**
   * 客户结算号
   */
  getCustomerSettleObj(row) {
    this.clientNumber = row.clientNumber;
    this.settleChannel = row.settlementChannel;
    this.personalService
      .getBankByClientNumber({
        clientNumber: this.clientNumber,
        settleChannel: this.settleChannel
      })
      .subscribe(
        data => {
          this.customerSettleModel = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * select的Change事件
   */
  changeSettle(val) {
    this.personalService
      .getBankByClientNumber({
        clientNumber: this.clientNumber,
        settleChannel: this.settleChannel
      })
      .subscribe(
        data => {
          this.customerSettleModel = data;
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
}
</script>
<style>

</style>
