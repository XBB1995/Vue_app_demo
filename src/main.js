import Vue from 'vue'
import app from './App.vue'
//按需引入
import {Header} from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header)
//导入MUI
import './lib/mui/css/mui.min.css'

var vm = new Vue({
    el: '#app',
    //使用render渲染组件
    render: c => c(app)
})