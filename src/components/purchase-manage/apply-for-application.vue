<!--查看申请--> 
<template>
  <section class="component for-application">
      <i-form :model="detailsForm">
            <i-row>
                <i-col :span="24">
                    <i-form-item label="所选车辆" prop="">
                        <i-input ></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
           <i-row>
                <i-col :span="12">
                    <i-form-item label="上牌城市" prop="">
                        <i-input ></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="12" :push="1">
                    <i-form-item label="车身颜色" prop="">
                         <i-input ></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
             <i-row>
                <i-col :span="12">
                    <i-form-item label="发动机号" prop="">
                        <i-input ></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="12" :push="1">
                    <i-form-item label="车牌号码" prop="">
                         <i-input ></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
             <i-row>
                <i-col :span="12">
                    <i-form-item label="车架号码" prop="">
                        <i-input ></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="12" :push="1">
                    <i-form-item label="客户姓名" prop="">
                         <i-input ></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
             <i-row>
                <i-col :span="12">
                    <i-form-item label="证件号码" prop="">
                        <i-input ></i-input>
                    </i-form-item>
                </i-col>
                <i-col :span="12" :push="1">
                    <i-form-item label="手机号码" prop="">
                         <i-input ></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
          
          

        </i-form>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { FormatInputPathObject } from "path";
import { Form } from "iview";
@Component({
  components: {}
})
export default class addPeople extends Vue {

 private detailsForm = {
    
  }

  /**
   * 获取评估申请查看详情
   */
  getData(row) {
      
    // this.assessMentApplyService.findOrderInfoByOrderNumber()
    // .subscribe(
    //     data => {
    //       this.dataSet = data
    //     },
    //     ({ msg }) => {
    //       this.$Message.error(msg)
    //     }
    //   )
  }    

}
</script>
