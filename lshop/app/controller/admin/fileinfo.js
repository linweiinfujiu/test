'use strict';

const Controller = require('egg').Controller;

class FileinfoController extends Controller {
    async index() {
        const {ctx}=this;
        const fileinfos=await ctx.service.fileinfo.all()
        await ctx.render('admin/fileinfo/index',{fileinfos})
        
      }
      async toedit(){
        const {ctx}=this;
        let id=ctx.query.id;
        if(id){
          const fileinfo=await ctx.service.fileinfo.one(id);
          await ctx.render('admin/fileinfo/edit',{fileinfo})
        }
        else{
          await  ctx.render('admin/fileinfo/edit')
        }
    
    
      }
      async edit(){
        const {ctx}=this;
        const {id}=ctx.request.body;
        let fileinfo= ctx.request.body;
        if(id){
          await ctx.service.fileinfo.modify(id,fileinfo);
        }
        else{
          await ctx.service.fileinfo.add(fileinfo);
        }
    
        await ctx.redirect('/admin/fileinfo')
      }
      
      async delete(){
        const {ctx}=this;
        let id=ctx.query.id;
        await ctx.service.fileinfo.delete(id);
        await ctx.redirect('/admin/fileinfo')
      }
}

module.exports = FileinfoController;
