<!--客户职业-->
<template>
  <section class="component customer-origin">
    <h2>客户来源</h2>
    <i-form ref="job-form" :model="OriginModel" :label-width="110">
      <i-row>
        <i-form-item label="通过宣传" prop="name">
          <i-checkbox-group v-model="OriginModel.resourceType">
            <i-checkbox :label="65">宣传页</i-checkbox>
            <i-checkbox :label="66">网络推广</i-checkbox>
            <i-checkbox :label="67">电销</i-checkbox>
            <i-checkbox :label="68">营销活动</i-checkbox>
            <i-checkbox :label="69">到店经营</i-checkbox>
            <i-checkbox :label="70">总部推荐</i-checkbox>
            <i-checkbox :label="80">其他</i-checkbox>
          </i-checkbox-group>

        </i-form-item>
      </i-row>
    </i-form>
    <i-row>
      <div style="margin-left:50px;">

        <span style="margin-right:40px;">通过介绍</span>
        <div style="margin-left:58px;">
          <i-checkbox v-model="ischecked" @on-change="checked">同行推荐</i-checkbox>
          <div v-if="ischecked" style="position:relative;left:105px;width:300px;">
            <i-form ref="job-form" :model="customerOriginModel" label-position="left" :label-width="110">
              <i-form-item label="同行姓名" prop="peerName">
                <i-input type="text" v-model="customerOriginModel.peerName"></i-input>
              </i-form-item>
              <i-form-item label="同行公司" prop="peerCompany">
                <i-input type="text" v-model="customerOriginModel.peerCompany"></i-input>
              </i-form-item>
              <i-form-item label="同行联系方式" prop="peerPhone">
                <i-input type="text" v-model="customerOriginModel.peerPhone"></i-input>
              </i-form-item>
            </i-form>
          </div>
        </div>
        <div style="margin-left:58px;margin-top:15px">
          <i-checkbox v-model="isShow" @on-change="checked1">客户转介绍</i-checkbox>
          <div v-if="isShow" style="position:relative;left:105px;width:300px;">
            <i-form ref="job-form" label-position="left" :label-width="110">
              <i-form-item label="客户姓名" prop="customerName">
                <i-input type="text" v-model="customerOriginModel.customerName"></i-input>
              </i-form-item>
              <i-form-item label="联系方式" prop="customerPhone">
                <i-input type="text" v-model="customerOriginModel.customerPhone"></i-input>
              </i-form-item>
              <i-form-item label="在我司是否成功购车" prop="isBuyCar">
                <!--<i-input type="text"></i-input>-->
                <RadioGroup v-model="customerOriginModel.isBuyCar">
                  <Radio label="是"></Radio>
                  <Radio label="否"></Radio>
                </RadioGroup>
              </i-form-item>
            </i-form>
          </div>
        </div>
        <div style="margin-left:58px;margin-top:15px">
          <i-checkbox v-model="isTrue" @on-change="checked2">分支机构推荐</i-checkbox>
          <div v-if="isTrue" style="position:relative;left:105px;width:300px;">
            <i-form ref="job-form" label-position="left" :label-width="110">
              <i-form-item label="机构名称" prop="organizationNames">
                <i-input type="text" v-model="customerOriginModel.organizationNames"></i-input>
              </i-form-item>
              <i-form-item label="推荐人" prop="referrer">
                <i-input type="text" v-model="customerOriginModel.referrer"></i-input>
              </i-form-item>
            </i-form>
          </div>
        </div>
      </div>
    </i-row>


  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({})
  export default class CustomerOrigin extends Vue {
    private customerOriginModel: any = {
      peerName: '', // 同行姓名
      peerCompany: '', // 同行公司
      peerPhone: '', // 同行联系方式

      customerName: '', // 客户姓名
      customerPhone: '', // 联系方式
      isBuyCar: '', // 在我司是否成功购车

      organizationNames: '', // 机构名称
      referrer: '', // 推荐人

    };
    private OriginModel: any = {
      resourceType: [], // 来源
    }
    // private customerOriginModel: any = {
    //   customerName: '', // 客户姓名
    //   customerPhone: '', // 联系方式
    //   isBuyCar: '', // 在我司是否成功购车
    // };
    private company: any = {
      identity: "",
      year: "",
      address: "",
      people: "",
      capital: "",
      industry: "",
      yearRevenue: "",
      yearProfits: ""
    };
    private jobType: String = "工薪者";
    private typeList: Array < String > ;
    private ischecked: Boolean = false;
    private isTrue: Boolean = false;
    private isShow: Boolean = false;
    private isBuyCar: String = '是';


    checked() {
      return !this.ischecked
    }
    checked1() {
      return !this.isShow
    }
    checked2() {
      return !this.isTrue
    }
    created() {
      this.typeList = ["机关事业", "国有企业", "社会团体", "外资", "合资", "私营有限公司", "个体户"]
    }

  }

</script>

<style lang="less" scope>


</style>
