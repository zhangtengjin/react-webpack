# react-webpack
webpack搭建react项目
webpack4.0配置

写在前面
自己之前搭建vue或者react项目都是通过安装脚手架生成的，只要run一下项目就跑起来了，非常快速好用。对于我一个前端小学生和不太熟悉webpack的同学来说，这简直不要太爽。但是不知道其中的原理，这会让自己的技术栈很残缺，为了能够了解webpack是怎样让项目跑起来的，于是决定自己动手搭建webpack基础环境实现React项目，也算是对知识的一个总结吧。

什么是webpack?
这里引用一张webpack官网图片

webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。具体叙述可以把webpack看做一个模块打包的机器，他可以通过一个入口文件分析你的项目结构，并且将一些浏览器不能直接运行的拓展语言(less,sass,typescript)转化和打包成浏览器可识别使用的格式。
在安装使用webpack之前需要安装node环境，在这里就不叙述了，需了解推荐官网：https://nodejs.org/en/
了解完什么是webpack了，我们一步步的开始学习使用Webpack
init项目
创建文件夹并进入初始化项目
mkdir react-webpack && cd react-webpack && npm init
这时候项目文件里会多一个package.json文件
webpack
（1） 安装
//全局安装
  npm install -g webpack
//安装到你的项目目录
  npm install webpack --save-dev
webpack4.0要求安装webpack-cli
npm install webpack-cli
(2)新建webpack配置文件 webpack.config.js (编写时可以参考webpack官网文档:https://webpack.js.org/concepts/)，再分别创建src和dist文件夹，在dist文件夹创建index.html文件，src文件夹创建index.js文件
目录结构为：

index.html编写如些html代码
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>react-webpack</title>
  </head>
  <body>
    <div id='root'>
    </div>
    <script src="bundle.js"></script>
  </body>
</html>
index.js编写代码：
document.getElementById('root').innerHTML = "Webpack~~~"
webpack.config.js编写基础代码：
const path = require('path');

module.exports = {
    entry: path.join(__dirname,'src/index.js'),

    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    }
}
运行webpack命令：webpack --config webpack.config.js
这样我们就把index.js打包成bundle.js，index.html文件引入bundle.js，浏览器就能显示内容了~~，现在后头看webpack做了什么呢，就是把入口文件index.js经过处理之后，生成bundle.js。

你是不是觉得每次打包都要输入这么长命令，很烦，其实只需要在前面初始化生成的package.json里面简单配置下就可以了。
打开package.json文件
{
  "name": "react-webpack",
  "version": "1.0.0",
  "description": "webpack搭建react项目",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/zhangtengjin/react-webpack.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/zhangtengjin/react-webpack/issues"
  },
  "homepage": "https://github.com/zhangtengjin/react-webpack#readme",
  "devDependencies": {
    "webpack": "^4.18.1",
    "webpack-cli": "^3.1.2"
  }
}
修改为
{
  "name": "react-webpack",
  "version": "1.0.0",
  "description": "webpack搭建react项目",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack --config webpack.config.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/zhangtengjin/react-webpack.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/zhangtengjin/react-webpack/issues"
  },
  "homepage": "https://github.com/zhangtengjin/react-webpack#readme",
  "devDependencies": {
    "webpack": "^4.18.1",
    "webpack-cli": "^3.1.2"
  }
}
其实只要在script中加上  "start": "webpack --config webpack.config.js",这样我们直接运行npm start就可以了。
构建本地服务器
从运行结果的路径我们可以看到页面是从本地文件打开的，是不是感觉有点low,接下来我们要让其运行在本地服务器。
安装webpack-dev-server
npm install webpack-dev-server --save-dev
安装完之后我们简单配置下devServer
devServer: {
        contentBase: path.join(__dirname, './dist'),  //服务器读取文件目录
        port: 9001,  //运行的端口号
        inline: true, // 文件修改后实时刷新
        historyApiFallback: true,  //设为true,所有的页面都将跳转到index.html
        proxy: {
            // "/api": "http://localhost:9000/api/"
        }  // 代理到后端服务接口,当我们需要后端联调的时候可以配置
    }
接着在package.json文件里配置
"dev": "webpack-dev-server  --config webpack.config.js --color --progress --hot --open",
这样在终端运行npm run dev看看

这样我们项目就可以跑在本地服务器了。
但是我们发现终端会有警告

这是因为webpack4.0以上版本需要添加mode，区分是开发环境还是生产环境
我们在package.json文件dev添加--mode development即可。

babel
babel是一个编译JavaScript的平台，它可以把我们编写的ES6,ES7代码以及react的JSX等编译成浏览器可识别的js文件。
接下里安装babel
npm install babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 --save-dev
不是说安装babel吗？怎么要安装这么多包。。其实babel是由几个依赖包组合起来使用的，比如babel-core相当于babel的API,babel-preset-es2015就是用来解析ES6的，等等。
同样，安装完之后我们需要配置下
新建.babelrc文件
{
   "presets": [
        "es2015",
        "react",
        "stage-0"
   ],
   "plugins": [
   ]
}
然后需要在webpack.config.js使用babel-loader解析js文件
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
            }
        ]
    },
配置完成之后，安装react看看是否能编译成功
安装react同时需要安装react-dom
同时修改之前的index.js文件使用react组价
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Hello extends Component {
    render() {
        return (
            <div>
                hello, webpack,i'm react
            </div>
        )
    }
}

ReactDOM.render(
    <Hello/>,
    document.getElementById('root')
)
很不辛的是，又见红了。。

原来是babel-core和babel-loader的版本冲突了，我们安装7版本的babel-loader就可以了
npm install babel-loader@7.1.4 --save-dev


看到这一步说明我们的babel安装配置成功了。

编译css
js可以编译，那么css呢？同样需要编译css的loader
1.当我们仅需加载css文件时，需要安装配置css-loader和style-loader
npm install css-loader style-loader --save-dev
安装完成之后我们在配置babel的地方继续配置css-loader
{
                test: /.css$/,
                use: ['style-loader','css-loader'] //这里注意调用loader时是从右到左编译的。
            }
2.当要编译sass文件时，需要安装sass-loader和node-sass(sass-loader依赖于node-sass)
npm install sass-loader node-sass --save-dev
同样配置sass
{
                test: /.(scss|sass)$/,
                use:['style-loader','css-loader', 'sass-loader']
         }
3.当要编译less文件时，安装less和less-loader
npm install less less-loader --save-dev
配置
{
                test: /.less$/,
                use:['style-loader','css-loader', 'less-loader']
            }
新建style.scss
在index.js文件引入style.scss文件，npm run dev


编译图片
npm install --save-dev url-loader file-loader
配置和前面的套路一致
{
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }

plugins
翻译为插件，顾名思义是用来扩展webpack功能的。
1. HtmlWebpackPlugin
npm install html-webpack-plugin --save-dev
删除之前的dist文件夹，在src新建index.tmpl.html文件
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>this is tmpl</title>
  </head>
  <body>
    <div id='root'>
    </div>
  </body>
</html>


webpack.config.js配置
const path = require('path');
const webpack = require('webpack');  // 需要引入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入HtmlWebpackPlugin插件

module.exports = {
    entry: path.join(__dirname,'src/index.js'),

    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
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
                use: ['style-loader','css-loader'] //这里注意调用loader时是从右到左编译的。
            },
            {
                test: /.(scss|sass)$/,
                use:['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /.less$/,
                use:['style-loader','css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.tmpl.html')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, './dist'),  //服务器读取文件目录
        port: 9001,  //运行的端口号
        inline: true, // 文件修改后实时刷新
        historyApiFallback: true,  //设为true,所有的页面都将跳转到index.html
        proxy: {
            // "/api": "http://localhost:9000/api/"
        }  // 代理到后端服务接口,当我们需要后端联调的时候可以配置
    }
}
在package.json文件里添加：
"build": "webpack --mode production --config webpack.config.js"
之后我们npm run build会发现自动生成dist文件夹，这是因为我们在output出口配置了dist/bundls.js，这样HtmlWebpackPlugin会自动帮我们在index.html中引用bundle.js，不需要手动引用了。

2.HotModuleReplacementPlugin(热更新)
直接安装
npm install --save-dev react-hot-loader
因为这个插件是依赖于webpack-dev-server的，所有要在devServer配置项中开启热更新 hot: true

3.还有许多实用 的插件
webpack-merge: 在实际开发中webpack的配置文件可能会拆分成好几个配置文件，这是我们就需要这个合并模块的插件了。
在这里就不一一演示了。。

优化： 
当前我们都是一个入口文件一个出口文件，这在实际项目中不太可能，那如何多入口多出口呢？
只需要改写下entry和output配置项
entry: {
        index: path.join(__dirname,'src/index.js'),
        child: path.join(__dirname,'src/child.js')
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js'
    },
这样dist文件夹就会生成两个js文件



分离css
webpack默认将css，js全都打包在一个文件里，我们怎么分离呢？
安装 extract-text-webpack-plugin插件

 npm install extract-text-webpack-plugin --save-dev
webpack.config.js引入这个插件，css-loader改成这种写法就可以哦
{
                test: /.css$/,
                // use: ['style-loader','css-loader'] //这里注意调用loader时是从右到左编译的。
                use: ExtractTextPlugin.extract({   // 调用分离插件内的extract方法
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            }
npm run build 报错


别怕，这是因为 extract-text-webpack-plugin不能支持4.0.0以上版本webpack
我们只需要npm install --save-dev extract-text-webpack-plugin@next就可以了（加上@next是为了安装最新的）
此时我们会发现dist文件夹如我们所愿了


增加css前缀（不需要手动添加前缀了）
安装postcss-loader  autoprefixer
npm install postcss-loader autoprefixer --save-dev
新建postcss.config.js
module.exports = {
    plugins: [
        require('autoprefixer')  // 引用autoprefixer模块
    ]
}
在css-loader中再引入postcss-loader即可。
npm run build查看


