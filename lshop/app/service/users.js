'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');
class UsersService extends Service {
    async all() {
        const {
            ctx
        } = this;
        const users = await ctx.model.Users.findAll({raw:true});
        return users;

    }
    async one(id) {
        const {
            ctx
        } = this;
        const user = await ctx.model.Users.findByPk(id);
        if (!user) {
            ctx.throw(404, 'not found');
        }
        return user;
    }
    async add(body) {
        const {
            ctx
        } = this;
        const user = await ctx.model.Users.create(body);
        return user;
    }
    async modify(id, body) {
        const user = await this.one(id);
        return await user.update(body);

    }
    async delete(id) {
        const user = await this.one(id);
        return await user.destroy();
    }

    async login(email, password) {
        const {
            ctx,app
        } = this;
        let salt = app.config.salt;
        password = crypto.createHmac('sha256', salt).update(password).digest('hex')
        let options = {
            attributes: ['user_id', 'email', 'reg_time', 'last_login', 'last_ip'],
            where: {
                email: email,
                password: password
            }
        }
        const user = await ctx.model.Users.findOne(options);
        return user;

    }
    /**
     * 检查email是否重复
     */
    async findUserByEmail(email) {
        const {
            ctx
        } = this;
        let options = {
            where: {
                email: email
            }
        }
        let user = await ctx.model.Users.findOne(options);
        return user;
    }

}

module.exports = UsersService;