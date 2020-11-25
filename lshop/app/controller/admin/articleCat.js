'use strict';

const Controller = require('egg').Controller;

class ArticleCatController extends Controller {
  async index() {
   const {ctx}=this;

   const articleCates=await ctx.service.articleCat.findArticleCates();
   await ctx.render('/admin/articlecate/list',{articleCates})
  }
  async toedit(){
    const {ctx}=this;
    const {id}=ctx.query;
    
    if(id){
     let articlecate= await ctx.service.articleCat.one(id);
     console.log(articlecate);
     await ctx.render('/admin/articlecate/edit',{articlecate});
    }
    else{
    await ctx.render('/admin/articlecate/edit');
  }
  }
  async edit(){
    const {ctx}=this;
    let {cat_id}=ctx.request.body;
    if(cat_id){
      let body=ctx.request.body;
      await ctx.service.articleCat.modify(cat_id,body);
    }
    else{
      let body=ctx.request.body;
      await ctx.service.articleCat.add(body);
    }
    ctx.redirect('/admin/articlecate')
  }
  async delete(){
    const {ctx}=this;
    let {id}=ctx.query;
    if(id){
      await ctx.service.articleCat.delete(id);
    }
    ctx.redirect('/admin/articlecate')
  }
  async child(){
    const {ctx}=this;
    const {parent_id}=ctx.query;
    let articlecate={};
    articlecate.parent_id=parent_id;
    await ctx.render('/admin/articlecate/edit',{articlecate});
  }
}

module.exports = ArticleCatController;
