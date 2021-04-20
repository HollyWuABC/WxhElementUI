<template>
    <div class="ele-upload-dragger"
        @drop.prevent="onDrop"
        @dragover.prevent
        @dragleave.prevent>
        <wxh-element-icon icon="shangchuan" class="icon"></wxh-element-icon>
        <span>将文件拖拽到此区域即可</span>
    </div>
</template>

<script>
export default {
    props: {
        accept: String
    },
    methods: {
        onDrop(e) {
            if (!this.accept) {
                this.$emit('file', e.dataTransfer.files);
            } else {
                // 这里可以对文件进行过滤 移除掉不需要的文件
                [...e.dataTransfer.files].forEach(file => {
                    // console.log('拖拽', file);
                    if (file.name.endsWith('jpg')) {
                       return this.$emit('file', e.dataTransfer.files);
                    } else {
                        console.log('文件类型不对！');
                    }
                });
            }
        }
    }
}
</script>

<style lang="scss">
.ele-upload-dragger{
    background: #eee;
    border: 1px solid #aaa;
    border-radius: 10px;
    width: 360px;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    .icon{
        width: 45px;
        height: 45px;
        margin: 0 auto;
    }
}
</style>
