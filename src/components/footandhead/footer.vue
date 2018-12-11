<template>
		<!--<ul class="footer-container">-->
			<!--<li><router-link to="/"><i class="iconfont  icon-bottom" :class="{'icon-shouye01':ishome,'icon-shouye02':!ishome}"></i>首页</router-link>-->
			<!--</li>-->
			<!--<li><router-link to="/category"><i class="iconfont icon-bottom" :class="{'icon-classify-red':iscategory,'icon-classify':!iscategory}"></i>分类</router-link>-->
			<!--</li>-->
			<!--<li>-->
				<!--<router-link to="/rank"><i :class="{'icon-shuxingliebiaoxiangqing2':isbookrank,'icon-shuxingliebiaoxiangqing':!isbookrank}" class="iconfont icon-bottom"></i>排名</router-link>-->
			<!--</li>-->
			<!--<li>-->
				<!--<router-link to="/me"><i :class="{'icon-wode1':isme,'icon-wode':!isme}" class="iconfont icon-bottom"></i>我的</router-link>-->
			<!--</li>-->
		<!--</ul>-->

<div class="footer-container">
    <mu-bottom-nav color="#FF0000" :value.sync="shift">
      <mu-bottom-nav-item to="/store" title="书城" value="书城" icon="home"></mu-bottom-nav-item>
      <mu-bottom-nav-item to="/category" title="分类" value="分类" icon="dashboard"></mu-bottom-nav-item>
      <mu-bottom-nav-item to='/me' title="书架" value="书架" icon="library_books"></mu-bottom-nav-item>
      <mu-bottom-nav-item to="/rank" title="排行榜" value="排行榜" icon="person"></mu-bottom-nav-item>
    </mu-bottom-nav>
</div>


</template>
<script type="text/javascript">
	export default{
		data(){
			return{
        shift: '书城',
			}
		},
		methods:{

		},
		props: {

    }
	}
</script>
<style type="text/css">
  .footer-container{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
