import type { ComponentInternalInstance, InjectionKey } from 'vue'

export type stickyBoxProvide = {
  boxStyle: {
    height: number
    width: number
  }
  observerForChild: (child: ComponentInternalInstance) => void
}

export const STICKY_BOX_KEY: InjectionKey<stickyBoxProvide> = Symbol('m-sticky-box')
