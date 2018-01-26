<!--流程配置-->
<template>
  <section class="page flow-config">
    <span class="form-title">审批流程配置</span>
    <i-row :gutter="20">
      <i-col :span="4" style="border:1px solid #F2F2F2;height:500px;margin-left:30px;">
        <div style="font-size:14px;font-weight:bold">产品分类</div>
        <i-tree :data="treeData"></i-tree>
      </i-col>
      <i-col :span="19">
        <div class="rightPageContainer">
          <div style="width:80%;height:80px;background:#F2F2F2;display:flex;align-items:center">
            <div class="prdName">
              <span>群泰融资</span>
            </div>
            <div style="font-size:30px;">群泰融资</div>
          </div>
          <div v-for="item in approvaFlowList" :key="item.index" class="approvalContainer">
            <div style="display:inline-block;margin-left:40px;">{{item.index}}</div>
            <div style="display:inline-block;margin-left:40px;">{{item.approvalName}}</div>
            <div class="verticalLine"></div>
            <div style="margin-left:40px;cursor:pointer" @click="approvalMoveUp()">
              <Icon type="arrow-up-b" size="20"></Icon>
            </div>
            <div style="margin-left:40px;cursor:pointer" @click="approvalMoveDown()">
              <Icon type="arrow-down-b" size="20"></Icon>
            </div>
            <div style="margin-left:40px;cursor:pointer" @click="approvalDelete()">
              <Icon type="trash-a" size="20"></Icon>
            </div>
          </div>
        </div>
      </i-col>
    </i-row>

    <template>
      <i-modal title="添加流程" v-model="addFlowOpen" width="300">
        <i-select placeholder="请选择需要添加的流程" style="width:100%">
          <i-option label="面审" value="面审" key="面审"></i-option>
          <i-option label="复审" value="复审" key="复审"></i-option>
          <i-option label="终审" value="终审" key="终审"></i-option>
        </i-select>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    Layout
  } from "~/core/decorator";
  import {
    ProductService
  } from "~/services/manage-service/product.service";

  @Layout("workspace")
  @Component({

    components: {
      DataBox
    }
  })
  export default class FlowConfig extends Page {
    @Dependencies(ProductService) private productService: ProductService;
    private treeData: Array < Object > = [];
    private columns1: any;
    private data1: Array < Object > = [];
    private addFlowOpen: Boolean = false;
    private approvaFlowList: any;
    private allData: Array < any > = [];

    created() {
      this.approvaFlowList = [{
        index: 1,
        approvalName: '面审'
      }]
      this.columns1 = [{
        title: '序号',
        type: 'index',
        align: 'center',
        width: 160
      }, {
        title: '审批流',
        align: 'center',
        key: 'approvalFlow',
        width: 400
      }, {
        align: 'center',
        title: '操作',
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
                    this.deleteFlow(row);
                  }
                }
              },
              "删除"
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
                    this.moveUp(row);
                  }
                }
              },
              "上移"
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
                    this.moveDown(row);
                  }
                }
              },
              "下移"
            )
          ]);
        }
      }]

      this.data1 = [{
        approvalFlow: '面审'
      }, {
        approvalFlow: '复审'
      }, {
        approvalFlow: '终审'
      }, {
        approvalFlow: '合规'
      }]
    }

    deleteFlow(row) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除吗？'
      })
    }
    moveUp(row) {

    }
    moveDown(row) {

    }
    addFlow() {
      this.addFlowOpen = true
    }
    approvalMoveUp() {

    }
    approvalMoveDown() {

    }
    approvalDelete() {

    }
    mounted() {
      this.productService.getAllProduct().subscribe(val => {
        this.allData = val.object;
        this.getTreeDate(this.allData);
      });
    }
    getTreeDate(data) {
      // this.treeData = [{
      //     title: '融资租赁',
      //     expand: true,
      //     children: [{
      //       title: '车贷'
      //     }]
      //   },
      //   {
      //     title: '直租',
      //     expand: true,
      //     children: [{
      //         title: '群泰融租'
      //       },
      //       {
      //         title: '开呗长租'
      //       }
      //     ]
      //   }
      // ]
      let treeData: any = [{
        title: '',
        children: []
      }]
      // data.forEach(v => {
      //   if (v.seriesId) {
      //     treeData.push({
      //       title: v.seriesName,
      //       id: v.seriesId,
      //       expand: true,
      //       children: [{
      //         title: v.productName,
      //         id: v.productId
      //       }]
      //     })
      //   }
      // })
      let map: Map < string, any > = new Map()
      data.forEach(v => {
        if (v.seriesId) {
          map.set(v.seriesId, v)
          if (v.productId) {
            treeData.push({
              title: v.seriesName,
              id: v.seriesId,
              expand: true,
              children: [{
                title: v.productName,
                id: v.productId
              }]
            })
          }
        }
      })
      this.treeData = treeData
    }
  }

</script>

<style lang="less">
  .rightPageContainer {
    // display: flex;
  }

  .prdName {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #265ea2;
    color: #fff;
    margin: auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
  }

  .approvalContainer {
    width: 80%;
    height: 60px;
    background: #F2F2F2;
    margin-top: 10px;
    display: flex;
    align-items: center;
  }

  .verticalLine {
    width: 1px;
    height: 40px;
    background: #fff;
    margin-left: 40px;
  }

</style>
