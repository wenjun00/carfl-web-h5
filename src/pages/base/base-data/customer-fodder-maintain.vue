<!--客户素材维护-->
<template>
  <section class="page customer-fodder-maintain">
    <i-row style="margin-top:20px;">
      <span style="font-size:18px;font-weight:bold;margin-left:8px;">客户素材维护</span>
      <i-row>
        <i-col :span="6" style="margin-left:10px;">
          <div style="background:#D8D8D8;width:250px;height:30px;border:1px solid black;line-height:30px;font-size:16px;">
            <span style="position:relative;left:10px;">素材类型</span>
            <div style="float:right;display:inline-block;font-weight:bold">
              <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;">
                <svg-icon iconClass="tianjiawenjian"></svg-icon>
              </div>
              <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;">
                <svg-icon iconClass="tianjiawenjianjia"></svg-icon>
              </div>
              <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;">
                <svg-icon iconClass="sousuo"></svg-icon>
              </div>
            </div>
          </div>
          <div style="width:250px;height:600px;border-left:1px solid black;border-right:1px solid black;border-bottom:1px solid black">
            <div v-for="item in maintains" :key="item.id" :value="item.name" :class="{'maintainCss':checkId===item.id}" style="cursor:pointer;width:228px;height:40px;line-height:40px;font-size:16px;postion:relative;margin:auto"
              @click="checkMaintain(item)"><span>{{item.name}}</span></div>
          </div>
        </i-col>
        <i-col :span="17" style="position:relative;bottom:30px;" :pull="1">
          <span>素材名称：</span>
          <i-input style="width:10%"></i-input>
          <i-button class="blueButton" style="margin-left:10px">搜索</i-button>
          <i-button class="blueButton" style="margin-left:10px">新增素材</i-button>
          <data-box :columns="columns1" :data="data1"></data-box>
        </i-col>
      </i-row>
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
  export default class CustomerFodderMaintain extends Page {
    @Dependencies(OrderService) private orderService: OrderService;
    private columns1: any;
    private data1: Array < Object > = [];
    private maintains: Array < any > = [];
    private searchOptions: Boolean = false;
    private checkId: Number = 1
    created() {
      this.maintains = [{
        id: 1,
        name: '个人基本资料'
      }, {
        id: 2,
        name: '资产证明'
      }, {
        id: 3,
        name: '银行流水'
      }, {
        id: 4,
        name: '征信'
      }, {
        id: 5,
        name: '职业证明'
      }, {
        id: 6,
        name: '其他'
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
                  color: '#265EA2'
                }
              }, '编辑'),
              h('i-button', {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                }
              }, '删除')
            ])
          }
        },
        {
          title: "名称",
          key: "maintainName",
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
        maintainName: '身份证'
      }]
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    exportMonthReport() {}
    checkMaintain(item) {
      this.checkId = item.id
    }
  }

</script>
<style>
  .maintainCss {
    background: #E4F4FA;
  }

</style>
