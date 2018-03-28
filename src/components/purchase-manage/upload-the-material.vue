<template>
  <section class="component upload-the-material ">
    <i-row style="margin-left:50px;">
      <h2>上传素材</h2>
      <br>
      <i-button class="blueButton" @click="openClick">上传</i-button>
      <span style="margin-left:15px;">建议文件大小100M以内</span>
    </i-row>
    <i-row style="margin-left:50px;">
      <i-col span="6">
        <br>
        <h3>文件数量({{dataList.length}})</h3>
        <ul style="margin-top:20px;">
          <li v-for="item in dataList" :key="item.uid">
            <p>{{item.name}}</p>
            <div>
              <i-button type="text" icon="arrow-down-a" @click="download(item)"></i-button>
              <i-button type="text" icon="eye" @click="preview(item)"></i-button>
              <i-button type="text" icon="close" @click="handleRemove(item)"></i-button>
            </div>
          </li>
        </ul>
      </i-col>
    </i-row>
    <template>
      <i-modal :loading="true" v-model="openUpload" @on-ok="postFile">
        <i-row>
          <i-col span="4">
            <span style="line-height:36px;">文件类型</span>
          </i-col>
          <i-col span="6">
            <i-select v-model="model1">
              <i-option v-for="item in cityList" :label="item.name" :value="item.id" :key="item.id"></i-option>
            </i-select>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <file-upload @on-success="uploadSuccess" ref="file-upload"></file-upload>
          </i-col>
        </i-row>
      </i-modal>
    </template>

    <template>
      <i-modal title="预览" v-model="previewModel" width="800" class-name="no-footer">
        <img :src="url" style="width: 100%">
      </i-modal>
    </template>

  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import FileUpload from "~/components/common/file-upload.tsx.vue";
  import {
    State,
    Mutation,
    namespace
  } from "vuex-class";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    CommonService
  } from "~/utils/common.service";
  import {
    PersonalMaterialService
  } from "~/services/manage-service/personal-material.service";
  const ModuleState = namespace('purchase', State);
  import { Prop } from "vue-property-decorator";

  @Component({
    components: {
      FileUpload
    }
  })
  export default class UploadTheMaterial extends Vue {
    @Dependencies(PersonalMaterialService) private personalMaterialService: PersonalMaterialService;
    @ModuleState('productId') productId
    private model1: String = '';
    private cityList: Array < object > = [];
    private dataList: Array < any > = [];

    private openUpload: Boolean = false;
    private previewModel: Boolean = false;
    private url: any = "";
    /**
     * 重置
     */
    resetfileList(){
    this.dataList=[]
    }
    /**
     * 反显
     */
    Reverse(data){
        data.personal.personalDatas.map(v=>{
            v.url=v.materialUrl,
            v.name=v.uploadName
        })
    this.dataList=data.personal.personalDatas
    }
    /**
     * 下载
     */
    download(file) {
      CommonService.downloadFile(file.url, file.name);
    }
    /**
     * 预览
     */
    preview(file) {
      if (file.type === 'jpg' || file.type === 'png' || file.type === "JPG" || file.type === 'PNG') {
        this.url = file.url
        this.previewModel = true
      } else {
        window.open(file.url)
      }
    }
    /**
     * 删除
     */
    handleRemove(file) {
      this.dataList.splice(this.dataList.indexOf(file), 1);
    };
    /**
     * 上传文件成功回调
     */
    uploadSuccess() {
      this.openUpload = false;
      this.$nextTick(() => {
        let fileUpload = this.$refs["file-upload"] as FileUpload;
        fileUpload.reset();
        for (let item of fileUpload.makeList()) {
          this.dataList.push({
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
      });
    }
    /**
     * 上传文件
     */
    postFile() {
      let fileUpload = this.$refs["file-upload"] as FileUpload;
      fileUpload.upload();
    }
    openClick() {
      this.personalMaterialService.getAllPersonalMaterialNoPage({
        productId: this.productId
      }).subscribe(data => {
        this.cityList = data
      })
      this.openUpload = true
    }
    hhh(response, file, fileList) {
      this.dataList = fileList
    }
    created() {}
  }

</script>

<style lang="less" scope>


</style>
