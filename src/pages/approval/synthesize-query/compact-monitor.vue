<!--合同监控-->
<template>
  <section class="page compact-monitor">
    <span class="form-title">合同下载监控</span>
    <i-button @click="getOrderInfoByTime(1)" type="text">昨日</i-button>
    <i-button @click="getOrderInfoByTime(2)" type="text">今日</i-button>
    <i-button @click="getOrderInfoByTime(3)" type="text">本周</i-button>
    <i-button @click="getOrderInfoByTime(4)" type="text">本月</i-button>
    <i-button @click="getOrderInfoByTime(5)" type="text">上月</i-button>
    <i-button @click="getOrderInfoByTime(6)" type="text">最近三月</i-button>
    <i-button @click="getOrderInfoByTime(7)" type="text">本季度</i-button>
    <i-button @click="getOrderInfoByTime(8)" type="text">本年</i-button>
    <i-button @click="openSearch" style="color:#265EA2">
      <span v-if="!searchOptions">展开</span>
      <span v-if="searchOptions">收起</span>
      <span>高级搜索</span>
    </i-button>

    <i-row v-if="searchOptions" style="margin:6px;">
      <i-date-picker style="display:inline-block;width:10%;" placeholder="起始日期"></i-date-picker>~
      <i-date-picker style="display:inline-block;width:10%;" placeholder="终止日期"></i-date-picker>
      <i-input style="display:inline-block;width:10%;" placeholder="请输入员工姓名"></i-input>
      <i-select style="width:10%;" placeholder="全部门店">
        <!-- <i-option label="吴小川" value="吴小川" key="吴小川"></i-option>
        <i-option label="黄瑞" value="黄瑞" key="黄瑞"></i-option>
        <i-option label="祁吉贵" value="祁吉贵" key="祁吉贵"></i-option> -->
      </i-select>
      <i-button class="blueButton" style="margin-left:20px;" @click="getCompactMonitorList">搜索</i-button>
    </i-row>
    <data-box :columns="columns1" :data="compactList" @onPageChange="getCompactMonitorList" :page="pageService" :noDefaultRow="true"></data-box>

    <template>
      <i-modal title="合同下载详情" v-model="compactDownloadInfoModal" width="1300">
        <compact-download-info></compact-download-info>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import RepaySum from "~/components/approval-manage/repay-sum.vue";
import PurchaseInformation from "~/components/purchase-manage/purchase-information.vue";
import CompactDownloadInfo from "~/components/approval-manage/compact-download-info.vue";
import { Dependencies } from "~/core/decorator";
import { Layout } from "~/core/decorator";
import { PageService } from "~/utils/page.service";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    RepaySum,
    PurchaseInformation,
    CompactDownloadInfo
  }
})
export default class CompactMonitor extends Page {
  @Dependencies(PageService) private pageService: PageService;
  private columns1: any;
  private compactList: Array<Object> = [];
  private repayInfo: Boolean = false;
  private ceshiShow: Boolean = false;
  private searchOptions: Boolean = false;
  private compactDownloadInfoModal: Boolean = false;

  mounted() {
    this.getCompactMonitorList();
  }

  created() {
    this.columns1 = [
      {
        align: "center",
        type: "index",
        title: "序号",
        fixed: "left",
        width: 60
      },
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
                    this.compactDownloadInfoModal = true;
                  }
                }
              },
              "查看"
            )
          ]);
        }
      },
      {
        align: "center",
        title: "门店",
        key: "branchAddress"
      },
      {
        align: "center",
        title: "员工姓名",
        key: "employeeName"
      },
      {
        align: "center",
        title: " 下载量",
        key: "downloadNum"
      }
    ];
  }
  openSearch() {
    this.searchOptions = !this.searchOptions;
  }
  getCompactMonitorList() {}
  repaySum(row) {}
  trailerCar(row) {}
  /**
   * 查看凭证
   */
  checkProof(row) {}

  getOrderInfoByTime() {}
}
</script>
<style>

</style>
