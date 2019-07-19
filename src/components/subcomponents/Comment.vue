<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入评论（最多120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="item in comments" :key="item.comId">
                <div class="cmt-title">
                    第{{item.comId + 1}}楼&nbsp;&nbsp;用户：{{item.username}}&nbsp;&nbsp;评论时间：{{item.comDate|dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content === ''?'此处应有评论':item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import axios from 'axios'
    import {Toast} from 'mint-ui'

    export default {
        name: "Comment.vue",
        data() {
            return {
                pageIndex: 1,
                comments: [],
                msg: '',
                username: 'XBB'
            }
        },
        props: ['id', 'commentSrc', 'submitSrc'],
        //props中使用this.来调用
        created() {
            this.getComments()
        },
        methods: {
            getComments() {
                axios
                    .get(this.commentSrc, {
                        params: {
                            // newsId: this.id,
                            pageIdx: this.pageIndex
                        }
                    })
                    .then(res => {
                        // console.log(res);
                        if (res.data.status === -1) {
                            return Toast('评论加载完毕！')
                        } else {
                            this.comments = this.comments.concat(res.data.comments)
                        }
                    }).catch(function (err) {
                    console.log(err.message)
                })
            },
            getMore() {
                this.pageIndex++
                this.getComments()
            },
            postComment() {
                if(this.msg.trim().length === 0) {
                    return Toast("请输入评论内容~~")
                }
                axios
                    .post(this.submitSrc, {
                        newsId: this.id,
                        username: this.username,
                        content: this.msg.trim()
                    })
                    .then(res => {
                        // console.log(res);
                        // if (res.data.status === 1) {
                        let cmt = {
                            username: this.username,
                            add_time: Date.now(),
                            content: this.msg.trim()
                        }
                        this.comments.unshift(cmt)
                        this.msg = ''
                        Toast("发表成功！")
                        // }
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    .cmt-container {
        h3 {
            font-size: 18px;
        }
        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
            /*padding: 0;*/
        }
        .cmt-list {
            margin: 5px 0;
            .cmt-item {
                font-size: 13px;
                .cmt-title {
                    background-color: lightblue;
                    line-height: 30px;
                }
                .cmt-body {

                }
            }
        }
    }
</style>