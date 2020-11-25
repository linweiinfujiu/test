'use strict';
/**
 * @controller 班级数据接口
 */
const Controller = require('egg').Controller;
const {
    RESULT
} = require('../../util/util')
class ClassinfoController extends Controller {
    /**
     * @summary 通过部门获取班级数据
     * @description 通过部门获取班级数据
     * @router post /api/classinfo/queryclassinfosbydepartid
     * @request body integer depart_id
     * @response 200 RESULT
     */
    async queryClassinfosByDepartId() {
        const {
            ctx
        } = this;
        const {
            depart_id
        } = ctx.request.body;
        if (depart_id) {
            let classinfos = await ctx.service.classinfo.findClassinfosByDepartId(depart_id);
            if (classinfos) {
                RESULT.code = 1;
                RESULT.msg = '获取数据成功';
                RESULT.Data = classinfos;
            } else {
                RESULT.code = 1;
                RESULT.msg = 'no data';
            }

        } else {
            RESULT.code = 0;
            RESULT.msg = '传参错误，请重试'
        }
        ctx.body = RESULT;
    }
}

module.exports = ClassinfoController;