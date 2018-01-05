<!--案件管理：重新分配dialog-->
<template>
  <section class="component restart-allot">
    <el-row>
      <el-col style="border:1px solid #dddddd;height:200px;">
        <el-tree align="left" :data="orgData" highlight-current default-expand-all node-key="id" ref="tree" @node-click="getCheckedNodes"
          :props="{value:'id',label:'name'}">
        </el-tree>
      </el-col>
    </el-row>
    <el-row style="text-align:center;margin-top:20px;">
      <el-button @click="distribute">分配</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-row>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import {
    Layout
  } from "~/core/decorator";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import app from '~/config/app.config'
  import {
    dataImpService
  } from "~/services/data-imp.service";
  import DataForm from "~/components/common/data-form.vue";
  import {
    organizationService
  } from "~/services/organization.service";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    orderService
  } from "~/services/order.service";


  @Component({
    components: {
      DataBox,
      DataForm
    }
  })
  export default class RestartAllot extends Vue {
    private allotType: Number = 1;
    private allotData: Array < any >= [];
    private orgData: Array < any >= [];
    private organizationId: String = '';

    @Prop()
    caseIds;

    @Dependencies(orderService) private orderService: orderService;
    @Dependencies(organizationService) private organizationService: organizationService;

    /**
     * 分配
     */
    distribute() {
      if (this.organizationId) {
        this.orderService.manualDistribute([this.caseIds], this.organizationId).subscribe(data => {
          // console.log('data', data)
          this.$message('分配成功！')
          this.$emit('close')
        })
      } else {
        this.$message('请选择组织机构！')
      }
    }
    /**
     * 取消
     */
    cancel() {
      // this.organizationId = ''
      this.$emit('close')
    }

    /**
     * node-click
     */
    getCheckedNodes(obj, node, nodeSelf) {
      console.log(obj, 'obj')
      this.organizationId = obj.id
    }

    mounted() {
      // console.log(this.caseId, 7979)
      this.getAllOrgTree()
    }

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

    refreshData() {
      // this.organizationId = ''
    }
  }

</script>

<style scoped>


</style>
