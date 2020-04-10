## ajax与后台交互
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
## 引入vuex并使用
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
    5). vuex与api交互
        异步action: 调用api接口请求函数  ==> 成功之后commit  ===> 调用mutation  ==> 更新状态数据
## TypeNav动态组件
    1). 组件与vuex交互, 动态显示3级分类
        a. 触发vuex中的getBaseCategoryList  actions调用:
         mounted(){this.$store.dispatch('getBaseCategoryList')}
        b.将vuex中的数据读取到组件的计算属性：import {mapState} from 'vuex'     
        computed:{...mapState({categoryList:state=>state.home.baseCategoryList})}
        c.在模板中显示读取到的计算属性数据

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
        设计一个标识当前分类下标的数据: currentIndex=-1
        当前分类的类名: :class="{item_on: currentIndex===index}"
        item_on类的样式: 背景色 / 下级列表display: block
    3). 点击某个分类项, 跳转到search路由 带query参数: /search?categoryName=电子书刊&category2Id=1
        categoryName: xxx
        category1Id: 1级分类ID
        category2Id: 2级分类ID
        category3Id: 3级分类ID
        path:'' query:{}   /  name:''  params:{}

##  函数节流
        减少触发次数，每次在间隔时间后触发
## 函数防抖
        连续点击多次，在最后一次并结束间隔时间后触发一次
### 对lodash库实现按需引入, 减小打包文件
    1). 只引入要用的工具函数, 实现对lodash实现按需引入打包throttle  _.throttle(function(){})
    2). 好处: 减小打包文件, 访问更快

### 利用事件委托, 优化事件处理效率
    1). 给多个需要绑定事件的元素的共同父元素绑定事件监听
    2). 在事件回调函数中取出发生事件的元素: event.target
    3). 判断此元素是多个目标元素中的某个才进行处理

### 利用标签自定义属性携带动态数据
    1). 在发生事件的标签指定以data-xXX开头的属性
      <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId"></a>
    2). 在事件回调函数通过event得到标签, 从而取出自定义属性值
      const value = event.target.dataset.xxx
      注意: xxx是全小写的  ===> 当前得到2个属性: categoryname / category3id
    

### 控制1级列表的显示与隐藏
    1). 需要一个控制一级列表显示的状态数据: isShowFirst
    2). 在首页一直显示, 在搜索页面默认是隐藏的: 
        在mounted()中根据根据当前请求的路径判断, 如果是不是首页隐藏
        在mouseleave中  ==> 如果当前不是首页,隐藏一级列表

### 优化请求执行的位置, 减少请求次数
    问题: 切换路由组件会发多次获取分类列表的请求?
    原因: 触发请求的代码写在TypeNav组件中, 每渲染一次, 就会发一次请求
    解决: 触发请求的代码写在App中就可以 this.$store.dispatch('')



