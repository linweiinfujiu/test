'use strict';

// 导入
const Controller = require('egg').Controller;

// const nunjucks = require("egg-view-nunjucks")

class communityActivtiyController extends Controller {
    // 活动主界面设置
    async index() {

            const { ctx } = this;
            // console.log(nunjucks.filter.changeTimeStamp(1604999000));

            let statusitems = [
                { id: 0, name: '未开始' },
                { id: 1, name: '结束' },
                { id: 2, name: '延期' }
            ];
            let typeitems = ['日常活动', '培训', '科研', '竞赛'];

            let communityActivtiy = await ctx.service.communityActivtiy.findcCmmunityActivtiyWithFields();
            // console.log("输出的communityActivtiy", communityActivtiy);
            await ctx.render('admin/communityActivtiy/list', { communityActivtiy, statusitems, typeitems })
        }
        // 活动添加设置
    async toedit() {
        const { ctx } = this;
        const { id } = ctx.query;
        let statusitems = [
            { id: 0, name: '未开始' },
            { id: 1, name: '结束' },
            { id: 2, name: '延期' }
        ];
        let typeitems = ['日常活动', '培训', '科研', '竞赛'];
        // console.log("测试" + id);
        // 判断是否有id
        if (id) {
            let communityActivtiy = await ctx.service.communityActivtiy.one(id);
            // 时间戳转换成人类可见的类型
            // console.log("进入页面", communityActivtiy.endtime);
            let startTime = new Date(parseInt(communityActivtiy.starttime) * 1000);
            let endTime = new Date(parseInt(communityActivtiy.endtime) * 1000);
            // 开始时间
            startTime = {
                date: dateFormat(startTime, "yyyy-MM-dd"),
                time: dateFormat(startTime, "hh:mm:ss")
            };
            // 结束时间
            endTime = {
                date: dateFormat(endTime, "yyyy-MM-dd"),
                time: dateFormat(endTime, "hh:mm:ss")
            };
            // console.log("查看数据", startTime);
            // console.log("查看数据", endTime);
            await ctx.render('admin/communityActivtiy/edit', { communityActivtiy, statusitems, typeitems, startTime, endTime });
        } else {
            await ctx.render('admin/communityActivtiy/edit', { statusitems, typeitems });
        }

    }

    // 更改/添加
    async edit() {
        const { ctx } = this;
        const { id } = ctx.request.body;
        // console.log("更改/添加");-
        let body = ctx.request.body;

        // 为空时会填充空字符
        // console.log("查看startTime输出", body.startTime.date)
        // console.log("查看startTime输出", body.startTime.time)
        // console.log("查看endtime输出", body.endTime.date)
        // console.log("查看endtime输出", body.endTime.time)
        // console.log("查看startTime时间戳", new Date(body.startTime.date + " " + body.startTime.time).valueOf() / 1000)
        // console.log("查看endtime时间戳", new Date(body.endTime.date + " " + body.endTime.time).valueOf() / 1000)
        body.starttime = new Date(body.startTime.date + " " + body.startTime.time).valueOf() / 1000;
        const endtime = new Date(body.endTime.date + " " + body.endTime.time).valueOf() / 1000;
        if (isNaN(endtime)) {
            body.endtime = null;
        } else {
            body.endtime = endtime;
        }
        if (id) {
            // console.log("启动了修改");
            await ctx.service.communityActivtiy.modify(id, body);
        } else {
            // console.log("启动了插入");
            await ctx.service.communityActivtiy.add(body);
        }
        // 重新刷新communityActivtiy
        ctx.redirect('/admin/communityactivity');
    }

    // 删除
    async delete() {
        const { ctx } = this;
        const { id } = ctx.query;
        if (id) {
            await ctx.service.communityActivtiy.delete(id);
        }
        // 重新刷新communityActivtiy
        ctx.redirect('/admin/communityactivity')

    }

    // 跳转到搜索页
    async tosearch() {
            const { ctx } = this;
            let statusitems = [
                { id: 0, name: '未开始' },
                { id: 1, name: '结束' },
                { id: 2, name: '延期' }
            ];
            let typeitems = ['不选择', '日常活动', '培训', '科研', '竞赛'];

            await ctx.render('admin/communityActivtiy/search', { statusitems, typeitems });
        }
        // 搜索页面的
    async search() {
        console.log("开始搜索")
        const { ctx } = this;
        const { Op } = require("sequelize")
        const body = ctx.request.body;
        let statusitems = [
            { id: 0, name: '未开始' },
            { id: 1, name: '结束' },
            { id: 2, name: '延期' }
        ];
        let typeitems = ['日常活动', '培训', '科研', '竞赛'];
        let options = {
            attributes: ['id', 'title', 'content', 'starttime', 'endtime', 'status', 'chager', 'attentment', 'c_id', 'type'],
            where: {
                'title': {
                    [Op.like]: '%%'
                },
            }
        };

        const beginTimeOne = new Date(body.starttime.beginDate + " " + body.starttime.begintime).valueOf() / 1000;
        const beginTimeTwo = new Date(body.starttime.endDate + " " + body.starttime.endTime).valueOf() / 1000;

        const endtimeOne = new Date(body.endtime.beginDate + " " + body.endtime.beginTime).valueOf() / 1000;
        const endtimeTwo = new Date(body.endtime.endDate + " " + body.endtime.endTime).valueOf() / 1000;

        console.log();

        options.where.title[Op.like] = "%" + body.title + "%";

        if (body.type != "不选择") {
            options.where.type = body.type;
        }

        if (!isNaN(beginTimeOne) && !isNaN(beginTimeTwo)) {
            options.where.starttime = {
                [Op.between]: [beginTimeOne, beginTimeTwo]
            };
        }

        if (body.c_id != '') {
            options.where.c_id = body.c_id;
        }
        if (body.status != '-1') {
            options.where.status = body.status;
        }
        if (body.chager != '') {
            options.where.chager = body.chager;
        }
        if (!isNaN(endtimeOne) && !isNaN(endtimeTwo)) {
            options.where.endtime = {
                [Op.between]: [endtimeOne, endtimeTwo]
            };
        }

        // 添加一条status搜索

        // console.log(typeof(options.where));
        // console.log(typeof(options.where.title));
        console.log("搜索页面options的数据", options);
        console.log("搜索页面活动的数据", body);
        let communityActivtiy = await ctx.service.communityActivtiy.selectCmmunityActivtiyWithFields(options);
        console.log("搜索结果", communityActivtiy);


        // if (Object.keys(communityActivtiy).length === 0) {
        //     window.alert("没有数据");
        // }
        // console.log(typeof(communityActivtiy));
        await ctx.render('admin/communityActivtiy/list', { communityActivtiy, statusitems, typeitems })
    }
}

module.exports = communityActivtiyController;

/** 
 * 对日期进行格式化， 
 * @param date 要格式化的日期 
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有： 
 *     y:年, 
 *     M:年中的月份(1-12), 
 *     d:月份中的天(1-31), 
 *     h:小时(0-23), 
 *     m:分(0-59), 
 *     s:秒(0-59), 
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 * @author yanis.wang@gmail.com
 */
function dateFormat(date, format) {
    if (format === undefined) {
        format = date;
        date = new Date();
    }
    var map = {
        "M": date.getMonth() + 1, //月份 
        "d": date.getDate(), //日 
        "h": date.getHours(), //小时 
        "m": date.getMinutes(), //分 
        "s": date.getSeconds(), //秒 
        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        } else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}