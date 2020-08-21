# 如何修改windows的环境变量
    set : 查看当前windows操作系统所有的环境变量
    set name : 查看指定的环境变量的值
    set name=val : 设置环境变量(一次性的 关闭命令行窗口后 当前的设置就会失效)
    set name= : 删除环境变量

# 如何通过环境变量来控制脚手架创建项目的启动
    修改vue.config.js
        const OPEN = process.env.OPEN && Boolean(process.env.OPEN)
        devServer:{
            open:OPEN|| false
        }

    set PORT=8000
    set OPEN=1
    npm start

# 为项目的目录配置别名
    修改vue.config.js
        function resolve (dir) {
          return path.join(__dirname, '..', dir)
        }
        resolve: {
            alias: {
              "components":resolve('src/components')
            }
        }


# 基本使用
## 安装
    npm install -g @vue/cli
## 创建项目    
    vue create <project-name>
## 开发环境启动
    npm run serve
## 生产环境启动
    npm run build
    
# 配置  
    创建vue.config.js文件 该文件是一个可选的配置文件，
        如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli自动加载.
        这个文件应该导出一个包含了选项的对象：
            // vue.config.js
            module.exports = {
              // 选项...
            }

## 选项 - @vue/cli自定义配置
    outputDir 
        Type: string
        Default: 'dist'
        当使用build进行生产环境构建时。生成的构建目录
    devServer
            Type: Object
            所有 webpack-dev-server 的选项都支持
    configureWebpack(写webpack的原生配置)
            Type: Object
            configureWebpack的属性值会通过 webpack-merge 合并到最终的配置中。
    lintOnSave
        Type: boolean | 'error'
        Default: 'error'
        @vue/cli4.0 的脚手架 默认选用的eslint的配置是recommended级别的
        是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。
        这个值会在 @vue/cli-plugin-eslint 被安装之后生效。

        设置为 true 时，eslint-loader 会将 lint 错误输出为编译警告。
                默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
        设置为 false 时，关闭eslint校验
        设置为 "error" 时: 这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。


    
    
