<!--客户职业-->
<template>
  <section class="component upload-the-material ">
    <i-row style="margin-left:50px;">
      <h2>上传素材</h2>
      <br>
      <i-button type="primary" @click="openClick">上传</i-button>
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
              <i-option v-for="item in cityList" :value="item.label" :key="item.value">{{ item.label }}</i-option>
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

  @Component({})
  export default class UploadTheMaterial extends Vue {
    private model1: String = '';
    private cityList: Array < object > = [];
    private dataList: Array < any > = [];

    private openUpload: Boolean = false;

    openClick() {
      this.openUpload = true
    }
    hhh(response, file, fileList) {
      console.log(response, file, fileList)
      this.dataList = fileList
    }
    created() {
      this.cityList = [{
          value: 'New York',
          label: '身份证'
        },
        {
          value: 'London',
          label: '驾照'
        },
        {
          value: 'Sydney',
          label: '学历'
        },
        {
          value: 'Ottawa',
          label: '户口本'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ]
    }
  }
</script>

<style lang="less" scope>

</style>