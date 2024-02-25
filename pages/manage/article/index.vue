<!-- eslint-disable unused-imports/no-unused-vars -->
<script lang="ts" setup>
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

// const pagination = reactive<any>({
//   position: ['bottomRight'],
//   pageSizeOptions: [10, 30, 50, 100],
//   current: 1,
//   pageSize: 10,
//   showTotal: (total) => `共 ${total} 条`,
//   total: data.value?.total ?? 0,
//   onChange(current, pageSize) {
//     page.page = current;
//     page.size = pageSize;
//   },
// });

// const columns: TableColumnsType = [
//   {
//     title: '标题',
//     dataIndex: 'title',
//     width: '60%',
//     key: 'title',
//     ellipsis: true,
//   },
//   {
//     title: '发布时间',
//     dataIndex: 'createTime',
//     key: 'createTime',
//   },
//   {
//     title: '操作',
//     dataIndex: 'action',
//     key: 'action',
//     align: 'center',
//     width: '16%',
//   },
// ];

function handleEdit(rowData: ArticleItem) {
  window.open(`/manage/article/publish?id=${rowData.id}&type=edit`, '_blank');
}

async function handleDelete(rowData: ArticleItem) {
  await useFetch('/api/article/del', {
    method: 'DELETE',
    params: { id: rowData.id },
  });
  refresh();
}

function handleAdd() {
  window.open(`/manage/article/publish?type=add`, '_blank');
}
</script>

<template>
  <div p-30px>
    <span
      px-5
      py-2
      inline
      border="1px solid #ee5e5e5"
      @click="handleAdd"
      class="flex-col-center!"
      gap-2
    >
      添加
      <div carbon:add-alt />
    </span>
  </div>
</template>

<style scoped></style>
