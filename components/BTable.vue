<script lang='ts' setup>
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
  data: any[]
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
        <Transition name="fade" mode="out-in">
          <div v-if="props.loading" i-svg-spinners:180-ring z-3 text-10 text-light-900 ab-c dark:text-gray-500 />
          <tbody v-else>
            <tr
              v-for="row in props.data"
              :key="row.id" h-48px flex-col overflow-hidden
              hover="bg-light-100 dark:bg-dark-400 bg-op70"
              class="border-b-1 border-gray-2 border-solid bg-light-100 dark:bg-dark-500"
            >
              <td
                v-for="column in props.columns"
                :key="column.key"
                :style="{ width: column.widthClass }" border="1px solid gray-2 dark:dark-2"
                text-gray-500 dark:text-gray-400
                class="h-48px max-w-20 overflow-hidden text-ellipsis px-4 py-3 text-center text-nowrap first:border-l-0 last:border-r-0"
              >
                {{ row[column.key] }}
              </td>
            </tr>
          </tbody>
        </Transition>
      </table>
    </div>

    <div h-60px flex-col-center>
      <Pagination :page="props.page?.page" :total="props.page?.total" :size="props.page?.size" @change="(e) => $emit('change', e)" />
    </div>
  </div>
</template>

<style scoped></style>
./type
