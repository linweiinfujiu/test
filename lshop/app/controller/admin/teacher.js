'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
class TeacherController extends Controller {
  async index() {
    const {ctx}=this;
    let teachers=await ctx.service.teacher.all();
    let departs=await ctx.service.department.all()
    let statuses=[
      {id:1,name:'在校'},
      {id:1,name:'离校'},
      {id:1,name:'退休'},
      {id:1,name:'返聘'},
      {id:1,name:'其他'},
    ]
    await ctx.render('admin/teacher/list',{teachers,departs,statuses});
    
  }
  async toedit(){
    const {ctx}=this;
    let professionals=['助教','讲师','副教授','教授']
    let statuses=[
      {id:1,name:'在校'},
      {id:2,name:'离校'},
      {id:3,name:'退休'},
      {id:4,name:'返聘'},
      {id:5,name:'其他'},
    ]
    let departs= await ctx.service.department.all();
    let {id}=ctx.query;
    if(id){
      let teacher=await ctx.service.teacher.one(id);
      await ctx.render('admin/teacher/edit',{statuses,departs,teacher,professionals});
    }
    else{
      await ctx.render('admin/teacher/edit',{statuses,departs,professionals});
    }
   
  }
  async edit(){
    const {ctx,app}=this;
    const {id}= ctx.request.body
    let body = ctx.request.body;
    if(id){
      await ctx.service.teacher.modify(id,body);
    }
    else{
    let salt=app.config.salt;
    const password=crypto.createHmac('sha256',salt).update('66666666').digest('hex')
    body.password=password;
    await ctx.service.teacher.add(body);
   }
   ctx.redirect('/admin/teacher');
  }
  async delete(){
    const {ctx}=this;
    const {id}= ctx.request.body
    if(id){
     await ctx.service.teacher.delete(id);
    }
    ctx.redirect('/admin/teacher');

  }

}

module.exports = TeacherController;
