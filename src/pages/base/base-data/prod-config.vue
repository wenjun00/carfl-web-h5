<!--产品配置-->
<template>
    <section class="page prod-config">
        <i-row style="margin-top:20px;">
            <span style="font-size:18px;font-weight:bold;margin-left:8px;">产品配置</span>
            <i-row>
                <i-col :span="5" style="margin-left:10px;">
                    <div style="width:250px;height:30px;border:1px solid #999999;line-height:30px;font-size:16px;">
                        <div style="width: 4px; height: 15px; background: rgb(38, 94, 162); display: inline-block; margin-left:10px;position:relative;top:2px;"></div>
                        <span style="position:relative;left:5px;">产品类目</span>
                        <div style="float:right;display:inline-block;font-weight:bold">
                            <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)">
                                <svg-icon iconClass="tianjiawenjian"></svg-icon>
                            </div>
                            <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)">
                                <svg-icon iconClass="tianjiawenjianjia"></svg-icon>
                            </div>
                            <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)">
                                <svg-icon iconClass="sousuo"></svg-icon>
                            </div>
                        </div>
                    </div>
                    <div style="width:250px;height:600px;border-left:1px solid #999999;border-right:1px solid #999999;border-bottom:1px solid #999999;position:relative;bottom:8px;">
                        <i-tree :data="treeData"></i-tree>
                    </div>
                </i-col>
                <i-col :span="18" style="overflow:auto">
                    <i-row>
                        <i-col :span="12">
                            <data-grid :labelWidth="100" labelAlign="left" contentAlign="left;">
                                <data-grid-item label="产品名称" :span="12">
                                    <span>群泰融资</span>
                                </data-grid-item>
                                <data-grid-item label="产品序号" :span="12">
                                    <span>QTP0001</span>
                                </data-grid-item>
                            </data-grid>
                        </i-col>
                        <i-col :span="12">
                            <span style="margin-left:20px;font-size:14px;">租金渠道选择：</span>
                            <RadioGroup v-model="rentCheck">
                                <Radio label="自有资金"></Radio>
                                <Radio label="第三方"></Radio>
                            </RadioGroup>
                            <i-button class="blueButton" @click="customerFodderConfig" v-if="customerFodderConfigFlag">
                                <span></span>客户素材配置</i-button>
                            <i-button class="blueButton" @click="customerFodderConfig" v-if="alreadyConfigFlag">已配置</i-button>
                            <!--<i-button class="blueButton" @click="chargeAgainstOrderConfig">冲抵顺序配置</i-button>-->
                        </i-col>
                    </i-row>
                    <i-row :gutter="10" style="margin-top:20px;min-width:1366px">
                        <i-col :span="7">
                            <div class="addPeriods" @click="addPeriods">
                                <div>
                                    <i-icon type="plus" style="font-size:50px;"></i-icon>
                                    <p>添加新增期数</p>
                                </div>
                            </div>
                        </i-col>
                        <i-col :span="7" v-for="item in prdConfig" :key="item.id" style="margin-bottom:10px;">
                            <div>
                                <div class="boxContainerTitle">
                                    <div style="height:48px;display:inline-block;position:relative;bottom:2px;font-size:12px;margin-left:10px;">No.{{item.number}}</div>
                                    <div style="position:relative;left:63px;display:inline-block">
                                        <span style="font-size:18px;font-weight:bold;">{{item.month}}</span>
                                        <span>月/期</span>
                                    </div>
                                    <div :class="[item.publishStatus==='未发布'?'pulishCss':'Publish']">
                                    </div>
                                </div>
                                <div class="boxContainerContent">
                                    <div class="itemContainer">
                                        <span class="itemName">账期类型</span>
                                        <span class="item">{{item.accountType}}</span>
                                    </div>
                                    <div class="itemContainer">
                                        <span class="itemName">产品利率</span>
                                        <span class="item">{{item.prdInterest}}</span>
                                    </div>
                                    <div class="itemContainer">
                                        <span class="itemName">还款方式</span>
                                        <span class="item">{{item.payType}}</span>
                                    </div>
                                    <div class="itemContainer">
                                        <span class="itemName">融资金额</span>
                                        <span class="item">{{item.financeMoney}}</span>
                                    </div>
                                    <div class="itemContainer">
                                        <span class="itemName">首付款</span>
                                        <span class="item">{{item.initialMoney}}</span>
                                    </div>
                                    <div class="itemContainer">
                                        <span class="itemName">保证金</span>
                                        <span class="item">{{item.promiseMoney}}</span>
                                    </div>
                                    <div class="itemContainer">
                                        <span class="itemName">尾付款</span>
                                        <span class="item">{{item.resuideMoney}}</span>
                                    </div>
                                    <div class="itemContainer">
                                        <span class="itemName">管理费</span>
                                        <span class="item">{{item.manageMoney}}</span>
                                    </div>
                                    <div v-if="item.publishStatus==='已发布'" class="itemContainer">
                                        <span class="itemName">停用/启用</span>
                                        <i-switch class="item"></i-switch>
                                    </div>
                                    <div v-if="item.publishStatus==='未发布'" class="itemContainer">
                                        <span class="itemName">操作</span>
                                        <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;">
                                            <svg-icon iconClass="tianxie" class="item"></svg-icon>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="item.publishStatus==='未发布'" style="width:300px;height:50px;border: 1px solid rgb(221, 221, 222);background:rgb(245,245,245);text-align:center;cursor:pointer;position:relative;bottom:20px;border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;" @click="publish">
                                    <span style="line-height:50px;font-size:14px;color:rgb(104, 138, 188);">发布</span>
                                </div>
                                <div v-if="item.publishStatus==='已发布'" style="width:300px;height:50px;border: 1px solid rgb(221, 221, 222);background:rgb(245,245,245);text-align:center;cursor:pointer;position:relative;bottom:20px;border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;">
                                    <span style="line-height:50px;font-size:14px;color:rgb(104, 138, 188);">查看</span>
                                </div>
                            </div>
                        </i-col>
                    </i-row>
                </i-col>
            </i-row>
        </i-row>

        <template>
            <i-modal title="客户素材配置" v-model="customerFodderConfigModal" :width="300">
                <i-tree :data="customerFodderTree" show-checkbox></i-tree>
            </i-modal>
        </template>

        <template>
            <i-modal title="发布" :width="350" v-model="confirmPublishModal">
                <span>是否确定发布？</span>
            </i-modal>
        </template>

        <template>
            <i-modal v-model="addPeriodsModal" title="新增期数" width="900">
                <add-periods></add-periods>
            </i-modal>
        </template>

        <template>
            <i-modal v-model="chargeAgainstOrderConfigModal" title="冲抵顺序配置" width="900">
                <charge-against-order></charge-against-order>
            </i-modal>
        </template>
    </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import SvgIcon from "~/components/common/svg-icon.vue";
import AddPeriods from "~/components/base-data/add-periods.vue";
import ChargeAgainstOrder from "~/components/base-data/charge-against-order.vue";
import { Dependencies } from "~/core/decorator";
import { DataGrid, DataGridItem } from "vue-fintech-component";
import { Layout } from "~/core/decorator";
import { ProductService } from "~/services/manage-service/product.service";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon,
    DataGrid,
    DataGridItem,
    AddPeriods,
    ChargeAgainstOrder
  }
})
export default class ProdConfig extends Page {
  @Dependencies(ProductService) private productService: ProductService;
  private columns1: any;
  private data1: Array<Object> = [];
  private maintains: Array<any> = [];
  private treeData: Array<any> = [];
  private rentCheck: String = "自有资金";
  private prdConfig: Array<any> = [];
  private customerFodderTree: Array<any> = [];
  private searchOptions: Boolean = false;
  private confirmPublishModal: Boolean = false;
  private customerFodderConfigModal: Boolean = false;
  private addPeriodsModal: Boolean = false;
  private checkId: Number = 1;
  private chargeAgainstOrderConfigModal: Boolean = false;
  private customerFodderConfigFlag: Boolean = true;
  private alreadyConfigFlag: Boolean = false;
  private allDate: any;

  /**
   * 新增期数
   */
  addPeriods() {
    // this.$Modal.info({
    //   title: '新增期数',
    //   width: '900',
    //   render: h => h(AddPeriods)
    // })
    this.addPeriodsModal = true;
  }
  /**
   * 客户素材配置
   */
  customerFodderConfig() {
    this.customerFodderConfigFlag = false;
    this.alreadyConfigFlag = true;
    this.customerFodderConfigModal = true;
  }
  created() {
    this.treeList();
    this.customerFodderTree = [
      {
        title: "全选",
        expand: true,
        children: [
          {
            title: "个人基本资料",
            expand: true,
            children: [
              {
                title: "身份证"
              },
              {
                title: "户口本"
              },
              {
                title: "结婚证"
              }
            ]
          },
          {
            title: "资产证明"
          },
          {
            title: "银行流水"
          },
          {
            title: "征信"
          },
          {
            title: "职业证明"
          },
          {
            title: "其他"
          }
        ]
      }
    ];
    this.prdConfig = [
      {
        id: 1,
        number: "001",
        month: "12",
        accountType: "固定账期（5日）",
        prdInterest: "0.99%/月",
        payType: "等本等息",
        financeMoney: "100000~200000",
        initialMoney: "0%~25%",
        promiseMoney: "0",
        resuideMoney: "0",
        manageMoney: "0",
        publishStatus: "已发布"
      },
      {
        id: 2,
        number: "002",
        month: "12",
        accountType: "固定账期（5日）",
        prdInterest: "0.99%/月",
        payType: "等本等息",
        financeMoney: "100000~200000",
        initialMoney: "0%~25%",
        promiseMoney: "0",
        resuideMoney: "0",
        manageMoney: "0",
        publishStatus: "已发布"
      },
      {
        id: 3,
        number: "003",
        month: "12",
        accountType: "固定账期（5日）",
        prdInterest: "0.99%/月",
        payType: "等本等息",
        financeMoney: "100000~200000",
        initialMoney: "0%~25%",
        promiseMoney: "0",
        resuideMoney: "0",
        manageMoney: "0",
        publishStatus: "未发布"
      },
      {
        id: 4,
        number: "004",
        month: "12",
        accountType: "固定账期（5日）",
        prdInterest: "0.99%/月",
        payType: "等本等息",
        financeMoney: "100000~200000",
        initialMoney: "0%~25%",
        promiseMoney: "0",
        resuideMoney: "0",
        manageMoney: "0",
        publishStatus: "未发布"
      }
    ];

    this.treeData = [
      {
        title: "直租",
        expand: true,
        render: (h, { root, node, data }) => {
          return h("span", [
            h("span", [
              h("Icon", {
                props: {
                  type: "ios-folder-outline"
                },
                style: {
                  marginRight: "8px",
                  color: "#265ea2"
                }
              }),
              h("span", data.title)
            ]),
            h("span", {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            })
          ]);
        },
        children: [
          {
            title: "群泰融租"
          },
          {
            title: "开呗长租"
          },
          {
            title: "龙江"
          }
        ]
      }
    ];
    this.maintains = [
      {
        id: 1,
        name: "个人基本资料"
      },
      {
        id: 2,
        name: "资产证明"
      },
      {
        id: 3,
        name: "银行流水"
      },
      {
        id: 4,
        name: "征信"
      },
      {
        id: 5,
        name: "职业证明"
      },
      {
        id: 6,
        name: "其他"
      }
    ];
    this.columns1 = [
      {
        title: "序号",
        width: 60,
        type: "index",
        align: "center"
      },
      {
        title: "操作",
        align: "center",
        render: (h, { row, column, index }) => {
          return h("div", [
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                }
              },
              "编辑"
            ),
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                }
              },
              "删除"
            )
          ]);
        }
      },
      {
        title: "名称",
        key: "maintainName",
        align: "center"
      },
      {
        title: "是否上传",
        key: "isUpload",
        align: "center",
        render: (h, { row, columns, index }) => {
          return h(
            "RadioGroup",
            {
              props: {
                value: 1
              }
            },
            [
              h("Radio", {
                props: {
                  label: "是",
                  value: 1
                }
              }),
              h("Radio", {
                props: {
                  label: "否",
                  value: 2
                }
              })
            ]
          );
        }
      }
    ];

    this.data1 = [
      {
        maintainName: "身份证"
      }
    ];
  }
  getOrderInfoByTime() {}
  openSearch() {
    this.searchOptions = !this.searchOptions;
  }
  exportMonthReport() {}
  checkMaintain(item) {
    this.checkId = item.id;
  }
  publish() {
    this.confirmPublishModal = true;
  }
  chargeAgainstOrderConfig() {
    this.chargeAgainstOrderConfigModal = true;
  }
  /**
   * 获取树形结构
   */
  treeList() {
    this.productService.getAllProduct().subscribe(val => {
      this.allDate = val.object;
      this.getTreeDate();
    });
  }
  getTreeDate() {
    this.allDate.map(v => {
      console.log(v);
    });

  }
}
</script>
<style lang="less">
.prod-config {
  height: 100%;
}

.maintainCss {
  background: #e4f4fa;
}

.boxContainerContent {
  width: 300px;
  height: 370px;
  border-left: 1px solid rgb(221, 221, 222);
  border-right: 1px solid rgb(221, 221, 222);
}

.boxContainerContent .itemContainer:first-child {
  padding-top: 35px;
}

.itemContainer {
  margin: 0 15px 15px 15px;
  display: flex;
  justify-content: space-between;
}

.itemName {
  color: #999999;
}

.item {
  margin-left: 20px;
}

.addPeriods {
  width: 300px;
  height: 450px;
  border: 1px solid rgb(221, 221, 222);
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.addPeriods > div {
  width: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: rgb(169, 168, 170);
}

.pulishCss {
  background: url("./../../../../static/images/common/no-publish.png") no-repeat;
  width: 90px;
  height: 90px;
  position: relative;
  left: 228px;
  bottom: 39px;
  z-index: 999;
}

.Publish {
  background: url("./../../../../static/images/common/publish.png") no-repeat;
  width: 90px;
  height: 90px;
  position: relative;
  left: 228px;
  bottom: 39px;
  z-index: 999;
}

.boxContainerTitle {
  width: 300px;
  height: 50px;
  border: 1px solid rgb(221, 221, 222);
  border-top: 2px solid rgb(104, 138, 188);
  line-height: 50px;
  background: rgb(245, 245, 245);
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
</style>
