'use strict';

const Controller = require('egg').Controller;
const {
  ERROR,
  SUCCESS,
  getTimeStamp
} = require('../../util/util')
class UserController extends Controller {
  async center() {
    const {
      ctx
    } = this;
    await ctx.render('front/user/index');
  }
  async toReg() {
    const {
      ctx
    } = this;
    await ctx.render('front/user/register');
  }
  async loginout() {
    const {
      ctx
    } = this;
    ctx.session.islogin = 0;
    await ctx.render('front/user/login');
  }
  async login() {
    const {
      ctx
    } = this;
    const {
      userType
    } = ctx.request.body;
    const {
      name,
      password
    } = ctx.request.body;
    let i = parseInt(userType)
    switch (i) {
      case 1:
        let student = await ctx.service.student.login(name, password);
        if (student) {
          ctx.session.islogin = 1;
          ctx.session.student = student;
          SUCCESS.data = student;
          SUCCESS.userType = userType
          ctx.body = SUCCESS;

          //添加登录日志
          let log = {};
          log.log_info = "登录";
          log.log_ip = ctx.ip;
          log.log_url = ctx.path;
          log.log_time = getTimeStamp();
          log.user_id = student.id;
          log.usertype = 1
          await ctx.service.userLog.add(log);
        } else {
          ctx.body = ERROR;
        }
        break;
      case 2:
        let teacher = await ctx.service.teacher.login(name, password);
        if (teacher) {
          //登录成功
          //登录状态
          //添加登录日志
          let log = {};
          log.log_info = "登录";
          log.log_ip = ctx.ip;
          log.log_url = ctx.path;
          log.log_time = getTimeStamp();
          log.user_id = teacher.id;
          log.usertype = 2
          await ctx.service.userLog.add(log);
          
          ctx.session.islogin = 1;
          ctx.session.teacher = teacher;
          SUCCESS.data = teacher;
          SUCCESS.userType = userType
          ctx.body = SUCCESS
        } else {
          ctx.body = ERROR;
        }
        break;
      case 3:
        let user = await ctx.service.users.login(name, password);
        if (user) {
          ctx.session.islogin = 1;
          ctx.session.user = user;
          SUCCESS.data = user;
          SUCCESS.userType = userType
          ctx.body = SUCCESS

          //添加登录日志
          let log = {};
          log.log_info = "登录";
          log.log_ip = ctx.ip;
          log.log_url = ctx.path;
          log.log_time = getTimeStamp();
          log.user_id = user.id;
          log.usertype = 3
          await ctx.service.userLog.add(log);
        } else {
          ctx.body = ERROR;
        }
        break;
      default:
        ctx.body = ERROR;
        break;
    }

  }
  async reg() {
    const {
      ctx,
      app
    } = this;
    let {
      email,
      password,
      repassword
    } = ctx.request.body;

    const validateResult = await ctx.validate('user.reg', {
      email,
      password,
      repassword
    }); // 第一个参数对应于rules目录下目录或文件
    if (!validateResult) {
      return;
    }

    let useremail = await ctx.service.users.findUserByEmail(email);
    if (useremail) {
      ERROR.msg = "电子邮件重复，不可用"
      ctx.body = ERROR;
      return;
    }

    let salt = app.config.salt;
    password = crypto.createHmac('sha256', salt).update(password).digest('hex')
    let user = {};
    user.email = email;
    user.password = password;
    user.reg_time = getTimeStamp();
    user.last_login = getTimeStamp();
    user.last_ip = ctx.ip;
    user = await ctx.service.users.add(user);
    if (!user) {
      ERROR.msg = "注册失败，请重试"
      ctx.body = ERROR;
      return;
    } else {
      SUCCESS.msg = "注册成功";
      ctx.body = SUCCESS;
    }
  }
}

module.exports = UserController;