<script lang='ts' setup></script>

<template>
  <div class="h-25 flex-col-center justify-between px-8 py-6">
    <h1 text-8 class="text-#0A112F font-600 transition-colors dark:text-gray-200">
      Good morning blob.
    </h1>

    <div flex-col-center gap-7>
      <DarkToggle />

      <Button size="sm" icon="carbon:add-filled">
        Write An Article
      </Button>

      <div class="carbon:notification-filled text-lg text-#9096A2" />

      <div flex gap-3>
        <img src="/public/logo.ico" h-10 w-10 rounded-full>

        <section flex flex-col justify-between>
          <h4 text-sm font-500 class="text-#0A112F transition-colors dark:text-gray-400">
            ZhangYH
          </h4>
          <h5 text-3 class="text-#70707A">
            Developer
          </h5>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
