<template>
	<view class="m-cascader-demo">
		<view class="m-cascader-demo__container">
			<!-- 基础级联选择 -->
			<demo-block title="基础级联选择" desc="静态数据模式，选择省市区三级联动">
				<view class="demo-cascader-row">
					<m-cell 
						title="选择地区" 
						:value="cascaderValueLabel || '请选择'"
						clickable
						@click="openCascader"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-cascader
						v-model="cascaderValue"
						:options="regionOptions"
						title="选择地区"
						ref="cascaderRef"
						@confirm="handleCascaderConfirm"
					/>
				</view>
			</demo-block>

			<!-- 异步加载模式 -->
			<demo-block title="异步加载" desc="通过 lazyLoad 实现异步加载子节点数据">
				<view class="demo-cascader-row">
					<m-cell 
						title="异步加载" 
						:value="lazyValueLabel || '请选择'"
						clickable
						@click="openLazyCascader"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-cascader
						v-model="lazyValue"
						title="异步加载"
						:lazy-load="lazyLoad"
						ref="lazyCascaderRef"
						@confirm="handleLazyConfirm"
					/>
				</view>
			</demo-block>

			<!-- 任意级可选 -->
			<demo-block title="任意级可选" desc="设置 checkStrictly 开启任意级选择模式">
				<view class="demo-cascader-row">
					<m-cell 
						title="任意级选择" 
						:value="strictValueLabel || '请选择'"
						clickable
						@click="openStrictCascader"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-cascader
						v-model="strictValue"
						:options="regionOptions"
						title="选择地区"
						check-strictly
						confirm-text="确定"
						ref="strictCascaderRef"
						@confirm="handleStrictConfirm"
					/>
				</view>
			</demo-block>

			<!-- 自定义字段名 -->
			<demo-block title="自定义字段名" desc="通过 valueKey、textKey 等属性自定义字段名">
				<view class="demo-cascader-row">
					<m-cell 
						title="自定义字段" 
						:value="customValueLabel || '请选择'"
						clickable
						@click="openCustomCascader"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-cascader
						v-model="customValue"
						:options="customOptions"
						title="选择选项"
						value-key="id"
						text-key="name"
						children-key="items"
						ref="customCascaderRef"
						@confirm="handleCustomConfirm"
					/>
				</view>
			</demo-block>

			<!-- 事件监听 -->
			<demo-block title="事件监听" desc="支持 confirm、close 事件">
				<view class="demo-cascader-row">
					<m-cell 
						title="事件演示" 
						:value="eventValueLabel || '请选择'"
						clickable
						@click="openEventCascader"
					>
						<template #right-icon>
							<m-icon name="right" />
						</template>
					</m-cell>
					<m-cascader
						v-model="eventValue"
						:options="regionOptions"
						title="事件演示"
						ref="eventCascaderRef"
						@confirm="handleEventConfirm"
						@close="handleEventClose"
					/>
				</view>
				<view class="demo-cascader-events">
					<text>事件日志：{{ eventLog }}</text>
				</view>
			</demo-block>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CascaderOption } from '../../packages/m-cascader/types'

const cascaderValue = ref<string | number>('')
const lazyValue = ref<string | number[]>([])
const strictValue = ref<string | number>('')
const customValue = ref<string | number>('')
const eventValue = ref<string | number>('')
const eventLog = ref('')

const cascaderRef = ref<any>(null)
const lazyCascaderRef = ref<any>(null)
const strictCascaderRef = ref<any>(null)
const customCascaderRef = ref<any>(null)
const eventCascaderRef = ref<any>(null)

// 地区数据
const regionOptions = ref<CascaderOption[]>([
  {
    value: 'zhejiang',
    text: '浙江省',
    children: [
      {
        value: 'hangzhou',
        text: '杭州市',
        children: [
          { value: 'xihu', text: '西湖区' },
          { value: 'jianggan', text: '江干区' },
          { value: 'binjiang', text: '滨江区' }
        ]
      },
      {
        value: 'nanjing',
        text: '南京市',
        children: [
          { value: 'jianye', text: '建邺区' },
          { value: 'xuanwu', text: '玄武区' }
        ]
      },
      {
        value: 'wuxi',
        text: '无锡市',
        children: [
          { value: 'binhu', text: '滨湖区' },
          { value: 'chong\'an', text: '崇安区' }
        ]
      }
    ]
  },
  {
    value: 'guangdong',
    text: '广东省',
    children: [
      {
        value: 'guangzhou',
        text: '广州市',
        children: [
          { value: 'tianhe', text: '天河区' },
          { value: 'yuexiu', text: '越秀区' },
          { value: 'haizhu', text: '海珠区' }
        ]
      },
      {
        value: 'shenzhen',
        text: '深圳市',
        children: [
          { value: 'futian', text: '福田区' },
          { value: 'nanshan', text: '南山区' },
          { value: 'bao\'an', text: '宝安区' }
        ]
      }
    ]
  },
  {
    value: 'shanghai',
    text: '上海市',
    children: [
      {
        value: 'pudong',
        text: '浦东新区',
        children: [
          { value: 'lujiazui', text: '陆家嘴' },
          { value: 'zhangjiang', text: '张江' }
        ]
      },
      {
        value: 'jing\'an',
        text: '静安区',
        children: [
          { value: 'nanjinglu', text: '南京西路' },
          { value: 'xin\'an', text: '新闸路' }
        ]
      }
    ]
  }
])

// 自定义字段数据
const customOptions = ref([
  {
    id: '1',
    name: '一级选项一',
    items: [
      {
        id: '1-1',
        name: '二级选项一',
        items: [
          { id: '1-1-1', name: '三级选项一' },
          { id: '1-1-2', name: '三级选项二' }
        ]
      },
      { id: '1-2', name: '二级选项二' }
    ]
  },
  {
    id: '2',
    name: '一级选项二',
    items: [
      { id: '2-1', name: '二级选项三' }
    ]
  }
])

// 获取选中的标签路径
function getLabelPath(options: any[], value: string | number, valueKey: string = 'value', textKey: string = 'text', childrenKey: string = 'children'): string {
  if (!value) return ''
  
  function findPath(opts: any[], target: string | number, path: string[]): string[] | null {
    for (const item of opts) {
      if (item[valueKey] === target) {
        return [...path, item[textKey]]
      }
      if (item[childrenKey] && item[childrenKey].length > 0) {
        const result = findPath(item[childrenKey], target, [...path, item[textKey]])
        if (result) return result
      }
    }
    return null
  }
  
  const path = findPath(options, value, [])
  return path ? path.join(' / ') : ''
}

const cascaderValueLabel = computed(() => getLabelPath(regionOptions.value, cascaderValue.value))
const strictValueLabel = computed(() => getLabelPath(regionOptions.value, strictValue.value))
const customValueLabel = computed(() => getLabelPath(customOptions.value, customValue.value, 'id', 'name', 'items'))
const eventValueLabel = computed(() => getLabelPath(regionOptions.value, eventValue.value))

const lazyValueLabel = computed(() => {
  if (!lazyValue.value || (Array.isArray(lazyValue.value) && lazyValue.value.length === 0)) {
    return ''
  }
  const values = Array.isArray(lazyValue.value) ? lazyValue.value : [lazyValue.value]
  const mockLabels: Record<string, string> = {
    'root': '根节点',
    'level1-1': '一级选项A',
    'level1-2': '一级选项B',
    'level2-1': '二级选项A1',
    'level2-2': '二级选项A2',
    'level2-3': '二级选项B1',
    'level3-1': '三级选项A1-1',
    'level3-2': '三级选项A1-2'
  }
  return values.map(v => mockLabels[v as string] || v).join(' / ')
})

// 异步加载模拟
function lazyLoad(option: CascaderOption | null, tabIndex: number, resolve: (children: CascaderOption[]) => void) {
  setTimeout(() => {
    if (!option) {
      // 加载根节点
      resolve([
        { value: 'level1-1', text: '一级选项A' },
        { value: 'level1-2', text: '一级选项B' }
      ])
    } else if (option.value === 'level1-1') {
      resolve([
        { value: 'level2-1', text: '二级选项A1' },
        { value: 'level2-2', text: '二级选项A2' }
      ])
    } else if (option.value === 'level1-2') {
      resolve([
        { value: 'level2-3', text: '二级选项B1', isLeaf: true }
      ])
    } else if (option.value === 'level2-1') {
      resolve([
        { value: 'level3-1', text: '三级选项A1-1' },
        { value: 'level3-2', text: '三级选项A1-2' }
      ])
    } else if (option.value === 'level2-2') {
      resolve([])
    } else {
      resolve([])
    }
  }, 500)
}

function openCascader() {
  cascaderRef.value?.open()
}

function openLazyCascader() {
  lazyCascaderRef.value?.open()
}

function openStrictCascader() {
  strictCascaderRef.value?.open()
}

function openCustomCascader() {
  customCascaderRef.value?.open()
}

function openEventCascader() {
  eventCascaderRef.value?.open()
}

function handleCascaderConfirm(e: any) {
  uni.showToast({ title: `选中: ${e.value}`, icon: 'none' })
}

function handleLazyConfirm(e: any) {
  uni.showToast({ title: `选中: ${Array.isArray(e.value) ? e.value.join(',') : e.value}`, icon: 'none' })
}

function handleStrictConfirm(e: any) {
  uni.showToast({ title: `选中: ${e.value}`, icon: 'none' })
}

function handleCustomConfirm(e: any) {
  uni.showToast({ title: `选中: ${e.value}`, icon: 'none' })
}

function handleEventConfirm(e: any) {
  eventLog.value = `confirm: ${e.value}`
  uni.showToast({ title: '确认选择', icon: 'none' })
}

function handleEventClose() {
  eventLog.value = 'close'
}
</script>

<style lang="scss" scoped>
.m-cascader-demo {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20rpx 0;

  &__container {
    max-width: 600px;
    margin: 0 auto;
    padding: 0 20rpx;
  }
}

.demo-cascader-row {
  background: #ffffff;
  border-radius: 8rpx;
  padding: 0;
  overflow: hidden;

  :deep(.m-cell) {
    margin-bottom: 0;
    
    .m-cell__left {
      flex: 0 0 30%;
      max-width: 55%;
    }
    
    .m-cell__right {
      flex: 1;
    }
    
    .m-cell__value {
      text-align: right;
      white-space: normal;
      word-break: break-all;
    }
  }
}

.demo-cascader-events {
  margin-top: 16rpx;
  padding: 16rpx;
  background: #f0f0f0;
  border-radius: 8rpx;
  font-size: 24rpx;
  color: #666;
  word-break: break-all;
}
</style>