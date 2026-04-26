import { type ExtractPropTypes, type InjectionKey } from 'vue'
import { baseProps, makeBooleanProp, makeStringProp } from '../common/props'

export type GridDirection = 'horizontal' | 'vertical'

export const gridProps = {
  ...baseProps,
  clickable: makeBooleanProp(false),
  column: Number,
  border: makeBooleanProp(false),
  bgColor: makeStringProp(''),
  gutter: Number,
  hoverClass: String,
  center: makeBooleanProp(true),
  direction: makeStringProp<GridDirection>('vertical'),
  reverse: makeBooleanProp(false),
  iconSize: String
}

export type GridProps = ExtractPropTypes<typeof gridProps>

export type GridProvide = {
  props: Partial<GridProps>
}

export const GRID_KEY: InjectionKey<GridProvide> = Symbol('m-grid')