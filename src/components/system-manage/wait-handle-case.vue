<!--待办事项配置-->
<template>
  <section class="component wait-handle-case">
    <div class="data-form">
      <Checkbox
        :indeterminate="isIndeterminate"
        :value="checkAll"
        @on-change="handleCheckAllChange">全选</Checkbox>
    </div>
    <i-checkbox-group v-model="waitHanleList" @on-change="handleCheckedItemChange">
      <i-checkbox class="data-checkbox" v-for="item in checkboxList" :key="item.id" :label="item.id">{{item.type?$dict.getDictName(item.type):''}}</i-checkbox>
    </i-checkbox-group>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    DataDictService
  } from "~/services/manage-service/data-dict.service";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    PageService
  } from "~/utils/page.service";
  import {
    BackLogService
  } from "~/services/manage-service/back-log.service";

  @Component({
    components: {
      DataBox
    }
  })
  export default class WaitHandleCase extends Vue {
    @Dependencies(DataDictService) private dataDictService: DataDictService;
    @Dependencies(PageService) private pageService: PageService;
    @Dependencies(BackLogService) private backLogService: BackLogService;

    @Prop() row: Object;
    private columns1: any;
    private data1: Array < any > = [];
    private checkboxList: Array < any > = [];
    private waitHanleList: Array < any > = [];
    private checkAll: Boolean = false;
    private isIndeterminate: Boolean = false;
    private checkAllGroup : Array <any> = [];
    private indeterminate : Boolean = false;
    private roleConfig: any = {
      backlogIds: [],
      roleId: ""
    };
    created() {

    }

    /**
     * 获取所有待办事项和已选待办事项
     */
    getData(roleIds) {
      // 查询所有待办事项
      this.backLogService.queryBacklog().subscribe(
        data => {
          this.checkboxList = data;
          console.log(data)
        },
        ({
          msg
        }) => {
          this.$Message.error(msg);
        }
      );

      // 查询反显的待办事项
      this.backLogService
        .findBacklogByRoleId({
          roleIds: [roleIds]
        })
        .subscribe(
          data => {
            this.waitHanleList = data.map(v => v.id);
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    /**
     * 获取角色下待办事项配置
     */
    getRoleWaitHanleCase() {}

    /**
     * 确定配置待办事项
     */
    configWaitHandle(roleId) {
      this.roleConfig.backlogIds = this.waitHanleList;
      this.roleConfig.roleId = roleId;
      this.backLogService.roleAllocateBacklogs(this.roleConfig).subscribe(
        val => {
          this.$Message.success("配置成功！");
          this.$emit("close");
        },
        ({
          msg
        }) => {
          this.$Message.error(msg);
        }
      );
    }

    /**
     * 全选功能
     */
    handleCheckAllChange(val){
      this.checkboxList.forEach((item,index)=>{
        this.checkAllGroup.push(item.id)
      });
      this.waitHanleList = val ? this.checkAllGroup : [];
      this.isIndeterminate = false;
    }
    handleCheckedItemChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkboxList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkboxList.length;
    }


  }

</script>
<style lang="less" scoped>
    .component.wait-handle-case{
        .data-form{
            border-bottom: 1px solid #e9e9e9;
            padding-bottom:6px;
            margin-bottom:6px;
        }
        .data-checkbox{
            width:400px;
        }
    }

</style>
