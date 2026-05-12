<template>
  <view :class="`m-picker-view ${customClass}`" :style="customStyle">
    <picker-view
      class="m-picker-view__main"
      mask-class="m-picker-view__mask"
      indicator-class="m-picker-view__roller"
      :style="pickerViewStyle"
      :value="selectedIndex"
      :immediate-change="immediateChange"
      @change="onChange"
      @pickstart="onPickStart"
      @pickend="onPickEnd"
    >
      <picker-view-column v-for="(col, colIndex) in formatColumns" :key="colIndex" class="m-picker-view__column">
        <block v-for="(row, rowIndex) in col" :key="rowIndex">
          <view :class="getItemClass(row['disabled'], colIndex, rowIndex)">
            {{ row[labelKey] }}
          </view>
        </block>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'm-picker-view',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { watch, nextTick, computed } from 'vue'
import { addUnit, isDef, isEqual, isArray, isObj } from '../common/util'
import { pickerViewProps, type PickerViewExpose, type PickerOption } from './types'
import { useSelection } from './useSelection'
import { type Numeric } from '../common/props'

const props = defineProps(pickerViewProps)
const emit = defineEmits(['change', 'pickstart', 'pickend', 'update:modelValue'])

const {
  formatColumns,
  selectedIndex,
  selectedOptions,
  selectedValues,
  selectedLabels,
  selectWithValue,
  correctSelected,
  getChangeColumnIndex,
  getColumnIndex,
  getColumnData,
  getColumnsData,
  resetColumns,
  buildCascadeColumns,
  updateCascadeColumns
} = useSelection(props.valueKey, props.labelKey, props.childrenKey, props.cascade)

watch(
  [() => props.modelValue, () => props.columns, () => props.cascade],
  (newValue, oldValue) => {
    const [newModelValue, newColumns, newCascade] = newValue
    const [, oldColumns] = oldValue

    if (!isEqual(oldColumns, newColumns)) {
      resetColumns(newColumns)

      if (newCascade && isDef(newModelValue) && (newModelValue as any[]).length > 0 && newColumns.length > 0) {
        const cascadeColumns = buildCascadeColumns(newColumns as PickerOption[], newModelValue as any[])
        formatColumns.value = cascadeColumns
      }
    }

    if (isDef(newModelValue)) {
      selectWithValue(newModelValue)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const pickerViewStyle = computed(() => {
  return `height: ${addUnit(props.itemHeight * props.visibleItemCount)};`
})

function getItemClass(disabled: boolean | undefined, colIndex: number, rowIndex: number) {
  const classes = ['m-picker-view__column-item']
  if (disabled) {
    classes.push('m-picker-view__column-item--disabled')
  }
  if (selectedIndex.value[colIndex] === rowIndex) {
    classes.push('m-picker-view__column-item--active')
  }
  return classes.join(' ')
}

function onChange({ detail: { value } }: { detail: { value: number[] } }) {
  const normalizedValue = value.map((v) => Number(v || 0))
  const origin = [...selectedIndex.value]

  selectedIndex.value = [...normalizedValue]

  nextTick(() => {
    selectedIndex.value = correctSelected(normalizedValue)
    const columnIndex = getChangeColumnIndex(selectedIndex.value, origin)

    if (props.cascade && columnIndex !== -1 && props.columns.length > 0) {
      const firstColumn = props.columns[0]
      if (!isArray(firstColumn) && isObj(firstColumn)) {
        updateCascadeColumns(props.columns as PickerOption[], columnIndex, selectedIndex.value)
      }
    }

    handleChange(columnIndex)
  })
}

function handleChange(columnIndex: number) {
  if (isEqual(selectedValues.value, props.modelValue)) return

  emit('update:modelValue', selectedValues.value)
  nextTick(() => {
    emit('change', {
      selectedValues: selectedValues.value,
      selectedOptions: selectedOptions.value,
      selectedLabels: selectedLabels.value,
      selectedIndexes: selectedIndex.value,
      columnIndex
    })
  })
}

function getSelectedIndex(): number[] {
  return selectedIndex.value
}

function onPickStart() {
  emit('pickstart')
}

function onPickEnd() {
  emit('pickend')
}

function getSelectedOptions(): PickerOption[] {
  return selectedOptions.value
}

function getSelectedValues(): Numeric[] {
  return selectedValues.value
}

function getSelectedLabels(): string[] {
  return selectedLabels.value
}

defineExpose<PickerViewExpose>({
  getSelectedOptions,
  getSelectedValues,
  getColumnsData,
  getColumnData,
  getColumnIndex,
  getSelectedLabels,
  getSelectedIndex,
  resetColumns
})
</script>

<style lang="scss">
@import './index.scss';
</style>
