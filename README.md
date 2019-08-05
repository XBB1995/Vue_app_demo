# 这是一个用Vue制作的项目

## 插槽
1. 从元素中接收传入的信息 
2. 并加入到slot对应的位置上 再加以显示

## 数据接口api 
 + 特别感谢 虽然最近服务器出错了 https://github.com/arm-liang/vue-mobbile-server/blob/master/API%E6%8E%A5%E5%8F%A3.md
 + 特别感谢 http://www.liulongbin.top:3005 提供的新接口
 
## ①用传统方式命令行把修改过的代码上传
1. git add .
2. git commit -m "提交信息"
3. git push

## ②使用Webstorm上传

## 制作首页APP组件
1. 完成Header区域，使用Mint-ui中的Header插件
2. 制作底部的Tabbar区域，使用MUI的Tabbar.html
 + 在制作购物车（等类似）小图标需要额外操作
 + 需要把用到的.css和.ttf文件加入到lib
 + 为购物车小图标添加以下样式 mui-icon是基类 不能删
3. 要在中间区域放置一个<router-view>展示路由匹配到的组件

## 改造tabbar为路由router-link 并设置路由高亮 linkActiveClass

## 制作首页轮播图布局 增加轮播图数据

1. 使用axios获数据
2. 获取到的数据保存到data中
3. 用v-for渲染

## 改造Home组件中的六宫格区域及样式

## 增加tabbar点击切换组件的动画
1. 使用position:absolute绝对定位
2. 使用v-enter和v-leave-to分离制作页面进入的动画
3. 注意拼写 by.疯狂拼错的XBB

## 改造新闻资讯路由链接
1. 绘制基本界面 MUI中的media-list.html
2. 获取数据
3. 渲染数据

## 实现新闻讯息列表 点击跳转
1. 把列表中的每项改造为router-link 在跳转时提供id标识符
2. 创建新闻详情的组件页面
3. 在路由模块中将新闻详情的路由地址和组件页面对应起来

## 实现新闻详情中的布局和数据渲染

## 实现点击加载更多评论的功能

## 单独封装一个comment.vue组件 
1. 创建单独组件
2. 在需要使用的页面中手动导入
 + import comment from './comment.vue'
3. 在父组件中，使用component属性注册为子组件
4. 以标签格式在页面中引用

## 获取所有的评论数据 显示到屏幕中

## 实现点击加载更多评论的功能
1. 绑定时间 请求下一页的数据
2. 点击按钮后 页数增加 重新调用获取评论方法
3. 防止新数据对老数据的覆盖，需要用concat方法拼接数组

## 实现发表评论的按钮
1. 为文本框做双向数据绑定
2. 按钮绑定时间
3. 输入内容校验 并给出Toast提示
4. 通过axios发送提交请求
5. 自动刷新评论列表，以查看最新的评论
 + 如果使用getComments方法刷新列表 只能得到最后一页的评论
 + 因此在评论成功后 在客户端手动拼接出一个最新的评论对象
 + 追加到comments的开头 实现完美刷新代码的需求
 
 ## 改造图片分享按钮为路由的链接
 
 ## 绘制图片列表的结构并美化样式
 1. 制作 顶部的滑动条
  + 利用MUI中的tab-top-webview-main.html
  + 需要去掉full-screen类
  + 滑动条需要通过增加js文件 需要初始化 js组件
    1. 需要导入包
    2. 调用官方提供的方式去初始化
  + 导入的mui包可能会报错（实际上我并没有遇到）
  解决方法： 
    1. mui.js中的方法修改（不现实）
    2. 开启Webpack的非严格模式
  + 滑动条无法正常工作 初始化工作要在mounted中执行
  + 需要将tabbat按钮样式中的类复制重命名 避免冲突
 2. 制作 底部的图片列表
  + 需要懒加载技术 使用Mint-UI提供的组件lazy-load组件及样式美化
  
 ## 点击图片跳转到图片详情页面并加入评论模块
 1. 改造li为router-link时需要用到 tag="li"来实现指定渲染
 
 ## 实现图片详情中缩略图功能
 1. 使用vue-preview 插件
 2. 获取图片列表 使用v-for 渲染
 3. 宽高需要用forEach赋值
 
 ## 绘制商品购买基本界面并美化
 
 ## 尝试在手机上进行项目的预览和测试
 1. 保证手机和电脑处于相同WiFi环境下 即可以访问到电脑的IP
 2. 在dev中增加--host指令 把当前电脑的WiFi IP地址 设置为--host的指令值
  + ipconfig
  
 ## 网页中有两种跳转方式
 1. a标签 
 2. window.location.href 编程式导航
 
 ## 实现头部返回按钮的功能
 1. 增加返回按钮
 2. 给按钮绑定事件 $router.back()
 
 ## 实现添加购物车小球动画
 1. 小球位置获取 badge位置获取
 2. 动画移动可以使用简单的DOM操作
 3. 只需要半场动画 ***钩子函数***
 4. 移动具体通过 domObject.getBoundingClientRect() 获取坐标
 
 ## 实现修改购买数量上限随库存改变
 1. 注意使用属性绑定的方式传递
 2. 上限由promise异步获取 需要动态获取 使用watch 属性监听
 3. 使用js方法修改 查看官方文档
 
 ## 引入vuex全局数据仓储 
 1. this.$store.cart 调用值
 2. this.$store.commit("func", arg)
  + 只能传一个参数 但是可以是 数组 或对象
 3. this.$store.getters.func
  + 增加一层包装 只能提供数据不能修改数据
  
## 完善购物车功能 数据与localStorage同步

## 增加返回按钮

# ❀完结撒花❀
