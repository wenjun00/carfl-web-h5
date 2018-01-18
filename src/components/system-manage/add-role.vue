<!--新增角色-->
<template>
  <section class="component add-role">
    <i-form :label-width="110" style="margin-top:20px;" ref="add-role" :model="addRoleModel" :rules="rules">
      <i-form-item label="角色名称" prop="roleName">
        <i-input style="width:260px;" v-model="addRoleModel.roleName"></i-input>
      </i-form-item>
      <i-form-item label="状态" prop="roleStatus">
        <i-select style="width:260px;" v-model="addRoleModel.roleStatus">
          <i-option label="启用" :value="0" :key="0"></i-option>
          <i-option label="停用" :value="1" :key="1"></i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="备注" prop="roleRemark">
        <i-input type="textarea" style="width:260px;" v-model="addRoleModel.roleRemark"></i-input>
      </i-form-item>
    </i-form>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import DataBox from "~/components/common/data-box.vue";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    ManageService
  } from "~/services/manage-service/manage.service";
  import {
    Form
  } from "iview"
  @Component({
    components: {
      DataBox
    }
  })
  export default class AddRole extends Vue {
    @Dependencies(ManageService) private manageService: ManageService;
    private addRoleModel: any;
    private rules: any;
    @Prop()
    row: Object;

    created() {
      this.addRoleModel = {
        roleName: '',
        roleStatus: '',
        roleRemark: ''
      }
      this.rules = {
        roleName: [{
          trigger: 'blur',
          message: '请输入角色名称',
          required: true,
        }],
        roleStatus: [{
          trigger: 'change',
          message: '请选择角色状态',
          required: true,
          type: 'number'
        }]
      }
    }
    addRole() {
      let registerForm = < Form > this.$refs['add-role']
      registerForm.validate(valid => {
        if (valid) {
          this.manageService.createRole(this.addRoleModel).subscribe(val => {
            this.$Message.success('新增成功')
            this.$emit('refreshRoleList')
          })
        }
      })
    }
    reset() {
      console.log(123)
      this.$nextTick(() => {
        console.log(344324)
        let _addRole = < Form > this.$refs['add-role']
        _addRole.resetFields()
        this.addRoleModel.roleName = ''
        this.addRoleModel.roleStatus = ''
        this.addRoleModel.roleRemark = ''
      })

    }
  }

</script>
