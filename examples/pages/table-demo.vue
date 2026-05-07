<template>
  <view class="page">
    <view class="page-content">
      <demo-block title="基础用法" desc="最简单的表格用法">
        <view class="demo-table-row">
          <m-table :data="basicData">
            <m-table-column prop="name" label="姓名" width="120" />
            <m-table-column prop="age" label="年龄" width="100" />
            <m-table-column prop="address" label="地址" width="200" />
          </m-table>
        </view>
      </demo-block>

      <demo-block title="斑马纹" desc="stripe 属性控制斑马纹显示">
        <view class="demo-table-row">
          <m-table :data="basicData" :stripe="showStripe">
            <m-table-column prop="name" label="姓名" width="120" />
            <m-table-column prop="age" label="年龄" width="100" />
            <m-table-column prop="address" label="地址" width="200" />
          </m-table>
        </view>
        <view class="demo-table-switch">
          <switch :checked="showStripe" @change="(e: { detail: { value: boolean } }) => showStripe = e.detail.value" />
          <text>{{ showStripe ? '已开启斑马纹' : '已关闭斑马纹' }}</text>
        </view>
      </demo-block>

      <demo-block title="边框控制" desc="border 属性控制边框显示">
        <view class="demo-table-row">
          <m-table :data="basicData" :border="showBorder">
            <m-table-column prop="name" label="姓名" width="120" />
            <m-table-column prop="age" label="年龄" width="100" />
            <m-table-column prop="address" label="地址" width="200" />
          </m-table>
        </view>
        <view class="demo-table-switch">
          <switch :checked="showBorder" @change="(e: { detail: { value: boolean } }) => showBorder = e.detail.value" />
          <text>{{ showBorder ? '已显示边框' : '已隐藏边框' }}</text>
        </view>
      </demo-block>

      <demo-block title="索引列" desc="index 属性显示索引列">
        <view class="demo-table-row">
          <m-table :data="basicData" :index="showIndex">
            <m-table-column prop="name" label="姓名" width="120" />
            <m-table-column prop="age" label="年龄" width="100" />
            <m-table-column prop="address" label="地址" width="200" />
          </m-table>
        </view>
        <view class="demo-table-switch">
          <switch :checked="showIndex" @change="(e: { detail: { value: boolean } }) => showIndex = e.detail.value" />
          <text>{{ showIndex ? '已显示索引列' : '已隐藏索引列' }}</text>
        </view>
      </demo-block>

      <demo-block title="固定表头" desc="fixed-header 属性固定表头，配合 height 使用">
        <view class="demo-table-row">
          <m-table :data="largeData" :height="300" :fixed-header="true">
            <m-table-column prop="name" label="姓名" width="120" />
            <m-table-column prop="age" label="年龄" width="100" />
            <m-table-column prop="address" label="地址" width="200" />
            <m-table-column prop="phone" label="电话" width="150" />
          </m-table>
        </view>
      </demo-block>

      <demo-block title="固定列" desc="fixed 属性固定指定列">
        <view class="demo-table-row">
          <m-table :data="largeData" :height="300">
            <m-table-column prop="name" label="姓名" width="120" :fixed="true" />
            <m-table-column prop="age" label="年龄" width="100" />
            <m-table-column prop="address" label="地址" width="250" />
            <m-table-column prop="phone" label="电话" width="150" />
            <m-table-column prop="email" label="邮箱" width="200" />
            <m-table-column prop="company" label="公司" width="150" />
          </m-table>
        </view>
      </demo-block>

      <demo-block title="排序功能" desc="sortable 属性开启列排序，点击表头自动排序数据">
        <view class="demo-table-row">
          <m-table :data="sortedBasicData" @sort-method="handleSort">
            <m-table-column prop="name" label="姓名" width="120" :sortable="true" />
            <m-table-column prop="age" label="年龄" width="100" :sortable="true" />
            <m-table-column prop="address" label="地址" width="200" />
          </m-table>
        </view>
        <view class="demo-table-events">
          <text>排序字段：{{ sortField || '无' }}</text>
          <text>排序方向：{{ sortDirection === 1 ? '升序' : sortDirection === -1 ? '降序' : '无' }}</text>
        </view>
      </demo-block>

      <demo-block title="自定义内容" desc="使用 slot 自定义单元格内容">
        <view class="demo-table-row">
          <m-table :data="customData">
            <m-table-column prop="name" label="姓名" width="120" />
            <m-table-column prop="status" label="状态" width="120">
              <template #value="{ row }">
                <view :class="['demo-table-status', `demo-table-status--${row.status}`]">
                  {{ row.status === 'active' ? '活跃' : row.status === 'disabled' ? '禁用' : '待定' }}
                </view>
              </template>
            </m-table-column>
            <m-table-column prop="action" label="操作" width="150">
              <template #value="{ row }">
                <view class="demo-table-actions">
                  <m-button size="small" type="primary" @click="handleEdit(row)">编辑</m-button>
                  <m-button size="small" type="danger" @click="handleDelete(row)">删除</m-button>
                </view>
              </template>
            </m-table-column>
          </m-table>
        </view>
      </demo-block>

      <demo-block title="合并单元格" desc="使用 span-method 合并指定单元格">
        <view class="demo-table-row">
          <m-table :data="spanData" :span-method="spanMethod">
            <m-table-column prop="department" label="部门" width="120" />
            <m-table-column prop="name" label="姓名" width="120" />
            <m-table-column prop="role" label="角色" width="120" />
            <m-table-column prop="salary" label="薪资" width="120" />
          </m-table>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TableColumn } from '../../packages/m-table-column/types'

const basicData = ref([
  { name: '张三', age: 25, address: '北京市朝阳区' },
  { name: '李四', age: 30, address: '上海市浦东新区' },
  { name: '王五', age: 28, address: '广州市天河区' },
  { name: '赵六', age: 35, address: '深圳市南山区' }
])

// 排序后的数据（用于展示排序效果）
const sortedBasicData = ref([...basicData.value])

const largeData = ref(Array.from({ length: 20 }, (_, i) => ({
  name: `用户${i + 1}`,
  age: 20 + Math.floor(Math.random() * 20),
  address: `地址${i + 1}`,
  phone: `1380013800${i}`,
  email: `user${i}@example.com`,
  company: `公司${i + 1}`
})))

const customData = ref([
  { name: '张三', status: 'active' },
  { name: '李四', status: 'disabled' },
  { name: '王五', status: 'pending' },
  { name: '赵六', status: 'active' }
])

const spanData = ref([
  { department: '技术部', name: '张三', role: '前端工程师', salary: '15k' },
  { department: '技术部', name: '李四', role: '后端工程师', salary: '16k' },
  { department: '技术部', name: '王五', role: '测试工程师', salary: '12k' },
  { department: '产品部', name: '赵六', role: '产品经理', salary: '18k' },
  { department: '产品部', name: '钱七', role: 'UI设计师', salary: '14k' },
  { department: '运营部', name: '孙八', role: '运营专员', salary: '10k' }
])

const showStripe = ref(true)
const showBorder = ref(true)
const showIndex = ref(true)
const sortField = ref<string | null>(null)
const sortDirection = ref<number>(0)

function handleSort(column: TableColumn) {
  sortField.value = column.prop
  sortDirection.value = column.sortDirection || 0
  
  // 手动排序数据以展示效果
  if (column.prop && column.sortDirection) {
    const data = [...basicData.value]
    data.sort((a, b) => {
      const valA = a[column.prop!]
      const valB = b[column.prop!]
      
      if (typeof valA === 'number' && typeof valB === 'number') {
        return column.sortDirection * (valA - valB)
      }
      
      const strA = String(valA).toLowerCase()
      const strB = String(valB).toLowerCase()
      
      if (strA < strB) return -column.sortDirection
      if (strA > strB) return column.sortDirection
      return 0
    })
    sortedBasicData.value = data
  } else {
    // 重置排序
    sortedBasicData.value = [...basicData.value]
  }
}

function handleEdit(row: any) {
  uni.showToast({ title: `编辑 ${row.name}`, icon: 'none' })
}

function handleDelete(row: any) {
  uni.showToast({ title: `删除 ${row.name}`, icon: 'none' })
}

function spanMethod({ row, column, rowIndex, columnIndex }: {
  row: Record<string, any>
  column: { prop: string; label: string }
  rowIndex: number
  columnIndex: number
}) {
  if (columnIndex === 0) {
    const sameDepartment = spanData.value.filter((item) => item.department === row.department)
    if (sameDepartment.length > 1) {
      const firstIndex = spanData.value.findIndex((item) => item.department === row.department)
      if (rowIndex === firstIndex) {
        return { rowspan: sameDepartment.length, colspan: 1 }
      } else {
        return { rowspan: 0, colspan: 0 }
      }
    }
  }
  return { rowspan: 1, colspan: 1 }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 32rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-content {
  padding-bottom: 40rpx;
}

.demo-table-row {
  margin-bottom: 20rpx;
}

.demo-table-switch {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  font-size: 26rpx;
  color: #1e293b;
}

.demo-table-events {
  padding: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  margin-top: 20rpx;

  text {
    display: block;
    font-size: 26rpx;
    color: #64748b;
    margin-bottom: 8rpx;
  }
}

.demo-table-status {
  display: inline-flex;
  padding: 8rpx 16rpx;
  border-radius: 10rpx;
  font-size: 24rpx;

  &--active {
    background: #dcfce7;
    color: #16a34a;
  }

  &--disabled {
    background: #fef2f2;
    color: #dc2626;
  }

  &--pending {
    background: #fefce8;
    color: #ca8a04;
  }
}

.demo-table-actions {
  display: flex;
  gap: 12rpx;
}
</style>