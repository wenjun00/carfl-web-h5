 <!--新增管理--> 
<template>
  <section class="component add-management-list">
    <i-form ref="form-item" :label-width="90" :model="manageModel">
      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="任务名称" prop="job_name">
            <i-input v-model="manageModel.job_name" placeholder="请输入任务名"></i-input>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="任务所在组" prop="job_group">
            <i-input v-model="manageModel.job_group" placeholder="请输入任务所在组"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="任务描述" prop="job_description">
            <i-input v-model="manageModel.job_description" placeholder="请输入任务描述"></i-input>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="任务类名" prop="bean_class">
            <i-input v-model="manageModel.bean_class" placeholder="请输入任务类名"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="触发器名称">
            <i-input placeholder="请输入触发器名称"></i-input>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="触发器所在组">
            <i-input placeholder="请输入触发器所在组"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="下次执行时间" prop="modify_time">
            <i-input v-model="manageModel.modify_time" placeholder="请输入下次执行时间"></i-input>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="表达式">
            <i-input placeholder="请输入表达式"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row type="flex" :gutter="110">
        <i-col>
          <i-form-item label="状态" prop="status">
            <i-select placeholder="请选择状态" v-model="manageModel.status">
              <i-option v-for="{value,label} in manageModelState" :key="value" :label="label" :value="value"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col>
          <i-form-item label="时区">
            <i-input placeholder="请输入时区"></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>

  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { CityService } from '~/utils/city.service'
import { Form } from 'iview'
import { jobService } from '~/services/manage-service/job.service'
import { Dependencies } from '~/core/decorator'
@Component({
  components: {}
})
export default class addManagementList extends Vue {
  @Dependencies(jobService) private jobService: jobService
  private manageModel: any = {
    job_group: '',         // 任务分组
    job_name: '',          // 任务名
    job_description: '',   // 任务描述
    bean_class: '',        // 任务类名
    modify_time: '',       // 下次执行时间
    status: '',            // 状态    

  }
  private manageModelState: any = [
    {
      value: 0,
      label: '禁用',
    }, {
      value: 1,
      label: '启用',
    }
  ]



  /**
   * 新增批量
   */
  newManagement() {
    this.jobService
      .add(this.manageModel)
      .subscribe(
      data => {
        console.log(data)
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
      )
  }







}
</script>



<style lang="less" scoped>

</style>
