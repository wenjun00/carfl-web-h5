<!--待办事项配置-->
<template>
  <section class="component wait-handle-case">
    <i-checkbox-group v-model="social" @on-change="checkFun">
      <i-checkbox v-for="item in checkboxList" :key="item.id" :label="item.id" :value="item.id" style="width:180px;">{{item.name}}</i-checkbox>
    </i-checkbox-group>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import DataBox from '~/components/common/data-box.vue';
  import Component from 'vue-class-component';
  import {
    Dependencies
  } from '~/core/decorator';
  import {
    DataDictService
  } from '~/services/manage-service/data-dict.service';
  import {
    Prop
  } from 'vue-property-decorator';
  import {
    PageService
  } from '~/utils/page.service';

  @Component({
    components: {
      DataBox,
    },
  })
  export default class WaitHandleCase extends Vue {
    @Dependencies(DataDictService) private dataDictService: DataDictService;
    @Dependencies(PageService) private pageService: PageService;

    @Prop() row: Object;
    private columns1: any;
    private data1: Array < Object > = [];
    private checkboxList: Array < Object > = [];
    private social: Array < Object > = [];

    created() {
      this.social = [];
    }
    cancel() {}
    confirm() {}
    moveOut(row) {}
    /**
     * 获取数字字典项 0421
     */
    getDate() {
      this.dataDictService
        .getDataDictByTypeCode({
          typeCode: '0421',
        })
        .subscribe(val => {
          this.checkboxList = val;
        });
    }
    checkFun() {
      this.$emit('configData', this.social);
    }
  }

</script>
