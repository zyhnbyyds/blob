<script lang='ts' setup>
import zod from 'zod'

definePageMeta({
  layout: 'empty',
})
const isEmailCodeSend = ref(false)
const form = reactive({
  email: '',
  code: '',
})

const isEmailValid = computed(() => {
  return zod.string().email().safeParse(form.email).success
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

function handleLogin() {
  $fetch<{ data: any, success: boolean }>('/api/auth/login', {
    method: 'POST',
    body: form,
  }).then((data) => {
    if (data.success) {
      showMessage({
        type: 'success',
        message: 'Login successfully',
      })
      useRouter().push('/manage')
    }
    else {
      showMessage({
        type: 'error',
        message: 'Login failed',
      })
    }
  })
}
</script>

<template>
  <div class="hw-full bg-#0089ED">
    <div absolute left-10 top-10>
      <DarkToggle />
    </div>

    <div class="right-10 w-100 rounded-6 p-8 shadow-sm ab-y-c bg-common">
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
            <div rounded-2 p-3 class="bg-#f6f6f6 dark:bg-dark-300">
              <div cursor="pointer" bxl:github dark:text-white />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
