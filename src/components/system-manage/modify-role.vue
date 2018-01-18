<!--修改角色-->
<template>
  <section class="component modify-role">
    <i-form :label-width="110" style="margin-top:20px;">
      <i-form-item label="角色名称">
        <i-input v-model="modifyRoleModel.roleName"></i-input>
      </i-form-item>
      <i-form-item label="状态">
        <i-select v-model="modifyRoleModel.roleStatus">
          <i-option label="启用" :value="0" :key="0"></i-option>
          <i-option label="停用" :value="1" :key="1"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="备注">
        <i-input type="textarea" v-model="modifyRoleModel.roleRemark"></i-input>
      </i-form-item>

    </i-form>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";
  import {
    ManageService
  } from "~/services/manage-service/manage.service";
  import {
    Dependencies
  } from "~/core/decorator";
  @Component({})
  export default class ModifyRole extends Vue {
    @Dependencies(ManageService) private manageService: ManageService;
    @Prop() modifyRoleModel


    created() {}
    updateRole() {
      this.manageService.updateRole(this.modifyRoleModel).subscribe(val => {
        this.$Message.success('修改成功！')
      })
    }
  }

</script>
