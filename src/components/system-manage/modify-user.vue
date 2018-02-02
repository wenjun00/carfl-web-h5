<!--修改用户-->
<template>
  <section class="component modify-user">
    <i-form :label-width="110" class="modifyUserForm">
      <i-row>
        <i-col :span="12">
          <i-form-item label="用户名">
            <i-input v-model="modifyModel.userUsername"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="姓名">
            <i-input v-model="modifyModel.userRealname"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="电话">
            <i-input v-model="modifyModel.userPhone"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="邮箱">
            <i-input v-model="modifyModel.userEmail"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="公司名称">
            <i-select v-model="modifyModel.companyName" disabled>
              <i-option label="指旺金科" value="指旺金科" key="指旺金科"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="所属机构">
            <i-input v-model="modifyModel.deptName" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="性别">
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
    created() {}
    cancelUpdate() {
      this.$emit('close')
    }
    updateUser() {
      this.modifyModel.userUsername = this.modifyUserModel.userUsername
      this.modifyModel.userRealname = this.modifyUserModel.userRealname
      this.modifyModel.userPhone = this.modifyUserModel.userPhone
      this.modifyModel.userEmail = this.modifyUserModel.userEmail
      this.modifyModel.companyName = this.modifyUserModel.companyName
      this.modifyModel.deptName = this.modifyUserModel.deptName
      this.modifyModel.userSex = this.modifyUserModel.userSex
      this.modifyModel.userManager = this.modifyUserModel.userManager
      this.modifyModel.userRemark = this.modifyUserModel.userRemark
      this.manageService.updateUser(this.modifyUserModel).subscribe(val => {
        this.$Message.success('修改成功！')
      }, ({
        msg
      }) => {
        this.$Message.error(msg)
      })
    }
  }

</script>
<style lang="less">
  .modifyUserForm {
    position: relative;
    right: 30px;
  }

</style>
