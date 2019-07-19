<template>
    <div class="photoinfo-container">
        <h3>{{pinfo.intro}}</h3>
        <p class="subtitle">
            <span>发布时间：{{pinfo._id}}</span>
            <span>点击次数：{{pinfo.__v}}</span>
        </p>
        <hr>
        <!--缩略图区域-->
        <div class="thumbs">
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>

        <!--图片内容区域-->
        <div class="content" v-html="cnt"></div>
        <!--放置评论子组件-->
        <cmt-box :id="id"
                 :commentSrc="'http://120.77.181.41:3000/api/getphocom?phoId=' + id"
                 :submitSrc="'http://120.77.181.41:3000/api/addphocom'"></cmt-box>
        <!--//动态控制获取评论的链接-->
    </div>
</template>

<script>
    import axios from 'axios'

    //导入评论子组件
    import comments from '../subcomponents/Comment.vue'

    export default {
        name: "PhotoInfo",
        data() {
            return {
                id: this.$route.params.id,
                pinfo: [],
                cnt: '',
                slide1: []
            }
        },
        created() {
            this.getPhotoInfo(this.id)
            this.getThumbs(this.id)
        },
        methods: {
            getThumbs(id) {
                axios
                    .get('http://120.77.181.41:3000/api/getgod', {
                        params: {
                            pageIdx: id
                        }
                    })
                    .then(res => {
                        res.data.gods.forEach(item => {
                            item.src = item.imgIntro[0]
                            item.msrc = item.phos[0]
                            item.title = item.name
                            item.w = 600
                            item.h = 800
                        })
                        this.slide1 = res.data.gods
                    })
            },
            handleClose() {
                console.log('close event')
            },
            getPhotoInfo(id) {
                axios
                    .get('http://120.77.181.41:3000/api/getphodetail', {
                        params: {
                            phoId: id
                        }
                    })
                    .then(res => {
                        this.pinfo = res.data.pho
                        var that = this
                        this.cnt = function () {
                            // console.log(that);
                            var i = 0
                            var msg = ''
                            while (i < that.pinfo.phos.length) {
                                msg = msg.concat(that.pinfo.phos[i].toString() + '<br>')
                                i++
                            }
                            return msg
                        }()
                    })
            }
        },
        components: {
            'cmt-box': comments
        }
    }
</script>
<style scoped lang="scss">
    .photoinfo-container {
        padding: 3px;
        h3 {
            color: #26A2FF;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content {
            font-size: 13px;
            line-height: 20px;
            //自动换行
            word-wrap: break-word;
        }
        .thumbs {
            /deep/ .my-gallery {
                display: flex;
                flex-wrap: wrap;
                figure {
                    width: 30%;
                    margin: 5px;
                    img {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>