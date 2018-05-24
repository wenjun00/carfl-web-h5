<!--客户资料查询-->
<template>
  <section class="page customer-data-query">
    <page-header title="资料补充查询" hiddenPrint hiddenExport></page-header>
    <data-form date-prop="timeSearch" :model="ordertransferModel" @on-search="refreshData"  :page="pageService">
      <template slot="input">
        <!-- <i-form-item prop="orderInfo">
          <i-input v-model="ordertransferModel.orderInfo" @on-change="orderInfochange" placeholder="请输入订单编号/客户姓名/证件号码/联系号码查询"></i-input>
        </i-form-item> -->
        <i-form-item prop="orderNumber" label="订单编号">
          <i-input v-model="ordertransferModel.orderNumber" placeholder="请输入联系电话"></i-input>
        </i-form-item>
         <i-form-item prop="personalName" label="客户姓名">
          <i-input v-model="ordertransferModel.personalName" placeholder="请输入客户姓名"></i-input>
        </i-form-item>
        <i-form-item prop="idCard" label="证件号码">
          <i-input v-model="ordertransferModel.idCard" placeholder="请输入证件号码"></i-input>
        </i-form-item>
        <i-form-item prop="dateRange" label="订单创建时间">
          <i-date-picker v-model="ordertransferModel.dateRange" type="daterange" @on-change="startTimeChange" placeholder="请选择日期范围"></i-date-picker>
        </i-form-item>
        
      </template>
    </data-form>
    <data-box :id="376" :columns="columns1" :data="customerDataSet" :page="pageService" @onPageChange="refreshData"></data-box>
    <!--上传资料、补充资料-->
    <template>
      <i-modal class="pop-update" v-model="openUpload" :transfer="false" :width="700" title="补充资料">
        <upload-material ref="upload-material"></upload-material>
        <div slot="footer">
          <i-button class="high-default-button" @click="openUpload=false">取消</i-button>
          <i-button class="high-default-button" @click="confirm">确定</i-button>
        </div>
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
import UploadMaterial from "~/components/purchase-manage/upload-material.tsx.vue";
import { Mutation,namespace } from "vuex-class"

const   ModuleMutation = namespace('purchase',Mutation)

@Layout("workspace")
@Component({
  components: {
    DataBox,
    UploadMaterial
  }
})
export default class CustomerDataQuery extends Page {
  @Dependencies(PageService) private pageService: PageService;
  @Dependencies(PersonalService) private personalService: PersonalService;
  @ModuleMutation updateProductId

  private searchOptions: Boolean = false;
  private rowData: any = "";
  private openUpload: Boolean = false;
  private customName: String = "";
  private columns1: any = null;
  private customerDataSet: Array<Object> = [];
  private openColumnsConfig: Boolean = false;
  private uploadOrAddFlag: Boolean = false;
  private columns2: any;
  private data2: Array<Object>;
  private ordertransferModel: any = {
    orderNumber:"",
    personalName:'',
    idCard:'',
    orderInfo: "", // 请输入客户姓名/证件号码/联系号码/订单所属人查询
    startTime: "", // 起始日期
    endTime: "", // 终止日期
    timeSearch: "",
    dateRange: []
  };

  created() {
    this.refreshData();
    this.columns1 = [
      {
        title: "操作",
        align: "center",
        fixed: "left",
        minWidth: this.$common.getColumnWidth(5),
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
        align: "center",
        minWidth: this.$common.getColumnWidth(6),
      },
      {
        title: "订单创建时间",
        editable: true,
        key: "createTime",
        align: "center",
        minWidth: this.$common.getColumnWidth(6),
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
        minWidth: this.$common.getColumnWidth(4),
        render: (h, { row, column, index }) => {
          return h("span", {}, this.$dict.getDictName(row.orderType));
        }
      },
      {
        title: "产品名称",
        editable: true,
        key: "productName",
        align: "center",
        minWidth: this.$common.getColumnWidth(6),
      },
      {
        title: "客户姓名",
        editable: true,
        key: "personalName",
        align: "center",
        minWidth: this.$common.getColumnWidth(3),
      },
      {
        title: "证件号码",
        editable: true,
        key: "idCard",
        align: "center",
        minWidth: this.$common.getColumnWidth(6),
      },
      {
        title: "联系号码",
        editable: true,
        key: "mobileMain",
        align: "center",
        minWidth: this.$common.getColumnWidth(5),
      }
    ];
    this.columns2 = [
      {
        title: "序号",
        type: "index",
        minWidth: "80",
        align: "center"
      },
      {
        title: "列名",
        key: "columnsName",
        align: "center"
      },
      {
        type: "selection",
        minWidth: "80",
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
    let uploadTheMaterial: any = this.$refs["upload-material"];
    let MaterialData: any = uploadTheMaterial.uploadDataSet.map(v => {
      return {
        id: v.upid,
        materialUrl: v.materialUrl,
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
      data => this.customerDataSet = data
      ,
      err => this.$Message.error(err.msg)
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
    let _uploadthematerial: any = this.$refs["upload-material"];
    _uploadthematerial.reset();
    this.uploadOrAddFlag = true;
    this.openUpload = true;
  }
  /**
   * 补充资料
   */
  addFiles(row) {
    this.openUpload = true;
    this.rowData = row;
    // TODO 更新store 产品ID 进行查看所有资源数据和上传新的资源
    let _uploadthematerial: any = this.$refs["upload-material"];
    _uploadthematerial.reset();

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
}
</script>

<style lang="less" scoped>
.page.customer-data-query {
  .seek-day {
    margin-top: 10px;
  }
}
.pop-update {
  .high-default-button {
    width: 80px;
  }
}
</style>
