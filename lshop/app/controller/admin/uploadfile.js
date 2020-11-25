'use strict';

const Controller = require('egg').Controller;

class UploadfileController extends Controller {
  async showFile() {
    const {ctx}=this;
    await ctx.render('admin/upload/uploadfile');

  }
  async showImage(){
    const {ctx}=this;
    await ctx.render('admin/upload/uploadimage');
  }
}

module.exports = UploadfileController;
