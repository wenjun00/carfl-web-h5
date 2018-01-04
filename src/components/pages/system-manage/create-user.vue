<template>
  <section class="component create-user">
    <el-form :model="createUserModel">
      <el-form-item label="姓名" prop="name">
        <el-col :span="12">
          <el-input v-model="createUserModel.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="用户名" prop="fullName">
        <el-col :span="12">
          <el-input v-model="createUserModel.fullName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="所属机构" prop="organization" label-width="80">
        <el-col :span="12">
          <el-cascader v-model="orgIdArr" :options="orgNameList" :props="{value:'id',label:'name'}" change-on-select :show-all-levels="false"></el-cascader>
        </el-col>
      </el-form-item>
      <!--<el-row type="flex" justify="center">
        <el-form-item label="姓名" prop="name">
          <el-col :span="12">
            <el-input v-model="createUserModel.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户名" prop="fullName">
          <el-col :span="12">
            <el-input v-model="createUserModel.fullName"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="center">
        <el-form-item label="所属机构" prop="organization" label-width="80">
          <el-col :span="12">
            <el-cascader v-model="orgId" :options="orgNameList" :props="{value:'id',label:'name'}" change-on-select :show-all-levels="false"
              @change="orgChange"></el-cascader>
          </el-col>
        </el-form-item>
      </el-row>-->
    </el-form>
    <el-row type="flex" justify="center">
      <el-button @click="cancelCreate">取消</el-button>
      <el-button @click="confirmCreate">确定</el-button>
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
    Prop,
    Emit
  } from "vue-property-decorator";
  import {
    organizationService
  } from "~/services/organization.service";
  import {
    operatorService
  } from "~/services/operator.service";
  @Layout('workspace')
  @Component({
    components: {}
  })
  export default class UserManage extends Vue {
    @Dependencies(organizationService) private organizationService: organizationService;
    @Dependencies(operatorService) private operatorService: operatorService;
    private createUserModel: any = {
      name: "",
      fullName: "",
      organization: "",
      password: "",
      role: 0
    }
    @Prop() orgId: any;
    private orgIdArr: Array < any > = [];
    private orgNameList: Array < any > = [];
    confirmCreate() {
      this.createUserModel.organization = this.orgIdArr[this.orgIdArr.length - 1]
      console.log(this.createUserModel)
      this.operatorService.createOperator(this.createUserModel).subscribe(data => {
        this.$message({
          type: "success",
          message: "新增成功"
        })
      })
      this.$emit('success')
    }
    cancelCreate() {

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
        this.orgNameList = fun()
        console.log(this.orgNameList)
      });
    }
  }

</script>
<style>


</style>
