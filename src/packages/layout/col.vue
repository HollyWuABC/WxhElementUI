<template>
<div class="my-ele-col" :class="colClass" :style="colStyle">
    <slot></slot>
</div>
</template>

<<script>
export default {
  name: 'wxh-element-col',
  props: {
      span: {
        type: Number,
        default: 24
    },
    offset: {
        type: Number,
        default: 0
    },
    xs: [Number, Object], // 如果值为object 则只能传 span跟offset
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },
  data() {
      return {
          gutter: 0
      };
  },
  computed:{
      colClass() {
          let classes = [];
          classes.push(`my-ele-col-${this.span}`);
          if (this.offset) {
              classes.push(`my-ele-col-offset-${this.offset}`);
          }
          ['xs', 'sm', 'md', 'lg', 'xl'].forEach(type => {
              if (typeof this[type] === 'object') {
                  let {span, offset} = this[type];
                  span && classes.push(`my-ele-col-${type}-${span}`); // my-ele-col-xs-1
                  offset && classes.push(`my-ele-col-${type}-offset-${offset}`); // my-ele-col-xs-offset-1
              } else {
                  this[type] && classes.push(`my-ele-col-${type}-${this[type]}`); // my-ele-col-xs-1
              }
          });
          return classes;
      },
      colStyle() {
      let style = {};
      if (this.gutter) {
        style = {
          ...style,
          paddingLeft: this.gutter / 2 + "px",
          paddingRight: this.gutter / 2 + "px"
        };
      }
      return style;
    }
  }
};
</script>

<style lang="scss">
@import '@/styles/_var.scss';

// 需要通过循环24 来创造出不同的宽度
@for $i from 1 through 24{
    .my-ele-col-#{$i} {
        width: $i/24 * 100%;
    }
    .my-ele-col-offset-#{$i}{
        margin-left: $i/24 * 100%;
    }
}
// 调用媒体查询的方法
@include res(xs) {
  @for $i from 1 through 24 {
    .my-ele-col-xs-#{$i} {
      width: $i/24 * 100%;
    }
    .my-ele-col-xs-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(sm) {
  @for $i from 1 through 24 {
    .my-ele-col-sm-#{$i} {
      width: $i/24 * 100%;
    }
    .my-ele-col-sm-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(md) {
  @for $i from 1 through 24 {
    .my-ele-col-md-#{$i} {
      width: $i/24 * 100%;
    }
    .my-ele-col-md-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(lg) {
  @for $i from 1 through 24 {
    .my-ele-col-lg-#{$i} {
      width: $i/24 * 100%;
    }
    .my-ele-col-lg-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
@include res(xl) {
  @for $i from 1 through 24 {
    .my-ele-col-xl-#{$i} {
      width: $i/24 * 100%;
    }
    .my-ele-col-xl-offset-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}
</style>