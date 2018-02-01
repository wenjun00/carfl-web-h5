<!--流程配置-->
<template>
  <section class="page flow-config">
    <span class="form-title">审批流程配置</span>
    <i-row :gutter="20">
      <i-col :span="4" style="border:1px solid #F2F2F2;height:500px;margin-left:30px;">
        <div style="font-size:14px;font-weight:bold">产品分类</div>
        <i-tree :data="treeData" @on-select-change="prdTreeChange"></i-tree>
      </i-col>
      <i-col :span="19">
        <div class="rightPageContainer">
          <div style="width:80%;height:80px;background:#F2F2F2;display:flex;align-items:center">
            <div class="prdName">
              <span>群泰融资</span>
            </div>
            <div style="font-size:30px;">群泰融资</div>
          </div>
          <div style="margin-top:10px;width:80%;">
            <i-select style="width:94%;" @on-change="processChange" v-model="processNumber" clearable placeholder="请选择审批流程">
              <i-option label="面审" :key="389" :value="389"></i-option>
              <i-option label="复审" :key="390" :value="390"></i-option>
            </i-select>
            <i-button class="blueButton" @click="addNewProcess">添加</i-button>
          </div>
          <div v-for="item in approvaFlowList" :key="item.id" class="approvalContainer">
            <div style="display:inline-block;margin-left:40px;">{{item.processOrderNumber}}</div>
            <div style="display:inline-block;margin-left:40px;">{{item.processName}}</div>
            <div class="verticalLine"></div>
            <div class="moveUp">
              <div style="margin-left:40px;" v-if="item.processOrderNumber===1||item.processName==='合规' ||item.processName==='终审'">
                <Icon type="arrow-up-b" size="20" color="gray"></Icon>
              </div>
              <div style="margin-left:40px;cursor:pointer" @click="approvalMoveUp(item)" v-else>
                <Icon type="arrow-up-b" size="20"></Icon>
              </div>
            </div>
            <div class="moveDown">
              <div style="margin-left:40px;" v-if="item.processOrderNumber===2||item.processName==='合规' ||item.processName==='终审'">
                <Icon type="arrow-down-b" size="20" color="gray"></Icon>
              </div>
              <div style="margin-left:40px;cursor:pointer" v-else @click="approvalMoveDown(item)">
                <Icon type="arrow-down-b" size="20"></Icon>
              </div>
            </div>
            <div class="delete">
              <div v-if="item.processName==='合规' ||item.processName==='终审'" style="margin-left:40px;">
                <Icon type="trash-a" size="20" color='gray'></Icon>
              </div>
              <div v-else style="margin-left:40px;cursor:pointer" @click="approvalDelete(item)">
                <Icon type="trash-a" size="20"></Icon>
              </div>
            </div>
          </div>
        </div>
      </i-col>
    </i-row>

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
    private treeData: Array < any > = [];
    private approvaFlowList: Array < Object >= [];
    private allData: Array < any > = [];
    private processNumber: number = 0;
    private productId: number = 0;
    private upOrDown: number = 0;
    private processId: number = 0;
    private root: Array < any >= []
    created() {
      this.productService.getProductTree().subscribe(val => {
        this.allData = val.object;
        this.productId = val.object[0].productId
        this.getDefaultProcess()
        // 生成树
        // this.createPrdTree(this.allData);
        this.createNewTree(this.allData)
      });
    }
    createNewTree(allData) {
      let root = allData.filter(v => !v.parent)
      this.treeData = []
      root.forEach(item => {
        let node1 = {
          title: item.name,
          seriesId: item.id,
          expand: true,
          children: this.getChild(item)
        }
        this.treeData.push(node1)
      })
    }
    getChild(item) {
      let child: any = []
      this.allData.map(val => {
        if (item.id === val.parent) {
          if (val.flag === '产品') {
            let node2 = {
              title: val.name,
              productId: val.id,
              children: this.getChild(val)
            }
            child.push(node2)
          } else if (val.flag === '产品系列') {
            let node2 = {
              title: val.name,
              seriesId: val.id,
              children: this.getChild(val)
            }
            child.push(node2)
          }
        }
      })
      return child
    }
    approvalMoveUp(item) {
      this.processId = item.id
      this.upOrDown = 0
      this.processMove()
    }
    approvalMoveDown(item) {
      this.processId = item.id
      this.upOrDown = 1
      this.processMove()
    }
    /**
     * 审批流程上下移动
     */
    processMove() {
      let moveModel = {
        processId: this.processId,
        productId: this.productId,
        upOrDown: this.upOrDown
      }
      this.productService.configureProductProcessMove(moveModel).subscribe(val => {
        this.$Message.success('移动成功')
        this.getDefaultProcess()
      })
    }
    approvalDelete(item) {
      let prdProcessModel = {
        processId: item.id,
        productId: item.productId
      }
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除吗？',
        onOk: () => {
          this.productService.configureProductProcessDelete(prdProcessModel).subscribe(val => {
            this.$Message.success('删除成功！')
            this.getDefaultProcess()
          })
        }
      })
    }
    /**
     * 获取页面加载时的产品审批流程
     */
    getDefaultProcess() {
      this.productService.getProductConfigProcess({
        productId: this.productId
      }).subscribe(val => {
        this.approvaFlowList = val.object
      })
    }
    createPrdTree(data) {
      let series: Map < number, any > = new Map();
      this.allData.map(t => {
        if (t.seriesId) {
          series.set(t.seriesId, t);
        }
      });
      this.treeData = [];
      series.forEach(item => {
        let lv1Node = {
          title: item.seriesName,
          seriesId: item.seriesId,
          expand: true,
          children: this.getChilds(item.seriesId)
        };
        this.treeData.push(lv1Node);
      });
    }
    getChilds(id) {
      let prods = this.allData.filter(t => t.seriesId === id);
      let Lv2Nodes = prods.map(t => {
        return {
          title: t.productName,
          productId: t.productId
        };
      });
      return Lv2Nodes;
    }
    /**
     * 树change事件
     */
    prdTreeChange(val) {
      console.log(val, 1090)
      if (val[0].productId) {
        this.productId = val[0].productId
        this.productService.getProductConfigProcess({
          productId: val[0].productId
        }).subscribe(val => {
          this.approvaFlowList = val.object
        })
      }
    }
    /**
     * 下拉框change
     */
    processChange(val) {
      this.processNumber = val
    }
    /**
     * 增加流程
     */
    addNewProcess() {
      let addProcessModel = {
        processNumber: this.processNumber,
        productId: this.productId
      }
      if (this.processNumber) {
        this.productService.configureProductProcessAdd(addProcessModel).subscribe(val => {
          this.$Message.success('添加成功')
          this.getDefaultProcess()
        }, ({
          msg
        }) => {
          this.$Message.error(msg)
        })
      } else {
        this.$Message.error('请先选择流程！')
      }
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

  .forbid {}

</style>
