'use strict';

const Controller = require('egg').Controller;

class FriendlinkController extends Controller {
  async index() {
      const {ctx}=this;
      await ctx.render('admin/friendlink/list')
  }
  async toedit(){
    const {ctx}=this;
    const {id}=ctx.query;
    if(id){
        let friendlink=await ctx.service.friend_link.one(id);
        await ctx.render('admin/friendlink/edit',{friendlink})
    }
    else{
        await ctx.render('admin/friendlink/edit')
    }
  }
  async edit(){
      const {ctx}=this;
      const {id}=ctx.request.body;
      const body=ctx.request.body;
      if(id){
        await ctx.service.friend_link.modify(id,body)
      }
      else{
          await ctx.service.friend_link.add(body);
      }
      ctx.redirect('/admin/friendlink');

  }
  async delete(){
      const {ctx}=this;
      const {id}=ctx.query;
      if(id){
        await ctx.service.friend_link.delete(id);
      }
      ctx.redirect('/admin/friendlink');
  }
}

module.exports = FriendlinkController;
