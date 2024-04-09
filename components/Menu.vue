<script lang='ts' setup>
export interface Menu {
  title: string
  icon: string
  path: string
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
  menuConfig?: MenuConfig
  isFold?: boolean
}
>(), {
  menuConfig: () => ({
    active: 'border-1px border-solid rounded-3 border-#E4E4E7 text-#3981F7 bg-#FAFAFA dark:bg-dark-400 dark:border-dark-300 dark:text-gray-200',
    normal: 'border-transparent text-#9096A2',
    common: 'block px-4 h-50px leading-50px mb-16px border-1 border-solid cursor-pointer transition-all',
    icon: 'text-20px inline-block align-mid',
  }),
  isFold: false,
})

const active = defineModel<string>()
</script>

<template>
  <div w-full>
    <div v-for="item in props.menus" :key="item.path">
      <NuxtLink
        :to="item.path"
        :class="[menuConfig.common, active === item.path ? menuConfig.active : menuConfig.normal]"
        @click="active = item.path"
      >
        <div :class="[item.icon, menuConfig.icon]" />
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
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
</style>
