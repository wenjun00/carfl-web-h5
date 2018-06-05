<template >
  <section class="component trademark">
    <img v-for="(item,index) of trademarkList" @click="Allcar(index)" :key="index" :src="item.img" height="60px" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";

@Component({})
export default class Trademark extends Vue {

  get trademarkList() {
    let list = this.trademarks.slice(0, 9)
    list.push({
      img: "/static/images/home/trademarks/all.png",
      name: "全部新车"
    })
    return list
    
  }
  Allcar(val){
    console.log(this.trademarkList)
    if(val == 9){
      this.$router.push('/allVehicles')
    }else{
      this.$router.push('/buy-car-list')
    }
    
  }


  private trademarks = [
    {
      img: "/static/images/home/trademarks/xuefulan.png",
      name: "雪佛兰"
    },
    {
      img: "/static/images/home/trademarks/xuefulan.png",
      name: "雪佛兰"
    },
    {
      img: "/static/images/home/trademarks/xuefulan.png",
      name: "雪佛兰"
    },
    {
      img: "/static/images/home/trademarks/xuefulan.png",
      name: "雪佛兰"
    },
    {
      img: "/static/images/home/trademarks/xuefulan.png",
      name: "雪佛兰"
    },
    {
      img: "/static/images/home/trademarks/xuefulan.png",
      name: "雪佛兰"
    }, {
      img: "/static/images/home/trademarks/xuefulan.png",
      name: "雪佛兰"
    },
    {
      img: "/static/images/home/trademarks/xuefulan.png",
      name: "雪佛兰"
    },
    {
      img: "/static/images/home/trademarks/xuefulan.png",
      name: "雪佛兰"
    }, {
      img: "/static/images/home/trademarks/xuefulan.png",
      name: "雪佛兰"
    },
    {
      img: "/static/images/home/trademarks/xuefulan.png",
      name: "雪佛兰"
    },
    {
      img: "/static/images/home/trademarks/xuefulan.png",
      name: "雪佛兰"
    }
  ]

}

</script>

<style lang="less" scoped>
.trademark {
}
</style>


