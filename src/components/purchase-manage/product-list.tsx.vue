<template>
  <section class="component product-list row flex-nowrap">
    <div class="product-container">
      <i-tree :data="productDataSet" @on-select-change="onSelectProductChange" class="item-padding10"></i-tree>
    </div>
    <div class="col-span">
      <div class="product-info">
        <i-form>
          <i-row>
            <i-col :span="8">
              <i-form-item label="产品名称:">
                {{currentProduct.title}}
              </i-form-item>
            </i-col>
            <i-col :span="8">
              <i-form-item label="资金渠道:">
                {{$dict.getDictName(currentProduct.capitaChannels)}}
              </i-form-item>
            </i-col>
            <i-col :span="8">
              <i-form-item label="产品序号:">
                {{currentProduct.productNumber}}
              </i-form-item>
            </i-col>
          </i-row>
        </i-form>
      </div>
      <div class="period-table">
        <i-table height="500" highlight-row @on-current-change="onCurrentChange" :columns="periodColumns" :data="periodDataSet" :page="pageService"></i-table>
      </div>
    </div>
  </section>
</template>

<script lang="tsx">
import Vue from "vue";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { ApplyQueryService } from "~/services/business-service/apply-query.service";
import { ProductService } from "~/services/manage-service/product.service";
import { PageService } from "~/utils/page.service";
import { ProductPlanIssueService } from "~/services/manage-service/product-plan-issue.service";
import { Emit } from "vue-property-decorator";
import { Upload, Radio } from "iview";

@Component({
  components: {
    DataBox
  }
})
export default class ProductList extends Vue {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
  @Dependencies(ProductService) private productService: ProductService;
  @Dependencies(ProductPlanIssueService)
  private productPlanIssueService: ProductPlanIssueService;

  private currentRow: any = null;
  private currentProduct: any = {};
  private productDataSet: Array<any> = [];
  private periodDataSet: Array<any> = [];

  private periodColumns = [
    {
      title: "期数(月)",
      key: "periods",
      align: "center",
      width: 100,
      render: (h, { row, column, index }) => {
        return h("span", {}, this.$dict.getDictName(row.periods));
      }
    },
    {
      title: "账期类型",
      key: "periodType",
      align: "center",
      width: 100,
      render: (h, { row, column, index }) => {
        return h("span", {}, this.$dict.getDictName(row.periodType));
      }
    },
    {
      title: "产品利率",
      key: "productRate",
      align: "center",
      width: 100
    },
    {
      title: "还款方式",
      key: "payWay",
      align: "center",
      width: 100,
      render: (h, { row, column, index }) => {
        return h("span", {}, this.$dict.getDictName(row.payWay));
      }
    },
    {
      title: "融资金额(元)",
      key: "financingAmount",
      align: "center",
      width: 110
    },
    {
      title: "首付款",
      key: "initialPayment",
      align: "center",
      width: 100
    },
    {
      title: "保证金",
      key: "depositCash",
      align: "center",
      width: 100
    },
    {
      title: "尾付款",
      key: "finalCash",
      align: "center",
      width: 100
    },
    {
      title: "管理费",
      key: "manageCost",
      align: "center",
      width: 100
    }
  ];

  /**
   * 选中项更新
   */
  onCurrentChange(row) {
    row.productName = this.currentProduct.title;
    row.seriesName = this.currentProduct.series;
    this.currentRow = row;
  }

  /**
   * 获取产品数据
   */
  getProductData() {
    this.productService.getProductTree().subscribe(data => {
      this.productDataSet = this.getTreeDate(data);
    });
  }

  /**
   * 生成产品数据结构
   */
  getTreeDate(data) {
    let root = data.filter(v => !v.parent);

    let getChild = item =>
      data.filter(x => item.id === x.parent).map(x => ({
        title: x.name,
        productId: x.flag && x.flag === "产品" ? x.id : null,
        seriesId: x.parent,
        expand: true,
        series: item.name,
        productNumber: x.productNumber,
        capitaChannels: x.capitaChannels,
        children: getChild(x) // 迭代产生根
      }));

    return root.map(item => ({
      title: item.name,
      seriesId: item.id,
      expand: true,
      productNumber: item.productNumber,
      capitaChannels: item.capitaChannels,
      children: getChild(item)
    }));
  }

  /**
   * 根据产品树获取期数列表
   */
  onSelectProductChange([node]) {
    if (!node.productId) {
      return;
    }

    this.currentProduct = node;

    // 更新数据表
    this.productPlanIssueService
      .getAllProductPlan(
        {
          productId: node.productId,
          status: 0,
          isPublish: 360
        },
        this.pageService
      )
      .subscribe(data => {
        this.periodDataSet = data;
      });
  }

  mounted() {
    this.getProductData();
  }

  /**
   * 获取当前数据列
   */
  getCurrentRow() {
    return this.currentRow;
  }
}
</script>
<style lang="less" scoped>
.component.product-list {
  .product-container {
    width: 200px;
    flex-basis: 200px;
    border: solid 1px #ccc;
    margin-right: 10px;
    padding: 5px;
  }
}
</style>
