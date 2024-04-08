<!-- eslint-disable unused-imports/no-unused-vars -->
<script lang="ts" setup>
import type { ArticleItem } from '~/server/types/article'
import type { PageRes } from '~/server/types/common'

definePageMeta({
  layout: 'master',
})

const page = reactive({
  size: 10,
  page: 1,
  total: 1000,
  type: 'normal',
})

const { data, pending, refresh } = useFetch<PageRes<ArticleItem>>(
  '/api/article/list',
  { method: 'GET', params: page },
)

const columns = [
  {
    title: '标题',
    key: 'title',
  },
  {
    title: '发布时间',
    key: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
  },
]

function handleEdit(rowData: ArticleItem) {
  window.open(`/manage/article/publish?id=${rowData.id}&type=edit`, '_blank')
}

async function handleDelete(rowData: ArticleItem) {
  await useFetch('/api/article/del', {
    method: 'DELETE',
    params: { id: rowData.id },
  })
  refresh()
}

function handleAdd() {
  window.open(`/manage/article/publish?type=add`, '_blank')
}

function handlePageChange(pageGet: number) {
  page.page = pageGet
  refresh()
}
</script>

<template>
  <div hw-full p-30px>
    <div class="h-50px flex-col-center gap-3">
      <Button icon="solar:add-square-broken text-2.7" size="sm" @click="handleAdd">
        新增
      </Button>
      <Button icon="solar:refresh-circle-outline text-2.7" size="sm" bg-green-6 @click="refresh">
        刷新
      </Button>
    </div>
    <div class="h-[calc(100%-50px)]">
      <BTable
        :columns="columns"
        :data="data?.list ?? []"
        :loading="pending"
        :page="page"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped></style>~/components/blob/table/type
