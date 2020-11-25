module.exports = app => {
    const { router, controller } = app;
    router.get('/',controller.home.home.index)

    router.get('/home/totest',controller.home.home.totest) 
    //用户登录
    router.get('/home/user/tologin',controller.home.home.tologin) 
    router.get('/home/user/toreg',controller.home.user.toReg)
    router.get('/home/user/loginout',controller.home.user.loginout)
    //进入用户中心
    router.get('/home/user/center',controller.home.user.center)
    //进入学生中心
    router.get('/home/student/center',controller.home.student.center)
    //进入教师中心
    router.get('/home/teacher/center',controller.home.teacher.center)

    //进入教师配置
    router.get('/home/teacher/config',controller.home.teacher.toConfig)
    //教师项目
    router.get('/home/teacher/project',controller.home.teacher.toProject)
    router.get('/home/teacher/project/create',controller.home.teacher.toProjectCreate)
    router.post('/home/teacher/project/create',controller.home.teacher.projectCreate)
    router.post('/home/teacher/project/update',controller.home.teacher.updateProject)

    //读书笔记
    router.get('/home/teacher/article',controller.home.article.toArticle)
    router.get('/home/teacher/article/create',controller.home.article.toArticleCreate)
    router.post('/home/teacher/article/create',controller.home.article.articleCreate)
    router.post('/home/teacher/article/update',controller.home.article.articleUpdate)
    //项目添加教师
    router.get('/home/teacher/toselectteachers',controller.home.teacher.toSelectTeachers)
    //教师加入项目
    
    
    //学生添加项目
    router.get('/home/student/config',controller.home.student.toConfig)
    router.get('/home/student/toselectstudents',controller.home.student.toSelectStudents)
    router.post('/home/student/changepassword',controller.home.student.changePassword)
    router.get('/home/student/project',controller.home.student.toProject)
    //接口
    router.post('/home/teacher/changepassword',controller.home.teacher.changePassword)
    router.post('/home/teacher/login',controller.home.teacher.login)



    router.post('/home/teacher/enroll/project',controller.home.teacher.enrollProject)
    router.post('/home/student/enroll/project',controller.home.student.enrollProject)
    router.post('/home/user/login',controller.home.user.login) 
    router.post('/home/user/reg',controller.home.user.reg) 
    
    router.get('/home/student/depart',controller.api.student.findMajorAndClassinfoByDepartId);
    router.post('/home/student/login',controller.api.student.login);
    router.post('/home/student/querystudentbydepartid',controller.api.student.queryStudentsByDepartId);

    router.post('/home/wang/upload', controller.home.wangEditorUploadFile.upload);

    router.post('/home/file/uploadimagebyajax',controller.api.upload.uploadImageByAjax);
    router.post('/home/file/uploadfilebyajax',controller.api.upload.uploadFileByAjax);
    
  };