<template>
<main class="my-ele-main">
    <slot></slot>
</main>
</template>

<script>
export default {
    name: 'wxh-element-main'
};
</script>

<style lang="scss">
.my-ele-main{
    display: block;
    flex: 1;
    flex-basis: auto;
    padding: 20px;
}
</style>