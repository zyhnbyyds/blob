<script setup lang="ts">
import { theme } from 'ant-design-vue';
import './style/css/global.css';

const app = useAppConfig();

const antDTheme = ref(theme.darkAlgorithm);

onNuxtReady(() => {
  const colorMode = useColorMode();
  const isPrefersDark = usePreferredDark();

  watchEffect(() => {
    colorMode.preference = isPrefersDark.value ? 'dark' : 'light';
  });

  watchEffect(() => {
    antDTheme.value =
      colorMode.preference === 'dark'
        ? theme.darkAlgorithm
        : theme.defaultAlgorithm;
  });

  watch(
    () => app.pageLoading,
    (val) => {
      nextTick(() => {
        if (val) app.pageLoading = false;
      });
    },
  );
});
</script>

<template>
  <div hw-full>
    <NuxtLoadingIndicator :height="8" :duration="5000" />
    <NuxtLayout>
      <AConfigProvider
        :theme="{
          algorithm: antDTheme,
        }"
      >
        <NuxtPage
          v-if="!app.pageLoading"
          :transition="{ name: 'fade', mode: 'out-in', duration: 200 }"
        />
      </AConfigProvider>
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
@import url(./style/scss/global.scss);
@import url(./style/css/global.css);
</style>
