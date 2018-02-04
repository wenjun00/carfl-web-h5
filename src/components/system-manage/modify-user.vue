<!--修改用户-->
<template>
  <section class="component modify-user">
    <i-form :label-width="110" class="modifyUserForm" :model="modifyModel" ref="modify-user" :rules="rules">
      <i-row>
        <i-col :span="12">
          <i-form-item label="用户名" prop="userUsername">
            <i-input v-model="modifyModel.userUsername"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="姓名" prop="userUsername">
            <i-input v-model="modifyModel.userRealname"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="电话" prop="userPhone">
            <i-input v-model="modifyModel.userPhone"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="邮箱" prop="userEmail">
            <i-input v-model="modifyModel.userEmail"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="公司名称" prop="companyName">
            <i-select v-model="modifyModel.companyName" disabled>
              <i-option label="指旺金科" value="指旺金科" key="指旺金科"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="所属机构" prop="deptName">
            <i-input v-model="modifyModel.deptName" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="性别" prop="userSex">
            <i-select v-model="modifyModel.userSex">
              <i-option label="男" :value="419" :key="419"></i-option>
              <i-option label="女" :value="420" :key="420"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="数据权限" prop="userManager">
            <i-select v-model="modifyModel.userManager">
              <i-option :value="416" label="个人" :key="416"></i-option>
              <i-option :value="417" label="组织" :key="417"></i-option>
              <i-option :value="418" label="公司" :key="418"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="备注" prop="userRemark">
            <i-input type="textarea" v-model="modifyModel.userRemark"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {
    Prop,
    Watch
  } from "vue-property-decorator";
  import {
    ManageService
  } from "~/services/manage-service/manage.service";
  import {
    Dependencies
  } from "~/core/decorator";
  @Component({
    components: {}
  })
  export default class ModifyUser extends Vue {
    @Dependencies(ManageService) private manageService: ManageService;
    @Prop() modifyUserModel: any
    private modifyModel: any = {
      userUsername: '',
      userRealname: '',
      userPhone: '',
      userEmail: '',
      companyName: '',
      deptName: '',
      userSex: '',
      userManager: '',
      userRemark: ''
    }
    private rules: any

    created() {
      this.rules = {
        userUsername: [{
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        }],
        userRealname: [{
          required: true,
          message: '姓名不能为空',
          trigger: 'blur'
        }],
        userPhone: [{
          required: true,
          message: '电话号码不能为空',
          trigger: 'blur'
        }, {
          message: '请输入正确的电话号码',
          trigger: 'blur',
          pattern: /^1(3|4|5|7|8)\d{9}$/
        }],
        userEmail: [{
          required: true,
          message: '邮箱不能为空',
          trigger: 'blur'
        }, {
          message: '请输入正确的邮箱',
          trigger: 'blur',
          type: 'email'
        }],
        userSex: [{
          required: true,
          message: '请选择性别',
          type: 'number',
          trigger: 'change'
        }],
        userManager: [{
          required: true,
          type: 'number',
          message: '请选择数据权限',
          trigger: 'change'
        }]
      }
    }
    cancelUpdate() {
      this.$emit('close')
    }
    updateUser() {
      this.manageService.updateUser(this.modifyModel).subscribe(val => {
        this.$Message.success('修改成功！')
        this.$emit('close')
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
    getData(data) {
      console.log(432, data)
      this.modifyModel.userUsername = data.userUsername
      this.modifyModel.id = data.id
      this.modifyModel.deptId = data.deptId
      console.log(432, this.modifyModel.userUsername)
      this.modifyModel.userRealname = data.userRealname
      this.modifyModel.userPhone = data.userPhone
      this.modifyModel.userEmail = data.userEmail
      this.modifyModel.companyName = data.companyName
      this.modifyModel.deptName = data.deptName
      this.modifyModel.userSex = data.userSex
      this.modifyModel.userManager = data.userManager
      this.modifyModel.userRemark = data.userRemark
    }
  }

</script>
<style lang="less">
  .modifyUserForm {
    position: relative;
    right: 30px;
  }

</style>
