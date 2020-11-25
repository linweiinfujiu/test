'use strict';

const {getTimeStamp}=require("../../util/util")
const Controller = require('egg').Controller;
/**
 * @controller ArticleController
 */
class ArticleController extends Controller {
   /** 
    * @summary  查询文章信息。
    * @description 查询文章全部信息。
    * @router get /article 
    * @response 200 JsonResult  返回结果
    */
  async index() {
    const {ctx}=this;
    const articlecates=await ctx.service.articleCat.all();
    const articles=await ctx.service.article.findArticles();;
    console.log(articles)
    
    await ctx.render('admin/article/list',{articles,articlecates})
  }
  async toedit(){
    const {ctx}=this;
    const {id}=ctx.query;
    const articlecates=await ctx.service.articleCat.all();
    if(id){
     let article= await  ctx.service.article.one(id);
     await ctx.render('admin/article/edit',{article,articlecates});
    }
    else{
      await ctx.render('admin/article/edit',{articlecates});
    }
    
  }
  async edit(){
    const {ctx}=this;
    const {article_id}=ctx.request.body;
    if(article_id){
     let body=ctx.request.body;
     body.publish_time=getTimeStamp();
     await ctx.service.article.modify(article_id,body);
    }
    else{
      let body=ctx.request.body;
      body.add_time=getTimeStamp();//获得当前时间戳
      await ctx.service.article.add(body);
    }
    ctx.redirect("/admin/article")
  }
  async delete(){
    const {ctx}=this;
    const {id}=ctx.query;
    if(id){
      await ctx.service.article.delete(id);
    }
    ctx.redirect("/admin/article")
  }
 

  
}

module.exports = ArticleController;
