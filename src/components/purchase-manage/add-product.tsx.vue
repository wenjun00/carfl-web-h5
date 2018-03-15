<template>
  <section class="component add-product">
    <i-row>
      <i-input style="display:inline-block;width:20%;margin-right:10px" placeholder="请输入关键字"></i-input>
      <i-button class="blueButton">搜索</i-button>
    </i-row>
    <i-row style="margin-top:10px;">
      <i-col :span="5" style="border:1px solid #DDDDDD;height:570px;overflow:auto" :class="{open:isShown,close:!isShown}">
        <i-tree :data="treeData" @on-select-change="productPlanissueDetail" style="padding:10px;"></i-tree>
      </i-col>
      <i-col :span="19">
        <i-row type="flex" justify="start">
          <i-col class="arrowButton" :span="2">
            <div :class="{arrowDown:!isShown,arrowUp:isShown}" @click="showCategory">
              <Icon type="android-arrow-dropleft-circle" color="white" size="16"></Icon>
            </div>
          </i-col>
          <i-col span="22" style="overflow:auto">
            <div style="margin-left:50px;font-size:16px;margin-bottom:10px"><span style="margin-right:200px;"><span style="color:#ccc">产品名称：</span>{{productDataModel?(productDataModel[0]?productDataModel[0].title:''):''}}</span>
              <span><span style="color:#ccc">资金渠道：</span>{{productDataModel?(productDataModel[0]?productDataModel[0].capitaChannels:''):''}}</span>
            </div>
            <div style="margin-bottom:20px;margin-left:50px;font-size:16px"><span style="color:#ccc">产品序号：</span>{{productDataModel?(productDataModel[0]?productDataModel[0].productNumber:''):''}}</div>
            <div style="position:relative;bottom:10px;padding-left:10px">
              <i-table height="500" highlight-row @on-current-change="currenttrablerowdata" :columns="carColumns" :data="carData" :page="pageService"></i-table>
            </div>
          </i-col>
        </i-row>
      </i-col>
    </i-row>
    <i-row style="margin-top:20px;">
      <i-button style="float:right" @click="confirmAndBackPrd" class="blueButton">确认并返回</i-button>
    </i-row>
  </section>
</template>

<script lang="tsx">
  import Vue from "vue";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    ApplyQueryService
  } from "~/services/business-service/apply-query.service";
  import {
    ProductService
  } from "~/services/manage-service/product.service";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    ProductPlanIssueService
  } from "~/services/manage-service/product-plan-issue.service";
  import {
    Emit
  } from "vue-property-decorator";
  import { Upload, Radio } from "iview";

  @Component({

    components: {
      DataBox
    }
  })
  export default class AddProduct extends Vue {
    @Dependencies(PageService) private pageService: PageService;
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    @Dependencies(ProductService) private productService: ProductService;
    @Dependencies(ProductPlanIssueService) private productPlanIssueService: ProductPlanIssueService;
    private isShown: Boolean = true;
    private carColumns: any;
    private carData: any = [];
    private checkRadio: String = ""
    private treeData: Array < any >= [];
    private allData: Array < any > = [];
    private productId: any = '';
    private AddProductData: any = {};
    private currentRow: any = {};
    private productPlanissueData: any = {};
    private productDataModel: any = [];

    @Prop() row: Object;
    @Emit('currentRowData')
    currentRowData(currentRow, data) {}
    @Emit('productPlanissue')
    productPlanissue(productPlanissueData) {}
    @Emit('close')
    close() {}

    created() {
      this.treeList()
      this.carColumns = [
              {
            align: 'center',
            title: '选择',
            width: 80,
            render: (h, {
              row,
              columns,
              index
            }) => {
            let radioChange=(status) => {
                this.carData.forEach(v=>v.radio=false)
                this.carData[index].radio = status
                this.carData = JSON.parse(JSON.stringify(this.carData))
            };
            return (<i-radio onOn-change={radioChange} value={row.radio}></i-radio>)
            }
          }, 
        {
          title: '期数(月)',
          key: 'periods',
          align: 'center',
          width: 100
        }, {
          title: '账期类型',
          key: 'periodType',
          align: 'center',
          width: 100,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.periodType));
          }
        }, {
          title: '产品利率',
          key: 'productRate',
          align: 'center',
          width: 100
        }, {
          title: '还款方式',
          key: 'payWay',
          align: 'center',
          width: 100,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.payWay));
          }
        }, {
          title: '融资金额(元)',
          key: 'financingAmount',
          align: 'center',
          width: 110
        }, {
          title: '首付款',
          key: 'initialPayment',
          align: 'center',
          width: 100
        }, {
          title: '保证金',
          key: 'depositCash',
          align: 'center',
          width: 100
        }, {
          title: '尾付款',
          key: 'finalCash',
          align: 'center',
          width: 100
        }, {
          title: '管理费',
          key: 'manageCost',
          align: 'center',
          width: 100
        }, {
          title: '状态',
          key: 'productStatus',
          align: 'center'
        }
      ]
    }


    showCategory() {
      this.isShown = !this.isShown
    }
    /**
     * 获取树形结构
     */
    treeList() {
      this.productService.getProductTree().subscribe(val => {
        this.allData = val;
        console.log(this.allData, 888888887777777)
        this.getTreeDate(this.allData);
      });
    }
    currenttrablerowdata(currentRow) {
      this.currentRow = currentRow
    }
    getTreeDate(allData) {
      //   let series: Map < number, any > = new Map();
      //   this.allData.map(t => {
      //     if (t.seriesId) {
      //       series.set(t.seriesId, t);
      //     }
      //   });
      //   this.categoryData = [];
      //   series.forEach(item => {
      //     let lv1Node = {
      //       title: item.seriesName,
      //       seriesId: item.seriesId,
      //       expand: true,
      //       children: this.getChilds(item.seriesId)
      //     };
      //     this.categoryData.push(lv1Node);
      //   });
      let root = allData.filter(v => !v.parent)
      console.log(root, 'root')
      this.treeData = []
      root.forEach(item => {
        console.log(item, 'item')
        let node1 = {
          //   seriesId: id
          title: item.name,
          seriesId: item.id,
          expand: true,
          productNumber: item.productNumber,
          capitaChannels: item.capitaChannels,
          children: this.getChild(item)
        }
        this.treeData.push(node1)
      })
    }
    getChild(item) {
      //   let prods = this.allData.filter(t => t.seriesId === id);
      //   let Lv2Nodes = prods.map(t => {
      //     return {
      //       title: t.productName,
      //       productId: t.productId
      //     };
      //   });
      //   return Lv2Nodes;
      let child: any = []
      this.allData.map(val => {
        if (item.id === val.parent) {
          if (val.flag === '产品') {
            let node2 = {
              title: val.name,
              productId: val.id,
              seriesId: val.parent,
              expand: true,
              series: item.name,
              productNumber: val.productNumber,
              capitaChannels: val.capitaChannels,
              children: this.getChild(val) // 迭代产生根
            }
            child.push(node2)
          } else if (val.flag === '产品系列') {
            let node2 = {
              title: val.name,
              seriesId: val.id,
              expand: true,
              series: item.name,
              productNumber: val.productNumber,
              capitaChannels: val.capitaChannels,
              children: this.getChild(val)
            }
            child.push(node2)
          }
        }
      })
      return child
    }
    /**
     * 根据产品树获取期数列表
     */
    productPlanissueDetail(data) {
      if (data[0].seriesId) {
        this.productId = data[0].seriesId
      }
      if (data[0].productId) {
        this.productId = data[0].productId
      }
      let productData: any = {
        productId: this.productId,
        status: 0
      }
      this.productPlanissue(data)
      this.productDataModel = data
      this.productPlanIssueService.getAllProductPlan(productData, this.pageService).subscribe(data => {
        this.carData = data
      });
    }
    /**
     * 确定并返回
     */
    confirmAndBackPrd() {
      let radioData:any=this.carData.find(v=>v.radio===true)
      if (radioData) {
        this.currentRowData(radioData, this.productDataModel[0])
        this.close()
      } else {
        this.$Message.error("请选择产品！");
      }
    }
  }

</script>
<style lang="less" scope>
  .open {
    max-width: auto;
    overflow: hidden;
  }
  
  .close {
    max-width: 0;
    min-width: 0;
    overflow: hidden;
  }
  
  .arrowUp {
    transform: rotate(0deg); // transition: transform ease-in 0.2s;
    cursor: pointer;
  }
  
  .arrowDown {
    transform: rotate(180deg); // transition: transform ease-in 0.2s;
    cursor: pointer;
  }
  
  .arrowButton {
    line-height: 570px;
    height: 100%;
    background: #265EA2;
    text-align: center;
    width: 20px;
  }

</style>
