<template>
  <i-select style="margin-left:10px;width:10%;" placeholder="全部"  clearable >
    <i-option label="退回" :value="374" :key="374"></i-option>
    <i-option label="拒绝" :value="375" :key="375"></i-option>
  </i-select>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  @Component({
    components: {}
  })
  export default class EnterApprovalReason extends Vue {

    private appReasonModel:any = {

    }

  }
</script>

<style scoped>

</style>
