<template>
<div
    class="ele-carousel"
    :style="{height}"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd">
    <div class="viewport">
        <slot></slot>
    </div>
    <div class="dots">
        <span
            v-for="item in len"
            :key="item"
            :class="{active: item -1 == currentSelected}"
            @click="select(item - 1)">
            {{item - 1}}
        </span>
    </div>
    <div class="arrow-box">
        <wxh-element-button icon="left" @click="select(currentSelected - 1, true)"></wxh-element-button>
        <wxh-element-button icon="right" @click="select(currentSelected + 1, true)"></wxh-element-button>
    </div>
</div>   
</template>

<script>
export default {
    name: 'wxh-element-carousel',
    props: {
        height: { // 高度
            type: String,
            default: '200px'
        },
        autoplay: { // 是否自动播放
            type: Boolean,
            default: true
        },
        delay: { // 延迟
            type: Number,
            default: 3000,
        },
        initialIndex: { // 初始展示
            type: Number,
            default: 0,
        },
        loop: { // 是否无缝轮播
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            currentSelected: this.initialIndex,
            len: 0,
            reverse: false, // 轮播方向 正序
        };
    },
    mounted() {
        // this.children 不是响应式的，所以不需要放在data中
        this.children = this.$children.filter(item => item.$options.name == 'wxh-element-carousel-item');
        this.len = this.children.length;
        // 让currentSelected不停的增加
        this.run();
    },
    methods: {
        // 鼠标移入 自动轮播暂停
        handleMouseEnter() {
            clearInterval(this.timer);
            this.timer = null;
        },
        // 鼠标移出 恢复轮播
        handleMouseLeave() {
            this.run();
        },
        handleTouchStart(e) {
            this.handleMouseEnter();
            // 需要记录拖拽前的位置
            // 用户可能有多指触碰，只记录第一个碰到的
            this.startTouch = e.touches[0];
            // console.log('start', this.startTouch);
        },
        handleTouchEnd(e) {
            // console.log('e', e);
            // 手指离开时也记录一个
            let endTouch = e.changedTouches[0];
            // console.log('endTouch', endTouch);
            
            // 判断是否为向左右滑动，根据前后点的坐标 以45°角为界定计算
            let {clientX: x1, clientY: y1} = this.startTouch;
            let {clientX: x2, clientY: y2} = endTouch;
            // Math.sqrt 求平方根   Math.pow(底数,几次方)
            let distance = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
            // 判断是往哪边移动

            // 获取两点y坐标的实际距离（绝对值） 
            let disY = Math.abs(y1-y2);
            // 获取以45°为标准时，y轴的长度
            let y = Math.sqrt(2)/2 * distance;
            // 如果disY 比x小，证明滑动角度小于45 是可以滑动的
            if (disY < y) {
                // x2 比 x1大 证明是向右滑动
                if (x2 > x1) {
                    this.select(this.currentSelected - 1, true);
                } else {
                    this.select(this.currentSelected + 1, true);
                }
            }
            this.run();
        },
        select(newIndex, flag) {
            // 临界问题
            if (newIndex == this.len) newIndex = 0;
            if (newIndex == -1) newIndex = this.len - 1;
            let index = this.currentSelected;
            // 正： 0 -》1 反：1-》0
            this.reverse = index > newIndex ? true : false; // 控制正反 false为正

            // 如果是无缝轮播 反： 0->3 正： 3->0
            // 如果是手动点击dots timer为null 是没有无缝轮播效果
            // flag 为true代表左右点击时也要为无缝轮播效果
            if ((this.timer || flag) && this.loop) {
                if (index == 0 && newIndex == this.len -1) this.reverse = true; // 反
                if (index == this.len -1 && newIndex == 0) this.reverse = false; // 正序
            }
            // 父级修改子级数据 
            this.children.forEach(vm => {
                vm.reverse = this.reverse;
            });
            this.$nextTick(() => {
                this.currentSelected = newIndex;
            });
        },
        run() {
            if (this.autoplay) {
                this.timer = setInterval(() => {
                    let index = this.currentSelected;
                    let newIndex = index + 1; // 反 index -1  正： index + 1
                    // console.log('this,len', this.len, newIndex);
                    this.select(newIndex);
                }, this.delay);
            }
        },
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
};
</script>

<style lang="scss">
.ele-carousel{
    position: relative;
    .viewport{
        position: relative;
        width:100%;
        height:100%;
        overflow: hidden;
    }
    .dots{
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        span{
            display: inline-block;
            width: 20px;
            height: 5px;
            background: #ccc;
            margin: 5px;
            text-indent: -9999px;
            cursor: pointer;
            opacity: 0.5;
        }
        .active{
            opacity: 1;
        }

    }
    .arrow-box{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display:flex;
        justify-content: space-between;

    }
}
</style>
