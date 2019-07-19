import VueRouter from 'vue-router'

import app from './App.vue'
//导入模块
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'


//创建路由
var router = new VueRouter({
    routes: [
        //对象 =  路径， 组件
        {path: '/', redirect: '/home'},
        {path: '/home', component: HomeContainer,},
        {path: '/member', component: MemberContainer},
        {path: '/shopcar', component: ShopcarContainer},
        {path: '/search', component: SearchContainer},
        {path: '/home/newslist', component: NewsList},
        {path: '/home/newslist/:id', component: NewsInfo},
        {path: '/home/photolist', component: PhotoList},
        {path: '/home/photoinfo/:id', component: PhotoInfo},
        {path: '/home/goodslist', component: GoodsList},
        {path: '/home/goodsinfo/:id', component: GoodsInfo}

    ],
    linkActiveClass: 'mui-active'
    //覆盖默认的路由高亮的类
})

export default router