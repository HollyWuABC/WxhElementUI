<template>
    <svg class="my-ele-icon" aria-hidden="true">
        <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
</template>

<script>
import '../styles/icon'
export default {
    name: "wxh-element-icon",
    props:{
        icon:{
            type:String
        }
    }
}
</script>

<style lang="scss">
.my-ele-icon{
    width: 25px;
    height:25px;
    vertical-align: middle;
}
</style>