# 这是一个用Vue制作的项目

##①用传统方式命令行把修改过的代码上传

1. git add .
2. git commit -m "提交信息"
3. git push

#②使用Webstorm上传

##制作首页APP组件
1. 完成Header区域，使用Mint-ui中的Header插件
2. 制作底部的Tabbar区域，使用MUI的Tabbar.html
 + 在制作购物车（等类似）小图标需要额外操作
 + 需要把用到的.css和.ttf文件加入到lib
 + 为购物车小图标添加以下样式 mui-icon是基类 不能删
3. 要在中间区域放置一个<router-view>展示路由匹配到的组件

##改造tabbar为路由router-link 并设置路由高亮 linkActiveClass

##制作首页轮播图布局 增加轮播图数据

1. 使用axios获数据
2. 获取到的数据保存到data中
3. 用v-for渲染

##改造Home组件中的六宫格区域及样式

##增加tabbar点击切换组件的动画
1. 使用position:absolute绝对定位
2. 使用v-enter和v-leave-to分离制作页面进入的动画
3. 注意拼写 by.疯狂拼错的XBB