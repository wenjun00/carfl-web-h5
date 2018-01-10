<!--修改系统参数-->
<template>
  <section class="component modify-system-params">
    <i-form :label-width="100" class="modifySystemParams">
      <i-row>
        <i-col :span="24">
          <i-form-item label="参数代码">
            <i-input v-model="modifySystemParamsModel.paramsCode" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="参数名称">
            <i-input v-model="modifySystemParamsModel.paramsName" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="参数值">
            <i-input v-model="modifySystemParamsModel.paramsValue"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="是否启用">
            <i-select v-model="modifySystemParamsModel.isUsable">
              <i-option label="启用" value="启用" key="启用"></i-option>
              <i-option label="停用" value="停用" key="停用"></i-option>
            </i-select>
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
  export default class ModifySystemParams extends Vue {
    private modifySystemParamsModel: Object = {
      paramsCode: 'SysParam.resetpassword',
      paramsName: '重置用户密码',
      paramsValue: '887888',
      isUsable: '启用'
    }
    created() {}
    cancel() {

    }
    confirm() {

    }
  }

</script>
<style lang="less">
  .modifySystemParams {
    position: relative;
    right: 30px;
  }

</style>
