//配置文件 通过Node中的模块操作 向外暴露一个配置对象
const path = require('path')
//启用热更新的第二步 webpack4+中不再需要
// const webpack = require('webpack')
//导入在内存中生成HTML页面的插件
//作用1：自动在内存中根据指定页面生成一个内存的页面
//作用2：自动把打包好的bundle.js追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')
//只要是插件，都要放入plugins中
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//vue-loader v15.0+后必须要加入这个插件

module.exports = {
    //配置文件中，需要手动指定入口和出口
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: "bundle.js"
    },
    // devServer: {
    //     //配置devServer参数的第二种方式 相对麻烦一些
    //     open: true, //自动打开浏览器
    //     port: 3000, //启动端口
    //     contentBase: 'src', //指定托管的目录
    //     hot: true //启用热更新的第一步
    // },
    plugins: [
        //webpack4+中不再需要 new webpack.HotModuleReplacementPlugin()
        new htmlWebpackPlugin({
            //创建一个在内存中生成HTML页面的插件
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'//指定生成的页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module: { //配置第三方模块的加载器
        rules: [//第三方模块的匹配规则
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            //test后是正则 use后是用到的第三方匹配规则包
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: 'url-loader?limit=10240&name=[hash:8]-[name].[ext]'
            },
            //limit是给定的值，是图片的大小限制，单位byte 如果引用的图片小于limit时
            //则会被转为Base64的字符串来存储
            //使用name属性 更换图片保存名
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},
            // {test:/\.js$/, use: 'babel-loader', exclude: /node_modules/}
            //使用exclude防止babel将node_modules中所有的js进行处理
            //而且会导致项目无法运行
            {test: /\.vue$/, use: 'vue-loader'},
        ]
    },
    // resolve: {
    //     // alias: {
    //     //     //别名
    //     //     "vue$": "vue/dist/vue.js"
    //     // }
    // }
}