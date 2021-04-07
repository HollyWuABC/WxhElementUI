<template>
<aside class="my-ele-aside" :style="{width}">
    <slot></slot>
</aside>
</template>

<script>
export default {
  name: 'wxh-element-aside',
  props: {
      width: {
          type: String,
          default: '200px'
      }
  } 
};
</script>

<style lang="scss">
.my-ele-aside{
    flex-shrink: 0;
}
</style>