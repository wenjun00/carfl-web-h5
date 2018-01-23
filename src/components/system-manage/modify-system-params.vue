<!--修改系统参数-->
<template>
  <section class="component modify-system-params">
    <i-form :label-width="110" class="modifySystemParams">
      <i-row>
        <i-col :span="24">
          <i-form-item label="参数代码">
            <i-input v-model="modifySysParamsModel.paramCode" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="参数名称">
            <i-input v-model="modifySysParamsModel.paramName" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="参数值">
            <i-input v-model="modifySysParamsModel.paramValue"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="是否启用">
            <i-select v-model="modifySysParamsModel.paramStatus">
              <i-option label="启用" :value="0" :key="0"></i-option>
              <i-option label="停用" :value="1" :key="1"></i-option>
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
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    SystemParameterService
  } from "~/services/manage-service/system.parameter.service";
  @Component({
    components: {}
  })
  export default class ModifySystemParams extends Vue {
    @Dependencies(SystemParameterService) private systemParameterService: SystemParameterService;

    @Prop() modifySysParamsModel;
    created() {}
    /**
     * 确认修改
     */
    confirmModify() {
      console.log(1212, this.modifySysParamsModel)
      this.systemParameterService.createSystemParameter(this.modifySysParamsModel).subscribe(val => {
        this.$emit('close')
        this.$Message.success('修改成功')
      })
    }
  }

</script>
<style lang="less">
  .modifySystemParams {
    position: relative;
    right: 30px;
  }

</style>
