<template>
    <div>
        <!--<slot>{{swiperlist[0]}}</slot>-->
        <!--<span>{{swiperlist[0]}}</span>-->
        <slot></slot>
         <!--插槽的作用就是 从元素中接收传入的信息 并加入到slot对应的位置上 再加以显示-->
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in swiperlist" :key="item.id">
                <img :src="item.img" alt="" :class="{'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        name: "swiper",
        props: ["swiperlist", "isfull"]
    }
</script>

<style scoped lang="scss">
    .mint-swipe {
        height: 180px;

        /*.mint-swipe-item:nth-child(1) {*/
        /*background-color: #bfa;*/
        /*}*/
        .mint-swipe-item {
            text-align: center;
            /*&:nth-child(1) {*/
                /*background-color: red;*/
            /*}*/
            /*&:nth-child(2) {*/
                /*background-color: yellow;*/
            /*}*/
            /*&:nth-child(3) {*/
                /*background-color: cyan;*/
            /*}*/
            img {
                /*width: 100%;*/
                height: 100%;
            }
        }
    }
    .full {
        width: 100%;
    }
</style>