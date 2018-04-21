<!--客户资料查询-->
<template>
  <section class="page customer-data-query">
    <page-header title="客户资料查询" hiddenPrint hiddenExport>

    </page-header>
    <data-form date-prop="timeSearch" :model="ordertransferModel" @on-search="refreshData" hidden-reset :page="pageService">
      <template slot="input">
        <i-form-item prop="dateRange">
          <i-date-picker v-model="ordertransferModel.dateRange" type="daterange" @on-change="startTimeChange" ></i-date-picker>
        </i-form-item>
        <i-form-item prop="orderInfo">
          <i-input v-model="ordertransferModel.orderInfo" @on-change="orderInfochange" placeholder="请输入订单编号/客户姓名/证件号码/联系号码查询"></i-input>
        </i-form-item>
      </template>
    </data-form>
    <data-box :id="376" :columns="columns1" :data="customerDataSet" :page="pageService" @onPageChange="refreshData"></data-box>
    <!--Model-->
    <template>
      <i-modal v-model="openColumnsConfig" title="列配置">
        <i-table :columns="columns2" :data="data2"></i-table>
        <div slot="footer">
          <i-button>上移</i-button>
          <i-button>下移</i-button>
          <i-button>恢复默认</i-button>
          <i-button @click="openColumnsConfig=false">关闭</i-button>
        </div>
      </i-modal>
    </template>
    <!--上传资料、补充资料-->
    <template>
      <i-modal v-model="openUpload" :transfer="false" width="700" title="补充资料">
        <upload-the-material ref="upload-the-material"></upload-the-material>
        <!--<i-button @click="uploadDialog">上传</i-button>
        <div style="font-size:18px;font-weight:bold;margin-top:10px">
          <span>文件数量（3）</span>
          <div style="display:inline-block;float:right;">
            <i-icon type="ios-download" style="position:relative;left:10px;"></i-icon>
            <i-button type="text">全部下载</i-button>
          </div>
        </div>
        <div style="margin-top:6px;font-size:14px;">
          <span>身份证-001fdawdeklvkje...</span><span style="margin-left:10px;">驾驶证-001fdawdeklvkje...</span>
        </div>
        <div style="margin-top:6px;font-size:14px;">
          <span>结婚证-001fdawdeklvkje...</span>
        </div>-->
        <div slot="footer">
          <i-button class="highDefaultButton" style="width:80px" @click="openUpload=false">取消</i-button>
          <i-button class="highButton" style="width:80px" @click="confirm">确定</i-button>
        </div>
      </i-modal>
    </template>

    <template>
      <i-modal v-model="uploadList" title="上传合同">
        <i-form :label-width="110">
          <i-form-item label="文件类型">
            <i-select style="width:160px;">
              <i-option label="身份证（必须）" value="身份证（必须）" key="身份证（必须）"></i-option>
              <i-option label="银行流水（必须）" value="银行流水（必须）" key="银行流水（必须）"></i-option>
              <i-option label="房产证（必须）" value="房产证（必须）" key="房产证（必须）"></i-option>
              <i-option label="话单（必须）" value="话单（必须）" key="话单（必须）"></i-option>
              <i-option label="行驶证（必须）" value="行驶证（必须）" key="行驶证（必须）"></i-option>
              <i-option label="驾驶证（必须）" value="驾驶证（必须）" key="驾驶证（必须）"></i-option>
              <i-option label="户口本" value="户口本" key="户口本"></i-option>
              <i-option label="结婚证" value="结婚证" key="结婚证"></i-option>
              <i-option label="学历证" value="学历证" key="学历证"></i-option>
            </i-select>
            <i-upload action="//jsonplaceholder.typicode.com/posts/" style="display:inline-block;margin-left:10px;">
              <i-button type="ghost" icon="ios-cloud-upload-outline">上传</i-button>
              <div style="margin-top:10px;">
              </div>
            </i-upload>
          </i-form-item>
        </i-form>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import Component from "vue-class-component";
import DataBox from "~/components/common/data-box.vue";
import { Dependencies } from "~/core/decorator";
import { PersonalService } from "~/services/manage-service/personal.service";
import { PageService } from "~/utils/page.service";
import { FilterService } from "~/utils/filter.service";
import { Layout } from "~/core/decorator";
import UploadTheMaterial from "~/components/purchase-manage/upload-the-material.vue";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    UploadTheMaterial
  }
})
export default class CustomerDataQuery extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(PersonalService) private personalService: PersonalService;

  private searchOptions: Boolean = false;
  private rowData: any = "";
  private openUpload: Boolean = false;
  private uploadList: Boolean = false;
  private customName: String = "";
  private columns1: any = null;
  private customerDataSet: Array<Object> = [];
  private openColumnsConfig: Boolean = false;
  private uploadOrAddFlag: Boolean = false;
  private columns2: any;
  private data2: Array<Object>;
  private ordertransferModel: any = {
    orderInfo: "", // 请输入客户姓名/证件号码/联系号码/订单所属人查询
    startTime: "", // 起始日期
    endTime: "", // 终止日期
    timeSearch: "",
    dateRange:[]
  };

  created() {
    this.refreshData();
    this.columns1 = [
      {
        title: "操作",
        align: "center",
        fixed: "left",
        render: (h, { row, column, index }) => {
          return h(
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
                  this.addFiles(row);
                }
              }
            },
            "补充资料"
          );
        }
      },
      {
        title: "订单编号",
        editable: true,
        key: "orderNumber",
        align: "center"
      },
      {
        title: "订单创建时间",
        editable: true,
        key: "createTime",
        align: "center",
        render: (h, { row, column, index }) => {
          return h(
            "span",
            FilterService.dateFormat(row.createTime, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        title: "订单类型",
        editable: true,
        key: "orderType",
        align: "center",
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$dict.getDictName(row.orderType));
        }
      },
      {
        title: "产品名称",
        editable: true,
        key: "productName",
        align: "center"
      },
      {
        title: "客户姓名",
        editable: true,
        key: "personalName",
        align: "center"
      },
      {
        title: "证件号码",
        editable: true,
        key: "idCard",
        align: "center"
      },
      {
        title: "联系号码",
        editable: true,
        key: "mobileMain",
        align: "center"
      }
    ];
    this.columns2 = [
      {
        title: "序号",
        type: "index",
        width: "80",
        align: "center"
      },
      {
        title: "列名",
        key: "columnsName",
        align: "center"
      },
      {
        type: "selection",
        width: "80",
        align: "center"
      }
    ];
    this.data2 = [
      {
        columnsName: "资料上传"
      },
      {
        columnsName: "订单编号"
      },
      {
        columnsName: "订单创建时间"
      },
      {
        columnsName: "订单类型"
      },
      {
        columnsName: "产品名称"
      },
      {
        columnsName: "客户姓名"
      },
      {
        columnsName: "证件号码"
      },
      {
        columnsName: "联系号码"
      }
    ];
  }
  /**
   * 补充资料确定
   */
  confirm() {
    let uploadTheMaterial: any = this.$refs["upload-the-material"];
    let MaterialData: any = uploadTheMaterial.dataList.map(v => {
      return {
        id: v.upid,
        materialUrl: v.url,
        uploadName: v.name,
        personalId: v.personalId,
        materialType: v.typeup,
        operateTime: v.createTime,
        dataSize: v.size
      };
    });
    let uploadData: any = {
      personalDataModel: MaterialData,
      personalId: this.rowData.personalId
    };
    this.personalService.uploadPersonalApproveFile(uploadData).subscribe(
      data => {
        this.openUpload = false;
        this.$Message.success("上传成功！");
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }
  refreshData() {
    this.personalService
      .getCustomerDataOrder(this.ordertransferModel, this.pageService)
      .subscribe(
        data =>this.customerDataSet = data,
        err => this.$Message.error(err)
      );
  }
  /**
   * 清空timeSearch
   */
  startTimeChange(val) {
    //   this.ordertransferModel.startTime = FilterService.dateFormat(this.ordertransferModel.startTime)
    this.ordertransferModel.timeSearch = "";
  }
  endTimeChange(val) {
    //   this.ordertransferModel.endTime = FilterService.dateFormat(this.ordertransferModel.endTime)
    this.ordertransferModel.timeSearch = "";
  }
  orderInfochange() {
    this.ordertransferModel.timeSearch = "";
  }
  openSearch() {
    this.searchOptions = !this.searchOptions;
  }
  /**
   *根据日月年查询
   */
  getOrderInfoByTime(val) {
    this.ordertransferModel.startTime = "";
    this.ordertransferModel.endTime = "";
    this.ordertransferModel.orderInfo = "";
    this.ordertransferModel.timeSearch = val;
    this.refreshData();
  }
  /**
   * 上传资料
   */
  uploadFiles(row) {
    let _uploadthematerial: any = this.$refs["upload-the-material"];
    _uploadthematerial.resetfileList();
    this.uploadOrAddFlag = true;
    this.openUpload = true;
  }
  /**
   * 补充资料
   */
  addFiles(row) {
    this.rowData = row;
    let _uploadthematerial: any = this.$refs["upload-the-material"];
    _uploadthematerial.resetfileList();
    this.openUpload = true;
    this.uploadOrAddFlag = false;
    if (row.personalMateriaList) {
      _uploadthematerial.supplement(row.personalMateriaList);
    }
  }
  /**
   * 列配置
   */
  columnsConfig() {
    this.openColumnsConfig = true;
  }
  uploadDialog() {
    this.uploadList = true;
  }
}
</script>

<style lang="less" scoped>
.page.customer-data-query {
  .seek-day {
    margin-top: 10px;
  }
  .unfold-button {
    color: #265ea2;
  }
  .seek-line {
    margin: 6px;
    margin-left: 10px;
    .seek-line-picker {
      width: 200px;
    }
    .seek-line-input {
      display: inline-block;
      width: 20%;
    }
    .seek-line-button {
      margin-left: 10px;
      background: #265ea2;
      color: #fff;
    }
  }
}
</style>
