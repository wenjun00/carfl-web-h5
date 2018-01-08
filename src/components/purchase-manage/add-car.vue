<template>
  <section class="component add-car">
    <i-row>
      <i-input style="display:inline-block;width:20%;margin-right:10px" placeholder="请输入关键字"></i-input>
      <i-button class="blueButton">搜索</i-button>
    </i-row>
    <i-row style="margin-top:10px;">
      <i-col :span="4" style="border:1px solid #DDDDDD;height:570px;overflow:auto" :class="{open:isShown,close:!isShown}">
        <i-tree :data="categoryData" style="padding:10px;"></i-tree>
      </i-col>
      <i-col :span="20">
        <i-row type="flex" justify="start">
          <i-col class="arrowButton" :span="2">
            <div :class="{arrowDown:!isShown,arrowUp:isShown}" @click="showCategory">
              <Icon type="android-arrow-dropleft-circle" color="white" size="16"></Icon>
            </div>
          </i-col>
          <i-col span="22" style="overflow:auto">
            <div>
              <data-box :columns="carColumns" :data="carData" border stripe></data-box>
            </div>
          </i-col>
        </i-row>
      </i-col>
    </i-row>
    <!--<i-row style="margin-top:20px;">
      <i-button class="blueButton" style="float:right">确认并返回</i-button>
    </i-row>-->
  </section>
</template>

<script lang="ts">
  import Vue from "vue";
  import DataBox from "~/components/common/data-box.vue";
  import Component from "vue-class-component";
  import {
    Prop
  } from "vue-property-decorator";
  import {
    Dependencies
  } from "~/core/decorator";
  import {
    ApplyQueryService
  } from "~/services/business-service/apply-query.service";
  @Component({
    
    components: {
      DataBox
    }
  })
  export default class AddCar extends Vue {
    private isShown: Boolean = true;
    private carColumns: any;
    private carData: Array < Object > = [];
    private categoryData: Array < Object > ;
    @Dependencies(ApplyQueryService) private applyQueryService: ApplyQueryService;
    @Prop() row: Object;
    created() {
      this.categoryData = [{
        title: '所有品牌',
        expand: true,
        children: [{
            title: '别克',
            expand: true,
            children: [{
                title: '君越'
              },
              {
                title: '昂克赛拉',
                expand: true,

              }
            ]
          },
          {
            title: '大众',
            expand: true,
            children: [{
                title: '英朗'
              },
              {
                title: '帕萨特',
                expand: true,
                children: [{
                    title: '英朗'
                  },
                  {
                    title: '帕萨特'
                  }
                ]
              }
            ]
          }
        ]
      }]
      this.carColumns = [{
        type: 'selection',
        align: 'center',
        width: 100
      }, {
        title: '车辆品牌',
        key: 'brand',
        align: 'center'
      }, {
        title: '车辆型号',
        key: 'model',
        align: 'center'
      }, {
        title: '车身颜色',
        key: 'color',
        align: 'center'
      }, {
        title: '车辆排量',
        key: 'output',
        align: 'center'
      }, {
        title: '车辆配置',
        key: 'configuration',
        align: 'center'
      }, {
        title: '上牌地区',
        key: 'area',
        align: 'center'
      }, {
        title: '车辆牌照',
        key: 'license',
        align: 'center'
      }, {
        title: '所在门店',
        key: 'store',
        align: 'center'
      }, {
        title: '状态',
        key: 'status',
        align: 'center'
      }]
      this.applyQueryService.addCarQueryData().subscribe(({
        val
      }) => {
        this.carData = val
        console.log('val', val)
      })
    }
    showCategory() {
      console.log('0000')
      this.isShown = !this.isShown
    }
  }
</script>
<style lang="less" scope>
  .open {
    max-width: auto;
    overflow: hidden;
  }

  .close {
    max-width: 0;
    min-width: 0;
    overflow: hidden;
  }

  .arrowUp {
    transform: rotate(0deg); // transition: transform ease-in 0.2s;
    cursor: pointer;
  }

  .arrowDown {
    transform: rotate(180deg); // transition: transform ease-in 0.2s;
    cursor: pointer;
  }

  .arrowButton {
    line-height: 570px;
    height: 100%;
    background: #265EA2;
    text-align: center;
    width: 20px;
  }
</style>