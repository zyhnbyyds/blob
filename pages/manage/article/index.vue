<script lang="ts" setup>
import { Modal } from 'ant-design-vue';
import type { TableColumnsType, TablePaginationConfig } from 'ant-design-vue';
import type { ArticleItem } from '~/server/types/article';
import type { PageRes } from '~/server/types/common';

definePageMeta({
  layout: 'manage',
});

const page = reactive({
  size: 10,
  page: 1,
});

const { data, pending, refresh } = useFetch<PageRes<ArticleItem>>(
  '/api/article/list',
  { method: 'GET', params: page },
);

const pagination = reactive<TablePaginationConfig>({
  position: ['bottomRight'],
  pageSizeOptions: [10, 30, 50, 100],
  current: 1,
  pageSize: 10,
  showTotal: (total) => `共 ${total} 条`,
  total: data.value?.total ?? 0,
  onChange(current, pageSize) {
    page.page = current;
    page.size = pageSize;
  },
});

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
    width: '24%',
  },
];

function handleEdit(rowData: ArticleItem) {
  window.open(`/manage/article/publish?id=${rowData.id}&type=edit`, '_blank');
}

function handleDelete(rowData: ArticleItem) {
  Modal.confirm({
    title: '确认删除',
    content: '确认删除该文章吗？',
    cancelText: '取消',
    okText: '确认',
    onOk: async () => {
      await useFetch('/api/article/del', {
        method: 'DELETE',
        params: { id: rowData.id },
      });
      refresh();
      message.success('删除成功');
    },
  });
}

function handleAdd() {
  window.open(`/manage/article/publish?type=add`, '_blank');
}
</script>

<template>
  <div p-30px>
    <a-button mb-20px @click="handleAdd"> 添加 </a-button>

    <a-table
      :pagination="{
        ...pagination,
        total: data?.total ?? 0,
        pageSize: page.size,
        current: page.page,
      }"
      :loading="pending"
      :data-source="data?.list ?? []"
      :columns="columns"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div w-full flex justify="around">
            <a-button
              size="small"
              type="primary"
              @click="handleEdit(record as ArticleItem)"
            >
              编辑
            </a-button>
            <a-button
              size="small"
              type="text"
              @click="handleEdit(record as ArticleItem)"
            >
              查看
            </a-button>
            <a-button
              size="small"
              type="default"
              @click="handleDelete(record as ArticleItem)"
            >
              删除
            </a-button>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped></style>
