<!--抵押申请-->
<template>
  <section class="component mortgage-application">
    <i-card title="申请信息">
      <i-form :label-width="120" :model="applicationModel" :rules="applicationRules">
        <i-row>
          <i-col :span="12">
            <i-form-item label="申请省份" porp="province">
              <i-select v-model="applicationModel.province"></i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="申请城市" prop="city">
              <i-select v-model="applicationModel.city"></i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="所属公司">
              <i-select v-model="applicationModel.company"></i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="抵押贷款用途">
              <i-input v-model="applicationModel.mortgageUse"></i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="意向贷款金额">
              <i-input-number :min="0" v-model="applicationModel.intentionUse"></i-input-number>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="意向期限">
              <i-select v-model="applicationModel.intentionPeriods"></i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="意向抵押方式">
              <i-select v-model="applicationModel.intentionMethod"></i-select>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </i-card>

    <i-card title="押品信息">
      <template slot="extra">
        <command-button label="添加押品" icon="plus" @click="showMortgageCarList"></command-button>
      </template>
      <template>
        <i-table :columns="carColumns" :data="carDataSet"></i-table>
        <i-row>
          <i-col :span="6">
            合计数量: {{carDataSet.length}}
          </i-col>
          <i-col :span="6">
            合计数量(元): {{productModel.evaluateAmount|toThousands}}
          </i-col>
        </i-row>
      </template>
    </i-card>

    <i-card title="产品信息">
      <template slot="extra">
        <command-button label="添加产品" icon="plus" @click="onShowProductList"></command-button>
      </template>
      <template>
        <i-form :label-width="120" :model="productModel" :rules="productRules">
          <!--产品信息-->
          <i-row>
            <i-col :span="12">
              <i-form-item label="产品系列">
                <label>{{currentProduct?currentProduct.seriesName:""}}</label>
              </i-form-item>
            </i-col>
            <i-col :span="12">
              <i-form-item label="产品名称">
                <label>{{currentProduct?currentProduct.productName:""}}</label>
              </i-form-item>
            </i-col>
            <i-col :span="12">
              <i-form-item label="产品期数">
                <label>{{currentProduct?currentProduct.periodNumber:""}}</label>
              </i-form-item>
            </i-col>
            <i-col :span="12">
              <i-form-item label="产品利率">
                <label>{{currentProduct?currentProduct.productRate:""}}</label>
              </i-form-item>
            </i-col>
            <i-col :span="12">
              <i-form-item label="还款方式">
                <label>{{currentProduct?this.$dict.getDictName(currentProduct.payWay):""}}</label>
              </i-form-item>
            </i-col>
          </i-row>
          <!--产品输入金额-->
          <i-row>
            <i-col :span="12">
              <i-form-item label="抵押车辆估价(元)">
                <i-input-number readonly v-model="productModel.evaluateAmount" :formatter="this.$filter.moneyFormat" :parser="this.$filter.moneyParse"></i-input-number>
              </i-form-item>
            </i-col>
            <i-col :span="12">
              <i-form-item label="贷款总额(元)">
                <i-input-number v-model="productModel.loadAmount" :formatter="this.$filter.moneyFormat" :parser="this.$filter.moneyParse" @on-change="getComputedAmount"></i-input-number>
              </i-form-item>
            </i-col>
          </i-row>
          <!--产品计算金额-->
          <i-row>
            <i-col :span="12">
              <i-form-item label="月供金额(元)">
                <i-input-number readonly v-model="productModel.monthAmount" :formatter="this.$filter.moneyFormat" :parser="this.$filter.moneyParse"></i-input-number>
              </i-form-item>
            </i-col>
            <i-col :span="12">
              <i-col :span="12">
                <i-form-item label="管理费(元)">
                  <i-select :disabled="!currentProduct||currentProduct.manageRatioList.length===0" v-model="productModel.manageRatio" @on-change="getComputedAmount">
                    <template v-if="currentProduct">
                      <i-option v-for="item in currentProduct.manageRatioList" :key="item.value" :value="item.value" :label="item.label"></i-option>
                    </template>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col :span="12">
                <i-form-item :label-width="50">
                  <i-input-number readonly v-model="productModel.manageAmount" :formatter="this.$filter.moneyFormat" :parser="this.$filter.moneyParse"></i-input-number>
                </i-form-item>
              </i-col>
            </i-col>
            <i-col :span="12">
              <i-form-item label="GPS费用(元)">
                <i-input-number v-model="productModel.gpsAmount" :formatter="this.$filter.moneyFormat" :parser="this.$filter.moneyParse"></i-input-number>
              </i-form-item>
            </i-col>
            <i-col :span="12">
              <i-form-item label="其他费用(元)">
                <i-input-number v-model="productModel.otherAmount" :formatter="this.$filter.moneyFormat" :parser="this.$filter.moneyParse"></i-input-number>
              </i-form-item>
            </i-col>
            <i-col :span="12">
              <i-form-item label="备注">
                <i-input v-model="productModel.remark"></i-input>
              </i-form-item>
            </i-col>
          </i-row>
        </i-form>
      </template>
    </i-card>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import MortgageCarList from "~/components/purchase-manage/mortgage/mortgage-car-list.vue";
import ProductList from "~/components/purchase-manage/product-list.tsx.vue";
@Component({
  components: {}
})
export default class MortgageApplication extends Vue {
  // 当前产品
  private currentProduct = null;
  // 车辆押品列表
  private carDataSet: Array<any> = [];

  // 申请信息数据
  private applicationModel = {
    province: null,
    city: null,
    company: null,
    mortgageUse: null,
    intentionUse: null,
    intentionPeriods: null,
    intentionMethod: null
  };

  // 当前产品数据
  private productModel = {
    evaluateAmount: 0, // 估价金额
    monthAmount: 0, // 月供金额
    loadAmount: 0, // 贷款金额
    gpsAmount: 0, // gps金额
    manageRatio: null, // 管理费比例
    manageAmount: 0, // 管理金额
    otherAmount: 0, // 其他金额
    remark: "" // 备注
  };

  private applicationRules = {
    province: {
      type: "number",
      required: true,
      message: "请选择省份",
      trigger: "change"
    },
    city: {
      type: "number",
      required: true,
      message: "请选择城市",
      trigger: "change"
    },
    company: {
      type: "number",
      required: true,
      message: "请选择所属公司",
      trigger: "change"
    },
    mortgageUse: {
      required: true,
      message: "请填写抵押贷款用途",
      trigger: "blur"
    },
    intentionUse: {
      required: true,
      type: "number",
      message: "请填写意向贷款金额",
      trigger: "change"
    },
    intentionPeriods: {
      required: true,
      type: "number",
      message: "请填写意向期限",
      trigger: "change"
    },
    intentionMethod: {
      required: true,
      type: "number",
      message: "请填写意向抵押方式",
      trigger: "change"
    }
  };

  // 产品数据校验
  private productRules = {};

  // 车辆列配置
  private carColumns = [
    {
      title: "操作",
      align: "center",
      width: 80,
      render: (h, { row, index }) => {
        return h("command-button", {
          props: {
            label: "删除"
          },
          on: {
            click: () => {
              this.onDeleteCar(index);
            }
          }
        });
      }
    },
    {
      title: "品牌",
      align: "center",
      key: "brandName"
    },
    {
      title: "系列",
      align: "center",
      key: "seriesName"
    },
    {
      title: "型号",
      align: "center",
      key: "carName"
    },
    {
      title: "车身颜色",
      align: "center",
      key: "carColor"
    },
    {
      title: "车辆排量",
      align: "center",
      key: "displacement"
    },
    {
      title: "车辆牌照",
      align: "center",
      key: "carNo"
    },
    {
      title: "行驶里程(公里)",
      align: "center",
      key: "mileage"
    },
    {
      title: "评估价(元)",
      align: "center",
      key: "evaluation",
      render: (h, { row }) =>
        h("span", this.$filter.toThousands(row.evaluation))
    }
  ];

  /**
   * 删除车辆
   */
  onDeleteCar(index) {
    this.$Modal.confirm({
      title: "提示",
      content: "确定删除吗？",
      onOk: () => {
        this.carDataSet.splice(index, 1);
      }
    });
  }

  /**
   * 显示质押车辆列表
   */
  private showMortgageCarList() {
    let dialog = this.$dialog.show({
      title: "销售员列表",
      footer: true,
      onOk: mortgageCarList => {
        let currentSelection = mortgageCarList.getCurrentSelection();
        if (!currentSelection || currentSelection.length === 0) {
          this.$Message.error("请选择待添加的押品");
          return false;
        }

        this.carDataSet = [...this.carDataSet, ...currentSelection];
      },
      render: h => {
        return h(MortgageCarList, {
          props: {
            cardNumber: "123"
          }
        });
      }
    });
  }

  /**
   * 格式化产品数据
   */
  formatProductModal(product) {
    let formatRadio = x => {
      if (!x) return [];

      return x.split(";").map(item => ({
        label: `${item}%`,
        value: item / 100
      }));
    };

    product.manageRatioList = formatRadio(product.manageCost); // 管理费
    product.periodNumber = parseInt(this.$dict.getDictName(product.periods)); // 管理费

    return product;
  }

  /**
   * 显示产品列表
   */
  onShowProductList() {
    let dialog = this.$dialog.show({
      title: "选择产品",
      footer: true,
      onOk: productList => {
        let currentRow = productList.getCurrentRow();

        if (currentRow) {
          // 转换数据产品信息数据格式
          this.currentProduct = this.formatProductModal(currentRow);
          this.currentProduct.productIssueId = currentRow.id;
        } else {
          this.$Message.error("请选择对应的产品");
          return false;
        }
      },
      onCancel: () => {},
      render: h => {
        return h(ProductList, {});
      }
    });
  }

  @Watch("carDataSet")
  onCarDataSetChange() {
    this.productModel.evaluateAmount = this.carDataSet
      .map(x => x.evaluation)
      .reduce((x, y) => x + y);
  }

  /**
   * 获取计算金额
   */
  getComputedAmount() {
    // 管理费 = 贷款总额x管理费比例
    this.productModel.manageAmount =
      this.productModel.loadAmount * (this.productModel.manageRatio || 0);

    // 月供金额 = 贷款总额x (1+月利率x期数)/期数
    this.productModel.monthAmount =
      this.productModel.loadAmount *
      (1 + this.currentProduct.productRate * this.currentProduct.periodNumber) /
      this.currentProduct.periodNumber;
  }
}
</script>
  
<style lang="less" scoped>
.component.mortgage-application {
}
</style>
