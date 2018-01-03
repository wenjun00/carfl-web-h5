<template>
  <section class="component create-tatics">
    <el-form ref="create-form" :model="createModel">
      <el-form-item label="策略名称" prop="name">
        <el-input v-model="createModel.name"></el-input>
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-input v-model="createModel.priority"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="areaCodes">
        <el-cascader v-for="v,i in createModel.areaCodes" :options="areaOptions" v-model="createModel.areaCodes[i]" :key="i" :show-all-levels="false"></el-cascader>
      </el-form-item>
      <el-form-item label="机构" prop="organizations">
        <el-cascader v-for="v,i in createModel.organizations" :options="organizeOptions" v-model="createModel.organizations[0]" :key="i"
          :show-all-levels="false"></el-cascader>
      </el-form-item>
      <el-row type="flex" justify="center">
        <el-button @click="close">取消</el-button>
        <el-button @click="submit">确定</el-button>
      </el-row>
    </el-form>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import {
    Layout
  } from "~/core/decorator";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import app from '~/config/app.config'
  import {
    orderStrategyConfigService
  } from "~/services/order-strategy-config.service";

  @Component({})
  export default class CreateTatics extends Vue {
    @Dependencies(orderStrategyConfigService) private orderStrategyConfigService: orderStrategyConfigService;
    private createModel: any = {
      areaCodes: [
        []
      ],
      name: '',
      priority: '',
      organizations: [
        []
      ]
    };
    private areaOptions: any = [];
    private organizeOptions: any = [];
    /**
     * 新增案件提交
     */
    submit() {
      this.orderStrategyConfigService.createOrderStrategyConfig(this.createModel).subscribe(data => {
        this.$message({
          type: 'success',
          message: '创建成功'
        })
      });
    }
    close() {
      this.$emit('close')
    }
  }

</script>

<style scoped>


</style>
