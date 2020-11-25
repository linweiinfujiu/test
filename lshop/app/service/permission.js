'use strict';

const Service = require('egg').Service;

class PermissionService extends Service {
    async all() {
        const {
            ctx
        } = this;
        const permissions = await ctx.model.Permission.findAll();
        return permissions;

    }
   
    async one(id) {
        const {
            ctx
        } = this;
        const permission = await ctx.model.Permission.findByPk(id);
        if (!permission) {
            ctx.throw(404, 'not found');
        }
        return permission;

    }
    async add(body) {
        const {
            ctx
        } = this;
        const permission = await ctx.model.Permission.create(body);
        return permission;

    }
    async modify(id, body) {
        const permission = await this.one(id);
        return await permission.update(body);
    }
    async delete(id) {
        const permission = await this.one(id);
        return await permission.destroy();

    }
}

module.exports = PermissionService;
