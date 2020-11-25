'use strict';

const Controller = require('egg').Controller;
const {
  getTimeStamp,
  RESULT
} = require('../../util/util');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class TeacherController extends Controller {
  async center() {
    const {
      ctx
    } = this;
    let teacher = ctx.session.teacher;
    //获取通知
    let notices = await ctx.service.notice.all();
    await ctx.render('front/teacher/index', {
      teacher,
      notices
    });
  }
  async toConfig() {
    const {
      ctx
    } = this;
    let teacher = ctx.session.teacher;
    let logs = await ctx.service.userLog.findLogsByUserId(teacher.id,2);
    let depart = await ctx.service.department.one(teacher.depart_id);
    await ctx.render('front/teacher/config', {
      teacher,
      depart,
      logs
    });
  }
  async toProject() {
    const {
      ctx
    } = this;
    let teacher = ctx.session.teacher;
    console.log(teacher);
    let projects = await ctx.service.project.findProjectByLeader(teacher.id);
    let project_teachers = [];
    let project_students = [];
    if (projects) {
      for (let i = 0; i < projects.length; i++) {
        let project = projects[i];
        if (project.teachers) {
          let teacherIds = project.teachers.split(',');
          let teachers = await ctx.service.teacher.findTeachersByIds(teacherIds);
          let project_teacher = {
            id: project.id,
            teachers: teachers,
            count: teachers.length
          }
          project_teachers.push(project_teacher)
        }
        if (project.students) {
          let studentIds = project.students.split(',');
          let students = await ctx.service.student.findStudentsByIds(studentIds);
          let project_student = {
            id: project.id,
            students: students,
            count: students.length
          }
          project_students.push(project_student)
        }
      }
    }
    if (project_teachers.length == 0) {
      project_teachers = null
    }
    if (project_students.length == 0) {
      project_students = null
    }
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
    await ctx.render('front/teacher/project/list', {
      teacher,
      projects,
      statuses,
      project_teachers,
      project_students
    });
  }
  async toProjectCreate() {
    const {
      ctx
    } = this;
    const {
      id
    } = ctx.query;
    let teacher = ctx.session.teacher;
    let project_types = ['竞赛', '项目', '培训'];
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
    if (id) {
      let project = await ctx.service.project.one(id);

      let teacherNames = [];
      let studentNames = [];
      if (project.students) {
        let studentIds = project.students.split(',')
        let students = await ctx.service.student.findStudentsByIds(studentIds)
        students.forEach(element => {
          studentNames.push(element.student_name)

        });

      }
      if (project.teachers) {
        let teacherIds = project.teachers.split(',');
        let teachers = await ctx.service.teacher.findTeachersByIds(teacherIds)
        teachers.forEach(element => {
          teacherNames.push(element.teacher_name)

        });
      }
      project.studentNames = studentNames.join(',')
      project.teacherNames = teacherNames.join(',')
      await ctx.render('front/teacher/project/create', {
        project_types,
        statuses,
        teacher,
        project
      });
    } else {
      await ctx.render('front/teacher/project/create', {
        project_types,
        statuses,
        teacher
      });
    }

  }

  /**
   * 项目创建
   */
  async projectCreate() {
    const {
      ctx
    } = this;
    const {
      id
    } = ctx.request.body;
    let teacher = ctx.session.teacher;
    if (id) {
      const body = ctx.request.body;
      body.update_time = getTimeStamp();
      await ctx.service.project.modify(id, body)

    } else {
      const body = ctx.request.body;
      body.create_time = getTimeStamp();
      body.update_time = getTimeStamp();
      body.leader = teacher.id;
      body.leader_name = teacher.teacher_name;
      await ctx.service.project.add(body);


    }
    ctx.redirect('/teacher/project');
  }


  /**
   * 查看项目详细新
   */
  async toProjectDetail() {
    let teacher = ctx.session.teacher;
  }

  /**
   * 查找教师页面
   */
  async toSelectTeachers() {
    const {
      ctx
    } = this;
    const {
      projectId,
      depart_id
    } = ctx.query;
    let teacher = ctx.session.teacher;

    //获取部门
    let departs = await ctx.service.department.findDeparts();
    //获取排在第一位的部门的教师
    let where = {};
    let id = {
      [Op.notIn]: [teacher.id] //指导教师不包括项目创建者
    }
    if (depart_id) {
      where.depart_id = depart_id;
      where.status = 1;
      where.id = id;

    } else {
      let depart_id = departs[0].id;
      where.depart_id = depart_id;
      where.status = 1,
        where.id = id;

    }
    let fields = ['id', 'teacher_no', 'teacher_name']
    let teachers = await ctx.service.teacher.findTeachers(where, fields);

    await ctx.render('front/teacher/selectteachers', {
      departs,
      teachers,
      projectId,
      teacher
    });
  }
  async updateProject() {
    const {
      ctx
    } = this;
    const {
      id,
      body
    } = ctx.request.body;
    let project = await ctx.service.project.modify(id, body);
    if (project) {
      RESULT.code = 1;
      RESULT.msg = "更新数据成功";
      RESULT.data = project;
    } else {
      RESULT.code = 0;
      RESULT.msg = "更新数据失败"
    }
    ctx.body = RESULT;

  }
  async enrollProject() {
    const {
      ctx
    } = this;
    let {
      eps
    } = ctx.request.body;
    //console.log(eps);
    eps = await ctx.service.enrollProject.buckAdd(eps)
    if (eps && eps.length > 0) {
      RESULT.code = 1;
      RESULT.msg = "添加成功";
    } else {
      RESULT.code = 0;
      RESULT.msg = "添加失败";
    }
    ctx.body = RESULT;
  }
  // 接口
  async login() {
    const {
      ctx
    } = this;
    const {
      teacher_no,
      password
    } = ctx.request.body;
    let teacher = await ctx.service.teacher.login(teacher_no, password);
    if (teacher) {
      RESULT.code = 1;
      RESULT.msg = '登录成功';
      RESULT.data = teacher;
    } else {
      RESULT.code = 0;
      RESULT.msg = '登录失败,请检查用户名或者密码';
    }

    ctx.body = RESULT;
  }
  async changePassword() {
    const {
      ctx
    } = this;
    let teacher = ctx.session.teacher;
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
    let t = await ctx.service.teacher.login(teacher.teacher_no, oldPsw);
    if (!t) {
      RESULT.code = 0;
      RESULT.msg = '原始密码错误';
    } else {
      t = await ctx.service.teacher.changePassword(teacher.id, newPsw);
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

module.exports = TeacherController;