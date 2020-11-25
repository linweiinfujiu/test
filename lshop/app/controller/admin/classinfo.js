'use strict';

const Controller = require('egg').Controller;

class ClassinfoController extends Controller {
  async index() {
    const {ctx}=this;
    const departs=await ctx.service.department.all();
    const classinfos=await ctx.service.classinfo.all();
    await ctx.render('admin/classinfo/list',{classinfos,departs})
    
  }
  async toedit(){
    const {ctx}=this;
    const departs=await ctx.service.department.all();
    const {id}=ctx.query;
    if(id){
      const classinfo=ctx.service.classinfo.one(id);
      await ctx.render('admin/classinfo/edit',{classinfo,departs})
    }
    await ctx.render('admin/classinfo/edit',{departs})
  }
  async edit(){
    const {ctx}=this;
    const {id}=ctx.request.body;
    if(id){
       let body=ctx.request.body;
       await ctx.service.classinfo.modify(id,body);
    }
    else{
      let body=ctx.request.body;
      await ctx.service.classinfo.add(body);
    }
    ctx.redirect("/admin/classinfo")

  }
  async delete(){
    const {ctx}=this;
    const {id}=ctx.query;
    if(id){
     await ctx.service.classinfo.delete(id);
    }
    ctx.redirect("/admin/classinfo")
  }
}

module.exports = ClassinfoController;
