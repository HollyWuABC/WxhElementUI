<template>
<header class="my-ele-header">
    <slot></slot>
</header>
</template>

<script>
export default {
    name: 'wxh-element-header',
};
</script>

<style lang="scss">
.my-ele-header{
    padding: 0 20px;
    height: 60px;
    box-sizing: border-box;
    flex-shrink: 0;
}  
</style>