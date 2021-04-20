<template>
    <div class="ele-date-picker" v-click-outside = "handleBlur">
        <wxh-element-input
            suffix-icon="rili"
            placeholder="请选择日期"
            :value="formateDate"
            @focus="handleFocus"
            @change="handleChange"></wxh-element-input>
        <div v-if="isVisible" class="ele-date-content">
            <div class="ele-date-picker-content">
                <template v-if="mode === 'dates'">
                    <div class="ele-date-picker-header">
                        <wxh-element-icon icon="prev" @click="changeYear(-1)"></wxh-element-icon>
                        <wxh-element-icon icon="left" @click="changeMonth(-1)"></wxh-element-icon>
                        <span>
                            <b @click="mode='years'">{{tempTime.year}} 年</b>
                            <b @click="mode='months'">{{tempTime.month + 1}} 月</b>    
                        </span>
                        <wxh-element-icon icon="right" @click="changeMonth(1)"></wxh-element-icon>
                        <wxh-element-icon icon="next" @click="changeYear(1)"></wxh-element-icon>
                    </div>
                    <div>
                        <span
                            v-for="week in weeks"
                            :key="week"
                            class="cell">
                            {{week}}
                        </span>
                    </div>
                    <div v-for="i in 6" :key="`raw_${i}`">
                        <span
                            v-for="j in 7"
                            :key="`col_${j}`"
                            class="cell cell-dates"
                            :class="{
                                isNotCurrentMonth: !isCurrentMonth(getCurrentDay(i, j)),
                                isToday: isToday(getCurrentDay(i, j)),
                                isSelect: isSelect(getCurrentDay(i, j)),
                            }"
                            @click="selectDate(getCurrentDay(i, j))">
                            <!-- 九九乘法表 i,j都是从1开始的 -->
                            {{getCurrentDay(i, j).getDate()}}
                        </span>
                    </div>
                </template>
                <template v-if="mode === 'years'">
                    <div class="ele-date-picker-header">
                        <wxh-element-icon icon="prev" @click="changeYear(-10)"></wxh-element-icon>
                        <span>
                            <b @click="mode='years'">{{startYear}}~{{startYear + 9}} 年</b>
                        </span>
                        <wxh-element-icon icon="next" @click="changeYear(10)"></wxh-element-icon>
                    </div>
                    <div>
                        <span
                            v-for="year in years"
                            :key="year"
                            class="cell-year"
                            :class="{isYear: isCurrentYear(year)}"
                            @click="selectYear(year)">
                            {{year}}
                        </span>
                    </div>
                </template>
                <template v-if="mode === 'months'">
                    <div class="ele-date-picker-header">
                        <wxh-element-icon icon="left" @click="changeYear(-1)"></wxh-element-icon>
                        <span>
                            <b @click="mode='years'">{{tempTime.year}} 年</b>
                        </span>
                        <wxh-element-icon icon="right" @click="changeYear(1)"></wxh-element-icon>
                    </div>
                    <div>
                        <span
                            v-for="month in months"
                            :key="month"
                            class="cell-month"
                            :class="{
                                isMonth: getCurrentMonth() === month
                            }"
                            @click="selectMonth(month)">
                            {{month}}
                        </span>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>

function getYearMonthDay(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate(); // 获取日期getDate 获取周几 getDay
    return [year, month, day];
}

import clickOutside from 'v-click-outside';

export default {
    name: 'wxh-element-date-picker',
    directives: {
        clickOutside: clickOutside.directive,
    },
    props: {
        value: {
            type: [String, Date],
            default: () => new Date()
        }
    },
    data() {
        let [year, month, day] = getYearMonthDay(this.value || new Date()); // 根据当前时间推算出一个年月日
        return {
            isVisible: false,
            weeks: ['日', '一', '二', '三', '四', '五', '六'],
            months: ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'],
            mode: 'dates', // date | years | months
            time: { // 通过time来显示选择的时间
                year, month, day
            },
            tempTime: { // 用来完成点击选择等的操作的临时时间
                year, month, day
            }
        }
    },
    computed: {
        formateDate() {
            if (this.value) {
                let { year, month, day } = this.time;
                // 补零操作
                return `${year}-${(`${month + 1}`).padStart(2, 0)}-${(`${day}`).padStart(2, 0)}`;
            }
        },
        visibleDate() { // 计算当月有多少天
            // 直接将当月的第一天向前移动多少天 开始循环42天
            let fristDay = new Date(this.tempTime.year, this.tempTime.month, 1);
            let weekDay = fristDay.getDay(); // 0 表示周日  6 表示周六
            weekDay = weekDay === 0 ? 7 : weekDay;
            let start = fristDay - weekDay*60 * 60 * 24 * 1000;
            let arr = [];
            for(let i = 0; i < 42; i++) {
                arr.push(new Date(start + i * 60 * 60 * 24 * 1000));
            }
            return arr;
        },
        startYear() { // 取10年的年份的起始年
            return this.time.year - this.tempTime.year % 10;
        },
        years() {
            let yearsArr = [];
            for (let i = 0; i < 10; i++) {
                yearsArr.push(this.startYear + i);
            }
            return yearsArr;
        }
    },
    watch: {
        value(newValue) {
            // 根据最新的value来更新time跟tempTime
            let [year, month, day] = getYearMonthDay(newValue);
            this.time = {year, month, day};
            this.tempTime = {...this.time};
        }
    },
    methods: {
        // 点击输入框 显示浮层
        handleFocus() {
            this.isVisible = true;
        },
        // 对输入框的内容进行校验
        handleChange(e) {
            let newValue = e.target.value;
            let regExp = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
            if (newValue.match(regExp)) {
                this.$emit('input', new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3));
            } else { // 如果input输入框的内容不符合正则，则将值赋值回去
                e.target.value = this.formateDate;
            }
            this.handleBlur();
        },
        // 点击整个div外层时，隐藏弹层
        handleBlur() {
            this.isVisible = false;
            this.mode = 'dates';
        },
        // 获取当前时间
        getCurrentDay(i, j) {
            return this.visibleDate[(i -1)*7+(j-1)];
        },
        // 获取当前月份
        getCurrentMonth() {
            let monthIndex = this.months.find((month, index) => index === this.time.month);
            return monthIndex;
        },
        // 判断是否当年
        isCurrentYear(y) {
            let { year } = this.tempTime; // 取出用户选择的年月
           return year === y ? true : false;
        },
        // 判断是否是当前月
        isCurrentMonth(date) {
            let { year, month } = this.tempTime; // 取出用户选择的年月
            let [y, m] = getYearMonthDay(date);
            return year === y && month === m;
        },
        // 判断是否是当天
        isToday(date) {
          let [year, month, day] = getYearMonthDay(new Date); // 取出用户选择的年月
            let [y, m, d] = getYearMonthDay(date);
            return year === y && month === m && day === d;  
        },
        // 选择日期
        selectDate(date) {
            this.$emit('input', date);
            this.handleBlur();
        },
        // 是否选中
        isSelect(date){
            let { year, month, day} = this.time; // 最新的时间
            let [y, m, d] = getYearMonthDay(date);
            return year === y && month === m && day === d; 
        },
        // 修改月份
        changeMonth(count) {
            const oldDate = new Date(this.tempTime.year, this.tempTime.month);
            const newDate = oldDate.setMonth(oldDate.getMonth() + count);
            let [year, month] = getYearMonthDay(new Date(newDate));
            this.tempTime.year = year;
            this.tempTime.month = month;
        },
        // 修改年份
        changeYear(count) {
            const oldDate = new Date(this.tempTime.year, this.tempTime.month);
            const newDate = oldDate.setFullYear(oldDate.getFullYear() + count);
            let [year] = getYearMonthDay(new Date(newDate));
            this.tempTime.year = year;
        },
        // 选择月份
        selectMonth(month) {
            this.tempTime.month = this.months.findIndex(mon => mon === month);
            this.mode = 'dates';
        },
        // 选择年份
        selectYear(y) {
            this.tempTime.year = y;
            this.mode = 'months';
        }
    }
}
</script>

<style lang="scss">
@import '@/styles/_var.scss';

.ele-date-picker{
    display: inline-block;
    .ele-date-content{
        position: absolute;
        z-index: 10;
        user-select: none;
        width: 280px;
        // padding: 0 10px;
        background: #fff;
        box-shadow: 1px 1px 2px $primary, -1px -1px 2px $primary;
        .ele-date-picker-header{
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .cell{
        width: 40px;
        height: 40px;
        display: inline-block;
        text-align: center;
        line-height: 40px;
        font-weight: 400;
        font-size: 13px;
    }
    .cell-month, .cell-year{
        width: 70px;
        height: 70px;
        line-height: 70px;
        display: inline-block;
        text-align: center;
        font-weight: 400;
    }
}
.isNotCurrentMonth{
    color: #ccc;
}
.cell-dates:hover:not(.isNotCurrentMonth):not(.isSelect) {
    color: $primary;
}
.isSelect{
    color: #fff;
    background: $primary;
    border-radius: 50%;
}
.isToday, .isMonth, .isYear{
    color: $primary;
    background: #fff;
    font-weight: bold;
}
</style>


<!--
如何计算当月有多少天？
- 方法一 找到下一个月的1号的前一天，拿到总天数
再去获取当前1号是星期几，再加上前面的那几天
利用42减去刚才加上的月的天数 = 剩下的

- 方法二 直接将自己向前移动多少天 开始循环42天

-->