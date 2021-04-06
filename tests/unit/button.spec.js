import { shallowMount } from '@vue/test-utils'; // vue提供的快速测试的方法
import { expect } from 'chai';

import Button from '@/packages/button';
import Icon from '@/packages/icon';

// 编写测试用例
describe('button.vue', () => {
    it('1.测试button能否正常显示slot里的内容', () => { // 测试组件在浏览器运行的情况
        const wrapper = shallowMount(Button, { // wrapper是容器包裹器
            slots: {
                default: 'wxh-element-ui'
            }
        });
        expect(wrapper.text().to.eq('wxh-element-ui'));
    })
    it('2.测试icon传入是否能正常显示', () => {
        const wrapper = shallowMount(Button, {
            stubs: { // stubs 以对象的形式是表示替换  将wxh-element-icon替换为Icon组件的内容
                'wxh-element-icon': Icon
            },
            propsData: {
                icon: 'edit'
            }
        });
        expect(wrapper.find('use').attributes('href')).to.eq('#icon-edit')
    })
    it('3.测试loading时，按钮是否是禁用状态', () => {
        const wrapper = shallowMount(Button, {
            stubs: {
                'wxh-element-icon': Icon
            },
            propsData: {
                loading: true
            }
        })
        expect(wrapper.find('use').attributes('href')).to.eq('#icon-loading');
        expect(wrapper.find('button').attributes('disabled')).to.eq('disabled')
    })
    it('4.测试按钮能否正常点击', () => {
        const wrapper = shallowMount(Button, {
            // stubs: [] 表示一个桩 不会渲染，只是加了一个标签标识
            // stubs: ['wxh-element-icon']
        })
        wrapper.find('button').trigger('click');
        expect(wrapper.emitted('click').length).to.eq(1)
    })
    it('5.测试按钮传入position是否正常显示', () => {
        const wrapper = shallowMount(Button, {
            attachToDocument: true, // 将组件挂载在浏览器上
            stubs: {
                'wxh-element-icon': Icon // 替换功能
            },
            slots: {
                default: 'wxh-element-ui'
            },
            propsData: {
                iconPosition: 'left',
                icon: 'edit'
            }
        });
        let ele = wrapper.vm.$el.querySelector('span');
        expect(getComputedStyle(ele).order).to.eq('2');
        wrapper.setProps({ iconPosition: 'right' }); // 设置props 必须要在下一个事件环去取值
        return wrapper.vm.$nextick().then(() => {
            expect(getComputedStyle(ele).order).to.eq('1');
        })
    })
})