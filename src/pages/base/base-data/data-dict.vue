<!--数据字典-->
<template>
    <section class="page data-dict">
        <i-row style="margin-top:20px;">
            <span style="font-size:18px;font-weight:bold;margin-left:2px;">数据字典</span>
            <i-row>
                <i-col :span="6">
                    <div style="background:#D8D8D8;width:250px;height:30px;text-align:center;border:1px solid black;line-height:30px;font-size:16px;">
                        <span>数据类型</span>
                    </div>
                    <div style="width:250px;height:600px;border-left:1px solid black;border-right:1px solid black;border-bottom:1px solid black;overflow:auto;">
                        <div v-for="item in dataType" :key="item.code" :value="item.name" :class="{'dataTypeCss':checkId===item.id}" style="cursor:pointer;width:228px;height:40px;line-height:40px;font-size:16px;postion:relative;margin:auto" @click="checkDataType(item)" v-model="dictAguments.id">
                            <span style="">{{item.name}}</span>
                        </div>
                    </div>
                </i-col>
                <i-col :span="17" style="position:relative;bottom:30px;" :pull="1">
                    <span>数据名称：</span>
                    <i-input style="width:10%;" v-model="dictAguments.name"></i-input>
                    <i-button class="blueButton" style="margin-left:10px" @click="seach">搜索</i-button>
                    <i-button class="blueButton" style="margin-left:10px;position:absolute;right:0;" @click="addData" disabled="disabled">新增数据</i-button>
                    <table border="1" width="100%" style="margin-top:10px;border:1px solid #DDDEE1" id="tb">
                        <tr align="center" height="40">
                            <td bgcolor="#F2F2F2" width="100">序号</td>
                            <td bgcolor="#F2F2F2">操作</td>
                            <td bgcolor="#F2F2F2">名称</td>
                        </tr>
                        <tr v-for="item in dataNames" :key="item.id" :value="item.name" align="center">
                            <td>{{item.id}}</td>
                            <td width="360">
                                <i-button type="text" style="color:blue" @click="editDict" disabled="disabled">编辑</i-button>
                                <i-button type="text" style="color:blue" @click="deleteDataDict(item)" disabled="disabled">删除</i-button>
                            </td>
                            <td>{{item.name}}</td>
                        </tr>
                    </table>
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
import { Dependencies } from "~/core/decorator";
import { OrderService } from "~/services/business-service/order.service";
import { Layout } from "~/core/decorator";
import { DataDictTypeService } from "~/services/manage-service/dataDictType.service";
import { DataDictService } from "~/services/manage-service/dataDict.service";
import { PageService } from "~/utils/page.service";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class DataDict extends Page {
  @Dependencies(DataDictTypeService)
  private dataDictTypeService: DataDictTypeService;
  @Dependencies(DataDictService) private dataDictService: DataDictService;
  @Dependencies(PageService) private pageService: PageService;
  private columns1: any;
  private data1: Array<Object> = [];
  private dataType: Array<any> = [];
  private dataNames: Array<any> = [];
  private searchOptions: Boolean = false;
  private checkId: Number = 1;
  private item: any;
  private dictAguments: any;
  created() {
    this.dataNames = [];
    this.item = {
      code: "0001"
    };
    this.dictAguments = {
      code: "",
      name: ""
    };
    this.getAllDictType();
    this.checkDataType(this.item);
  }

  getOrderInfoByTime() {}
  openSearch() {
    this.searchOptions = !this.searchOptions;
  }
  exportMonthReport() {}
  addData() {
    let tb = document.getElementById("tb");
  }

  /**
   * 查询所有数据字典类型
   */
  getAllDictType() {
    this.dataDictTypeService.getAllDictType().subscribe(val => {
      this.dataType = val.object;
    });
  }
  /**
   * 根据数字字典查询对应的数据字典
   */
  checkDataType(item) {
    this.checkId = item.id;
    this.dictAguments.code = item.code;
    this.dataDictService
      .getDataDictByTypeCode({
        typeCode: item.code
      })
      .subscribe(val => {
        this.dataNames = val.object;
      });
  }
  /**
   *  删除
   */
  deleteDataDict(item) {
    this.$Modal.confirm({
      title: "提示",
      content: "确定删除吗？",
      onOk: () => {
        this.dataDictService
          .deleteDataDict({
            id: item.id
          })
          .subscribe(val => {});
      }
    });
  }
  /**
   * 搜索
   */
  seach() {
    this.dataDictService
      .getAllDataDict(this.dictAguments, this.pageService)
      .subscribe(val => {
        this.dataNames = val.object.list;
      });
  }
  /**
   * 编辑
   */
  editDict() {}
  mounted() {
    this.checkId = 1;
  }
}
</script>
<style>
.dataTypeCss {
  background: #e4f4fa;
}
</style>
