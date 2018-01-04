<template>
  <section class="component role-permission">
    <el-row type="flex">
      <el-col :span="8">
        <el-row class="title">模块</el-row>
        <el-row class="module-tree">
          <el-tree align="left" :data="treeData" :show-checkbox="true" highlight-current node-key="id" ref="tree" :props="defaultProps"
            :default-expanded-keys="treeExpanded" :default-checked-keys="treeDefaultSelection" @node-click="getCheckedNodes"
            @check-change="handleCheckChange">
          </el-tree>
        </el-row>
      </el-col>
      <el-col :span="16">
        <el-row class="title">对应模块功能</el-row>
        <el-row>
          <el-table :data="tableData" height="350" border ref="data-table" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60" align="center">
            </el-table-column>
            <el-table-column type="index" label="序号" width="30" align="center">
            </el-table-column>
            <el-table-column prop="name" label="功能名称" min-width="80" align="center">
            </el-table-column>
            <el-table-column prop="remark" label="描述" min-width="80" align="center">
            </el-table-column>
          </el-table>
        </el-row>
        <el-row type="flex" justify="center" style="margin-top:10px">
          <el-button @click="saveModule">保存</el-button>
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Prop,
    Emit
  } from "vue-property-decorator";
  import {
    Layout
  } from "~/core/decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    ResourceService
  } from "~/services/resource.service";
  import {
    RoleService
  } from "~/services/role.service";
  import DataForm from "~/components/common/data-form.vue";
  import DataBox from "~/components/common/data-box.vue";

  @Layout("workspace")
  @Component({
    components: {
      DataForm,
      DataBox
    }
  })
  export default class RoleManage extends Vue {
    @Dependencies(RoleService) private roleService: RoleService;
    @Dependencies(ResourceService) private ResourceService: ResourceService;
    @Prop() allData: Array < any > ;
    @Prop() roleResource: any;
    private treeData: Array < any > = [];
    private tableData: Array < any > = [];
    private treeExpanded: Array < any > = [];
    private treeDefaultSelection: Array < any > = [];
    private multipleSelection: Array < any > = [];
    private defaultProps: any = {
      children: 'children',
      label: 'label'
    };
    private currentRole: any = {
      name: "",
      status: "",
      id: "",
      resources: []
    };
    mounted() {
      console.log('allData', this.allData)
      this.getTreeData()
    }
    getCheckedNodes(item) {
      console.log('cc', item.id)
      this.tableData = this.allData.filter(v => {
        return (parseInt(v.parentId) === parseInt(item.id) && v.type === "BUTTON")
      })
      console.log('tableData', this.tableData)
    }
    getTreeData() {
      let arr: any = [{
        id: 0,
        label: this.allData.length ? this.allData[0].name : '',
        parentId: 1,
        children: []
      }]
      let num = 0
      this.allData.map(v => {
        if (v.parentId === "-1") {
          arr[0].children.push({
            id: v.id,
            label: v.name,
            parentId: null,
            children: []
          })
          let funNum = 0
          this.allData.map(val => {
            if (val.parentId && val.parentId === v.id) {
              arr[0].children[num].children.push({
                id: parseInt(val.id),
                label: val.name,
                parentId: parseInt(val.parentId),
                function: []
              })
              this.allData.map(value => {
                if (value.parentId && value.parentId === val.id) {
                  arr[0].children[num].children[funNum].function.push(value)
                }
              })
              funNum++
            }
          })
          num++
        }
      })
      this.treeData = arr
    }
    getRoleRes(roleResource, row) {
      this.treeExpanded = roleResource.map(v => v.id)
      this.treeDefaultSelection = roleResource.map(v => v.id)
      this.currentRole = row
      this.currentRole.status = ''
      console.log(this.currentRole)
      console.log('getRoleRes', this.treeDefaultSelection)
    }
    handleSelectionChange(v) {
      this.multipleSelection = v.filter(v => v !== undefined)
    }
    saveModule() {
      this.roleService.updateRole(this.currentRole).subscribe(data => {
        this.$message({
          type: "success",
          message: "保存成功"
        });
      });
      this.$emit('success')
    }
    handleCheckChange(data, checked, indeterminate) {}
    // refreshData() {
    //   this.ResourceService.getAllResources().subscribe(data => {
    //    this.treeData = data;
    // });
    // }
  }

</script>
<style scoped>
  .box {
    height: 500px;
    font-size: 0.75rem;
  }

  .title {
    height: 40px;
    background: #E4E4E4;
    line-height: 40px;
    text-align: center;
    border: 1px solid #dddddd;
    font-size: 0.875rem;
  }
  /*.module {
    height: 500px;
    border: 1px solid #dddddd;
    border-top: 0;
  }

  .module-tree {
    height: 460px;
    overflow: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
  }

  .module-tree::-webkit-scrollbar {
    width: 0px;
  }

  .btn-box {
    margin-top: 40px;
  }*/

</style>
