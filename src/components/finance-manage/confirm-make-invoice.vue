<!--确认开票-->
<template>
  <div class="component confirm-make-invoice">
    <i-form :label-width="110">
      <i-row>
        <i-col :span="12">
          <i-form-item label="开票金额">
            <i-input></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="发票抬头">
            <i-input></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="开票日期">
            <i-date-picker></i-date-picker>
          </i-form-item>
        </i-col>
        <i-col :span="12">
          <i-form-item label="发票号">
            <i-input></i-input>
          </i-form-item>
        </i-col>
        <i-col :span="24">
          <i-form-item label="备注">
            <i-input type="textarea"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
    <!--发票-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span>发票</span>
      </div>
      <i-row style="margin-top:10px">
        <i-col :span="12">
          <div style="height:200px;width:200px;border:1px solid #C2C2C2;cursor:pointer;text-align:center;position:relative;left:40px;">
            <Icon type="plus-circled" style="display:block;margin-top:53px;color:#265ea2" size="40"></Icon>
            <div>点击添加附件</div>
            <span style="color:gray">支持jpg/pdf/png格式建议大小不超过10M</span>
          </div>
        </i-col>
        <i-col :span="12">
          <div style="height:200px;width:200px;border:1px solid #C2C2C2;background-image:url('/static/images/common/invoice2.png');background-repeat:no-repeat;position:relative;left:72px;">
          </div>
        </i-col>
      </i-row>
    </i-row>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    DataGrid,
    DataGridItem
  } from "fintech-vue-component";

  import {
    Prop
  } from "vue-property-decorator";
  import {
    Action
  } from "vuex-class";

  @Component({
    components: {
      DataGrid,
      DataGridItem
    }
  })
  export default class ConfirmMakeInvoice extends Vue {
    private single: Boolean = false;
  }

</script>

<style scoped lang="less">
  .confirm-make-invoice {
    .ivu-form {
      position: relative;
      right: 30px;
    }
  }

</style>
