'use strict';

const Controller = require('egg').Controller;
const {
  getTimeStamp,RESULT
} = require('../../util/util');
class ArticleController extends Controller {
  async toArticle() {
      const {ctx}=this;
      //文章列表
      // 获取老师创建的所有文章编号article_id user_article
      let teacher=ctx.session.teacher;

      //文章状态

      let statuses=[
        {id:0,name:'下线'},
        {id:1,name:'上线'},
      ]
      let checkeds=[
        {id:0,name:'正在审核'},
        {id:1,name:'已审核'}
      ]
      
      let articleIds=await ctx.service.userArticle.findArticleIdsByUserId(teacher.id);

      let articles;
      if(articleIds&&articleIds.length>0){
        let ids=[];
        articleIds.forEach(element => {
          ids.push(element.article_id);
        });
        articles=await ctx.service.article.findArticlesByIds(ids);
      }
      else{
        articles=0;  
      }
      // 通过文章编号获取文章列表 article
      //let articles=await ctx.service.artcle.find
      await ctx.render('front/teacher/article/list',{teacher,articles,statuses,checkeds})
    
  }
  async toArticleCreate(){
    const {ctx}=this;
    let teacher=ctx.session.teacher;
    let where={
        show_in_nav:1
    }
    let opens=[
        {id:0,name:'私有'},
        {id:1,name:'公开'}
    ]
    let openTypes=[
        {id:0,name:'无限制'},
        {id:1,name:'会员'},
        {id:2,name:'关注'},
    ]

    let articlecates=await ctx.service.articleCat.findArticleCates(where);
    await ctx.render('front/teacher/article/create',{teacher,articlecates,opens,openTypes})
  }
  async articleCreate(){
    const {ctx}=this;
    let teacher=ctx.session.teacher;
    let {article_id} =ctx.request.body;
    if(article_id){
      let article =ctx.request.body;
      article.publish_time=getTimeStamp();
      await ctx.service.article.modify(id,article);
    }
    else{
      let article =ctx.request.body;
      article.publish_time=getTimeStamp();
      article.add_time=getTimeStamp();
      article=await ctx.service.article.add(article);

      //user_article
      let user_article={
        user_id:teacher.id,
        article_id:article.article_id,
        usertype:2
      }
      await ctx.service.userArticle.add(user_article);
    }
    ctx.redirect("/home/teacher/article")
    
  }

  async articleUpdate(){


  }
}

module.exports = ArticleController;
