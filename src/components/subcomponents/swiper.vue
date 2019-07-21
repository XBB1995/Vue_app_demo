<template>
    <div>
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in swiperlist" :key="item.src">
                <img :src="item.src" alt="" :class="{'full': isfull}">
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