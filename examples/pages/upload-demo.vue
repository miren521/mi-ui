<template>
  <view class="m-upload-demo">
    <view class="m-upload-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="选择图片后直接回显，不发送上传请求">
        <view class="demo-upload-row">
          <m-upload
            :file-list="fileList1"
            @update:file-list="fileList1 = $event"
          />
        </view>
      </demo-block>

      <!-- 图片回显 -->
      <demo-block title="图片回显" desc="模拟从服务端获取的数据进行回显展示">
        <view class="demo-upload-row">
          <m-upload
            :file-list="fileList2"
            :limit="6"
            @update:file-list="fileList2 = $event"
          />
        </view>
        <view class="demo-hint">
          <text class="demo-hint__label">服务端返回的数据格式：</text>
          <view class="demo-hint__code">
{ uid: 1, url: '/static/img/img_1.jpg', status: 'success', name: '图片.jpg' }
          </view>
        </view>
      </demo-block>

      <!-- 限制数量 -->
      <demo-block title="限制数量" desc="使用 limit 属性限制上传数量">
        <view class="demo-upload-row">
          <m-upload
            :file-list="fileList3"
            :limit="3"
            @update:file-list="fileList3 = $event"
          />
        </view>
      </demo-block>

      <!-- 多选上传 -->
      <demo-block title="多选上传" desc="使用 multiple 属性开启多选功能">
        <view class="demo-upload-row">
          <m-upload
            :file-list="fileList4"
            :multiple="true"
            :limit="5"
            @update:file-list="fileList4 = $event"
          />
        </view>
      </demo-block>

      <!-- 禁用状态 -->
      <demo-block title="禁用状态" desc="使用 disabled 属性禁用上传功能">
        <view class="demo-upload-row">
          <m-upload
            :file-list="fileList5"
            :disabled="true"
            @update:file-list="fileList5 = $event"
          />
        </view>
      </demo-block>

      <!-- 自定义上传按钮 -->
      <demo-block title="自定义按钮" desc="使用默认插槽自定义上传按钮样式">
        <view class="demo-upload-row">
          <m-upload
            :file-list="fileList6"
            @update:file-list="fileList6 = $event"
          >
            <view class="custom-upload-btn">
              <m-icon name="plus" size="24px" />
              <text class="custom-upload-text">添加图片</text>
            </view>
          </m-upload>
        </view>
      </demo-block>

      <!-- 预览覆盖层 -->
      <demo-block title="预览覆盖层" desc="使用 preview-cover 插槽自定义预览覆盖内容">
        <view class="demo-upload-row">
          <m-upload
            :file-list="fileList7"
            @update:file-list="fileList7 = $event"
          >
            <template #preview-cover="{ file, index }">
              <view class="preview-cover">
                <m-icon name="eye" size="16px" />
                <text class="preview-index">{{ index + 1 }}</text>
              </view>
            </template>
          </m-upload>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileItem } from '../../packages/m-upload/types'

// 文件列表 - 基础用法
const fileList1 = ref<UploadFileItem[]>([])

// 文件列表 - 回显演示（模拟从服务端获取的数据）
const fileList2 = ref<UploadFileItem[]>([
  { uid: 1, url: '/static/img/img_1.jpg', status: 'success', name: '图片1.jpg' },
  { uid: 2, url: '/static/img/img_1.jpg', status: 'success', name: '图片2.jpg' },
  { uid: 3, url: '/static/img/img_1.jpg', status: 'success', name: '图片3.jpg' }
])

// 文件列表 - 限制数量
const fileList3 = ref<UploadFileItem[]>([])

// 文件列表 - 多选上传
const fileList4 = ref<UploadFileItem[]>([])

// 文件列表 - 禁用状态（带回显）
const fileList5 = ref<UploadFileItem[]>([
  { uid: 1, url: '/static/img/img_1.jpg', status: 'success', name: '已上传图片.jpg' }
])

// 文件列表 - 自定义按钮
const fileList6 = ref<UploadFileItem[]>([])

// 文件列表 - 预览覆盖层
const fileList7 = ref<UploadFileItem[]>([])
</script>

<style lang="scss" scoped>
.m-upload-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}

.demo-upload-row {
  display: flex;
  flex-wrap: wrap;
}

.demo-hint {
  margin-top: 16px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 13px;

  &__label {
    color: #666;
    margin-bottom: 8px;
    display: block;
  }

  &__code {
    font-family: monospace;
    font-size: 12px;
    color: #333;
    background: #fff;
    padding: 8px;
    border-radius: 4px;
    word-break: break-all;
  }
}

.custom-upload-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 88px;
  border-radius: 8px;
  border: 1px dashed #d9d9d9;
  background-color: #fafafa;
  color: #999;

  .custom-upload-text {
    font-size: 12px;
    margin-top: 4px;
  }
}

.preview-cover {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  color: #fff;

  .preview-index {
    font-size: 12px;
  }
}
</style>
