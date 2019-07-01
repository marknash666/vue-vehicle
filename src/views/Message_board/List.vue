<template>
  <div class="col-md-8">
    <h3 class="reply">评论:</h3>
    <h4 v-show="comments.length===0">暂无评论,左侧表格可添加评论!</h4>
    <ul class="list-group">
      <Item v-for="(comment,index) in comments" :key="index" :comment="comment" :deleteComment="deleteComment" :index="index"/>
    </ul>
  </div>
</template>

<script>
  import Item from '@/views/Message_board/Item.vue'
  export default {
    //声明接收属性,这个属性就会成为组件对象的属性
    //此处只指定了属性名
    props: ['comments', 'deleteComment'],
    components: {
      Item
    }

  }
</script>

<style>
  .reply {
    margin-top: 0px;
    float: contour;
    padding-bottom:5px;
    border-bottom:solid  #5c959a;
    margin-bottom:20px;
  }
  .col-md-8 h4 {
  font-size: 16px;
  }

</style>
