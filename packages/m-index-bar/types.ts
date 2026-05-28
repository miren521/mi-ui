import type { InjectionKey } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { makeBooleanProp } from '../common/props'

export type AnchorIndex = number | string

export const indexBarProps = {
  sticky: makeBooleanProp(false)
}

export type IndexBarProps = ExtractPropTypes<typeof indexBarProps>

export type IndexBarProvide = {
  props: { sticky?: boolean }
  anchorState: {
    activeIndex: AnchorIndex | null
  }
}

export const indexBarInjectionKey: InjectionKey<IndexBarProvide> = Symbol('m-index-bar')
