<!--模块功能-->
<template>
  <section class="page module-function">
    <span class="form-title">模块功能</span>
    <i-row style="margin-bottom:10px;margin-left:25px;">
      <span>菜单名称：</span>
      <i-input placeholder="请输入菜单名称" style="display:inline-block"></i-input>
      <span style="margin-left:10px;">菜单编号：</span>
      <i-input placeholder="请输入菜单编号" style="display:inline-block"></i-input>
      <span style="margin-left:10px;">所属系统：</span>
      <i-input placeholder="请输入所属系统" style="display:inline-block"></i-input>
      <i-select placeholder="全部状态" style="margin-left:10px;">
        <i-option label="已启用" value="已启用" key="已启用"></i-option>
        <i-option label="未启用" value="未启用" key="未启用"></i-option>
      </i-select>
      <i-button style="margin-left:10px;" class="blueButton">搜索</i-button>
      <i-button style="margin-left:10px;" class="blueButton" @click="addModuleFunction">添加</i-button>
    </i-row>
    <i-row :gutter="20">
      <!--树-->
      <i-col :span="3" style="border:1px solid #F2F2F2;height:500px;margin-left:30px;">
        <span class="title">模块名称</span>
        <i-tree :data="treeData"></i-tree>
      </i-col>
      <!--表格-->
      <i-col :span="20">
        <span class="title">模块功能</span>
        <data-box :columns="treeColumns" :data="treeDatabox"></data-box>
      </i-col>
    </i-row>

    <template>
      <i-modal title="模块添加/修改" v-model="addModuleFunctionModal" class="modal" width="400">
        <i-form :label-width="100" style="margin-top:20px;">
          <i-form-item label="模块名称">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="排序">
            <i-select class="input">
              <i-option label="进销存系统" value="进销存系统" key="进销存系统"></i-option>
              <i-option label="汽车金融系统" value="汽车金融系统" key="汽车金融系统"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="状态">
            <i-select class="input">
              <i-option label="启用" value="启用" key="启用"></i-option>
              <i-option label="停用" value="停用" key="停用"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="权限图标">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="模块等级">
            <i-select class="input">
              <i-option label="一级菜单" value="一级菜单" key="一级菜单"></i-option>
              <i-option label="下级菜单" value="下级菜单" key="下级菜单"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="父级目录">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="模块路径(url)">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="模块编号">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="所属系统">
            <i-select class="input">
              <i-option label="进销存系统" value="进销存系统" key="进销存系统"></i-option>
              <i-option label="汽车金融系统" value="汽车金融系统" key="汽车金融系统"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="描述">
            <i-input type="textarea" class="input"></i-input>
          </i-form-item>
          <div slot="footer">
            <i-button>取消</i-button>
            <i-button class="blueButton">确定</i-button>
          </div>
        </i-form>
      </i-modal>
    </template>

    <!--功能模块-->
    <template>
      <i-modal v-model="functionModuleModal" width="1200" title="功能模块">
        <function-module></function-module>
      </i-modal>
    </template>
  </section>

</template>

<script lang="ts">
  import DataBox from "~/components/common/data-box.vue";
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import FunctionModule from "~/components/system-manage/function-module.vue"
  import {
    Dependencies
  } from "~/core/decorator";
 import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({
    
    components: {
      DataBox,
      FunctionModule
    }
  })
  export default class ModuleFunction extends Page {
    private treeData: Array < Object > = [];
    private treeColumns: any;
    private treeDatabox: Array < Object > = [];
    private addModuleFunctionModal: Boolean = false;
    private functionModuleModal: Boolean = false;

    /**
     * 添加
     */
    addModuleFunction() {
      this.addModuleFunctionModal = true
    }
    created() {
      this.treeData = [{
          title: '采购',
          expand: true,
          children: [{
              title: '采购管理',
              expand: true,
              children: [{
                title: '市场行情查询'
              }, {
                title: '门店需求查询'
              }, {
                title: '采购单填报'
              }, {
                title: '采购单查询'
              }, {
                title: '采购分配车库'
              }]
            },
            {
              title: '审批管理'
            },
            {
              title: '财务记账'
            }
          ]
        },
        {
          title: '库存'
        },
        {
          title: '销售'
        },
        {
          title: '财务'
        },
        {
          title: '基础数据'
        },
        {
          title: '综合查询'
        },
        {
          title: '系统设置'
        }
      ]
      this.treeColumns = [{
        align: 'center',
        type: 'index',
        title: '选择',
        width: 60
      }, {
        align: 'center',
        title: '操作',
        width: 260,
        render: (h, {
          row,
          columns,
          index
        }) => {
          return [
            h('i-button', {
              props: {
                type: 'text'
              },
              style: {
                color: 'blue'
              },
              on: {
                click: () => {
                  // this.$Modal.info({
                  //   render:h=>h(FunctionModule),
                  //   title:'功能模块',
                  //   width:1200
                  // })
                  this.functionModuleModal = true
                }
              }
            }, '功能模块'),
            h('i-button', {
              props: {
                type: 'text'
              },
              style: {
                color: 'blue'
              },
              on: {
                click: () => {

                }
              }
            }, '修改'),
            h('i-button', {
              props: {
                type: 'text'
              },
              style: {
                color: 'blue'
              },
              on: {
                click: () => {

                }
              }
            }, '删除')
          ]
        }
      }, {
        align: 'center',
        key: 'path',
        title: '路径',
      }, {
        align: 'center',
        key: 'requestType',
        title: '请求方式',
        width: 90
      }, {
        align: 'center',
        key: 'powerIcon',
        title: '权限图标',
        width: 120
      }, {
        align: 'center',
        key: 'createTime',
        title: '创建时间',
        width: 180
      }, {
        align: 'center',
        key: 'operator',
        title: '操作人',
        width: 120
      }, {
        align: 'center',
        key: 'modifyTime',
        title: '修改时间',
        width: 120
      }, {
        align: 'center',
        key: 'status',
        title: '状态',
        width: 120
      }, {
        align: 'center',
        key: 'moduleId',
        title: '模块编号',
        width: 120
      }, {
        align: 'center',
        key: 'belongSystem',
        title: '所属系统',
        width: 120
      }, {
        align: 'center',
        title: '描述',
        width: 120,
        render: (h, {
          row,
          columns,
          index
        }) => {
          return h('i-button', {
            props: {
              type: 'text'
            },
            on: {
              click: () => {

              }
            },
            style: {
              color: 'blue'
            }
          }, '查看')
        }
      }]

      this.treeDatabox = [{
        path: 'restoration/lease/toApplyList.html',
        requestType: 'POST',
        powerIcon: 'leftico01.png',
        createTime: '2017-12-01 13:56:56',
        operator: '管理员',
        modifyTime: '2017-12-01 15:36:21',
        status: '启用',
        moduleId: '010506',
        belongSystem: '进销存'
      }]
    }
  }
</script>

<style>
  .title {
    font-size: 14px;
    font-weight: bold;
  }

  .input {
    width: 60%;
  }
</style>