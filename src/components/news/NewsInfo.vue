<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.title}}</h3>
        <p class="subtitle">
            <span>发布时间：{{newsinfo.add_time | dateFormat}}</span>
            <span>点击次数：{{newsinfo.clicked}}</span>
        </p>
        <hr>
        <!--内容区-->
        <div class="content" v-html="newsinfo.content"></div>
        <img :src="newsinfo.img_url" alt="某图片">
        <!--评论区-->
        <comment-box :id="id"
                     :commentSrc="'http://120.77.181.41:3000/api/getnewscom?newsId=' + id"
                     :submitSrc="'http://120.77.181.41:3000/api/addnewscom'"></comment-box>

    </div>
</template>

<script>
    import axios from 'axios'
    import comment from '../subcomponents/Comment.vue'
    import {Toast} from 'mint-ui'

    export default {
        name: "NewsInfo",
        data() {
            return {
                id: this.$route.params.id,
                newsinfo: {}
            }
        },
        created() {
            this.getNewsInfo()
        },
        methods: {
            getNewsInfo() {
                axios
                    .get('http://120.77.181.41:3000/api/getnewsdetail', {
                        params: {
                            newsId: this.id
                        }
                    })
                    .then(res => {
                        if (res.data.status === -1) {
                            Toast('没有找到该新闻~~')
                            return
                        }
                        this.newsinfo = res.data.news
                    }).catch(function (err) {
                    console.log(err.message)
                })
            }
        },
        components: {
            'comment-box': comment
        }
    }
</script>

<style lang="scss">
    .newsinfo-container {
        padding: 0 4px;
        .title {
            /*margin: 0 auto;*/
            text-align: center;
            font-size: 16px;
            margin: 15px auto;
        }
        .subtitle {
            font-size: 13px;
            color: skyblue;
            display: flex;
            justify-content: space-between;
        }
        .content {
            font-size: 13px;
            img {
                width: 100%;
            }
        }
    }
</style>