<script lang="ts" setup>
interface FormState {
  username: string
  password: string
}

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

const formState = reactive<FormState>({
  username: 'jsmith',
  password: 'password',
})
const isRemember = ref(false)

const disabled = computed(() => {
  return !(formState.username && formState.password)
})

const { signIn } = useAuth()

async function handleClickToLogin() {
  await signIn('credentials', { callbackUrl: '/' }, { username: formState.username, password: formState.password })
}
</script>

<template>
  <div hw-full flex-center pb-100px>
    <a-card shadow-md>
      <a-form
        class="min-w-sm w-1/4"
        :model="formState"
        layout="vertical"
      >
        <a-form-item
          label="来者何人🤬"
          name="username"
          :rules="[{ required: true, message: '别来粘边😒😒😒' }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <div i-streamline-emojis:cow-face />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="通关文牒😊"
          name="password"
          :rules="[{ required: true, message: '牛马一个密码都记不住' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <div streamline-emojis:unicorn-face />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="isRemember">
              但愿人长久，千里共婵娟
            </a-checkbox>
          </a-form-item>
        </a-form-item>

        <a-form-item>
          <a-button float-right :disabled="disabled" type="primary" html-type="submit" @click="handleClickToLogin">
            登录
          </a-button>
        </a-form-item>
      </a-form>

      <template #title>
        <a-tooltip placement="top" title="瞅我干嘛，你个吊毛">
          <span>登录</span>
        </a-tooltip>
      </template>
    </a-card>
  </div>
</template>

<style scoped>
</style>
