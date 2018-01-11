<!--客户资料-->
<template>
  <section class="component customer-materials">
    <i-col span="24" style="line-height:30px" class="form-title">个人信息</i-col>
    <i-form ref="job-form" :label-width="110" label-position="left" style="position:relative;left:16px;margin-top:10px;">
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span style="font-size:16px;">基础信息</span>
      </div>
      <i-row>
        <i-col span="12">
          <i-form-item label="姓名" prop="name">
            <i-input type="text" placeholder="请输入姓名">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="性别" prop="group">
            <i-input type="text" placeholder="请输入性别">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="出生日期" prop="name">
            <i-input type="text" placeholder="请输入出生日期">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="微信号码" prop="group">
            <i-input type="text" placeholder="请输入微信号码">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="手机号码（主）" prop="name">
            <i-input type="text" placeholder="请输入手机号码（主）">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="手机号码（主）" prop="group">
            <i-input type="text" placeholder="请输入手机号码（次）">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="教育程度" prop="name">
            <i-select>
              <i-option label="硕士及以上" value="硕士及以上" key="硕士及以上"></i-option>
              <i-option label="本科" value="本科" key="本科"></i-option>
              <i-option label="专科" value="专科" key="专科"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="3">
          <i-form-item label="毕业院校" prop="group">
            <i-input type="text" placeholder="请输入毕业院校">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="婚姻状况" prop="name">
            <i-checkbox-group>
              <i-checkbox label="已婚"></i-checkbox>
              <i-checkbox label="未婚"></i-checkbox>
              <i-checkbox label="离婚"></i-checkbox>
              <i-checkbox label="丧偶"></i-checkbox>
            </i-checkbox-group>
          </i-form-item>
        </i-col>
      </i-row>
      <!--</i-form>-->

      <!--单位信息 End-->
      <!--收入信息 Start-->

      <!--<i-col span="24" style="line-height:30px;background:#ddd">身份证信息</i-col>-->
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span style="font-size:16px;">身份证信息</span>
      </div>
      <!--<i-form :label-width="110">-->
      <i-row>
        <i-col span="12">
          <i-form-item label="身份证号码">
            <i-input type="text" placeholder="请输入身份证号码">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="4">
          <i-form-item label="发证机关">
            <i-input type="text" placeholder="请输入发证机关">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="身份证地址">
            <i-input type="text" placeholder="请输入身份证地址">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="4">
          <i-form-item label="身份证有效期">
            <i-input type="text" placeholder="请输入身份证有效期">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <!--</i-form>-->

      <!--<i-col span="24" style="line-height:30px;background:#ddd">居住信息</i-col>-->
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span style="font-size:16px;">居住信息</span>
      </div>
      <!--<i-form :label-width="110">-->
      <i-row>
        <i-col span="12">
          <i-form-item label="现居住地址">
            <i-input type="text" placeholder="请输入现居住地址">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="4">
          <i-form-item label="居住地址家庭座机">
            <i-input type="text" placeholder="请输入居住地址家庭座机">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="本市生活时长">
            <i-input type="text" placeholder="请输入本市生活时长">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="12" pull="4">
          <i-form-item label="现居住地生活时长">
            <i-input type="text" placeholder="请输入现居住地生活时长">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <div>
        <div style="width:7px;height:20px;background:#265EA2;display:inline-block;margin-right:6px;position:relative;top:4px;"></div><span style="font-size:16px;">勘察请求</span>
      </div>
      <span>是否接受现场勘察</span>
      <i-radio-group v-model="checkRadio">
        <i-radio label="是"></i-radio>
        <i-radio label="否"></i-radio>
      </i-radio-group>
    </i-form>

    <!--<i-col span="24" style="line-height:30px;background:#ddd">勘察请求</i-col>-->
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  export default class CustomerMaterials extends Vue {
    private checkRadio: String = "是";
    checkRadioChange(val) {}
  }

</script>

<style lang="less" scope>
  .customer-materials {
    .ivu-select-selection {
      width: 240%;
      display: inline-block;
      border-style: none;
      border-bottom-style: solid;
      border-radius: 0;
    }
  }

</style>
