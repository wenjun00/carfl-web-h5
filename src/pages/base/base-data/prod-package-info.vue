<!--产品包信息-->
<template>
    <section class="page prod-package-info">
        <i-row style="margin-top:10px;margin-left:10px;">
            <span style="font-size:18px;font-weight:bold">产品包信息</span>
            <span style="margin-left:10px;">文件名：</span>
            <i-input style="width:10%" v-model="productModel.fileName"></i-input>
            <span style="margin-left:10px;">上传时间：</span>
            <i-date-picker type="datetimerange" v-model="backupTimeRange" @on-change="changeBackupTime" @on-clear="clearDateTime"></i-date-picker>
            <i-button class="blueButton" style="margin-left:10px;" @click="getProductPackage">搜索</i-button>
            <div style="float:right;margin-right:12px;margin-top:10px;">
                <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
                    <svg-icon iconClass="daoru" style="font-size:16px;"></svg-icon>
                    <span style="font-size:14px;">导入</span>
                </div>
                <div style="font-size:14px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
                    <svg-icon iconClass="xiazai"></svg-icon>
                    <span>模版下载</span>
                </div>
            </div>
        </i-row>
        <data-box :columns="columns" :data="prdPackageList"></data-box>
    </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import SvgIcon from "~/components/common/svg-icon.vue";
import { Dependencies } from "~/core/decorator";
import { ProductPackageService } from "~/services/manage-service/productPackage.service";
import { Layout } from "~/core/decorator";
import { PageService } from "~/utils/page.service";
import { FilterService } from "~/utils/filter.service";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class ProdPackageInfo extends Page {
  @Dependencies(ProductPackageService)
  private productPackageService: ProductPackageService;
  @Dependencies(PageService) private pageService: PageService;
  private columns: any;
  private prdPackageList: Array<Object> = [];
  private searchOptions: Boolean = false;
  private productPackageModel: any;
  private productModel: any;
  private backupTimeRange: Array<any> = [];
  private productId: any;
  created() {
    this.getProductPackage();
    this.columns = [
      {
        title: "序号",
        width: 60,
        type: "index",
        align: "center"
      },
      {
        title: "操作",
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
                }
              },
              "预览"
            ),
            h(
              "i-button",
              {
                props: {
                  type: "text"
                },
                style: {
                  color: "#265EA2"
                }
              },
              "下载"
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
                    this.$Modal.confirm({
                      title: "提示",
                      content: "确定删除吗？",
                      onOk: () => {
                        this.deleteProductPackage(row);
                      }
                    });
                  }
                }
              },
              "删除"
            )
          ]);
        }
      },
      {
        title: "文件名",
        key: "fileName",
        align: "center"
      },
      {
        title: "上传时间",
        key: "uploadTime",
        align: "center",
        render: (h, { row, column, index }) => {
          return h(
            "span",
            FilterService.dateFormat(row.uploadTime, "yyyy-MM-dd hh:mm:ss")
          );
        }
      },
      {
        title: "操作人",
        key: "operator",
        align: "center"
      },
      {
        title: "备注",
        key: "remark",
        align: "center"
      }
    ];
    this.productModel = {
      fileName: "",
      startTime: "",
      endTime: ""
    };
  }
  getOrderInfoByTime() {}
  openSearch() {
    this.searchOptions = !this.searchOptions;
  }
  exportMonthReport() {}
  /**
   * 多条件分页查询产品包信息
   */
  getProductPackage() {
    this.productPackageService
      .getAllProductPackage(this.productModel, this.pageService)
      .subscribe(val => {
        this.prdPackageList = val.object.list;
      });
  }
  /**
   * dateTimeRange的Change事件
   */
  changeBackupTime(val) {
    let startTime, endTime;
    startTime = new Date(val[0]);
    endTime = new Date(val[1]);
    this.productModel.startTime = Date.parse(startTime) / 1000;
    this.productModel.endTime = Date.parse(endTime) / 1000;
  }
  clearDateTime() {
    this.productModel.startTime = "";
    this.productModel.endTime = "";
  }
  deleteProductPackage(row) {
    this.productPackageService
      .deleteProductPackage({
        id: row.fileId
      })
      .subscribe(val => {
        this.$Message.success("删除成功！");
        this.getProductPackage();
      });
  }
}
</script>
