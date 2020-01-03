export default `

body{
    background: #252525;
}

.haveFun-content{
    width:92%;
    font-size:14px;
    margin:auto 10px;
}
.article-item{
    position: relative;
    zoom: 1;
    display: flex;
    margin-bottom:12px;
    padding: 0px 6px;
}

.comments{
    flex:1 12%;
    margin-right:20px;
    text-align:right;
    font-size: 12px;
    color: #c5c5c5;
    letter-spacing: 0;
    line-height: 12px;
}
.comments-count{
    font-size:20px;
    line-height:20px;
    color:#fd4c5b;
}

.article-item-preview{
    flex:9 86%;
    text-align:left;
}
.title{
    font-weight: bold;
    color:#cecece;
    font-size:21px; 
    line-height:21px;
    width:100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    cursor: pointer;
}

.title:hover{
    color:#fd4c5b
}
.description{
    overflow: hidden;
    text-overflow:ellipsis;
    cursor: pointer;
}

.info{
    width:86%;
    margin: 12px auto 0px auto;
    font-size:14px;
    padding-bottom:6px;
    border-bottom: 1px solid #e6e6e6;
}
.info p{
    flex:1;
}

.detail-content{
    width:96%;
    margin: 10px auto 20px auto;
    color:#c3c3c3!important;
}
.detail-title{
    width:100%;
    height:60px;
    line-height:60px;
    display: flex;
}

.back{
    flex:1;
    cursor: pointer;
}
.bar{
    flex:9;
}

.news-title{
    padding:6px 0px;
    font-size:20px;
}

.userInfo{
    display: flex;
}
.headPicture{
    flex:1;
    margin-right:20px
}

.headPicture img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.userName{
    font-size:15px;
    line-height: 25px;
    flex: 1 85%;
}
.userName p{
    margin:0px;
}

`;