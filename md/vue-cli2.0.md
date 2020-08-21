### 如何修改windows的环境变量
    set : 查看当前windows操作系统所有的环境变量
    set name : 查看指定的环境变量的值
    set name=val : 设置环境变量(一次性的 关闭命令行窗口后 当前的设置就会失效)
    set name= : 删除环境变量

### 如何通过环境变量来控制脚手架创建项目的启动
    修改webpack.dev.conf.js
        const OPEN = process.env.OPEN && Boolean(process.env.OPEN)
        devServer:{
            open:OPEN|| config.dev.autoOpenBrowser
        }

    set PORT=8000
    set OPEN=1
    npm start

### 为项目的目录配置别名
    修改webpack.base.conf.js
        function resolve (dir) {
          return path.join(__dirname, '..', dir)
        }
        resolve: {
            alias: {
              "components":resolve('src/components')
            }
        }


### vue脚手架2.0
    安装脚手架:
        npm install -g vue-cli
            npm 帮你生成了脚手架对应的命令
                vue,vue-init,vue-list
            命令存放的目录 被配置在了环境变量的path中

    查阅一下脚手架可支持的模板
        vue list
        可以查到 template-name

    使用脚手架生成项目(以下命令得运行在项目的包裹目录下)
         vue init <template-name> <project-name>

    启动项目
        npm run dev
        npm start(开发环境)
        npm run bulid(生产打包)

### webpack找包的机制
    https://webpack.docschina.org/concepts/module-resolution
    import App from "./App";
        经过vue-loader的处理 我们拿到的就是app组件的配置对象
    import Vue from "vue";
        webpack找到的到底是一个什么样的文件?
            webpack import的规则?
                import Vue from "vue";

                配别名的情况: "vue"是一个别名!!
                    直接找别名指定的文件

                沒有配别名的情况: "vue"是一个包!!
                    1. 根据resolve.modules这个配置去指定的目录中查找vue这个包
                    2. 找包的描述文件package.json
                    3. 根据resolve.mainFields 去package.json找对应的字段
                    4. 如果以上步骤没有找到对应的js文件 则按照resolve.mainFiles字段指定的文件名 去找对应的文件
                    5. 文件的扩展名 由resolve.extensions来决定
                    6. 如果以上步骤都没有成功  那么webpack就找不到对应的包!

