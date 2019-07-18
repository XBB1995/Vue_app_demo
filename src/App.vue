<template>
    <div class="app-container">
        <!--头部-->
        <mt-header fixed title="Vue APP demo"></mt-header>

        <!--内容-->
        <transition>
            <router-view></router-view>
        </transition>


        <!--底部菜单-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped lang="scss">
    /*scoped 通过css的属性选择器实现*/
    .app-container {
        padding-top: 40px;
        overflow-x: hidden;
    }

    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
        /*默认left：0 top：0*/
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.4s ease;
    }

</style>