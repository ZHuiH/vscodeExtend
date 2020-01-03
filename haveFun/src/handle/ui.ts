import css from "./css";

//基础html模版
let template=`
    <html lang="zh-Hans">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Security-Policy" >
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover">
        <style type="text/css">${css}</style>
    </head>
    <body>
`;
//生成ui html
export function buildUi(data:Array<any>):string {
    let html=template;
    html+=`<div class="haveFun-content" id="append-target">`;
    html+=buildList(data);
    return `
            ${html}
                    </div>
                </body>
                <script>
                    let page=1;
                    let vscode=null;
                    (function() {
                        vscode = acquireVsCodeApi();
                        window.addEventListener('scroll',(event)=>{
                            if((document.documentElement.scrollTop+200) > page*980){
                                page++;
                                vscode.postMessage({
                                    type:"next",
                                    page:page
                                })
                            }
                        });
                        window.addEventListener('message', event => {
                            let div=document.createElement('div');
                            div.innerHTML=event.data;
                            document.getElementById('append-target').appendChild(div);
                        })
                    }());
                    function jump(id){
                        vscode.postMessage({
                            type:"jump",
                            id:id
                        })
                    }
                </script>
            </html>`;
}

export function buildList(data:Array<any>):string{
    let html="";
    data.forEach((item,index)=>{
        let date=new Date(item.contribute_time);
        html+=`
            <div class="article-item">
                <div class="comments">
                    <p class="comments-count">${item.comment_count}</p>
                    <span>评论</span>
                </div>
                <div class="article-item-preview">
                    <p class="title" onclick="jump(${item.id})">${item.title}</p>
                    <p class="description">${item.description}</p>
                </div>
            </div>

            <div class="info">
                <div>
                    Up：${item.username} &nbsp; &nbsp; &nbsp; 
                    ${date.getFullYear()}-${date.getMonth()}-${date.getDate()} &nbsp; &nbsp; &nbsp; 
                    查看人数：${item.view_count} &nbsp; &nbsp; &nbsp;
                    来自：${item.channel_name}
                </div>
            </div>
        `;
    });
    return html;
}

export function buildDetail(result:any){
    let html=template;
    result=JSON.parse(result);
    html+=`<div class="detail-content">
            <div class="detail-title">
                <p class="back" onclick="back()"> < 后退</p>
                <p class="bar">
                    ${result.channel.parentName}&nbsp; > &nbsp;
                    ${result.channel.name} >  &nbsp;
                    ${result.realm.realmName} &nbsp; &nbsp; &nbsp; 
                </p>
            </div>
            <div class="news-title">${result.title}</div>
            <div class="userInfo">
                <div class="headPicture"><img src="${result.user.headUrl}"></div>
                <div class="userName">
                    <p>${result.user.name}</p>
                    <p> ${result.createTime}</p>
                </div>
            </div>`;
    
    result.parts.forEach((item:any)=>{
        html+=`${item.content.replace(/color:.*;/g,"color: #8e8e8e")}`;
    });
    return `${html}</div>
    </body>
    <script>
        let vscode=null;
        (function() {
            vscode = acquireVsCodeApi();
        }());
        function back(){
            vscode.postMessage({type:"back"});
        }
    </script>
    </html>`;
}
