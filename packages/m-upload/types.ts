import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import { baseProps, makeArrayProp, makeBooleanProp, makeNumberProp, makeStringProp } from '../common/props'

export interface ChooseFileOption {
  multiple?: boolean
  sizeType?: UploadSizeType[]
  sourceType?: UploadSourceType[]
  maxCount?: number
  accept?: UploadFileType
  compressed?: boolean
  maxDuration?: number
  camera?: UploadCameraType
  extension?: string[]
}

export type UploadFileItem = {
  [key: string]: any
  uid: number
  thumb?: string
  name?: string
  status?: UploadStatusType
  size?: number
  url: string
  percent?: number
  response?: string | Record<string, any>
}

export interface ChooseFile {
  path: string
  size?: number
  name?: string
  type: 'image' | 'video' | 'file'
  duration?: number
  thumb?: string
}

export type UploadSourceType = 'album' | 'camera'
export type UploadSizeType = 'original' | 'compressed'
export type UploadFileType = 'image' | 'video' | 'media' | 'all' | 'file'
export type UploadCameraType = 'front' | 'back'
export type UploadStatusType = 'pending' | 'loading' | 'success' | 'fail'
export type UploadSuccessStatus = number | number[]

export type UploadBeforePreviewOption = {
  file: UploadFileItem
  index: number
  imgList: string[]
  fileList: UploadFileItem[]
}
export type UploadBeforePreview = (option: UploadBeforePreviewOption) => boolean | Promise<boolean>

export type UploadOnPreviewFailOption = {
  index: number
  imgList: string[]
}
export type UploadOnPreviewFail = (option: UploadOnPreviewFailOption) => void

export type UploadBeforeRemoveOption = {
  file: UploadFileItem
  index: number
  fileList: UploadFileItem[]
}
export type UploadBeforeRemove = (option: UploadBeforeRemoveOption) => boolean | Promise<boolean>

export type UploadBeforeChooseOption = {
  fileList: UploadFileItem[]
}
export type UploadBeforeChoose = (option: UploadBeforeChooseOption) => boolean | Promise<boolean>

export type UploadBeforeUploadOption = {
  files: Record<string, any>[]
  fileList: UploadFileItem[]
}
export type UploadBeforeUpload = (options: UploadBeforeUploadOption) => boolean | Promise<boolean>

export type UploadFormData = Record<string, any>

export type UploadBuildFormDataOption = {
  file: UploadFileItem
  formData: UploadFormData
}
export type UploadBuildFormData = (options: UploadBuildFormDataOption) => Record<string, any> | Promise<Record<string, any>>

export type UploadFile = Partial<UploadFileItem> & { url: string }

export type UploadMethod = (
  uploadFile: UploadFileItem,
  formData: UploadFormData,
  options: {
    action: string
    header: Record<string, any>
    name: string
    fileName: string
    fileType: 'image' | 'video' | 'audio'
    statusCode: UploadSuccessStatus
    abortPrevious?: boolean
    onSuccess: (res: UniApp.UploadFileSuccessCallbackResult, file: UploadFileItem, formData: UploadFormData) => void
    onError: (res: UniApp.GeneralCallbackResult, file: UploadFileItem, formData: UploadFormData) => void
    onProgress: (res: UniApp.OnProgressUpdateResult, file: UploadFileItem) => void
  }
) => UniApp.UploadTask | void | Promise<void>

export const uploadProps = {
  ...baseProps,
  fileList: makeArrayProp<UploadFile>(),
  action: makeStringProp(''),
  header: { type: Object as PropType<Record<string, any>>, default: () => ({}) },
  multiple: makeBooleanProp(false),
  disabled: makeBooleanProp(false),
  limit: Number,
  showLimitNum: makeBooleanProp(true),
  maxSize: makeNumberProp(Number.MAX_VALUE),
  sourceType: {
    type: Array as PropType<UploadSourceType[]>,
    default: () => ['album', 'camera']
  },
  sizeType: {
    type: Array as PropType<UploadSizeType[]>,
    default: () => ['original', 'compressed']
  },
  name: makeStringProp('file'),
  formData: { type: Object as PropType<UploadFormData>, default: () => ({}) },
  onPreviewFail: Function as PropType<UploadOnPreviewFail>,
  beforeUpload: Function as PropType<UploadBeforeUpload>,
  beforeChoose: Function as PropType<UploadBeforeChoose>,
  beforeRemove: Function as PropType<UploadBeforeRemove>,
  beforePreview: Function as PropType<UploadBeforePreview>,
  buildFormData: Function as PropType<UploadBuildFormData>,
  loadingType: makeStringProp('circular'),
  loadingColor: makeStringProp('#ffffff'),
  accept: makeStringProp<UploadFileType>('image'),
  statusKey: makeStringProp('status'),
  loadingSize: makeStringProp('24px'),
  compressed: makeBooleanProp(true),
  maxDuration: makeNumberProp(60),
  camera: makeStringProp<UploadCameraType>('back'),
  imageMode: makeStringProp('aspectFit'),
  successStatus: {
    type: [Number, Array] as PropType<UploadSuccessStatus>,
    default: 200
  },
  customEvokeClass: makeStringProp(''),
  customPreviewClass: makeStringProp(''),
  autoUpload: makeBooleanProp(true),
  reupload: makeBooleanProp(false),
  uploadMethod: Function as PropType<UploadMethod>,
  extension: Array as PropType<string[]>
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>

export type UploadExpose = {
  submit: () => void
  abort: (task?: UniApp.UploadTask) => void
}

export type UploadErrorEvent = {
  error: any
  file: UploadFileItem
  formData: UploadFormData
}

export type UploadChangeEvent = {
  fileList: UploadFileItem[]
}

export type UploadSuccessEvent = {
  file: UploadFileItem
  fileList: UploadFileItem[]
  formData: UploadFormData
}

export type UploadProgressEvent = {
  response: UniApp.OnProgressUpdateResult
  file: UploadFileItem
}

export type UploadOversizeEvent = {
  file: ChooseFile
}

export type UploadRemoveEvent = {
  file: UploadFileItem
}

export type UploadInstance = ComponentPublicInstance<UploadProps, UploadExpose>
