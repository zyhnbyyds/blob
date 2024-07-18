<script lang='ts' setup generic="T extends object">
import type { PaginationProps } from './Pagination.vue'

export interface TableColumns {
  title: string
  key: string
  widthClass?: string
  align?: 'left' | 'center' | 'right'
  ellipsis?: boolean
}

const props = defineProps<{
  columns: TableColumns[]
  data: T[]
  page?: PaginationProps
  loading?: boolean
  headerClass?: string
  rowClass?: string
}>()

defineEmits<
  {
    change: [page: number]
  }
>()
</script>

<template>
  <div hw-full>
    <div w-full class="relative h-[calc(100%-60px)]" overflow-hidden rounded-2 border="1px solid gray-300 dark:gray-700">
      <table class="w-full text-3.7">
        <thead>
          <tr bg-blue-3 dark:bg-dark-200>
            <th
              v-for="column in props.columns"
              :key="column.key"
              :style="{ width: column.widthClass }"
              text="3.5"
              px-4 py-3 text-light-300 font-bold first:border-l-0 last:border-r-0 dark:text-gray-300
              border="1px solid gray-2 dark:gray-700"
            >
              {{ column.title }}
            </th>
          </tr>
        </thead>
        <tbody v-if="props.data.length !== 0">
          <tr
            v-for="row, index in props.data"
            :key="index" h-48px flex-col overflow-hidden
            hover="bg-light-100 dark:bg-dark-400 bg-op70"
            class="border-b-1 border-gray-2 border-solid bg-light-100 dark:bg-dark-500"
          >
            <td
              v-for="column in props.columns"
              :key="column.key"
              :style="{ width: column.widthClass }" border="1px solid gray-2 dark:dark-2"
              text-sm text-gray-500 dark:text-gray-400
              class="overflow-hidden text-ellipsis px-4 py-1 text-center text-nowrap first:border-l-0 last:border-r-0"
            >
              <slot :name="column.key" :row="row">
                {{ (row as any)[column.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="props.data.length === 0" w-full flex-center pt-30>
        数据为空
      </div>
    </div>

    <div h-60px flex-col-center>
      <Pagination :page="props.page?.page" :total="props.page?.total" :size="props.page?.size" @change="(e) => $emit('change', e)" />
    </div>
  </div>
</template>

<style scoped></style>
./type
