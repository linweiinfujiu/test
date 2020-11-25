'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
    async index() {
        const {ctx}=this;
        //管理员登录信息
        let {id}=ctx.query;
        console.log(id);
        const tops= await ctx.service.systemModule.findTopByParentId();
        let menus=null;
        if(id){
        
         menus=await ctx.service.systemModule.getMenus(id);
    
        }
        else{
          menus=await ctx.service.systemModule.getMenus(1);
        }
    
       
        await ctx.render('admin/index',{tops,menus});
     
      }
      async tologin(){
        const {ctx}=this;
        await ctx.render('admin/login/login');
      }
     
      async error(){
        const {ctx}=this;
        await ctx.render('admin/500');
      }
}

module.exports = IndexController;
