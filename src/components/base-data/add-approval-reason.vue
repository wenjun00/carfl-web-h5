//新增审批原因管理
<template>
  <i-form ref="add-approval" :model="addApproval" :rules="rulesApproval" :label-width="80">
    <i-form-item label="类型" prop="type">
      <i-select v-model="addApproval.type">
        <i-option v-for="{value,label} in $dict.getDictData('0308')" :key="value" :label="label" :value="value"></i-option>
      </i-select>
    </i-form-item>
    <i-form-item label="一级" prop="first">
      <i-input v-model="addApproval.first"></i-input>
    </i-form-item>
    <i-form-item label="二级" prop="second">
      <i-input v-model="addApproval.second"></i-input>
    </i-form-item>
    <i-form-item label="CRC编码" prop="crc">
      <i-input v-model="addApproval.crc"></i-input>
    </i-form-item>
    <i-form-item label="详细内容" prop="detail">
      <i-input v-model="addApproval.detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></i-input>
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
    ApproveReasonService
  } from '~/services/manage-service/approve-reason.service';

  @Component({
    components: {},
  })
  export default class AddApprovalReason extends Vue {
    @Dependencies(ApproveReasonService) private approveReasonService: ApproveReasonService;
    private addApproval: any = {};
    private rulesApproval: any = {};
    created() {
      this.rulesApproval = {
        type: [{
          required: true,
          message: '请选择类型',
          trigger: 'change',
          type: 'number'
        }],
        first: [{
          required: true,
          message: '请输入一级内容',
          trigger: 'blur'
        }],
        second: [{
          required: true,
          message: '请输入二级内容',
          trigger: 'blur'
        }],
        crc: [{
          required: true,
          message: '请输入CRC编码',
          trigger: 'blur'
        }],
        detail: [{
          required: true,
          message: '请输入详细内容',
          trigger: 'blur'
        }],
      };
    }
    reset() {
      let _addapproval: any = this.$refs['add-approval']
      _addapproval.resetFields()
    }
    validFun() {
      let form = < Form > this.$refs['add-approval'];
      form.validate(valid => {
        if (!valid) return false;
        this.approveReasonService.createApproveReason(this.addApproval).subscribe(
          val => {
            this.$emit('close');
            this.$Message.success('新增成功！');
            this.reset()
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
      });
    }
  }

</script>
