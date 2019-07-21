<template>
    <div class="goods-list">
        <!--<router-link :to="'/home/goodsinfo/' + item.godId"-->
        <!--class="goods-item" v-for="item in goodslist"-->
        <!--:key="item.godId" tag="div">-->
        <!--<img :src="item.phos" alt="">-->
        <!--<h3 class="title">{{item.intro}}</h3>-->
        <!--<div class="goods-info">-->
        <!--<p class="price">-->
        <!--<span class="now">￥{{item.newPrice}}</span>-->
        <!--<span class="old">￥{{item.oldPrice}}</span>-->
        <!--</p>-->
        <!--<p class="sell">-->
        <!--<span>热卖中</span>-->
        <!--<span>剩余{{item.quantity}}</span>-->
        <!--</p>-->
        <!--</div>-->
        <!--</router-link>-->

        <!--换一种方式实现跳转-->
        <div class="goods-item" v-for="item in goodslist"
             :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h3 class="title">{{item.title}}</h3>
            <div class="goods-info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large"
                   @click="getMore">加载更多
        </mt-button>
    </div>

</template>

<script>
    import axios from 'axios'
    import {Toast} from 'mint-ui'
    import router from "../../router";

    export default {
        name: "GoodsList",
        data() {
            return {
                pageIdx: 1,
                goodslist: []
            }
        },
        created() {
            this.getGoodsList()
        },
        methods: {
            getGoodsList() {
                axios
                    .get('http://www.liulongbin.top:3005/api/getgoods', {
                        params: {
                            pageindex: this.pageIdx
                        }
                    })
                    .then(res => {
                        // console.log(res);
                        if (res.data.status === 0) {
                            this.goodslist = this.goodslist.concat(res.data.message)
                        }
                        if (res.data.message.length <= 0) {
                            return Toast('商品全部加载完毕~~')
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            },
            getMore() {
                this.pageIdx++
                this.getGoodsList()
            },
            goDetail(id) {
                this.$router.push("/home/goodsinfo/" + id)
            }
        }
    }
</script>

<style scoped lang="scss">
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goods-item {
            /*.clearfix:after,*/
            /*.clearfix:before {*/
            /*content: '';*/
            /*display: table;*/
            /*clear: both;*/
            /*}*/
            img {
                width: 100%;
            }
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 9px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 265px;
            /*position: relative;*/
            .title {
                font-size: 14px;
                /*line-height: 16px;*/
            }
            .goods-info {
                p {
                    margin-bottom: 0;
                    padding: 5px;
                }
                background-color: lightgray;
                width: 100%;
                /*position: absolute;*/
                /*bottom: 2px;*/
                .price {
                    .now {
                        color: red;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .old {
                        color: gray;
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                }

            }
        }
    }
</style>