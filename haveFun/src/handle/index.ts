const https = require("https");
import * as vscode from 'vscode';

//请求回来的数据
let jsonString:string="";

let routerList:Array<Number>=[];

function search(page:Number=1){
    jsonString="";
    let url = `https://webapi.acfun.cn/query/article/list?pageNo=${page}&size=20&filterTitleImage=true`;
    return new Promise((success:(result:Array<any>)=>void,error)=>{
            let req=https.request(url,(res:any)=>{
            if(res.statusCode === 200){
                //请求成功
                res.on("data",(result:any)=>{
                    jsonString+=result.toString();
                });
                //结束请求
                res.on("end",()=>{
                    success(JSON.parse(jsonString).data.articleList);
                });

            }else{
                //非200 成功
                vscode.window.showInformationMessage(`请求异常，code:${res.statusCode}`);
                error();
            }
        });

        //失败
        req.on('error', (e:any) => {
            console.log(e);
            vscode.window.showErrorMessage(`初始化失败:${e.message}`);
            error();
        });
        //关闭连接
        req.end();
    });
    
}

function toDetail(id:Number){
    jsonString="";
    let url=`https://www.acfun.cn/a/ac${id}`;
    return new Promise((success:(result:string)=>void,error)=>{
        let req=https.request(url,(res:any)=>{
            res.on("data",(result:any)=>{
                jsonString+=result.toString();
            });
            res.on("end",()=>{
                let script=jsonString.match(/<script>window.articleInfo.*<\/script>/);
                if(script !==null){
                    routerList.push(id);
                    let data=(script[0].match(/{.*}/) as RegExpMatchArray)[0];
                    success(data);
                }else{
                    vscode.window.showErrorMessage(`正则匹配内容失败`);
                }
            });
        });
        req.end();
    });
}


export default {
    search:search,
    toDetail:toDetail
};