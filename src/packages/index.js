// 所有的组件的入口

import Button from './button/button.vue';
import Icon from './icon.vue';
import ButtonGroup from './button/button-group.vue';
import Row from './layout/row.vue';
import Col from './layout/col.vue';
import Container from './container/container.vue';
import Header from './container/header.vue';
import Footer from './container/footer.vue';
import Main from './container/main.vue';
import Aside from './container/aside.vue';
import Input from './input.vue';

const install = (Vue) =>{
    Vue.component(Button.name,Button);
    Vue.component(Icon.name,Icon);
    Vue.component(ButtonGroup.name,ButtonGroup);
    Vue.component(Row.name, Row);
    Vue.component(Col.name, Col);
    Vue.component(Container.name, Container);
    Vue.component(Header.name, Header);
    Vue.component(Footer.name, Footer);
    Vue.component(Main.name, Main);
    Vue.component(Aside.name, Aside);
    Vue.component(Input.name, Input);
}

// 有可能组件会通过script标签的方式引入 
// <script src="zhu-ui"></script>

if(typeof window.Vue !== 'undefined'){
    install(Vue); // 全局直接通过script 引用的方式会默认调用install方法
}

export default {
    install
}