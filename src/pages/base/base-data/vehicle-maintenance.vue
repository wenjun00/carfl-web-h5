<template>
    <section class="page prod-config">
        <i-row style="margin-top:20px;">
            <span style="font-size:18px;font-weight:bold;margin-left:8px;">车辆维护</span>
            <i-row>
                <i-col :span="5" style="margin-left:10px;">
                    <div style="width:250px;height:30px;border:1px solid #999999;line-height:30px;font-size:16px;">
                        <div style="width: 4px; height: 15px; background: rgb(38, 94, 162); display: inline-block; margin-left:10px;position:relative;top:2px;"></div>
                        <span style="position:relative;left:5px;">车辆品牌</span>
                        <div style="float:right;display:inline-block;font-weight:bold">
                            <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)">
                                <svg-icon iconClass="tianjiawenjian"></svg-icon>
                            </div>
                            <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)">
                                <svg-icon iconClass="tianjiawenjianjia"></svg-icon>
                            </div>
                            <div style="font-size:18px;cursor:pointer;display:inline-block;margin-left:10px;color:rgb(38, 94, 162)">
                                <svg-icon iconClass="sousuo"></svg-icon>
                            </div>
                        </div>
                    </div>
                    <div style="width:250px;height:600px;border-left:1px solid #999999;border-right:1px solid #999999;border-bottom:1px solid #999999;position:relative;bottom:8px;">
                        <i-tree :data="treeData"></i-tree>
                    </div>
                </i-col>
                <i-col :span="17" style="position:relative;bottom:30px;" :pull="1">
                    <i-input style="width:30%;"></i-input>
                    <i-button class="blueButton" style="margin-left:10px" @click="seach">查询</i-button>
                    <!-- <table border="1" width="100%" style="margin-top:10px;border:1px solid #DDDEE1" id="tb">
                        <tr align="center" height="40">
                            <td bgcolor="#F2F2F2" width="100">操作</td>
                            <td bgcolor="#F2F2F2">车辆品牌</td>
                            <td bgcolor="#F2F2F2">车辆型号</td>
                            <td bgcolor="#F2F2F2">车身颜色</td>
                            <td bgcolor="#F2F2F2">车辆排量</td>
                        </tr>
                        <tr v-for="item in carInfo" :key="item.id" :value="item.name" align="center">
                            <td>
                                <i-button type="text" style="color:blue" @click="editDict"></i-button>
                            </td>
                            <td width="360">{{item.name}}</td>
                            <td>{{item.type}}</td>
                            <td>{{item.color}}</td>
                            <td>{{item.cc}}</td>
                        </tr>
                    </table> -->
                    <i-table border :no-data-text="true" :align="center" :columns="columns" :data="carInfo" :loading="false"></i-table>
                </i-col>
            </i-row>
        </i-row>
    </section>
</template>
<script lang="ts">
import Page from "~/core/page";
import DataBox from "~/components/common/data-box.vue";
import Component from "vue-class-component";
import { Dependencies } from "~/core/decorator";
import { Layout } from "~/core/decorator";
import SvgIcon from "~/components/common/svg-icon.vue";
import { PageService } from "~/utils/page.service";
import { ProductService } from "~/services/manage-service/product.service";

@Layout("workspace")
@Component({
  components: {
    DataBox,
    SvgIcon
  }
})
export default class ProdConfig extends Page {
  @Dependencies(ProductService) private productService: ProductService;
  @Dependencies(PageService) private pageService: PageService;
  private treeData: Array<any> = [];
  private allData: Array<any> = [];
  private carInfo: Array<any> = [];
  private columns: Array<any> = [];

  /**
   * 客户素材配置
   */
  data() {
    return {
      treeData: [
        {
          lev1Node: ""
        }
      ],
      lev1Node: {
        title: "",
        seriesId: "",
        expand: true,
        lev2Node: []
      },
      lev2Node: {
        title: "",
        productId: ""
      }
    };
  }
  created() {
    this.treeList();
    this.columns = [
      {
        title: "操作",
        key: "option",
        render: (h, params) => {
          return h("div", [
            h(
              "i-button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  margin: "auto"
                },
                on: {
                  click: () => {
                    alert(1);
                  }
                }
              },
              "修改"
            )
          ]);
        }
      },
      {
        title: "车辆品牌",
        key: "brand"
      },
      {
        title: "车辆型号",
        key: "type"
      },
      {
        title: "车身颜色",
        key: "color"
      },
      {
        title: "车辆排量",
        key: "cc"
      }
    ];
    this.carInfo = [
      {
        brand: "卡迪拉克",
        type: "2017款尊享版",
        color: "浩银",
        cc: "2.5T"
      }
    ];
  }
  /**
   * 获取树形结构
   */
  treeList() {
    this.productService.getAllProduct().subscribe(val => {
      this.allData = val.object;
      console.log(this.allData);
      this.getTreeDate();
    });
  }
  getTreeDate() {
    let series: Map<number, any> = new Map();
    this.allData.map(t => {
      if (t.seriesId) {
        series.set(t.seriesId, t);
      }
    });
    this.treeData = [];
    series.forEach(item => {
      let lv1Node = {
        title: item.seriesName,
        seriesId: item.seriesId,
        expand: true,
        children: this.getChilds(item.seriesId)
      };
      this.treeData.push(lv1Node);
    });
  }

  getChilds(id) {
    let prods = this.allData.filter(t => t.seriesId === id);
    let Lv2Nodes = prods.map(t => {
      return {
        title: t.productName,
        productId: t.productId
      };
    });
    return Lv2Nodes;
  }
}
</script>
