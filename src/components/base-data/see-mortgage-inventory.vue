<!--抵押入库 查看-->
<template>
    <section class="component see-mortgage-inventory">
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
                        <i-input readonly placeholder="请填写车辆隶属"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="车辆来源" :label-width="90">
                        <i-input readonly></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="牌照号码" :label-width="90">
                        <i-input readonly placeholder="请填写牌照号码"></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="上牌日期" :label-width="90">
                        <i-date-picker readonly type="date" placeholder="请填写上牌日期"></i-date-picker>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="入库日期" :label-width="90">
                        <i-date-picker readonly type="date" placeholder="请填写入库日期"></i-date-picker>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="里程表值" :label-width="90">
                        <i-input readonly placeholder="请填写里程表"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="8">
                    <i-form-item label="车况" :label-width="90">
                        <i-select placeholder="请选择车况" disabled>
                            <!-- <i-option></i-option> -->
                        </i-select>
                    </i-form-item>
                </i-col>
                <i-col :span="8">
                    <i-form-item label="登记人" :label-width="90">
                        <i-input readonly placeholder="请选填写登记人"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="16">
                    <i-form-item label="车况说明" :label-width="90">
                        <i-input readonly class="textbox" type="textarea"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="24">
                    <i-form-item label="停放状态" :label-width="90">
                        <i-select placeholder="请选择停放状态" disabled>
                            <!-- <i-option></i-option> -->
                        </i-select>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col :span="16">
                    <i-form-item label="情况描述" :label-width="90">
                        <i-input readonly class="textbox" type="textarea"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
             <!-- 文件数量-->
            <i-row class="data-form">
                <i-col>
                    <div class="data-form-item"></div>
                    <a class="information">文件数量</a>
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
import { AssessMentPlacingService } from '~/services/manage-service/assess-ment-placing.service'
@Component({
  components: {
       UploadVoucher
  }
})
export default class addPeople extends Vue {
 @Dependencies(AssessMentPlacingService)
  private assessMentPlacingService: AssessMentPlacingService
      /**
   * 获取入库信息
   */
  acquireInventoryData(row) {
    this.assessMentPlacingService
      .findWarehousingInfoByWarehousingId({ warehousingId: row.warehousingId })
      .subscribe(
        data => {
        
            console.log(data)
            console.log('入库信息')
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
}
</script>



<style lang="less" scoped>
.component.see-mortgage-inventory {
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
}
</style>
<style lang="less">
  .textbox.ivu-input-wrapper.ivu-input-type{
      width: 480px;
  }
</style>