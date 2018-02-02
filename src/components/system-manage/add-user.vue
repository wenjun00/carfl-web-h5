<!--新增用户-->
<template>
  <section class="component add-user">
    <i-form :label-width="110" class="addUser" :model="addUserModel" ref="add-user" :rules="rules">
      <i-row>
        <i-col :span="12">
          <i-form-item label="用户名" prop="userUsername">
            <i-input v-model="addUserModel.userUsername"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="姓名" prop="userRealname">
            <i-input v-model="addUserModel.userRealname"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="电话" prop="userPhone">
            <i-input v-model="addUserModel.userPhone"></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="邮箱" prop="userEmail">
            <i-input v-model="addUserModel.userEmail"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="所属机构" prop="deptName">
            <i-input v-model="deptObject.deptName" disabled></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="公司名称" prop="companyName">
            <i-select v-model="deptObject.companyName" disabled>
              <i-option label="指旺金科" value="指旺金科" key="指旺金科"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="12">
          <i-form-item label="性别" prop="userSex">
            <i-select v-model="addUserModel.userSex">
              <i-option label="男" :value="419" :key="419"></i-option>
              <i-option label="女" :value="420" :key="420"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="数据权限" prop="userManager">
            <i-select v-model="addUserModel.userManager">
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
            <i-input type="textarea" v-model="addUserModel.userRemark"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <!--<i-row>
        <i-col :span="24" style="text-align:center">
          <i-button @click="cancelAddUser" class="defalutButton">取消</i-button>
          <i-button @click="confirmAddUser" class="blueButton">确定</i-button>
        </i-col>
      </i-row>-->
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
    Form
  } from 'iview'
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    ManageService
  } from "~/services/manage-service/manage.service";
  @Component({
    components: {}
  })
  export default class AddUser extends Vue {
    @Dependencies(ManageService) private manageService: ManageService;
    @Prop()
    deptObject
    @Watch("deptObject")
    updateDeptObject() {}
    private addUserModel: any = {
      userPhone: '',
      companyName: '',
      deptId: 1,
      deptName: '',
      userUsername: '',
      userRealname: '',
      userEmail: '',
      userSex: '',
      userManager: '',
      userRemark: '',
      loginDevice: 414,
      loginType: 411,
      userType: 409
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
    cancel() {}
    confirmAddUser() {
      // 获取相关数据
      this.addUserModel.deptId = this.deptObject.id
      this.addUserModel.companyName = this.deptObject.companyName
      this.addUserModel.deptName = this.deptObject.deptName

      let registerForm = < Form > this.$refs['add-user']
      registerForm.validate(valid => {
        if (valid) {
          this.manageService.createUser(this.addUserModel).subscribe(val => {
            this.$Message.success('新增成功!')
            this.$emit('close')
          }, ({
            msg
          }) => {
            this.$Message.error(msg)
          })
        }
      })
    }
    /**
     * 取消
     */
    cancelAddUser() {

    }
    resetForm() {
      let _addUserForm: any = this.$refs['add-user']
      _addUserForm.resetFields()
    }
    mounted() {}
  }

</script>
<style lang="less">
  .addUser {
    position: relative;
    right: 30px;
  }

</style>
