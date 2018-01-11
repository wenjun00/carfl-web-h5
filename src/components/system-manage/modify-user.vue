<!--修改用户-->
<template>
  <section class="component modify-user">
    <i-form :label-width="110" class="modifyUserForm">
      <i-row>
        <i-col :span="12">
          <i-form-item label="用户名">
            <i-input v-model="modifyUserModal.accountName"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="姓名">
            <i-input v-model="modifyUserModal.userName"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="电话">
            <i-input v-model="modifyUserModal.phone"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="邮箱">
            <i-input></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="公司名称">
            <i-select disabled>
              <i-option label="群泰西安" value="群泰西安" key="群泰西安"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="所属机构">
            <i-input v-model="modifyUserModal.belongOrg"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="年龄">
            <i-input></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="性别">
            <i-input></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="民族">
            <i-input></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="绑定主叫号码">
            <i-input></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="备注">
            <i-input type="textarea"></i-input>
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
    Prop
  } from "vue-property-decorator";

  @Component({
    components: {}
  })
  export default class ModifyUser extends Vue {
    private modifyUserModal: Object = {
      accountName: 'dianguan',
      userName: '胡开甲',
      belongOrg: '指旺西安',
      phone: '13565757815'
    }

    created() {}
    cancel() {

    }
    confirm() {

    }
  }

</script>
<style lang="less">
  .modifyUserForm{
    position: relative;
    right:30px;
  }
</style>
