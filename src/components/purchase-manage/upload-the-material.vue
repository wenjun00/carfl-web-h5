<!--客户职业-->
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
              <i-button type="text" icon="arrow-down-a"></i-button>
              <i-button type="text" icon="eye"></i-button>
              <i-button type="text" icon="close"></i-button>

            </div>
          </li>
        </ul>
      </i-col>
    </i-row>
    <template>
      <i-modal v-model="openUpload">
        <i-row>
          <i-col span="4">
            <span style="line-height:36px;">文件类型</span>
          </i-col>
          <i-col span="6">
            <i-select v-model="model1">
              <i-option v-for="item in cityList" :label="item.name" :value="item.id" :key="item.id"></i-option>
            </i-select>
          </i-col>
          <i-col span="4">
            <i-upload :default-file-list="dataList" :on-success="hhh" multiple action="//jsonplaceholder.typicode.com/posts/">
              <i-button style="color: #2d8cf0;font-size:14px;" type="text" icon="ios-cloud-upload-outline">上传文件</i-button>
            </i-upload>
          </i-col>
        </i-row>
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
  const ModuleState = namespace('purchaseManage', State)

  @Component({})
  export default class UploadTheMaterial extends Vue {
    @Dependencies(PersonalMaterialService) private personalMaterialService: PersonalMaterialService;
    @ModuleState('productId') productId
    private model1: String = '';
    private cityList: Array < object > = [];
    private dataList: Array < any > = [];

    private openUpload: Boolean = false;

    // @Prop() productId: any

    openClick() {
      console.log(this.productId, 70)
      this.personalMaterialService.getAllPersonalMaterialNoPage({
        productId: this.productId
      }).subscribe(data => {
        console.log(data.object)
        this.cityList = data.object
        console.log(this.cityList, 45455)
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
