<template>
  <view :class="['m-upload', customClass]" :style="customStyle">
    <view :class="['m-upload__preview', customPreviewClass]" v-for="(file, index) in uploadFiles" :key="index">
      <view class="m-upload__status-content">
        <image v-if="isImage(file)" :src="file.url" :mode="imageMode" class="m-upload__picture" @click="onPreviewImage(file)" />
        <template v-else-if="isVideo(file)">
          <view class="m-upload__video" v-if="file.thumb" @click="onPreviewVideo(file)">
            <image :src="file.thumb" :mode="imageMode" class="m-upload__picture" />
            <m-icon name="play-circle-fill" custom-class="m-upload__video-play"></m-icon>
          </view>
          <view v-else class="m-upload__video" @click="onPreviewVideo(file)">
            <!-- #ifdef APP-PLUS || MP-DINGTALK -->
            <m-icon custom-class="m-upload__video-icon" name="video-camera"></m-icon>
            <!-- #endif -->
            <!-- #ifndef APP-PLUS -->
            <!-- #ifndef MP-DINGTALK -->
            <video
              :src="file.url"
              :title="file.name || '视频' + index"
              object-fit="contain"
              :controls="false"
              :poster="file.thumb"
              :autoplay="false"
              :show-center-play-btn="false"
              :show-fullscreen-btn="false"
              :show-play-btn="false"
              :show-loading="false"
              :show-progress="false"
              :show-mute-btn="false"
              :enable-progress-gesture="false"
              :enableNative="true"
              class="m-upload__video"
            ></video>
            <m-icon name="play-circle-fill" custom-class="m-upload__video-play"></m-icon>
            <!-- #endif -->
            <!-- #endif -->
          </view>
        </template>

        <view v-else class="m-upload__file" @click="onPreviewFile(file)">
          <m-icon name="file" custom-class="m-upload__file-icon"></m-icon>
          <view class="m-upload__file-name">{{ file.name || file.url }}</view>
        </view>
      </view>

      <view v-if="file[props.statusKey] !== 'success'" class="m-upload__mask">
        <view v-if="file[props.statusKey] === 'loading'" class="m-upload__status-content">
          <m-loading :type="loadingType" :size="loadingSize" :color="loadingColor" />
          <text class="m-upload__progress-txt">{{ file.percent }}%</text>
        </view>
        <view v-if="file[props.statusKey] === 'fail'" class="m-upload__status-content">
          <m-icon name="close-circle" custom-class="m-upload__icon"></m-icon>
          <text class="m-upload__progress-txt">{{ file.error || '上传失败' }}</text>
        </view>
      </view>
      <view class="m-upload__close" v-if="file[props.statusKey] !== 'loading' && !disabled" @click="removeFile(index)">
        <m-icon name="close" custom-class="m-upload__close-icon"></m-icon>
      </view>
      <slot name="preview-cover" v-if="$slots['preview-cover']" :file="file" :index="index"></slot>
    </view>

    <block v-if="showUpload">
      <view :class="['m-upload__evoke-slot', customEvokeClass]" v-if="$slots.default" @click="onEvokeClick">
        <slot></slot>
      </view>
      <view v-else @click="onEvokeClick" :class="['m-upload__evoke', disabled ? 'is-disabled' : '', customEvokeClass]">
        <m-icon custom-class="m-upload__evoke-icon" name="camera-fill"></m-icon>
        <view v-if="limit && showLimitNum" class="m-upload__evoke-num">（{{ uploadFiles.length }}/{{ limit }}）</view>
      </view>
    </block>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-upload',
  options: {
    addGlobalClass: true,
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import mIcon from '../m-icon/m-icon.vue'
import mLoading from '../m-loading/m-loading.vue'

import { computed, ref, watch } from 'vue'
import { context, isEqual, isImageUrl, isVideoUrl, isFunction, isDef, deepClone, uuid } from '../common/util'
import { callInterceptor } from '../common/interceptor'
import { useUpload } from '../composables/useUpload'
import {
  uploadProps,
  type UploadFileItem,
  type ChooseFile,
  type UploadExpose,
  type UploadErrorEvent,
  type UploadChangeEvent,
  type UploadSuccessEvent,
  type UploadProgressEvent,
  type UploadOversizeEvent,
  type UploadRemoveEvent
} from './types'

const props = defineProps(uploadProps)

const emit = defineEmits<{
  (e: 'fail', value: UploadErrorEvent): void
  (e: 'change', value: UploadChangeEvent): void
  (e: 'success', value: UploadSuccessEvent): void
  (e: 'progress', value: UploadProgressEvent): void
  (e: 'oversize', value: UploadOversizeEvent): void
  (e: 'chooseerror', value: any): void
  (e: 'remove', value: UploadRemoveEvent): void
  (e: 'update:fileList', value: UploadFileItem[]): void
}>()

defineExpose<UploadExpose>({
  submit: () => startUploadFiles(),
  abort: () => abort()
})

const uploadFiles = ref<UploadFileItem[]>([])

const showUpload = computed(() => !props.limit || uploadFiles.value.length < props.limit)

const { startUpload, abort, chooseFile, UPLOAD_STATUS } = useUpload()

watch(
  () => props.fileList,
  (val) => {
    const { statusKey } = props
    if (isEqual(val, uploadFiles.value)) return
    const uploadFileList: UploadFileItem[] = val.map((item) => {
      item[statusKey] = item[statusKey] || 'success'
      item.response = item.response || ''
      return { ...item, uid: context.id++ }
    })
    uploadFiles.value = uploadFileList
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.limit,
  (val) => {
    if (val && val < uploadFiles.value.length) {
      console.error('[mi-ui]Error: props limit must less than fileList.length')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

function emitFileList() {
  emit('update:fileList', uploadFiles.value)
}

function startUploadFiles() {
  const { buildFormData, formData = {}, statusKey } = props
  const { action, name, header = {}, accept, successStatus, uploadMethod } = props
  const statusCode = isDef(successStatus) ? successStatus : 200

  for (const uploadFile of uploadFiles.value) {
    if (uploadFile[statusKey] === UPLOAD_STATUS.PENDING) {
      if (buildFormData) {
        const res = buildFormData({ file: uploadFile, formData })
        if ((res as Promise<any>)?.then) {
          ;(res as Promise<Record<string, any>>)
            .then((newFormData) => {
              if (newFormData) {
                startUpload(uploadFile, {
                  action,
                  header,
                  name,
                  formData: newFormData,
                  fileType: accept as 'image' | 'video' | 'audio',
                  statusCode,
                  statusKey,
                  uploadMethod,
                  onSuccess: handleSuccess,
                  onError: handleError,
                  onProgress: handleProgress
                })
              }
            })
            .catch(() => {})
        } else if (res) {
          startUpload(uploadFile, {
            action,
            header,
            name,
            formData: res as Record<string, any>,
            fileType: accept as 'image' | 'video' | 'audio',
            statusCode,
            statusKey,
            uploadMethod,
            onSuccess: handleSuccess,
            onError: handleError,
            onProgress: handleProgress
          })
        }
      } else {
        startUpload(uploadFile, {
          action,
          header,
          name,
          formData,
          fileType: accept as 'image' | 'video' | 'audio',
          statusCode,
          statusKey,
          uploadMethod,
          onSuccess: handleSuccess,
          onError: handleError,
          onProgress: handleProgress
        })
      }
    }
  }
}

function getImageInfo(img: string) {
  return new Promise<UniApp.GetImageInfoSuccessData>((resolve, reject) => {
    uni.getImageInfo({
      src: img,
      success: (res) => {
        resolve(res)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

function initFile(file: ChooseFile, currentIndex?: number) {
  const { statusKey } = props
  const initState: UploadFileItem = {
    uid: context.id++,
    name: file.name || '',
    thumb: file.thumb || '',
    [statusKey]: 'pending',
    size: file.size || 0,
    url: file.path,
    percent: 0
  }
  if (typeof currentIndex === 'number') {
    uploadFiles.value.splice(currentIndex, 1, initState)
  } else {
    uploadFiles.value.push(initState)
  }
  if (props.autoUpload) {
    startUploadFiles()
  }
}

function handleError(err: Record<string, any>, file: UploadFileItem, formData: Record<string, any>) {
  const { statusKey } = props
  const index = uploadFiles.value.findIndex((item) => item.uid === file.uid)
  if (index > -1) {
    uploadFiles.value[index][statusKey] = 'fail'
    uploadFiles.value[index].error = err.message
    uploadFiles.value[index].response = err
    emit('fail', { error: err, file, formData })
    emitFileList()
  }
}

function handleSuccess(res: Record<string, any>, file: UploadFileItem, formData: Record<string, any>) {
  const { statusKey } = props
  const index = uploadFiles.value.findIndex((item) => item.uid === file.uid)
  if (index > -1) {
    uploadFiles.value[index][statusKey] = 'success'
    uploadFiles.value[index].response = res.data
    emit('change', { fileList: uploadFiles.value })
    emit('success', { file, fileList: uploadFiles.value, formData })
    emitFileList()
  }
}

function handleProgress(res: UniApp.OnProgressUpdateResult, file: UploadFileItem) {
  const index = uploadFiles.value.findIndex((item) => item.uid === file.uid)
  if (index > -1) {
    uploadFiles.value[index].percent = res.progress
    emit('progress', { response: res, file })
  }
}

function onChooseFile(currentIndex?: number) {
  const { multiple, maxSize, accept, sizeType, limit, sourceType, compressed, maxDuration, camera, beforeUpload, extension } = props
  chooseFile({
    multiple: isDef(currentIndex) ? false : multiple,
    sizeType,
    sourceType,
    maxCount: limit ? limit - uploadFiles.value.length : limit,
    accept,
    compressed,
    maxDuration,
    camera,
    extension
  })
    .then((res) => {
      let files = res
      if (!multiple) {
        files = files.slice(0, 1)
      }
      const mapFiles = async (files: ChooseFile[]) => {
        for (let index = 0; index < files.length; index++) {
          const file = files[index]
          if (file.type === 'image' && !file.size) {
            const imageInfo = await getImageInfo(file.path)
            file.size = imageInfo.width * imageInfo.height
          }
          Number(file.size) <= maxSize ? initFile(file, currentIndex) : emit('oversize', { file })
        }
      }

      callInterceptor(beforeUpload, {
        args: [{ files, fileList: uploadFiles.value }],
        done: () => mapFiles(files)
      })
    })
    .catch((error) => {
      emit('chooseerror', { error })
    })
}

function onEvokeClick() {
  handleChoose()
}

function handleChoose(index?: number) {
  if (props.disabled) return
  const { beforeChoose } = props

  callInterceptor(beforeChoose, {
    args: [{ fileList: uploadFiles.value }],
    done: () => onChooseFile(index)
  })
}

function handleRemove(file: UploadFileItem) {
  uploadFiles.value.splice(
    uploadFiles.value.findIndex((item) => item.uid === file.uid),
    1
  )
  emit('change', {
    fileList: uploadFiles.value
  })
  emit('remove', { file })
  emitFileList()
}

function removeFile(index: number) {
  const { beforeRemove } = props
  const intIndex: number = index
  const file = uploadFiles.value[intIndex]
  callInterceptor(beforeRemove, {
    args: [{ file, index: intIndex, fileList: uploadFiles.value }],
    done: () => handleRemove(file)
  })
}

function handlePreviewFile(file: UploadFileItem) {
  uni.openDocument({
    filePath: file.url,
    showMenu: true
  })
}

function handlePreviewImage(index: number, lists: string[]) {
  const { onPreviewFail } = props
  uni.previewImage({
    urls: lists,
    current: lists[index],
    fail() {
      if (onPreviewFail) {
        onPreviewFail({
          index,
          imgList: lists
        })
      } else {
        uni.showToast({ title: '预览图片失败', icon: 'none' })
      }
    }
  })
}

function onPreviewImage(file: UploadFileItem) {
  const { beforePreview, reupload } = props
  const fileList = deepClone(uploadFiles.value)
  const index: number = fileList.findIndex((item) => item.url === file.url)
  const imgList = fileList.filter((file) => isImage(file)).map((file) => file.url)
  const imgIndex: number = imgList.findIndex((item) => item === file.url)
  if (reupload) {
    handleChoose(index)
  } else {
    callInterceptor(beforePreview, {
      args: [{ file, index, fileList, imgList }],
      done: () => handlePreviewImage(imgIndex, imgList)
    })
  }
}

function onPreviewVideo(file: UploadFileItem) {
  const { beforePreview, reupload } = props
  const fileList = deepClone(uploadFiles.value)
  const index: number = fileList.findIndex((item) => item.url === file.url)
  const videoList = fileList.filter((file) => isVideo(file))
  const videoIndex: number = videoList.findIndex((item) => item.url === file.url)
  if (reupload) {
    handleChoose(index)
  } else {
    callInterceptor(beforePreview, {
      args: [{ file, index, fileList, imgList: [] }],
      done: () => {
        uni.previewMedia({
          current: videoIndex,
          sources: videoList.map((file) => {
            return {
              url: file.url,
              type: 'video',
              poster: file.thumb
            }
          }),
          fail() {
            if (props.onPreviewFail) {
              props.onPreviewFail({
                index: videoIndex,
                imgList: []
              })
            } else {
              uni.showToast({ title: '预览视频失败', icon: 'none' })
            }
          }
        })
      }
    })
  }
}

function onPreviewFile(file: UploadFileItem) {
  const { beforePreview, reupload } = props
  const fileList = deepClone(uploadFiles.value)
  const index: number = fileList.findIndex((item) => item.url === file.url)
  if (reupload) {
    handleChoose(index)
  } else {
    callInterceptor(beforePreview, {
      args: [{ file, index, fileList, imgList: [] }],
      done: () => handlePreviewFile(file)
    })
  }
}

function isVideo(file: UploadFileItem) {
  return (file.name && isVideoUrl(file.name)) || isVideoUrl(file.url)
}

function isImage(file: UploadFileItem) {
  return (file.name && isImageUrl(file.name)) || isImageUrl(file.url)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
