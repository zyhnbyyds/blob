<script lang="ts" setup>
defineOptions({
  name: 'Drawer',
})

const props = withDefaults(
  defineProps<{
    width?: string | number
    title?: string
  }>(),
  { width: '30%' },
)

const { width, title } = toRefs(props)

const drawerVisible = defineModel<boolean>('visible', { default: false })
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
        v-if="drawerVisible"
        class="absolute-0 z-999 h-full max-h-100vh w-full overflow-hidden bg-gray-800 bg-op70"
        @click="drawerVisible = false"
      />
    </Transition>
    <Transition
      enter-from-class="translate-x-100%"
      leave-to-class="translate-x-100%"
      enter-active-class="transition-transform duration-300"
      leave-active-class="transition-transform duration-300"
    >
      <div
        v-if="drawerVisible"
        :style="{ width: styleTypeReduce(width) }"
        class="shadow-com bg-com border-com absolute right-0 top-0 z-1 z-1000 h-100vh w-40%"
      >
        <header class="border-com h-60px border-x-0 border-y-0 border-b px-6">
          <slot name="header">
            <div class="h-full flex-col-center justify-between text-18px">
              <div class="flex-col-center">
                <Icon
                  mr-1
                  hover:animate-spin
                  size="24"
                  name="solar:settings-linear"
                />
                <span>
                  {{ title }}
                </span>
              </div>
              <Icon
                class="cursor-pointer font-thin"
                hover="bg-my-20 rounded"
                size="24"
                name="carbon:close"
                @click="drawerVisible = false"
              />
            </div>
          </slot>
        </header>
        <div class="h-[calc(100%-60px)]" px6 py-3>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped></style>
