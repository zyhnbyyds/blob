<script lang='ts' setup>
import type { TableColumnsType } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'
import type { ArticleItem } from '~/server/types/article'
import type { PageRes } from '~/server/types/common'

definePageMeta({
  layout: 'manage',
})

const { data, pending, refresh } = useFetch<PageRes<ArticleItem>>('/api/article/list', { method: 'GET', params: { page: 1, size: 1000 } })

const columns: TableColumnsType = [
  {
    title: '标题',
    dataIndex: 'title',
    width: '60%',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '发布时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: '20%',
  },
]

function handleEdit(rowData: ArticleItem) {
  window.open(`/manage/article/publish?id=${rowData.id}&type=edit`, '_blank')
}

function handleDelete(rowData: ArticleItem) {
  Modal.confirm({
    title: '确认删除',
    content: '确认删除该文章吗？',
    onOk: async () => {
      await useFetch('/api/article/del', { method: 'DELETE', params: { id: rowData.id } })
      refresh()
      message.success('删除成功')
    },
  })
}

function handleAdd() {
  window.open(`/manage/article/publish?type=add`, '_blank')
}
</script>

<template>
  <div p-30px>
    <a-button mb-20px @click="handleAdd">
      添加
    </a-button>

    <a-table :loading="pending" :data-source="data?.list ?? []" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div w-full flex justify="around">
            <a-button size="small" type="primary" @click="handleEdit(record as ArticleItem)">
              编辑
            </a-button>
            <a-button size="small" type="default" @click="handleDelete(record as ArticleItem)">
              删除
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped></style>
