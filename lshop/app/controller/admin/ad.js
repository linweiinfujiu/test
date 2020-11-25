'use strict';

const Controller = require('egg').Controller;
/**
 * @controller AdController
 */
class AdController extends Controller {
  
  async index() {
    const {ctx}=this;
    const adPostions=await ctx.service.adPosition.findAdPositionByIsOpen();
   // console.log(adPostions)
    const ads=await ctx.service.ad.all();
    await ctx.render('admin/ad/index',{ads});
  }
  async toedit(){
    const {ctx}=this;
    let id=ctx.query.id;
    let adPostions=await ctx.service.adPosition.findAdPositionByIsOpen();
    if(id){
      let ad= await ctx.service.ad.one(id);
      await ctx.render('admin/ad/edit',{ad,adPostions});
    }
    else{
      await ctx.render('admin/ad/edit',{adPostions});
    }

    
  }
  async edit(){
    const {ctx}=this;
    const {id}=ctx.request.body;
    if(id){

    }
    else{

    }

  }
  async delete(){
    const {ctx}=this;
    let id=ctx.query.id;
  }
}

module.exports = AdController;
