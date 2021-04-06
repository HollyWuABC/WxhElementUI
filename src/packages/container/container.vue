<template>
<section class="my-ele-container" :class="{isVertical}">
    <slot></slot>
</section>
</template>

<script>
export default {
  name: 'wxh-element-container',
  data() {
      return {
          isVertical: true
      };
  },
  mounted() {
      this.isVertical = this.$children.some(child => 
        ['wxh-element-header', 'wxh-element-footer'].includes(
            child.$options.name
        ));
  },
};
</script>

<style lang="scss">
.my-ele-container{
    display: flex;
    flex: 1;
    flex-direction: row 
}
.my-ele-container.isVertical{
    flex-direction: column;
}
</style>