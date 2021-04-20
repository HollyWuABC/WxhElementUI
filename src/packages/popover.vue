<template>
    <div class="ele-popover">
        <div
            v-show="visible"
            ref="content"
            class="ele-popover-content"
            :class="`content-${placement}`"
            :style="{width: `${width}px`, height: `${height}px`}"
            @click.stop>
            <h3 v-if="title">{{title}}</h3>
            <slot>{{content}}</slot>
            <div class="arrow"></div>
        </div>
        <slot name="reference"></slot>
    </div>
</template>

<script>

// 方法封装

/**
 * element 绑定的元素
 * event   绑定的事件 (eg: click)
 * handler 绑定的方法
*/
const on = (element, event, handler) => {
    element.addEventListener(event, handler, false); // false 表示默认阻止冒泡
}

const off = (element, event, handler) => {
    element.removeEventListener(event, handler, false);
}

export default {
    name: 'wxh-element-popover',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        placement: {
            validator(type) {
                if (!['top', 'bottom', 'left', 'right'].includes(type)) {
                    throw new Error('属性必须是'+['top', 'bottom', 'left', 'right'].join('、'));
                }
                return true;
            }
        },
        width: {
            type: String | Number,
            default: '250'
        },
        height: {
            type: String | Number,
            default: '65'
        },
        title: {
            type: String,
            default: '标题'
        },
        content: {
            type: String,
            default: '内容'
        },
        trigger: {
            type: String // click|hover
        }
    },
    data() {
        return {
            visible: false
        };
    },
    watch: {
        visible(value) {
            if (value) { // 如果visible为true将弹框元素移动到外部
                this.$nextTick(() => {
                    let content = this.$refs.content;
                    document.body.appendChild(content);
                    if (this.trigger === 'hover') {
                        on(content, 'mouseenter', this.handleMouseEnter);
                        on(content, 'mouseleave', this.handleMouseLeave);
                    }
                })
            }
        }
    },
    methods: {
        toggle() {
            this.visible = !this.visible;
            this.handlePositionChange();
        },
        handleDocumentClick(e) {
            if (this.$el.contains(e.target)) return false;
            this.visible = false;
        },
        handleMouseEnter(e) {
            clearTimeout(this.timer);
            this.visible = true;
        },
        handleMouseLeave(e) {
            this.timer = setTimeout(() => {
                this.visible = false;
            }, 200);
        },
        // 获取元素的纵坐标 
        getTop(e){
            let offset = e.offsetTop;
            if(e.offsetParent !== null) offset += this.getTop(e.offsetParent); 
            return offset; 
        },
        // 获取元素的横坐标
        getLeft(e) {
            let offset = e.offsetLeft;
            if (e.offsetParent !== null) offset += this.getLeft(e.offsetParent);
            return offset;
        },
        // 设置弹框的定位
        handlePositionChange() {
            let reference = this.$slots.reference;
            if (reference) {
                this.reference = reference[0].elm;
            }
            let scrollHeight = this.reference.scrollHeight;
            let scrollWidth = this.reference.scrollWidth / 2;
            let offsetTop  = this.getTop(this.reference);
            let offsetLeft = this.getLeft(this.reference);
            let halfContentHeight = Number(this.height) / 2;
            let halfContentWidth = Number(this.width) / 2;
            if (this.placement === 'top') {
                this.$refs.content.style.top = `${offsetTop - halfContentHeight - scrollHeight}px`;
                this.$refs.content.style.left = `${(offsetLeft - halfContentWidth + scrollWidth) < 0 ? 0 : (offsetLeft - halfContentWidth + scrollWidth)}px`;
            }
            if (this.placement === 'bottom') {
                this.$refs.content.style.top = `${offsetTop + halfContentHeight + scrollHeight / 3}px`;
                this.$refs.content.style.left = `${(offsetLeft - halfContentWidth + scrollWidth) < 0 ? 0 : (offsetLeft - halfContentWidth + scrollWidth)}px`;
            }
            if (this.placement === 'left') {
                this.$refs.content.style.top = `${offsetTop - halfContentHeight  + scrollHeight / 2}px`;
                this.$refs.content.style.left = `${(offsetLeft - halfContentWidth - scrollWidth * 2) < 0 ? 0 : (offsetLeft - halfContentWidth - scrollWidth * 2)}px`;
            }
            if(this.placement === 'right') {
                this.$refs.content.style.top = `${offsetTop - halfContentHeight  + scrollHeight / 2}px`;
                this.$refs.content.style.left = `${(offsetLeft + halfContentWidth + scrollWidth / 3) < 0 ? 0 : (offsetLeft + halfContentWidth + scrollWidth / 3)}px`;
            }
        }
    },
    mounted() {

        this.handlePositionChange();

        // 如何给slot绑定事件？this.$slots.xxx.
        // slot插槽上不能@click绑定事件 不能写类名class
        let reference = this.$slots.reference;
        if (reference) {
            this.reference = reference[0].elm;
        }
        // console.log("this.reference", this.reference); // 拿到插槽的内容 这里是button
        if (this.trigger === 'hover') {
            on(this.$el, 'mouseenter', this.handleMouseEnter);
            on(this.$el, 'mouseleave', this.handleMouseLeave);
        } else if (this.trigger === 'click'){
            on(this.reference, 'click', this.toggle);
            on(document, 'click', this.handleDocumentClick);
        }
    },
    beforeDestroy() {
        // 销毁
        off(this.$el, 'mouseenter', this.handleMouseEnter);
        off(this.$el, 'mouseleave', this.handleMouseLeave);
        off(this.reference, 'click', this.toggle);
        off(document, 'click', this.handleDocumentClick);
    }
}
</script>

<style lang="scss">
.ele-popover{
    display: inline-block;
    position: relative;
}
.ele-popover-content{
    position: absolute;
    top: 4200px;
    left: 200px;
    padding: 10px;
    min-height: 60px;
    min-width: 200px;
    border-radius: 4px;
    z-index: 10;
    box-shadow: -1px -1px 3px #ccc, 1px 1px 3px #ccc;
    background-color: #fff;
}
.arrow{
    position: absolute;

}
.arrow::before, .arrow::after{
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border: 6px solid #ccc;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    position: absolute;
}
.arrow::after{
    border-bottom-color: #fff;
    transform: translateY(1px);
    filter:  drop-shadow(0 -2px 1px #ccc)
}
.content-top{
    .arrow{
        left: 50%;
        margin-left: -6px;
        bottom: 0;
        &::after,
        &::before{
            transform: rotate(180deg);
        }
    }
}
.content-bottom{
    .arrow{
        left: 50%;
        margin-left: -6px;
        top: -12px;
    }
}
.content-left{
    .arrow{
        top: 50%;
        margin-top: -6px;
        right: 0;
        &::after,
        &::before{
            transform: rotate(90deg);
        }
    }
}
.content-right{
    .arrow{
        top: 50%;
        margin-top: -6px;
        left: -12px;
        &::after,
        &::before{
            transform: rotate(-90deg);
        }
    }
}
</style>
