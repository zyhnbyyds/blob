<script lang='ts' setup>
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <a-switch
    v-model:checked="isDark"
    absolute
    right-20px
    top-20px
    checked-children="🌙"
    un-checked-children="🌞"
    @change="toggleDark"
  />
</template>

<style scoped></style>
