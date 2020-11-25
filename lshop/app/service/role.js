'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
    async all() {
        const {
            ctx
        } = this;
        const roles = await ctx.model.Role.findAll();
        return roles;

    }
   
    async one(id) {
        const {
            ctx
        } = this;
        const role = await ctx.model.Role.findByPk(id);
        if (!role) {
            ctx.throw(404, 'not found');
        }
        return role;

    }
    async add(body) {
        const {
            ctx
        } = this;
        const role = await ctx.model.Role.create(body);
        return role;

    }
    async modify(id, body) {
        const role = await this.one(id);
        return await role.update(body);
    }
    async delete(id) {
        const role = await this.one(id);
        return await role.destroy();

    }
}

module.exports = RoleService;
