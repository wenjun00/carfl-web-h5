<!--补传附件-->
<template>
  <section class="component add-attachment">
    <i-row class="modal-item">
        <i-col :span="8" style="display:flex;justify-content:center;margin-top:10px">
          <div style="height:200px;width:200px;cursor:pointer;text-align:center;background-color: rgb(244,244,244);" @click="openUpload=true">
            <Icon type="plus-circled" style="display:block;margin-top:40px;" color="#265ea2" size="40"></Icon>
            <h2 style="margin-top:5px">点击添加附件</h2>
            <h3 style="color:gray">支持jpg/png格式</h3>
            <h3 style="color:gray">建议大小不超过10M</h3>
          </div>
        </i-col>
        <i-col :span="8" v-for="(v,i) in financeUploadResources" :key="v.id" style="display:flex;justify-content:center;margin-top:10px">
          <img  :src="v.materialUrl" style="height:200px;width:200px;">
        </i-col>
    </i-row>
    <template>
      <i-modal :loading="true" @on-ok="postFile" title="上传素材" v-model="openUpload" :transfer="false">
        <file-upload @on-success="uploadSuccess" ref="file-upload"></file-upload>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import FileUpload from "~/components/common/file-upload.tsx.vue";
  @Component({
    components: {
      AddAttachment,
      FileUpload
    }
  })
  export default class AddAttachment extends Vue {
    private openUpload: Boolean = false;
    private financeUploadResources: any = [];

    /**
     * 上传文件成功回调
     */
    uploadSuccess() {
      this.openUpload = false;
      this.$nextTick(() => {
        let fileUpload: any = this.$refs["file-upload"];
        this.financeUploadResources = this.financeUploadResources.concat(fileUpload.fileList.map(v => {
          return {
            id: v.response.id,
            materialUrl: v.response.url,
          }
        }))
        fileUpload.reset();
      });
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
  .component.add-attachment{
    .modal-item{
      margin-top:20px
    }
  }

</style>
