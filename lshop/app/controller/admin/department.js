'use strict';

const Controller = require('egg').Controller;

class DepartmentController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    const departs = await ctx.service.department.all();
    return await ctx.render('admin/depart/list', {
      departs
    })
  }
  async toedit() {
    const {
      ctx
    } = this;
    let {
      id
    } = ctx.query
    let depart;
    if (id) {
      depart = await ctx.service.department.one(id);
      console.log(depart)
    }
    await ctx.render('admin/depart/edit', {
      depart
    });


  }
  async edit() {
    const {
      ctx
    } = this;
    const {
      id
    } = ctx.request.body;
    console.log("id"+id);
    if (id) {
      const body = ctx.request.body;
      await ctx.service.department.modify(id, body)
    } else {
      const body = ctx.request.body;
      await ctx.service.department.add(body)
    }
    ctx.redirect('/admin/depart')

  }
  async delete() {
    const {
      ctx
    } = this;
    const {
      id
    } = ctx.query;
    if (id) {
      await ctx.service.department.delete(id);
    }
    ctx.redirect('/admin/depart')
  }
}

module.exports = DepartmentController;