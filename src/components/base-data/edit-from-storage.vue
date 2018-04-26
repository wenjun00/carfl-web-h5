<!--抵押出库 出库-->
<template>
    <section class="component edit-from-storage">
        <i-form>
            <!-- 车辆信息 -->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">车辆基本信息</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="所选车辆" :label-width="90">
                        <i-input readonly></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="车身颜色" :label-width="90">
                        <i-input readonly></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="上牌城市" :label-width="90">
                        <i-input readonly></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="车牌号码" :label-width="90">
                        <i-input readonly></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="车架号" :label-width="90">
                        <i-input readonly></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="发动机号" :label-width="90">
                        <i-input readonly></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <!-- 库房信息 -->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">库房信息</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="车辆隶属" :label-width="90">
                        <i-input placeholder="请填写车辆隶属"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="停放库位" :label-width="90">
                        <i-input readonly></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="牌照号码" :label-width="90">
                        <i-input placeholder="请填写牌照号码"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="上牌日期" :label-width="90">
                        <i-date-picker type="date" placeholder="请填写上牌日期"></i-date-picker>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="里程表值" :label-width="90">
                        <i-input placeholder="请填写里程表"></i-input>
                    </i-form-item>
                </i-col>
                 <i-col :span="8">
                    <i-form-item label="出库日期" :label-width="90">
                        <i-date-picker type="date" placeholder="请填写出库日期"></i-date-picker>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                     <i-form-item label="出库类型" :label-width="90">
                        <i-date-picker type="date" placeholder="请填写出库类型"></i-date-picker>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="GPS状态" :label-width="90">
                         <i-select placeholder="请选择状态">
                            <i-option></i-option>
                        </i-select>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="16">
                    <i-form-item label="车况" :label-width="90">
                        <i-input style="width:100%" type="textarea"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="24">
                    <i-form-item label="经办人" :label-width="90">
                        <i-input placeholder="请填写经办人"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="16">
                    <i-form-item label="车况说明" :label-width="90">
                        <i-input style="width:100%" type="textarea"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="16">
                    <i-form-item label="情况描述" :label-width="90">
                        <i-input style="width:100%" type="textarea"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
             <!-- 车辆照片-->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">车辆照片</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="24">
                    <upload-voucher  ref="upload-voucher" ></upload-voucher>
                </i-col>
            </i-row>
              <!-- 合格证-->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">合格证</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="24">
                    <upload-voucher  ref="upload-voucher" ></upload-voucher>
                </i-col>
            </i-row>
              <!-- 保险单-->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">保险单</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="24">
                    <upload-voucher  ref="upload-voucher" ></upload-voucher>
                </i-col>
            </i-row>
              <!-- 交车单-->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <span class="redColor">*</span>
                    <a class="information">交车单</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="24">
                    <upload-voucher  ref="upload-voucher" ></upload-voucher>
                </i-col>
            </i-row>
              <!-- 交车照-->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <span class="redColor">*</span>
                    <a class="information">交车照</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="24">
                    <upload-voucher  ref="upload-voucher" ></upload-voucher>
                </i-col>
            </i-row>
              <!-- 出库单据-->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <span class="redColor">*</span>
                    <a class="information">出库单据</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="24">
                    <upload-voucher  ref="upload-voucher" ></upload-voucher>
                </i-col>
            </i-row>
              <!-- 行驶证-->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <span class="redColor">*</span>
                    <a class="information">行驶证</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="24">
                    <upload-voucher  ref="upload-voucher" ></upload-voucher>
                </i-col>
            </i-row>
              <!-- 里程数-->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <span class="redColor">*</span>
                    <a class="information">里程数</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="24">
                    <upload-voucher  ref="upload-voucher" ></upload-voucher>
                </i-col>
            </i-row>
              <!-- 其他附件-->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <span>*</span>
                    <a class="information">其他附件</a>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="24">
                    <upload-voucher  ref="upload-voucher" ></upload-voucher>
                </i-col>
            </i-row>

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
import UploadVoucher from "~/components/common/upload-voucher.vue"
@Component({
  components: {
       UploadVoucher
  }
})
export default class addPeople extends Vue {}
</script>



<style lang="less" scoped>
.component.edit-from-storage {
  .data-form {
    margin-top: 5px;
    .data-form-item {
      width: 7px;
      height: 25px;
      background: #8c9d69;
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
  .redColor{
      color: red;
      font-size: 24px;
      position: relative;
      top: 8px;
  }
}
</style>
