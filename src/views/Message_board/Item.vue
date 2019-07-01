<template>

  <li class="list-group-item">
   <article>
      <div class="diskameta">
        <div class="author">
          <span class="diskaauthorname">{{comment.user_name}}</span>
          <a href="#" class="diskadate">Jun6 10, 2019 at 10:10</a>
        </div>
      </div>
      <div class="diskanumber">{{index}}</div>
      <div class="diskacontent">
        {{ comment.comment }}
      </div>
      <div class="diskareply"> <a href="javascript:;" @click="deleteItem">Delete</a></div>
    </article>

  </li>
</template>


<script>
  export default {
    props: {
      //指定属性名和属性值的类型
      comment: Object,
      deleteComment: Function,
      index: Number
    },
    methods: {
      deleteItem () {
        const {comment, index, deleteComment} = this;
        if (window.confirm(`确定删除${comment.name}评论吗?`)) {
          deleteComment(index);
        }
      }
    }
  }
</script>


<style>

  .li {
    transition: .5s;
    overflow: hidden;
  }
  .handle {
    width: 40px;
    border: 1px solid #ccc;
    background: #fff;
    position: absolute;
    right: 10px;
    top: 1px;
    text-align: center;
  }
  .handle a {
    display: block;
    text-decoration: none;
  }
  .list-group-item .centence {
    padding: 0px 50px;
  }
  .user {
    font-size: 22px;
  }



  /*!
   *  Font Awesome 4.0.3 by @davegandy - http://fontawesome.io - @fontawesome
   *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)
   */
  /* FONT PATH
   * -------------------------- */
  @font-face {
    font-family: 'FontAwesome';
    src: url('fonts/fontawesome-webfont.eot?v=4.0.3');
    src: url('fonts/fontawesome-webfont.eot') format('embedded-opentype'), url('fonts/fontawesome-webfont.woff?v=4.0.3') format('woff'), url('fonts/fontawesome-webfont.ttf?v=4.0.3') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  .fa {
    display: inline-block;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor:pointer;
  }

  .fa:hover{
    color:#064348;
    transform:scale(1.2);
    -ms-transform:scale(1.2); /* IE 9 */
    -moz-transform:scale(1.2); /* Firefox */
    -webkit-transform:scale(1.2); /* Safari and Chrome */
    -o-transform:scale(1.2); /* Opera */
    -webkit-transition: 0.5s;
    -moz-transition: 0.5s;
    -o-transition: 0.5s;
    -ms-transition: 0.5s;
    transition: 0.5s;

  }

  /* makes the font 33% larger relative to the icon container */

  .fa-2x {
    font-size: 2em;
  }


  /* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen
     readers do not read off random characters that represent icons */

  .fa-envelope:before {
    content: "\f0e0";
  }
  .fa-globe:before {
    content: "\f0ac";
  }
  .fa-user:before {
    content: "\f007";
  }
  .fa-comment:before {
    content: "\f075";
  }

  /* Feedbacks*/

  .diskaform{
    width:700px;
    margin: 0 auto;
    overflow:auto;
  }

  .diskaform .heading{
    width:100%;
    float:left;
    colo:#fff;
    padding-bottom:20px;
    border-bottom:solid;
    margin-bottom:20px;
  }
  .diskaform h1 {
    font-size: 2.625em;
    margin: 0;
    float:left;
    font-weight:bold;
  }

  .diskaform h3{ clear:both;}

  .diskaform h1 small{
    font-size:14px;
    position:relative;
    bottom:28px;
  }

  .diskaform a{
    color:#0b666e;
    text-decoration:none;
  }

  .diskaform a:hover, .diskabtn:hover{
    background:#064348;
    -webkit-transition: 0.5s;
    -moz-transition: 0.5s;
    -o-transition: 0.5s;
    -ms-transition: 0.5s;
    transition: 0.5s;
  }

  .addcomment{ float:right;}


  /* List comments*/

  .diskaform ol{
    clear: both;
    overflow: hidden;
    margin:0;
    padding:0;
  }
  .diskaform ol li, .diskameta .diskathumb {
    background-color: #FFFFFF;
    border: 1px solid #F4F4F4;
    list-style: none outside none;
    margin: 0 0 20px 35px;
    padding: 4px;
  }
  .diskaform article {
    position: relative;
  }
  .diskameta {
    background: none repeat scroll 0 0 #5c959a;
    height: auto;
    line-height: 37px;
    min-height: 37px;
    padding-left: 10px;
    position: relative;
  }
  .diskameta .diskathumb {
    display: block;
    left: -40px;
    margin: 0;
    position: absolute;
    top: 50px;
    border-radius: 50px;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
  }

  .diskameta .diskathumb img {
    display: block;
    cursor:pointer;
    height: auto;
    max-width: 100%;
    border-radius: 50px;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
  }

  .diskameta .diskathumb img:hover{
    opacity: .7;
    transform:scale(1.2);
    -ms-transform:scale(1.2); /* IE 9 */
    -moz-transform:scale(1.2); /* Firefox */
    -webkit-transform:scale(1.2); /* Safari and Chrome */
    -o-transform:scale(1.2); /* Opera */
    -webkit-transition: 0.5s;
    -moz-transition: 0.5s;
    -o-transition: 0.5s;
    -ms-transition: 0.5s;
    transition: 0.5s;
  }

  .diskaauthorname {
    color: #FFFFFF;
    font-size: 16px;
    float: left;
    line-height: 37px;
  }

  .diskadate {
    display: inline;
    float: right;
    font-size: 12px;
    color: #FFFFFF;
    margin-right: 10px;
    text-transform: uppercase;
  }

  .diskadate:hover{ background:none !important;}

  .diskanumber {
    bottom: 23px;
    color:#c9c9c9;
    font-size: 36px;
    line-height: 36px;
    position: absolute;
    right: 10px;
  }

  .diskacontent{
    font-size: 0.95em;
    line-height: 1.5;
    font-size: 15px;
    padding: 20px 55px 30px 45px;
    position: relative;
    text-align : left;
    color:#333333;
  }

  .diskareply a {
    bottom: 3px;
    display: block;
    font-size: 12px;
    position: absolute;
    right: 12px;
    text-transform: uppercase;
  }

  .diskareply a:hover{
    background:none !important;
  }

  .diskaform .depth-1{
    margin: 12px 0 12px 5px;
  }
  .diskaform .depth-2{
    margin: 12px 0 12px 30px;
  }
  .diskaform .depth-3{
    margin: 12px 0 12px 60px;
  }

  .diskapagination {
    padding: 20px 0;
    display:block;
    text-align:center;

  }

  .diskapagination a {
    background:#0B666E;
    padding:10px;
    color:#FFFFFF;
  }

  .diskapagination .active {
    padding:10px;
    background:#C9C9C9;
    color:#0B666E;
  }

  .diska-prepend{
    margin-bottom:10px;
    width:100%;
  }

  .diskaddon{
    color:#0b666e;
    float:left;
    padding:8px;
    width:5%;
    background:#FFFFFF;
    text-align:center;
    border-right:solid 1px #999999;

  }

  .diskafield {
    color:#000000;
    background:#FFFFFF;
    border:none;
    padding:15.5px;
    width:87.90%;
    display:block;
    font-family: 'Lato',Arial,sans-serif;
    font-size:14px;
  }

  .diskafield {
    font-family: 'Lato',Arial,sans-serif;
  }
  .diskabtn, .addcomment{
    display:block;
    border:none;
    background:#0b666e;
    float:right;
    color:#FFFFFF !important;
    padding:16px;
    cursor:pointer;
    text-decoration:none;
  }

</style>
