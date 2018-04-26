<!--客户详情-->
<template>
    <section class="component get-formal-customer">
        <i-form>
            <!-- 基本信息 -->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">基本信息</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="客户姓名" :label-width="90">
                        <i-input readonly></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="手机号码" :label-width="90">
                        <i-input readonly></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="证件类型" :label-width="90">
                        <i-select disabled placeholder="请选择停放状态">
                            <!-- <i-option></i-option> -->
                        </i-select>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="证件号码" :label-width="90">
                        <i-input readonly></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="居住地址" :label-width="90">
                        <i-input readonly></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <!-- 意向级别 -->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">意向级别</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="24">
                    <i-form-item label="意向级别" :label-width="90">
                        <i-rate></i-rate>
                    </i-form-item>
                </i-col>
            </i-row>
            <!-- 收起 展开 -->
            <i-row class="data-form">
                <i-col>
                    <div @click="fold" v-if="!WhetherNotShown" class="putAway"> +展开更多 </div>
                    <div @click="fold" v-else="WhetherNotShown" class="putAway"> -收起 </div>
                </i-col>
            </i-row>
            <div v-show="WhetherNotShown">
                <!-- 隐藏内容 -->
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="性别" :label-width="90">
                            <i-input readonly></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="出生日期" :label-width="90">
                            <i-date-picker disabled type="date"></i-date-picker>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="民族" :label-width="90">
                            <i-input readonly></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="健康状况" :label-width="90">
                            <i-select disabled>
                                <!-- <i-option></i-option> -->
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="居住状况" :label-width="90">
                            <i-select disabled>
                                <!-- <i-option></i-option> -->
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="婚姻状况" :label-width="90">
                            <i-select disabled>
                                <!-- <i-option></i-option> -->
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="通讯地址" :label-width="90">
                            <i-input class="mailingAddress" readonly></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row class="data-form">
                    <!-- 押品登记 -->
                    <i-col>
                        <div class="data-form-item"></div>
                        <a class="information">押品登记</a>
                    </i-col>
                    <i-row type="flex" :gutter="110">
                        <i-col :span="24">
                            <i-form-item label="车辆型号" :label-width="90">
                                <span class="selectModels">选择车型</span>
                            </i-form-item>
                        </i-col>
                    </i-row>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="车牌号" :label-width="90">
                            <i-input readonly></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="车架号" :label-width="90">
                            <i-input readonly></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="上牌时间" :label-width="90">
                            <i-input readonly></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="上牌地址" :label-width="90">
                            <i-input readonly></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-col>
                    <span class="addingBet">+添加押品</span>
                </i-col>
                <!-- 相关联系人 -->
                <i-row class="data-form">
                    <i-col>
                        <div class="data-form-item"></div>
                        <a class="information">相关联系人</a>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="24" class="contacts">
                        <i-form-item label="第一联系人" :label-width="90">
                            <i-input readonly></i-input>
                            <i-select disabled>
                                <!-- <i-option></i-option> -->
                            </i-select>
                            <i-input readonly></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="24" class="contacts">
                        <i-form-item label="第二联系人" :label-width="90">
                            <i-input readonly></i-input>
                            <i-select disabled>
                                <!-- <i-option></i-option> -->
                            </i-select>
                            <i-input readonly></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-col>
                    <span class="addingBet">+添加联系人</span>
                </i-col>
                <!-- 职业信息 -->
                <i-row class="data-form">
                    <i-col>
                        <div class="data-form-item"></div>
                        <a class="information">职业信息</a>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="所在单位" :label-width="90">
                            <i-input></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="单位性质" :label-width="90">
                            <i-select>
                                <!-- <i-option>11</i-option> -->
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="单位地址" :label-width="90">
                            <i-input class="mailingAddress"></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="职业" :label-width="90">
                            <i-select>
                                <!-- <i-option></i-option> -->
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="职务" :label-width="90">
                            <i-select>
                                <!-- <i-option></i-option> -->
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <!-- 收入请款 -->
                <i-row class="data-form">
                    <i-col>
                        <div class="data-form-item"></div>
                        <a class="information">收入情况</a>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="10">
                        <i-form-item label="个人月收入" :label-width="90">
                            <i-input readonly></i-input>
                            <span>元</span>
                        </i-form-item>
                    </i-col>

                    <i-col :span="10" class="familySize ">
                        <i-form-item label="家庭人数" :label-width="65">
                            <i-input readonly></i-input>
                            <span>人</span>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row class="data-form">
                    <i-col>
                        <div class="data-form-item"></div>
                        <a class="information">经营信息</a>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="16">
                        <i-form-item label="经营单位" :label-width="90">
                            <i-input class="mailingAddress" readonly></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="10">
                        <i-form-item label="经营规模" :label-width="90">
                            <i-input readonly></i-input>
                            <span>人</span>
                        </i-form-item>
                    </i-col>
                    <i-col :span="10" class="familySize ">
                        <i-form-item label="所属行业" :label-width="65">
                            <i-select disabled>
                                <!-- <i-option></i-option> -->
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="16">
                        <i-form-item label="统一社会信用代码" :label-width="120">
                            <i-input class="socialCredit" readonly></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="基本户" :label-width="90">
                            <i-input readonly></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="开户银行" :label-width="90">
                            <i-select disabled>
                                <!-- <i-option></i-option> -->
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="注册时间" :label-width="90">
                            <i-input readonly></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="最新年检" :label-width="90">
                            <i-select disabled>
                                <i-input readonly></i-input>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="24">
                        <i-form-item label="注册资金" :label-width="90">
                            <i-input readonly></i-input>
                            <span>万元</span>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="16">
                        <i-form-item label="单位地址" :label-width="90">
                            <i-input class="mailingAddress" readonly></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <!-- 银行账户 -->
                <i-row class="data-form">
                    <i-col>
                        <div class="data-form-item"></div>
                        <a class="information">银行账户</a>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="银行账号" :label-width="90">
                            <i-input readonly></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="开户银行" :label-width="90">
                            <i-select disabled>
                                <i-input readonly></i-input>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex">
                    <i-col :span="16">
                        <i-form-item label="开户支行" :label-width="90">
                            <i-input class="mailingAddress" readonly></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row type="flex" :gutter="110">
                    <i-col :span="8">
                        <i-form-item label="账户类型" :label-width="90">
                            <i-select disabled>
                                <i-input readonly></i-input>
                            </i-select>
                        </i-form-item>
                    </i-col>
                    <i-col :span="8">
                        <i-form-item label="账号用途" :label-width="90">
                            <i-select disabled>
                                <i-input readonly></i-input>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
            </div>

        </i-form>
    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Dependencies } from '~/core/decorator'
import { FormatInputPathObject } from 'path'
import { FilterService } from '~/utils/filter.service'
import { CityService } from '~/utils/city.service'
import { Form } from 'iview'
import UploadVoucher from '~/components/common/upload-voucher.vue'
@Component({
  components: {
    UploadVoucher
  }
})
export default class addPeople extends Vue {
  private WhetherNotShown: Boolean = false
  fold() {
    this.WhetherNotShown = !this.WhetherNotShown
  }
}
</script>



<style lang="less" scoped>
.component.get-formal-customer {
  .data-form {
    margin-top: 5px;
    .data-form-item {
      width: 7px;
      height: 25px;
      background: #1d4f88;
      display: inline-block;
      margin-right: 6px;
      position: relative;
      top: 4px;
    }
    .information {
      font-size: 16px;
      color: black;
    }
  }
  .putAway {
    margin-left: 30px;
    font-size: 16px;
    color: #1d4f88;
    cursor: pointer;
  }
  .selectModels {
    cursor: pointer;
    color: #1d4f88;
  }
  .addingBet {
    margin-left: 28px;
    cursor: pointer;
    color: #1d4f88;
  }
}
</style>
<style lang="less">
.component.get-formal-customer {
  .mailingAddress.ivu-input-wrapper.ivu-input-type {
    width: 485px !important;
  }
  .socialCredit.ivu-input-wrapper.ivu-input-type {
    width: 91%;
  }
  .contacts {
    .ivu-select,
    .ivu-select-disabled,
    .ivu-select-single,
    .ivu-select-selection,
    .ivu-input-type,
    .ivu-input-wrapper {
      width: 160px !important;
    }
  }
  .ivu-form-item-content {
    width: 100% !important;
  }
}
</style>
