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
         <div class="demo-upload-list" v-for="(item,id) in fodderList" :key="id">
            <img style="height:200px;width:200px;border:1px solid #C2C2C2;" :src="item.url">
            <div class="demo-upload-list-cover">
              <i-icon type="arrow-down-a" @click.native="download(item)"></i-icon>
              <i-icon type="ios-trash-outline" @click.native="handleRemove(item)"></i-icon>
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
    import {
    CommonService
  } from "~/utils/common.service";
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
    /**
     * 下载
     */
 download(file){
      CommonService.downloadFile(file.url, '');
  }
  /**
   *删除附件
   */
  handleRemove(file) {
    this.fodderList.splice(this.fodderList.indexOf(file), 1);
  }
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
 .demo-upload-list{
        display: inline-block;
        // width: 60px;
        // height: 60px;
        text-align: center;
        // line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        // background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
  .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
  }

  .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }

  .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }

</style>
