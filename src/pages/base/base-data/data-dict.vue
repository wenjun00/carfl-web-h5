<!--数据字典-->
<template>
  <section class="page data-dict">
    <span style="font-size:18px;font-weight:bold;">数据字典</span>
    <i-row>
      <i-col :span="6" style="margin-left:10px;">
        <div style="background:#D8D8D8;width:250px;height:30px;text-align:center;border:1px solid black;line-height:30px;font-size:16px;">
          <span>数据类型</span>
        </div>
        <div style="width:250px;height:600px;border-left:1px solid black;border-right:1px solid black;border-bottom:1px solid black">
          <div v-for="item in dataType" :key="item.id" :value="item.name" :class="{'dataTypeCss':checkId===item.id}" style="cursor:pointer;width:228px;height:40px;line-height:40px;font-size:16px;postion:relative;margin:auto"
            @click="checkDataType(item)"><span style="">{{item.name}}</span></div>
        </div>
      </i-col>
      <i-col :span="17">
        <span>素材名称：</span>
        <i-input></i-input>
        <i-button class="blueButton" style="margin-left:10px">搜索</i-button>
        <i-button class="blueButton" style="margin-left:10px" @click="addData">新增数据</i-button>
        <table border="1" width="100%" style="margin-top:10px;" id="tb">
          <tr align="center" height="40">
            <td bgcolor="#F2F2F2" width="100">序号</td>
            <td bgcolor="#F2F2F2">操作</td>
            <td bgcolor="#F2F2F2">名称</td>
          </tr>
          <tr v-for="item in dataNames" :key="item.id" :value="item.name" align="center">
            <td>{{item.id}}</td>
            <td width="360">
              <i-button type="text" style="color:blue">编辑</i-button>
              <i-button type="text" style="color:blue">删除</i-button>
            </td>
            <td>{{item.name}}</td>
          </tr>
        </table>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import SvgIcon from '~/components/common/svg-icon.vue'
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderService
  } from "~/services/business-service/order.service";
import {
    Layout
  } from "~/core/decorator";

  @Layout("workspace")
  @Component({
   
    components: {
      DataBox,
      SvgIcon
    }
  })
  export default class DataDict extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private data1: Array < Object > = [];
    private dataType: Array < any > = [];
    private dataNames: Array < any > = [];
    private searchOptions: Boolean = false;
    private checkId: Number = 1
    created() {
      this.dataType = [{
        id: 1,
        name: '性别'
      }, {
        id: 2,
        name: '婚姻状况'
      }, {
        id: 3,
        name: '单位性质'
      }, {
        id: 4,
        name: '职级'
      }, {
        id: 5,
        name: '代办服务'
      }, {
        id: 6,
        name: '证件类型'
      }, {
        id: 7,
        name: '保险险种'
      }]

      this.dataNames = [{
        id: 1,
        name: '男'
      }, {
        id: 2,
        name: '女'
      }]

      this.columns1 = [{
          title: "序号",
          width: 60,
          type: 'index',
          align: 'center'
        },
        {
          title: "操作",
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: 'blue'
                }
              }, '编辑'),
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: 'blue'
                }
              }, '删除')
            ])
          }
        },
        {
          title: "名称",
          key: "dataTypeName",
          align: 'center'
        },
        {
          title: "是否上传",
          key: "isUpload",
          align: 'center',
          render: (h, {
            row,
            columns,
            index
          }) => {
            return h('RadioGroup', {
              props: {
                value: 1
              }
            }, [
              h('Radio', {
                props: {
                  label: '是',
                  value: 1
                }
              }),
              h('Radio', {
                props: {
                  label: '否',
                  value: 2
                }
              })
            ])
          }
        }
      ]

      this.data1 = [{
        dataTypeName: '身份证'
      }]
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    exportMonthReport() {}
    checkDataType(item) {
      this.checkId = item.id
    }
    addData() {
      let tb = document.getElementById('tb')
      console.log(tb, 999)
    }
  }
</script>
<style>
  .dataTypeCss {
    background: #E4F4FA;
  }
</style>