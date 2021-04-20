<template>
    <transition>
    <div
        v-if="isShow"
        class="ele-carousel-item"
        :class="{reverse}">
        <slot></slot>
    </div>
    </transition>
</template>

<script>
export default {
    name: 'wxh-element-carousel-item',
    data() {
        let children = this.$parent.$children.filter(child => child.$options.name === 'wxh-element-carousel-item');
        // console.log('children', children);
        return {
            index: children.length - 1,
            reverse: false,
        }
    },
    computed: {
        isShow() {
            // console.log('this.$parent.currentSelected', this.$parent.currentSelected);
            return this.$parent.currentSelected == this.index;
        }
    }
}
</script>

<style lang="scss">
.ele-carousel-item{
    width: 100%;
    height: 100%;
}
.v-enter-active, .v-leave-active{
    transition: all 0.5s linear;
}
.v-leave-to{
    transform: translateX(-100%);
}
.v-enter{
    transform: translateX(100%);
}
.v-leave-to.reverse{
    transform: translateX(100%);
}
.v-enter.reverse{
    transform: translateX(100%);
}

.v-enter-active{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
</style>
