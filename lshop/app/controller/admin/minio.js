'use strict';

const Controller = require('egg').Controller;
//let minioClient=require('../../util/minio');
const Minio = require('minio');
class MinioController extends Controller {
    async index() {
        const {app,ctx}=this;
        let minioClient = new Minio.Client(app.config.minio); 
        //console.log(minioClient)
        minioClient.listBuckets(function (err, buckets) {
            if (err) {
                console.log(err)
            } else {
                console.log(buckets)
            }
        })

    }
    async toEdit() {

    }
    async edit(){

  
    }
    async delete(){
        
    }
}

module.exports = MinioController;