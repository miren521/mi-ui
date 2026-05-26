<template>
  <view class="m-upload-demo">
    <view class="m-upload-demo__container">
      <!-- 基础用法 -->
      <demo-block title="基础用法" desc="选择图片后自动模拟上传成功，直接回显">
        <view class="demo-upload-row">
          <m-upload
            :file-list="fileList1"
            :upload-method="customUploadMethod"
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
            :upload-method="customUploadMethod"
            @update:file-list="fileList2 = $event"
          />
        </view>
      </demo-block>

      <!-- 限制数量 -->
      <demo-block title="限制数量" desc="使用 limit 属性限制上传数量">
        <view class="demo-upload-row">
          <m-upload
            :file-list="fileList3"
            :limit="3"
            :upload-method="customUploadMethod"
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
            :upload-method="customUploadMethod"
            @update:file-list="fileList4 = $event"
          />
        </view>
      </demo-block>

      <!-- 文件过滤 -->
      <demo-block title="文件过滤" desc="使用 before-choose 钩子过滤选择的文件">
        <view class="demo-upload-row">
          <m-upload
            :file-list="fileListFilter"
            :before-choose="filterFiles"
            :upload-method="customUploadMethod"
            @update:file-list="fileListFilter = $event"
          />
        </view>
        <view class="demo-hint">
          <text class="demo-hint__label">过滤规则：只允许选择小于 1MB 的图片</text>
        </view>
      </demo-block>

      <!-- 自定义上传类型 -->
      <demo-block title="自定义上传类型" desc="使用 accept 属性指定可上传的文件类型">
        <view class="demo-upload-row">
          <view class="demo-upload-item">
            <text class="demo-upload-label">仅图片</text>
            <m-upload :file-list="fileListImage" accept="image" :upload-method="customUploadMethod" @update:file-list="fileListImage = $event" />
          </view>
          <view class="demo-upload-item">
            <text class="demo-upload-label">仅视频</text>
            <m-upload :file-list="fileListVideo" accept="video" :upload-method="customUploadMethod" @update:file-list="fileListVideo = $event" />
          </view>
          <view class="demo-upload-item">
            <text class="demo-upload-label">图片/视频</text>
            <m-upload :file-list="fileListMixed" accept="media" :upload-method="customUploadMethod" @update:file-list="fileListMixed = $event" />
          </view>
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
            :upload-method="customUploadMethod"
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
            :upload-method="customUploadMethod"
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

      <!-- 显示上传数量 -->
      <demo-block title="显示上传数量" desc="使用 show-limit-num 控制显示已上传数量">
        <view class="demo-upload-row">
          <m-upload
            :file-list="fileList8"
            :limit="4"
            :show-limit-num="true"
            :upload-method="customUploadMethod"
            @update:file-list="fileList8 = $event"
          />
        </view>
      </demo-block>

      <!-- 上传失败演示 -->
      <demo-block title="上传失败" desc="模拟上传失败场景，展示错误提示和重新上传">
        <view class="demo-upload-row">
          <m-upload
            :file-list="fileListFail"
            :upload-method="failUploadMethod"
            @update:file-list="fileListFail = $event"
            @fail="handleFail"
          />
        </view>
      </demo-block>

      <!-- 事件监听 -->
      <demo-block title="事件监听" desc="监听上传相关事件，展示事件触发信息">
        <view class="demo-upload-row">
          <m-upload
            :file-list="fileListEvent"
            :limit="3"
            :upload-method="customUploadMethod"
            @update:file-list="fileListEvent = $event"
            @change="handleChange"
            @success="handleSuccess"
            @fail="handleFail"
            @progress="handleProgress"
            @remove="handleRemove"
          />
        </view>
        <view class="event-log" v-if="eventLogs.length > 0">
          <text class="event-log__title">事件日志：</text>
          <view class="event-log__list">
            <view class="event-log__item" v-for="(log, index) in eventLogs" :key="index">
              <text class="event-log__type" :class="'event-log__type--' + log.type">{{ log.type }}</text>
              <text class="event-log__msg">{{ log.message }}</text>
            </view>
          </view>
        </view>
      </demo-block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFileItem, UploadMethod } from '../../packages/m-upload/types'

// 本地图片地址列表
const localImages = [
  '/static/img/img_1.jpg',
  '/static/img/img_2.jpg',
  '/static/img/img_3.jpg',
  '/static/img/img_4.jpg',
  '/static/img/img_5.jpg',
  '/static/img/img_6.jpg'
]

let imageIndex = 0

// 自定义上传方法 - 模拟上传成功
const customUploadMethod: UploadMethod = (file, formData, options) => {
  console.log('customUploadMethod called:', { fileName: file.name, options })
  // 模拟上传进度
  let progress = 0
  const progressInterval = setInterval(() => {
    progress = Math.min(Math.floor(progress + Math.random() * 20), 100)
    console.log('upload progress:', progress)
    if (progress >= 100) {
      clearInterval(progressInterval)
      // 模拟上传成功
      setTimeout(() => {
        const url = localImages[imageIndex % localImages.length]
        imageIndex++
        console.log('upload success, url:', url)
        options.onSuccess({
          statusCode: 200,
          data: JSON.stringify({ url }),
          errMsg: 'uploadFile:ok'
        }, file, formData)
      }, 200)
    }
    options.onProgress({ progress, totalBytesSent: progress, totalBytesExpectedToSend: 100 }, file)
  }, 100)

  // 返回一个模拟的任务对象
  return {
    abort: () => {
      clearInterval(progressInterval)
    }
  } as UniApp.UploadTask
}

// 自定义上传方法 - 模拟上传失败
const failUploadMethod: UploadMethod = (file, formData, options) => {
  // 模拟上传进度
  let progress = 0
  const progressInterval = setInterval(() => {
    progress = Math.min(Math.floor(progress + Math.random() * 20), 80)
    if (progress >= 80) {
      clearInterval(progressInterval)
      // 模拟上传失败
      setTimeout(() => {
        options.onError({ errMsg: '网络超时，请重试' }, file, formData)
      }, 300)
    }
    options.onProgress({ progress, totalBytesSent: progress, totalBytesExpectedToSend: 100 }, file)
  }, 100)

  return {
    abort: () => {
      clearInterval(progressInterval)
    }
  } as UniApp.UploadTask
}

// 文件过滤：当已选择3个文件时禁止继续选择
function filterFiles(event: { fileList: UploadFileItem[] }): boolean {
  if (event.fileList.length >= 3) {
    uni.showToast({
      title: '最多选择3个文件',
      icon: 'none'
    })
    return false
  }
  return true
}



// 文件列表 - 基础用法
const fileList1 = ref<UploadFileItem[]>([])

// 文件列表 - 回显演示
const fileList2 = ref<UploadFileItem[]>([
  { uid: 1, url: '/static/img/img_1.jpg', status: 'success', name: '图片1.jpg' },
  { uid: 2, url: '/static/img/img_2.jpg', status: 'success', name: '图片2.jpg' },
  { uid: 3, url: '/static/img/img_3.jpg', status: 'success', name: '图片3.jpg' }
])

// 文件列表 - 限制数量
const fileList3 = ref<UploadFileItem[]>([])

// 文件列表 - 多选上传
const fileList4 = ref<UploadFileItem[]>([])

// 文件列表 - 文件过滤
const fileListFilter = ref<UploadFileItem[]>([])

// 文件列表 - 仅图片
const fileListImage = ref<UploadFileItem[]>([])

// 文件列表 - 仅视频
const fileListVideo = ref<UploadFileItem[]>([])

// 文件列表 - 图片/视频混合
const fileListMixed = ref<UploadFileItem[]>([])

// 文件列表 - 禁用状态
const fileList5 = ref<UploadFileItem[]>([
  { uid: 1, url: '/static/img/img_1.jpg', status: 'success', name: '已上传图片.jpg' }
])

// 文件列表 - 自定义按钮
const fileList6 = ref<UploadFileItem[]>([])

// 文件列表 - 预览覆盖层
const fileList7 = ref<UploadFileItem[]>([])

// 文件列表 - 显示数量
const fileList8 = ref<UploadFileItem[]>([])

// 文件列表 - 上传失败演示
const fileListFail = ref<UploadFileItem[]>([])

// 文件列表 - 事件监听
const fileListEvent = ref<UploadFileItem[]>([])

// 事件日志
interface EventLog {
  type: string
  message: string
}
const eventLogs = ref<EventLog[]>([])
// 添加日志
function addLog(type: string, message: string) {
  eventLogs.value.unshift({ type, message })
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop()
  }
}

// 处理变更
function handleChange(e: { fileList: UploadFileItem[] }) {
  addLog('change', `文件列表变更，当前数量: ${e.fileList.length}`)
}

// 处理成功
function handleSuccess(e: { file: UploadFileItem; fileList: UploadFileItem[] }) {
  addLog('success', `文件上传成功: ${e.file.name || 'unknown'}`)
}

// 处理失败
function handleFail(e: { error: any; file: UploadFileItem }) {
  addLog('fail', `文件上传失败: ${e.error.message || e.error.errMsg || 'unknown'}`)
}

// 处理进度
function handleProgress(e: { response: UniApp.OnProgressUpdateResult; file: UploadFileItem }) {
  addLog('progress', `上传进度: ${e.response.progress}%`)
}

// 处理移除
function handleRemove(e: { file: UploadFileItem }) {
  addLog('remove', `文件已移除: ${e.file.name || 'unknown'}`)
}
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

.demo-upload-item {
  flex: 1;
  min-width: 200px;
  margin-right: 20px;
  margin-bottom: 16px;

  &:last-child {
    margin-right: 0;
  }
}

.demo-upload-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.demo-btn-group {
  margin-top: 16px;
  display: flex;
  gap: 12px;
}

.demo-hint {
  margin-top: 16px;
  padding: 12px;
  background: #fffbe6;
  border-radius: 8px;
  font-size: 13px;

  &__label {
    color: #d48806;
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

.event-log {
  margin-top: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #f0f0f0;

  &__title {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 12px;
    display: block;
  }

  &__list {
    max-height: 200px;
    overflow-y: auto;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #f5f5f5;
    font-size: 13px;

    &:last-child {
      border-bottom: none;
    }
  }

  &__type {
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    margin-right: 12px;

    &--change {
      background: #e6f7ff;
      color: #1890ff;
    }

    &--success {
      background: #f6ffed;
      color: #52c41a;
    }

    &--fail {
      background: #fff2f0;
      color: #f5222d;
    }

    &--progress {
      background: #fffbe6;
      color: #faad14;
    }

    &--remove {
      background: #f5f5f5;
      color: #666;
    }
  }

  &__msg {
    flex: 1;
    color: #666;
  }
}
</style>
