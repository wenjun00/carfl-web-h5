<!--待办事项配置-->
<template>
  <section class="component wait-handle-case">
    <i-checkbox-group>
      <i-checkbox v-for="item in checkboxList" :key="item.id" :value="item.id" style="width:400px;">{{item.type?$dict.getDictName(item.type):''}}</i-checkbox>
    </i-checkbox-group>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import DataBox from '~/components/common/data-box.vue';
import Component from 'vue-class-component';
import { Dependencies } from '~/core/decorator';
import { DataDictService } from '~/services/manage-service/data-dict.service';
import { Prop } from 'vue-property-decorator';
import { PageService } from '~/utils/page.service';
import { BackLogService } from "~/services/manage-service/back-log.service";

@Component({
	components: {
		DataBox,
	},
})
export default class WaitHandleCase extends Vue {
	@Dependencies(DataDictService) private dataDictService: DataDictService;
	@Dependencies(PageService) private pageService: PageService;
  @Dependencies(BackLogService) private backLogService: BackLogService;

	@Prop() row: Object;
	private columns1: any;
	private data1: Array<any> = [];
	private checkboxList: Array<any> = [];

	created() {
	}
	/**
	 * 获取数字字典项 0421 (获取checkbox列表)
	 */
	getDate() {
    // 查询所有待办事项
    this.backLogService.queryBacklog().subscribe(data=>{
      this.checkboxList = data;
    },({msg})=>{
      this.$Message.error(msg)
    })
  }
  /**
   * 获取角色下待办事项配置
   */
  getRoleWaitHanleCase(){

  }
	// checkFun() {
	// 	this.$emit('configData', this.social);
	// }
}
</script>
