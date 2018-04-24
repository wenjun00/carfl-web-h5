<!--冲抵配置-->
<template>
  <section class="page flushing-config">
    <page-header title="冲抵配置" hidden-print hidden-export></page-header>
    <i-row class="data-form">
      <i-col :span="4" class="form-item">
        <div class="form-item-name">
          <span>冲抵类型</span>
        </div>
        <div class="form-item-tree">
          <div class="data-form-list-template" v-for="{value,label} in $dict.getDictData('0442')" :key="value" :label="label" :value="value" >
            <span>{{label}}</span>
          </div>
        </div>
      </i-col>
      <!--表格-->
      <i-col :span="20">
        <data-box  :columns="treeColumns" :data="dataSet"  :page="pageService"></data-box>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import { Dependencies } from "~/core/decorator";
  import { Layout } from "~/core/decorator";
  import { PageService } from "~/utils/page.service";
  @Layout("workspace")
  @Component({
    components: {}
  })
  export default class FlushingConfig extends Page{
    @Dependencies(PageService) private pageService: PageService;
    private dataSet: Array<any> = []
    private treeColumns:any = [{

    }]
    mounted(){
      this.dataSet = [{}]
    }
  }
</script>

<style lang="less" scoped>
  .page.flushing-config {
    .data-form {
      .form-item {
        border: 1px solid #dddee1;
        height: 552px;
        margin-top: 9px;
        .form-item-name {
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          width: 100%;
          background: #f8f8f9;
          height: 41px;
          top: 1px;
          span {
            position: relative;
            top: 10px;
          }
        }
        .form-item-tree {
          overflow: auto;
          height: 524px;
          .data-form-list-template {
            cursor: pointer;
            width: 100%;
            padding-left: 20px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            position: relative;
            margin: auto;
          }
        }
      }
    }
  }
</style>

