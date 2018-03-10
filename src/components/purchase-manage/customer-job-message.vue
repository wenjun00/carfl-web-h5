<!--客户职业-->
<template>
  <section class="component customer-job-message">
    <i-col span="24" style="line-height:30px" class="form-title">职业信息</i-col>
    <div span="24" style="line-height:30px">
      <i-radio-group v-model="jobType" @on-change="jfhdfdf">
        <i-radio :label="37" :value="37">工薪者</i-radio>
        <i-radio :label="38" :value="38">企业经营者</i-radio>
      </i-radio-group>
    </div>

    <!--工薪者-->
    <div v-if="jobType === 37">
      <!--单位信息 Start-->
      <i-col span="24" style="line-height:30px;background:#ddd"></i-col>
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span style="font-size:16px;">单位信息</span>
      </div>
      <i-form ref="form-job" :model="job" :label-width="110" label-position="left" style="position:relative;left:16px;">
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
          <i-col :span="12" :pull="3">
            <i-form-item label="何时进入公司" prop="accessCompanyTime">
              <i-date-picker type="month" placeholder="选择月" v-model="job.accessCompanyTime"></i-date-picker>
              <!--<i-input type="text" v-model="job.accessCompanyTime" placeholder="请输入何时进入公司">
              </i-input>-->
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col :span="12">
            <i-form-item label="单位地址" prop="companyAddress">
              <i-row>
                <i-col :span="3">
                  <i-select style="width: 80px;" placeholder="省" v-model="job.province">
                    <i-option v-for="{value,label} in this.$city.getCityData({ level : 1 })" :key="value" :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col :span="3">
                  <i-select style="width: 80px;" placeholder="市" v-model="job.city">
                    <i-option v-for="{value,label} in this.job.province ? this.$city.getCityData({ level: 1, id: this.job.province }) : []" :key="value"
                      :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
                <i-col :span="3">
                  <i-select style="width: 80px;" placeholder="区" v-model="job.companyAddress">
                    <i-option v-for="{value,label} in this.job.city ? this.$city.getCityData({ level: 1, id: this.job.city }) : []" :key="value"
                      :label="label" :value="value"></i-option>
                  </i-select>
                </i-col>
              </i-row>
              <i-row>
                <i-input type="text" placeholder="请具体到门牌号" v-model="job.companyAddressDetail">
                </i-input>
              </i-row>
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
      <i-form ref="revenue-form" :model="job" :label-width="110" label-position="left">
        <i-col span="12">
          <i-form-item label="基本月薪(元)" prop="basicSalary">
            <i-input type="text" v-model="job.basicSalary" placeholder="请输入基本月薪">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="每月发薪日" prop="payDay">
            <i-input type="text" v-model="job.payDay" placeholder="请输入每月发薪日">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="发薪方式" prop="payWay">
            <i-input type="text" v-model="job.payWay" placeholder="请输入发薪方式">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="年收入(万元)" prop="yearlySalaries">
            <i-input type="text" v-model="job.yearlySalaries" placeholder="请输入年收入">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="每月其他收入(元)" prop="monthOtherIncome">
            <i-input type="text" v-model="job.monthOtherIncome" placeholder="请输入每月其他收入">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="其他收入来源" prop="otherIncomeSource">
            <i-input type="text" v-model="job.otherIncomeSource" placeholder="请输入其他收入来源">
            </i-input>
          </i-form-item>
        </i-col>
      </i-form>

      <!--收入信息 End-->
    </div>

    <!--企业经营者-->
    <div v-if="jobType ===38">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span style="font-size:16px;">公司信息</span>
      </div>
      <i-form ref="company-form" :model="job" :label-width="110" label-position="left" style="position:relative;left:16px;">
        <i-row>

          <i-col span="12">
            <i-form-item label="身份" prop="identity">
              <i-row>
                <i-radio-group v-model="job.identity">
                  <i-radio label="法人代表"></i-radio>
                  <i-radio label="股东"></i-radio>
                </i-radio-group>
                <i-input style="width:185px;" placeholder="股份占比%"></i-input>
              </i-row>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="企业经营年限" prop="enterpriseManageYears">
              <i-input type="text" v-model="job.enterpriseManageYears" placeholder="请输入企业经营年限">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>

        <i-row>
          <i-col span="12">
            <i-form-item label="经营地归属" prop="enterpriseManageBelong">
              <i-input type="text" v-model="job.enterpriseManageBelong" placeholder="请输入经营地归属">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12" pull="3">
            <i-form-item label="员工人数" prop="employeesNumber">
              <i-input type="text" v-model="job.employeesNumber" placeholder="请输入员工人数">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-col span="12">
          <i-form-item label="注册资本(万元)" prop="registeredCapital">
            <i-input type="text" v-model="job.registeredCapital" placeholder="请输入注册资本">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="所属行业" prop="industry">
            <i-input type="text" v-model="job.industry" placeholder="请输入所属行业">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="过去一年营业收入(万元)" prop="pastyearIncome">
            <i-input type="text" v-model="job.pastyearIncome" placeholder="请输入过去一年营业收入">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="过去一年利润" prop="pastyearProfit">
            <i-input type="text" v-model="job.pastyearProfit" placeholder="请输入过去一年利润">
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
      companyAddressDetail: '', // 单位详细地址
      companyPhone: '', // 单位固定电话
      basicSalary: '', // 基本月薪
      payDay: '', // 每月发薪日
      payWay: '', // 发薪方式
      yearlySalaries: '', // 年收入
      monthOtherIncome: '', // 每月其他收入
      otherIncomeSource: '', // 其他收入来源
      identity: "", // 身份
      enterpriseManageYears: '', // 企业经营年限
      enterpriseManageBelong: '', // 经营地归属
      employeesNumber: '', // 员工人数
      registeredCapital: '', // 注册资本
      industry: '', // 所属行业
      pastyearIncome: '', // 过去一年营业收入
      pastyearProfit: '', // 过去一年利润
    };
    private jobType: any = 37;
    private typeList: Array < String > ;
    Reverse(data) {
      if (data.personal.personalJob) {
        this.job = data.personal.personalJob
      }
    }
    jfhdfdf() {
      console.log(this.jobType)
    }

    created() {
      this.typeList = ["机关事业", "国有企业", "社会团体", "外资", "合资", "私营有限公司", "个体户"]
    }

  }

</script>

<style lang="less" scope>
  .customer-job-message {
    .ivu-select-selection {
      width: 100%!important;
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

</style>
