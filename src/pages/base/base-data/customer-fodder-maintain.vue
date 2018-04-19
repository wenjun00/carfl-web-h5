<!--客户素材维护-->
<template>
  <section class="page customer-fodder-maintain">
    <page-header title="客户素材维护" hiddenPrint hiddenExport></page-header>
    <i-row class="data-form">
      <i-row type="flex">
        <i-col :span="4">
          <div class="data-form-item">
            <div class="data-form-item-icon"></div>
            <span>素材类型</span>
            <div class="data-form-item-wenjian">
              <div class="data-form-item-wenjianicon" @click="MaterialTypeModel=true">
                <svg-icon iconClass="tianjiawenjianjia"></svg-icon>
              </div>
            </div>
          </div>
          <div class="data-form-list">
            <div class="data-form-list-maintain" v-for="item in maintains" :key="item.id" :value="item.name" :class="{'maintainCss':item.id===checkId}"
              @click="checkMaintain(item)">
              <span>{{item.name}}</span>
            </div>
          </div>
        </i-col>
        <i-col class="command" :span="19" :offset="1">
          <span>素材名称：</span>
          <i-input class="command-item" v-model="personalModel.name"></i-input>
          <i-button class="blueButton" @click="search">搜索</i-button>
          <i-button class="blueButton" @click="resetSeach">重置</i-button>
          <i-button class="blueButton command-item-add" @click="materialModel=true">新增素材</i-button>
          <data-box :id="144" :columns="columns" :data="data1" @onPageChange="search" :page="pageService">
          </data-box>
        </i-col>
      </i-row>
    </i-row>
    <template>
      <i-modal title="新增素材" v-model="materialModel">
        <add-material @close="closeMaterial" ref="add-material" :data1="data1"></add-material>
        <div slot="footer">
          <i-button class="Ghost" @click="cancelAddMaterial">取消</i-button>
          <i-button class="blueButton" @click="newAdd">新增</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal title="编辑素材" v-model="editMaterialModel">
        <edit-material @close="closeEditMaterial" :propId="editId" ref="edit-material"></edit-material>
        <div slot="footer">
          <i-button class="Ghost" @click="cancelEditMaterial">取消</i-button>
          <i-button class="blueButton" @click="editSure">确定</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal title="新增素材类型" v-model="MaterialTypeModel">
        <add-material-type @close="closeMaterialType" ref="add-material-type" :maintains="maintains"></add-material-type>
        <div slot="footer">
          <i-button class="Ghost" @click="cancelAddMaterialType">取消</i-button>
          <i-button class="blueButton" @click="addMatrialTypeSure">确定</i-button>
        </div>
      </i-modal>
    </template>
  </section>
</template>

<script lang="ts">
  import Page from '~/core/page';
  import DataBox from '~/components/common/data-box.vue';
  import Component from 'vue-class-component';
  import SvgIcon from '~/components/common/svg-icon.vue';
  import AddMaterial from '~/components/base-data/add-material.vue';
  import EditMaterial from '~/components/base-data/edit-material.vue';
  import AddMaterialType from '~/components/base-data/add-material-type.vue';
  import {
    Form
  } from 'iview';
  import {
    Dependencies
  } from '~/core/decorator';
  import {
    DataDictService
  } from '~/services/manage-service/data-dict.service';
  import {
    PersonalMaterialService
  } from '~/services/manage-service/personal-material.service';
  import {
    PageService
  } from '~/utils/page.service';
  import {
    Layout
  } from '~/core/decorator';

  @Layout('workspace')
  @Component({
    components: {
      DataBox,
      SvgIcon,
      AddMaterial,
      EditMaterial,
      AddMaterialType,
    },
  })
  export default class CustomerFodderMaintain extends Page {
    @Dependencies(DataDictService) private dataDictService: DataDictService;
    @Dependencies(PersonalMaterialService) private personalMaterialService: PersonalMaterialService;
    @Dependencies(PageService) private pageService: PageService;
    private columns: any;
    private data1: Array < Object > = [];
    private maintains: Array < any > = [];
    private searchOptions: Boolean = false;
    private checkId: number = 376;
    private item: any;
    private personalModel: any = {};
    private materialModel: Boolean = false;
    private editMaterialModel: Boolean = false;
    private MaterialTypeModel: Boolean = false;
    private editId: Number = 0;
    private config: any = {};
    private itemData: any = {};

    created() {
      this.maintains = [];
      this.item = {
        id: 376,
      };
      this.getCustomerList();
      this.checkMaintain(this.item);
      this.personalModel = {
        type: 376,
        name: '',
      };
      this.columns = [{
          title: '操作',
          align: 'center',
          render: (h, {
            row,
            column,
            index
          }) => {
            return h('div', [
              h(
                'i-button', {
                  props: {
                    type: 'text',
                  },
                  style: {
                    color: '#265EA2',
                  },
                  on: {
                    click: () => {
                      this.editFun(row);
                    },
                  },
                },
                '编辑'
              ),
              h(
                'i-button', {
                  props: {
                    type: 'text',
                  },
                  style: {
                    color: '#265EA2',
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '提示',
                        content: '您确定要删除吗？',
                        onOk: () => {
                          this.delectMaintain(row);
                        },
                      });
                    },
                  },
                },
                '删除'
              ),
            ]);
          },
        },
        {
          title: '名称',
          key: 'name',
          align: 'center',
          editable: true,
        },
        {
          title: '是否必传',
          key: 'isNecessary',
          align: 'center',
          editable: true,
          render: (h, {
            row,
            columns,
            index
          }) => {
            return h(
              'i-switch', {
                props: {
                  value: !row.isNecessary ? true : false,
                },
                on: {
                  'on-change': val => {
                    this.isPass(val, row); //是否必传
                  },
                },
              }, [
                h(
                  'span', {
                    props: {
                      slot: 'open',
                    },
                  },
                  '是'
                ),
                h(
                  'span', {
                    props: {
                      slot: 'close',
                    },
                  },
                  '否'
                ),
              ]
            );
          },
        },
      ];
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    exportMonthReport() {}

    /**
     * 获取客户素材列表
     */
    getCustomerList() {
      this.dataDictService
        .getDataDictByTypeCode({
          typeCode: '0309',
        })
        .subscribe(val => {
          this.maintains = val;
        });
    }
    /**
     * 分页查询客户素材
     *
     */
    checkMaintain(item) {
      this.checkId = item.id;
      this.itemData = item;
      this.personalModel = {
        type: this.checkId,
      };
      this.search();
    }
    /**@
     * 根据条件搜索
     */
    search() {
      this.personalMaterialService.getAllPersonalMaterial(this.personalModel, this.pageService).subscribe(
        val => {
          this.data1 = val;
        },
        ({
          msg
        }) => {
          this.$Message.error(msg);
        }
      );
    }
    /**
     * 删除客户素材
     */
    delectMaintain(row) {
      this.personalMaterialService
        .deletePersonalMaterial({
          id: row.id,
        })
        .subscribe(
          val => {
            this.$Message.success('删除成功！');
            this.checkMaintain(this.item);
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    /**
     *新增素材 确定按钮
     */
    newAdd() {
      let materialOpen: any = this.$refs['add-material'];
      materialOpen.formRules(this.checkId);
    }
    closeMaterial() {
      this.materialModel = false;
      this.checkMaintain(this.itemData); //刷新
    }
    /**
     * 取消新增素材
     */
    cancelAddMaterial() {
      this.materialModel = false;
      let formReset: any = this.$refs['add-material'];
      formReset.reset();
    }
    /**
     * 编辑素材 确定按钮
     */
    editFun(row) {
      let _editmaterial: any = this.$refs['edit-material']
      _editmaterial.editData(row)
      this.editMaterialModel = true;
      this.editId = row.id;
    }
    editSure() {
      let materialOpen: any = this.$refs['edit-material'];
      materialOpen.formRules(this.checkId);
    }
    closeEditMaterial() {
      this.editMaterialModel = false;
      this.checkMaintain(this.itemData); //刷新
    }
    /**
     * 取消编辑素材
     */
    cancelEditMaterial() {
      this.editMaterialModel = false;
      //   let _editmaterial: any = this.$refs['edit-material'];
      //   _editmaterial.reset();
    }
    /**
     * 新增素材类型  确定按钮
     */
    addMatrialTypeSure() {
      let materialOpen: any = this.$refs['add-material-type'];
      materialOpen.formRules();
    }
    closeMaterialType() {
      this.MaterialTypeModel = false;
      this.getCustomerList(); //刷新
    }
    /**
     * 取消新增素材类型
     */
    cancelAddMaterialType() {
      this.MaterialTypeModel = false;
      let formReset: any = this.$refs['add-material-type'];
      formReset.reset();
    }
    /**
     * 是否必传
     */
    isPass(val, row) {
      this.config = {
        id: row.id,
        isNecessary: val === true ? 0 : 1,
      };
      this.personalMaterialService.isNecessary(this.config).subscribe(
        val => {
          this.$Message.success('修改成功！');
        },
        ({
          msg
        }) => {
          this.$Message.error('修改失败！');
        }
      );
    }
    /**
     * 重置搜索
     */
    resetSeach() {
      this.personalModel = {
        name: '',
        type: 376,
      };
    }
  }

</script>
<style lang="less" scoped>
  .page.customer-fodder-maintain {
    .data-form {
      margin-top: 10px;
      .data-form-item {
        width: 250px;
        height: 30px;
        border: 1px solid #dddd;
        line-height: 30px;
        font-size: 16px;
        .data-form-item-icon {
          width: 4px;
          height: 15px;
          background: rgb(38, 94, 162);
          display: inline-block;
          margin-left: 10px;
          position: relative;
          top: 2px;
        }
        .data-form-item-wenjian {
          float: right;
          display: inline-block;
          font-weight: bold;
          .data-form-item-wenjianicon {
            font-size: 20px;
            cursor: pointer;
            display: inline-block;
            margin-right: 7px;
            color: rgb(38, 94, 162)
          }
        }
      }
      .data-form-list {
        width: 250px;
        height: 600px;
        border: 1px solid #dddd;
        border-top: 0;
        .data-form-list-maintain {
          cursor: pointer;
          width: 100%;
          padding-left: 10px;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          postion: relative;
          margin: auto
        }
      }
      .command {
        .command-item {
          width: 20%;
          margin-right: 10px;
        }
        .command-item-add {
          margin-left: 10px;
          position: absolute;
          right: 11px;
        }
      }
    }
  }
  
  .maintainCss {
    background: #e4f4fa;
  }

</style>
