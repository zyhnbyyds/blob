<script lang='ts' setup>
export interface Menu {
  title: string
  icon?: string
  key: string
  link?: boolean
}

export interface MenuConfig {
  active: string
  normal: string
  common: string
  icon: string
}

const props = withDefaults(defineProps<
  {
    menus: Menu[]
    route?: boolean
    config?: MenuConfig
    isFold?: boolean
  }
>(), {
  config: () => ({
    active: 'border-1px border-solid rounded-3 border-#E4E4E7 text-#3981F7 bg-#FAFAFA dark:bg-dark-400 dark:border-dark-300 dark:text-gray-200',
    normal: 'border-transparent text-#9096A2',
    common: 'block px-4 h-50px leading-50px mb-16px border-1 border-solid cursor-pointer transition-all',
    icon: 'text-20px inline-block align-mid',
  }),
  isFold: false,
  route: false,
})

const active = defineModel<string>()

function handleActiveChange(value: string) {
  if (props.route) {
    useRouter().push(value)
  }
  active.value = value
}
</script>

<template>
  <div w-full>
    <div v-for="item in props.menus" :key="item.key" shrink-0>
      <div
        :class="[config.common, active === item.key ? config.active : config.normal]"
        @click="handleActiveChange(item.key)"
      >
        <div :class="[item.icon, config.icon]" />
        <Transition
          name="fade" :duration="{
            enter: 150,
            leave: 50,
          }"
        >
          <div v-if="!props.isFold" ml-2 inline-block>
            {{ item.title }}
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
