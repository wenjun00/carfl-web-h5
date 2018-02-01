<!--客户职业-->
<template>
  <section class="component customer-origin">
    <h2>客户来源</h2>
    <i-form ref="job-form" :model="job" :label-width="110">
      <i-row>
        <i-form-item label="通过宣传" prop="name">
          <i-checkbox-group v-model="fruit">
            <i-checkbox label="宣传页"></i-checkbox>
            <i-checkbox label="网络推广"></i-checkbox>
            <i-checkbox label="电销"></i-checkbox>
            <i-checkbox label="营销活动"></i-checkbox>
            <i-checkbox label="到店经营"></i-checkbox>
            <i-checkbox label="总部推荐"></i-checkbox>
            <i-checkbox label="其他"></i-checkbox>
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
            <i-form ref="job-form" :model="job" label-position="left" :label-width="110">
              <i-form-item label="同行姓名">
                <i-input type="text"></i-input>
              </i-form-item>
              <i-form-item label="同行公司">
                <i-input type="text"></i-input>
              </i-form-item>
              <i-form-item label="同行联系方式">
                <i-input type="text"></i-input>
              </i-form-item>
            </i-form>
          </div>
        </div>
        <div style="margin-left:58px;margin-top:15px">
          <i-checkbox v-model="isShow" @on-change="checked1">客户转介绍</i-checkbox>
          <div v-if="isShow" style="position:relative;left:105px;width:300px;">
            <i-form ref="job-form" :model="job" label-position="left" :label-width="110">
              <i-form-item label="客户姓名">
                <i-input type="text"></i-input>
              </i-form-item>
              <i-form-item label="联系方式">
                <i-input type="text"></i-input>
              </i-form-item>
              <i-form-item label="在我司是否成功购车">
                <!--<i-input type="text"></i-input>-->
                <RadioGroup v-model="isBuyCar">
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
            <i-form ref="job-form" :model="job" label-position="left" :label-width="110">
              <i-form-item label="机构名称">
                <i-input type="text"></i-input>
              </i-form-item>
              <i-form-item label="推荐人">
                <i-input type="text"></i-input>
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
    private job: any;
    private revenue: any;
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
    private fruit: Array < String > = [];
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
      // 设置表单数据
      this.job = {
        name: "",
        group: "",
        type: "",
        duty: "",
        rank: "",
        joinTime: "",
        address: "",
        phone: ""
      };
      this.revenue = {
        wages: "",
        day: "",
        way: "",
        year: "",
        other: "",
        otherWay: ""
      };
      this.typeList = ["机关事业", "国有企业", "社会团体", "外资", "合资", "私营有限公司", "个体户"]
    }

  }

</script>

<style lang="less" scope>


</style>
