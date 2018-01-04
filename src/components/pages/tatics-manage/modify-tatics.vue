<template>
  <section class="component modify-tatics">
    <el-form ref="modify-form" :model="modifyModel">
      <el-form-item label="策略名称" prop="name">
        <el-input v-model="modifyModel.name"></el-input>
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-input v-model="modifyModel.priority"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="areaCodes">
        <el-row v-for="(v,i) in modifyModel.areaCodes" :key="i">
          <el-input v-model="modifyModel.areaCodes[i]"></el-input>
          <el-button @click="modifyModel.areaCodes.splice(i,1)" v-if="modifyModel.areaCodes.length!==1">
            <svg-icon iconClass="shanchu"></svg-icon>
          </el-button>
          <el-button @click="modifyModel.areaCodes.push('')" v-if="i === modifyModel.areaCodes.length-1">
            <svg-icon iconClass="zengjia"></svg-icon>
          </el-button>
        </el-row>
        <!--<el-cascader v-for="v,i in modifyModel.areaCodes" :options="areaOptions" :props="{value:'id',label:'name'}" v-model="modifyModel.areaCodes[i]"
          :key="i" :show-all-levels="false"></el-cascader>-->
      </el-form-item>
      <el-form-item label="机构" prop="organizations">
        <el-row v-for="(v,i) in modifyModel.organizations" :key="i">
          <el-cascader :options="organizeOptions" :props="{value:'id',label:'name'}" v-model="modifyModel.organizations[i]" :show-all-levels="false"
            change-on-select></el-cascader>
          <el-button @click="modifyModel.organizations.splice(i,1)" v-if="modifyModel.organizations.length!==1">
            <svg-icon iconClass="shanchu"></svg-icon>
          </el-button>
          <el-button @click="modifyModel.organizations.push([])" v-if="i === modifyModel.organizations.length-1">
            <svg-icon iconClass="zengjia"></svg-icon>
          </el-button>
        </el-row>
      </el-form-item>
      <el-row type="flex" justify="center">
        <el-button @click="close">取消</el-button>
        <el-button @click="submit">确定</el-button>
      </el-row>
    </el-form>
  </section>
</template>
<script lang="ts">
  import Vue from "vue";
  import {
    Layout
  } from "~/core/decorator";
  import Component from "vue-class-component";
  import SvgIcon from "~/components/common/svg-icon.vue";
  import {
    Dependencies
  } from "~/core/decorator";
  import app from '~/config/app.config'
  import {
    orderStrategyConfigService
  } from "~/services/order-strategy-config.service";
  import {
    organizationService
  } from "~/services/organization.service";

  @Component({
    components: {
      SvgIcon
    }
  })
  export default class modifyTatics extends Vue {
    @Dependencies(orderStrategyConfigService) private orderStrategyConfigService: orderStrategyConfigService;
    @Dependencies(organizationService) private organizationService: organizationService;
    private modifyModel: any = {
      id: '',
      areaCodes: [
        ''
      ],
      name: '',
      priority: '',
      organizations: [
        []
      ]
    };
    private areaOptions: any = [];
    private organizeOptions: any = [];
    refresh(modify) {
      this.modifyModel.id = modify.id
      this.modifyModel.name = modify.name
      this.modifyModel.priority = modify.priority
      this.modifyModel.areaCodes = modify.areaCodes && modify.areaCodes.length ? modify.areaCodes.map(v => v.id) : [
        ''
      ]
      this.modifyModel.organizations = modify.organizations && modify.organizations.length ? modify.organizations.map(
        v => [v.id]) : [
        []
      ]
    }
    /**
     * 修改案件提交
     */
    submit() {
      let obj: any = {
        areaCodes: this.modifyModel.areaCodes,
        name: this.modifyModel.name,
        id: this.modifyModel.id,
        priority: this.modifyModel.priority,
        organizations: this.modifyModel.organizations.map(v => v[v.length - 1])
      }
      this.orderStrategyConfigService.modify(obj).subscribe(data => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.close()
        this.$emit('success')
      });
    }
    close() {
      this.$emit('close')
    }
    mounted() {
      this.organizationService.getAllOrganizations().subscribe(data => {
        console.log(data)
        let fun: any = (id) => {
          // 递归对象子元素
          let list = data.filter(x => id ? x.parentId === id : !x.parentId).map(node => {
            // 递归构建子节点
            let children = fun(node.id)
            if (children && children.length) {
              node.children = children
            }
            return node
          })
          return list
        }
        this.organizeOptions = fun()
        console.log(this.organizeOptions)
      });
    }
  }

</script>

<style scoped>


</style>
