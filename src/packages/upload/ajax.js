// 自己封装的ajax

export default function ajax(options) {
    // 创建xhr对象
    const xhr = new XMLHttpRequest();
    const action = options.action;

    const fd = new FormData(); // h5 用来上传文件的api FormData()
    fd.append(options.filename, options.file);
    // 开启请求之前 做校验
    xhr.onerror = function(err) {
        options.onError(err); // 触发错误回调
    }
    xhr.onload = function() {
        let text = xhr.responseText || xhr.response;
        options.onSuccess(JSON.parse(text));
    }
    xhr.upload.onprogress = function(e) {
            if (e.total > 0) {
                e.percent = (e.loaded / e.total) * 100;
            }
            options.onProgress(e);
        }
        // 开启请求
    xhr.open('post', action, true);
    // 发送请求
    xhr.send(fd); // 传递文件对应的数据
    return xhr;
}