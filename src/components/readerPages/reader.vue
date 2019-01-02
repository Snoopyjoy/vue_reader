<template>
<transition name="readerslide">
	<div class="reader-container" @touchstart="checkStart" @touchmove="checkmove" @touchend="oprationAction">
			<reader-content :bookContent='chapterContent' :Title="Title"></reader-content>
			<reader-menu @prev="chapterUp" @next="chapterDown" :isMenuShow="ismenushow" :Now="currentChapter+1" :Total="Total"></reader-menu>
			<reader-catalog @ChangeChapter="goChapter" :catlog="chapters" :Total="Total"></reader-catalog>
	</div>
</transition>
</template>
<script type="text/javascript">
import readercontent from './reader-content'
import readermenu from './reader-menu'
import readercatalog from './reader-catalog'
import {Indicator,MessageBox,Toast} from 'mint-ui'
import util from '../../api/util'
import {getChapters,getContent} from '../../api/api'
export default{

	beforeRouteLeave(to,from,next){
		let localShelf = util.getLocalData('myfollowbook')?util.getLocalData('myfollowbook'):{};
		if(!localShelf[this.$route.params.bookid]||localShelf[this.$route.params.bookid].isTemporary){
			MessageBox.confirm('是否加入收藏','加入收藏').then(()=>{
				localShelf[this.$route.params.bookid]={
					cover:this.$store.state.BookInfo.cover,
					title:this.$store.state.BookInfo.title,
					lastChapter:this.currentChapter,
					position:document.getElementById('reader-page-view').scrollTop,
					source:this.$store.state.SourceId,
          isTemporary: false,
				}
        util.setLocalData('myfollowbook',localShelf);
        this.$store.commit('SetSourceId',false)
        next()
			}).catch(()=>{
				this.$store.commit('SetSourceId',false)
        next()
				})
      document.getElementById("foot").style.display="block";
      if(localShelf[this.$route.params.bookid].isTemporary){
        delete localShelf[this.$route.params.bookid];
      }
      util.setLocalData('myfollowbook',localShelf);

		}else{
			localShelf[this.$route.params.bookid]={
					cover:this.$store.state.BookInfo.cover,
					title:this.$store.state.BookInfo.title,
					lastChapter:this.currentChapter,
					position:document.getElementById('reader-page-view').scrollTop,
					source:this.$store.state.SourceId
				}
			util.setLocalData('myfollowbook',localShelf);
			this.$store.commit('SetSourceId',false)
      document.getElementById("foot").style.display="block";
			next()
		}
	},
	data(){
		return{
			ismenushow:false,
			ismove:false,
			chapters:[],
			currentChapter:0,
			chapterContent:{},
			sources:{},
			Title:'',
			Total:0,
      startX:[],
      X:0,
		}
	},
	components:{
		'reader-content':readercontent,
		'reader-menu':readermenu,
		'reader-catalog':readercatalog
	},
 created(){
   this.getChapters();
   document.getElementById("foot").style.display="none";
 },
	watch:{
		'currentChapter':'getChapterContent',
	},
	methods:{
		getChapters(){
			Indicator.open()
		let localShelf=util.getLocalData('myfollowbook')?util.getLocalData('myfollowbook'):{};
			getChapters(this.$route.params.bookid).then(chapters=>{
				this.chapters = chapters;
				this.currentChapter = localShelf && localShelf[this.$route.params.bookid] && localShelf[this.$route.params.bookid].lastChapter ? localShelf[this.$route.params.bookid].lastChapter : 0;
				this.getChapterContent();
			})
		},
		getChapterContent(){
			let lastChapter = this.currentChapter>this.chapters.length - 1 ? this.chapters.length - 1 :this.currentChapter;
      getContent( this.$route.params.bookid, lastChapter+1 ).then(data=>{
				this.chapterContent = data.content;
				this.Title = this.chapters[this.currentChapter];
				this.Total = this.chapters.length - 1 ;
 				document.getElementById('reader-page-view').scrollTop=0;
				Indicator.close();
			}).catch(err=>{
				console.log(err)
				Toast('获取章节失败')
				Indicator.close();
			})
		},
		checkStart(el){

      let view = document.getElementById('reader-page-view');
			this.ismove = false;
      this.startX = el.changedTouches[0].pageX;
      this.startY = el.changedTouches[0].pageY;
      this.startYpos = view.scrollTop;
		},
		checkmove(el){
      let view = document.getElementById('reader-page-view');
			this.ismove = true;
      let moveEndX = el.changedTouches[0].pageX;
      let moveEndY = el.changedTouches[0].pageY;
        view.scrollTop = this.startYpos + this.startY - moveEndY;

      this.X = moveEndX - this.startX;
      el.preventDefault();
		},
		oprationAction(el){
      let view = document.getElementById('reader-page-view');
      let screenHeight =document.body.clientHeight;
      let screenWidth =document.body.clientWidth;
      let Wside = screenWidth/3;
      let Hside = screenHeight/3;
			if(!this.ismove){
				let touchPointX = el.changedTouches[0].pageX;
				let touchPointY = el.changedTouches[0].pageY;
				if(touchPointX>0 &&touchPointX<Wside && this.ismenushow==false){
					this.ismenushow=false
					view.scrollTop -= screenHeight;
				}else if(touchPointX>Wside && touchPointX<screenWidth-Wside &&touchPointY>Hside && touchPointY<screenHeight-Hside){
					this.ismenushow=!this.ismenushow;
				}else if(touchPointX<screenWidth && touchPointX>screenWidth-Wside && this.ismenushow==false){
					this.ismenushow=false;
					if(view.scrollHeight == view.scrollTop+screenHeight){
						this.currentChapter++;
					}
					view.scrollTop += screenHeight;
				}
			}
		},
		goChapter(num){
			this.currentChapter = num;
			this.$store.commit('ChangeDetail')
			this.ismenushow=false;
		},
		chapterUp(){
			if(this.currentChapter == 0){
				Toast('当前章节为第一章');
				return
			}
			this.currentChapter -= 1;
		},
		chapterDown(){
			if(this.currentChapter >= this.chapters.length - 1){
				this.currentChapter = this.chapters.length - 1;
				Toast('后面已经没有了');
				return
			}
			this.currentChapter += 1;
		}
	}
}
</script>
<style type="text/css">
	.readerslide-enter-active{
		transition-duration: .5s;
	}
	.readerslide-enter{
		transform:translate3d(100vw,0,0);
	}
	.reader-container{
     position: relative;
   }
  .reader-container a{
   color: white;
  }
</style>
