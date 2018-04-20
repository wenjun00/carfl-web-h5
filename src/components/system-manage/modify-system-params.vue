<!--修改系统参数-->
<template>
  <section class="component modify-system-params">
    <i-form :label-width="110" class="amend-parameter">
      <i-row>
        <i-col :span="24">
          <i-form-item label="参数代码">
            <i-input v-model="sysParamModel.paramCode" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="参数名称">
            <i-input v-model="sysParamModel.paramName" disabled></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="参数值">
            <i-input v-model="sysParamModel.paramValue"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col :span="24">
          <i-form-item label="是否启用">
            <i-select v-model="sysParamModel.paramStatus">
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
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    SystemParameterService
  } from "~/services/manage-service/system-parameter.service";
  @Component({
    components: {}
  })
  export default class ModifySystemParams extends Vue {
    @Dependencies(SystemParameterService)
    private systemParameterService: SystemParameterService;
    private sysParamModel: any = {
      paramCode: "",
      paramName: "",
      paramValue: "",
      paramStatus: ""
    };
    created() {}
    makeData(row) {
      this.sysParamModel.paramCode = row.paramCode;
      this.sysParamModel.paramName = row.paramName;
      this.sysParamModel.paramValue = row.paramValue;
      this.sysParamModel.paramStatus = row.paramStatus;
      this.sysParamModel.id = row.id;
      this.sysParamModel.paramValue = row.paramValue;
      this.sysParamModel.paramType = row.paramType;
      this.sysParamModel.paramSign = row.paramSign;
    }
    /**
     * 确认修改
     */
    confirmModify() {
      this.systemParameterService
        .updateSystemParameter(this.sysParamModel)
        .subscribe(
          val => {
            this.$emit("close");
            this.$Message.success("修改成功");
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
  }

</script>
<style lang="less" scoped>
  .component.modify-system-params {
    .amend-parameter{
      position: relative;
      right: 30px;
    }
  }

</style>
