<script lang="ts" setup>
interface Props {
  placeholder?: string
  status?: 'success' | 'error'
  autocomplete?: string
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入',
  status: 'success',
  autocomplete: 'on',
  type: 'text',
})

const emits = defineEmits(['focus', 'blur'])

const ipt = defineModel<string | number>({ default: '' })
const iptId = useId()

const isFocus = ref(false)

const isShow = computed(() => {
  return ipt.value !== ''
})

function handleBlur() {
  setTimeout(() => {
    if (ipt.value)
      return
    isFocus.value = false
    emits('blur')
  })
}

function handleFocus() {
  emits('focus')
  isFocus.value = true
}
</script>

<template>
  <div
    class="relative bg-inherit text-16px text-gray-3 focus-within:text-blue-3"
  >
    <input
      :id="iptId"
      v-model="ipt"
      dark="bg-dark-400 border-dark-300 ring-dark-2 hover:border-dark-200 focus:border-dark-100 focus:bg-dark-300 text-dark-100 focus:ring-1"
      border="~ gray-200"
      hover="border-blue-200"
      class="w-full rounded-2 px-14px pb-3 pt-6 caret-blue-400 outline-none ring-blue-2 ring-op-70 transition-all focus:border-blue-4 focus:bg-light-3 text-common dark:text-light-500 focus:ring-1"
      :autocomplete="autocomplete"
      :type="type"
      @focus="handleFocus"
      @blur="handleBlur"
    >
    <label
      :for="iptId"
      :class="
        isShow || isFocus
          ? 'left-10px scale-80 top-2px'
          : 'left-14px top-1/2 -translate-y-1/2'
      "
      class="absolute inline-block origin-top-left cursor-text px-1 text-3.3 transition-all"
    >{{ props.placeholder }}</label>
    <!-- <span right-3 text-sm text-blue-3 ab-y-c>
      <slot name="suffix" />
    </span> -->
  </div>
</template>

<style scoped>
input:-webkit-autofill {
  background-color: #fff !important;
}

input:-internal-autofill-selected {
  background-color: #fff !important;
}
</style>
