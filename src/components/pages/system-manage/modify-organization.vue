<template>
  <section class="component modify-origanization">
    <el-form ref="modify-form" :model="modifyModel">
      <el-form-item label="机构名称" prop="name">
        <el-input v-model="modifyModel.name"></el-input>
      </el-form-item>
      <el-form-item label="机构类型" prop="type">
        <el-input v-model="modifyModel.type"></el-input>
      </el-form-item>
      <el-form-item label="父级机构" prop="parentId">
        <el-cascader :options="organizeOptions" :props="{value:'id',label:'name'}" v-model="modifyModel.parentOrg"
          :show-all-levels="false" change-on-select @change="modifyModel.parentId || (modifyModel.parentId = modifyModel.parentOrg[modifyModel.parentOrg.length - 1])"></el-cascader>
      </el-form-item>
      <el-row type="flex" justify="center">
        <el-button @click="close">取消</el-button>
        <el-button @click="submit">确定</el-button>
      </el-row>
    </el-form>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import {
    Layout
  } from "~/core/decorator";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import app from '~/config/app.config'
  import {
    organizationService
  } from "~/services/organization.service";

  @Component({})
  export default class modifyOriganization extends Vue {
    @Dependencies(organizationService) private organizationService: organizationService;
    private modifyModel: any = {
      id: '',
      name: '',
      type: '',
      parentId: '',
      parentOrg: []
    };
    private areaOptions: any = [];
    private organizeOptions: any = [];
    /**
     * 新增案件提交
     */
    submit() {
      let obj: any = {
        id: this.modifyModel.id,        
        name: this.modifyModel.name,
        type: this.modifyModel.type,
        parentId: this.modifyModel.parentId
      }
      this.organizationService.updateOrganization(obj).subscribe(data => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.close()
        this.$emit('success')
      });
    }
    refresh(modify) {
      this.modifyModel.id = modify.id
      this.modifyModel.name = modify.name
      this.modifyModel.type = modify.type
      this.modifyModel.parentOrg = modify.parentId ? [modify.parentId] : []
      console.log(this.modifyModel)
    }
    close() {
      this.$emit('close')
    }
    mounted() {
      this.organizationService.getAllOrganizations().subscribe(data => {
        console.log(data)
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
        this.organizeOptions = fun()
        console.log(this.organizeOptions)
      });
    }
  }

</script>

<style scoped>


</style>
