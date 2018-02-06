<!--产品包信息-->
<template>
  <section class="page prod-package-info">
    <i-row style="margin-top:10px;margin-left:10px;">
      <span style="font-size:18px;font-weight:bold">产品包信息</span>
      <span style="margin-left:10px;">文件名：</span>
      <i-input style="width:10%" v-model="productModel.fileName"></i-input>
      <span style="margin-left:10px;">上传时间：</span>
      <i-date-picker style="display:inline-block;width:10%;" v-model="productModel.minDate"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%;" v-model="productModel.maxDate"></i-date-picker>
      <i-button class="blueButton" style="margin-left:10px;" @click="getProductPackage">搜索</i-button>
      <div style="float:right;margin-right:10px;margin-top:10px;">
        <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon style="font-size:18px;" iconClass="daoru"></svg-icon>
          <span style="font-size:12px;">导入</span>
        </div>
        <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon iconClass="xiazai"></svg-icon>
          <span style="font-size: 12px;">模版下载</span>
        </div>
      </div>
    </i-row>
    <data-box :columns="columns" :data="prdPackageList" @onPageChange="getProductPackage" :page="pageService"></data-box>
  </section>
</template>

<script lang="ts">
  import Page from '~/core/page';
  import DataBox from '~/components/common/data-box.vue';
  import Component from 'vue-class-component';
  import SvgIcon from '~/components/common/svg-icon.vue';
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
    },
  })
  export default class ProdPackageInfo extends Page {
    @Dependencies(ProductPackageService) private productPackageService: ProductPackageService;
    @Dependencies(PageService) private pageService: PageService;
    private columns: any;
    private prdPackageList: Array < Object > = [];
    private searchOptions: Boolean = false;
    private productPackageModel: any;
    private productModel: any;
    private backupTimeRange: Array < any > = [];
    private productId: any;
    created() {
      this.columns = [{
          title: '序号',
          width: 60,
          type: 'index',
          align: 'center',
        },
        {
          title: '操作',
          align: 'center',
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
        },
        {
          title: '上传时间',
          key: 'uploadTime',
          align: 'center',
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
          key: 'operator',
          align: 'center',
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center',
        },
      ];
      this.productModel = {
        fileName: '',
        minDate: '',
        maxDate: '',
      };
    }
    mounted() {
      this.getProductPackage();
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
          id: row.fileId,
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
            this.$Message.success('下载成功！');
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
