<script lang='ts' setup>
import type { TableColumns } from './type'

import { header } from './uno-style'

const props = defineProps<{
  columns: TableColumns[]
  data: any[]
}>()
</script>

<template>
  <table class="w-full">
    <thead :class="header">
      <tr>
        <th v-for="column in props.columns" :key="column.key" :style="{ width: column.width }">
          {{ column.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in props.data" :key="row.id">
        <td v-for="column in props.columns" :key="column.key" :style="{ width: column.width }">
          {{ row[column.dataIndex] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
./type
