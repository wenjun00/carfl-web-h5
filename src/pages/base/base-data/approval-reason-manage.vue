<!--审批原因管理-->
<template>
  <section class="page approval-reason-manage">
    <i-row style="margin-top:10px;margin-left:10px;">
      <span style="font-size:18px;font-weight:bold">审批原因管理</span>
      <span style="margin-left:10px;">类型：</span>
      <i-select style="margin-left:10px;width:10%;" placeholder="全部" v-model="appReasonModel.type" clearable @on-change="selectType">
        <i-option label="退回" :value="374" :key="374"></i-option>
        <i-option label="拒绝" :value="375" :key="375"></i-option>
      </i-select>
      <span style="margin-left:10px;">一级：</span>
      <i-select style="margin-left:10px;width:10%;" placeholder="全部" v-model="appReasonModel.first" clearable @on-change="firstSelect">
        <i-option :label="item" :value="item" :key="item" v-for="item in firstOption"></i-option>
      </i-select>
      <span style="margin-left:10px;">二级：</span>
      <i-select style="margin-left:10px;width:10%;" placeholder="全部" v-model="appReasonModel.second" clearable @on-change="secondSelect">
        <i-option :label="item" :value="item" :key="item" v-for="item in secondOption"></i-option>
      </i-select>
      <span style="margin-left:10px;">CRC编码：</span>
      <i-input style="width:10%;" v-model="appReasonModel.CRC"></i-input>
      <span style="margin-left:10px;">详细内容：</span>
      <i-input style="width:10%;" v-model="appReasonModel.detail"></i-input>
      <i-button class="blueButton" style="margin-left:10px;" @click="seach">搜索</i-button>
      <i-button class="blueButton" style="margin-left:10px;" @click="resetSeach">重置</i-button>
      <div style="font-size:16px;cursor:pointer;display:inline-block;margin-left:10px;">
        <span></span>
      </div>
      <div style="float:right;margin-right:12px;margin-top:10px;">
        <div style="cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7">
          <svg-icon iconClass="daoru" style="font-size:16px;"></svg-icon>
          <span style="font-size:14px;">导入</span>
        </div>
        <div style="font-size:14px;cursor:pointer;display:inline-block;margin-left:10px;color:#3367A7" @click="downloadTemplate">
          <svg-icon iconClass="xiazai"></svg-icon>
          <span>模版下载</span>
        </div>
      </div>
    </i-row>
    <data-box :id="109" :columns="columns" :data="AppRoveReasonList" @onPageChange="seach" :page="pageService"></data-box>
    <div class="submitBar">
      <i-row type="flex" align="middle" style="padding:5px">
        <i-col :span="24" style="text-align:right;">
          <i-button class="highButton" @click="addapprovalReasonBtn">新增审批原因</i-button>
        </i-col>
      </i-row>
    </div>
    <template>
      <i-modal title="新增审批原因" v-model="approvalReasonModel">
        <add-approval-reason ref="add-approval-reason" @close="closeApproval"></add-approval-reason>
        <div slot="footer">
          <i-button class="Ghost" @click="cancelApprovalreason">取消</i-button>
          <i-button class="blueButton" @click="submitApprovalReason">新增</i-button>
        </div>
      </i-modal>
    </template>
    <template>
      <i-modal title="编辑审批原因" v-model="editApprovalReasonModel">
        <edit-approval-reason ref="edit-approval-reason" @close="closeEditApproval"></edit-approval-reason>
        <div slot="footer">
          <i-button class="Ghost" @click="editcancel">取消</i-button>
          <i-button class="blueButton" @click="editApproval">保存并退出</i-button>
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
  import {
    Dependencies
  } from '~/core/decorator';
  import {
    Layout
  } from '~/core/decorator';
  import AddApprovalReason from '~/components/base-data/add-approval-reason.vue';
  import EditApprovalReason from '~/components/base-data/edit-approval-reason.vue';

  import {
    ApproveReasonService
  } from '~/services/manage-service/approve-reason.service';
  import {
    PageService
  } from '~/utils/page.service';
  import {
    FilterService
  } from '~/utils/filter.service';
  @Layout('workspace')
  @Component({
    components: {
      DataBox,
      SvgIcon,
      AddApprovalReason,
      EditApprovalReason,
    },
  })
  export default class ApprovalReasonManage extends Page {
    @Dependencies(ApproveReasonService) private approveReasonService: ApproveReasonService;
    @Dependencies(PageService) private pageService: PageService;
    private columns: any;
    private columns2: any;
    private appReasonModel: any = {};
    private data2: Array < any > = [];
    private searchOptions: Boolean = false;
    private approvalReasonModal: Boolean = false;
    private isDisabled: Boolean = true;
    private fileDataOpen: Boolean = false;
    private AppRoveReasonList: Array < any > = [];
    private approvalReasonModel: Boolean = false;
    private editApprovalReasonModel: Boolean = false;
    private userData: any = {};
    private firstOption: any = [];
    private secondOption: any = [];

    created() {
      this.seach();
      this.columns = [{
          align: 'center',
          title: '操作',
          width: 170,
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
                      console.log(row, '编辑')
                      this.showEditApproval(row);
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
                        content: '确定删除吗？',
                        onOk: () => {
                          this.deleteApproval(row);
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
          title: '类型',
          key: 'type',
          align: 'center',
          editable: true,
          render: (h, {
            row,
            column,
            index
          }) => {
            return h("span", {}, this.$dict.getDictName(row.type));
          }
        },
        {
          title: '一级',
          key: 'first',
          align: 'center',
          editable: true,
        },
        {
          title: '二级',
          key: 'second',
          align: 'center',
          editable: true,
        },
        {
          title: 'CRC编码',
          key: 'crc',
          align: 'center',
          editable: true,
        },
        {
          title: '详细内容',
          key: 'detail',
          align: 'center',
          editable: true,
        },
        {
          title: '创建人',
          key: 'operator',
          align: 'center',
          editable: true,
        },
        {
          title: '创建时间',
          key: 'operatorTime',
          align: 'center',
          editable: true,
          render: (h, {
            row,
            columns,
            index
          }) => {
            return h('span', FilterService.dateFormat(row.operatorTime, 'yyyy-MM-dd hh:mm:ss'));
          },
        },
      ];
      this.AppRoveReasonList = [];
      this.appReasonModel = {
        first: '',
        second: '',
        CRC: '',
        detail: '',
        type: '',
      };
    }
    /**
     * 取消编辑
     */
    editcancel() {
      this.editApprovalReasonModel = false
      let _editapprovalreason: any = this.$refs['edit-approval-reason']
      _editapprovalreason.reset()
    }
    /**
     * 取消
     */
    cancelApprovalreason() {
      this.approvalReasonModel = false
      let _addapprovalreason: any = this.$refs['add-approval-reason']
      _addapprovalreason.reset()
    }
    getOrderInfoByTime() {}
    openSearch() {
      this.searchOptions = !this.searchOptions;
    }
    exportMonthReport() {}
    /**
     * 导入审批原因
     */
    importApprovalReason() {
      this.approvalReasonModal = true;
    }
    /**
     * selectChange
     */
    changeOption(val) {
      if (val) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    }
    /**
     * 文件选择按钮点击
     */
    checkFile() {
      this.fileDataOpen = true;
    }
    /**@augments
     * 分页查询审批原因
     */
    seach() {
      this.approveReasonService.getAllApproveReason(this.appReasonModel, this.pageService).subscribe(
        data => {
          this.AppRoveReasonList = data;
          this.AppRoveReasonList.map(v => {
            // if (v.type === 374) {
            //   v.type = '退回';
            // } else {
            //   v.type = '拒绝';
            // }
          });
        },
        ({
          msg
        }) => {
          this.$Message.error(msg);
        }
      );
    }
    /**\
     * 新增审批原因 按钮
     */
    addapprovalReasonBtn() {
      this.approvalReasonModel = true;
    }
    /**
     * 新增审批原因 新增按钮
     */
    submitApprovalReason() {
      let openApproval: any = this.$refs['add-approval-reason'];
      openApproval.validFun();
    }
    /**
     * 新增审批原因成功 关闭窗口
     */
    closeApproval() {
      this.approvalReasonModel = false;
      this.seach(); //刷新
    }
    /**
     * 获取创建人信息
     */
    mounted() {
      this.userData = this.$store.state.userData;
    }
    /**
     * 删除审批原因管理
     */
    deleteApproval(row) {
      console.log(row)
      this.approveReasonService
        .deleteApproveReason({
          id: row.id,
        })
        .subscribe(
          val => {
            this.$Message.success('删除成功！');
            this.seach(); //刷新
          },
          ({
            msg
          }) => {
            this.$Message.error(msg);
          }
        );
    }
    /**
     * 编辑审批原因管理
     */
    showEditApproval(row) {
      this.editApprovalReasonModel = true;
      let openApproval: any = this.$refs['edit-approval-reason'];
      openApproval.rowParms(row);
    }
    editApproval() {
      let openApproval: any = this.$refs['edit-approval-reason'];
      openApproval.validFun();
    }
    /**
     * 编辑审批原因成功 关闭窗口
     */
    closeEditApproval() {
      this.editApprovalReasonModel = false;
      this.seach(); //刷新
    }
    /**
     * 模板下载
     */
    downloadTemplate() {
      this.approveReasonService.downloadApproveReasonTemplate().subscribe(
        val => {},
        ({
          msg
        }) => {
          this.$Message.error(msg);
        }
      );
    }
    /**
     * 重置搜索
     */
    resetSeach() {
      this.appReasonModel = {
        first: '',
        second: '',
        CRC: '',
        detail: '',
        type: '',
      };
    }
    /**
     * 选择类型 查询一级二级的select
     */
    selectType(val) {
      this.appReasonModel.type = val;
      this.appReasonModel.first = '';
      this.appReasonModel.second = '';
      this.approveReasonService.getApproveReasonByCondition(this.appReasonModel).subscribe(val => {
        console.log(val)
        let optionArray = val.map(v => v.first);
        let set1 = new Set(optionArray);
        this.firstOption = Array.from(set1);
      });
    }
    firstSelect(val) {
      this.appReasonModel.type = this.appReasonModel.type;
      this.appReasonModel.first = val;
      this.appReasonModel.second = '';
      if (val) {
        this.approveReasonService.getApproveReasonByCondition(this.appReasonModel).subscribe(val => {
          let secondArray = val.map(v => v.second);
          let set2 = new Set(secondArray);
          this.secondOption = Array.from(set2);
        });
      }
    }
    secondSelect(val) {
      this.appReasonModel.type = this.appReasonModel.type;
      this.appReasonModel.first = this.appReasonModel.first;
      this.appReasonModel.second = val;
    }
  }

</script>
<style lang="less" scoped>


</style>
