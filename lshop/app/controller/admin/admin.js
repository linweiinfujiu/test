'use strict';

const Controller = require('egg').Controller;
const {getTimeStamp} =require('../../util/util');
const crypto = require('crypto');
class AdminController extends Controller {
  async index(){
    const {ctx}=this;
    let statuses=[
      {id:1,name:'激活'},
      {id:0,name:'未激活'},
    ]
    let admins=await ctx.service.admin.all();
    await ctx.render('admin/admin/list',{admins,statuses})
  }
  async toedit(){
    const {ctx}=this;
    const {id}=ctx.query;
    let statuses=[
      {id:1,name:'激活'},
      {id:0,name:'未激活'},
    ]
    if(id){
      let admin=await ctx.service.admin.one(id);
      await ctx.render('admin/admin/edit',{admin,statuses})
    }
    else{
      await ctx.render('admin/admin/edit',{statuses})
    }

    
  }
  async edit(){
    const {ctx,app}=this;
    const {admin_id}=ctx.request.body;
    if(admin_id){
      let admin=ctx.request.body;
      await ctx.service.admin.modify(admin_id,admin);
    }
    else{
      let admin=ctx.request.body;
      let salt=app.config.salt;
      const password=crypto.createHmac('sha256',salt).update('88888888').digest('hex')
      admin.password=password;
      admin.add_time=getTimeStamp();
      admin.last_login=getTimeStamp();
      admin.last_ip=ctx.ip;
      await ctx.service.admin.add(admin);
    }
    ctx.redirect('/admin/index');
  }
  async delete(){
    const {ctx}=this;
    const {id}=ctx.query;
    if(id){
      await ctx.service.admin.delete(id);
    }
    ctx.redirect('/admin/index');

  }
  async findLogsByAdmin(){
    const {ctx}=this;
    let admin=ctx.session.admin;
    const {id}=ctx.query;
    let logs= await ctx.service.adminLog.findLogsByAdminId(id);
    await ctx.render('admin/admin/log',{logs,admin})
  }
  



}

module.exports = AdminController;
