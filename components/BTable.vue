<script lang='ts' setup>
import type { PaginationProps } from './Pagination.vue'

export interface TableColumns {
  title: string
  key: string
  width?: string
  align?: 'left' | 'center' | 'right'
  ellipsis?: boolean
}

const props = defineProps<{
  columns: TableColumns[]
  data: any[]
  page?: PaginationProps
}>()

defineEmits<
{
  change: [page: number]
}
>()
</script>

<template>
  <div hw-full>
    <div w-full class="h-[calc(100%-60px)]" overflow-hidden rounded-2 border="1px solid gray-300">
      <table class="w-full text-3.7">
        <thead>
          <tr bg-blue-3>
            <th
              v-for="column in props.columns"
              :key="column.key" text="white"
              px-4 py-3 font-500 font-normal first:border-l-0 last:border-r-0
              border="1px solid gray-2"
            >
              {{ column.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in props.data"
            :key="row.id" h-48px flex-col overflow-hidden
            class="bg-light-100 transition-all hover:bg-light-300"
          >
            <td
              v-for="column in props.columns"
              :key="column.key" border="1px solid gray-2"
              class="h-48px max-w-20 overflow-hidden text-ellipsis px-4 py-3 text-center text-nowrap first:border-l-0 last:border-r-0"
            >
              {{ row[column.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div h-60px flex-col-center>
      <Pagination :page="props.page?.page" :total="props.page?.total" :size="props.page?.size" @change="(e) => $emit('change', e)" />
    </div>
  </div>
</template>

<style scoped></style>
./type
