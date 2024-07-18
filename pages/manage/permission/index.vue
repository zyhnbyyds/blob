<script lang="ts" setup>
import type { PermissionItem } from '~/server/types/permission'
import type { PageRes } from '~/server/types/common'

definePageMeta({
  layout: 'master',
})

const page = reactive({
  size: 10,
  page: 1,
  type: 'normal',
})

const { data, status, refresh } = apiGet<PageRes<PermissionItem>>(
  '/api/permission/list',
  page,
)

const columns = [
  {
    title: '权限名称',
    key: 'permissionName',
    widthClass: '300px',
  },
  {
    title: '权限描述',
    key: 'permissionDesc',
    widthClass: '400px',
  },
  {
    title: '创建时间',
    key: 'createTime',
    widthClass: '300px',
  },
  {
    title: '操作',
    key: 'action',
    widthClass: '200px',
  },
]

function handleEdit(rowData: PermissionItem) {
  window.open(`/manage/permission/edit?id=${rowData.id}&type=edit`, '_blank')
}

async function handleDelete(rowData: PermissionItem) {
  await useFetch('/api/permission/del', {
    method: 'DELETE',
    params: { id: rowData.id },
  })

  showMessage({
    type: 'success',
    message: '删除成功',
  })
  refresh()
}

function handleAdd() {
  window.open(`/manage/permission/add?type=add`, '_blank')
}

function handlePageChange(pageGet: number) {
  page.page = pageGet
}
</script>

<template>
  <div hw-full p-30px>
    <div class="h-50px flex-col-center justify-between gap-3">
      <Button icon="solar:add-square-broken text-2.7" size="sm" @click="handleAdd">
        Add Permission
      </Button>
      <Button icon="solar:refresh-circle-outline text-2.7" size="sm" bg-green-6 dark="bg-gray-700" @click="refresh" />
    </div>
    <div class="h-[calc(100%-50px)]">
      <BTable
        :columns="columns" :data="data?.list ?? []" :loading="status === 'pending'" :page="{ ...page, total: data?.total ?? 0 }"
        @change="handlePageChange"
      >
        <template #action="{ row }">
          <Button mr-2 size="sm" @click="handleEdit(row)">
            Edit
          </Button>
          <Button size="sm" bg-green-6 @click="handleDelete(row)">
            Delete
          </Button>
        </template>
      </BTable>
    </div>
  </div>
</template>

<style scoped></style>
