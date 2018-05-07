 <!--新增管理--> 
<template>
    <section class="component add-management-list">
        <i-form ref="form-item" :label-width="90">
            <i-row type="flex" :gutter="110">
                <i-col>
                    <i-form-item label="任务名" prop="name">
                        <i-input placeholder="请输入任务名" ></i-input>
                    </i-form-item>
                </i-col>
                <i-col>
                    <i-form-item label="任务所在组" prop="telephone">
                        <i-input placeholder="请输入任务所在组"></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col>
                    <i-form-item label="任务描述" prop="certificateType">
                        <i-input placeholder="请输入任务描述"></i-input>
                    </i-form-item>
                </i-col>
                <i-col>
                    <i-form-item label="任务类名" prop=" idCard">
                        <i-input placeholder="请输入任务类名" ></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
             <i-row type="flex" :gutter="110">
                <i-col>
                    <i-form-item label="触发器名称" prop="certificateType">
                        <i-input placeholder="请输入触发器名称"></i-input>
                    </i-form-item>
                </i-col>
                <i-col>
                    <i-form-item label="触发器所在组" prop=" idCard">
                        <i-input placeholder="请输入触发器所在组" ></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
             <i-row type="flex" :gutter="110">
                <i-col>
                    <i-form-item label="下次执行时间" prop="certificateType">
                        <i-input placeholder="请输入下次执行时间"></i-input>
                    </i-form-item>
                </i-col>
                <i-col>
                    <i-form-item label="表达式" prop=" idCard">
                        <i-input placeholder="请输入表达式" ></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row type="flex" :gutter="110">
                <i-col>
                    <i-form-item label="状态" prop="certificateType">
                        <i-input placeholder="请输入状态"></i-input>
                    </i-form-item>
                </i-col>
                <i-col>
                    <i-form-item label="时区" prop=" idCard">
                        <i-input placeholder="请输入时区" ></i-input>
                    </i-form-item>
                </i-col>
            </i-row>
        </i-form>

    </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { FilterService } from '~/utils/filter.service'
import { CityService } from '~/utils/city.service'
import { Form } from 'iview'
@Component({
  components: {}
})
export default class addManagementList extends Vue {}
</script>



<style lang="less" scoped>

</style>
