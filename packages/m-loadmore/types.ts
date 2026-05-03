import type { PropType } from 'vue'
import { baseProps } from '../common/props'
import type { LoadingProps } from '../m-loading/types'

export type LoadMoreState = 'loading' | 'error' | 'finished'

export const loadmoreProps = {
  ...baseProps,
  state: String as PropType<LoadMoreState>,
  loadingText: String,
  finishedText: String,
  errorText: String,
  loadingProps: Object as PropType<Partial<LoadingProps>>
}

export type LoadmoreProps = typeof loadmoreProps