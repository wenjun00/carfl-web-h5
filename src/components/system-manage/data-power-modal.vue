<!--分配角色-->
<template>
  <section class="component data-power-modal">
    <i-row :gutter="10">
      <i-col :span="6">
        <div style="border:1px solid #D7D7D7;height:380px;">
          <span style="position:absolute;top:50%;left:34px;">可选机构</span>
        </div>
      </i-col>
      <i-col :span="18">
        <div style="border:1px solid #D7D7D7;height:380px;">
          <i-tree show-checkbox :data="treeData"></i-tree>
        </div>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component'
  import {
    Prop
  } from "vue-property-decorator";
  import {
    ManageService
  } from "~/services/manage-service/manage.service";
  import { Dependencies } from "~/core/decorator";
  
  @Component({
    components: {}
  })
  export default class DataPowerModal extends Vue {
    @Dependencies(ManageService) private manageService: ManageService;
    private columns1: any;
    private treeData: Array < any > = [];
    private allData: Array<any> = [];

    created() {
     
    }
    getAllOrg() {
        this.manageService.getAllDepartment().subscribe(
        data => {
          this.allData = data
          this.createNewTree(data)
        },
        ({
          msg
        }) => {
          this.$Message.error(msg);
        }
      );
    }
     /**
   * 生成树
   */
  createNewTree(allData) {
    let root = allData.filter(v => v.deptPid===0); // 获取树根
    // 遍历根对象push进树中
    root.forEach(item => {
      let node1 = {
        title: item.deptName,
        expand: true,
        id:item.id,
        children: this.getChild(item)
      };
      this.treeData.push(node1);
    });
  } 
    /**
   * 获取相对根元素的子元素
   */
  getChild(item) {
    let child: any = [];
    // 判断子的父id与全部数据的id相等
    this.allData.map(val => {
      if (item.id === val.deptPid) {
          let node2 = {
            title: val.deptName,
            id: val.id,
            expand: true,
            children: this.getChild(val) // 迭代产生根
          };
          child.push(node2);
      }
    });
    return child;
  }
  }
</script>