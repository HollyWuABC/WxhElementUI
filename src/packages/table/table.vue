<template>
<div class="ele-table" ref="wrapper">
    <div class="table-wrapper" :style="{height}" ref="tableWrapper">
        <table ref="table">
            <thead>
                <tr>
                    <th v-for="(col, index) in cloneColumns" :key="index" :style="{width:col.width+'px'}">
                        <div v-if="col.type ==='selection'">
                            <input
                                type="checkbox"
                                :checked="checkAllStatus"
                                ref="checkAll"
                                @change="selectAll"/>
                        </div>
                    <div v-else class="ele-table-cell">
                            <span>{{col.title}}</span>
                            <span v-if="col.sortable" class="sortable">
                                <wxh-element-icon
                                    icon="up"
                                    :class="{active: isAsc(col)}"
                                    @click="sort(col,isAsc(col)?'normal':'asc')"></wxh-element-icon>
                                <wxh-element-icon
                                    icon="down"
                                    :class="{active: isDesc(col)}"
                                    @click="sort(col,isDesc(col)?'normal':'desc')"></wxh-element-icon>
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in cloneData" :key="index">
                    <td v-for="(col, index) in cloneColumns" :key="index">
                        <div v-if="col.type =='selection'">
                            <input
                                type="checkbox"
                                @change="selectOne($event, row)"
                                :checked="isChecked(row)"/>
                        </div>
                        <div v-else>
                            <template v-if="col.slot">
                                <slot :name="col.slot" :row="row" :col="col"></slot>
                            </template>
                            <template v-else>{{row[col.key]}}</template>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
    name: 'wxh-element-table',
    props: {
        columns: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        },
        height: {
            type: String
        }
    },
    data() {
        return {
            cloneColumns: cloneDeep(this.columns),
            cloneData: cloneDeep(this.data),
            selectItems: [], // 存放选中的项
        };
    },
    computed: {
        checkAllStatus() { // 全选状态
            return this.cloneData.length === this.selectItems.length;
        },
    },
    watch: {
        selectItems() { // 观察selectItems的变化 设置checkbox的状态
            if (this.cloneData.length !== this.selectItems.length) { // 非全选状态
                if (this.selectItems.length > 0) { // 至少选中了一个
                    return this.$refs.checkAll[0].indeterminate = true; // indeterminate 官方提供api
                }
            }
            this.$refs.checkAll[0].indeterminate = false;
        }
    },
    created() {
        this.cloneData = this.cloneData.map(row => { // 手动给cloneData数据添加一个唯一标识，用于区别数据
            row._id = Math.random();
            return row;
        });
        this.cloneColumns = this.cloneColumns.map(col => {
            col.sortType = col.sortType ? col.sortType : 'normal'; // 没有的话就用默认排序
            this.sort(col, col.sortType);
            return col;
        })
    },
    mounted() {
        if (this.height) {
            let wrapper = this.$refs.wrapper;
            let tableWrapper = this.$refs.tableWrapper;
            let table = this.$refs.table;

            let copyTable = table.cloneNode(); // 只拷贝表格
            let thead = table.children[0];
            tableWrapper.style.paddingTop =
                thead.getBoundingClientRect().height + "px";

            copyTable.appendChild(thead);
            copyTable.style.width = table.offsetWidth + "px";

            copyTable.classList.add("fix-header");

            let tds = table.querySelector("tbody tr").children;
            let ths = copyTable.querySelector("thead tr").children;

            tds.forEach((item, index) => {
                ths[index].style.width = item.getBoundingClientRect().width + "px";
            });

            wrapper.appendChild(copyTable);
        }
    },
    methods: {
        selectAll(e) { // 选中所有
            this.selectItems = e.target.checked ? this.cloneData : [];
            this.$emit('on-select-all', this.selectItems);
        },
        selectOne(e, row) {
            if(e.target.checked) { // 表示选中
                this.selectItems.push(row)
            } else { // 未选中 则清除
                this.selectItems = this.selectItems.filter(r => r._id !== row._id);
            }
            this.$emit('on-select', this.selectItems, row);
        },
        isChecked(row) { // 当前选中项
            return this.selectItems.some(r => r._id == row._id);
        },
        isAsc(col) { // 正序
            return col.sortType === 'asc';
        },
        isDesc(col) {
            return col.sortType === 'desc';
        },
        sort(col, type) { // 排序方法
            // console.log('排序');
            if (col.sortable !== 'custom') {
                let data = this.cloneData;
                col.sortType = type;
                if (type !== 'normal') {
                    let key = col.key;
                    this.cloneData = data.sort((a, b) => {
                        if (type == 'asc') {
                            return a[key] - b[key];
                        } else {
                            return b[key] - a[key];
                        }
                    });
                } else {
                    // console.log('不排序');
                    // 如果不需要排序 把默认的结果赋予数据即可
                    this.cloneData = cloneDeep(this.data);
                }
            } else {
              this.$emit("on-sort-change", {
                    col: cloneDeep(col),
                    type
                });  
            }
        }
    },
};
</script>

<style lang="scss">
@import "@/styles/_var.scss";
.fix-header {
  position: absolute;
  top: 0;
  left: 0;
}
.ele-table{
    position: relative;
    table{
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        th {
            background: #ccc;
        }
        th, td{
            border-bottom: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
    }
    .ele-table-cell{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        .sortable{
            display: flex;
            flex-direction: column;
            margin-left: 5px;
            .my-ele-icon{
                width: 10px;
                height: 10px;
            }
            .active{
                fill: $primary;
            }
        }
    }
}
.table-wrapper {
  overflow-y: scroll;
}
</style>