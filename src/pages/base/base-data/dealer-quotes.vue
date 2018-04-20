<!--经销商报价-->
<template>
  <section class="page dealer-quotes">
    <page-header title="经销商报价" hiddenPrint></page-header>
    <data-form hidden-date-search :model="busModal" :page="pageService" @on-search="seachBusiness">
      <template slot="input">
        <i-form-item prop="name" label="经销商">
          <i-input placeholder="请输入经销商" v-model="busModal.quotationName"></i-input>
        </i-form-item>
        <i-form-item prop="carBrandName" label="品牌">
          <i-input placeholder="请输入经销商" v-model="busModal.carBrandName"></i-input>
        </i-form-item>
        <i-form-item prop="carSeriesName" label="系列">
          <i-input placeholder="请输入经销商" v-model="busModal.carSeriesName"></i-input>
        </i-form-item>
        <i-form-item prop="carName" label="型号">
          <i-input placeholder="请输入经销商" v-model="busModal.carName"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :id="154" :columns="columns" :data="carList" @onPageChange="seachBusiness" :page="pageService"></data-box>
    <template>
      <i-modal v-model="editModal" title="编辑报价" width="600" :mask-closable="false" class="edit_class">
        <edit-car @seachBusiness="seachBusiness" @close="closeAndRefreshEdit" ref="edit-car"></edit-car>
        <div slot="footer">
          <i-button @click="cancelEditQuote">取消</i-button>
          <i-button class="blueButton" @click="confirmEditQuote">确定</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal v-model="addquoteModel" title="新增报价" width="600" @on-visible-change="addQuoteModalChange">
        <new-quote ref="new-quote" @seachBusiness="seachBusiness" @close="addquoteModel=false"></new-quote>
        <div slot="footer">
          <i-button @click="cancelAddQuote">取消</i-button>
          <i-button class="blueButton" @click="submitQuote">确定</i-button>
        </div>
      </i-modal>
    </template>
    <!-- <div class="bottom_addPrice">
      <i-button class="highButton" @click="addquoteFun">新增报价</i-button>
    </div> -->
    <!--新增报价-->
    <div class="submitBar">
      <i-row type="flex" align="middle">
        <i-col :span="1" :offset="23">
          <i-button @click="addquoteFun" class="highButton">新增报价</i-button>
        </i-col>
      </i-row>
    </div>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import SvgIcon from "~/components/common/svg-icon.vue";
  import EditCar from "~/components/base-data/edit-car.vue";
  import NewQuote from "~/components/base-data/new-quote.vue";

  import {
    Dependencies
  } from "~/core/decorator";
  import {
    CarQuotationService
  } from "~/services/manage-service/car-quotation.service";
  import {
    PageService
  } from "~/utils/page.service";

  @Component({
    components: {
      DataBox,
      SvgIcon,
      EditCar,
      NewQuote
    }
  })
  export default class AddPeriods extends Vue {
    @Dependencies(CarQuotationService)
    private carQuotationService: CarQuotationService;
    @Dependencies(PageService) private pageService: PageService;
    private columns: any;
    private status: Number = 0;
    private carList: Array < Object > = [];
    private busModal: any = {};
    private editModal: Boolean = false;
    private carInfo: any = {};
    private carformitem: any = {};
    private addquoteModel: Boolean = false;

    mounted() {
      this.seachBusiness();
    }
    created() {
      this.busModal = {
        productPackageName: "",
        carBrandName: "",
        carSeriesName: "",
        carName: "",
        quotationName: ""
      };
      this.carInfo = {
        id: "",
        productPackageName: "",
        carBrandId: "",
        carSeriesId: "",
        carName: "",
        carRemark: "",
        marketGuidingPrice: "",
        dealerGuidingPrice: "",
        firstPayment: "",
        financeAmount: "",
        periods: "",
        monthPay: "",
        purchaseTaxMoney: "",
        roadBridgeFee: "",
        annualAmount: "",
        gpsFee: "",
        otherFee: "",
        status: ""
      };
      this.columns = [{
          title: "操作",
          align: "center",
          fixed: "left",
          width: 250,
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
                      if (row.status === 0) {
                        this.$Modal.confirm({
                          title: "提示",
                          content: "您确定停用吗？",
                          onOk: () => {
                            this.stopCar(row);
                          }
                        });
                      } else if (row.status === 1) {
                        this.$Modal.confirm({
                          title: "提示",
                          content: "您确定启用吗？",
                          onOk: () => {
                            this.startCar(row);
                          }
                        });
                      }
                    }
                  }
                },
                row.status === 0 ? "停用" : "启用"
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
                      this.editQuotes(row);
                    }
                  }
                },
                "编辑"
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
                      this.$Modal.confirm({
                        title: "提示",
                        content: "您确定要删除吗？",
                        onOk: () => {
                          this.deleteCar(row);
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        },
        {
          title: "产品包名称",
          key: "productPackageName",
          align: "center",
          // fixed: "left",
          // width: 160,
          editable: true
        },
        {
          title: "经销商",
          key: "quotationName",
          align: "center",
          // fixed: "left",
          // width: 160,
          editable: true
        },
        {
          title: "品牌",
          key: "carBrandName",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "系列",
          key: "carSeriesName",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "型号",
          key: "carName",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "颜色",
          key: "carColor",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "市场指导价",
          key: "marketGuidingPrice",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "经销商价格",
          key: "dealerGuidingPrice",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "首期金额",
          key: "firstPayment",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "融资金额",
          key: "financeAmount",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "融资期数",
          key: "periods",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "租金（月）",
          key: "monthPay",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "购置税",
          key: "purchaseTaxMoney",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "路桥费",
          key: "roadBridgeFee",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "保险费",
          key: "annualAmount",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "GPS费",
          key: "gpsFee",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "其他费用",
          key: "otherFee",
          align: "center",
          // width: 160,
          editable: true
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          // width: 90,
          editable: true,
          render: (h, {
            row,
            column,
            index
          }) => {
            if (row.status == "0") {
              return h("span", {}, "已启用");
            } else if (row.status == "1") {
              return h("span", {}, "未启用");
            }
          }
        }
      ];
    }
    editQuotes(row) {
      this.editModal = true;
      // this.carformitem = row;
      let _edit: any = this.$refs["edit-car"];
      _edit.getAllProdPackage(row);
    }
    addQuoteModalChange() {
      let _addQuote: any = this.$refs["new-quote"];
      _addQuote.resetForm();
    }
    cancelAddQuote() {
      this.addquoteModel = false;
    }
    /**
     * 查询经销商报价
     */
    seachBusiness() {
      this.carQuotationService
        .getCarQuotationByConditionPage(this.busModal, this.pageService)
        .subscribe(
          val => {
            this.carList = val;
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    /**
     * 停用
     */
    stopCar(row) {
      this.carInfo = {
        id: row.id,
        status: 1
      };
      this.carQuotationService.updateCarQuotation(this.carInfo).subscribe(val => {
        this.$Message.success("已停用");
        this.seachBusiness();
      });
    }
    cancelEditQuote() {
      this.editModal = false;
      let _edit: any = this.$refs["edit-car"];
      _edit.resetInput();
    }
    confirmEditQuote() {
      let _edit: any = this.$refs["edit-car"];
      _edit.submitButton();
    }
    /**
     * 启用 start
     */
    startCar(row) {
      this.carInfo = {
        id: row.id,
        status: 0
      };
      this.carQuotationService.updateCarQuotation(this.carInfo).subscribe(val => {
        this.$Message.success("已启用!");
        this.seachBusiness();
      });
    }
    closeAndRefreshEdit() {
      this.editModal = false;
      this.seachBusiness();
    }
    /**@augments
     *删除
     */
    deleteCar(row) {
      this.carQuotationService
        .deleteCarQuotation({
          id: row.id
        })
        .subscribe(
          val => {
            this.$Message.success("删除成功！");
            this.seachBusiness();
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    /**
     * 新增报价
     */
    addquoteFun() {
      this.addquoteModel = true;
      let _addQuote: any = this.$refs["new-quote"];
      _addQuote.getAllProdPackage();
    }
    /**
     * 新增报价确定按钮
     */
    submitQuote() {
      let openQuote: any = this.$refs["new-quote"];
      openQuote.rulesFun();
      this.seachBusiness();
    }
    /**
     * 重置搜索
     */
    resetSeach() {
      this.busModal = {
        productPackageName: "",
        carBrandName: "",
        carSeriesName: "",
        carName: "",
        quotationName: ""
      };
    }
  }

</script>
<style lang="less" scope>
  .page.dealer-quotes {
    .form {
      margin-top: 10px;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      .title {
        margin-right: 10px;
      }
      .data-form {
        margin-top: 10px;
        display: flex;
        align-items: baseline;
        .data-form-item {
          width: 14%;
          margin-right: 20px;
          margin-left: 4px;
        }
      }
      .command {
        float: right;
        margin-right: 10px;
        margin-top: 10px;
        .command-item {
          font-size: 16px;
          cursor: pointer;
          display: inline-block;
          margin-left: 10px;
          color: #3367A7;
          span {
            font-size: 8px
          }
        }
      }
    }
  }

  .bottom_addPrice {
    width: 100%;
    height: 80px;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(221, 221, 221);
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    .blueButton {
      height: 40px;
      margin-right: 18px;
    }
  }

</style>
