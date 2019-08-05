<template>
    <div>
        <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :keys="item.id">
                <router-link :to="'/home/newslist/' + item.id" class="mui-navigate-right">
                    <img class="mui-media-object mui-pull-left"
                         :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>时间：{{item.add_time | dateFormat}} </span>
                            <span>点击：{{item.click}}次 </span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
        <mt-button type="primary" @click="getNewsList" size="large">加载更多</mt-button>
        <mt-button type="danger" @click="getReverseList" size="large">反转列表</mt-button>
    </div>
</template>

<script>
    import axios from 'axios'
    import {Toast} from 'mint-ui'

    export default {
        name: "NewsList",
        data() {
            return {
                newslist: [],
                // pageIdx: 1
            }
        },
        created() {
            this.getNewsList()
        },
        methods: {
            getNewsList() {
                axios
                    // .post('http://api.komavideo.com/news/list', {
                    //     'pageSize': 20
                    // })
                    .get('http://www.liulongbin.top:3005/api/getnewslist', {
                        params: {
                            // pageIdx: this.pageIdx
                        }
                    })
                    .then(res => {
                        // console.log(res);
                        if (!res.data.message) {
                            Toast("新闻全部加载完毕~~")
                            return
                        }
                        // this.newslist.push(JSON.parse(res.data.news))
                        // this.pageIdx++
                        // console.log(JSON.parse(res.data.news))
                        //数组与数组的拼接使用concat
                        this.newslist = this.newslist.concat(res.data.message)
                        // var len = res.data.length
                        // this.newslist = function(len) {
                        //     var sl = []
                        //     for (let i=0;i<len;i++) {
                        //         sl.push({
                        //             id: i,
                        //             checkcount: Math.round(Math.random()*20),
                        //             news: res.data[i]
                        //         })
                        //     }
                        //     return sl
                        // }(len)
                        // this.newslist = res.data
                    }).catch(function (err) {
                    console.log(err.message)
                })
            },
            getReverseList() {
                this.newslist.reverse()
            }
        }
    }
</script>

<style scoped lang="scss">
    .mui-table-view {
        li {
            h1 {
                font-size: 13px;
            }
            .mui-ellipsis {
                font-size: 12px;
                color: deepskyblue;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>