import { computed, ref } from 'vue'
import { getType, isArray, isDef, range, isObj, deepClone } from '../common/util'
import type { PickerOption } from './types'
import { type Numeric } from '../common/props'

function formatArray(
  array: Array<string | number | PickerOption | Array<string | number | PickerOption>>,
  valueKey: string,
  labelKey: string
): PickerOption[][] {
  let tempArray: Array<string | number | PickerOption | Array<string | number | PickerOption>> = isArray(array) ? array : [array]
  const firstLevelTypeList = new Set(array.map(getType))

  if (firstLevelTypeList.size !== 1 && firstLevelTypeList.has('object')) {
    throw Error('The columns are correct')
  }

  if (!isArray(array[0])) {
    tempArray = [tempArray as Array<string | number | PickerOption>]
  }

  const result: Array<Array<PickerOption>> = (tempArray as Array<Array<string | number | PickerOption>>).map((col) => {
    return col.map((row) => {
      if (!isObj(row)) {
        return {
          [valueKey]: row,
          [labelKey]: row
        } as PickerOption
      }

      if (!row.hasOwnProperty(valueKey) && !row.hasOwnProperty(labelKey)) {
        throw Error('Can\'t find valueKey and labelKey in columns')
      }
      if (!row.hasOwnProperty(labelKey)) {
        row[labelKey] = row[valueKey]
      }
      if (!row.hasOwnProperty(valueKey)) {
        row[valueKey] = row[labelKey]
      }
      return row as PickerOption
    })
  })

  return result
}

export function useSelection(valueKey: string, labelKey: string, childrenKey: string = 'children', cascade: boolean = false) {
  const formatColumns = ref<PickerOption[][]>([])
  const selectedIndex = ref<number[]>([])

  const selectedOptions = computed(() => {
    return selectedIndex.value.map((row, col) => formatColumns.value[col][row])
  })

  const selectedValues = computed(() => {
    const values = selectedIndex.value.map((row, col) => {
      return formatColumns.value[col][row][valueKey] as Numeric
    })
    return values
  })

  const selectedLabels = computed(() => {
    return selectedIndex.value.map((row, col) => String(formatColumns.value[col][row][labelKey] ?? ''))
  })

  function selectWithValue(value: Numeric | Numeric[]) {
    if (formatColumns.value.length === 0) {
      selectedIndex.value = []
      return
    }

    let normalizedValue: Numeric[]

    if (!isDef(value) || (isArray(value) && value.length === 0)) {
      normalizedValue = formatColumns.value.map((col) => {
        return col[0][valueKey] as Numeric
      })
    } else {
      normalizedValue = isArray(value) ? (value as Numeric[]) : [value as Numeric]
    }

    const slicedValue = normalizedValue.slice(0, formatColumns.value.length)

    let selected: number[] = [...selectedIndex.value]
    slicedValue.forEach((target, col) => {
      let row = formatColumns.value[col].findIndex((row) => {
        return row[valueKey]?.toString() === target.toString()
      })
      row = row === -1 ? 0 : row
      selected = correctSelectedIndex(col, row, selected)
    })

    selectedIndex.value = selected.slice(0, slicedValue.length)
  }

  function correctSelected(value: number[]): number[] {
    let selected = [...value]
    value.forEach((row, col) => {
      row = range(row, 0, formatColumns.value[col].length - 1)
      selected = correctSelectedIndex(col, row, selected)
    })
    return selected
  }

  function correctSelectedIndex(columnIndex: number, rowIndex: number, selected: number[]): number[] {
    const col = formatColumns.value[columnIndex]
    if (!col || !col[rowIndex]) {
      console.error(`[m-picker-view] The value to select with Col:${columnIndex} Row:${rowIndex} is incorrect`)
      return selected
    }
    const select: number[] = [...selected]
    select[columnIndex] = rowIndex

    if (col[rowIndex].disabled) {
      const prev = col
        .slice(0, rowIndex)
        .reverse()
        .findIndex((s) => !s.disabled)
      const next = col.slice(rowIndex + 1).findIndex((s) => !s.disabled)

      if (prev !== -1) {
        select[columnIndex] = rowIndex - 1 - prev
      } else if (next !== -1) {
        select[columnIndex] = rowIndex + 1 + next
      } else {
        console.warn(`[m-picker-view] All options in column ${columnIndex} are disabled, selecting disabled item at index ${rowIndex}`)
        select[columnIndex] = rowIndex
      }
    }
    return select
  }

  function getChangeColumnIndex(now: number[], origin: number[]): number {
    if (!now || !origin) return -1
    const index = now.findIndex((row, index) => row !== origin[index])
    return index
  }

  function getColumnIndex(columnIndex: number): number {
    return selectedIndex.value[columnIndex]
  }

  function getColumnData(columnIndex: number): PickerOption[] {
    return formatColumns.value[columnIndex]
  }

  function getColumnsData(): PickerOption[][] {
    return deepClone(formatColumns.value)
  }

  function buildCascadeColumns(data: PickerOption[], selectedValues: Numeric[]): PickerOption[][] {
    const result: PickerOption[][] = []
    let currentLevel = data

    if (currentLevel.length > 0) {
      result.push(currentLevel)
    }

    for (let i = 0; i < selectedValues.length; i++) {
      const value = selectedValues[i]
      const selected = currentLevel.find((item) => item[valueKey]?.toString() === value.toString())

      if (selected && selected[childrenKey] && (selected[childrenKey] as PickerOption[]).length > 0) {
        currentLevel = selected[childrenKey] as PickerOption[]
        result.push(currentLevel)
      } else {
        break
      }
    }

    return result
  }

  function updateCascadeColumns(rootData: PickerOption[], changedColumnIndex: number, currentSelectedIndex: number[]) {
    const newColumns: PickerOption[][] = [rootData]
    let currentLevel = rootData
    const newSelectedIndex: number[] = []

    for (let i = 0; i <= changedColumnIndex && i < currentSelectedIndex.length; i++) {
      const selectedIndex = currentSelectedIndex[i]
      const selected = currentLevel[selectedIndex]

      newSelectedIndex.push(selectedIndex)

      if (selected && selected[childrenKey] && (selected[childrenKey] as PickerOption[]).length > 0) {
        currentLevel = selected[childrenKey] as PickerOption[]
        newColumns.push(currentLevel)
      } else {
        break
      }
    }

    while (currentLevel.length > 0) {
      const firstEnabledIndex = currentLevel.findIndex((item) => !item.disabled)

      const nextIndex = firstEnabledIndex !== -1 ? firstEnabledIndex : 0
      const selected = currentLevel[nextIndex]

      if (selected && selected[childrenKey] && (selected[childrenKey] as PickerOption[]).length > 0) {
        newSelectedIndex.push(nextIndex)
        currentLevel = selected[childrenKey] as PickerOption[]
        newColumns.push(currentLevel)
      } else {
        if (newColumns.length > newSelectedIndex.length) {
          newSelectedIndex.push(nextIndex)
        }
        break
      }
    }

    formatColumns.value = newColumns
    selectedIndex.value = newSelectedIndex
  }

  function resetColumns(columns: Array<string | number | PickerOption | Array<string | number | PickerOption>>) {
    if (isArray(columns) && columns.length > 0) {
      if (cascade && isArray(columns) && columns.length > 0 && !isArray(columns[0])) {
        const firstItem = columns[0] as PickerOption
        if (isObj(firstItem) && childrenKey in firstItem) {
          const cascadeData = columns as PickerOption[]
          formatColumns.value = [formatArray([cascadeData], valueKey, labelKey)[0]]
          
          // 级联模式：初始化时自动展开所有子级数据
          let currentLevel = cascadeData
          let currentColumnIndex = 0
          while (currentLevel.length > 0) {
            const firstEnabledIndex = currentLevel.findIndex((item) => !item.disabled)
            const nextIndex = firstEnabledIndex !== -1 ? firstEnabledIndex : 0
            const selected = currentLevel[nextIndex]
            
            if (selected && selected[childrenKey] && (selected[childrenKey] as PickerOption[]).length > 0) {
              currentLevel = selected[childrenKey] as PickerOption[]
              currentColumnIndex++
              formatColumns.value.push(formatArray([currentLevel], valueKey, labelKey)[0])
            } else {
              break
            }
          }
          
          return
        }
      }

      formatColumns.value = formatArray(columns, valueKey, labelKey)
    } else {
      formatColumns.value = []
      selectedIndex.value = []
    }
  }

  return {
    formatColumns,
    selectedIndex,
    selectedOptions,
    selectedValues,
    selectedLabels,
    selectWithValue,
    correctSelected,
    correctSelectedIndex,
    getChangeColumnIndex,
    getColumnIndex,
    getColumnData,
    getColumnsData,
    resetColumns,
    buildCascadeColumns,
    updateCascadeColumns
  }
}
