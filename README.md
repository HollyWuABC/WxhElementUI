## wxh-element-ui
[![npm version](https://badge.fury.io/js/wxh-element-ui.svg)](https://badge.fury.io/js/wxh-element-ui)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Usage
```
import WxhElementUi from 'wxh-element-ui';
import 'wxh-element-ui/dist/wxh-element-ui.css';
Vue.use(WxhElementUi);
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#### Menu
│  .browserslistrc # 兼容版本
│  .gitignore
│  babel.config.js # babel的配置文件
│  package-lock.json
│  package.json
│  README.md   
|  examples   # 组件使用案例
├─public
│      favicon.ico
│      index.html 
├─src
│  │  App.vue 
│  │  main.js
│  │  
│  ├─packages # 需要打包的组件
│  │      button
|  |      button-group
│  │      icon
│  │      index.js # 所有组件的入口
│  │       
│  └─styles # 公共样式
│         ├─common
│           |-- var.scss  # 基本样式
|         |─mixins
│           |-- mixins.scss # 混合的方法
│           |--button.scss
|           |--button-group.scss
|           |--icon.scss
└─tests # 单元测试
    └─unit
          button.spec.js
