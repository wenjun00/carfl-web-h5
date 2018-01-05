<template>
  <section class="component message-tree">
    <el-tree :data="orgTreeData" :props="{children: 'children',label: 'name'}" @current-change="selectOrganizationHandle"></el-tree>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Mutation,namespace } from "vuex-class";
import { Watch, Prop, Emit ,Model} from "vue-property-decorator";
import { organizationService } from "~/services/organization.service";
import {  Dependencies } from "~/core/decorator";
@Component({
  components: {}
})
export default class MessageTree extends Vue {
  @Dependencies(organizationService) private organizationService: organizationService;
  @Emit("change")
  organizationChange(id) {}

  private orgTreeData = []
  private currentNode = ''
  mounted(){
    this.getOrganizationData()
  }

  getOrganizationData(){
    this.organizationService
    .getAllOrganizations()
    .subscribe(this.getOrganizationTree);
  }

  getOrganizationTree(data){
    let results = data.filter(x=>!x.parentId)

    let fun = (items)=>{
      items.forEach(item=>{
        let children = data.filter(x=>x.parentId == item.id)
        if(children&&children.length>0){
          fun(children)
          item.children = children
        }
      })
    }

    fun(results)

    this.orgTreeData = results
  }

  selectOrganizationHandle({id}){
    if(this.currentNode != id){
      this.currentNode = id
      this.organizationChange(id)
    }
  }
}
</script>

<style lang="less" scoped>
  .message-tree.component{
  }
</style>
