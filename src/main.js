import Vue from 'vue'
// 导入Vuex
import Vuex from 'vuex'

//导入路由模块
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
//引入自定义的路由模块
import router from './router.js'

// 导入vuex 数据仓储
Vue.use(Vuex)

// var cart = JSON.parse(localStorage.getItem('cart') || '[]')
var store = new Vuex.Store({
    state: {
        // 如果在组件中访问：
        // this.$store.state.count
        // count: 0
        // cart: [
        //     // {id count price selected}
        // ]
        //读取数据 初始化
        cart: JSON.parse(localStorage.getItem('cart') || '[]')
    },
    mutations: {
        // 如果需要操作store中state中的值 只能通过调用mutations中的方法
        // 方便在数据紊乱后找到来由
        // 组件想要调用其中的方法必须要使用this.$store.commit（'方法名'）
        // 函数参数列表最多支持两个参数 参数一是方法名 参数二 才是自定义参数
        // {可以对象或数组}
        addToCart(state, goodsinfo) {
            // 假设没有找到对应的商品标记flag
            let flag = false
            state.cart.some(item => {
                if (item.id ===  goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return flag
                }
            })
            if (!flag) {
                state.cart.push(goodsinfo)
            }
            // 更新完数据后保存到本地的localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        updateGoodsInfo(state, goodsinfo) {
            state.cart.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeFromCart(state, id) {
            state.cart.some((item, i) => {
                if (item.id == id) {
                    state.cart.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        updateGoodsSelected(state, info) {
            state.cart.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                    return true
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    },
    getters: {
        // 只负责对外提供数据 不能修改数据 和过滤器比较类似
        // 都不会修改源数据 只是加了一层包装 提供给调用者
        // 与computed也比较像
        // optCount: function (state) {
        //     return state.count
        // }
        // 使用方法： this.$store.getters.optCount
        getAllCount(state) {
            let ac = 0
            state.cart.forEach(item => {
                if (true) {
                    ac += item.count
                }
            })
            return ac
        },
        getGoodsCountAndAmount(state) {
            let obj = {
                count: 0,
                amount: 0
            }
            state.cart.forEach(item => {
                if (item.selected) {
                    obj.count += item.count
                    obj.amount += item.price * item.count
                }
            })
            return obj
        }
    }
})

//按需引入
//导入Mint-UI组件 lazy-load
// import {Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Button.name, Button)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.use(Lazyload);
//但是懒加载必须全部导入 才能生效？？？
import MintUI from 'mint-ui'

Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//导入axios模块
import axios from 'axios'

Vue.use(axios)

//图片预览插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)

//导入MUI
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//引入全局过滤器
import moment from 'moment'

Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})


//导入App根组件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    //使用render渲染组件
    render: c => c(app),
    router,
    store // 挂载一个全局的数据仓储, 挂载后全局所有组件都能访问
})