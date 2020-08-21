### 使用脚手架创建项目
    vue init webpack vant-demo

### 安装vant
    npm i vant

### 安装vant的babel插件
    npm i babel-plugin-import -D

### 修改.babelrc
    {
      "plugins": [
        ["import", {
          "libraryName": "vant",
          "libraryDirectory": "es",
          "style": true
        }]
      ]
    }

### 引入按钮组件(1)
    import Vue from 'vue';
    import { Button } from 'vant';
    Vue.use(Button);

    模板:
        <van-button type="default">默认按钮</van-button>

### 引入按钮组件(2)
    import { Button } from 'vant';
      export default {
        name: 'App',
        components:{
          [Button.name]:Button
        }
      }

    模板:
      <van-button type="default">默认按钮</van-button>

### 联系人组件的相关文档
    https://vant-contrib.gitee.io/vant/#/zh-CN/contact-card

### 联系人案例的梳理
    计算属性:
        cardType
            : 依赖于chosenContactId ; 决定了联系人卡片组件的渲染类型
                有可能是add页  也有可能是edit页
        currentContact
            : 依赖于chosenContactId list ; 决定了当前要展示的联系人






















