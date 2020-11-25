'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  async index() {

    const {ctx}=this;
    
    return ctx.render('admin/role/list');
    
  }
  async toEdit(){
    const {ctx}=this;
    return ctx.render('admin/role/edit');
  }
  async edit(){

    
  }

  async delete(){



  }
}

module.exports = RoleController;
