<template>
  <i-row >
    <i-select style="margin-left:5px;width:20%;" placeholder="导入类型" clearable v-model="enterReasonModel.type" @on-change="enterChange">
      <i-option label="退回" :value="374" :key="374"></i-option>
      <i-option label="拒绝" :value="375" :key="375"></i-option>
    </i-select>
    <i-input style="width:55%;margin-left:10px" clearable></i-input>
    <i-button class="blueButton" style="margin-left:10px;" :disabled="disabledOne" >文件选择</i-button>
    <span style="display: block;text-align: center;color: gray;margin-top: 20px;" v-if="this.enterReasonModel.type ===''">请选择导入类型并指定模板文件</span>
  </i-row>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({
    components: {}
  })
  export default class EnterApprovalReason extends Vue {
    private enterReasonModel:any = {
      type:''
    }
    private disabledOne: Boolean = true;
    created(){

    }
    enterChange(){
      if(this.enterReasonModel.type !== ''){
        this.disabledOne = false
      }else{
        this.disabledOne = true
      }
    }

  }
</script>

<style scoped>

</style>
