<!--数据字典-->
<template>
  <section class="page data-dict">
    <i-row style="margin-top:20px;">
      <span style="font-size:18px;font-weight:bold;margin-left:2px;">数据字典</span>
      <i-row>
        <i-col :span="6">
          <div style="background:#D8D8D8;width:250px;height:30px;text-align:center;border:1px solid black;line-height:30px;font-size:16px;">
            <span>数据类型</span>
            <span @click="addVehicle">
              <svg-icon iconClass="tianjiawenjian"></svg-icon>
            </span>
          </div>
          <div style="width:250px;height:600px;border-left:1px solid black;border-right:1px solid black;border-bottom:1px solid black;overflow:auto;">
            <div v-for="item in dataType" :key="item.id" :value="item.name" :class="{'dataTypeCss':checkId===item.id}" style="cursor:pointer;width:228px;height:40px;line-height:40px;font-size:16px;postion:relative;margin:auto" @click="checkDataType(item)" v-model="dictAguments.id">
              <span style="">{{item.name}}</span>
            </div>
          </div>
        </i-col>
        <i-col :span="17" style="position:relative;bottom:30px;" :pull="1">
          <span>数据名称：</span>
          <i-input style="width:10%;" v-model="dictAguments.name"></i-input>
          <i-button class="blueButton" style="margin-left:10px" @click="seach">搜索</i-button>
          <i-button class="blueButton" style="margin-left:10px;position:absolute;right:0;" @click="dataModal=true">新增数据</i-button>
          <table border="1" width="100%" style="margin-top:10px;border:1px solid #DDDEE1" id="tb">
            <!--<tr align="center" height="40">
              <td bgcolor="#F2F2F2" width="100">序号</td>
              <td bgcolor="#F2F2F2">操作</td>
              <td bgcolor="#F2F2F2">名称</td>
            </tr>
            <tr v-for="item in dataNames" :key="item.id" :value="item.name" align="center">
              <td>{{item.id}}</td>
              <td width="360">
                <i-button type="text" style="color:blue" @click="editDict">编辑</i-button>
                <i-button type="text" style="color:blue" @click="deleteDataDict(item)">删除</i-button>
              </td>
              <td>{{item.name}}</td>
            </tr>-->
          </table>
          <i-table :columns="columns1" :data="dataNames"></i-table>
        </i-col>
      </i-row>
    </i-row>

    <template>
      <i-modal v-model="addNameModal" width="500" :title="checkModal?'编辑数据':'新增数据'" class="toViewModalClass">
        <i-form :label-width="60" style="margin-top:20px;">
          <i-form-item label="名称" prop="name">
            <i-input v-model="addModel.name"></i-input>
          </i-form-item>
        </i-form>
        <div style="text-align:right;">
          <i-button @click="canceladd" class="defalutButton">取消</i-button>
          <i-button @click="confirmmadd" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="adddatatypeModal" width="500" title="新增数据字典类型" class="toViewModalClass">
        <i-form :label-width="60" style="margin-top:20px;">
          <i-form-item label="名称" prop="name">
            <i-input v-model="addDataType.name"></i-input>
          </i-form-item>
          <i-form-item label="code码" prop="code">
            <i-input v-model="addDataType.type"></i-input>
          </i-form-item>
        </i-form>
        <div style="text-align:right;">
          <i-button @click="canceladdtype" class="defalutButton">取消</i-button>
          <i-button @click="confirmmaddtype" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal title="新增数据" v-model="dataModal">
        <i-form ref="add-data" :model="addDataModel" :rules="rulesAddDate" :label-width="80">
          <i-form-item label="数据名称" prop="name">
            <i-input v-model="addDataModel.name"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
          <i-button @click="cancelAddData">取消</i-button>
          <i-button class="blueButton" @click="submitAddData">添加</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import SvgIcon from "~/components/common/svg-icon.vue";
import { Form } from "iview";
import { Dependencies } from "~/core/decorator";
import { OrderService } from "~/services/business-service/order.service";
import { Layout } from "~/core/decorator";
import { DataDictTypeService } from "~/services/manage-service/data-dict-type.service";
import { DataDictService } from "~/services/manage-service/data-dict.service";
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
  private data1: Array<Object> = [];
  private dataType: Array<any> = [];
  private dataNames: Array<any> = [];
  private searchOptions: Boolean = false;
  private adddatatypeModal: Boolean = false;
  private checkId: Number = 1;
  private item: any;
  private columns1: any;
  private dictAguments: any;
  private addNameModal: Boolean = false;
  private checkModal: Boolean = false;
  private id: any = "";
  private rulesAddDate: any = {};
  private dataModal: Boolean = false;
  private typeCodes: any = 0;
  private addModel: any = {
    name: "",
    sort: "",
    typeCode: ""
  };
  private addDataType: any = {
    name: "",
    type: 0,
    code: ""
  };
  private checked: any = {};
  private addDataModel: any = {};
  created() {
    this.rulesAddDate = {
      name: [{ required: true, message: "请输入数据名称", trigger: "change" }]
    };
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
    this.columns1 = [
      {
        title: "操作",
        width: 200,
        fixed: "left",
        align: "center",
        render: (h, { row, column, index }) => {
          return h("div", [
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.checkModal = true;
                    this.addModel.name = row.name;
                    this.addNameModal = true;
                    this.id = row.id;
                  }
                }
              },
              "编辑"
            ),
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                },
                on: {
                  click: () => {
                    this.deleteDataDict(row);
                  }
                }
              },
              "删除"
            )
          ]);
        }
      },
      {
        align: "center",
        title: " 名称",
        key: "name"
      }
    ];
  }
  cancelAddData() {
    this.dataModal = false;
    let _addData: any = this.$refs["add-data"];
    _addData.resetFields();
  }
  getOrderInfoByTime() {}
  openSearch() {
    this.searchOptions = !this.searchOptions;
  }
  exportMonthReport() {}
  /**
   * 新增数据
   */
  addData() {
    this.checkModal = false;
    this.addNameModal = true;
  }
  /**
   * 确定
   */
  confirmmadd() {
    console.log(this.checkModal, "this.checkModal");
    if (this.checkModal) {
      this.addModel.id = this.id;
    } else {
      if (this.dataNames.length) {
        this.addModel.sort = this.dataNames[this.dataNames.length - 1].sort + 1;
      } else {
        this.addModel.sort = 0;
      }
    }
    this.addModel.typeCode = this.dictAguments.code;
    this.dataDictService.createOrModifyDataDict(this.addModel).subscribe(
      val => {
        this.$Message.success("操作成功！");
        this.seach();
        this.addNameModal = false;
        this.addModel.name = "";
        this.addModel.id = "";
        this.addModel.typeCode = "";
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }
  /**
   * 取消
   */
  canceladd() {
    this.addNameModal = false;
    this.addModel.name = "";
  }
  /**
   * 编辑
   */
  editDict(val) {}
  /**
   * 添加数据字典类型
   */
  addVehicle() {
    this.adddatatypeModal = true;
  }
  /**
   * 取消
   */
  canceladdtype() {
    this.adddatatypeModal = false;
    this.addDataType.name = "";
  }
  /**
   * 确定
   */
  confirmmaddtype() {
    this.dataDictTypeService
      .createOrModifyDataDictType(this.addDataType)
      .subscribe(
        val => {
          this.$Message.success("操作成功！");
          this.getAllDictType();
          this.adddatatypeModal = false;
          this.addDataType.name = "";
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 查询所有数据字典类型
   */
  getAllDictType() {
    this.dataDictTypeService.getAllDictType().subscribe(val => {
      this.dataType = val;
    });
  }
  /**
   * 根据数字字典查询对应的数据字典
   */
  checkDataType(item) {
    this.checked = item;
    this.checkId = item.id;
    this.typeCodes = item.code;
    this.dictAguments.code = item.code;
    this.dataDictService
      .getDataDictByTypeCode({
        typeCode: item.code
      })
      .subscribe(val => {
        this.dataNames = val;
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
          .subscribe(
            val => {
              this.$Message.success("操作成功！");
              this.seach();
            },
            ({ msg }) => {
              this.$Message.error(msg);
            }
          );
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
        this.dataNames = val;
      });
  }
  /**
   * 新增数据按钮
   */
  submitAddData() {
    let form = <Form>this.$refs["add-data"];
    this.addDataModel.typeCode = this.typeCodes;
    this.addDataModel.name = this.addDataModel.name;
    form.validate(valid => {
      if (!valid) return false;
      this.dataDictService.createOrModifyDataDict(this.addDataModel).subscribe(
        val => {
          this.$Message.success("新增数据成功！");
          this.cancelAddData();
          this.dataModal = false;
          this.checkDataType(this.checked);
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
    });
  }
  mounted() {
    this.checkId = 1;
  }
}
</script>
<style lang="less">
.dataTypeCss {
  background: #e4f4fa;
}

.toViewModalClass {
  .ivu-modal-footer {
    display: none !important;
  }
}
</style>
