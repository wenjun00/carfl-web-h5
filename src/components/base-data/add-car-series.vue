//新增车系
<template>
  <i-form ref="add-series" :model="addSeries" :rules="ruleSeries" :label-width="80">
    <i-form-item label="车辆系列" prop="name">
      <i-input v-model="addSeries.name"></i-input>
    </i-form-item>
  </i-form>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {
    Prop,
    Watch
  } from 'vue-property-decorator';
  import {
    Form
  } from 'iview';
  import {
    Dependencies
  } from '~/core/decorator';
  import {
    CarParamTypeControllerService
  } from '~/services/manage-service/car-param-type-controller.service';

  @Component({
    components: {},
  })
  export default class AddApprovalReason extends Vue {
    @Dependencies(CarParamTypeControllerService) private carParamTypeControllerService: CarParamTypeControllerService;
    private addCategory: any = {};
    private ruleCategory: any = {};
    private carParams: any = {};
    created() {
      this.ruleCategory = {
        name: [{
            required: true,
            message: '请输入车辆系列',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '长度不能超过20个字符',
            trigger: 'blur'
          },
        ],
      };
      this.addCategory = {
        name: '',
        carId: '',
      };
    }

    addCategoryFun(carId) {
      let formValid = < Form > this.$refs['add-category'];
      this.addCategory.carId = carId;
      formValid.validate(valid => {
        if (!valid) return false;
        this.carParamTypeControllerService.saveOrUpdate(this.addCategory).subscribe(
          val => {
            this.$emit('close');
            this.$Message.success('新增系列成功！');
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
      });
    }
    restForm() {
      let form: any = this.$refs['add-series'];
      form.resetFields();
    }
  }

</script>
