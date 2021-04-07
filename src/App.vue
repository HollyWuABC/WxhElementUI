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
       input1: ''
    };
  },
  components: {
  },
  methods: {
    handleClick(event) {
      console.log('点击触发', event);
    }
  }
}
</script>

<<style lang="scss">
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
  .app{
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
</style>