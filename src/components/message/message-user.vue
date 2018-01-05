<template>
  <section class="component message-user">
<data-box :data="inpullCarDataSet" @onPageChange="refreshData" :page="pageService">
      <template slot="columns">
        <el-table-column prop="contractNumber" label="合同编号" min-width="125">
        </el-table-column>
        <el-table-column prop="vehicleColor" label="车辆颜色" min-width="80">
        </el-table-column>
        <el-table-column prop="businessDepartment" label="所属营业部" min-width="80">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">和他聊天</el-button>
          </template>
        </el-table-column>
      </template>
    </data-box>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation,namespace } from "vuex-class";
import DataBox from "~/components/common/data-box.vue";
import { operatorService } from "~/services/operator.service";
import {  Dependencies } from "~/core/decorator";
@Component({
  components: {
    DataBox
  }
})
export default class MessageUser extends Vue {
    @Dependencies(operatorService) private operatorService: operatorService;

    public getUserList(){

    }
}
</script>

<style lang="less" scoped>
  .message-user.component{
  }
</style>
