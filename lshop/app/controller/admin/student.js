'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
class StudentController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    //学生信息
    let students = await ctx.service.student.all();
    //部门信息
    let departs = await ctx.service.department.all();
    //专业信息
    let majors = await ctx.service.major.all();

    let classinfos = await ctx.service.classinfo.all();

    await ctx.render('admin/student/list', {
      students,
      departs,
      majors,
      classinfos
    });
  }
  async toedit() {
    const {
      ctx
    } = this;
    
    //部门信息
    //学生状态 退学、锁定、在校、毕业 、休学
    let statuses = [{
        id: 1,
        name: '在校'
      },
      {
        id: 2,
        name: '休学'
      },
      {
        id: 3,
        name: '退学'
      },
      {
        id: 4,
        name: '毕业'
      },
      {
        id: 5,
        name: '锁定'
      }
    ]

    const {id}=ctx.query;

    if(id){
      let departs = await ctx.service.department.all();
      let student=await ctx.service.student.one(id);
      let majors=await ctx.service.major.findMajorsByDepartId(student.depart_id);

      let classinfos= await ctx.service.classinfo.findClassinfosByDepartId(student.depart_id);
      await ctx.render('admin/student/edit', {
        student,
        departs,
        statuses,
        majors,
        classinfos
      });
    }
    else{
      let departs = await ctx.service.department.all();
      await ctx.render('admin/student/edit', {
        departs,
        statuses
      });
    }

    
  }
  async edit() {
    const {
      ctx,app
    } = this;
    const {
      id
    } = ctx.request.body;
    if (id) {
      let body = ctx.request.body;
     await ctx.service.student.modify(id, body);
    } else {
      let body = ctx.request.body;
      let salt=app.config.salt;
      const password=crypto.createHmac('sha256',salt).update('88888888').digest('hex')
     // console.log(password)
      body.password=password;
     
     await ctx.service.student.add(body);
    }

    ctx.redirect('/admin/student');
  }
  async delete() {
    const {
      ctx
    } = this;
    ctx.redirect('/admin/student');
  }
}

module.exports = StudentController;