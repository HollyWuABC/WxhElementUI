<template>
<div class="wxh-ele-upload">
    <UploadDragger
        v-if="drag"
        :accept="accept"
        @file="uploadFiles"></UploadDragger>
    <template v-else>
        <div class="wxh-ele-upload-btn" @click="handelClick">
            <slot></slot>
        </div>
        <input
            class="input"
            ref="input"
            type="file"
            :name="name"
            :accept="accept"
            :multiple="multiple"
            @change="handelChange"/>
    </template>
    <div>
        <slot name="tip"></slot>
    </div>
    <ul>
        <li v-for="file in files" :key="file.uid">
            <div class="list-item">
                <wxh-element-icon icon="file"></wxh-element-icon>
                {{file.name}}
                <wxh-element-progress
                    v-if="file.status === 'uploading'"
                    :percentage="file.percentage">
                </wxh-element-progress>
                {{file.status}}
                <wxh-element-icon icon="cha" @click="deleteFile(file)"></wxh-element-icon>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
import ajax from './ajax';
import UploadDragger from './upload-dragger.vue';


export default {
    name: 'wxh-element-upload',
    components: {UploadDragger},
    props: {
        name: {
            type: String,
            default: 'file'
        },
        action: {
            tyo: String,
            required: true,
        },
        fileList: {
            type: Array,
            default: () => []
        },
        accept: String,
        limit: Number,
        multiple: Boolean,
        onExceed: Function,
        onChange: Function,
        onSuccess: Function,
        onError: Function,
        onProgress: Function,
        beforeUpload: Function,
        httpRequest: { // 默认会提供一个ajax，如果用户有传，就采用用户的
            type: Function,
            default: ajax
        },
        drag: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
           tempIndex: 1,
           files: [], // 储存展示的文件列表
           reqs: [], // 存储请求 以便之后用户反悔操作
        }
    },
    watch: {
        fileList: {
            immediate: true,
            handler(newVal, oldVal) {
                this.files = this.fileList.map(item => {
                    item.uid = Date.now() + this.tempIndex++;
                    item.status = 'success';
                    return item;
                });
            }
        }
    },
    methods: {
        handelClick() {
            // 在点击之前 先要还原输入框
            this.$refs.input.value = '';
            this.$refs.input.click();
        },
        handleStart(rawFile) {
            // 给文件添加一个唯一的id标识
            rawFile.uid = Math.random() + this.tempIndex++;
            let file = {
                status: 'ready', // 默认是准备上传状态
                name: rawFile.name, // 文件名字
                size: rawFile.size, // 文件大小
                percentage: 0, // 上传的进度
                uid: rawFile.uid,
                raw: rawFile
            }
            this.files.push(file); // 将当前用户上传的文件push到fileList中，过会要展示

            this.onChange && this.onChange(file);
        },
        getFile(rawFile) {
            return this.files.find(file => file.uid === rawFile.uid);
        },
        handleProgress(ev, rawFile) {
            // 给不同的状态 添加不同的颜色
            // 通过源文件(用户上传的文件) 格式化成想要的结果
            let file = this.getFile(rawFile); // 这个file就是当前格式化后的文件
            file.status = 'uploading';
            file.percentage = ev.percent || 0;
            this.onProgress(ev, rawFile); // 调用用户的回调
        },
        handleSuccess(res, rawFile){
            let file = this.getFile(rawFile);
            file.status = 'success';
            this.onSuccess(res, rawFile);
            this.onChange(file);
        },
        handleError(err, rawFile){
            let file = this.getFile(rawFile);
            file.status = 'fail';
            this.onError(err, rawFile);
            this.onChange(file);
            delete this.reqs[file.uid]; // 已经失败的ajax 不需要后续再中断请求
        },
        post(rawFile) { // 真正的上传逻辑
            // 调用httpRequest方法 需要整合参数 处理上传的整个流程
            const uid = rawFile.uid; // 文件id 标记
            const options = {
                file: rawFile,
                filename: this.name,
                action: this.action,
                onProgress: ev => {
                    // 处理上传中
                    this.handleProgress(ev, rawFile);
                },
                onSuccess: res => {
                    // 处理成功
                    this.handleSuccess(res, rawFile);
                },
                onError: err => {
                    // 处理失败
                    this.handleError(err, rawFile);
                }
            };
            let req = this.httpRequest(options);
            // 将uid跟请求绑定，之后可以通过uid去找到当次请求进行反悔操作
            this.reqs[uid] = req;
            // 允许用户使用带有promise的ajax
            if (req && req.then) {
                req.then(options.onSuccess, options.onError)
            }
        },
        upload(rawFile) {
            // 上传文件 rawFile是源文件
            // 先判断文件是否能上传 有无文件大小限制
            if (!this.beforeUpload) { // 无大小限制
                // 直接上传
                return this.post(rawFile);
            }
            let flag = this.beforeUpload(rawFile);
            if (flag) { // 不超过限制大小
                // 直接上传
                return this.post(rawFile);
            }
        },
        uploadFiles(files) {
            // 限制上传是否达到最大条件
            if (this.limit && this.fileList.length + files.length > this.limit) {
                return this.onExceed && this.onExceed(files, this.fileList);
            }
            [...files].forEach(rawFile => {
                // 用户上传的文件需要做一下处理 可能用户频繁上传同一个文件
                // 将文件格式化成想要的结果
                this.handleStart(rawFile); // 处理上传的数据
                this.upload(rawFile); // 真正的上传方法
            });
        },
        handelChange(event) {
            // 获取选中的文件
            // files 是一个类数组
            const files = event.target.files;
            // 多个文件如何上传？多创建几个ajax 一起传
            this.uploadFiles(files);
        },
        // 删除文件
        deleteFile(file) {
            this.$emit('deleteFile', file);
        }
    }
}
</script>

<style lang="scss">
.wxh-ele-upload{
    .wxh-ele-upload-btn{
        display: inline-block;
    }
    .input{
        display: none;
    }
}

</style>
