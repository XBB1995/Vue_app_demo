<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h3>{{item.title}}</h3>
                            <div class="goods-info">
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :count="item.cou" :goodsid="item.id"></numbox>
                                <!--注意购物车中的商品数量-->
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import numbox from '../subcomponents/shopcar_numbox.vue'
    import axios from 'axios'

    export default {
        name: "ShopcarContainer",
        data() {
            return {
                goodslist: []
            }
        },
        components: {
            numbox
        },
        created() {
            this.getGoodsList()
        },
        methods: {
            remove(id, index) {
                this.goodslist.splice(index, 1)
                this.$store.commit("removeFromCart", id)
            },
            getGoodsList() {
                let idArr = []
                let countObj = {}
                this.$store.state.cart.forEach(item => {
                    idArr.push(item.id)
                    countObj[item.id] = item.count
                })
                if (idArr.length <= 0) return
                axios
                    .get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/'
                        + idArr.join(","))
                    .then(res => {
                        res.data.message.forEach(item => {
                            item.cou = countObj[item.id]
                        })
                        this.goodslist = res.data.message
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .shopcar-container {
        background-color: #eee;
        overflow: hidden;
        .goods-list {
            .mui-card-content-inner {
                display: flex;
                align-items: center;
                .mint-switch {
                    /*margin: 0 10px;*/
                }
                img {
                    width: 60px;
                    height: 60px;
                }
                h3 {
                    font-size: 13px;
                }
                .info {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .goods-info {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .price {
                            color: red;
                            font-weight: bold;
                        }
                        .mui-numbox {
                            margin: 0 8px;
                        }
                    }

                }
            }
        }
    }
</style>