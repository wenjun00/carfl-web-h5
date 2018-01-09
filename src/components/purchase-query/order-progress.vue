<template>
  <div class="component order-progress">
    <i-row style="margin-top:20px">
      <data-box :columns="progressColumns" :data="progressData" :page="pageService" @page-change="updateData(page)"></data-box>
    </i-row>
    
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import { PageService } from "~/utils/page.service";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    OrderQueryService
  } from "~/services/business-service/order-query.service";


  @Component({
    components: {
      DataBox
    }
  })
  export default class OrderProgress extends Vue {
    @Dependencies(PageService) private pageService: PageService;
    @Dependencies(OrderQueryService) private orderQueryService: OrderQueryService;

    private progressColumns: Array < Object > = [];
    private progressData: Array < Object > = [];
    private page: any;

    mounted () {
      this.progressColumns = [{
          align: 'center',
          title: '处理时间',
          key: 'processingTime'
        },
        {
          align: 'center',
          title: '操作人',
          key: 'operator'
        },
        {
          align: 'center',
          title: '环节',
          key: 'link'
        },
        {
          align: 'center',
          title: '状态说明',
          key: 'statusDescription',
          width: '320'
        },
        {
          align: 'center',
          title: '备注说明',
          key: 'noteDescription'
        }
      ]
        this.updateData()
    }
    updateData() {
      this.orderQueryService.getOrderProgress().subscribe(({ val }) => {
        this.progressData = val;
      })
    }
  }
</script>

<style scoped>

</style>