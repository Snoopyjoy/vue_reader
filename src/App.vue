<template>
  <div id="app">
      <keep-alive >
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <m-foot id="foot" ></m-foot>
  </div>
</template>

<script>
  import footer from './components/footandhead/footer'

  let deviceWidth = document.documentElement.clientWidth;
  if(deviceWidth > 640) deviceWidth = 640;
  document.documentElement.style.fontSize = deviceWidth / 45 + 'px';

  export default {
    components:{
      'm-foot':footer,
    },
    data(){
      return{
        isbutton:true
      }
    },
    name: 'app',
    methods:{
      isbtn(){
        this.isbutton=false;
      },
    }
  }
</script>

<style>
  #app{

  }
  .slide-enter-active,.slide-leave-active{
    transition:transform 0.5s;
  }
  .slide-enter,.slide-leave-to{
    transform:translate3d(-100vw,0px,0px);
  }

  .btn{
    display: block ;
    width: 100%;
    height: 100vh;
    text-align: center;
    background: black;
    color: white;
    font-size: 20px;
  }
</style>
