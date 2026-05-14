<template>
  <view class="m-drop-menu-demo">
    <view class="m-drop-menu-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="默认从下方展开的下拉菜单">
        <m-drop-menu>
          <m-drop-menu-item
            v-model="value1"
            :options="options1"
            @change="handleChange"
          />
          <m-drop-menu-item
            v-model="value2"
            :options="options2"
            @change="handleChange"
          />
          <m-drop-menu-item
            v-model="value3"
            :options="options3"
            @change="handleChange"
          />
        </m-drop-menu>
      </demo-block>

      <!-- 展开方向 -->
      <demo-block title="展开方向" desc="设置 direction 为 up，从上方展开菜单">
        <m-drop-menu direction="up">
          <m-drop-menu-item
            v-model="value4"
            :options="options1"
          />
          <m-drop-menu-item
            v-model="value5"
            :options="options2"
          />
          <m-drop-menu-item
            v-model="value6"
            :options="options3"
          />
        </m-drop-menu>
      </demo-block>

      <!-- 禁用状态 -->
      <demo-block title="禁用状态" desc="设置 disabled 属性禁用菜单项">
        <m-drop-menu>
          <m-drop-menu-item
            v-model="value7"
            :options="options1"
            :disabled="true"
          />
          <m-drop-menu-item
            v-model="value8"
            :options="options2"
          />
          <m-drop-menu-item
            v-model="value9"
            :options="options3"
          />
        </m-drop-menu>
      </demo-block>

      <!-- 自定义标题 -->
      <demo-block title="自定义标题" desc="设置 title 属性自定义菜单项标题">
        <m-drop-menu>
          <m-drop-menu-item
            v-model="value10"
            :options="options1"
            title="自定义标题"
          />
          <m-drop-menu-item
            v-model="value11"
            :options="options2"
            title="选择城市"
          />
          <m-drop-menu-item
            v-model="value12"
            :options="options3"
            title="选择时间"
          />
        </m-drop-menu>
      </demo-block>

      <!-- 带提示文字 -->
      <demo-block title="带提示文字" desc="选项支持显示提示文字">
        <m-drop-menu>
          <m-drop-menu-item
            v-model="value13"
            :options="optionsWithTip"
          />
        </m-drop-menu>
      </demo-block>

      <!-- 自定义图标 -->
      <demo-block title="自定义图标" desc="设置 icon 属性自定义右侧箭头图标">
        <m-drop-menu>
          <m-drop-menu-item
            v-model="value14"
            :options="options1"
            icon="chevron-down"
            :icon-size="20"
          />
          <m-drop-menu-item
            v-model="value15"
            :options="options2"
            icon="arrow-down"
            :icon-size="18"
          />
          <m-drop-menu-item
            v-model="value16"
            :options="options3"
            icon="more"
            :icon-size="22"
          />
        </m-drop-menu>
      </demo-block>

      <!-- 自定义选中图标 -->
      <demo-block title="自定义选中图标" desc="设置 icon-name 属性自定义选中图标">
        <m-drop-menu>
          <m-drop-menu-item
            v-model="value17"
            :options="options1"
            icon-name="check-circle"
          />
          <m-drop-menu-item
            v-model="value18"
            :options="options2"
            icon-name="success"
          />
          <m-drop-menu-item
            v-model="value19"
            :options="options3"
            icon-name="star"
          />
        </m-drop-menu>
      </demo-block>

      <!-- 自定义弹出层高度 -->
      <demo-block title="自定义弹出层高度" desc="设置 popup-height 属性限制弹出层高度">
        <m-drop-menu>
          <m-drop-menu-item
            v-model="value20"
            :options="longOptions"
            popup-height="300px"
          />
        </m-drop-menu>
      </demo-block>

      <!-- 不显示蒙层 -->
      <demo-block title="不显示蒙层" desc="设置 modal 为 false 不显示蒙层">
        <m-drop-menu :modal="false">
          <m-drop-menu-item
            v-model="value21"
            :options="options1"
          />
          <m-drop-menu-item
            v-model="value22"
            :options="options2"
          />
        </m-drop-menu>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('1')
const value2 = ref('beijing')
const value3 = ref('today')
const value4 = ref('2')
const value5 = ref('shanghai')
const value6 = ref('week')
const value7 = ref('1')
const value8 = ref('guangzhou')
const value9 = ref('month')
const value10 = ref('2')
const value11 = ref('shenzhen')
const value12 = ref('year')
const value13 = ref('a')
const value14 = ref('1')
const value15 = ref('beijing')
const value16 = ref('today')
const value17 = ref('2')
const value18 = ref('shanghai')
const value19 = ref('week')
const value20 = ref('1')
const value21 = ref('1')
const value22 = ref('beijing')

const options1 = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
  { label: '选项四', value: '4' }
]

const options2 = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' }
]

const options3 = [
  { label: '今天', value: 'today' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
  { label: '本年', value: 'year' }
]

const optionsWithTip = [
  { label: '选项A', value: 'a', tip: '推荐' },
  { label: '选项B', value: 'b', tip: '热门' },
  { label: '选项C', value: 'c' },
  { label: '选项D', value: 'd', tip: '新功能' }
]

const longOptions = Array.from({ length: 20 }, (_, i) => ({
  label: `选项${i + 1}`,
  value: `${i + 1}`
}))

function handleChange(event: { value: string | number; selectedItem: Record<string, any> }) {
  console.log('选中值:', event.value)
  console.log('选中项:', event.selectedItem)
}
</script>

<style lang="scss">
.m-drop-menu-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}
</style>
