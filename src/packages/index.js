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
import Upload from './upload/upload.vue';
import Progress from './progress.vue';
import DatePicker from './date-picker/date-picker.vue';
import DateRangePicker from './date-picker/date-range-picker.vue';
import Popover from './popover.vue';
import Carousel from './carousel/carousel.vue';
import CarouselItem from './carousel/carousel-item.vue';
import Pagination from './pagination/pagination.vue';
import Table from './table/table.vue';

import infiniteScroll from './infiniteScroll';

const install = (Vue) => {
    Vue.component(Button.name, Button);
    Vue.component(Icon.name, Icon);
    Vue.component(ButtonGroup.name, ButtonGroup);
    Vue.component(Row.name, Row);
    Vue.component(Col.name, Col);
    Vue.component(Container.name, Container);
    Vue.component(Header.name, Header);
    Vue.component(Footer.name, Footer);
    Vue.component(Main.name, Main);
    Vue.component(Aside.name, Aside);
    Vue.component(Input.name, Input);
    Vue.component(Upload.name, Upload);
    Vue.component(Progress.name, Progress);
    Vue.component(DatePicker.name, DatePicker);
    Vue.component(DateRangePicker.name, DateRangePicker);
    Vue.component(Popover.name, Popover);
    Vue.component(Carousel.name, Carousel);
    Vue.component(CarouselItem.name, CarouselItem);
    Vue.component(Pagination.name, Pagination);
    Vue.component(Table.name, Table);

    Vue.directive(infiniteScroll.name, infiniteScroll);
}

// 有可能组件会通过script标签的方式引入 
// <script src="zhu-ui"></script>

if (typeof window.Vue !== 'undefined') {
    install(Vue); // 全局直接通过script 引用的方式会默认调用install方法
}

export default {
    install
}