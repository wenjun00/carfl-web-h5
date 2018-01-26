<!--修改用户-->
<template>
  <section class="component modify-user">
    <i-form :label-width="110" class="modifyUserForm">
      <i-row>
        <i-col :span="12">
          <i-form-item label="用户名">
            <i-input v-model="modifyUserModel.userUsername"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="姓名">
            <i-input v-model="modifyUserModel.userRealname"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="电话">
            <i-input v-model="modifyUserModel.userPhone"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="邮箱">
            <i-input v-model="modifyUserModel.userEmail"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="公司名称">
            <i-select v-model="modifyUserModel.companyName" disabled>
              <i-option label="指旺金科" value="指旺金科" key="指旺金科"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="所属机构">
            <i-input v-model="modifyUserModel.deptName" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="性别">
            <i-select v-model="modifyUserModel.userSex">
              <i-option label="男" :value="419" :key="419"></i-option>
              <i-option label="女" :value="420" :key="420"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="数据权限" prop="userManager">
            <i-select v-model="modifyUserModel.userManager">
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
            <i-input type="textarea" v-model="modifyUserModel.userRemark"></i-input>
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
    created() {}
    cancel() {

    }
    cancelUpdate() {
      this.$emit('close')
    }
    updateUser() {
      this.manageService.updateUser(this.modifyUserModel).subscribe(val => {
        this.$Message.success('修改成功！')
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
