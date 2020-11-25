'use strict';

const Controller = require('egg').Controller;

class MajorController extends Controller {
  async index() {
    const {ctx}=this;
    const departs=await ctx.service.department.all();
    const majors=await ctx.service.major.all();
    await ctx.render('admin/major/list',{majors,departs})  
  }
  async toedit(){
    const {ctx}=this;
    const departs=await ctx.service.department.all();
    const {id}=ctx.query;
    
    if(id){
       const major=await ctx.service.major.one(id);
       console.log(major);
       await ctx.render('admin/major/edit',{major,departs});
    }
    else{
    await ctx.render('admin/major/edit',{departs});
  }
  }
  async edit(){
    const {ctx}=this;
    const {id}=ctx.request.body;
    if(id){
      const body=ctx.request.body;
     
      await ctx.service.major.modify(id,body)
    }
    else{
      const body=ctx.request.body;
      
      await ctx.service.major.add(body)
    }
    ctx.redirect("/admin/major");

  }
  async delete(){
    const {ctx}=this;
    const {id}=ctx.query;
    if(id){
      await ctx.service.major.delete(id);
    }
    ctx.redirect("/admin/major");
  }
}

module.exports = MajorController;
