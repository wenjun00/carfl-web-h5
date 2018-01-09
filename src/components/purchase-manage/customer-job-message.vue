<!--客户职业-->
<template>
  <section class="component customer-job-message">
    <i-col span="24" style="line-height:30px" class="form-title">职业信息</i-col>
    <div span="24" style="line-height:30px">
      <i-radio-group v-model="jobType">
        <i-radio label="工薪者"></i-radio>
        <i-radio label="企业经营者"></i-radio>
      </i-radio-group>
    </div>
    <!--工薪者-->
    <div v-if="jobType === '工薪者'">
      <!--单位信息 Start-->
      <i-col span="24" style="line-height:30px;background:#ddd">单位信息</i-col>
      <i-form ref="job-form" :model="job" :label-width="110">
        <i-row>

          <i-col :span="12">
            <i-form-item label="单位名称" prop="name">
              <i-input type="text" v-model="job.name" placeholder="请输入单位名称">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12" :pull="4">
            <i-form-item label="部门" prop="group">
              <i-input type="text" v-model="job.group" placeholder="请输入部门">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>

        <i-row>
          <i-col :span="12">
            <i-form-item label="单位性质" prop="type">
              <i-select v-model="job.type">
                <i-option v-for="item in typeList" :value="item" :key="item">{{ item }}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12" :pull="4">
            <i-form-item label="职务" prop="duty">
              <i-input type="text" v-model="job.duty" placeholder="请输入职务">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col :span="12">
            <i-form-item label="职级" prop="rank">
              <i-select v-model="job.rank">
                <i-option v-for="item in typeList" :value="item" :key="item">{{ item }}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12" :pull="4">
            <i-form-item label="何时进入公司" prop="joinTime">
              <!--<i-date-picker type="date" placeholder="i-select date" v-model="job.joinTime"></i-date-picker>-->
              <i-input type="text" v-model="job.joinTime" placeholder="请输入何时进入公司">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col :span="12">
            <i-form-item label="单位地址" prop="address">
              <i-input type="text" v-model="job.address" placeholder="请输入单位地址">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12" :pull="4">
            <i-form-item label="单位固定电话" prop="phone">
              <i-input type="text" v-model="job.phone" placeholder="请输入单位固定电话">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>

      <!--单位信息 End-->
      <!--收入信息 Start-->

      <i-col span="24" style="line-height:30px;background:#ddd">收入信息</i-col>
      <i-form ref="revenue-form" :model="revenue" :label-width="110">
        <i-col span="12">
          <i-form-item label="基本月薪(元)" prop="wages">
            <i-input type="text" v-model="revenue.wages" placeholder="请输入基本月薪">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="每月发薪日" prop="day">
            <i-input type="text" v-model="revenue.day" placeholder="请输入每月发薪日">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="发薪方式" prop="way">
            <i-input type="text" v-model="revenue.way" placeholder="请输入发薪方式">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="年收入(万元)" prop="year">
            <i-input type="text" v-model="revenue.year" placeholder="请输入年收入">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="每月其他收入(元)" prop="other">
            <i-input type="text" v-model="revenue.other" placeholder="请输入每月其他收入">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="其他收入来源" prop="otherWay">
            <i-input type="text" v-model="revenue.otherWay" placeholder="请输入其他收入来源">
            </i-input>
          </i-form-item>
        </i-col>
      </i-form>

      <!--收入信息 End-->
    </div>

    <!--企业经营者-->
    <div v-if="jobType === '企业经营者'">
      <i-form ref="company-form" :model="company" :label-width="110">
        <i-col span="12" style="position:relative;right:60px;">
          <i-form-item label="身份" prop="identity">
            <i-radio-group v-model="company.identity">
              <i-radio label="法人代表"></i-radio>
              <i-radio label="股东"></i-radio>
            </i-radio-group>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="企业经营年限" prop="year">
            <i-input type="text" v-model="company.year" placeholder="请输入企业经营年限">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="经营地归属" prop="address">
            <i-input type="text" v-model="company.address" placeholder="请输入经营地归属">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="员工人数" prop="people">
            <i-input type="text" v-model="company.people" placeholder="请输入员工人数">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="注册资本(万元)" prop="capital">
            <i-input type="text" v-model="company.capital" placeholder="请输入注册资本">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="所属行业" prop="industry">
            <i-input type="text" v-model="company.industry" placeholder="请输入所属行业">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="过去一年营业收入(万元)" prop="yearRevenue">
            <i-input type="text" v-model="company.yearRevenue" placeholder="请输入过去一年营业收入">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="过去一年利润" prop="yearProfits">
            <i-input type="text" v-model="company.yearProfits" placeholder="请输入过去一年利润">
            </i-input>
          </i-form-item>
        </i-col>
        <!--<i-col span="24">
          <div style="height:60px;">
          </div>
        </i-col>-->
      </i-form>
    </div>

  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({})
  export default class CustomerJobMessage extends Vue {
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
  .customer-job-message {
    .ivu-select-selection {
      width: 240%;
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

</style>
