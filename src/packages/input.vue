<template>
<div class="my-ele-input"  :class="classes">
    <wxh-element-icon :icon="prefixIcon" v-if="prefixIcon"></wxh-element-icon>
    <wxh-element-icon :icon="suffixIcon" v-if="suffixIcon"></wxh-element-icon>
<!-- :value 和@input('input', $event.target.value) 是v-model的语法糖 -->
    <input
        ref="input"
        :value="value"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('input', $event.target.value)"/>
        <!-- @click.native 表示点击的是原生的点击事件 -->
        <!-- @mousedown.native.prevent 阻止原生的默认事件 即清空完焦点还在 -->
    <wxh-element-icon
        v-if="clearable&&value"
        icon="qingkong"
        @click.native="$emit('input', '')"
        @mousedown.native.prevent/>
    <wxh-element-icon
        v-if="showPassword&&value"
        icon="eye"
        @click.native="changeStatus"/>
    <textarea
        v-if="type === 'textarea'"
        :value="value"
        @input="$emit('input', $event.target.value)"></textarea>
</div>
</template>

<script>
export default {
    name: 'wxh-element-input',
    props: {
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false

        },
        clearable: { // 是否可清空
            type: Boolean,
            dafault: false
        },
        showPassword: {
            type: Boolean,
            default: false
        },
        suffixIcon: {
            type: String,
            default: ''
        },
        prefixIcon: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            passwordVisible: false
        };
    },
    computed: {
        classes() {
            let sclses = [];
            if (this.clearable || this.showPassword || this.suffixIcon) { // 图标在后
                sclses.push('my-ele-input-suffix-icon');
            }
            if (this.prefixIcon) {
                sclses.push('my-ele-input-prefix-icon');
            }
            return sclses;
        }
    },
    methods: {
        changeStatus() {
            this.passwordVisible = !this.passwordVisible;
            /* 显示密码之后重新获取焦点 记得此时input框不能添加@mousedown.native.prevent
                （阻止原生的默认事件 即清空完焦点还在）
                这里是要让光标停在上次的地方，不是一直停在最前面 清空这种情况就需要停在最前面
            */ 
           this.$nextTick(() => {
               this.$refs.input.focus(); // 在下一事件环之前获取焦点
           })
        }
    },
};
</script>

<style lang="scss">
@import "@/styles/_var.scss";
.my-ele-input{
    display: inline-flex;
    position: relative;
    input, textarea {
        padding: 8px;
        width: 150px;
        height: 42px;
        border-radius: $border-radius;
        border: 1px solid #dcdfe6;
        &:focus{
            border: 1px solid $primary;
            outline: none;
            box-shadow: inset -1px 0px 2px $primary, inset 1px 1px 1px $primary;
        }
        &[disabled] {
            cursor: not-allowed;
            background: #eee;
        }
    }
}
.my-ele-input-suffix-icon {
  input {
    padding-right: 25px;
  }
  .my-ele-icon {
    right: 8px;
    top: 13px;
    position: absolute;
    cursor: pointer;
    width: 14.5px;
    height: 14.5px;
  }
}
.my-ele-input-prefix-icon {
  input {
    padding-left: 25px;
  }
  .my-ele-icon {
    left: 8px;
    top: 13px;
    position: absolute;
    cursor: pointer;
    width: 14.5px;
    height: 14.5px;
  }
}
</style>