'use strict';

const Controller = require('egg').Controller;

class AdPositionController extends Controller {
  async index() {
    const {ctx}=this;
    const adPositions=await ctx.service.adPosition.all();
    await ctx.render('admin/adposition/index',{adPositions});
  }
  async toedit(){
    const {ctx}=this;
    let id=ctx.query.id;
    if(id){
      const adPosition=await ctx.service.adPosition.one(id)
      await ctx.render('admin/adposition/edit',{adPosition});
    }
    else{
      await ctx.render('admin/adposition/edit');
    }
  }
  async edit(){
    const {ctx}=this;
    const {position_id}=ctx.request.body;

    if(position_id){
      let adPosition= ctx.request.body;
      await ctx.service.adPosition.modify(position_id,adPosition);
    }
    else{
      let adPosition= ctx.request.body;
      adPosition=await ctx.service.adPosition.add(adPosition);
    }
    
    await ctx.redirect('/admin/adposition');

  }
  async delete(){
    const {ctx}=this;
    let id=ctx.query.id;
    await ctx.service.adPosition.delete(id);
    await ctx.redirect('/admin/adposition')
  }
}

module.exports = AdPositionController;
