'use strict';

const Controller = require('egg').Controller;
const {
    getTimeStamp,RESULT
  } = require('../../util/util');
class EnrollProjectController extends Controller {
  async insert() {
    const {ctx}=this;
    console.log(ctx.request.body)
    ctx.body=RESULT;
  }
}

module.exports = EnrollProjectController;
