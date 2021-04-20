import throttle from 'lodash/throttle';

// 自定义指令 （触底加载）

// 定义默认属性
const attributes = {
    delay: {
        default: 200
    },
    immediate: {
        default: true
    },
    disabled: {
        default: false
    },
    distance: {
        default: 10
    }
};
// 递归向上查找，查找带有overflow样式的元素
const getScrollContainer = (el) => {
    let parent = el;
    while (parent) {
        if (document.documentElement == parent) {
            return window; // 表示查找到尽头了 不再查找
        }
        // 获取当前元素上是否有overflow属性
        const overflow = getComputedStyle(parent)['overflow-y'];
        if (overflow.match(/scroll|auto/)) {
            return parent;
        }
        parrent = parent.parentNode;
    }
};

// 获取用户设置的属性与默认的属性进行合并
const getScrollOptions = (el, vm) => {
    // Object.entries(attributes) => [[delay], [default: 200]]
    return Object.entries(attributes).reduce((map, [key, option]) => {
        let defaultValue = option.default;
        let value = el.getAttribute(`infinite-scroll-${key}`);
        value = vm[value] ? vm[value] : defaultValue;
        map[key] = value;
        return map;
    }, {});
}

// 滚动事件
const handleScroll = function(fn) {
    // console.log('this', this); // el
    // console.log('fn', fn); // cb
    let { container, el, vm, observer } = this[scope];
    // 数据是否已经加载完毕
    let { disabled, distance } = getScrollOptions(el, vm);
    if (disabled) return; // 数据已加载完毕
    // 当前卷去的高度 + 页面可视区域的高度 = 当前滚动元素底部显示的位置
    let scrollBottom = container.scrollTop + container.clientHeight;

    // 总页面高度 - 当前滚动元素底部显示的位置 和 用户传入的限定需要加载数据的高度进行对比
    if (container.scrollHeight - scrollBottom <= distance) {
        fn();
    } else {
        if (observer) { // 取消监听
            observer.disconnect();
            this[scope].observer = null;
        }
    }
}

// 定义常量
const scope = 'infinite-scroll';


export default {
    name: 'infinite-scroll',
    inserted(el, bindings, vnode) {
        // console.log('指令生效');
        const cb = bindings.value; // 拿到用户传入指令的回调函数
        // console.log(cb);
        const vm = vnode.context; // vue中的虚拟节点上下文
        // console.log(vm);

        // 1. 获取滚动的元素(容器)，如无，则直接结束
        const container = getScrollContainer(el);
        // console.log(container);
        if (container !== window) {
            // 绑定滚动事件
            // 2. 合并选项
            // let options = getScrollOptions(el, vm);
            // console.log('options', options);
            let { delay, immediate } = getScrollOptions(el, vm);
            // 3. 增加滚动事件 节流
            let onScroll = throttle(handleScroll.bind(el, cb), delay);
            el[scope] = { // 把这些属性放到el上，这样哪里需要调用这些属性就可以直接调用
                    onScroll,
                    container,
                    el,
                    vm
                }
                // 绑定scroll事件
            if (immediate) {
                const observer = el[scope].observer = new MutationObserver(onScroll);
                observer.observe(container, {
                    childList: true, // 监听childList的变化
                    subtree: true, // 当子dom发生变化 也需要触发
                });
                onScroll(); // 默认初始会加载
            }
            container.addEventListener('scroll', onScroll);
        }
    },
    unbind(el) { // 解绑
        const { onScroll, container } = el;
        if (container) {
            container.removeEventListener('scroll', onScroll);
            el[scope] = null;
        }
    }
}