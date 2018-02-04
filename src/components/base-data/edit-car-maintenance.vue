<template>
  <i-form ref="car-form" :model="editModel" :rules="ruleValidate" :label-width="80">
    <i-form-item label="车辆品牌" prop="brandName">
      <i-input v-model="editModel.brandName"></i-input>
    </i-form-item>
    <i-form-item label="车辆型号" prop="modelName">
      <i-input v-model="editModel.modelName"></i-input>
    </i-form-item>
    <i-form-item label="车辆颜色" prop="carColour">
      <i-input v-model="editModel.carColour"></i-input>
    </i-form-item>
    <i-form-item label="车辆排量" prop="carEmissions">
      <i-input v-model="editModel.carEmissions"></i-input>
    </i-form-item>
  </i-form>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Page from '~/core/page';
  import Component from 'vue-class-component';
  import SvgIcon from '~/components/common/svg-icon.vue';
  import {
    Prop
  } from 'vue-property-decorator';
  import {
    Form
  } from 'iview';
  import {
    CarService
  } from '~/services/manage-service/car.service';

  import {
    Dependencies
  } from '~/core/decorator';
  @Component({
    components: {},
  })
  export default class AddPeriods extends Vue {
    @Prop() editMessage: any;
    @Dependencies(CarService) private carService: CarService;
    private ruleValidate: any;
    private editModel: any = {
      brandName: '',
      modelName: '',
      carColour: '',
      carEmissions: ''
    }
    created() {
      this.ruleValidate = {
        brandName: [{
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        modelName: [{
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        carColour: [{
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
        carEmissions: [{
          required: true,
          message: '您输入的内容不能为空',
          trigger: 'blur'
        }],
      };
    }
    vaildFun() {
      let formVal = < Form > this.$refs['car-form'];
      formVal.validate(valid => {
        if (!valid) return false;
        this.carService.updateVehicle(this.editModel).subscribe(
          val => {
            this.$Message.success('修改成功！');
            this.$emit('close');
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
      });
    }
    makeData(row) {
      this.editModel.brandName = row.brandName
      this.editModel.modelName = row.modelName
      this.editModel.carColour = row.carColour
      this.editModel.carEmissions = row.carEmissions
      this.editModel.id = row.id
      this.editModel.brandId = row.brandId
      this.editModel.seriesId = row.seriesId
    }
  }

</script>
