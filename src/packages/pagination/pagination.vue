<template>
    <ul class="ele-pagination">
        <li>
            <wxh-element-icon
                icon="left"
                @click="select(currentPage - 1)"></wxh-element-icon>
        </li>
        <li>
            <span
                :class="{'active': currentPage === 1}"
                @click="select(1)">
                1
            </span>
        </li>
        <li v-if="showPrevMore">
            <span>...</span>
        </li>
        <li v-for="page in pager" :key="page">
            <span 
                :class="{'active': currentPage === page}"
                @click="select(page)">
                {{page}}
            </span>
        </li>
        <li v-if="showNextMore">
            <span>...</span>
        </li>
        <li>
            <span
                :class="{'active': currentPage === total}"
                @click="select(total)">
                {{total}}
            </span>
        </li>
        <li>
            <wxh-element-icon
                icon="right"
                @click="select(currentPage + 1)"></wxh-element-icon>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'wxh-element-pagination',
    props: {
        total: {
            type: Number,
            default: 0,
        },
        pagerCount: {
            type: Number,
            default: 7,
        },
        currentPage: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            showPrevMore: false,
            showNextMore: false,
        }
    },
    computed: {
        // 最多显示7个按钮
        // 例如，当前第四页 1 2 3 4 5 6 ... 10
        // 当前显示第五页 1 ... 3 4 5 6 7 ... 10
        // 如果当前显示第七页 1 ... 5 6 7 8 9 10
        pager() {
            let total = this.total;
            let pagerCount = this.pagerCount;
            // 获取中间页
            let middleValue = Math.floor(this.pagerCount / 2);
            let currentPage = this.currentPage;
            
            // 判断是前面展示... 还是后面展示...
            let showPrevMore = false;
            let showNextMore = false;
            // 当total> pagerCount 需要显示...
            if (total > pagerCount) {
                if (currentPage > middleValue + 1) {
                    showPrevMore = true;
                }
                if(currentPage < total - middleValue) {
                    showNextMore = true;
                }
            }
            let arr = [];
            // 下面2的运算都是因为要排除最前面的1 跟最后面的数
            if(showPrevMore && !showNextMore) { // 前面有... 后面没有
                let start = total - (pagerCount - 2);
                for(let i = start; i < total; i++) {
                    arr.push(i);
                }
            } else if (!showPrevMore && showNextMore) { // 后面有... 前面没有
                for(let i = 2; i < pagerCount; i++) {
                    arr.push(i);
                }
            } else if (showPrevMore && showNextMore) { // 前后都有...
                let val = Math.floor((pagerCount - 2) / 2);
                for(let i = currentPage - val; i <= currentPage + val; i++) {
                    arr.push(i);
                }
            } else { // 全部都展示
                 for(let i = 2; i < total; i++) {
                    arr.push(i);
                }
            }
            this.showPrevMore = showPrevMore;
            this.showNextMore = showNextMore;
            return arr;
        }
    },
    methods: {
        select(current) {
            console.log('current', current);
            console.log(this.currentPage);
            if (current < 1) {
               current = 1;
            }
            if (current > this.total) {
                current = this.total;
            }
            if (current !== this.currentPage) {
                this.$emit('update:current-page', current);
                // this.$emit('update:current-page',current);
            }
        }
    },
}
</script>

<style lang="scss">
@import "@/styles/_var.scss";
.ele-pagination li{
    list-style: none;
    display: inline-flex;
    user-select: none;
    .active{
        color: $primary;
    }
}
</style>
