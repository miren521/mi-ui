<template>
  <view class="m-sort-button-demo">
    <view class="m-sort-button-demo__container">
      <!-- 基础用法 -->
      <view class="demo-sort-group">
        <view class="demo-header">
          <text class="demo-title">基础用法</text>
          <text class="demo-desc">点击按钮切换排序方向</text>
        </view>
        <view class="demo-content">
          <view class="sort-row">
            <m-sort-button title="默认排序" v-model="sortValue1" />
            <m-sort-button title="价格" v-model="sortValue2" />
            <m-sort-button title="销量" v-model="sortValue3" />
          </view>
          <view class="current-value">
            <text>当前排序值：</text>
            <text class="value-item">默认: {{ sortValue1 }}</text>
            <text class="value-item">价格: {{ sortValue2 }}</text>
            <text class="value-item">销量: {{ sortValue3 }}</text>
          </view>
        </view>
      </view>

      <!-- 允许重置 -->
      <view class="demo-sort-group">
        <view class="demo-header">
          <text class="demo-title">允许重置</text>
          <text class="demo-desc">开启 allowReset 后，可循环切换回初始状态</text>
        </view>
        <view class="demo-content">
          <view class="sort-row">
            <m-sort-button title="默认排序" v-model="sortValue4" />
            <m-sort-button title="价格" v-model="sortValue5" :allow-reset="true" />
          </view>
          <view class="current-value">
            <text>无重置: {{ sortValue4 }}</text>
            <text class="value-item">允许重置: {{ sortValue5 }}</text>
          </view>
        </view>
      </view>

      <!-- 优先降序 -->
      <view class="demo-sort-group">
        <view class="demo-header">
          <text class="demo-title">优先降序</text>
          <text class="demo-desc">开启 descFirst 后，首次点击切换为降序</text>
        </view>
        <view class="demo-content">
          <view class="sort-row">
            <m-sort-button title="默认升序" v-model="sortValue6" />
            <m-sort-button title="优先降序" v-model="sortValue7" desc-first />
          </view>
          <view class="current-value">
            <text>默认升序: {{ sortValue6 }}</text>
            <text class="value-item">优先降序: {{ sortValue7 }}</text>
          </view>
        </view>
      </view>

      <!-- 下划线样式 -->
      <view class="demo-sort-group">
        <view class="demo-header">
          <text class="demo-title">下划线样式</text>
          <text class="demo-desc">开启 line 显示下划线，适用于单列排序场景</text>
        </view>
        <view class="demo-content">
          <view class="sort-row">
            <m-sort-button title="无下划线" v-model="sortValue8" />
            <m-sort-button title="有下划线" v-model="sortValue9" line />
          </view>
        </view>
      </view>

      <!-- 列表排序场景 -->
      <view class="demo-sort-group">
        <view class="demo-header">
          <text class="demo-title">列表排序场景</text>
          <text class="demo-desc">配合列表数据使用，实现排序功能</text>
        </view>
        <view class="demo-content">
          <view class="list-header">
            <m-sort-button title="商品名称" v-model="listSort" @change="handleListSort" />
            <m-sort-button title="价格" v-model="priceSort" @change="handlePriceSort" />
            <m-sort-button title="销量" v-model="salesSort" @change="handleSalesSort" />
          </view>
          <view class="list-content">
            <view class="list-item" v-for="item in sortedList" :key="item.id">
              <view class="item-info">
                <text class="item-name">{{ item.name }}</text>
                <text class="item-desc">{{ item.desc }}</text>
              </view>
              <view class="item-price">¥{{ item.price }}</view>
              <view class="item-sales">{{ item.sales }}人购买</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 监听 change 事件 -->
      <view class="demo-sort-group">
        <view class="demo-header">
          <text class="demo-title">监听事件</text>
          <text class="demo-desc">监听 change 事件获取排序变化</text>
        </view>
        <view class="demo-content">
          <m-sort-button title="点击查看日志" v-model="eventSort" @change="handleChange" />
          <view class="event-log" v-if="eventLog">
            <text>事件日志: {{ eventLog }}</text>
          </view>
        </view>
      </view>

      <!-- 组合使用 -->
      <view class="demo-sort-group">
        <view class="demo-header">
          <text class="demo-title">组合使用</text>
          <text class="demo-desc">同时开启多个属性</text>
        </view>
        <view class="demo-content">
          <view class="sort-row">
            <m-sort-button 
              title="综合排序" 
              v-model="combineSort" 
              :allow-reset="true" 
              desc-first 
              line 
            />
          </view>
          <view class="current-value">
            <text>当前值: {{ combineSort }}</text>
            <text class="value-item">(允许重置 + 优先降序 + 下划线)</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      sortValue1: 0,
      sortValue2: 0,
      sortValue3: 0,
      sortValue4: 0,
      sortValue5: 0,
      sortValue6: 0,
      sortValue7: 0,
      sortValue8: 0,
      sortValue9: 0,
      listSort: 0,
      priceSort: 0,
      salesSort: 0,
      eventSort: 0,
      eventLog: '',
      combineSort: 0,
      originalList: [
        { id: 1, name: '智能蓝牙耳机', desc: '主动降噪，长续航', price: 299, sales: 12580 },
        { id: 2, name: '无线充电手机壳', desc: '轻薄便携，支持快充', price: 199, sales: 8920 },
        { id: 3, name: '机械键盘', desc: 'RGB背光，青轴手感', price: 459, sales: 5670 },
        { id: 4, name: '电竞鼠标', desc: '高DPI，可编程按键', price: 329, sales: 7890 }
      ]
    }
  },
  computed: {
    sortedList() {
      const list = [...this.originalList]
      if (this.priceSort !== 0) {
        return list.sort((a, b) => this.priceSort === 1 ? a.price - b.price : b.price - a.price)
      }
      if (this.salesSort !== 0) {
        return list.sort((a, b) => this.salesSort === 1 ? a.sales - b.sales : b.sales - a.sales)
      }
      if (this.listSort !== 0) {
        return list.sort((a, b) => this.listSort === 1 ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
      }
      return list
    }
  },
  methods: {
    handleListSort(e) {
      this.priceSort = 0
      this.salesSort = 0
      uni.showToast({
        title: `按名称排序: ${e.value === 1 ? '升序' : e.value === -1 ? '降序' : '重置'}`,
        icon: 'none'
      })
    },
    handlePriceSort(e) {
      this.listSort = 0
      this.salesSort = 0
      uni.showToast({
        title: `按价格排序: ${e.value === 1 ? '升序' : e.value === -1 ? '降序' : '重置'}`,
        icon: 'none'
      })
    },
    handleSalesSort(e) {
      this.listSort = 0
      this.priceSort = 0
      uni.showToast({
        title: `按销量排序: ${e.value === 1 ? '升序' : e.value === -1 ? '降序' : '重置'}`,
        icon: 'none'
      })
    },
    handleChange(e) {
      const direction = e.value === 1 ? '升序' : e.value === -1 ? '降序' : '重置'
      this.eventLog = `value: ${e.value} (${direction})`
      setTimeout(() => {
        this.eventLog = ''
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
.m-sort-button-demo {
  min-height: 100vh;
  background-color: #f5f6fa;
  padding: 20rpx 0;

  &__container {
    max-width: 1200rpx;
    margin: 0 auto;
    padding: 0 32rpx;
  }
}

.demo-sort-group {
  background-color: #fff;
  overflow: hidden;
  border-radius: 20rpx;
  margin: 10rpx 0 32rpx 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.demo-header {
  padding: 24rpx 32rpx;
  border-bottom: 1rpx solid #f0f0f0;

  .demo-title {
    display: block;
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 8rpx;
  }

  .demo-desc {
    font-size: 24rpx;
    color: #999;
  }
}

.demo-content {
  padding: 24rpx 32rpx;

  .sort-row {
    display: flex;
    gap: 24rpx;
    flex-wrap: wrap;
  }

  .current-value {
    margin-top: 24rpx;
    padding-top: 24rpx;
    border-top: 1rpx dashed #eee;
    font-size: 26rpx;
    color: #666;

    .value-item {
      margin-left: 16rpx;
      color: #4d80f0;
    }
  }

  .list-header {
    display: flex;
    gap: 24rpx;
    padding-bottom: 24rpx;
    border-bottom: 1rpx solid #f0f0f0;
  }

  .list-content {
    margin-top: 16rpx;

    .list-item {
      display: flex;
      align-items: center;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #f5f5f5;

      &:last-child {
        border-bottom: none;
      }

      .item-info {
        flex: 1;

        .item-name {
          display: block;
          font-size: 28rpx;
          font-weight: 500;
          color: #333;
        }

        .item-desc {
          font-size: 24rpx;
          color: #999;
        }
      }

      .item-price {
        font-size: 28rpx;
        font-weight: 600;
        color: #fa4350;
        margin-right: 32rpx;
      }

      .item-sales {
        font-size: 24rpx;
        color: #999;
      }
    }
  }

  .event-log {
    margin-top: 24rpx;
    padding: 16rpx;
    background-color: #f8f9fa;
    border-radius: 8rpx;
    font-size: 24rpx;
    color: #4d80f0;
  }
}
</style>