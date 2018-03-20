<!--数据字典-->
<template>
  <section class="page data-dict">
    <i-row>
      <span class="form-title">数据字典</span>
      <i-row type="flex" align="top" justify="start">
        <i-col>
          <div style="width:250px;height:30px;border:1px solid #dddd;line-height:30px;font-size:16px;">
            <div style="width: 4px; height: 15px; background: rgb(38, 94, 162); display: inline-block; margin-left:10px;position:relative;top:2px;"></div>
            <span>数据类型</span>
            <span @click="addVehicle" style="float: right;margin-right: 12px;color:#265ea2;">
              <svg-icon iconClass="tianjiawenjian"></svg-icon>
            </span>
          </div>
          <div style="width:250px;height:600px;border:1px solid #dddd;border-top:0;overflow:auto;">
            <div v-for="item in dataType" :key="item.id" :value="item.name" :class="{'dataTypeCss':checkId===item.id}" style="cursor:pointer;width:100%;padding-left:10px;height:40px;line-height:40px;font-size:16px;postion:relative;margin:auto" @click="checkDataType(item)">
              <span style="">{{item.name}}</span>
            </div>
          </div>
        </i-col>
        <i-col class="rightTable">
          <span>数据名称：</span>
          <i-input style="width:20%;" v-model="dictAguments.name"></i-input>
          <i-button class="blueButton" style="margin-left:10px" @click="seach">搜索</i-button>
          <i-button class="blueButton" style="margin-left:10px" @click="resetSeach">重置</i-button>
          <i-button class="blueButton" style="margin-left:10px;position:absolute;right:13px;" @click="dataModal=true">新增数据</i-button>
          <data-box :columns="columns1" :data="dataNames" @onPageChange="seach" :page="pageService" :noDefaultRow="true"></data-box>
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
        <div slot="footer">
          <i-button @click="canceladd">取消</i-button>
          <i-button @click="confirmmadd" class="blueButton">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="adddatatypeModal" width="500" title="新增数据字典类型" class="toViewModalClass">
        <i-form :label-width="60" style="margin-top:20px;" :model="addDataType" :rules="rulesAddDataType" ref="add-data-type">
          <i-form-item label="名称" prop="name">
            <i-input v-model="addDataType.name"></i-input>
          </i-form-item>
        </i-form>
        <div slot="footer">
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
          <i-button class="blueButton" @click="submitAddData">确定</i-button>
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
  private dictAguments: any = {};
  private addNameModal: Boolean = false;
  private checkModal: Boolean = false;
  private id: any = "";
  private rulesAddDate: any = {};
  private rulesAddDataType: any = {};;
  private dataModal: Boolean = false;
  private typeCodes: any = 0;
  private addModel: any = {
    name: "",
    sort: "",
    typeCode: ""
  };
  private addDataType: any = {
    name: "",
    type: 0
  };
  private checked: any = {};
  private addDataModel: any = {};
  created() {
    this.rulesAddDate = {
      name: [
        { required: true, message: "请输入数据名称", trigger: "change" },
        { max: 20, message: "长度不能超过20个字符", trigger: "blur" }
      ]
    };
    this.rulesAddDataType = {
      name: [
        {
          required: true,
          message: "请输入数据字典类型名称",
          trigger: "change"
        },
        { max: 20, message: "长度不能超过20个字符", trigger: "blur" }
      ]
    };
    this.dataNames = [];
    this.item = {
      code: "0001"
    };
    this.dictAguments = {
      typeCode: "",
      name: ""
    };
    this.getAllDictType();
    this.checkDataType(this.item);
    this.columns1 = [
      {
        title: "序号",
        type: "index",
        fixed: "left",
        align: "center"
      },
      {
        title: "操作",
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
                    this.addNameModal = true;
                    this.addModel.name = row.name;
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
    if(this.addModel.name === ''){
      this.$Message.warning("请输入名称！");
      return
    }
    if (this.checkModal) {
      this.addModel.id = this.id;
    } else {
      if (this.dataNames.length) {
        this.addModel.sort = this.dataNames[this.dataNames.length - 1].sort + 1;
      } else {
        this.addModel.sort = 0;
      }
    }
    this.addModel.typeCode = this.dictAguments.typeCode;
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
    let formValid = <Form>this.$refs["add-data-type"];
    formValid.validate(valid => {
      if (!valid) return false;
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
    });
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
    this.dictAguments.typeCode = item.code;
    this.dataDictService
      .getDataDictByTypeCodeWithPage(this.dictAguments, this.pageService)
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
    this.checkDataType(this.checked);
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
  /**
   * 重置搜索
   */
  resetSeach() {
    this.dictAguments = {
      typeCode: "",
      name: ""
    };
  }
  mounted() {
    this.checkId = 1;
  }
}
</script>
<style lang="less" scoped>
.dataTypeCss {
  background: #e4f4fa;
}

.toViewModalClass {
  .ivu-modal-footer {
    display: none !important;
  }
}
.rightTable {
  width: calc(~ "100% - 280px");
  margin: -10px;
  margin-left: 20px;
}
</style>
