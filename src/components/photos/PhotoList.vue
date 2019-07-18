<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!--//滑动条高亮 通过给类绑定数组属性实现-->
                    <a :class="['mui-control-item', (index==0)?'mui-active':'']" v-for="(item,index) in cates" :key="index">
                        {{item}}
                    </a>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    //导入mui的js文件
    import mui from '../../lib/mui/js/mui.min.js'
    import axios from 'axios'

    export default {
        name: "PhotoList",
        data() {
            return {
                cates: []
            }
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
        created(){
            this.getAllCategory()
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
            }
        }
    }
</script>

<style scoped lang="scss">
    * {
        touch-action: pan-y;
    }
</style>