/* eslint-disable */
var webpack = require("webpack");
/*var WebpackHotMiddleware = require('webpack-hot-middleware');
var WebpackHotMiddleware = require('webpack-dev-server');*/
var CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path'); //path.resolve()需要引入path模块
const buildParentPath = path.resolve(__dirname, "../", "webapp"); //“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    devtool: 'source-map',
    entry: {
        bundle: [
            './src/app.js'], // ##### 唯一入口文件
        vendor: ['react', 'react-dom', "react-redux", 'react-router', "redux", "react-router-redux",
            "bootstrap", "react-bootstrap", "react-bootstrap-dialog", "redux-immutable", "redux-saga", "reselect", "invariant", "warning", "whatwg-fetch"]
    },
    output: {
       // path: path.resolve(buildParentPath, "build"), // #####
        path: "dist", // #####
        // 打包文件存放的绝对路径#####
        filename: "[name].js", // ##### 打包后输出文件的文件名 #####
       // publicPath: "/masterdata2/build/", // 网站运行时的访问路径
        publicPath: "/dist/", // 网站运行时的访问路径
        // 将模块自身导出成一个全局的变量
        libraryTarget: "var",
        // 全局变量的名称
        library: "masterData"
    },
    // debug: true,

    devServer:{
        contentBase: "./",
        historyApiFallback: true,
        inline: true,
        hot:true,
        port: 3000,
        host: '127.0.0.1',
        proxy: {
            "/task/*": "http://172.18.254.77:8080/masterdata",
            "/bpm/*": "http://172.18.254.77:8080/masterdata",
            "/md/*": "http://172.18.254.77:8080/masterdata",
            "/ws/*": "http://172.18.254.77:8080/masterdata",
            "/dq/*": "http://172.18.254.77:8080/masterdata",
            "/ign/*": "http://172.18.254.77:8080/masterdata",
            "/user/*": "http://172.18.254.77:8080/masterdata",
            "/role/*": "http://172.18.254.77:8080/masterdata",
            "/access/*": "http://172.18.254.77:8080/masterdata",
        }
    },
    //观察者模式开启，自动编译
    watch : true,
    watchOptions: { aggregateTimeout: 300, poll: 100 },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(), // #####
        // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.HotModuleReplacementPlugin(), // ##### 热加载插件
        new webpack.NoErrorsPlugin(),
        // 在编译之前，清空build目录
        //new CleanWebpackPlugin(["build"], buildParentPath),
        // 打包第三方库
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
        }),
        // 单独压缩CSS，目前没有成功
        new ExtractTextPlugin("[name].css"), // ##### 分离CSS和JS文件
       /* new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })*/
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            // loader: 'babel',
            loaders: ['babel-loader'],
            exclude: /node_modules/,
            include: __dirname
        }, {
            test: /\.jsx$/,
            // loader: 'babel',
            loaders: ['babel-loader'],
            exclude: /node_modules/,
            include: __dirname
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff2"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/octet-stream"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?mimetype=image/svg+xml"
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader'
        }]
    }
}
