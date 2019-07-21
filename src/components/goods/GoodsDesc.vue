<template>
    <div class="goodsdesc-container">
        <h3>{{info.name}}</h3>
        <hr>
        <div class="content" v-html="info.intro"></div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "GoodsDesc",
        data() {
            return {
                info: {},
                id: this.$route.params.id
            }
        },
        created() {
            this.getGoodsDesc()
        },
        methods: {
            getGoodsDesc() {
                axios
                    .get("http://120.77.181.41:3000/api/getgoddetail", {
                        params: {
                            godId: this.id
                        }
                    })
                    .then(res => {
                        if (res.data.status === 1) {
                            this.info = res.data.god
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            }
        }
    }
</script>

<style lang="scss">
    .goodsdesc-container {
        padding: 4px;
        h3 {
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
        .content {
            img {
                //去除scoped属性 才能设置img的宽度
                width: 100%;
            }
        }
    }
</style>