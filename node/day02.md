##ajax与后台交互
   1). 对axios进行二次封装 const ajax=axios.create({})
        1. 配置通用的基础路径和超时 
        2. 显示请求进度条Nprogress
        3. 添加请求拦截器和响应拦截器 ajax.interceptors.request.use((config)=>{return config})
        4.  响应拦截器成功返回response.data
            处理请求错误, 具体请求也可以选择处理或不处理
            return Promise.reject(error)  失败的Promise
            return  new Promise(()=>{}) 结束promise链
    2). 定义接口请求函数
        内部调用ajax函数
        函数的返回值是promise
    3). 调用接口请求函数发请求
        使用async/await简化promise的使用
    4). 配置代理解决跨域问题
        在vue.config.js中配置
##引入vuex并使用
    1). 下载vuex
    2). vuex的基本使用 5个属性
        state :    vuex的基本数据，用来存储变量
        mutations：提交更新数据的方法，必须是同步的 存储数据commit：同步操作，
                    写法：this.$store.commit ('mutations方法名',值)
        actions ： 和mutation的功能大致相同，不同之处在于1. Action 提交的是 mutation，
                    而不是直接变更状态。 2. Action 可以包含任意异步操作。
                    存储数据dispatch：异步操作，写法： this.$store.dispatch('mutations方法名',值)
        getters： 从基本数据(state)派生的数据，相当于state的计算属性
        modules:  模块化vuex，可以让每一个模块拥有自己的state、mutation、action、getters,
                  使得结 构非常清晰，方便管理。
    3). vuex多模块编程
        什么时候用? 当vuex管理的数据个数很多时
        好处: 每个功能模块的数据单独管理, 更方便, 更有扩展性
    4). vuex多模块编程的总state结构
        {
            user: {
                userInfo: {}
            },
            home: {
                baseCategoryList: []
            }
        }
##TypeNav动态组件
    1). 组件与vuex交互, 动态显示3级分类
         触发vuex中的getBaseCategoryList  actions调用:
         mounted(){this.$store.dispatch('getBaseCategoryList')}
        获取state数据：import {mapState} from 'vuex'     
        computed:{...mapState({categoryList:state=>state.home.baseCategoryList})}

        [
            {categoryName:'一级',
             categoryId:1,
             categoryChild:[
                 {
                    categoryName:'二级',
                    categoryId:1,
                    categoryChild:[
                        {
                        categoryName:'三级',
                        categoryId:1,
                        }
                    ]
                 }
             ]
            }
        ]
    2). 控制2/3级分类列表的显示与隐藏
        item_on:index===currentIndex
    3). 点击某个分类项, 跳转到search路由: /search?categoryName=电子书刊&category2Id=1
        categoryName: xxx
        category1Id: 1级分类ID
        category2Id: 2级分类ID
        category3Id: 3级分类ID
        path:'' query:{}
##mock数据接口
##利用mock数据实现动态ListConter组件