<template>
<div class="app">
  <div>
    <h3>按钮</h3>
    <br/>
    <!-- 默认按钮 -->
    <wxh-element-button>默认按钮</wxh-element-button>
    <br/>
    <!-- "warning", "success", "danger", "info", "primary" -->
    <!-- 带类型的按钮 -->
    <wxh-element-button type="primary" style="margin-right: 10px">主要按钮</wxh-element-button>
    <wxh-element-button type="success" style="margin-right: 10px">成功按钮</wxh-element-button>
    <wxh-element-button type="info" style="margin-right: 10px">信息按钮</wxh-element-button>
    <wxh-element-button type="warning" style="margin-right: 10px">警告按钮</wxh-element-button>
    <wxh-element-button type="danger" style="margin-right: 10px">危险按钮</wxh-element-button>
    <br/>
    <!-- 带图标的按钮 -->
    <wxh-element-button type="success" icon="sousuo" style="margin-right: 10px"></wxh-element-button>
    <wxh-element-button type="primary" icon="sousuo" icon-position="right" style="margin-right: 10px">搜索</wxh-element-button>
    <wxh-element-button type="danger" icon="edit" style="margin-right: 10px">内容</wxh-element-button>
    <br/>
    <!-- loading态 -->
    <wxh-element-button :loading="true">加载中...</wxh-element-button>
    <br/>
    <!-- 触发事件 -->
    <wxh-element-button type="primary" @click="handleClick">触发事件</wxh-element-button>
  </div>
  <div>
    <h3>按钮组</h3>
    <br/>
    <wxh-element-button-group>
      <wxh-element-button icon="left" icon-position="left">上一页</wxh-element-button>
      <wxh-element-button  icon="right" icon-position="right">下一页</wxh-element-button>
    </wxh-element-button-group>
    <br/>
    <wxh-element-button-group>
      <wxh-element-button type="primary" icon="edit" icon-position="left"></wxh-element-button>
      <wxh-element-button type="primary" icon="file" icon-position="left"></wxh-element-button>
      <wxh-element-button type="primary" icon="xiazai" icon-position="right"></wxh-element-button>
    </wxh-element-button-group>
  </div>

  <div>
    <h3>图标</h3>
    <br/>
    <wxh-element-icon icon="sousuo"></wxh-element-icon>
    <wxh-element-icon icon="edit"></wxh-element-icon>
  </div>
   <br/>
   <!-- 布局 -->
   <div>
    <h3>layout布局</h3>
    <br/>
    <!-- 整栏布局 -->
    <wxh-element-row>
      <wxh-element-col>
        <div class="block">24栏布局</div>
      </wxh-element-col>
      </wxh-element-row>
      <br/>
      <!-- 二等分 -->
      <wxh-element-row>
      <wxh-element-col :span="12">
        <div class="block">12栏布局</div>
      </wxh-element-col>
      <wxh-element-col :span="12">
        <div class="block">12栏布局</div>
      </wxh-element-col>
    </wxh-element-row>
    <br/>
    <!-- 左右布局 -->
    <wxh-element-row>
      <wxh-element-col :span="6" class="block">左布局</wxh-element-col>
      <wxh-element-col :span="6" :offset="12" class="block">右布局</wxh-element-col>
    </wxh-element-row>
    <br/>
    <!-- 间隔布局 -->
    <wxh-element-row :gutter="20">
      <wxh-element-col :span="6">
        <div class="block">带间距的4等分</div>
      </wxh-element-col>
      <wxh-element-col :span="6">
        <div class="block">带间距的4等分</div>
      </wxh-element-col>
      <wxh-element-col :span="6">
        <div class="block">带间距的4等分</div>
      </wxh-element-col>
      <wxh-element-col :span="6">
        <div class="block">带间距的4等分</div>
      </wxh-element-col>
    </wxh-element-row>
    <br/>
    <!-- 对齐方式  利用fles来实现 -->
    <wxh-element-row justify="center">
      <wxh-element-col :span="3">
        <div class="block">设置对齐方式</div>
      </wxh-element-col>
      <wxh-element-col :span="3">
        <div class="block">设置对齐方式</div>
      </wxh-element-col>
    </wxh-element-row>
    <br/>
    <!-- 栅格布局 支持响应式布局-->
    <wxh-element-row :gutter="10">
      <wxh-element-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="block grid-content"></div>
      </wxh-element-col>
      <wxh-element-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="block grid-content"></div>
      </wxh-element-col>
      <wxh-element-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="block grid-content"></div>
      </wxh-element-col>
      <wxh-element-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="block grid-content"></div>
      </wxh-element-col>
    </wxh-element-row>
   </div>
   <br/>
  <!-- 布局容器 -->
   <div>
      <h3>布局容器</h3>
      <wxh-element-container>
        <wxh-element-header>Header</wxh-element-header>
        <wxh-element-main>Main</wxh-element-main>
      </wxh-element-container>
      <br/>
      <wxh-element-container>
        <wxh-element-header>Header</wxh-element-header>
        <wxh-element-main>Main</wxh-element-main>
        <wxh-element-footer>Footer</wxh-element-footer>
      </wxh-element-container>
      <br/>
      <wxh-element-container>
        <wxh-element-aside width="200px">Aside</wxh-element-aside>
        <wxh-element-main>Main</wxh-element-main>
      </wxh-element-container>
      <br/>
      <wxh-element-container>
        <wxh-element-header>Header</wxh-element-header>
        <wxh-element-container>
          <wxh-element-aside width="200px">Aside</wxh-element-aside>
          <wxh-element-main>Main</wxh-element-main>
        </wxh-element-container>
      </wxh-element-container>
      <br/>
      <wxh-element-container>
        <wxh-element-header>Header</wxh-element-header>
        <wxh-element-container>
          <wxh-element-aside width="200px">Aside</wxh-element-aside>
          <wxh-element-container>
            <wxh-element-main>Main</wxh-element-main>
            <wxh-element-footer>Footer</wxh-element-footer>
          </wxh-element-container>
        </wxh-element-container>
      </wxh-element-container>
      <br/>
      <wxh-element-container>
        <wxh-element-aside width="200px">Aside</wxh-element-aside>
        <wxh-element-container>
          <wxh-element-header>Header</wxh-element-header>
          <wxh-element-main>Main</wxh-element-main>
        </wxh-element-container>
      </wxh-element-container>
      <br/>
      <wxh-element-container>
        <wxh-element-aside width="200px">Aside</wxh-element-aside>
        <wxh-element-container>
          <wxh-element-header>Header</wxh-element-header>
          <wxh-element-main>Main</wxh-element-main>
          <wxh-element-footer>Footer</wxh-element-footer>
        </wxh-element-container>
      </wxh-element-container>
      <br/>
   </div>

   <!-- input 输入框 -->
   <div style="margin: 20px;">
      <h3>input 输入框</h3><br/>
      <!-- 普通输入框 -->
      <wxh-element-input
        type="text"
        v-model="value"
        placeholder="请输入内容"
        name="username"/>
      <!-- 禁用状态 -->
      <wxh-element-input
        type="password"
        v-model="password"
        placeholder="请输入密码"
        name="password"
        :disabled="true"/>

        <!-- 可清空 -->

        <wxh-element-input
          v-model="value"
          type="text"
          placeholder="可清空输入框"
          name="username"
          clearable/>

          <!-- 密码框 -->
          <wxh-element-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            showPassword
            name="passwoed"/>


            <!-- 带前缀后缀 -->
            <wxh-element-input
              placeholder="请编辑内容"
              suffix-icon="edit"
              v-model="input1">
            </wxh-element-input>
            <wxh-element-input
              placeholder="请输入内容"
              prefix-icon="sousuo"
              v-model="input2">
            </wxh-element-input>

            <!-- 多行文本 -->
            <wxh-element-input type="textarea" v-model="value"/>
        <div>{{value}}</div>
   </div>

   <!-- 文件上传 -->
    <div style="margin: 20px;">
      <h3>upload 文件上传</h3><br/>
      <!-- 
        name: 输入框提交到后台的字段名称
        action 提交到后端的路径
        limit 限制提交的个数
        accept 接收的文件类型
        file-list 上传的文件列表
        multiple 是否支持多选
        drag 是否支持拖拽上传
        on-exceed 超出限制后，会执行此方法
        on-change 如果当前上传文件的状态发生变化的时候，会触发
          用户选择了文件，或者上传成功 或失败都会触发
       -->
      <wxh-element-upload
        name="avatar"
        action="http://localhost:3000/upload"
        :file-list="fileList"
        :limit="3"
        :accept="`image/jpeg`"
        :multiple="true"
        :drag="false"
        :on-exceed="handleExceed"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-progress="handleProgress"
        :before-upload="beforeUpload"
        @deleteFile="deleteFile">
          <wxh-element-button type="primary" icon="shangchuan">点击上传</wxh-element-button>
          <div slot="tip">只能上传jpg/png文件， 且不超过500kb</div>
        </wxh-element-upload>
    </div>
    <!-- 文件上传 -->
    <div style="margin: 20px;">
      <h3>date 时间选择</h3><br/>
      <p style="margin-bottom: 10px;">{{value1}}</p>
      <wxh-element-date-picker
        v-model="value1"></wxh-element-date-picker>
      <!-- <p style="margin-bottom: 10px;">{{value2}}} </p> -->
      <wxh-element-date-range-picker
        v-model="value2"></wxh-element-date-range-picker>
    </div>

    <!-- 自定义滚动加载指令 -->
    <div class="infinite-scroll" style="margin: 20px">
        <h3>infinite-scroll 自定义滚动加载指令</h3>
        <ul
          style="overflow-y: scroll"
          v-infinite-scroll="loadInfiniteScroll"
          infinite-scroll-disabled="disabled"
          infinite-scroll-delay="delay"
          infinite-scroll-distance="distance"
          class="box">
            <li v-for="count in counts" :key="count">{{count}}</li>
        </ul>
    </div>

    <!-- 就地弹出 -->
    <div style="margin: 20px 100px">
      <h3>Popover 就地弹出</h3>
      <wxh-element-popover
        v-model="value"
        width="250"
        height="90"
        title="标题"
        content="内容内容，这是一个popover"
        placement="top"
        trigger="click">
          <p>默认插槽可以接收这里的值</p>
          <p>测试测试测试测试测试</p>
          <wxh-element-button slot="reference">点我出现弹框</wxh-element-button> 
        </wxh-element-popover>
    </div>

    <!-- 轮播图 -->
    <div style="margin: 20px 0;">
      <h3>carousel 轮播图</h3>
      <wxh-element-carousel
        height="200px"
        :autoplay="true"
        :delay="2000"
        :initial-index="0"
        :loop="true"
        @change="change">
        <wxh-element-carousel-item>
          <div class="car-content" style="background: red">内容1</div>
        </wxh-element-carousel-item>
        <wxh-element-carousel-item>
          <div class="car-content" style="background: blue">内容2</div>
        </wxh-element-carousel-item>
        <wxh-element-carousel-item>
          <div class="car-content" style="background: yellow">内容3</div>
        </wxh-element-carousel-item>
      </wxh-element-carousel>
    </div>

    <!-- 分页 -->
    <div style="margin: 20px;">
      <h3>pagination && table 表格与分页</h3>
      <wxh-element-table
        :columns="columns1"
        :data="data1"
        height="200px"
        @on-select="select"
        @on-select-all="selectAll"
        @on-sort-change="changeSort">
          <template slot="name" slot-scope="{row, col}">
            <h5>{{row[col.key]}}</h5>
          </template>
          <template slot="action" slot-scope="{row, col}">
            <wxh-element-button @click="deleteRow(row)">删除</wxh-element-button>
          </template>
        </wxh-element-table>
      <!-- 
        total: 总数,
        pager-count: 折叠数
        current-page: 当前页
       -->
      <wxh-element-pagination
        :total="10"
        :pager-count="7"
        :current-page.sync="currentPage"></wxh-element-pagination>
    </div>
</div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
       value: '',
       password: '',
       input2: '',
       input1: '',
       fileList: [
         {url: 'xxx', name: '珠峰架构'},
         {url: 'xxxx', name: '珠峰'}
       ],
       value1: new Date(),
       value2: [],
       counts: 0,
       disabled: false,
       delay: 200,
       distance: 30,
       immediate: true,
       currentPage: 6,
       columns1: [
        {
          type:'selection',
          width: 60
        },
        {
          title: "Name",
          key: "name",
          slot:'name'
        },
        {
          title: "Age",
          key: "age",
          sortable:'custom', // iview  默认排序 排序方法 custom（远程排序， 自定义排序）
          sortType:'asc',
        },
        {
          title: "Address",
          key: "address"
        },
        {
          title:'operator',
          slot:'action',
          key: "operator"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  },
  components: {
  },
  methods: {
    handleClick(event) {
      console.log('点击触发', event);
    },
    handleExceed(files, fileList) {
      // 超过限制 
      console.log('用户传递超过预期', files, fileList);
    },
    handleChange(file) {
      console.log('change file', file);
    },
    handleSuccess() {},
    handleError() {},
    handleProgress() {},
    beforeUpload(rawFile) {
      let limitSize = rawFile.size / 1024 > 500;
      if (limitSize) {
          console.log('当前超过上传文件的最大限制');
          return false;
      } else if (!rawFile.name.endsWith('.jpg')) {
          console.log('文件类型不对');
          return false;
      }
      return true;
    },
    // 删除文件
    deleteFile(file) {
      const index = this.fileList.findIndex(f => f.uid == file.uid);
      this.fileList.splice(index, 1);
    },
    // 自定义加载指令加载
    loadInfiniteScroll() { // 触底加载
      if (this.counts < 25) this.counts += 1;
    },

    // 触发轮播
    change(index) {
      console.log(index);
    },

    // 表格选择
    select(selection, row) {
      // selection表示选中的所有 row表示当前选中的是哪一个
      console.log(selection, row);
    },

    selectAll(selection) {
      console.log('selectAll', selection);
    },
    // 表格自定义排序
    changeSort({col, type}) {
      console.log(col,type);
    },

    // 表格删除当前行
    deleteRow(row) {
      console.log('row', row);
    }
  }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
  .app{
    margin-bottom: 500px;
    .block{
      background-color: #d3dce6;
      color:#fff;
      padding: 15px;
    }
  }
  .my-ele-header, .my-ele-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .my-ele-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .my-ele-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .my-ele-container {
    margin-bottom: 40px;
  }
  
  .my-ele-container:nth-child(5) .my-ele-aside,
  .my-ele-container:nth-child(6) .my-ele-aside {
    line-height: 260px;
  }
  
  .my-ele-container:nth-child(7) .my-ele-aside {
    line-height: 320px;
  }

  .box{
    width: 400px;
    height: 100px;
    border: 1px solid salmon;
  }
  .car-content{
    width: 100%;
    height: 100%;
  }
</style>