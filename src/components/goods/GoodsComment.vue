<template>
    <div>
        <cmtbox :id="id"
                :commentSrc="'http://120.77.181.41:3000/api/getgodcom?godId=' + id"
                :submitSrc="'http://120.77.181.41:3000/api/addgodcom'"></cmtbox>
    </div>
</template>

<script>
    // import axios from 'axios'
    import cmtbox from "../subcomponents/Comment.vue"

    export default {
        name: "GoodsComment",
        data() {
            return {
                id: this.$route.params.id
            }
        },
        components: {
            cmtbox
        }
    }
</script>

<style scoped lang="scss">

</style>