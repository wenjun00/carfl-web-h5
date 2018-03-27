<!--上传素材 通用组件-->
<template>
  <section class="component upload-the-fodder ">
    <span class="form-title">文件数量</span>
    <i-row>
      <div style="display:flex;justify-content:flex-start;">
        <div style="height:200px;width:200px;border:1px solid #dddddd;cursor:pointer;text-align:center;">
          <div @click="uploadFile">
            <Icon type="plus-circled" style="display:block;margin-top:60px;" size="40" color="#265ea2"></Icon>
            <div>点击添加附件</div>
          </div>
          <span style="color:gray">支持jpg/pdf/png格式建议大小不超过10M</span>
        </div>
        <div v-for="item in fodderList" :key="item.uid">
          <div class="demo-upload-list" style="margin-left:10px;">
            <img style="height:200px;width:200px;border:1px solid #dddddd;" :src="item.url">
          </div>
          <div class="demo-upload-list-cover">
            <i-icon type="ios-trash-outline" size="18" @click.native="handleRemove(item)"></i-icon>
            <i-icon type="ios-download-outline" size="18"></i-icon>
          </div>
        </div>
      </div>
    </i-row>

    <!-- 弹出框 -->
    <template>
      <i-modal :loading="true" @on-ok="postFile" title="上传素材"  v-model="openUpload">
        <file-upload @on-success="uploadSuccess" ref="file-upload" acceptFileType=".jpg,.png,.pdf"></file-upload>
      </i-modal>
    </template>

  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    State,
    Mutation,
    namespace
  } from "vuex-class";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    PersonalMaterialService
  } from "~/services/manage-service/personal-material.service";
  import {
    Prop
  } from "vue-property-decorator";
  import FileUpload from "~/components/common/file-upload.tsx.vue";
  const ModuleState = namespace("purchaseManage", State);

  @Component({
    components: {
      FileUpload
    }
  })
  export default class UploadTheFodder extends Vue {
    @Prop() orderFodderInfo: Object;
    @Dependencies(PersonalMaterialService)
    private personalMaterialService: PersonalMaterialService;
    @ModuleState("productId") productId;
    private model1: String = "";
    private cityList: Array < object > = [];
    private dataList: Array < any > = [];
    private fodderList: Array < any > = [];
    private openUpload: Boolean = false;
    private uploadData: any = {
      url: ""
    };

    openClick() {
      this.personalMaterialService
        .getAllPersonalMaterialNoPage({
          productId: this.productId
        })
        .subscribe(data => {
          this.cityList = data.object;
        });
      this.openUpload = true;
    }

    onsuccess(response, file, fileList) {
      this.dataList = fileList;
    }

    makeList(data) {
      if (data.applicationPhaseResources) {
        this.fodderList = data.applicationPhaseResources;
      }
    }
    reset(){
        this.fodderList=[]
    }

    uploadFile() {
      this.openUpload = true;
    }

    /**
     * 上传文件
     */
    postFile() {
      let fileUpload = this.$refs["file-upload"] as FileUpload;
      fileUpload.upload();
    }

    /**
     * 上传文件成功回调
     */
    uploadSuccess() {
      this.openUpload = false;
      this.$nextTick(() => {
        let fileUpload = this.$refs["file-upload"] as FileUpload;
        fileUpload.reset();
        console.log(fileUpload.makeList(),'fileUpload.makeList()')
   for (let item of fileUpload.makeList()) {
          this.fodderList.push({
            name: item.name,
            uid: item.uid,
            url: item.response.url,
            localUrl: item.response.localUrl,
            type: item.response.type,
            id: item.response.id,
            size: item.size,
            status: item.status,
            createTime: item.response.createTime
          })
        }
        // this.fodderList = fileUpload.makeList()
      });
    }
    getUploadItem(){

    }
  }

</script>

<style lang="less" scope>
  .demo-upload-list-cover {
    display: none;
  }

  .demo-upload-list:focus {
    .demo-upload-list-cover {
      display: inline-block;
    }
  }

</style>
