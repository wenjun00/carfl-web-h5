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
            <div v-for="item in maintains" :key="item.id" :value="item.name" :class="{'maintainCss':item.id===checkId}" style="cursor:pointer;width:228px;height:40px;line-height:40px;font-size:16px;postion:relative;margin:auto"
              @click="checkMaintain(item)">
              <span>{{item.name}}</span>
            </div>
          </div>
        </i-col>
        <i-col :span="17" style="position:relative;bottom:30px;" :pull="1">
          <span>素材名称：</span>
          <i-input style="width:10%" v-model="personalModel.name"></i-input>
          <i-button class="blueButton" style="margin-left:10px" @click="search">搜索</i-button>
          <i-button class="blueButton" style="margin-left:10px">新增素材</i-button>
          <data-box :columns="columns" :data="data1"></data-box>
        </i-col>
      </i-row>
    </i-row>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import SvgIcon from "~/components/common/svg-icon.vue";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    DataDictService
  } from "~/services/manage-service/dataDict.service";
  import {
    PersonalMaterialService
  } from "~/services/manage-service/personalMaterial.service";
  import {
    PageService
  } from "~/utils/page.service";
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
    @Dependencies(DataDictService) private dataDictService: DataDictService;
    @Dependencies(PersonalMaterialService)
    private personalMaterialService: PersonalMaterialService;
    @Dependencies(PageService) private pageService: PageService;
    private columns: any;
    private data1: Array < Object > = [];
    private maintains: Array < any > = [];
    private searchOptions: Boolean = false;
    private checkId: number = 0;
    private item: any;
    private personalModel: any;
    created() {
      this.maintains = [];
      this.item = {
        id: "376"
      };
      this.getCustomerList();
      this.checkMaintain(this.item);
      this.personalModel = {
        type: 0,
        name: ''
      }
      console.log(this.personalModel, 123)
      this.columns = [{
          title: "序号",
          width: 60,
          type: "index",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("div", [
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  }
                },
                "编辑"
              ),
              h(
                "i-button", {
                  props: {
                    type: "text"
                  },
                  style: {
                    color: "#265EA2"
                  }
                },
                "删除"
              )
            ]);
          }
        },
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "是否上传",
          key: "isNecessary",
          align: "center",
          render: (h, {
            row,
            columns,
            index
          }) => {
            return h(
              "RadioGroup", {
                props: {
                  value: 1
                }
              }, [
                h("Radio", {
                  props: {
                    label: "是",
                    value: 1
                  }
                }),
                h("Radio", {
                  props: {
                    label: "否",
                    value: 2
                  }
                })
              ]
            );
          }
        }
      ];

      this.data1 = [{
        maintainName: "身份证"
      }];
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    exportMonthReport() {}

    /**
     * 获取客户素材列表
     */
    getCustomerList() {
      this.dataDictService
        .getDataDictByTypeCode({
          typeCode: "0309"
        })
        .subscribe(val => {
          this.maintains = val.object;
        });
    }
    /**
     * 分页查询客户素材
     *
     */
    checkMaintain(item) {
      console.log(item)
      this.checkId = item.id;
      this.personalModel = {
        type: item.id
      }
      this.search()
    }
    /**@
     * 根据条件搜索
     */
    search() {
      this.personalMaterialService
        .getAllPersonalMaterial(this.personalModel, this.pageService)
        .subscribe(val => {
          this.data1 = val.object.list;
        });
    }
    mounted() {
      this.checkId = 376
    }
  }

</script>
<style>
  .maintainCss {
    background: #e4f4fa;
  }

</style>
