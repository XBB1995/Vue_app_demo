<template>
    <div class="mui-numbox" data-numbox-min="1" style="height: 25px;">
        <!--使用watch属性监听父组件传递的值，最后一次肯定是合法的max数值-->
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id='test' class="mui-input-numbox" ref="numbox"
               type="number" :value="count" @change="countChanged"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "goodsinfo_numbox",
        mounted() {
            // 初始化
            mui(".mui-numbox").numbox()
        },
        props: ['count', 'goodsid'],
        methods: {
            countChanged() {
                // emit调用父组件的方法
                // 涉及到数字记得要parseInt
                // this.$emit("getCount", parseInt(this.$refs.numbox.value))

                //这里调用的是localStorage中的数据 并进行修改
                this.$store.commit("updateGoodsInfo", {
                    id: this.goodsid,
                    count: this.$refs.numbox.value
                })

            }
        }
    }
</script>

<style scoped lang="scss">

</style>