'use strict';

const Controller = require('egg').Controller;

class SystemModuleController extends Controller {
   async index() {
      const {
         ctx
      } = this;
      let {
         level,
         parent_id
      } = ctx.query;
      let modules;
      if (level) {
         modules = await ctx.service.systemModule.getChildModulesBylevel(level, parent_id);
      } else {
         modules = await ctx.service.systemModule.getChildModulesBylevel(1, 0);
      }

      await ctx.render('admin/module/index', {
         modules
      })
   }
   async toedit() {
      const {
         ctx
      } = this;
      let module={};
      let {id,parent_id}=ctx.query;
      if(id){
         module=await ctx.service.systemModule.one(id);
         await ctx.render('admin/module/edit',{module});
      }
      else if(parent_id){
         module.parent_id=parent_id;
         await ctx.render('admin/module/edit',{module});
      }
      else{
      await ctx.render('admin/module/edit');
   }
   }
   async edit() {
    const {ctx}=this;
   
    let {mod_id}=ctx.request.body;
    if(mod_id){
         let body=ctx.request.body;
         await ctx.service.systemModule.modify(mod_id,body)
       
    }
    else{
      let body=ctx.request.body;
      await ctx.service.systemModule.add(body)
      
    }
    await ctx.redirect("/admin/module")

   }
   async delete(){
      const {ctx}=this;
      const {id}=ctx.query;

      if(id){
         await ctx.service.systemModule.delete(id)
      }
      
      await ctx.redirect("/admin/module");
   }
   // 上一级
   async upper(){
      const {ctx}=this;
      let {parent_id,level}=ctx.query;
      console.log(parent_id)
      if(parent_id){
         const module= await   ctx.service.systemModule.one(parent_id)
         //ctx.body=module.parent_id; 
         let modules = await ctx.service.systemModule.getChildModulesBylevel(module.level, module.parent_id);
         await ctx.render('admin/module/index', {
            modules
         })

      }
      else{
         ctx.throw(404,'parent_id not found')
      }

   }
}

module.exports = SystemModuleController;