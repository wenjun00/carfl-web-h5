<!--转交记录-->
<template>
  <section class="component transfer-record">
    <div>
      <span class="item-margin-left10">客户姓名：</span>
      <span>{{customerName}}</span>
      <div class="item-kehu-div">
        <span>订单编号：</span>
        <span>{{orderId}}</span>
      </div>
    </div>
    <i-table :columns="columns1" :data="transferrecordDataSet"></i-table>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import SvgIcon from "~/components/common/svg-icon.vue";
import DataBox from "~/components/common/data-box.vue";
import SimulateCalculate from "~/components/common/simulate-calculate.vue";
import { ProductOrderService } from "~/services/manage-service/product-order.service";
import { FilterService } from "~/utils/filter.service";
import { Prop } from "vue-property-decorator";
import { PageService } from "~/utils/page.service";

@Component({
  components: {
    SvgIcon,
    DataBox
  }
})
export default class TransferRecord extends Vue {
  @Dependencies(ProductOrderService)
  private productOrderService: ProductOrderService;
  @Dependencies(PageService) private pageService: PageService;

  private columns1: any;
  private transferrecordDataSet: Array<Object> = [];
  private id: Number = 0;
  private transferModel: Object = {
    customerName: "",
    orderId: ""
  };

  @Prop() customerName: String;

  @Prop() orderId: String;

  created() {
    this.transferModel = {
      customerName: this.customerName,
      orderId: this.orderId
    };

    this.columns1 = [
      {
        title: "序号",
        type: "index",
        align: "center",
        width: 60
      },
      {
        title: "转交日期",
        key: "handoverDate",
        align: "center",
        width: 160,
        render: (h, { row, columns, index }) => {
          return h(
            "span",
            FilterService.dateFormat(row.handoverDate, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        title: "制单人",
        key: "recoderName",
        align: "center"
      },
      {
        title: "转交人",
        key: "transferName",
        align: "center"
      }
    ];

    //   this.data1 = [{
    //     transferDate: '2017-07-24 15:12:35',
    //     makePerson: '胡开甲',
    //     transferPerson: '朱晨通'
    //   }, {
    //     transferDate: '2017-07-24 15:12:35',
    //     makePerson: '李驰',
    //     transferPerson: '李楠'
    //   }]
  }
  refreshData(id) {
    this.id = id;
    let transferrecord: any = {
      orderId: id
    };
    this.productOrderService.findOrderHandoverHistory(transferrecord).subscribe(
      data => {
        console.log(data, 98);
        this.transferrecordDataSet = data.handoverHistoryVos;
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }
}
</script>

<style lang="less" scoped>
  .component.transfer-record{
    .item-margin-left10{
      margin-left:10px;
    }
    .item-kehu-div{
      float:right;display:inline-block;margin-right:10px;
    }
  }
.choose-buy-materials {
  .ivu-select-selection {
    width: 240%;
    display: inline-block;
    border-style: none;
    border-bottom-style: solid;
    border-radius: 0;
  }
}

.calculate {
  .ivu-modal-footer {
    display: none !important;
  }
}
</style>
