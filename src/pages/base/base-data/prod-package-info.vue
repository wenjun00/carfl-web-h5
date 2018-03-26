<!--产品包管理-->
<template>
  <section class="page prod-package-info">
    <i-row style="margin-top:10px;margin-left:10px;">
      <span style="font-size:18px;font-weight:bold">产品包管理</span>
      <span style="margin-left:10px;">文件名：</span>
      <i-input style="width:10%" v-model="productModel.fileName"></i-input>
      <span style="margin-left:10px;">上传时间：</span>
      <i-date-picker style="display:inline-block;width:10%;" v-model="productModel.minDate"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%;" v-model="productModel.maxDate"></i-date-picker>
      <i-button class="blueButton" style="margin-left:10px;" @click="getProductPackage">搜索</i-button>
      <i-button class="blueButton" style="margin-left:10px;" @click="resetSeach">重置</i-button>
      <div style="float:right;margin-right:10px;margin-top:10px;">
        <div style="font-size:16px;cursor:pointer;margin-left:10px;color:#3367A7">
          <svg-icon iconClass="xiazai"></svg-icon>
          <i-button type="text" style="font-size: 12px;" @click="QuotationTemplatedownload">报价模板下载</i-button>
        </div>
      </div>
    </i-row>
    <data-box :id="91" :columns="columns" :data="prdPackageList" @onPageChange="getProductPackage" :page="pageService" ></data-box>
    <div class="submitBar">
      <i-row type="flex" align="middle" style="padding:10px">
        <i-col :span="24" style="text-align:right;">
          <i-button  @click="pPackageModel=true" class="highButton">新增产品包</i-button>
        </i-col>
      </i-row>
    </div>
    <template>
      <i-modal title="新增产品包" v-model="pPackageModel" :transfer="false">
        <add-product-package @close="close" ref="add-product-package"></add-product-package>
        <div slot="footer">
          <i-button @click="cancelClick">取消</i-button>
          <i-button class="blueButton" @click="addProductpageageClick">新增</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from '~/core/page';
  import DataBox from '~/components/common/data-box.vue';
  import Component from 'vue-class-component';
  import SvgIcon from '~/components/common/svg-icon.vue';
  import AddProductPackage from '~/components/base-data/add-product-package.vue';
  import { CommonService } from "~/utils/common.service";
  import {
    Dependencies
  } from '~/core/decorator';
  import {
    ProductPackageService
  } from '~/services/manage-service/product-package.service';
  import {
    Layout
  } from '~/core/decorator';
  import {
    PageService
  } from '~/utils/page.service';
  import {
    FilterService
  } from '~/utils/filter.service';

  @Layout('workspace')
  @Component({
    components: {
      DataBox,
      SvgIcon,
      AddProductPackage,
    },
  })
  export default class ProdPackageInfo extends Page {
    @Dependencies(ProductPackageService) private productPackageService: ProductPackageService;
    @Dependencies(PageService) private pageService: PageService;
    private columns: any;
    private prdPackageList: Array < Object > = [];
    private searchOptions: Boolean = false;
    private productModel: any = {};
    private backupTimeRange: Array < any > = [];
    private productId: any;
    private pPackageModel: Boolean = false;
    created() {
      this.getProductPackage()
      this.columns = [{
          title: '操作',
          align: 'center',
          width: 260,
          fixed: 'left',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('div', [
              h(
                'i-button', {
                  props: {
                    type: 'text',
                  },
                  style: {
                    color: '#265EA2',
                  },
                  on: {
                    click: () => {
                      this.preView(row);
                    }
                  },
                },
                '预览'
              ),
              h(
                'i-button', {
                  props: {
                    type: 'text',
                  },
                  style: {
                    color: '#265EA2',
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '提示',
                        content: '您确定是否下载？',
                        onOk: () => {
                          this.downLoadTemplate(row);
                        },
                      });
                    },
                  },
                },
                '下载'
              ),
              h(
                'i-button', {
                  props: {
                    type: 'text',
                  },
                  style: {
                    color: '#265EA2',
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '提示',
                        content: '确定删除吗？',
                        onOk: () => {
                          this.deleteProductPackage(row);
                        },
                      });
                    },
                  },
                },
                '删除'
              ),
            ]);
          },
        },
        {
          title: '文件名',
          key: 'fileName',
          align: 'center',
          editable: true,
        },
        {
          title: '上传时间',
          key: 'uploadTime',
          align: 'center',
          editable: true,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.uploadTime, 'yyyy-MM-dd hh:mm:ss'));
          },
        },
        {
          title: '操作人',
          key: 'operatorName',
          align: 'center',
          editable: true,
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center',
          editable: true,
        },
      ];
      this.productModel = {
        fileName: '',
        minDate: '',
        maxDate: '',
      };
    }
    // mounted() {
    //   this.getProductPackage();
    // }
    cancelClick() {
      this.pPackageModel = false
      let _addproductpackage: any = this.$refs['add-product-package']
      _addproductpackage.reset()
    }
    close() {
      this.pPackageModel = false
      this.getProductPackage()
    }
    /**
     * 新增产品包
     */
    addProductpageageClick() {
      let _addproductpackage: any = this.$refs['add-product-package']
      _addproductpackage.addproductpackage()
    }
    /**
     * 报价模板下载
     */
    QuotationTemplatedownload() {
      this.productPackageService.downloadTemplate().subscribe(
        val => {
          CommonService.downloadFile(val,'报价模版下载')
        },
        ({
          msg
        }) => {
          this.$Message.error(msg);
        }
      );
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
      this.productModel.minDate = FilterService.dateFormat(this.productModel.minDate, 'yyyy-MM-dd');
      this.productModel.maxDate = FilterService.dateFormat(this.productModel.maxDate, 'yyyy-MM-dd');
      this.productPackageService.getAllProductPackage(this.productModel, this.pageService).subscribe(
        val => {
          this.prdPackageList = val;
          console.log(this.prdPackageList, 33);
        },
        ({
          msg
        }) => {
          this.$Message.error(msg);
        }
      );
    }

    /**
     * 删除产品
     */
    deleteProductPackage(row) {
      this.productPackageService
        .deleteProductPackage({
          id: row.id,
        })
        .subscribe(
          val => {
            this.$Message.success('删除成功！');
            this.getProductPackage();
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    /**
     * 产品包信息下载
     */
    downLoadTemplate(row) {
      this.productPackageService
        .downloadProductPackage({
          fileId: row.fileId,
        })
        .subscribe(
          val => {
            CommonService.downloadFile(val,"文件下载")
            this.$Message.success('下载成功！');
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    /**
     * 重置搜索
     */
    resetSeach() {
      this.productModel = {
        fileName: '',
        minDate: '',
        maxDate: '',
      };
    }
    /**
     * 预览
     */
    preView(row){
      this.productPackageService
        .downloadProductPackage({
          fileId: row.fileId,
        })
        .subscribe(
          val => {
            window.open(val)
            // CommonService.downloadFile(val,"文件下载")
          },
          ({
             msg
           }) => {
            this.$Message.error(msg);
          }
        );
    }
  }

</script>
<style lang="less" scoped>
  .ivu-table-fixed-body {
    height: auto !important;
  }

</style>
