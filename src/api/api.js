import qs from 'querystring'
import fetch from '@/axios/fetch'

import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';


//获取带书籍数量的父分类
// const baseURL='http://api.zhuishushenqi.com/';
//'/api/ '/api/
//手机端没有跨域问题,所以打包后要在url前加上baseURL,把/api去掉
export function getCategories(){
  return fetch({
    url: '/api/cats/lv2/statistics',
  })
}

//获取排名分类
export function getRankCategory(){
  return fetch({
    url: '/api/ranking/gender',
  })
}

//获取带子分类的分类
export function  getSubCategory(){
  return fetch({
    url: '/api/cats/lv2',
  })
}

//获取分类详情
export function getCategoryInfo(category_type){
  let query = qs.stringify(category_type);
  return fetch({
    url: '/api/book/by-categories?' + query,
  })
}

/*//获取书籍详情
export function getBookInfo(id){
  return fetch({
    url: '/api/book/'+id,
  })
}*/

//获取书籍相关推荐
export function  getRecommend(id){
  return fetch({
    url: '/api/book/'+id+'/recommend',
  })
}

//获取作者名下的书籍
export function getAuthorBook(author){
  let author_query = qs.stringify(author);
  return fetch({
    url:'/api/author-books?'+author_query,
  })
}

//获取书籍源
export function getBookSources(bookid){
  let book_source = qs.stringify(bookid);
  return fetch({
    url: '/api/atoc?'+book_source,
  })
}

//获取书籍章节
export function  getChapter(id){
  return fetch({
    url: '/api/atoc/'+id+'?view=chapters',
  })
}

//获取章节详细内容
export function getBookChapter(link){
  return fetch({
    url:'/content/chapter/'+link,
    // url:'http://chapterup.zhuishushenqi.com/chapter/'+link,
  })
}

//获取搜索结果
export function getSearchResult(word){
  let query = qs.stringify(word);
  return fetch({
    url:'/api/book/fuzzy-search?'+query,
  })
}

//获取热搜词
export function getSearchHotwords(){
  return fetch({
    url: '/api/book/search-hotwords',
  })
}

//获取排名详情
export function getRank(categoryid){
  return fetch({
    url:'/api/ranking/'+categoryid,

  })
}

export function getBanner(){
  return new Promise(async (resolve,reject)=>{
    try{
      axios(getPostOption("lobby.banner",{})).then( (response)=>{
        const data = handlData(response.data);
        resolve( data )
      } )
    }catch (err){
      reject(err);
    }
  });
}

export function getNotice(){
  return new Promise(async (resolve,reject)=>{
    try{
      axios(getPostOption("lobby.notice",{})).then( (response)=>{
        const data = handlData(response.data);
        resolve( data )
      } )
    }catch (err){
      reject(err);
    }
  });
}

export function getGroup(){
  return new Promise(async (resolve,reject)=>{
    try{
      axios(getPostOption("lobby.group",{})).then( (response)=>{
        const data = handlData(response.data);
        resolve( data );
      } );
    }catch (err){
      reject(err);
    }
  });
}

export function getBookInfo( bookID ){
  return new Promise(async (resolve,reject)=>{
    try{
      axios(getPostOption("book.info",{ id: bookID })).then( (response)=>{
        const data = handlData(response.data);
        resolve( data );
      } );
    }catch (err){
      reject(err);
    }
  });
}

export function getBoosInfoList( books ){
  return new Promise(async (resolve,reject)=>{
    try{
      axios(getPostOption("book.infoList",{ books: books })).then( (response)=>{
        const data = handlData(response.data);
        resolve( data );
      } );
    }catch (err){
      reject(err);
    }
  });
}

export function getChapters( bookID ){
  return new Promise(async (resolve,reject)=>{
    try{
      axios(getPostOption("book.chapters",{ id: bookID })).then( (response)=>{
        const data = handlData(response.data);
        resolve( data );
      } );
    }catch (err){
      reject(err);
    }
  });
}

export function recommendBooks( bookID ){
  return new Promise(async (resolve,reject)=>{
    try{
      axios(getPostOption("book.recommendBooks",{ id: bookID })).then( (response)=>{
        const data = handlData(response.data);
        resolve( data );
      } );
    }catch (err){
      reject(err);
    }
  });
}

export function getContent( bookID , chapter){
  return new Promise(async (resolve,reject)=>{
    try{
      axios(getPostOption("book.content",{ id: bookID , chapter: chapter })).then( (response)=>{
        const data = handlData(response.data);
        resolve( data );
      } );
    }catch (err){
      reject(err);
    }
  });
}

function getPostOption( method, data ){
  return {
    method: 'post',
    url: '/api',//'http://127.0.0.1:6403/api',//
    data: {
      method:method,
      data:data
    }
  }
}

function handlData( data ){
  if( data.code === 1 ){
    return data.data;
  }else{
    throw new Error(data.msg);
  }
}




