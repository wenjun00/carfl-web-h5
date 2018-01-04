<template>
  <section class="component create-user">
    <el-form :model="createUserModel" :rules="rules" ref="create-form">
      <el-form-item label="姓名" prop="username">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-input v-model="createUserModel.username"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="用户名" prop="fullName">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-input v-model="createUserModel.fullName"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="所属机构" prop="organization" label-width="80">
        <el-row type="flex" justify="center">
          <el-cascader v-model="orgIdArr" :options="orgNameList" :props="{value:'id',label:'name'}" change-on-select :show-all-levels="false"></el-cascader>
        </el-row>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-row type="flex" justify="center">
          <el-select v-model="createUserModel.role">
            <el-option v-for="item in roleList" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-row>
      </el-form-item>
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
      username: "",
      fullName: "",
      organization: "",
      password: "888888",
      role: ""
    }
    @Prop() orgId: any;
    @Prop() roleList: any;
    private orgIdArr: Array < any > = [];
    private orgNameList: Array < any > = [];
    private rules: any = {
      username: [{
        required: true,
        message: '请输入姓名',
        trigger: 'blur'
      }],
      fullName: [{
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      }],
      organization: [{
        required: true,
        message: '请选择机构',
        trigger: 'blur'
      }],
      role: [{
        required: true,
        message: '请选择角色',
        trigger: 'blur'
      }]
    }
    // private roleList: Array < any > = []; 
    confirmCreate() {
      this.createUserModel.organization = this.orgIdArr[this.orgIdArr.length - 1]
      console.log(this.createUserModel)
      let createForm: any = this.$refs["create-form"];
      createForm.validate(success => {
        if (!success) {
          return;
        }
        this.operatorService.createOperator(this.createUserModel).subscribe(data => {
          this.$message({
            type: "success",
            message: "新增成功"
          })
        })
        this.close()
        createForm.resetFields()
      })
    }
    cancelCreate() {
      let createForm: any = this.$refs["create-form"];
      createForm.resetFields()
      this.close()
    }
    close() {
      this.$emit('close')
    }
    mounted() {
      console.log(this.roleList)
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
