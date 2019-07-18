import Vue from 'vue'

//按需引入
import {Header, Swipe, SwipeItem} from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

//导入axios模块
import axios from 'axios'
Vue.use(axios)

//导入MUI
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入路有模块
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
//引入自定义的路由模块
import router from './router.js'

//导入App根组件
import app from './App.vue'
var vm = new Vue({
    el: '#app',
    //使用render渲染组件
    render: c => c(app),
    router
})