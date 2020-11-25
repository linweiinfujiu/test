'use strict';

const Controller = require('egg').Controller;

class CompetitionController extends Controller {
   async index() {
     const {ctx}=this;
     let competitiontypes=[
       {id:1,name:'通用'},
       {id:2,name:'专业'},
       {id:3,name:'其他'}
     ];
     let competitions=await ctx.service.competition.findCompetitionsWithFields();

     await ctx.render('admin/competition/list',{competitions,competitiontypes})
    
  }
  async toedit(){
    const {ctx}=this;
    const {id}=ctx.query;
    let competitiontypes=[
      {id:1,name:'通用'},
      {id:2,name:'专业'},
      {id:3,name:'其他'}
    ];
    if(id){
       let competition=await ctx.service.competition.one(id);
     //  console.log(competition.competition_desc);
       await ctx.render('admin/competition/edit',{competition,competitiontypes});
    }
    else{
      await ctx.render('admin/competition/edit',{competitiontypes});
    }


  }
  async edit(){
    const {ctx}=this;
    const {id}=ctx.request.body;
    if(id){
      const body=ctx.request.body;
      await ctx.service.competition.modify(id,body)
    }
    else{
      const body=ctx.request.body;
      await ctx.service.competition.add(body)
    }

    ctx.redirect('/admin/competition')
  }
  async delete(){
    const {ctx}=this;
    const {id}=ctx.query;
    if(id){
       await ctx.service.competition.delete(id);
    }
    ctx.redirect('/admin/competition')

  }
}

module.exports = CompetitionController;
