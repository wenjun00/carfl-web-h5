<template>
    <section class="page">
        <div style="margin-top:10px;display: flex;align-items: baseline;justify-content: space-between;">
            <div style="margin-top:10px;display: flex;align-items: baseline;">
                <span style="font-size:18px;font-weight:bold;margin-right:5px;">经销商报价</span>
                <Select style="width:200px">
                    <Option v-for="item in businessAll" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span style="margin-left:20px;margin-right:5px;">品牌</span>
                <i-input style="width:12%" placeholder=""></i-input>
                <span style="margin-left:20px;margin-right:5px;">系列</span>
                <i-input style="width:12%" placeholder=""></i-input>
                <span style="margin-left:20px;margin-right:5px;">型号</span>
                <i-input style="width:12%" placeholder=""></i-input>
                <i-button class="blueButton" style="margin-left:10px;" @click="seachBusiness">查询</i-button>
            </div>
            <div>
                <i-button type="text" style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7" disabled>
                    <svg-icon iconClass="daoru" style="font-size:16px;"></svg-icon>
                    <span style="font-size:14px;">导入</span>
                </i-button>
                <i-button type="text" style="font-size:14px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7" disabled>
                    <svg-icon iconClass="xiazai"></svg-icon>
                    <span>模版下载</span>
                </i-button>
            </div>
        </div>
        <data-box :columns="columns" :data="carList"></data-box>
    </section>
</template>
<script lang="ts">
import Vue from "vue";
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import SvgIcon from "~/components/common/svg-icon.vue";
import { Dependencies } from "~/core/decorator";

@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class AddPeriods extends Vue {
  private businessAll: Array<Object> = [];
  private columns: any;
  private status: Number = 0;
  private carList: Array<Object> = [];

  created() {
    this.businessAll = [
      {
        value: "New York",
        label: "New York"
      },
      {
        value: "London",
        label: "London"
      },
      {
        value: "Sydney",
        label: "Sydney"
      },
      {
        value: "Ottawa",
        label: "Ottawa"
      }
    ];
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
                  click: () => {}
                }
              },
              "启用"
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
                  click: () => {}
                }
              },
              "编辑"
            )
          ]);
        }
      },
      {
        title: "经销商",
        key: "jxs",
        align: "center",
        fixed: "left",
        width: 160
      },
      {
        title: "品牌",
        key: "logo",
        align: "center",
        width: 160
      },
      {
        title: "系列",
        key: "sersice",
        align: "center",
        width: 160
      },
      {
        title: "型号",
        key: "type",
        align: "center",
        width: 260
      },
      {
        title: "颜色",
        key: "color",
        align: "center",
        width: 260
      },
      {
        title: "市场指导价",
        key: "sszdj",
        align: "center",
        width: 260
      },
      {
        title: "经销商价格",
        key: "jxsjg",
        align: "center",
        width: 260
      },
      {
        title: "首期金额",
        key: "sqje",
        align: "center",
        width: 260
      },
      {
        title: "融资金额",
        key: "rzje",
        align: "center",
        width: 260
      },
      {
        title: "融资期数",
        key: "rzqs",
        align: "center",
        width: 260
      },
      {
        title: "租金（月）",
        key: "zj",
        align: "center",
        width: 260
      },
      {
        title: "购置税",
        key: "gzs",
        align: "center",
        width: 260
      },
      {
        title: "路桥费",
        key: "lqf",
        align: "center",
        width: 260
      },
      {
        title: "保险费",
        key: "bxf",
        align: "center",
        width: 260
      },
      {
        title: "GPS费",
        key: "gps",
        align: "center",
        width: 260
      },
      {
        title: "其他费用",
        key: "other",
        align: "center",
        width: 260
      },

      {
        title: "状态",
        key: "status",
        align: "center",
        width: 90,
        render: (h, { row, column, index }) => {
          if (row.status === 0) {
            return h("span", {}, "已启用");
          } else if (row.status === 1) {
            return h("span", {}, "已停用");
          }
        }
      }
    ];
    this.carList = [
      {
        jxs: "阿里巴巴",
        sersice: "type",
        logo: "奔驰",
        type: "奔驰",
        color: "奔驰",
        sszdj: "奔驰",
        jxsjg: "奔驰"
        // sqje: "奔驰",
        // logo: "奔驰",
        // logo: "奔驰",
        // logo: "奔驰",
        // logo: "奔驰",
        // logo: "奔驰",
        // logo: "奔驰",
        // logo: "奔驰",
        // logo: "奔驰"
      }
    ];
  }
  seachBusiness() {}
}
</script>
