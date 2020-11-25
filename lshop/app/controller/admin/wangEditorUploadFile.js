'use strict';
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');

const {
  uuid,
  checkImageExtname,

} = require('../../util/util')
class WangEditorUploadFileController extends Controller {
  async upload() {
    const {ctx}=this;
    const file = ctx.request.files[0];
    let result={};
    if (!file) {
      result.errno=1;
      result.msg = '图片没有选中';
      ctx.body = result
      return
    }
    const filename = encodeURIComponent(ctx.request.body.name) + path.extname(file.filename).toLowerCase();
    //console.log(images(filename).height);
    let extname = filename.substring(filename.lastIndexOf('.'), filename.length);
    if (!checkImageExtname(extname)) {
      result.errno=1;
      result.msg = '文件扩展名错误';
      ctx.body = result
    } else {
      let newfilename = uuid().toLowerCase().replace(/-/g, '') + extname;
      const targetPath = path.join(this.config.baseDir, 'app/public/upload', newfilename);
      const source = fs.createReadStream(file.filepath);
      const target = fs.createWriteStream(targetPath);
      try {
        await pump(source, target);
      } finally {
        // delete those request tmp files

        await ctx.cleanupRequestFiles();
        result.errno=1;
        result.msg = '文件上传不成功';
        ctx.body = result
      }
      result.errno=0;
      result.msg = '文件上传成功';
      result.data=["/public/upload/"+newfilename];
      ctx.body = result;
    }
  }
}

module.exports = WangEditorUploadFileController;
