<script lang="ts" setup>
defineOptions({
  name: 'Modal',
})

const props = withDefaults(
  defineProps<{
    width?: string | number
    top?: string | number
    bgTransparent?: boolean
    title?: string
    header?: boolean
  }>(),
  {
    width: 600,
    top: 100,
    bgTransparent: false,
    header: true,
  },
)

const { width, top, bgTransparent, header, title } = toRefs(props)

const modelVisible = defineModel<boolean>({
  required: true,
  default: false,
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-from-class="op-0"
      leave-to-class="op-0"
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
    >
      <div
        v-if="modelVisible"
        class="ab-0 z-999 h-full max-h-100vh w-full overflow-hidden bg-gray-800 bg-op50"
        @click.self.prevent="modelVisible = false"
      >
        <div
          :style="{ width: styleTypeReduce(width), top: styleTypeReduce(top) }"
          class="absolute left-1/2 z-1000 rounded-md shadow-md -translate-x-1/2 bg-common"
          :class="{ '!bg-op-0 !border-op-0 !shadow-none': bgTransparent }"
        >
          <slot v-if="header" name="footer">
            <div flex p-2 justify="between">
              <!-- title -->
              <span>{{ title }}</span>
              <div
                p-0.1
                cursor="pointer"
                hover="bg-my-20 rounded"
                @click="modelVisible = false"
              >
                <div carbon:close text-2xl />
              </div>
            </div>
          </slot>
          <slot />
          <!-- JustForImgPre -->
          <div class="absolute-x-center bottom-10 z-9999">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped></style>
