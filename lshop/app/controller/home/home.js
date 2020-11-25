'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    
    const competitions=await ctx.service.competition.findCompetitionsWithFields();
    
    await ctx.render('front/index',{competitions});
  }
  async tologin(){
    const { ctx } = this;
    await ctx.render('front/user/login');
  }
  async totest(){
    const { ctx } = this;
    await ctx.render('front/test');
  }
  
}

module.exports = HomeController;
