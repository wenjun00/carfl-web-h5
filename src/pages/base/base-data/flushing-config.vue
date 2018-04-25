<!--冲抵配置-->
<template>
  <section class="page flushing-config">
    <page-header title="冲抵配置" hidden-print hidden-export></page-header>
    <i-row class="data-form">
      <i-col :span="4" class="form-item">
        <div class="form-item-name">
          <span>冲抵类型</span>
        </div>
        <div class="form-item-tree">
          <div class="data-form-list-template" v-for="{value,label} in $dict.getDictData('0442')" :key="value" :label="label" :value="value" @click="checkMaintain(value)" :class="{'maintainCss':value===checkId}">
            <span>{{label}}</span>
          </div>
        </div>
      </i-col>
      <i-col :span="20">
        <data-box  :columns="configColumns" :data="dataSet"  :page="pageService" @onPageChange="check"></data-box>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
  import Page from "~/core/page";
  import Component from "vue-class-component";
  import { Dependencies } from "~/core/decorator";
  import { Layout } from "~/core/decorator";
  import { PageService } from "~/utils/page.service";
  import { StagesMatchService} from "~/services/manage-service/stages-match.service";

  @Layout("workspace")
  @Component({
    components: {}
  })
  export default class FlushingConfig extends Page{
    @Dependencies(PageService) private pageService: PageService;
    @Dependencies(StagesMatchService) private stagesMatchService: StagesMatchService;
    private dataSet: Array<any> = []
    private checkId: any = ''
    private configColumns:any = [{
      title: '费用项',
      key: 'costName',
      align: 'center',
      minWidth: this.$common.getColumnWidth(8)
    },
    {
      title: '备注',
      key: 'remark',
      align: 'center',
      minWidth: this.$common.getColumnWidth(4)
    },
    {
      title: '排序',
      key: 'sort',
      align: 'center',
      minWidth: this.$common.getColumnWidth(4),
      render:(h,{ row }) => {
        return h('div',[
          h('span',{
            on:{
              click: () => {
                this.upArrow(row)
              }
            }
          },[
            h('Icon', {
              props: {
                type: 'arrow-up-b'
              },
              style: {
                fontSize:'26px',
                color: '#265ea2',
                cursor: 'pointer'
              }
            })
          ]),
          h('span',{
            on:{
              click: () => {
                this.downArrow(row)
              }
            }
          },[
            h('Icon', {
              props: {
                type: 'arrow-down-b'
              },
              style: {
                marginLeft:'10px',
                fontSize:'26px',
                color: '#265ea2',
                cursor: 'pointer'
              }
            })
          ])
        ])
      }
    }]

    /**
     *  点击冲抵类型获取当前value
     */
    checkMaintain(value){
      this.checkId = value
      this.check()
    }
    /**
     *  查询冲抵项目
     */
    check(){
      this.stagesMatchService.queryStagesMatchPage({type:this.checkId},this.pageService)
        .subscribe( data => {
          this.dataSet = data
        },({msg})=>{
          this.$Message.error(msg)
        })
     }

    /**
     *  向上移动
     */
    upArrow(val){
      this.stagesMatchService.updateStagesMatch({
        remark:val.remark,
        sort:val.sort
      })
      .subscribe( data => {
        this.$Message.success("修改成功！")
      },({msg})=>{
        this.$Message.error(msg)
      })
    }
    /**
     *  向下移动
     */
    downArrow(val){

    }
  }
</script>

<style lang="less" scoped>
  .page.flushing-config {
    .data-form {
      .form-item {
        border: 1px solid #dddee1;
        height: 552px;
        margin-top: 9px;
        .form-item-name {
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          width: 100%;
          background: #f8f8f9;
          height: 41px;
          top: 1px;
          span {
            position: relative;
            top: 10px;
          }
        }
        .form-item-tree {
          overflow: auto;
          height: 524px;
          .data-form-list-template {
            cursor: pointer;
            width: 100%;
            padding-left: 20px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            position: relative;
            margin: auto;
          }
        }
      }
    }
  }
  .maintainCss {
    background: #e4f4fa;
  }
</style>

