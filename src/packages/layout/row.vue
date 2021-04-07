<template>
<div class="my-ele-row" :style="rowStyl">
    <slot></slot>
</div>
</template>

<script>
export default {
  name: 'wxh-element-row',
  props: {
      gutter: {
          type: Number,
          default: 0
      },
      justify: {
          type: String,
          validator(type) {
              if (type && !['start', 'end', 'center', 'space-around', 'space-between'].includes(type)) {
                  console.error(`justify的类型必须是：${['start','end','center','space-around','space-between'].join('、')}`);
              }
              return true;
          }
      }
  },
  data() {
      return {
      };
  },
  computed: {
      rowStyl() {
          let style={};
          if (this.gutter) {
              style = {
                  ...style,
                  marginRight: `-${this.gutter/2}px`,
                  marginLeft: `-${this.gutter/2}px`
              }
          }
          if (this.justify) {
              let key = ['start', 'end'].includes(this.justify) ? `flex-${this.justify}` : this.justify
              style={
                  ...style,
                  justifyContent: key
              }
          }

          return style;
      }
  },
  mounted() {
      if(this.$children) {
          this.$children.forEach(child => { // 初始化的时候给每个col加上gutter数据
              child.gutter = this.gutter;
          });
        }
  },
};
</script>

<style lang="scss">
.my-ele-row{
    display: flex;
    width: 100%;
    overflow: hidden;
    flex-wrap: wrap
}    
</style>