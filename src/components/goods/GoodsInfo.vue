<template>
    <div class="goodsinfo-container">
        <!--半场动画需要用到钩子函数-->
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>
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
                        <numbox @getCount="getSelectedCount"
                                :max="goodsinfo.quantity"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立刻购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
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
                <mt-button type="primary" size="large"
                           plain @click="goDesc(id)">图文介绍
                </mt-button>
                <mt-button type="danger" size="large"
                           plain @click="goComment(id)">商品评论
                </mt-button>
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
                goodsinfo: {},
                ballflag: false, // 控制小球隐藏和显示,
                selectedCount: 1
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
                        if (res.data.status === 1) {
                            this.swipe = res.data.god.phos
                            this.goodsinfo = res.data.god
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            },
            goDesc(id) {
                //点击使用编程式导航跳转到图文介绍
                this.$router.push({
                    name: 'goodsdesc',
                    params: {id}
                })

            },
            goComment(id) {
                //点击使用编程式导航跳转到评论
                this.$router.push({
                    name: 'goodscomment',
                    params: {id}
                })
            },
            addToShopCar() {
                this.ballflag = !this.ballflag
            },
            beforeEnter(el) {
                el.style.transform = "translate(0, 0)"
            },
            // 小球动画优化
            // 位移的位置不能写死 分辨率改变和滚动条滚动后出现错误
            // 动态获取：徽标和小球的距离差
            // domObj.getBoundingClientReac() 返回矩阵对象 ltrb
            enter(el, done) {
                el.offsetWidth
                const ballPosition = this.$refs.ball.getBoundingClientRect()
                // 偶尔用一下dom 可以接受
                const badgePosition = document
                    .getElementById("badge")
                    .getBoundingClientRect()
                const xDist = badgePosition.left - ballPosition.left
                const yDist = badgePosition.top - ballPosition.top
                // 模板
                el.style.transform = `translate(${xDist}px, ${yDist}px)`
                el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"
                done()
            },
            afterEnter(el) {
                this.ballflag = !this.ballflag
            },
            getSelectedCount(count) {
                this.selectedCount = count
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
        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top: 444px;
            left: 152px;
        }
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