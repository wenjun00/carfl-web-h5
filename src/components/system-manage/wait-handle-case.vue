<!--待办事项配置-->
<template>
  <section class="component wait-handle-case">
    <i-checkbox-group v-model="waitHanleList">
      <i-checkbox v-for="item in checkboxList" :key="item.id" :label="item.id" style="width:400px;">{{item.type?$dict.getDictName(item.type):''}}</i-checkbox>
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
    private roleConfig: any = {
      backlogIds: [],
      roleId: ""
    };
    created() {}
    /**
     * 获取所有待办事项和已选待办事项
     */
    getData(roleIds) {
      // 查询所有待办事项
      this.backLogService.queryBacklog().subscribe(
        data => {
          this.checkboxList = data;
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
      console.log(this.roleConfig, 99998);
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
  }

</script>
