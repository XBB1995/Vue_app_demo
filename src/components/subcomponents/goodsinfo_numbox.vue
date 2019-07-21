<template>
    <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
        <!--使用watch属性监听父组件传递的值，最后一次肯定是合法的max数值-->
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id='test' class="mui-input-numbox" ref="numbox"
               type="number" value="1" @change="countChanged"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "goodsinfo_numbox",
        mounted() {
            mui(".mui-numbox").numbox()
        },
        props: ["max"],
        watch: {
          //属性监听 因为max是通过异步获取的 所以需要动态监听
          'max': function (newVal, oldVal) {
              mui(".mui-numbox").numbox().setOption("max", newVal)
          }
        },
        methods: {
            countChanged() {
                // emit调用父组件的方法
                // 涉及到数字记得要parseInt
                this.$emit("getCount", parseInt(this.$refs.numbox.value))
            }
        }
    }
</script>

<style scoped lang="scss">

</style>