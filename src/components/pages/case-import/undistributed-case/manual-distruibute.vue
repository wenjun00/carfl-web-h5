<template>
  <section class="component manual-distruibute">
    <el-tree align="left" :data="orgData" highlight-current default-expand-all node-key="id" ref="tree" @node-click="getCheckedNodes"
      :props="{value:'id',label:'name'}"></el-tree>
    <el-row type="flex" justify="center">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="confirm">确认</el-button>
    </el-row>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Layout
  } from "~/core/decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    organizationService
  } from "~/services/organization.service";
  import {
    orderService
  } from "~/services/order.service";
  @Layout('workspace')
  @Component({
    components: {}
  })
  export default class UserManage extends Vue {
    @Dependencies(organizationService) private organizationService: organizationService;
    @Dependencies(orderService) private orderService: orderService;
    private orgData: any = [];
    private ids: any = [];
    private orgId: any;
    /**
     * 获取组织机构树
     */
    getAllOrgTree() {
      this.organizationService.getAllOrganizations().subscribe(data => {
        let fun: any = (id) => {
          // 递归对象子元素
          let list = data.filter(x => id ? x.parentId === id : !x.parentId).map(node => {
            // 递归构建子节点
            let children = fun(node.id)
            if (children && children.length) {
              node.children = children
            }
            return node
          })
          return list
        }
        this.orgData = fun()
      });
    }
    getCheckedNodes(item) {
      console.log(item)
      this.orgId = item.id
    }
    confirm() {
      this.orderService.manualDistribute(this.ids, this.orgId).subscribe(data => {
        this.$message({
          type: "success",
          message: "分配成功"
        })
        this.close()
      });
    }
    cancel() {
      this.close()
    }
    close() {
      this.$emit("close")
    }
    refreshData(row) {
      this.getAllOrgTree()
      this.ids = [row.id]
    }
  }

</script>
<style>


</style>
