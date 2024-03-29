<script lang="ts" setup>
interface Props {
  placeholder?: string
  id?: string
  status?: 'success' | 'error'
  autocomplete?: string
  type?: string
}

defineOptions({
  name: 'FloatInput',
})

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入',
  id: '',
  status: 'success',
  autocomplete: 'on',
  type: 'text',
})

const emits = defineEmits(['focus', 'blur'])

const ipt = defineModel<string | number>('value', { default: '' })

const isFocus = ref(false)

const isShow = computed(() => {
  return ipt.value !== ''
})

const outlineColors = {
  success: 'outline-blue-400 hover="border-blue-400"',
  error: 'outline-red-400 border-2px border-red',
}

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
    :class="
      props.status === 'error'
        ? 'text-red'
        : 'text-[rgb(112,117,121)] hover:text-blue-400  focus-within:text-blue-600'
    "
    class="relative text-16px"
  >
    <input
      :id="props.id"
      v-model="ipt"
      :class="outlineColors[props.status]"
      :autocomplete="autocomplete"
      :type="type"
      class="h-52px w-full border rounded-12px px-14px py-11px text-#333 caret-blue-400"
      @focus="handleFocus"
      @blur="handleBlur"
    >
    <label
      :for="props.id"
      :class="
        isShow || isFocus
          ? 'left-10px scale-75 -top-12px'
          : 'left-14px top-1/2 -translate-y-1/2'
      "
      class="absolute inline-block origin-top-left bg-#fff px-4px duration-150 ease"
    >{{ props.placeholder }}</label>
    <slot name="suffix" />
    <slot name="default" />
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
