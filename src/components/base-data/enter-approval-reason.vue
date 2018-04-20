<template>
  <div>
    <i-row>
      <i-select class="data-form-item" placeholder="导入类型" clearable v-model="enterReasonModel.type" @on-change="enterChange">
        <i-option label="退回" :value="374" :key="374"></i-option>
        <i-option label="拒绝" :value="375" :key="375"></i-option>
      </i-select>
      <i-input class="data-form-input" clearable></i-input>
      <i-button class="blueButton" :disabled="disabledOne" @click="fileSelect">文件选择</i-button>
      <span class="data-form-content" v-if="this.enterReasonModel.type ===''">请选择导入类型并指定模板文件</span>
    </i-row>
    <!-- 弹出框 -->
    <template>
      <i-modal :loading="true" @on-ok="postFile" title="上传素材" v-model="openUpload">
        <file-upload ref="file-upload"></file-upload>
      </i-modal>
    </template>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import FileUpload from "~/components/common/file-upload.tsx.vue";
  @Component({
    components: {
      FileUpload
    }
  })
  export default class EnterApprovalReason extends Vue {
    private enterReasonModel: any = {
      type: ''
    }
    private disabledOne: Boolean = true;
    private openUpload: Boolean = false
    created() {

    }
    enterChange() {
      if (this.enterReasonModel.type !== '') {
        this.disabledOne = false
      } else {
        this.disabledOne = true
      }
    }
    fileSelect() {
      this.openUpload = true
    }
    /**
     * 上传文件
     */
    postFile() {
      let fileUpload = this.$refs["file-upload"] as FileUpload;
      fileUpload.upload();
    }

  }

</script>

<style lang="less" scoped>
  .data-form-item {
    margin-left: 5px;
    width: 20%;
  }

  .data-form-input {
    width: 55%;
    margin-left: 10px
  }

  .data-form-content {
    display: block;
    text-align: center;
    color: gray;
    margin-top: 20px;
  }

</style>
