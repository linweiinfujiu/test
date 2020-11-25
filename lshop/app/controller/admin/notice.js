'use strict';

const Controller = require('egg').Controller;
const {getTimeStamp}=require("../../util/util")
class NoticeController extends Controller {
  async index() {
    const {ctx}=this;
    let notices=await ctx.service.notice.all();
    await ctx.render('admin/notice/list',{notices})
  }
  async toedit(){
    const {ctx}=this;
    const {id}=ctx.query;
    if(id){
        let notice=await ctx.service.notice.one(id);
        await ctx.render('admin/notice/edit',{notice}) 
    }
    else{
        await ctx.render('admin/notice/edit') 
    }
    
  }
  async edit(){
    const {ctx}=this;
    const {id}=ctx.request.body;
    if(id){
        const notice=ctx.request.body;
        notice.update_time=getTimeStamp()
        await ctx.service.notice.modify(id,notice)

    }
    else{
        const notice=ctx.request.body;
        notice.create_time=getTimeStamp()
        notice.update_time=getTimeStamp()
        await ctx.service.notice.add(notice)
    }
    ctx.redirect('/admin/notice')

  }
  async delete(){

  }

}

module.exports = NoticeController;
