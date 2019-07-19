<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!--//滑动条高亮 通过给类绑定数组属性实现-->
                    <a :class="['mui-control-item', (index==0)?'mui-active':'']" v-for="(item,index) in cates"
                       :key="index" @click="getPhotoListByType(item)">
                        {{item}}
                    </a>
                </div>
            </div>
        </div>
        <ul class="photo-list">
            <router-link tag="li" v-for="item in photosList" :key="item.phoId"
                         :to="'/home/photoinfo/' + item.phoId">
                <img v-lazy="item.phos[item.phoId>=item.phos.length?0:item.phoId]">
                <div class="info">
                    <h3 class="info-title">{{item.intro}}</h3>
                    <div class="info-body">{{item._id}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    //导入mui的js文件
    import mui from '../../lib/mui/js/mui.min.js'
    import axios from 'axios'
    // import {Toast} from 'mint-ui'

    export default {
        name: "PhotoList",
        data() {
            return {
                cates: [],
                pageIdx: 1,
                photosList: []
            }
        },
        created() {
            this.getAllCategory()
            this.getPhotoListByType(this.cates[0])
        },
        mounted() {
            // 如果要操作元素 最好在mounted里
            // 此时的DOM元素都是最新的
            // 初始化滑动控件
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005
                // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            })
        },
        methods: {
            getAllCategory() {
                axios
                    .get('http://120.77.181.41:3000/api/getphotypes')
                    .then(res => {
                        // console.log(res);
                        if (res.data.status === 1) {
                            res.data.types.unshift("全部"
                                //     {
                                //     // title: '全部',
                                //     // id: 0
                                // }
                            )
                            this.cates = res.data.types
                        }
                    })
            },
            getPhotoListByType(ptype) {
                axios
                    .get('http://120.77.181.41:3000/api/getpho', {
                        params: {
                            type: ptype === '全部' ? '' : ptype,
                            pageIdx: this.pageIdx
                        }
                    })
                    .then(res => {
                        // if (res.data.status == -1) {
                        //     return
                        // }
                        this.photosList = res.data.phos
                        // this.pageIdx--
                    })
            }
        }
    }
</script>

<style scoped lang="scss">
    * {
        touch-action: pan-y;
    }

    .photo-list {
        list-style: none;
        margin: 0;
        padding: 10px 10px 0;
        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #ccc;
            position: relative;
            img {
                width: 100%;
                vertical-align: middle;
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info {
                position: absolute;
                background-color: rgba(0, 0, 0, 0.4);
                bottom: 0;
                color: white;
                text-align: left;
                width: 100%;
                padding-left: 5px;
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    font-size: 13px;
                }
            }
        }

    }


</style>