<template>
  <div class="component purchase-information row">
    <!--选购信息-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><a name="xuangouxinxi" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">选购信息</a>
      </div>
      <data-grid :labelWidth="100" labelAlign="left" contentAlign="left" style="margin-top:10px;width:760px">
        <data-grid-item label="申请省份：" :span="3">上海</data-grid-item>
        <data-grid-item label="申请城市：" :span="3">上海</data-grid-item>
        <data-grid-item label="所属公司：" :span="6">开呗上海</data-grid-item>
        <data-grid-item label="融资租赁用途" :span="3">个人使用</data-grid-item>
        <data-grid-item label="自缴费用" :span="9">
          <i-checkbox-group v-model="fruit">
            <i-checkbox label="保险费"></i-checkbox>
            <i-checkbox label="购置费"></i-checkbox>
          </i-checkbox-group>
        </data-grid-item>
        <data-grid-item label="意向融资金额" :span="3">128,000.00</data-grid-item>
        <data-grid-item label="租金支付" :span="3">4,560.00</data-grid-item>
        <data-grid-item label="意向期限" :span="3">12期</data-grid-item>
        <data-grid-item label="意向首付比例" :span="3">10%</data-grid-item>
        <data-grid-item label="车辆型号" :span="6">别克 君越 2016改款</data-grid-item>
        <data-grid-item label="上牌地区" :span="3">上海</data-grid-item>
        <data-grid-item label="车身颜色" :span="3">紫檀红</data-grid-item>
        <data-grid-item label="购车排量" :span="3">1.8t</data-grid-item>
        <data-grid-item label="购车配置" :span="3"></data-grid-item>
        <data-grid-item label="车辆牌照" :span="3">沪XXXXX</data-grid-item>
        <data-grid-item label="" :span="3"></data-grid-item>
      </data-grid>
    </i-row>
    <!--产品信息-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><a name="chanpinxinxi" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">产品信息</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td>产品系列</td>
          <td>直租</td>
          <td>产品名称</td>
          <td>群泰融资</td>
          <td>产品期数</td>
          <td>24期</td>
          <td>产品利率</td>
          <td>0.99/月</td>
        </tr>
        <tr>
          <td>还款方式</td>
          <td>等本等息</td>
          <td>融资总额</td>
          <td>182270</td>
          <td>月供金额</td>
          <td>5584</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>首付金额</td>
          <td>20252</td>
          <td>保证金金额</td>
          <td>0</td>
          <td>尾付金额</td>
          <td>0</td>
          <td>管理费</td>
          <td>0</td>
        </tr>
        <tr>
          <td>保险费</td>
          <td>0</td>
          <td>购置税</td>
          <td>0</td>
          <td>上牌费</td>
          <td>0</td>
          <td>GPS</td>
          <td>0</td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="7"></td>
        </tr>
      </table>
    </i-row>
    <!--个人资料-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><a name="gerenziliao" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">个人资料</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td>姓名</td>
          <td>左拉</td>
          <td>性别</td>
          <td>女</td>
          <td>出生日期</td>
          <td>92-03-09</td>
          <td>微信号码</td>
          <td>dgadget</td>
        </tr>
        <tr>
          <td>手机号码</td>
          <td>139****2432</td>
          <td>手机号码（次）</td>
          <td>139****2453</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>身份证号码</td>
          <td>213****3521</td>
          <td>婚属状况</td>
          <td colspan="5">已婚</td>
        </tr>
        <tr>
          <td>身份证有效期</td>
          <td colspan="3">2035-02-30</td>
          <td>发证机关</td>
          <td colspan="3">上海宝山政府</td>
        </tr>
        <tr>
          <td>身份证地址</td>
          <td colspan="7">上海市上海市宝山区中山北路2687号</td>
        </tr>
        <tr>
          <td>现居住地址</td>
          <td colspan="7">上海市上海市宝山区中山北路</td>
        </tr>
        <tr>
          <td>居住地址家庭座机</td>
          <td></td>
          <td>本市生活时长</td>
          <td>12年</td>
          <td>现居驻地生活时常</td>
          <td colspan="3"></td>
        </tr>
        <tr>
          <td>现居住地房产归属</td>
          <td colspan="7">本人名下</td>
        </tr>
        <tr>
          <td>本市自有房产状况及归属</td>
          <td colspan="3">商品房</td>
          <td>电费账号</td>
          <td></td>
          <td>电费密码</td>
          <td></td>
        </tr>
        <tr>
          <td>本市房产地址</td>
          <td colspan="7">上海市上海市宝山区中山北路</td>
        </tr>
        <tr>
          <td>教育程度</td>
          <td colspan="2">本科</td>
          <td>毕业院校</td>
          <td colspan="2"></td>
          <td>是否接受现场勘查</td>
          <td>
            <i-radio :checked.sync="single">是</i-radio>
          </td>
        </tr>
      </table>
    </i-row>

    <!--职业信息-->
    <i-row>
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><a name="zhiyexinxi" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">职业信息</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td>单位名称</td>
          <td>中资联</td>
          <td>部门</td>
          <td>产品部</td>
        </tr>
        <tr>
          <td>单位性质</td>
          <td>私营有限企业</td>
          <td>职务</td>
          <td>产品经理</td>
        </tr>
        <tr>
          <td>职级</td>
          <td colspan="8">负责人</td>
        </tr>
        <tr>
          <td>单位地址</td>
          <td colspan="8">上海市上海市宝山区中山北路2687号</td>
        </tr>
        <tr>
          <td>单位固定电话</td>
          <td>021-43452342</td>
          <td>何时进入公司</td>
          <td>2017-3</td>
        </tr>
        <tr>
          <td>基本月薪(元)</td>
          <td>10000</td>
          <td>每月发薪日(元)</td>
          <td></td>
        </tr>
        <tr>
          <td>发薪方式</td>
          <td>公司转账</td>
          <td>年收入(万元)</td>
          <td>10</td>
        </tr>
        <tr>
          <td>每月其他收入(元)</td>
          <td>10000</td>
          <td>其他收入来源</td>
          <td>10000</td>
        </tr>
      </table>
    </i-row>
    <!--联系人信息-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><a name="lianxirenxinxi" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">联系人信息</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td>姓名</td>
          <td>与本人关系</td>
          <td>联系方式</td>
          <td>单位名称</td>
          <td>家庭住址</td>
        </tr>
        <tr>
          <td></td>
          <td>配偶</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>父母</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>子女</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td colspan="5">其他联系人（提示：必填3个其他联系人）</td>
        </tr>
        <tr>
          <td>姓名</td>
          <td>与本人关系</td>
          <td>联系方式</td>
          <td>单位名称</td>
          <td>家庭住址</td>
        </tr>
        <tr>
          <td></td>
          <td>配偶</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>父母</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td>子女</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </i-row>
    <!--客户来源-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><a name="kehulaiyuan" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">客户来源</a>
      </div>
      <table border="1" width="760" style="margin-top:10px;border:1px solid #DCDDE0">
        <tr>
          <td>通过宣传</td>
          <td colspan="4">
            <i-radio value="true">其他</i-radio>
          </td>
        </tr>
        <tr>
          <td>通过介绍</td>
          <td>
            <i-radio>同行推荐</i-radio>
            <span>同行姓名：</span>
            <input type="text" style="border:0px;border-bottom:1px ;">
          </td>
        </tr>
      </table>
    </i-row>

    <!--素材资料-->
    <i-row style="margin-top:20px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><a name="sucaiziliao" style="color:#333333;cursor:auto;font-size:16px;font-family:MicrosoftYaHei">素材资料</a>
      </div>
      <i-row style="margin-top:10px">
        <i-col :span="12">
          <div style="height:200px;width:200px;border:1px solid #C2C2C2;cursor:pointer;text-align:center;position:relative;left:40px;">
            <Icon type="plus-circled" style="display:block;margin-top:53px;" size="40" color="#265ea2"></Icon>
            <div style="font-weight:bold">点击添加附件</div>
            <span style="color:gray">支持jpg/pdf/png格式建议大小不超过10M</span>
          </div>
        </i-col>
        <i-col :span="12">
          <div style="height:200px;width:200px;border:1px solid #C2C2C2;background-image:url('/static/images/common/invoice2.png');background-repeat:no-repeat;position:relative;left:72px;">
          </div>
        </i-col>
      </i-row>
    </i-row>
    <div style="position:absolute;top:122px;right:153px">
      <!--<div style="width:2px;height:280px;background-color:#dddddd">
      </div>-->
      <div style="width: 65px;height: 260px;display: flex;align-items: center;flex-wrap: wrap; position: absolute;top: 10px;left: 30px;">
        <a href="#xuangouxinxi" class="quick-link" :class="{color:getClassName.a1}">选购信息</a>
        <a href="#chanpinxinxi" class="quick-link" :class="{color:getClassName.a2}">产品信息</a>
        <a href="#gerenziliao" class="quick-link" :class="{color:getClassName.a3}">个人资料</a>
        <a href="#zhiyexinxi" class="quick-link" :class="{color:getClassName.a4}">职业信息</a>
        <a href="#lianxirenxinxi" class="quick-link" :class="{color:getClassName.a5}">联系人信息</a>
        <a href="#kehulaiyuan" class="quick-link" :class="{color:getClassName.a6}">客户来源</a>
        <a href="#sucaiziliao" class="quick-link" :class="{color:getClassName.a7}">素材资料</a>
      </div>
    </div>
    <!--<Slider v-model="sliderStep" :step="1" show-stops :min="2" :max="7" style="transform: rotate(90deg);position: absolute;top: 242px;right: 15px;width:280px"></Slider>-->
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {
    DataGrid,
    DataGridItem
  } from "vue-fintech-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Action
  } from "vuex-class";
  import {
    ProductOrderService
  } from "~/services/manage-service/product.order.service";
  @Component({
    components: {
      DataGrid,
      DataGridItem
    }
  })
  export default class PurchaseInformation extends Vue {
    @Dependencies(ProductOrderService) private productOrderService: ProductOrderService;
    private fruit: Array < String > = ['购置费'];
    private single: Boolean = false;
    private sliderStep: Number;
    private c = {
      a1: false,
      a2: false,
      a3: false,
      a4: false,
      a5: false,
      a6: false,
      a7: false
    }
    @Prop({
      default: 0
    })
    scrollTopHeight: Number;

    get getClassName() {
      this.c.a1 = this.scrollTopHeight >= 0 && this.scrollTopHeight < 170
      this.c.a2 = this.scrollTopHeight >= 170 && this.scrollTopHeight < 350
      this.c.a3 = this.scrollTopHeight >= 350 && this.scrollTopHeight < 707
      this.c.a4 = this.scrollTopHeight >= 707 && this.scrollTopHeight < 1034
      this.c.a5 = this.scrollTopHeight >= 1034 && this.scrollTopHeight < 1386
      this.c.a6 = this.scrollTopHeight >= 1386 && this.scrollTopHeight < 1407
      this.c.a7 = this.scrollTopHeight >= 1407
      return this.c
    }

    activated() {
      document.getElementsByClassName('purchase-information')[0].addEventListener('scroll', this.handleScroll)
    }
    handleScroll() {}
    created() {
      this.sliderStep = 2
    }
    /**
     * 获取弹窗内所有订单信息
     */
    getOrderDetail(row) {
      this.productOrderService.findOrderInfoByOrderNumber({
        orderNumber: row.orderNumber
      }).subscribe(val => {
        console.log(666, val)
      })
    }
  }

</script>

<style scoped>
  .color {
    color: #333333!important;
  }


  td {
    font-size: 14px;
    padding: 5px;
  }

  .quick-link {
    color: #999999;
  }

  .quick-link:active {
    color: #333333;
  }

</style>
