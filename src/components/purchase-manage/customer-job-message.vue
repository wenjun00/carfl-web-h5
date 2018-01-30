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
      <i-col span="24" style="line-height:30px;background:#ddd"></i-col>
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span style="font-size:16px;">单位信息</span>
      </div>
      <i-form ref="job-form" :model="job" :label-width="110" label-position="left" style="position:relative;left:16px;">
        <i-row>

          <i-col :span="12">
            <i-form-item label="单位名称" prop="companyName">
              <i-input type="text" v-model="job.companyName" placeholder="请输入单位名称">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12" :pull="3">
            <i-form-item label="部门" prop="department">
              <i-input type="text" v-model="job.department" placeholder="请输入部门">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>

        <i-row>
          <i-col :span="12">
            <i-form-item label="单位性质" prop="companyNature">
              <i-select v-model="job.companyNature">
                <i-option v-for="item in typeList" :value="item" :key="item">{{ item }}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12" :pull="3">
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
          <i-col :span="12" :pull="3">
            <i-form-item label="何时进入公司" prop="accessCompanyTime">
              <!--<i-date-picker type="date" placeholder="i-select date" v-model="job.joinTime"></i-date-picker>-->
              <i-input type="text" v-model="job.accessCompanyTime" placeholder="请输入何时进入公司">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col :span="12">
            <i-form-item label="单位地址" prop="companyAddress">
              <i-input type="text" v-model="job.companyAddress" placeholder="请输入单位地址">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12" :pull="3">
            <i-form-item label="单位固定电话" prop="companyPhone">
              <i-input type="text" v-model="job.companyPhone" placeholder="请输入单位固定电话">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>

      <!--单位信息 End-->
      <!--收入信息 Start-->

      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span style="font-size:16px;">收入信息</span>
      </div>
      <i-form ref="revenue-form" :model="revenue" :label-width="110" label-position="left">
        <i-col span="12">
          <i-form-item label="基本月薪(元)" prop="basicSalary">
            <i-input type="text" v-model="revenue.basicSalary" placeholder="请输入基本月薪">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="每月发薪日" prop="payDay">
            <i-input type="text" v-model="revenue.payDay" placeholder="请输入每月发薪日">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="发薪方式" prop="payWay">
            <i-input type="text" v-model="revenue.payWay" placeholder="请输入发薪方式">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="年收入(万元)" prop="yearlySalaries">
            <i-input type="text" v-model="revenue.yearlySalaries" placeholder="请输入年收入">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="每月其他收入(元)" prop="monthOtherIncome">
            <i-input type="text" v-model="revenue.monthOtherIncome" placeholder="请输入每月其他收入">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="其他收入来源" prop="otherIncomeSource">
            <i-input type="text" v-model="revenue.otherIncomeSource" placeholder="请输入其他收入来源">
            </i-input>
          </i-form-item>
        </i-col>
      </i-form>

      <!--收入信息 End-->
    </div>

    <!--企业经营者-->
    <div v-if="jobType === '企业经营者'">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span style="font-size:16px;">公司信息</span>
      </div>
      <i-form ref="company-form" :model="company" :label-width="110" label-position="left" style="position:relative;left:16px;">
        <i-row>

          <i-col span="12">
            <i-form-item label="身份" prop="identity">
              <i-row>
                <i-radio-group v-model="company.identity">
                  <i-radio label="法人代表"></i-radio>
                  <i-radio label="股东"></i-radio>
                </i-radio-group>
                <i-input style="width:185px;" placeholder="股份占比%"></i-input>
              </i-row>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="企业经营年限" prop="enterpriseManageYears">
              <i-input type="text" v-model="company.enterpriseManageYears" placeholder="请输入企业经营年限">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>

        <i-row>
          <i-col span="12">
            <i-form-item label="经营地归属" prop="enterpriseManageBelong">
              <i-input type="text" v-model="company.enterpriseManageBelong" placeholder="请输入经营地归属">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="员工人数" prop="employeesNumber">
              <i-input type="text" v-model="company.employeesNumber" placeholder="请输入员工人数">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-col span="12">
          <i-form-item label="注册资本(万元)" prop="registeredCapital">
            <i-input type="text" v-model="company.registeredCapital" placeholder="请输入注册资本">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="所属行业" prop="industry">
            <i-input type="text" v-model="company.industry" placeholder="请输入所属行业">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="过去一年营业收入(万元)" prop="pastyearIncome">
            <i-input type="text" v-model="company.pastyearIncome" placeholder="请输入过去一年营业收入">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="过去一年利润" prop="pastyearProfit">
            <i-input type="text" v-model="company.pastyearProfit" placeholder="请输入过去一年利润">
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
    private job: any = {
      companyName: '', // 单位名称
      department: '', // 部门
      companyNature: '', // 单位性质
      duty: '', // 职务
      rank: '', // 职级
      accessCompanyTime: '', // 何时进入公司
      companyAddress: '', // 单位地址
      companyPhone: '', // 单位固定电话
    };
    private revenue: any = {
      basicSalary: '', // 基本月薪
      payDay: '', // 每月发薪日
      payWay: '', // 发薪方式
      yearlySalaries: '', // 年收入
      monthOtherIncome: '', // 每月其他收入
      otherIncomeSource: '', // 其他收入来源
    };
    private company: any = {
      identity: "", // 身份
      enterpriseManageYears: '', // 企业经营年限
      enterpriseManageBelong: '', // 经营地归属
      employeesNumber: '', // 员工人数
      registeredCapital: '', // 注册资本
      industry: '', // 所属行业
      pastyearIncome: '', // 过去一年营业收入
      pastyearProfit: '', // 过去一年利润
    };
    private jobType: String = "工薪者";
    private typeList: Array < String > ;

    created() {
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
