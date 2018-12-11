<template>
  <div class="index-container">
    <keep-alive>
      <div class="index-main-box">
        <div class="index-scroll-view" ref="indexview">
          <mt-search
            v-model="value"
            cancel-text="取消"
            placeholder="可搜书名和作者">
          </mt-search>
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="banner in swiperList" :key="banner.book">
              <img v-lazy="banner.link">
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </keep-alive>
  </div>
</template>


<script>
  import indexHeader from './footandhead/header'

  import {getBanner} from "../api/api"

  export default{
    components:{
      'm-head':indexHeader
    },
    props:["value"],
    data(){
      return {
        swiperList:[]
      }
    },
    created(){
      getBanner().then(bannerList=>{
        this.swiperList = bannerList;
      })
    }
  }

</script>
<style>

  body a{
    margin:0;
    color: #555;
  }
  .mint-searchbar{
    background-color: red;
  }
  .mint-searchbar-cancel{
    color: white;
  }
  .mint-searchbar-inner{
    border-radius: 5px;
  }
  .mint-swipe-item img{
    width: 100%;
  }
  .index-main-box{
    height: 100vh;
    overflow: hidden;
    padding-bottom: 90px;
  }
  .index-scroll-view{
    overflow-y: scroll;
    height:97.5%;
  }
  .mint-search{
    height: auto;
  }
  .mint-swipe{
    width: 45rem;
    height: 17.12rem;
    margin-left: auto;
    margin-right: auto;
  }
</style>
