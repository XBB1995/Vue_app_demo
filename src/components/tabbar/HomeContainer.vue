<template>
    <div>
        <!--//轮播图区域-->
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in swipeitemList" :key="item.id">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <!--//六宫格区域-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></router-link></li>
            <!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">-->
                <!--<span class="mui-icon mui-icon-location"></span>-->
                <!--<div class="mui-media-body">location</div></a></li>-->
            <!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">-->
                <!--<span class="mui-icon mui-icon-search"></span>-->
                <!--<div class="mui-media-body">Search</div></a></li>-->
            <!--<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">-->
                <!--<span class="mui-icon mui-icon-phone"></span>-->
                <!--<div class="mui-media-body">Phone</div></a></li>-->
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "HomeContainer",
        data() {
            return {
                swipeitemList: []
                // 存储轮播图的数组
            }
        },
        created() {
            this.getSwipeitem()
        },
        methods: {
            getSwipeitem() {
                axios.get('http://120.77.181.41:3000/api/getcover')
                    .then(res => {
                        // console.log(res);
                        // if (res.data.status === 1) {
                        //启用立即执行函数给图片附上id
                        var len = res.data.imgs.length
                        this.swipeitemList = function(len) {
                            var sl = []
                            for (let i=0;i<len;i++) {
                                sl.push({
                                    id: i,
                                    img: res.data.imgs[i]
                                })
                            }
                            return sl
                        }(len)
                        // this.swipeitemList = {
                        //     id: 1, img: res.data.imgs
                        // }
                        // }
                    }).catch(error => console.log(error))
            }
        }
    }
</script>

<style scoped lang="scss">
    .mint-swipe {
        height: 180px;

        /*.mint-swipe-item:nth-child(1) {*/
        /*background-color: #bfa;*/
        /*}*/
        .mint-swipe-item {
            &:nth-child(1) {
                background-color: red;
            }
            &:nth-child(2) {
                background-color: yellow;
            }
            &:nth-child(3) {
                background-color: cyan;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .mui-table-view.mui-grid-view.mui-grid-9 {
        background-color: white;
        border: 0;
        img {
            width: 60px;
        }
        .mui-media-body {
            font-size: 12px;
        }
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
    }
</style>