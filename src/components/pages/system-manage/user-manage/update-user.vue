<template>
  <section class="component update-user">
    <el-form :model="updateUserModel" style="text-align:right">
      <el-form-item label="姓名" prop="name">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-input v-model="updateUserModel.fullName"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="用户名" prop="fullName">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-input v-model="updateUserModel.username"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <!--<el-form-item label="密码" prop="password" label-width="80">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-input v-model="updateUserModel.password"></el-input>
          </el-col>
        </el-row>
      </el-form-item>-->
      <el-form-item label="所属机构" prop="organization" label-width="80">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-cascader v-model="orgIdArr" :options="orgNameList" :props="{value:'id',label:'name'}" change-on-select :show-all-levels="false"></el-cascader>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="状态" prop="state" label-width="80">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-select v-model="updateUserModel.state">
              <el-option label="启用" value="ENABLED"></el-option>
              <el-option label="禁用" value="DISABLED"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <!--<el-form-item label="角色" prop="role">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-select v-model="updateUserModel.role">
              <el-option v-for="item in roleList" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>-->
    </el-form>
    <el-row type="flex" justify="center">
      <el-button @click="cancelUpdate">取消</el-button>
      <el-button @click="confirmUpdate">确定</el-button>
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
    private updateUserModel: any = {
      username: "",
      fullName: "",
      organization: "",
      password: "",
      role: "",
      id: "",
      state: ""
    }
    @Prop() orgId: any;
    @Prop() roleList: any;
    private orgIdArr: Array < any > = [];
    private orgNameList: Array < any > = [];
    private orgList: Array < any > = [];
    confirmUpdate() {
      console.log(this.orgIdArr)
      this.updateUserModel.organization = this.orgIdArr[this.orgIdArr.length - 1]
      console.log(this.updateUserModel)
      this.operatorService.updateOperator(this.updateUserModel).subscribe(data => {
        this.$message({
          type: "success",
          message: "修改成功"
        })
        this.close()
      })
    }
    cancelUpdate() {
      this.close()
    }
    close() {
      this.$emit('close')
    }
    /**
     * 获取组织名称列表
     */
    getOrgNameList(dept) {
      this.organizationService.getAllOrganizations().subscribe(data => {
        this.orgList = Object.assign([], data)
        console.log('this.orgList', this.orgList)
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
        // 设置默认值
        let arr: any = [];
        let func = (id) => {
          let item = data.find(v => v.id === id)
          if (item) {
            func(item.parentId)
          }
          arr.push(id)
        }
        func(dept)
        arr.splice(0, 1)
        this.orgIdArr = arr
        console.log(this.orgNameList)
      });
    }
    mounted() {}
    refreshData(row) {
      this.updateUserModel = row
      this.operatorService.operatorsDetail(row.id).subscribe(data => {
        this.updateUserModel.password = data.password
        this.updateUserModel.role = data.role.id
        this.updateUserModel.organization = parseInt(data.organization.id)
        this.updateUserModel.id = data.id
        this.updateUserModel.state = data.state
        this.updateUserModel.fullName = data.fullName
        this.updateUserModel.username = data.username
        this.getOrgNameList(data.organization.id)
      });
    }
  }

</script>
<style>


</style>
