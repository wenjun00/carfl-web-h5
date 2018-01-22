<!--新增组织-->
<template>
  <section class="component edit-org">
    <i-form :label-width="110" class="editOrg" ref="add-org-form" :model="deptObject" :rules="rules">
      <i-row>
        <i-col :span="24">
          <i-form-item label="机构名称" prop="deptName">
            <i-input v-model="deptObject.deptName"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="组织机构等级" prop="deptLevel">
            <i-select v-model="deptObject.deptLevel">
              <i-option label="一级" :value="401" :key="401"></i-option>
              <i-option label="二级" :value="402" :key="402"></i-option>
              <i-option label="三级" :value="403" :key="403"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="状态" prop="deptStatus">
            <i-select v-model="deptObject.deptStatus">
              <i-option label="启用" :value="0" :key="0"></i-option>
              <i-option label="停用" :value="1" :key="1"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="公司名称" prop="companyId">
            <i-select v-model="deptObject.companyId">
              <i-option label="群泰西安" :value="10" :key="10"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="备注" prop="deptRemark">
            <i-input v-model="deptObject.deptRemark" type="textarea"></i-input>
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
    DepartmentService
  } from "~/services/manage-service/department.service";
  import {
    Dependencies
  } from "~/core/decorator";
  @Component({
    components: {}
  })
  export default class EditOrg extends Vue {
    @Dependencies(DepartmentService) private departmentService: DepartmentService;

    @Prop() deptObject;
    @Watch("deptObject")
    updateDeptObject() {}
    @Prop({
      default: 1
    }) deptPid;
    private rules: any;
    created() {
      this.rules = {
        deptName: [{
          required: true,
          trigger: 'blur',
          message: '请输入机构名称'
        }]
      }
    }
    /**
     * 添加组织机构
     */
    addOrg(val) {
      this.deptObject.deptLevel = val
      this.deptObject.deptCode = this.deptObject.deptCode
      this.deptObject.deptPid = this.deptPid
    }

    confirmEditOrg() {
      let _addOrg: any = this.$refs['add-org-form']
      _addOrg.validate(valid => {
        if (valid) {
          this.departmentService.updateDepartment(this.deptObject).subscribe(val => {
            this.$Message.success('编辑成功！')
            this.$emit('close')
          })
        }
      })
    }
    /**
     * 获取dept
     */
    getDeptInfo(val) {
      // console.log(666555, val)
      // console.log(this.deptObject.deptName, 8888)
      // this.deptObject.deptName = this.deptObject.deptName
      // this.deptObject.companyId = this.deptObject.companyId
      // this.deptObject.deptStatus = this.deptObject.deptStatus
      // this.deptObject.deptLevel = this.deptObject.deptLevel
      // console.log(this.deptObject, 999)
    }
  }

</script>
<style lang="less">
  .editOrg {
    position: relative;
    right: 30px;
  }

</style>
