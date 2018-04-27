<!--客户职业-->
<template>
  <section class="component customer-job-message">

    <i-card title="职业信息">
      <i-form>
        <i-form-item>
          <i-radio-group v-model="jobType" @on-change="jobchange">
            <i-radio :label="37" :value="37">工薪者</i-radio>
            <i-radio :label="38" :value="38">企业经营者</i-radio>
          </i-radio-group>
        </i-form-item>
      </i-form>
    </i-card>

    <i-card title="单位信息" v-show="jobType === 37">
      <i-form ref="job-form" :model="jobModel" :rules="jobRules" :label-width="110" label-position="left">
        <i-row>
          <i-col :span="12">
            <i-form-item label="单位名称" prop="companyName">
              <i-input type="text" v-model="jobModel.companyName" placeholder="请输入单位名称">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="部门" prop="department">
              <i-input type="text" v-model="jobModel.department" placeholder="请输入部门">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="单位性质" prop="companyNature">
              <i-select v-model="jobModel.companyNature">
                <i-option label="机关事业" :value="39"></i-option>
                <i-option label="国有企业" :value="40"></i-option>
                <i-option label="社会团体" :value="41"></i-option>
                <i-option label="外资" :value="42"></i-option>
                <i-option label="合资" :value="43"></i-option>
                <i-option label="私营有限公司" :value="44"></i-option>
                <i-option label="个体户" :value="45"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="职务" prop="duty">
              <i-input type="text" v-model="jobModel.duty" placeholder="请输入职务">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="职级" prop="rank">
              <i-select v-model="jobModel.rank">
                <i-option label="负责人" :value="46"></i-option>
                <i-option label="高级管理人员" :value="47"></i-option>
                <i-option label="中级管理人员" :value="48"></i-option>
                <i-option label="一般管理人员" :value="49"></i-option>
                <i-option label="一般正式员工" :value="50"></i-option>
                <i-option label="劳务派遣员工" :value="51"></i-option>
                <i-option label="非正式员工" :value="52"></i-option>
                <i-option label="退休人员" :value="53"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="何时进入公司" prop="accessCompanyTime">
              <i-date-picker type="month" placeholder="选择月" v-model="jobModel.accessCompanyTime"></i-date-picker>
            </i-form-item>
          </i-col>
          <i-col :span="24">
            <i-form-item label="单位地址" prop="companyAddress">
              <i-row type="flex" :gutter="16">
                <i-col>
                  <i-select class="city-select" placeholder="省" v-model="jobModel.province">
                    <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-select class="city-select" placeholder="市" v-model="jobModel.city">
                    <i-option v-for="{value,label} in this.jobModel.province ? this.$city.getCityData({ level: 1, id: this.jobModel.province }) : []" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-select class="city-select" placeholder="区" v-model="jobModel.companyAddress">
                    <i-option v-for="{value,label} in this.jobModel.city ? this.$city.getCityData({ level: 1, id: this.jobModel.city }) : []" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col>
                  <i-input type="text" placeholder="请具体到门牌号" v-model="jobModel.companyAddressDetail">
                  </i-input>
                </i-col>
              </i-row>
            </i-form-item>
          </i-col>
          <i-col :span="12">
            <i-form-item label="单位固定电话" prop="companyPhone">
              <i-input type="text" v-model="jobModel.companyPhone" placeholder="请输入单位固定电话">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </i-card>

    <i-card title="企业信息" v-show="jobType === 38">
      <i-form ref="company-form" :model="jobModel" :rules="companyRules" :label-width="110" label-position="left">
        <i-row>
          <i-col span="12">
            <i-form-item label="身份" prop="identity">
              <i-row>
                <i-radio-group v-model="jobModel.identity">
                  <i-radio :label="54" :value="54">法人代表</i-radio>
                  <i-radio :label="55" :value="55">股东</i-radio>
                </i-radio-group>
                <input-number class="ratio-holding" placeholder="股份占比%" :max="100" :min="0" v-model="jobModel.stockScale" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"></input-number>
              </i-row>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="企业经营年限" prop="enterpriseManageYears">
              <i-input-number :min="0" :max="100" v-model="jobModel.enterpriseManageYears" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser" placeholder="请输入企业经营年限">
              </i-input-number>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="经营地归属" prop="enterpriseManageBelong">
              <i-input type="text" v-model="jobModel.enterpriseManageBelong" placeholder="请输入经营地归属">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="员工人数" prop="employeesNumber">
              <i-input-number placeholder="请输入员工人数" :min="0" :max="100000" v-model="jobModel.employeesNumber" :formatter="$filter.moneyFormatter" :parser="$filter.moneyParser">
              </i-input-number>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="注册资本(万元)" prop="registeredCapital">
              <i-input-number v-model="jobModel.registeredCapital" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="所属行业" prop="industry">
              <i-input type="text" v-model="jobModel.industry" placeholder="请输入所属行业">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="过去一年营业收入(万元)" prop="pastyearIncome">
              <i-input-number v-model="jobModel.pastyearIncome" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="过去一年利润" prop="pastyearProfit">
              <i-input-number v-model="jobModel.pastyearProfit" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </i-card>

    <i-card title="收入信息" v-show="jobType === 37">
      <i-form ref="income-form" :rules="incomeRules" :model="jobModel" :label-width="110" label-position="left">
        <i-row>
          <i-col span="12">
            <i-form-item label="基本月薪(元)" prop="basicSalary">
              <i-input-number v-model="jobModel.basicSalary" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="每月发薪日" prop="payDay">
              <i-select v-model="jobModel.payDay" placeholder="请选择每月发薪日" clearable>
                <i-option :label="item.day" :key="item.key" :value="item.value" v-for="item in monthDay"></i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="发薪方式" prop="payWay">
              <i-input type="text" v-model="jobModel.payWay" placeholder="请输入发薪方式">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="年收入(万元)" prop="yearlySalaries">
              <i-input-number v-model="jobModel.yearlySalaries" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="每月其他收入(元)" prop="monthOtherIncome">
              <i-input-number v-model="jobModel.monthOtherIncome" :formatter="$filter.moneyFormat" :parser="$filter.moneyParse"> </i-input-number>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="其他收入来源" prop="otherIncomeSource">
              <i-input v-model="jobModel.otherIncomeSource"> </i-input>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </i-card>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { CityService } from "~/utils/city.service";
import { FilterService } from "~/utils/filter.service";
import { Form } from "iview";

@Component({})
export default class CustomerJob extends Vue {
  public jobModel: any = {
    companyName: "", // 单位名称
    department: "", // 部门
    companyNature: "", // 单位性质
    duty: "", // 职务
    rank: "", // 职级
    accessCompanyTime: "", // 何时进入公司
    companyAddress: "", // 单位地址
    companyAddressDetail: "", // 单位详细地址
    companyPhone: "", // 单位固定电话
    basicSalary: null, // 基本月薪
    payDay: "", // 每月发薪日
    payWay: "", // 发薪方式
    yearlySalaries: null, // 年收入
    monthOtherIncome: null, // 每月其他收入
    otherIncomeSource: "", // 其他收入来源
    identity: "", // 身份
    enterpriseManageYears: 1, // 企业经营年限
    enterpriseManageBelong: "", // 经营地归属
    employeesNumber: null, // 员工人数
    registeredCapital: null, // 注册资本
    industry: "", // 所属行业
    pastyearIncome: null, // 过去一年营业收入
    pastyearProfit: null, // 过去一年利润
    stockScale: null
  };

  private monthDay: any = null;
  private jobType: any = 37;
  private typeList: Array<String>;

  private jobRules = {};

  private companyRules = {};

  private incomeRules: any = {
    basicSalary: [
      {
        pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
        message: "请输入1~9位数字",
        trigger: "blur"
      }
    ],
    yearlySalaries: [
      {
        pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
        message: "请输入1~9位数字",
        trigger: "blur"
      }
    ],
    payDay: [
      {
        pattern: /^[0-9]{1,9}$/g,
        message: "请输入1~9位数字",
        trigger: "blur"
      }
    ],
    monthOtherIncome: [
      {
        pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
        message: "请输入1~9位数字",
        trigger: "blur"
      }
    ],
    companyPhone: [
      {
        pattern: /^((\d{3,4}-)|\d{3.4}-)?\d{7,8}$/,
        message: "请输入正确的固定电话",
        trigger: "blur"
      }
    ]
  };

  /**
   * 重置数据
   */
  reset() {
    this.jobType = 38;
    let jobForm = this.$refs["job-form"] as Form;
    jobForm.resetFields();
  }

  /**
   * 重置数据
   */
  revert(data) {
    let personalJob = data.personal.personalJob

    if (personalJob.identity) {
      this.jobType = 38;
    } else {
      this.jobType = 37;
    }

    this.$common.revert(
      this.jobModel,
      Object.assign(personalJob, {
        accessCompanyTime: FilterService.dateFormat(
          personalJob.accessCompanyTime,
          "yyyy-MM-dd"
        ),
        companyAddress:personalJob.companyAddress?Number(personalJob.companyAddress):null,
        city:personalJob.city?Number(personalJob.city):null,
        province:personalJob.province?Number(personalJob.province):null
      })
    );
  }

  Reverse(data) {
    if (data.personal.personalJob) {
      if (data.personal.personalJob.identity) {
        this.jobType = 38;
      } else {
        this.jobType = 37;
      }
      data.personal.personalJob.accessCompanyTime = FilterService.dateFormat(
        data.personal.personalJob.accessCompanyTime,
        "yyyy-MM-dd"
      );
      data.personal.personalJob.companyAddress = Number(
        data.personal.personalJob.companyAddress
      );
      data.personal.personalJob.city = CityService.getCityParent(
        Number(data.personal.personalJob.companyAddress)
      )[1];
      data.personal.personalJob.province = CityService.getCityParent(
        Number(data.personal.personalJob.companyAddress)
      )[0];
      this.jobModel = data.personal.personalJob;
    }
  }
  jobchange() {
    this.jobModel = {};
  }

  /**
   * 获取月份天数
   */
  monthDayFun() {
    let arr: any = 31;
    for (let i = 1; i <= arr; i++) {
      this.monthDay.push({
        day: i + "日",
        key: i + "日",
        value: i
      });
    }
  }

  /**
   * 验证数据
   */
  async validate() {
    let jobForm = this.$refs["job-form"] as Form;
    let companyForm = this.$refs["company-form"] as Form;
    let imncomeForm = this.$refs["income-form"] as Form;

    let result = await Promise.all(
      [this.jobType === 37 ? jobForm : companyForm, imncomeForm].map(x =>
        x.validate()
      )
    ).then(result => {
      return result.every(x => x);
    });

    return result;
  }

  mounted() {
    this.monthDay = [];
    this.monthDayFun();
    this.typeList = [
      "机关事业",
      "国有企业",
      "社会团体",
      "外资",
      "合资",
      "私营有限公司",
      "个体户"
    ];
  }
}
</script>

<style lang="less">
.component.customer-job-message {
  .ivu-select {
    .ivu-select-selection {
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }

    &.city-select {
      width: 100px !important;
      .ivu-select-selection {
        width: 100px !important;
      }
    }
  }
}
</style>
