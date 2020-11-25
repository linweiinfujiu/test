'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
const {Op}=   require('sequelize');
const {
  getTimeStamp,RESULT
} = require('../../util/util');
class StudentController extends Controller {
  async center() {
      const {ctx,app}=this;
      //访问路径
      // let paths=[];
      // for(let i=0;i<app.router.stack.length;i++){
      //    paths.push(app.router.stack[i].path) 
         
      //    console.log(app.router.stack[i].methods)//获得请求方式get /post
      // }
     // console.log(paths);
      let student=ctx.session.student;
      await ctx.render('front/student/index',{student});
  }
  async toProject(){
    const {ctx}=this;
    let student=ctx.session.student;
    //可以加入的项目 enroll=1
    let statuses = [{
      id: 1,
      name: '准备'
    }, {
      id: 2,
      name: '运行'
    }, {
      id: 3,
      name: '完成'
    }]

//可以参加的醒目
    let enroll_projects=await ctx.service.project.findProjectsByEnroll();
    for(let i=0;i<enroll_projects.length;i++){
        if(enroll_projects[i].students){
          let studentIds=enroll_projects[i].students.split(',');
          let joined_students=await ctx.service.student.findStudentsByIds(studentIds);
          enroll_projects[i].joined_students=joined_students;
        }
    }
    //已经加入的项目
    let student_have_projects=await ctx.service.project.findProjectByStudentId(student.id);
    //受邀加入的项目
    let eps=await ctx.service.enrollProject.findEnrollProjectsByStudentId(student.id);
    if(!(eps&&eps.length>0)){
     eps=0;
    }
    await ctx.render('front/student/project',{student,enroll_projects,student_have_projects,statuses,eps});
    

  }
  async toConfig(){
    const {ctx}=this;
      let student=ctx.session.student;
      //获取部门
      let depart=await ctx.service.department.one(student.depart_id);
      //获取专业
      let major= await ctx.service.major.one(student.major_id);
      //获取班级
      let classinfo= await ctx.service.classinfo.one(student.classmate_id);

      await ctx.render('front/student/config',{student,depart,major,classinfo});
  }
  async toSelectStudents(){
    const {ctx}=this;
    //获取部门
    let departs=await ctx.service.department.findDeparts();
    let teacher = ctx.session.teacher;
    let {depart_id,classmate_id,student_name,student_no,projectId}=ctx.query;
    let where={}
    if(depart_id){
      where.depart_id=depart_id;
    }
    if(classmate_id){
      where.classmate_id=classmate_id;
    }
    if(student_name){
      let oplike={
        [Op.like]:`%${student_name}%`
      }
      where.student_name=oplike;
    }
    if(student_no){
      where.student_no=student_no;
    }
    let fields=['id','student_name'];
    let students=await ctx.service.student.findStudents(where,fields)
   

    await ctx.render('front/student/selectstudents',{departs,students,projectId,teacher});
  }


  async enrollProject(){
    const {ctx}=this;
    const bodys=ctx.request.body;
    const eps=await ctx.service.enrollProject.bulkAdd(bodys);
    if(eps){
      RESULT.code=1;
      RESULT.msg="邀请学生加入项目成功，但需要学生同意";
    }
    else{
      RESULT.code=0;
      RESULT.msg="邀请学生加入项目失败";
    }
    ctx.body=RESULT;
  }
   /**
     * 通过学生部门编号获取专业和班级
     *  通过学生部门编号获取专业和班级
     *  get /api/student/depart
     *  query integer depart_id
     *  200 RESULT
     */
    async findMajorAndClassinfoByDepartId() {
      const {
          ctx
      } = this;
      const {
          depart_id
      } = ctx.query;
      // console.log(depart_id);
      //获取专业和班级
      if (depart_id) {
          let majors = await ctx.service.major.findMajorsByDepartId(depart_id);
          let classinfos = await ctx.service.classinfo.findClassinfosByDepartId(depart_id);
          let data = {
              majors,
              classinfos
          };
          RESULT.code = 1;
          RESULT.msg = '数据获取成功';
          RESULT.data = data;
      } else {
          RESULT.code = 0;
          RESULT.msg = '数据获取失败';
      }

      ctx.body = RESULT;

  }

  /**
   * 学生登录
   * 
   *  post /home/student/login
   *  body student
   *  200 RESULT
   */
  async login() {
      const {
          ctx
      } = this;
      const {
          student_no,
          password
      } = ctx.request.body;
      let student = await ctx.service.student.login(student_no, password);
      if (student) {

          RESULT.code = 1;
          RESULT.msg = '登录成功';
          RESULT.data = student;
      } else {
          RESULT.code = 0;
          RESULT.msg = '登录失败,请检查用户名或者密码';
      }
      ctx.body = RESULT;
  }
  /**
   * 通过部门获取数据
   * 通过部门获取数据
   *  post /home/student/querystudentbydepartid
   *  body integer depart_id
   *  200 RESULT
   */
  async queryStudentsByDepartId() {
      const {
          ctx
      } = this;
      const {
          depart_id
      } = ctx.request.body;
      if (depart_id) {
          let students = await ctx.service.student.findStudentByDepartId(depart_id);

          if (students) {
              RESULT.code = 1;
              RESULT.msg = '获取数据';
              RESULT.data = students;
          } else {
              RESULT.code = 0;
              RESULT.msg = '没有数据';
          }

      } else {
          RESULT.code = 0;
          RESULT.msg = '传参不正确,请重试';
      }

      ctx.body = RESULT;
  }
  /**
   * 通过班级获取学生数据
   *  post /api/student/querystudentsbyclassmateid
   * body student
   *  200 RESULT
   */
  async queryStudentsByClassmateId() {
      const {
          ctx
      } = this;
      const {
          classmate_id
      } = ctx.request.body;
      if (depart_id) {
          let students = await ctx.service.student.findStudentByClassmateId(classmate_id);
          if (students) {
              RESULT.code = 1;
              RESULT.msg = '获取数据';
              RESULT.data = students;
          } else {
              RESULT.code = 0;
              RESULT.msg = '没有数据';
          }

      } else {
          RESULT.code = 0;
          RESULT.msg = '传参不正确,请重试';
      }

      ctx.body = RESULT;
  }
  async changePassword(){
    const {
      ctx
    } = this;
    let student = ctx.session.student;
    const {
      oldPsw,
      newPsw,
      confirmpsw
    } = ctx.request.body;
    if (newPsw !== confirmpsw) {
      RESULT.code = 0;
      RESULT.msg = '新密码和确认密码不一致';
      return;
    }
    let t = await ctx.service.student.login(student.student_no, oldPsw);
    if (!t) {
      RESULT.code = 0;
      RESULT.msg = '原始密码错误';
    } else {
      t = await ctx.service.student.changePassword(student.id, newPsw);
      if (t) {
        RESULT.code = 1;
        RESULT.msg = '密码修改成功';
      } else {
        RESULT.code = 1;
        RESULT.msg = '密码修改失败';
      }

    }
    ctx.body = RESULT;


  }
  

}

module.exports = StudentController;
