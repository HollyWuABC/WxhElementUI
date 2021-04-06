<template>
<footer class="my-ele-footer">
    <slot></slot>
</footer>
</template>

<script>
export default {
    name: 'wxh-element-footer',
};
</script>

<style lang="scss">
.my-ele-footer{
    padding: 0 20px;
    flex-shrink: 0;
    height: 60px;
}  
</style>