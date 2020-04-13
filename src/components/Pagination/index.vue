<template>
  <!--分页组件-->
  <div class="pagination" v-if="pageConfig.total>0">
    <!--上一页-->
    <button :disabled="currentPage===1" @click="changeCurrentPage(currentPage-1)">上一页</button>
    <!-- 第1页 -->
    <button v-if="startEnd.start>1" @click="changeCurrentPage(1)">1</button>
    <!-- 省略号 start>2才显示 -->
    <button disabled  v-if="startEnd.start>2">···</button>
      <!-- 连续页码  34567  遍历是从1-7  no>=start 才能3-7-->
    <button 
      v-for="no in startEnd.end"   
      :key="no"
      v-if="no>=startEnd.start"
      :class="{active: currentPage===no}"
      @click="changeCurrentPage(no)"
      >{{no}}</button> <!-- 34567 -->

    <!-- 省略号 end<totalPages-1  -->
    <button disabled v-if="startEnd.end<totalPages-1">···</button>
    <!-- 最后一页 -->
    <button v-if="startEnd.end<totalPages"  @click="changeCurrentPage(totalPages)">{{totalPages}}</button>
    <!--下一页-->
    <button :disabled="currentPage===totalPages" @click="changeCurrentPage(currentPage+1)">下一页</button>
    <!-- 总记录数 -->
    <button disabled style="margin-left: 30px">共 {{pageConfig.total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",

    props: {
      pageConfig: {
        type: Object,
        default: {
          total: 0, // 总数据个数
          showPageNo: 5, // 连续显示的页码数
          pageNo: 1,  // 当前页码
          pageSize: 10, // 每页的数据个数
        }
      }
    },


    data () {
      // 在data中可以读取props和Vue原型对象上的属性
      console.log('----', this.pageConfig, this.$bus)
      // 在data()中不可以直接读取data对象中的数据
      console.log('++++', this.currentPage)

      return {
        currentPage: this.pageConfig.pageNo  // 当前页码
      }
    },

    computed: {

      /* 
      总页码数
      */
      totalPages () {
        const {total, pageSize} = this.pageConfig
        if (total<=0 || pageSize<=0) return 0

        return Math.ceil(total/pageSize) // 需要向上取整
      },
      startEnd () {
        let start = 0
        let end = 0

        const {totalPages, currentPage, pageConfig:{showPageNo}} = this // 多层级对象解构

        start = currentPage - Math.floor(showPageNo/2)
        if (start<1) {
          start = 1
        }

        end = start + showPageNo -1
        if (end > totalPages) {
          end = totalPages
          start = end - showPageNo + 1
          if (start<1) {
            start = 1
          }
        }
        return {start, end}
      },


      startEnd2 () {
        // 得到已有依赖数据
        // 当前页码 / 连续数码数 / 总页码数
        const currentPage = this.currentPage
        const showPageNo = this.pageConfig.showPageNo
        const totalPages = this.totalPages

        // 计算产生需要的数据
        let start = 0
        let end = 0
        start = currentPage - Math.floor(showPageNo/2)
       
       if (start<1) {  
         start = 1
       }

        if (end>totalPages) { 
          end = totalPages // 如果end超过了最大页码, 修正为最大页码

          start = end - showPageNo + 1   // 10 - 5 + 1

          if (start<1) {
            start = 1
          }
        }
        return {start, end}
      }
    },

    watch: {
      /*
      当接收的pageConfig中的pageNo发生改变调用  外部数据变化用watch监视
       */
      'pageConfig.pageNo' (value) {
        // 将当前页码指定为外部传入的值
        this.currentPage = value
      }
    },
    
    methods: {

      /* 
      将当前页码改为指定页码
      */
      changeCurrentPage (page) {
        // 修改当前页码
        this.currentPage = page
        //内部数据改变 通知外部父组件 分发自定义事件
        this.$emit('changeCurrentPage', page)
      }
    },

    beforeCreate () { // beforeCreate()在data()之前执行
      console.log('beforeCreate()', this.currentPage) // undefined
    },
    created () { // created()在data()之后执行
      console.log('created()', this.currentPage) // 有值
    }
  }
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline:none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>