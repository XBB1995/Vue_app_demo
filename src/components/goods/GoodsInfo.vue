<template>
    <div class="goodsinfo-container">
        <!--商品轮播图区-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :swiperlist="swipe" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!--商品购买区-->
        <div class="mui-card">
            <div class="mui-card-header"> {{goodsinfo.name}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="intro"><span class="la">自营</span>{{goodsinfo.intro}}</p>
                    <p class="price">
                        市场价：
                        <del>￥{{goodsinfo.oldPrice}}</del>&nbsp;&nbsp;
                        销售价：<span class="now_price">￥{{goodsinfo.newPrice}}</span>
                    </p>
                    <p class="sell">购买数量：
                        <numbox></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立刻购买</mt-button>
                        <mt-button type="danger" size="small">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!--商品参数区-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.godNum}}</p>
                    <p>库存情况：{{goodsinfo.quantity}}</p>
                    <p>上架时间：{{goodsinfo.addDate|dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                <mt-button type="danger" size="large" plain>商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import swiper from '../subcomponents/swiper.vue'
    import numbox from '../subcomponents/goodsinfo_numbox.vue'

    export default {
        name: "GoodsInfo",
        data() {
            return {
                id: this.$route.params.id,
                swipe: [],
                goodsinfo: {}
            }
        },
        created() {
            this.getswipe()
        },
        methods: {
            getswipe() {
                axios
                    .get('http://120.77.181.41:3000/api/getgoddetail', {
                        params: {
                            godId: this.id
                        }
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data.status === 1) {
                            this.swipe = res.data.god.phos
                            this.goodsinfo = res.data.god
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            }
        },
        components: {
            swiper,
            numbox
        }
    }
</script>

<style scoped lang="scss">
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;
        .sell {
            color: #000;
        }

        .now_price {
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
        .mui-card-header {
            font-weight: bold;
        }
        .mui-card-content-inner {
            .la {
                color: #fff;
                background-color: #ff2305;
                /*box-shadow: 0 0 9px #ccc;*/
                font-size: 10px;
                padding: 0px 2px;
                border-radius: 20%;
                margin-right: 3px;
            }
            .intro {
                font-size: 13px;
            }
        }

        .mui-card-footer {
            display: block;
            button {
                margin: 15px 0;
            }
        }
    }
</style>