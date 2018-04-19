<!--产品包查询-->
<template>
    <section class="page product-package-query">
        <page-header title="产品包查询">

        </page-header>
        <div class="seek-day">
            <i-button @click="getOrderInfoByTime(1)" type="text" v-auth="394">昨日</i-button>
            <i-button @click="getOrderInfoByTime(2)" type="text" v-auth="394">今日</i-button>
            <i-button @click="getOrderInfoByTime(3)" type="text" v-auth="394">本周</i-button>
            <i-button @click="getOrderInfoByTime(4)" type="text" v-auth="394">本月</i-button>
            <i-button @click="getOrderInfoByTime(5)" type="text" v-auth="394">上月</i-button>
            <i-button @click="getOrderInfoByTime(6)" type="text" v-auth="394">最近三月</i-button>
            <i-button @click="getOrderInfoByTime(7)" type="text" v-auth="394">本季度</i-button>
            <i-button @click="getOrderInfoByTime(8)" type="text" v-auth="394">本年</i-button>
            <i-button @click="openSearch" style="color:#265EA2" v-auth="393">
                <span v-if="!searchOptions">展开</span>
                <span v-if="searchOptions">收起</span>高级搜索</i-button>
        </div>
        <i-row class="document-query" v-if="searchOptions">
            <i-input class="document-query-input" v-model="seachParams.fileName" placeholder="文件名查询"></i-input>
            <i-date-picker class="document-query-picker" v-model="seachParams.minDate" placeholder="起始日期"></i-date-picker>~
            <i-date-picker class="document-query-picker" v-model="seachParams.maxDate" placeholder="终止日期"></i-date-picker>
            <i-button class="document-query-button" @click="productSeach">搜索</i-button>
            <!--<i-button class="blueButton" style="margin-left:10px;" @click="resetSeach">重置</i-button>-->
        </i-row>
        <i-row style="margin-top:20px">
            <data-box :id="392" :columns="queryColumns" :data="queryData" @onPageChange="productSeach" :page="pageService"></data-box>
        </i-row>
        <!--列配置-->
        <template>
            <i-modal v-model="columnsManage" title="列配置">
                <i-table :columns="columns2" :data="data2" border stripe></i-table>
                <div slot="footer">
                    <i-button>上移</i-button>
                    <i-button>下移</i-button>
                    <i-button>恢复默认</i-button>
                    <i-button @click="openColumnsConfig=false">关闭</i-button>
                </div>
            </i-modal>
        </template>

        <!--预览-->
        <template>
            <i-modal v-model="previewModal" title="查看" width="800">
                <div style="width:760px;height:500px;background-image:url('/static/images/common/previewImg.png');background-repeat:no-repeat"></div>
            </i-modal>
        </template>
    </section>
</template>

<script lang="ts">
import Page from '~/core/page'
import Component from 'vue-class-component'
import DataBox from '~/components/common/data-box.vue'
import { Dependencies } from '~/core/decorator'
import SvgIcon from '~/components/common/svg-icon.vue'
import { ProductPackageService } from '~/services/manage-service/product-package.service'
import PurchaseInformation from '~/components/purchase-manage/purchase-information.vue'
import { Layout } from '~/core/decorator'
import { PageService } from '~/utils/page.service'
import { FilterService } from '~/utils/filter.service'
import { CommonService } from '~/utils/common.service'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class ProductPackageQuery extends Page {
  @Dependencies(ProductPackageService)
  private productPackageService: ProductPackageService
  @Dependencies(PageService) private pageService: PageService

  private queryColumns: any = []
  private queryData: Array<any> = []
  private data2: Array<Object> = []
  private columns2: any
  private columnsManage: Boolean = false
  private searchOptions: Boolean = false
  private previewModal: Boolean = false
  private seachParams: any = {}

  created() {
    this.productSeach()
    this.seachParams = {
      fileName: '',
      minDate: '',
      maxDate: '',
      timeSearch: ''
    }
    this.queryColumns = [
      {
        title: '操作',
        width: 180,
        align: 'center',
        fixed: 'left',
        render: (h, params) => {
          return h('div', [
            h(
              'i-button',
              {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265ea2'
                },
                on: {
                  click: () => {
                    this.productPackageService
                      .downloadProductPackage({
                        fileId: params.row.fileId
                      })
                      .subscribe(
                        val => {
                          CommonService.downloadFile(val, '产品包下载')
                          this.$Message.success('下载成功！')
                        },
                        ({ msg }) => {
                          this.$Message.error(msg)
                        }
                      )
                  }
                }
              },
              '下载'
            )
            // h(
            // 	'i-button',
            // 	{
            // 		props: {
            // 			type: 'text',
            // 		},
            // 		style: {
            // 			color: '#265ea2',
            // 		},
            // 		on: {
            // 			click: () => {
            // 				this.previewModal = true;
            // 			},
            // 		},
            // 	},
            // 	'查看'
            // ),
          ])
        }
      },
      {
        title: '文件名',
        editable: true,
        align: 'center',
        key: 'fileName'
      },
      {
        align: 'center',
        editable: true,
        title: '上传时间',
        key: 'uploadTime',
        render: (h, { row, column, index }) => {
          return h(
            'span',
            FilterService.dateFormat(row.uploadTime, 'yyyy-MM-dd hh:mm:ss')
          )
        }
      },
      {
        align: 'center',
        editable: true,
        title: '操作人',
        key: 'operatorName'
      },
      {
        align: 'center',
        editable: true,
        title: '备注',
        key: 'remark'
      }
    ]
    /**@argument列配置 */
    this.columns2 = [
      {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
      },
      {
        title: '列名',
        key: 'columnsName',
        align: 'center'
      },
      {
        type: 'selection',
        width: 80,
        align: 'center'
      }
    ]
    this.data2 = [
      {
        columnsName: '订单编号'
      },
      {
        columnsName: '订单创建时间'
      },
      {
        columnsName: '订单类型'
      },
      {
        columnsName: '产品名称'
      },
      {
        columnsName: '客户姓名'
      },
      {
        columnsName: '证件号码'
      },
      {
        columnsName: '最近合同生成日期'
      }
    ]
  }
  openSearch() {
    this.searchOptions = !this.searchOptions
  }
  /**
   * 搜索
   */
  productSeach() {
    this.seachParams.minDate = FilterService.dateFormat(
      this.seachParams.minDate,
      'yyyy-MM-dd'
    )
    this.seachParams.maxDate = FilterService.dateFormat(
      this.seachParams.maxDate,
      'yyyy-MM-dd'
    )
    this.productPackageService
      .getAllProductPackage(this.seachParams, this.pageService)
      .subscribe(
        val => {
          this.queryData = val
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
  /**
   * 高级搜索
   */
  getOrderInfoByTime(val) {
    this.seachParams = {
      fileName: '',
      minDate: '',
      maxDate: '',
      timeSearch: ''
    }
    this.seachParams.timeSearch = val
    this.productSeach()
  }
  /**
   * 重置搜索
   */
  resetSeach() {
    this.seachParams = {
      fileName: '',
      minDate: '',
      maxDate: '',
      timeSearch: ''
    }
  }
}
</script>

<style lang="less" scoped>
.page.product-package-query {
  .seek-day {
    margin-top: 10px;
  }
  .command {
    float: right;
    margin-right: 13px;
    margin-top: 10px;
    .command-item {
      cursor: pointer;
      display: inline-block;
      margin-left: 10px;
      color: #3367a7;
      &.dayin {
        font-size: 18px;
        span {
          font-size: 12px;
        }
      }
      &.daochu {
        font-size: 12px;
        span {
          font-size: 12px;
        }
      }
    }
  }
  .document-query {
    margin-top: 20px;
    .document-query-input {
      display: inline-block;
      width: 10%;
      margin-left: 10px;
    }
    .document-query-picker {
      display: inline-block;
      width: 10%;
    }
    .document-query-button {
      background: #06428b;
      color: #fff;
    }
  }
}
</style>
