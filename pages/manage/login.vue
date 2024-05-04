<script lang='ts' setup>
import zod from 'zod'

definePageMeta({
  layout: 'empty',
})

const router = useRouter()

const isEmailCodeSend = ref(false)
const form = reactive({
  email: '',
  code: '',
})

const isEmailValid = computed(() => {
  return zod.string().email().safeParse(form.email).success
})

const isCodeValid = computed(() => {
  return zod.string().regex(/^[A-Za-z0-9]{6}$/).safeParse(form.code).success
})

const colorMode = useColorMode()

const loginBg = computed(() => {
  return colorMode.value === 'dark' ? '/svgs/wave-bg-dark.svg' : '/svgs/wave-bg-light.svg'
})

async function handleSendEmailCode() {
  if (!isEmailValid.value) {
    showMessage({
      type: 'error',
      message: 'Invalid email',
    })
    return
  }

  isEmailCodeSend.value = true
  await $fetch('/api/email/code', {
    method: 'POST',
    body: { email: form.email },
  })
  showMessage({
    type: 'success',
    message: 'Email code sent successfully',
  })
}

function handleEmailCodeResend() {
  handleSendEmailCode()
}

async function handleLogin() {
  if (!isCodeValid.value) {
    showMessage({
      type: 'error',
      message: 'Invalid code',
    })
    return
  }

  showMessage({
    type: 'loading',
    message: 'Logging in...',
  })

  const { success } = await $fetch<{ data: any, success: boolean }>('/api/auth/login', {
    method: 'POST',
    body: form,
  })

  if (success) {
    showMessage({
      type: 'success',
      message: 'Login successfully',
    })
    router.push({ path: '/manage' })
  }
  else {
    showMessage({
      type: 'error',
      message: 'Login failed',
    })
  }
}
</script>

<template>
  <div class="hw-full">
    <NuxtImg
      fit="fill"
      hw-full
      format="svg"
      :src="loginBg"
    />

    <div absolute left-10 top-10>
      <DarkToggle />
    </div>

    <div class="right-20 w-100 rounded-6 p-8 shadow-sm <md:ab-c ab-y-c bg-common">
      <section flex justify-between>
        <div>Welcome to <span class="text-blue-4 font-bold">BLOB</span></div>
        <span cursor-pointer text="12px blue-4 hover:blue-5">Sign up</span>
      </section>

      <h1 mb-8 font-bold leading-11 text="10 ">
        Sign in
      </h1>
      <div>
        <div class="mb-5 text-3">
          <h3 class="mb-3">
            Enter your email
          </h3>
          <FloatInput v-model="form.email" placeholder="Email" />
        </div>
        <div v-if="isEmailCodeSend" class="mb-5">
          <h3 class="mb-3">
            Input the code you received
          </h3>
          <FloatInput v-model="form.code" placeholder="Code" />
          <span mt-2 flex justify-between px-2>
            <span text="12px gray-4">Didn't receive the code?</span>
            <span text="12px blue-4" cursor-pointer @click="handleEmailCodeResend">Resend</span>
          </span>
        </div>

        <div class="mt-10">
          <Button v-if="isEmailCodeSend" w-full class="rounded-2!" @click="handleLogin">
            Sign in
          </Button>
          <Button v-else :disabled="!isEmailValid" w-full class="rounded-2!" @click="handleSendEmailCode">
            Send code
          </Button>
        </div>

        <section mt-7>
          <div flex-row-center text-gray-400>
            or
          </div>
          <div class="mt-5 flex-center text-5">
            <NuxtLink external to="/api/auth/github" rounded-2 p-3 class="bg-#f6f6f6 dark:bg-dark-300">
              <div cursor="pointer" bxl:github dark:text-white />
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
