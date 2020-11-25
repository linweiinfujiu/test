'use strict';

const Controller = require('egg').Controller;

class FolderController extends Controller {
  async index() {
    const {ctx}=this;
    const folders=await ctx.service.folder.all()
    await ctx.render('admin/folder/index',{folders})
    
  }
  async toedit(){
    const {ctx}=this;
    let id=ctx.query.id;
    if(id){
      const folder=await ctx.service.folder.one(id);
      await ctx.render('admin/folder/edit',{folder})
    }
    else{
      await  ctx.render('admin/folder/edit')
    }


  }
  async edit(){
    const {ctx}=this;
    const {id}=ctx.request.body;
    let folder= ctx.request.body;
    console.log(folder)
    if(id){
      await ctx.service.folder.modify(id,folder);
    }
    else{
      folder=await ctx.service.folder.add(folder);
    }

    await ctx.redirect('/admin/folder')
  }
  
  async delete(){
    const {ctx}=this;
    let id=ctx.query.id;
    await ctx.service.folder.delete(id);
    await ctx.redirect('/admin/folder')
  }
}

module.exports = FolderController;
