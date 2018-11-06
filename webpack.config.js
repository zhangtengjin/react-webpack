/*
* @Author: 12574
* @Date:   2018-11-03 16:44:08
* @Last Modified by:   zhang
* @Last Modified time: 2018-11-06 14:41:25
*/

const path = require('path');
const webpack = require('webpack');  // 需要引入webpack模块

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件
const ExtractTextPlugin = require('extract-text-webpack-plugin') //引入分离插件

module.exports = {
    entry: {
        index: path.join(__dirname,'src/index.js'),
        // child: path.join(__dirname,'src/child.js')
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/, //匹配jsx和js结尾的文件
                use: {
                    loader: 'babel-loader',
                    // 当loader传入的参数过多时，可以添加options对象
                    options: {
                        cacheDirectory: true //cacheDirectory用于缓存babel的编译结果,加快重新编译的速度
                    }
                },
                include: path.join(__dirname,'src') //字面意思，src下面的所有jsx和js文件都会被babel-loader解析
            },
            {
                test: /.css$/,
                // use: ['style-loader','css-loader'] //这里注意调用loader时是从右到左编译的。
                use: ExtractTextPlugin.extract({   // 调用分离插件内的extract方法
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /.(scss|sass)$/,
                // use:['style-loader','css-loader', 'sass-loader']
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /.less$/,
                // use:['style-loader','css-loader', 'less-loader']
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader','postcss-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        outputPath: 'images'  // 设置打包后图片存放的文件夹名称
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.tmpl.html') //模板,webpack默认会生成index.html文件
        }),
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        new ExtractTextPlugin('css/index.css') // 将css统一分离到/dist文件夹下的css文件夹中的index.css
    ],
    devServer: {
        contentBase: path.join(__dirname, './dist'),  //服务器读取文件目录
        port: 9001,  //运行的端口号
        inline: true, // 文件修改后实时刷新
        historyApiFallback: true,  //设为true,所有的页面都将跳转到index.html
        hot: true, // 热更新
        proxy: {
            // "/api": "http://localhost:9000/api/"
        }  // 代理到后端服务接口,当我们需要后端联调的时候可以配置
    }
}