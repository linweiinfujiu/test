module.exports = app => {
    const {
        router,
        controller
    } = app;
    //中间件
    // const auth = app.middleware.auth({ attr: 'this is aa' });
    router.get('/admin', controller.admin.index.index); //auth 
    router.get('/admin/tologin', controller.admin.index.tologin);

    //admin
    // router.get('/admin/login', controller.admin.admin.login);
    router.get('/admin/findLogsbyadmin', controller.admin.admin.findLogsByAdmin);
    router.get('/admin/index', controller.admin.admin.index);
    router.get('/admin/toedit', controller.admin.admin.toedit);
    router.post('/admin/edit', controller.admin.admin.edit);
    router.get('/admin/delete', controller.admin.admin.delete);

    router.get('/admin/articlecate', controller.admin.articleCat.index);
    //articlecate
    router.get('/admin/articlecate', controller.admin.articleCat.index);
    router.get('/admin/articlecate/toedit', controller.admin.articleCat.toedit);
    router.post('/admin/articlecate/edit', controller.admin.articleCat.edit);
    router.get('/admin/articlecate/delete', controller.admin.articleCat.delete);
    router.get('/admin/articlecate/child', controller.admin.articleCat.child);
    //article
    router.get('/admin/article', controller.admin.article.index);
    router.get('/admin/article/toedit', controller.admin.article.toedit);
    router.post('/admin/article/edit', controller.admin.article.edit);
    router.get('/admin/article/delete', controller.admin.article.delete);
    //notice
    router.get('/admin/notice', controller.admin.notice.index);
    router.get('/admin/notice/toedit', controller.admin.notice.toedit);
    router.post('/admin/notice/edit', controller.admin.notice.edit);
    router.get('/admin/notice/delete', controller.admin.notice.delete);
<<<<<<< HEAD
   //ad
   router.get('/admin/ad', controller.admin.ad.index);
   router.get('/admin/ad/toedit', controller.admin.ad.toedit);
   router.get('/admin/ad/edit', controller.admin.ad.edit);
   router.get('/admin/ad/delete', controller.admin.ad.delete);
   //adPosition
   router.get('/admin/adposition', controller.admin.adPosition.index);
   router.get('/admin/adposition/toedit', controller.admin.adPosition.toedit);
   router.get('/admin/adposition/delete', controller.admin.adPosition.delete);
   router.post('/admin/adposition/edit', controller.admin.adPosition.edit);
  // router.get('/admin/error', controller.admin.admin.error);
   //folder
   router.get('/admin/folder', controller.admin.folder.index);
   router.get('/admin/folder/toedit', controller.admin.folder.toedit);
   router.get('/admin/folder/delete', controller.admin.folder.delete);
   router.post('/admin/folder/edit', controller.admin.folder.edit);

   //fileinfo
   router.get('/admin/fileinfo', controller.admin.fileinfo.index);
   router.get('/admin/fileinfo/toedit', controller.admin.fileinfo.toedit);
   router.get('/admin/admin/fileinfo/delete', controller.admin.fileinfo.delete);
   router.post('/admin/fileinfo/edit', controller.admin.fileinfo.edit);

   //department
   router.get('/admin/depart', controller.admin.department.index);
   router.get('/admin/depart/toedit', controller.admin.department.toedit);
   router.get('/admin/depart/delete', controller.admin.department.delete);
   router.post('/admin/depart/edit', controller.admin.department.edit);
   //classinfo
   router.get('/admin/classinfo', controller.admin.classinfo.index);
   router.get('/admin/classinfo/toedit', controller.admin.classinfo.toedit);
   router.get('/admin/classinfo/delete', controller.admin.classinfo.delete);
   router.post('/admin/classinfo/edit', controller.admin.classinfo.edit);
   //major
   router.get('/admin/major', controller.admin.major.index);
   router.get('/admin/major/toedit', controller.admin.major.toedit);
   router.get('/admin/major/delete', controller.admin.major.delete);
   router.post('/admin/major/edit', controller.admin.major.edit);
   //system_module
   router.get('/admin/module', controller.admin.systemModule.index);
   router.get('/admin/module/toedit', controller.admin.systemModule.toedit);
   router.get('/admin/module/delete', controller.admin.systemModule.delete);
   router.get('/admin/module/upper', controller.admin.systemModule.upper);
   router.post('/admin/module/edit', controller.admin.systemModule.edit);
   //competition
   router.get('/admin/competition', controller.admin.competition.index);
   router.get('/admin/competition/toedit', controller.admin.competition.toedit);
   router.get('/admin/competition/delete', controller.admin.competition.delete);
   router.post('/admin/competition/edit', controller.admin.competition.edit);
   //student
   router.get('/admin/student', controller.admin.student.index);
   router.get('/admin/student/toedit', controller.admin.student.toedit);
   router.get('/admin/student/delete', controller.admin.student.delete);
   router.post('/admin/student/edit', controller.admin.student.edit);
   //teacher
   router.get('/admin/teacher', controller.admin.teacher.index);
   router.get('/admin/teacher/toedit', controller.admin.teacher.toedit);
   router.get('/admin/teacher/delete', controller.admin.teacher.delete);
   router.post('/admin/teacher/edit', controller.admin.teacher.edit);
   //friendlink
   router.get('/admin/friendlink', controller.admin.friendlink.index);
   router.get('/admin/friendlink/toedit', controller.admin.friendlink.toedit);
   router.get('/admin/friendlink/delete', controller.admin.friendlink.delete);
   router.post('/admin/friendlink/edit', controller.admin.friendlink.edit);
   router.post('/admin/wang/upload', controller.admin.wangEditorUploadFile.upload);
   //role
   router.get('/admin/roles', controller.admin.role.index);
   router.get('/admin/role/toedit', controller.admin.role.toEdit);
   router.get('/admin/role/delete', controller.admin.role.delete);
   router.post('/admin/role/edit', controller.admin.role.edit);
   // community
   // router.get('/admin/communitys', controller.admin.community.index);
   // router.get('/admin/community/toedit', controller.admin.community.toedit);
   // router.get('/admin/community/delete', controller.admin.community.delete);
   // router.post('/admin/community/edit', controller.admin.community.edit);

   //community_note

   // router.get('/admin/communitynotes', controller.admin.communityNote.index);
   // router.get('/admin/communitynote/toedit', controller.admin.communityNote.toedit);
   // router.get('/admin/communitynote/delete', controller.admin.communityNote.delete);
   // router.post('/admin/communitynote/edit', controller.admin.communityNote.edit);
   //community_activity
   // router.get('/admin/communityactivity', controller.admin.communityActivity.index);
   // router.get('/admin/communityactivity/toedit', controller.admin.communityActivity.toedit);
   // router.get('/admin/communityactivity/delete', controller.admin.communityActivity.delete);
   // router.post('/admin/communityactivity/edit', controller.admin.communityActivity.edit);

   //community_signed
   // router.get('/admin/communitysigned', controller.admin.communitySigned.index);
   // router.get('/admin/communitysigned/toedit', controller.admin.communitySigned.toedit);
   // router.get('/admin/communitysigned/delete', controller.admin.communitySigned.delete);
   // router.post('/admin/communitysigned/edit', controller.admin.communitySigned.edit);

  //community_corporator
   // router.get('/admin/communitycorporators', controller.admin.communityCorporators.index);
   // router.get('/admin/communitycorporators/toedit', controller.admin.communityCorporators.toedit);
   // router.get('/admin/communitycorporators/delete', controller.admin.communityCorporators.delete);
   // router.post('/admin/communitycorporators/edit', controller.admin.communityCorporators.edit);


=======
    //ad
    router.get('/admin/ad', controller.admin.ad.index);
    router.get('/admin/ad/toedit', controller.admin.ad.toedit);
    router.get('/admin/ad/edit', controller.admin.ad.edit);
    router.get('/admin/ad/delete', controller.admin.ad.delete);
    //adPosition
    router.get('/admin/adposition', controller.admin.adPosition.index);
    router.get('/admin/adposition/toedit', controller.admin.adPosition.toedit);
    router.get('/admin/adposition/delete', controller.admin.adPosition.delete);
    router.post('/admin/adposition/edit', controller.admin.adPosition.edit);
    // router.get('/admin/error', controller.admin.admin.error);
    //folder
    router.get('/admin/folder', controller.admin.folder.index);
    router.get('/admin/folder/toedit', controller.admin.folder.toedit);
    router.get('/admin/folder/delete', controller.admin.folder.delete);
    router.post('/admin/folder/edit', controller.admin.folder.edit);
>>>>>>> 0c4f491... 已完成基本功能

    //fileinfo
    router.get('/admin/fileinfo', controller.admin.fileinfo.index);
    router.get('/admin/fileinfo/toedit', controller.admin.fileinfo.toedit);
    router.get('/admin/admin/fileinfo/delete', controller.admin.fileinfo.delete);
    router.post('/admin/fileinfo/edit', controller.admin.fileinfo.edit);

    //department
    router.get('/admin/depart', controller.admin.department.index);
    router.get('/admin/depart/toedit', controller.admin.department.toedit);
    router.get('/admin/depart/delete', controller.admin.department.delete);
    router.post('/admin/depart/edit', controller.admin.department.edit);
    //classinfo
    router.get('/admin/classinfo', controller.admin.classinfo.index);
    router.get('/admin/classinfo/toedit', controller.admin.classinfo.toedit);
    router.get('/admin/classinfo/delete', controller.admin.classinfo.delete);
    router.post('/admin/classinfo/edit', controller.admin.classinfo.edit);
    //major
    router.get('/admin/major', controller.admin.major.index);
    router.get('/admin/major/toedit', controller.admin.major.toedit);
    router.get('/admin/major/delete', controller.admin.major.delete);
    router.post('/admin/major/edit', controller.admin.major.edit);
    //system_module
    router.get('/admin/module', controller.admin.systemModule.index);
    router.get('/admin/module/toedit', controller.admin.systemModule.toedit);
    router.get('/admin/module/delete', controller.admin.systemModule.delete);
    router.get('/admin/module/upper', controller.admin.systemModule.upper);
    router.post('/admin/module/edit', controller.admin.systemModule.edit);
    //competition
    router.get('/admin/competition', controller.admin.competition.index);
    router.get('/admin/competition/toedit', controller.admin.competition.toedit);
    router.get('/admin/competition/delete', controller.admin.competition.delete);
    router.post('/admin/competition/edit', controller.admin.competition.edit);
    //student
    router.get('/admin/student', controller.admin.student.index);
    router.get('/admin/student/toedit', controller.admin.student.toedit);
    router.get('/admin/student/delete', controller.admin.student.delete);
    router.post('/admin/student/edit', controller.admin.student.edit);
    //teacher
    router.get('/admin/teacher', controller.admin.teacher.index);
    router.get('/admin/teacher/toedit', controller.admin.teacher.toedit);
    router.get('/admin/teacher/delete', controller.admin.teacher.delete);
    router.post('/admin/teacher/edit', controller.admin.teacher.edit);

    //friendlink
    router.get('/admin/friendlink', controller.admin.friendlink.index);
    router.get('/admin/friendlink/toedit', controller.admin.friendlink.toedit);
    router.get('/admin/friendlink/delete', controller.admin.friendlink.delete);
    router.post('/admin/friendlink/edit', controller.admin.friendlink.edit);
    router.post('/admin/wang/upload', controller.admin.wangEditorUploadFile.upload);
    //文件上传页面
    router.get('/admin/upload/showfile', controller.admin.uploadfile.showFile);
    router.get('/admin/upload/showimage', controller.admin.uploadfile.showImage);

    //minio
    router.get('/admin/minio/buckets', controller.admin.minio.index);

    // community_activtiy
    router.get('/admin/communityactivity', controller.admin.communityActivity.index);
    router.get('/admin/communityactivity/toedit', controller.admin.communityActivity.toedit);
    router.get('/admin/communityactivity/delete', controller.admin.communityActivity.delete);
    router.post('/admin/communityactivity/edit', controller.admin.communityActivity.edit);

    router.get('/admin/communityactivity/tosearch', controller.admin.communityActivity.tosearch);
    router.post('/admin/communityactivity/search', controller.admin.communityActivity.search);
};