<!--分公司信息-->
<template>
    <section class="page branch-company-info">
        <i-row style="margin-top:10px;">
            <span style="font-size:18px;font-weight:bold">分公司信息</span>
            <span style="margin-left:10px;">关键字搜索：</span>
            <i-input style="width:15%" placeholder="请输入公司名称、户名、开户银行、银行卡号搜索" v-model="companyModel.keyword"></i-input>
            <i-button class="blueButton" style="margin-left:10px;" @click="seachCompany">搜索</i-button>
        </i-row>
        <data-box :columns="columns" :data="companyList"></data-box>
    </section>
</template>

<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import SvgIcon from "~/components/common/svg-icon.vue";
import { CompanyService } from "~/services/manage-service/company.service";
import { Dependencies } from "~/core/decorator";
import { PageService } from "~/utils/page.service";
import { Layout } from "~/core/decorator";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class BranchCompanyInfo extends Page {
  @Dependencies(CompanyService) private companyService: CompanyService;
  @Dependencies(PageService) private pageService: PageService;
  private columns: any;
  private data1: Array<Object> = [];
  private searchOptions: Boolean = false;
  private companyModel: any;
  private companyList: Array<Object> = [];
  created() {
    this.seachCompany();
    this.columns = [
      {
        title: "序号",
        width: 60,
        type: "index",
        align: "center",
        fixed: "left"
      },
      {
        title: "操作",
        align: "center",
        fixed: "left",
        width: 250,
        render: (h, { row, column, index }) => {
          if (row.firmShortName === "群泰上海") {
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
                "修改"
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
                      this.$Modal.success({
                        title: "提示",
                        content: "停用成功！"
                      });
                    }
                  }
                },
                "停用"
              )
            ]);
          } else if (row.firmShortName === "群泰西安") {
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
                      this.$Modal.success({
                        title: "提示",
                        content: "启用成功！"
                      });
                    }
                  }
                },
                "启用"
              )
            ]);
          }
        }
      },
      {
        title: "公司简称",
        key: "companyChinaname",
        align: "center",
        fixed: "left",
        width: 160
      },
      {
        title: "所在省",
        key: "companyProvince",
        align: "center",
        width: 160
      },
      {
        title: "所在市",
        key: "companyCity",
        align: "center",
        width: 160
      },
      {
        title: "户名",
        key: "bankAccount",
        align: "center",
        width: 260
      },
      {
        title: "开户银行",
        key: "depositBank",
        align: "center",
        width: 260
      },
      {
        title: "银行卡号",
        key: "cardNumber",
        align: "center",
        width: 260
      },
      {
        title: "支行名称",
        key: "branchName",
        align: "center",
        width: 260
      },
      {
        title: "状态",
        key: "companyStatus",
        align: "center",
        width: 90
      }
    ];
    this.companyModel = {
      keyword: ""
    };
  }
  getOrderInfoByTime() {}
  openSearch() {
    this.searchOptions = !this.searchOptions;
  }
  exportMonthReport() {}
  /**
   * 查询分公司信息
   */
  seachCompany() {
    this.companyService
      .getAllCompanyWithPage(this.companyModel, this.pageService)
      .subscribe(val => {
        this.companyList = val.object.list;
      });
  }
}
</script>
