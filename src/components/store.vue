<template>
  <div class="index-container">
    <keep-alive>
      <div class="index-main-box">
        <div class="index-scroll-view" ref="indexview">
          <mt-search
            v-model="keywords"
            cancel-text="取消"
            placeholder="可搜书名和作者"
            class="store-search"
            @keyup.native.enter="search(keywords)"
          >
          </mt-search>
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="banner in swiperList" :key="banner.book">
              <router-link :to="{'name':'bookinfo',params:{bookid:banner.book}}" class="fix">
                <img v-lazy="banner.img">
              </router-link>
            </mt-swipe-item>
          </mt-swipe>
          <div class="notice" v-if="noticeList.length > 0">
            <div class="notice-wrap" :class="{anim:animate==true}">
              <div class="notice-con" v-for="notice in noticeList" :key="notice._id">
                <mu-icon class="reader-icon-tabs notice-icon" value="notifications_active">通知</mu-icon>
                <span class="notice-content">{{notice.content}}</span>
              </div>
            </div>
          </div>
          <div class="book-groups">
            <div class="group-con" v-for="groupData in groupList" :key="groupData._id">
              <div class="group-title">{{groupData.title}}</div>
              <div class="book-group">
                <div class="book-item" v-for="bookData in groupData.books" :key="bookData._id">
                  <router-link :to="{'name':'bookinfo',params:{bookid:bookData._id}}" class="fix">
                  <img v-lazy="bookData.images">
                  <div class="book-title">{{bookData.name}}</div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </keep-alive>
  </div>
</template>


<script>
  import indexHeader from './footandhead/header'
  import {getBanner,getNotice,getGroup} from "../api/api"
  import '../assets/store.css'

  export default{
    components:{
      'm-head':indexHeader
    },
    data(){
      return {
        swiperList:[],
        noticeList:[],
        groupList:[],
        animate:false,
        keywords:"",
        noticeActiveIndex:0
      }
    },
    methods:{
      scroll(){
        this.animate=true;
        setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.noticeList.push(this.noticeList[0]);  // 将数组的第一个元素添加到数组的
          this.noticeList.shift();               //删除数组的第一个元素
          this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        },2000)
      },
      search(keywords){
        this.$router.push({//你需要接受路由的参数再跳转
          path: "/search",
          query: {
            keyword: keywords
          }
        });
      }
    },
    created(){
      getBanner().then(bannerList=>{
        this.swiperList = bannerList;
      });
      getNotice().then(noList=>{
        this.noticeList = noList;
      });
      getGroup().then(groupList=>{
        this.groupList = groupList;
      });
      setInterval( this.scroll, 4000);
    }
  }

</script>
<style scoped>

  body a{
    margin:0;
    color: #555;
  }
  .mint-swipe-item img{
    width: 100%;
  }
  .index-main-box{
    height: 100vh;
    overflow: hidden;
    padding-bottom: 56px;
  }
  .index-scroll-view{
    overflow-y: scroll;
    height:100%;
    background-color: #eeeeee;
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
  .notice{
    font-size: 12px;
    height: 30px;
    color: red;
    overflow: hidden;
    background-color: #fffcf5;
    margin-bottom: 5px;
  }
  .notice-icon{
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    padding-left: 5px;
    display: inline-block;
    float: left;
  }
  .notice-content{
    display: inline-block;
  }
  .notice-wrap{
    width: 100%;
    height: 30px;
    position: relative;
  }
  .notice-con{
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  .anim{
    transition: margin-top 2s;
    margin-top: -30px;
  }
  .book-groups{

  }
  .book-group{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 5px;
  }
  .book-item{
    width: 33.33%;
    padding: 5px;
  }
  .book-item img{
    width: 100%;
    border-radius: 5px;
  }
  .group-con{
    width: 100%;
    background-color: white;
  }
  .group-title{
    padding-top: 5px;
    padding-left: 10px;
    font-size: 2.1rem;
  }
  .book-title{
    font-size: 1.7rem;
    color: #5a5a5a;
    padding-top: 3px;
    padding-bottom: 3px;
  }
</style>
