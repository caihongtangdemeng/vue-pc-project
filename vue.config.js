module.exports={
  lintOnSave:false, //直接关闭eslint
  // lintOnSave:'warning',  只输出提示信息，项目运行
  devServer:{ //配置代理服务器
    proxy:{
      '/api':{
        target:'http://182.92.128.115',
        changeOrigin:true,

      }
    },
    historyApiFallback:{
      index:'/index.html'//index.html为当前目录创建的template.html
}
  }
}