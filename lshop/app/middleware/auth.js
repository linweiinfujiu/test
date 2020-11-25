module.exports = (options, app) => {
    return async function WebAuthentication(ctx, next) {
        let noAuth=options.noAuth;
        let islogin=ctx.session.islogin;
       // console.log("22222222222:"+islogin);
        if(noAuth.includes(ctx.path)){
            await next();
        }
        else if(typeof(islogin)=="undefined"||islogin==0){
           ctx.redirect('/home/user/tologin')
        }
       else{
    
        await next();
       }
        
    };
};