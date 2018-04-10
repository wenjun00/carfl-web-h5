<!--融资租赁申请-->
<template>
  <section class="pageContainer financing-lease-apply specialInput">
    <div class="page" style="height:820px;overflow:hidden">
      <div class="header">
        <div class="form-title">融资租赁申请
          <div style="float:right;margin-right:20px;">
            <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
              <span style="font-size:12px;margin-right:10px" @click="BusinessFlowDiagram">业务流程图</span>
              <svg-icon iconClass="dayin" style="font-size:24px;"></svg-icon>
              <span style="font-size:12px;" @click="print">打印</span>
            </div>
          </div>
        </div>
      </div>
      <i-row type="flex">
        <i-col span="18">
          <i-form ref="customer-form" :model="customerModel" label-position="left" :rules="customerRule" :label-width="110" style="margin-top:20px;position:relative;left:16px;">
            <i-col span="12">
              <i-form-item label="证件号码" prop="idCard">
                <i-input type="text" :maxlength="18" v-model="customerModel.idCard" autofocus @on-change="showTab" @on-blur="checkcustomerinfo">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="12">
              <i-form-item label="客户姓名" prop="name">
                <i-input type="text" :maxlength="13" v-model="customerModel.name" @on-blur="ReverseData">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="12">
              <i-form-item label="客户电话" prop="mobileMain">
                <i-input type="text" v-model="customerModel.mobileMain" @on-blur="ReverseData">
                </i-input>
              </i-form-item>
            </i-col>
            <i-col span="12">
              <i-form-item label="归属业务员" prop="salesmanName">
                <i-input type="text" :maxlength="13" v-model="customerModel.salesmanName">
                </i-input>
              </i-form-item>
            </i-col>
          </i-form>
        </i-col>
        <!-- <i-col span="6" style="display: flex;justify-content: center;align-items: center;position:absolute;top:12%;right:18%;" pull="6"> -->
        <i-button class="blueButton" @click="addNewApply" style="height:40px;position:relative;top:60px;">添加新申请</i-button>
        <!-- </i-col> -->
      </i-row>
      <div class="shade" :style="{display:disabledStatus}">
      </div>
      <i-tabs type="card" v-model="materialTabs" class="finance-lease-tabs">
        <i-tab-pane label="选购资料" name="choose-buy-materials">
          <choose-buy-materials ref="choose-buy-materials"></choose-buy-materials>
        </i-tab-pane>
        <i-tab-pane label="客户资料" name="customer-materials">
          <customer-materials ref="customer-materials"></customer-materials>
        </i-tab-pane>
        <i-tab-pane label="客户职业" name="customer-job-message">
          <customer-job-message ref="customer-job-message"></customer-job-message>
        </i-tab-pane>
        <i-tab-pane label="客户联系人" name="customer-contacts">
          <customer-contacts ref="customer-contacts"></customer-contacts>
        </i-tab-pane>
        <i-tab-pane label="客户来源" name="customer-origin">
          <customer-origin ref="customer-origin"></customer-origin>
        </i-tab-pane>
        <i-tab-pane label="上传素材" name="upload-the-material">
          <upload-the-material ref="upload-the-material"></upload-the-material>
        </i-tab-pane>
      </i-tabs>
      <!--<div style="height:535px;overflow-y:auto;overflow-x:hidden;">
        <div class="shade" :style="{display:disabledStatus}">
        </div>
        <component :is="materialTabs"></component>
      </div>-->
      <div class="submitBar">
        <i-row type="flex" align="middle" style="padding:5px">
          <i-col :span="8" push="1">
          </i-col>
          <i-col :span="10" pull="4">
          </i-col>
          <i-col :span="6" style="text-align:right;position:relative;bottom:6px;">
            <i-button size="large" class="highDefaultButton" @click="draftsaveAndSubmit(true)">保存草稿</i-button>
            <i-button size="large" class="highButton" style="margin-left:10px;" @click="saveAndSubmit(false)">保存并提交</i-button>
          </i-col>
        </i-row>
      </div>
    </div>
    <template>
      <i-modal title="历史记录" width="1200" v-model="historicalModal" :trandfer="false" class="historical">
        <historical-record @closeProduct="closeProduct" @close="historicalModal=false;disabledStatus = 'none'" :historicalDataset="historicalDataset" @distributionData="distributionData"></historical-record>
      </i-modal>
    </template>

    <template>
      <i-modal title="业务流程图" width="1000" height="628" v-model="BusinessFlowDiagramModel" :trandfer="false">
        <div class="yewuliucheng-bg">
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="tsx">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import ChooseBuyMaterials from "~/components/purchase-manage/choose-buy-materials.tsx.vue";
  import CustomerMaterials from "~/components/purchase-manage/customer-materials.vue";
  import CustomerJobMessage from "~/components/purchase-manage/customer-job-message.vue";
  import UploadTheMaterial from "~/components/purchase-manage/upload-the-material.vue";
  import CustomerContacts from "~/components/purchase-manage/customer-contacts.vue";
  import CustomerOrigin from "~/components/purchase-manage/customer-origin.vue";
  import SvgIcon from "~/components/common/svg-icon.vue";
  import HistoricalRecord from "~/components/purchase-manage/historical-record.vue";
  import {
    PersonalService
  } from "~/services/manage-service/personal.service";
  import {
    ProductOrderService
  } from "~/services/manage-service/product-order.service";
import { State, Mutation, namespace } from "vuex-class";
  import {
    Layout
  } from "~/core/decorator";
  import {
    CityService
  } from "~/utils/city.service"
  import {
    FilterService
  } from "~/utils/filter.service"
 const ModuleState = namespace('purchase', State)

  @Layout("workspace")
  @Component({
    components: {
      ChooseBuyMaterials,
      CustomerMaterials,
      CustomerJobMessage,
      CustomerOrigin,
      UploadTheMaterial,
      CustomerContacts,
      SvgIcon,
      HistoricalRecord
    }
  })
  export default class FinancingLeaseApply extends Page {
    @Dependencies(PersonalService) private personalService: PersonalService;
    @Dependencies(ProductOrderService) private productOrderService: ProductOrderService;
    @ModuleState collectiondata




    private customerRule: Object = {
      idCard: [{
        required: true,
        message: '请输入证件号码',
        trigger: 'blur',
      },
      { validator: this.$validator.idCard, trigger: "blur" }],
      name: [{
        required: true,
        message: '请输入客户姓名',
        trigger: 'blur',
      }],
      mobileMain: [{
        required: true,
        message: '请输入客户电话',
        trigger: 'blur',
      },
      { validator: this.$validator.phoneNumber, trigger: "blur" }],
      salesmanName: [{
        required: true,
        message: '请输入归属业务员',
        trigger: 'blur',
      }],
    };
    private customerModel: any = {
      idCard: "", // 证件号码
      name: "", // 客户姓名
      mobileMain: "", // 客户电话
      salesmanName: "" // 归属业务员
    };
    private BusinessFlowDiagramModel: Boolean = false;
    private addCar: Boolean = false;
    private disabledStatus: String = ""; // 子组件中输入框禁用flag
    private materialTabs: String = "choose-buy-materials";
    private historicalModal: Boolean = false;
    private historicalDataset: any = [];
    private PersonalData: any = [];
    private addcarData: any = [];
    private type: Boolean = false;
    private orderStatus: any = '';
    // private productId: any;
  mounted () {
      if(this.$store.state.pageList.find(v=>v.resoname==='融资租赁申请').flag){
         this.customerModel=this.collectiondata
         this.customerModel.name=this.collectiondata.personalName
         this.showTab()
      }
  }
    print() {
      window.print();
    }
    /**
     * 业务流程图
     */
    BusinessFlowDiagram() {
      this.BusinessFlowDiagramModel = true
    }
    ReverseData() {
      let customermodel: any = this.$refs['customer-materials']
      customermodel.getinfo(this.customerModel)
    }

    closeProduct(){
        let choose:any=this.$refs['choose-buy-materials']
        choose.closeProductForm()
    }
    /**
     * 根据客户三项查询历史订单
     */
    checkcustomerinfo() {
        console.log(this.customerModel.idCard)
        let idcard:any=this.customerModel.idCard
        if(parseInt(idcard.substr(16, 1)) % 2 == 1){
            this.customerModel.sex=1
            this.ReverseData()
        }else{
            this.customerModel.sex=2
            this.ReverseData()
        }
        // this.customerModel.birthTime=idcard.substring(6, 10) + "-" + idcard.substring(10, 12) + "-" + idcard.substring(12, 14)
        // this.customerModel.birthTime=FilterService.dateFormat(this.customerModel.birthTime, 'yyyy-MM-dd')
        // this.ReverseData()
      this.customerModel.name = ''
      this.customerModel.mobileMain = ''
      this.customerModel.salesmanName = ''
      this.resethistory()
      let customermodel: any = this.$refs['customer-materials']
      customermodel.getinfo(this.customerModel)
      if (this.customerModel.idCard) {
        this.personalService
          .getCustomerHistoryFinanceInfo(this.customerModel)
          .subscribe(
            data => {
              this.historicalDataset = data;
              console.log(data, 'data')
              if (this.historicalDataset.length) {
                this.historicalModal = true;
              }
              //    else {
              //     this.customerModel.name = ''
              //     this.customerModel.mobileMain = ''
              //     this.customerModel.salesmanName = ''
              //     this.resethistory()
              //   }
            },
            ({
              msg
            }) => {
              this.$Message.error(msg);
            }
          );
      }
    }
    /**
     * 客户信息反显
     */
    distributionData(data) {
      console.log(data, '信息反显')
      this.customerModel.name = data.personal.name;
      this.customerModel.mobileMain = data.personal.mobileMain;
      this.customerModel.salesmanName = data.salesmanName;
      //   选购资料反显
      let _choosebuymaterials: any = this.$refs['choose-buy-materials']
      _choosebuymaterials.Reverse(data)
      //   客户联系人反显
      let _customercontacts: any = this.$refs['customer-contacts']
      _customercontacts.Reverse(data)
      //   职业信息
      let _customerjobmessage: any = this.$refs['customer-job-message']
      _customerjobmessage.Reverse(data)
      //   客户资料
      let _customermaterials: any = this.$refs['customer-materials']
      _customermaterials.Reverse(data)
      //   客户来源
      let _customerorigin: any = this.$refs['customer-origin']
      _customerorigin.Reverse(data)
    //   上传资料反显
      let _uploadthematerial:any=this.$refs['upload-the-material']
      _uploadthematerial.Reverse(data)

    }
    /**
     * 重置
     */
    resethistory() {
      //   选购资料重置
      let _choosebuymaterials: any = this.$refs['choose-buy-materials']
      let customerform: any = _choosebuymaterials.$refs['customer-form']
      customerform.resetFields()
      _choosebuymaterials.addcarData = []
      _choosebuymaterials.chooseBuyModel = {}
      //   客户联系人重置
      let _customercontacts: any = this.$refs['customer-contacts']
      _customercontacts.reset()

      //   客户资料
      let _customermaterials: any = this.$refs['customer-materials']
      let job: any = _customermaterials.$refs['job-form']
      job.resetFields()
      //   客户来源
      let _customerorigin: any = this.$refs['customer-origin']
      //   let form: any = _customerorigin.$refs['job-form']
      _customerorigin.reset()
           //   上传资料
      let uploadmaterial: any = this.$refs['upload-the-material']
      uploadmaterial.resetfileList()
      //   职业信息
      let _customerjobmessage: any = this.$refs['customer-job-message']
       _customerjobmessage.jobchange()
    //   let revenueform: any = _customerjobmessage.$refs['revenue-form']
    //   revenueform.resetFields()
      //   let jobform: any = _customerjobmessage.$refs['company-form']
      //   jobform.resetFields()
    }
    created() {}
    /**
     * 添加新申请
     */
    addNewApply() {
      this.$Modal.confirm({
        title: "提示",
        content: "有未提交的申请，确定创建新申请吗？",
        onOk: () => {
          let resetData: any = this.$refs["customer-form"];
          resetData.resetFields();
          this.resethistory()
          this.disabledStatus=''
        },
        onCancel: () => {
          this.$Message.info("取消成功！");
        }
      });
    }

    /**
     * 保存草稿
     */
    draftsaveAndSubmit(type) {
      let customerOrigin: any = this.$refs['customer-origin'];
      let choosebuymaterials: any = this.$refs["choose-buy-materials"];
      let customerMaterials: any = this.$refs['customer-materials'];
      let customerJobMessage: any = this.$refs['customer-job-message'];
      let customerContacts: any = this.$refs['customer-contacts'];
      console.log(customerOrigin, 'OriginModel')
      let uploadTheMaterial: any = this.$refs['upload-the-material'];
      if (type) {
        this.orderStatus = 303;
      } else {
        this.orderStatus = 304;
      }
      for (let item of choosebuymaterials.addcarData) {
        this.addcarData.push({
          //   id: item.id,
          brandId: item.brandId,
          brandName: item.brandName,
          carSeriesId: item.seriesId,
          modelName: item.modelName,
          otherExpenses: item.otherExpenses,
          amount: item.carAmount,
          vehicleColour: item.carColour,
          vehicleEmissions: item.carEmissions
        });
      }
      choosebuymaterials.addcarData.map(v => {
        v.carSeriesId = v.seriesId,
          v.amount = v.carAmount,
          v.vehicleColour = v.carColour,
          v.vehicleEmissions = v.carEmissions

      })
      choosebuymaterials.addcarData.forEach(v=>delete v.id)
      let addcarDatas = Array.from(new Set(this.addcarData))
      console.log(uploadTheMaterial.dataList,'uploadTheMaterial.dataList')
      this.PersonalData = uploadTheMaterial.dataList.map(material=>{
        return {
          materialType: uploadTheMaterial.model1, // 客户素材类型
          uploadName: material.name, // 资料上传名称
          // id: material.id,
          materialUrl:material.url,
        }
      })
      let resourceType = Array.from(new Set(customerOrigin.OriginModel.resourceType))
      let orderServiceList = Array.from(new Set(choosebuymaterials.chooseBuyModel.orderServiceList))
      console.log(choosebuymaterials.chooseBuyModel.depositPercent, choosebuymaterials.chooseBuyModel,'99')
      delete customerMaterials.customerMaterialsForm.personalDatas
      let savesubmitDataset: any = {
        orderStatus: this.orderStatus,
        idCard: this.customerModel.idCard,
        name: this.customerModel.name,
        mobileMain: this.customerModel.customerPhone,
        salesmanName: this.customerModel.salesmanName,
        // 选购资料
        orderCars: choosebuymaterials.addcarData,
        province: choosebuymaterials.chooseBuyModel.province,
        city: choosebuymaterials.chooseBuyModel.city,
        companyId: choosebuymaterials.chooseBuyModel.companyId,
        orderService: orderServiceList, // 自缴费用
        financingUse: choosebuymaterials.chooseBuyModel.financingUse, // 融资租赁用途
        intentionFinancingAmount: choosebuymaterials.chooseBuyModel.intentionFinancingAmount, // 意向融资金额
        intentionPeriods: choosebuymaterials.chooseBuyModel.intentionPeriods, // 意向期限
        rentPayable: Number(choosebuymaterials.chooseBuyModel.rentPayable), // 租金支付
        intentionPaymentRatio: Number(choosebuymaterials.chooseBuyModel.intentionPaymentRatio), // 意向首付比例
        manageCostPercent: Number(choosebuymaterials.chooseBuyModel.manageData)*0.01||0, // 管理比例
        depositPercent: Number(choosebuymaterials.chooseBuyModel.deposit)*0.01||0, // 保证金比例
        paymentScale: Number(choosebuymaterials.chooseBuyModel.Payment)*0.01||0, // 首付比例
        final:Number(choosebuymaterials.chooseBuyModel.final)*0.01||0, // 尾付比例
        finalPayment: choosebuymaterials.chooseBuyModel.finalprincipal, // 尾付本金
        // orderCar: choosebuymaterials.addcarData, // 添加车辆信息
        // 产品信息
        productId: choosebuymaterials.DataSet.productId, // 产品id
        productIssueId: choosebuymaterials.DataSet.id, // 期数id
        seriesId: choosebuymaterials.chooseBuyModel.seriesId, // 系列id
        productRate: choosebuymaterials.chooseBuyModel.prdInterestRate, // 产品利率
        payWay: choosebuymaterials.chooseBuyModel.payWay, // 还款方式
        vehicleAmount: choosebuymaterials.chooseBuyModel.vehicleAmount, // 车辆参考总价
        financingAmount: choosebuymaterials.chooseBuyModel.financeTotalMoney, // 融资总额
        initialPayment: choosebuymaterials.chooseBuyModel.initialPayment||0, // 首付金额
        depositCash: choosebuymaterials.chooseBuyModel.depositCash||0, // 保证金金额
        finalCash: choosebuymaterials.chooseBuyModel.finalCash, // 尾付金额
        manageCost: choosebuymaterials.chooseBuyModel.manageCost||0, // 管理费
        insuranceExpenses: choosebuymaterials.chooseBuyModel.insuranceMoney, // 保险费
        purchaseTax: choosebuymaterials.chooseBuyModel.purchaseMoney, // 购置费
        installLicenseFee: choosebuymaterials.chooseBuyModel.licenseMoney, // 上牌费
        gpsFee: choosebuymaterials.chooseBuyModel.GpsMoney, // GPS费
        remark: choosebuymaterials.chooseBuyModel.remark, // 备注
        otherFee: choosebuymaterials.chooseBuyModel.otherFee, // 其他费用
        // productIssueId: choosebuymaterials.chooseBuyModel.periods, // 产品期数
        monthlySupply: choosebuymaterials.chooseBuyModel.moneyPay, // 月供金额

        // 客户资料
        personal: customerMaterials.customerMaterialsForm,
        // 客户职业
        personalJob: customerJobMessage.job,
        // 客户联系人
        personalContacts: customerContacts.data1.concat(customerContacts.data2),
        // 客户来源
        personalResourceIntroduce: customerOrigin.customerOriginModel, // 通过介绍
        resourceTypes: resourceType, // 通过宣传
        // 上传素材
        personalDatas: this.PersonalData
      };
      this.productOrderService.saveFinanceApplyInfo(savesubmitDataset).subscribe(data => {
        this.$Message.success('保存成功！');
      }, ({
        msg
      }) => {
        this.$Message.error(msg);
      });
    }
    /**
     * 保存并提交
     */
    saveAndSubmit(type) {
      let customerOrigin: any = this.$refs['customer-origin'];
      console.log(customerOrigin.customerOriginModel, 'customerOrigin.customerOriginModel')
      let _customerform: any = this.$refs['customer-form'];
      _customerform.validate(valid => {
        if (!valid) {
          return false
        } else {
          let choosebuymaterials: any = this.$refs["choose-buy-materials"];
          let _customerform: any = choosebuymaterials.$refs['customer-form'];
          _customerform.validate(valid => {
            if (!valid) {
              this.$Message.warning('请完善选购资料信息！');
              return false
            } else {
              let _form: any = choosebuymaterials.$refs['form'];
              _form.validate(valid => {
                if (!valid) {
                  this.$Message.warning('请完善选购资料信息！');
                  return false
                } else {
                  let customerMaterials: any = this.$refs['customer-materials'];
                  let _jobform: any = customerMaterials.$refs['job-form'];
                  console.log(_jobform, '_jobform')
                  _jobform.validate(valid => {
                    console.log(valid, 'valid')
                    if (!valid) {
                      this.$Message.warning('请完善客户资料信息！');
                      return false
                    } else {
                      let customerJobMessage: any = this.$refs['customer-job-message'];
                      let customerContacts: any = this.$refs['customer-contacts'];
                      let customerOrigin: any = this.$refs['customer-origin'];
                      console.log(customerOrigin, 'OriginModel')
                      let uploadTheMaterial: any = this.$refs['upload-the-material'];
                      if (customerContacts.data1.length < 2) {
                        this.$Message.warning('客户联系人信息直系亲属必填2个！');
                        return
                      }
                      if (customerContacts.data2.length < 3) {
                        this.$Message.warning('客户联系人信息信息必填3个其他联系人！');
                        return
                      }
                      if (type) {
                        this.orderStatus = 303;
                      } else {
                        this.orderStatus = 304;
                      }
                      for (let item of choosebuymaterials.addcarData) {
                        this.addcarData.push({
                          //   id: item.id,
                          brandId: item.brandId,
                          brandName: item.brandName,
                          carSeriesId: item.seriesId,
                          modelName: item.modelName,
                          otherExpenses: item.otherExpenses,
                          amount: item.carAmount,
                          vehicleColour: item.carColour,
                          vehicleEmissions: item.carEmissions
                        });
                      }
                      choosebuymaterials.addcarData.map(v => {
                        v.carSeriesId = v.seriesId,
                          v.amount = v.carAmount,
                          v.vehicleColour = v.carColour,
                          v.vehicleEmissions = v.carEmissions
                      })
                      let addcarDatas = Array.from(new Set(this.addcarData))
                      this.PersonalData = uploadTheMaterial.dataList.map(material=>{
                        return {
                          materialType: uploadTheMaterial.model1, // 客户素材类型
                          uploadName: material.name, // 资料上传名称
                          // id: material.id,
                          materialUrl:material.url,
                        }
                      })
                      if (choosebuymaterials.addcarData.length === 0) {
                        this.$Message.warning('请添加车辆信息');
                        return
                      }
                      if(customerJobMessage.jobType===37&&customerJobMessage.job.companyName === ''){
                        this.$Message.warning('请完善客户职业信息');
                        return
                      }
                      if(customerJobMessage.jobType===38&&customerJobMessage.job.identity === ''){
                        this.$Message.warning('请完善客户职业信息');
                        return
                      }

                    //   if (customerOrigin.OriginModel.resourceType.length === 0) {
                    //     this.$Message.warning('请完善客户来源信息');
                    //     return
                    //   }
                      let resourceType = Array.from(new Set(customerOrigin.OriginModel.resourceType))
                      //   customerJobMessage.job.accessCompanyTime = FilterService.dateFormat(customerJobMessage.job.accessCompanyTime,
                      //     'yyyy-MM')
                      //   customerMaterials.customerMaterialsForm.birthTime = FilterService.dateFormat(customerMaterials.customerMaterialsForm
                      //     .birthTime,
                      //     'yyyy-MM-dd')
                      choosebuymaterials.addcarData.forEach(v=>delete v.id)
                      console.log(choosebuymaterials.addcarData,'choosebuymaterials.addcarData')
                      let orderServiceList = Array.from(new Set(choosebuymaterials.chooseBuyModel.orderServiceList))
                      delete customerMaterials.customerMaterialsForm.personalDatas
                      let savesubmitDataset: any = {
                        orderStatus: this.orderStatus,
                        idCard: this.customerModel.idCard,
                        name: this.customerModel.name,
                        mobileMain: this.customerModel.customerPhone,
                        salesmanName: this.customerModel.salesmanName,
                        // 选购资料
                        orderCars: choosebuymaterials.addcarData,
                        province: choosebuymaterials.chooseBuyModel.province,
                        city: choosebuymaterials.chooseBuyModel.city,
                        companyId: choosebuymaterials.chooseBuyModel.companyId,
                        orderService: orderServiceList, // 自缴费用
                        financingUse: choosebuymaterials.chooseBuyModel.financingUse, // 融资租赁用途
                        intentionFinancingAmount: choosebuymaterials.chooseBuyModel.intentionFinancingAmount, // 意向融资金额
                        intentionPeriods: choosebuymaterials.chooseBuyModel.intentionPeriods, // 意向期限
                        rentPayable: Number(choosebuymaterials.chooseBuyModel.rentPayable), // 租金支付
                        finalPayment: choosebuymaterials.chooseBuyModel.finalprincipal, // 尾付本金
                        manageCostPercent: Number(choosebuymaterials.chooseBuyModel.manageData)*0.01||0, // 管理比例
                        depositPercent: Number(choosebuymaterials.chooseBuyModel.deposit)*0.01||0, // 保证金比例
                        paymentScale: Number(choosebuymaterials.chooseBuyModel.Payment)*0.01||0, // 首付比例
                        final:Number(choosebuymaterials.chooseBuyModel.final)*0.01||0, // 尾付比例
                        intentionPaymentRatio: Number(choosebuymaterials.chooseBuyModel.intentionPaymentRatio), // 意向首付比例
                        // orderCar: choosebuymaterials.addcarData, // 添加车辆信息
                        // 产品信息
                        productId: choosebuymaterials.DataSet.productId, // 产品id
                        productIssueId: choosebuymaterials.DataSet.id, // 期数id
                        seriesId: choosebuymaterials.chooseBuyModel.seriesId, // 系列id
                        productRate: choosebuymaterials.chooseBuyModel.prdInterestRate, // 产品利率
                        payWay: choosebuymaterials.chooseBuyModel.payWay, // 还款方式
                        vehicleAmount: choosebuymaterials.chooseBuyModel.vehicleAmount, // 车辆参考总价
                        financingAmount: choosebuymaterials.chooseBuyModel.financeTotalMoney, // 融资总额
                        initialPayment: choosebuymaterials.chooseBuyModel.initialPayment||0, // 首付金额
                        depositCash: choosebuymaterials.chooseBuyModel.depositCash||0, // 保证金金额
                        finalCash: choosebuymaterials.chooseBuyModel.finalCash, // 尾付金额
                        manageCost: choosebuymaterials.chooseBuyModel.manageCost||0, // 管理费
                        insuranceExpenses: choosebuymaterials.chooseBuyModel.insuranceMoney, // 保险费
                        purchaseTax: choosebuymaterials.chooseBuyModel.purchaseMoney, // 购置费
                        installLicenseFee: choosebuymaterials.chooseBuyModel.licenseMoney, // 上牌费
                        gpsFee: choosebuymaterials.chooseBuyModel.GpsMoney, // GPS费
                        remark: choosebuymaterials.chooseBuyModel.remark, // 备注
                        otherFee: choosebuymaterials.chooseBuyModel.otherFee, // 其他费用
                        // productIssueId: choosebuymaterials.chooseBuyModel.periods, // 产品期数
                        monthlySupply: choosebuymaterials.chooseBuyModel.moneyPay, // 月供金额

                        // 客户资料
                        personal: customerMaterials.customerMaterialsForm,
                        // 客户职业
                        personalJob: customerJobMessage.job,
                        // 客户联系人
                        personalContacts: customerContacts.data1.concat(customerContacts.data2),
                        // 客户来源
                        personalResourceIntroduce: customerOrigin.customerOriginModel, // 通过介绍
                        resourceTypes: resourceType, // 通过宣传
                        // 上传素材
                        personalDatas: this.PersonalData
                      };
                      console.log(666666666666666666666)
                      this.productOrderService.saveFinanceApplyInfo(savesubmitDataset).subscribe(data => {
                        this.$Message.success('保存成功！');
                      }, ({
                        msg
                      }) => {
                        this.$Message.error(msg);
                      });
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
    showTab() {
      if(this.customerModel.idCard.length === 18){
        this.disabledStatus = 'none';
      }
    }
  }

</script>

<style lang="less" scope>
  .header {
    border-bottom: 1px solid #cccccc;
  }

  .page {
    height: 1750px!important;
  }

  .submitBar {
    line-height: 70px;
    height: 70px;
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    border: 1px solid #ddd;
    box-shadow: -3px 2px 20px #dddddd;
    padding-right: 24px;
  }

  .specialInput {
    .ivu-input {
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0; // width: 257%;
    }
  }

  .financing-lease-apply {
    .ivu-select-selection {
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
    .shade {
      width: 98%;
      height: 2000px;
      background: rgba(250, 250, 250, 0.4);
      position: absolute;
      left: 21px;
      top: 257px;
      z-index: 999;
    }
  }

  .finance-lease-tabs {
    .ivu-tabs-bar {
      border-bottom: 1px solid #dddee1;
      .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
        margin: 0;
        margin-right: 4px;
        padding: 5px 16px 4px;
        border: 1px solid #dddee1;
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
        transition: all 0.3s ease-in-out;
      }
    }
  }

  .historical {
    .ivu-modal-footer {
      display: none !important;
    }
  }

  .yewuliucheng-bg {
    width: 1000px;
    height: 375px;
    background-image: url('/static/images/common/yewuliucheng-bg.jpg');
    position: absolute;
    left: -1px;
    background-repeat: no-repeat;
    background-size: 1000px 375px;
  }

</style>
