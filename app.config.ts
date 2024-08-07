import type { MessageBoxOptions } from '~/components/MessageBox.vue'

export default defineAppConfig({
  ui: {
    primary: 'blue',
  },
  pageScroolTop: 0,

  pageLoading: false,

  contact: {
    github: {
      url: '',
    },
  },

  /**
   * ipc(工信部备案号)
   * china only
   */
  icp: '豫ICP备2024049030号-1',

  me: {
    name: '张宇行',
  },

  messageBox: ({
    type: 'info',
    message: '',
    duration: 2000,
    visible: false,
    position: 'top',
    mask: false,
  } as MessageBoxOptions & { timer?: NodeJS.Timeout }),
})
