<template>
  <section class="component create-tatics">
    <el-form ref="create-form" :model="createModel" label-position="top">
      <el-form-item label="策略名称" prop="name">
        <el-input v-model="createModel.name"></el-input>
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-input v-model="createModel.priority"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="areaCodes">
        <el-row v-for="(v,i) in createModel.areaCodes" :key="i">
          <el-cascader :options="$city.getCityData({level:2})" v-model="createModel.areaCodes[i]" :key="i" :show-all-levels="false"></el-cascader>
          <el-button @click="createModel.areaCodes.splice(i,1)" v-if="createModel.areaCodes.length!==1">
            <svg-icon iconClass="shanchu"></svg-icon>
          </el-button>
          <el-button @click="createModel.areaCodes.push([])" v-if="i === createModel.areaCodes.length-1">
            <svg-icon iconClass="zengjia"></svg-icon>
          </el-button>
        </el-row>
      </el-form-item>
      <el-form-item label="机构" prop="organizations">
        <el-row v-for="(v,i) in createModel.organizations" :key="i">
          <el-cascader :options="organizeOptions" :props="{value:'id',label:'name'}" v-model="createModel.organizations[i]" :show-all-levels="false"
            change-on-select></el-cascader>
          <el-button @click="createModel.organizations.splice(i,1)" v-if="createModel.organizations.length!==1">
            <svg-icon iconClass="shanchu"></svg-icon>
          </el-button>
          <el-button @click="createModel.organizations.push([])" v-if="i === createModel.organizations.length-1">
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
  import SvgIcon from "~/components/common/svg-icon.vue";
  import {
    Layout
  } from "~/core/decorator";
  import Component from "vue-class-component";
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
  export default class CreateTatics extends Vue {
    @Dependencies(orderStrategyConfigService) private orderStrategyConfigService: orderStrategyConfigService;
    @Dependencies(organizationService) private organizationService: organizationService;
    private createModel: any = {
      areaCodes: [
        []
      ],
      name: '',
      priority: '',
      organizations: [
        []
      ]
    };
    private organizeOptions: any = [];
    /**
     * 新增案件提交
     */
    submit() {
      let obj: any = {
        areaCodes: this.createModel.areaCodes.map(v => v[v.length - 1]),
        name: this.createModel.name,
        priority: this.createModel.priority,
        organizations: this.createModel.organizations.map(v => v[v.length - 1])
      }
      this.orderStrategyConfigService.createOrderStrategyConfig(obj).subscribe(data => {
        this.$message({
          type: 'success',
          message: '创建成功'
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
