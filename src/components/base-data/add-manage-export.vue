<!--订单信息导出-->
<template>
  <section class="component add-manage-export">
    <i-row  style="margin:6px;">
      <span >模版名称</span>
      <i-input style="width:30%;margin-left:10px"  placeholder="请输入模版名称" v-model="personalModel.name"></i-input>
      <div style="margin-top:10px" >
        <svg-icon iconClass="jisuanqi"></svg-icon>
        <span class="exportTitle">选购信息</span>
      </div>
      <div style="padding-bottom:6px;margin:6px 0px 6px 15px;">
        <Checkbox :indeterminate="buyInfoIndeterminate" :value="buyInfoCheckAll" @click.prevent.native="buyInfoHandleCheckAll">全选</Checkbox>
      </div>
      <div style="margin:0px 0px 0px 15px;">
        <CheckboxGroup v-model="buyInfoCheckAllGroup" @on-change="buyInfoCheckAllGroupChange">
          <Checkbox v-for="item in checkBuyList" :label="item.name" :key="item.index"></Checkbox>
        </CheckboxGroup>
      </div>

      <div style="margin-top:10px" >
        <svg-icon iconClass="jisuanqi"></svg-icon>
        <span class="exportTitle">产品信息</span>
      </div>
      <div style="padding-bottom:6px;margin:6px 0px 6px 15px;">
        <Checkbox :indeterminate="prdInfoIndeterminate" :value="prdInfoCheckAll" @click.prevent.native="prdInfoHandleCheckAll">全选</Checkbox>
      </div>
      <div style="margin:0px 0px 0px 15px;">
        <CheckboxGroup v-model="prdInfoCheckAllGroup" @on-change="prdInfoCheckAllGroupChange">
          <Checkbox v-for="item in prdInfoList" :label="item.name" :key="item.index"></Checkbox>
        </CheckboxGroup>
      </div>

      <div style="margin-top:10px" >
        <svg-icon iconClass="jisuanqi"></svg-icon>
        <span class="exportTitle">金融方案</span>
      </div>
      <div style="padding-bottom:6px;margin:6px 0px 6px 15px;">
        <Checkbox :indeterminate="financeIndeterminate" :value="financeCheckAll" @click.prevent.native="financeHandleCheckAll">全选</Checkbox>
      </div>
      <div style="margin:0px 0px 0px 15px;">
        <CheckboxGroup v-model="financeCheckAllGroup" @on-change="financeCheckAllGroupChange">
          <Checkbox v-for="item in financeInfoList" :label="item.name" :key="item.index"></Checkbox>
        </CheckboxGroup>
      </div>

      <div style="margin-top:10px" >
        <svg-icon iconClass="jisuanqi"></svg-icon>
        <span class="exportTitle">客户信息</span>
      </div>
      <div style="padding-bottom:6px;margin:6px 0px 6px 15px;">
        <Checkbox :indeterminate="customerIndeterminate" :value="customerCheckAll" @click.prevent.native="customerHandleCheckAll">全选</Checkbox>
      </div>
      <div style="margin:0px 0px 0px 15px;">
        <CheckboxGroup v-model="customerCheckAllGroup" @on-change="customerCheckAllGroupChange">
          <Checkbox v-for="item in customerInfoList" :label="item.name" :key="item.index"></Checkbox>
        </CheckboxGroup>
      </div>

      <div style="margin-top:10px" >
        <svg-icon iconClass="jisuanqi"></svg-icon>
        <span class="exportTitle">订单信息</span>
      </div>
      <div style="padding-bottom:6px;margin:6px 0px 6px 15px;">
        <Checkbox :indeterminate="orderIndeterminate" :value="orderCheckAll" @click.prevent.native="orderHandleCheckAll">全选</Checkbox>
      </div>
      <div style="margin:0px 0px 0px 15px;">
        <CheckboxGroup v-model="orderCheckAllGroup" @on-change="orderCheckAllGroupChange">
          <Checkbox v-for="item in orderInfoList" :label="item.name" :key="item.index"></Checkbox>
        </CheckboxGroup>
      </div>
    </i-row>
  </section>
</template>

<script lang="ts">
  import Page from "../../core/page";
  import DataBox from "../common/data-box.vue";
  import Component from "vue-class-component";
  import SvgIcon from '../common/svg-icon.vue'
  import { PageService } from "../../utils/page.service";
  import { Dependencies } from "../../core/decorator";
  import { TemplateService } from "../../services/manage-service/template.service";
  import { Layout } from "../../core/decorator";

  @Layout("workspace")
  @Component({

    components: {
      DataBox,
      SvgIcon
    }
  })
  export default class AddManageExport extends Page {
    @Dependencies(TemplateService) private templateService: TemplateService;
    @Dependencies(PageService) private pageService: PageService;

    private personalModel: any = {
      name:''
    };

    // 选购信息checkbox相关
    private buyInfoCheckAll: Boolean = true;
    private buyInfoIndeterminate: Boolean = false;
    private buyInfoCheckAllGroup: Array < String >= []
    private checkBuyList: Array < any >= []
    // 产品信息checkbox相关
    private prdInfoCheckAll: Boolean = true;
    private prdInfoIndeterminate: Boolean = false;
    private prdInfoCheckAllGroup: Array < String >= []
    private prdInfoList: Array < any >= []
    // 金融方案checkbox相关
    private financeCheckAll: Boolean = true;
    private financeIndeterminate: Boolean = false;
    private financeCheckAllGroup: Array < String >= []
    private financeInfoList: Array < any >= []
    // 客户信息checkbox相关
    private customerCheckAll: Boolean = true;
    private customerIndeterminate: Boolean = false;
    private customerCheckAllGroup: Array < String >= []
    private customerInfoList: Array < any >= []
    // 订单信息checkbox相关
    private orderCheckAll: Boolean = true;
    private orderIndeterminate: Boolean = false;
    private orderCheckAllGroup: Array < String >= []
    private orderInfoList: Array < any >= []

    /**
     * 选购信息
     */
    buyInfoHandleCheckAll() {
      if (this.buyInfoIndeterminate) {
        this.buyInfoCheckAll = false;
      } else {
        this.buyInfoCheckAll = !this.buyInfoCheckAll;
      }
      this.buyInfoIndeterminate = false;
      if (this.buyInfoCheckAll) {
        this.buyInfoCheckAllGroup = this.checkBuyList.map(v => v.name);
      } else {
        this.buyInfoCheckAllGroup = [];
      }
    }
    /**
     * 选购信息
     */
    buyInfoCheckAllGroupChange(data) {
      if (data.length === this.checkBuyList.length) {
        this.buyInfoIndeterminate = false;
        this.buyInfoCheckAll = true;
      } else if (data.length > 0) {
        this.buyInfoIndeterminate = true;
        this.buyInfoCheckAll = false;
      } else {
        this.buyInfoIndeterminate = false;
        this.buyInfoCheckAll = false;
      }
    }
    /**
     * 产品信息
     */
    prdInfoHandleCheckAll() {
      if (this.prdInfoIndeterminate) {
        this.prdInfoCheckAll = false;
      } else {
        this.prdInfoCheckAll = !this.prdInfoCheckAll;
      }
      this.prdInfoIndeterminate = false;

      if (this.prdInfoCheckAll) {
        this.prdInfoCheckAllGroup = this.prdInfoList.map(v => v.name);
      } else {
        this.prdInfoCheckAllGroup = [];
      }
    }
    /**
     * 产品信息
     */
    prdInfoCheckAllGroupChange(data) {
      if (data.length === this.prdInfoList.length) {
        this.prdInfoIndeterminate = false;
        this.prdInfoCheckAll = true;
      } else if (data.length > 0) {
        this.prdInfoIndeterminate = true;
        this.prdInfoCheckAll = false;
      } else {
        this.prdInfoIndeterminate = false;
        this.prdInfoCheckAll = false;
      }
    }

    /**
     * 金融方案信息
     */
    financeHandleCheckAll() {
      if (this.financeIndeterminate) {
        this.financeCheckAll = false;
      } else {
        this.financeCheckAll = !this.financeCheckAll;
      }
      this.financeIndeterminate = false;

      if (this.financeCheckAll) {
        this.financeCheckAllGroup = this.financeInfoList.map(v => v.name);
      } else {
        this.financeCheckAllGroup = [];
      }
    }
    /**
     * 金融方案信息
     */
    financeCheckAllGroupChange(data) {
      if (data.length === this.financeInfoList.length) {
        this.financeIndeterminate = false;
        this.financeCheckAll = true;
      } else if (data.length > 0) {
        this.financeIndeterminate = true;
        this.financeCheckAll = false;
      } else {
        this.financeIndeterminate = false;
        this.financeCheckAll = false;
      }
    }

    /**
     * 客户信息
     */
    customerHandleCheckAll() {
      if (this.customerIndeterminate) {
        this.customerCheckAll = false;
      } else {
        this.customerCheckAll = !this.customerCheckAll;
      }
      this.customerIndeterminate = false;

      if (this.customerCheckAll) {
        this.customerCheckAllGroup = this.customerInfoList.map(v => v.name);
      } else {
        this.customerCheckAllGroup = [];
      }
    }
    /**
     * 客户信息
     */
    customerCheckAllGroupChange(data) {
      if (data.length === this.customerInfoList.length) {
        this.customerIndeterminate = false;
        this.customerCheckAll = true;
      } else if (data.length > 0) {
        this.customerIndeterminate = true;
        this.customerCheckAll = false;
      } else {
        this.customerIndeterminate = false;
        this.customerCheckAll = false;
      }
    }

    /**
     * 订单信息
     */
    orderHandleCheckAll() {
      if (this.orderIndeterminate) {
        this.orderCheckAll = false;
      } else {
        this.orderCheckAll = !this.orderCheckAll;
      }
      this.orderIndeterminate = false;

      if (this.orderCheckAll) {
        this.orderCheckAllGroup = this.orderInfoList.map(v => v.name);
      } else {
        this.orderCheckAllGroup = [];
      }
    }
    /**
     * 订单信息
     */
    orderCheckAllGroupChange(data) {
      if (data.length === this.orderInfoList.length) {
        this.orderIndeterminate = false;
        this.orderCheckAll = true;
      } else if (data.length > 0) {
        this.orderIndeterminate = true;
        this.orderCheckAll = false;
      } else {
        this.orderIndeterminate = false;
        this.orderCheckAll = false;
      }
    }
    start(){
      this.buyInfoCheckAllGroup = ['租赁用途','自缴费用','租赁支付','意向期限','购车型号','购车颜色','购车配置','车辆排量','上牌地区','车牌号码','意向融资金额','意向首付比例']
      this.prdInfoCheckAllGroup = ['产品系列','产品名称','产品期数','产品利率','还款方式','融资额度']
      this.financeCheckAllGroup = ['首付比例','首付金额','融资额','融资期数','月供','尾付款','路桥费','合同金额']
      this.customerCheckAllGroup = ['姓名','性别','出生日期','微信号码','手机号（主）','手机号（次）','婚属状况','教育程度','家庭座机','电费账号','电费密码','毕业院校','身份证号码','证件有效期','发证机关','身份证地址','现居住地址','现居住地生活时长','现居住地房产归属','本市自有房产状况及归属','本市房产地址','本市生活时长','职业信息','客户来源']
      this.orderCheckAllGroup = ['订单创建日期','合同生效日期','提车日期','合同编号','订单状态','订单创建人','订单创建人归属部门']
      this.buyInfoCheckAll = true
      this.prdInfoCheckAll = true
      this.financeCheckAll = true
      this.customerCheckAll = true
      this.orderCheckAll = true
    }
    saveButton(value){
      if(this.personalModel.name === ''){
        this.$Message.warning("请输入模版名称")
        return
      }
      this.templateService.createTemplate({
        dataInfo:{
          productInfo:this.buyInfoCheckAllGroup,
          personalInfo:this.customerCheckAllGroup,
          orderInfo:this.orderCheckAllGroup,
          financialInfo:this.financeCheckAllGroup,
          purchaseInfo:this.prdInfoCheckAllGroup
        },
        templateName:this.personalModel.name,
        templateType:value
      })
      .subscribe( data => {
        this.$emit("close")
        this.$Message.success("新增模版成功！")
        this.personalModel.name = ''
      },({msg}) => {
        this.$Message.error(msg)
      })
    }
    created() {
      /**
       * 选购信息
       */
      this.checkBuyList = [{
        index: 1,
        name: '租赁用途'
      }, {
        index: 2,
        name: '自缴费用'
      }, {
        index: 3,
        name: '租赁支付'
      }, {
        index: 4,
        name: '意向期限'
      }, {
        index: 5,
        name: '购车型号'
      }, {
        index: 6,
        name: '购车颜色'
      }, {
        index: 7,
        name: '购车配置'
      }, {
        index: 8,
        name: '车辆排量'
      }, {
        index: 9,
        name: '上牌地区'
      }, {
        index: 10,
        name: '车牌号码'
      }, {
        index: 11,
        name: '意向融资金额'
      }, {
        index: 12,
        name: '意向首付比例'
      },]
      /**
       * 产品信息
       */
      this.prdInfoList = [{
        index: 1,
        name: '产品系列'
      }, {
        index: 2,
        name: '产品名称'
      }, {
        index: 3,
        name: '产品期数'
      }, {
        index: 4,
        name: '产品利率'
      }, {
        index: 5,
        name: '还款方式'
      }, {
        index: 6,
        name: '融资额度'
      }]
      /**
       * 金融方案
       */
      this.financeInfoList = [{
        index: 1,
        name: '首付比例'
      }, {
        index: 2,
        name: '首付金额'
      }, {
        index: 3,
        name: '融资额'
      }, {
        index: 4,
        name: '融资期数'
      }, {
        index: 5,
        name: '月供'
      }, {
        index: 6,
        name: '尾付款'
      }, {
        index: 7,
        name: '路桥费'
      }, {
        index: 8,
        name: '合同金额'
      }]
      /**
       * 客户信息
       */
      this.customerInfoList = [{
        index: 1,
        name: '姓名'
      }, {
        index: 2,
        name: '性别'
      }, {
        index: 3,
        name: '出生日期'
      }, {
        index: 4,
        name: '微信号码'
      }, {
        index: 5,
        name: '手机号（主）'
      }, {
        index: 6,
        name: '手机号（次）'
      }, {
        index: 7,
        name: '婚属状况'
      }, {
        index: 8,
        name: '教育程度'
      }, {
        index: 9,
        name: '家庭座机'
      }, {
        index: 10,
        name: '电费账号'
      }, {
        index: 11,
        name: '电费密码'
      }, {
        index: 12,
        name: '毕业院校'
      }, {
        index: 13,
        name: '身份证号码'
      }, {
        index: 14,
        name: '证件有效期'
      }, {
        index: 15,
        name: '发证机关'
      }, {
        index: 16,
        name: '身份证地址'
      }, {
        index: 17,
        name: '现居住地址'
      }, {
        index: 18,
        name: '现居住地生活时长'
      }, {
        index: 19,
        name: '现居住地房产归属'
      }, {
        index: 20,
        name: '本市自有房产状况及归属'
      }, {
        index: 21,
        name: '本市房产地址'
      }, {
        index: 22,
        name: '本市生活时长'
      }, {
        index: 23,
        name: '职业信息'
      }, {
        index: 24,
        name: '客户来源'
      }]
      /**
       * 订单信息
       */
      this.orderInfoList = [{
        index: 1,
        name: '订单创建日期'
      }, {
        index: 2,
        name: '合同生效日期'
      }, {
        index: 3,
        name: '提车日期'
      }, {
        index: 4,
        name: '合同编号'
      }, {
        index: 5,
        name: '订单状态'
      }, {
        index: 6,
        name: '订单创建人'
      }, {
        index: 7,
        name: '订单创建人归属部门'
      }]
    }
  }

</script>

<style>
  .exportTitle {
    font-size: 14px;
    font-weight: bold;
    margin-top: 20px;
  }

</style>
