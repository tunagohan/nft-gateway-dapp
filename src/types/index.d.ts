import { accessorType } from '@/store/index'

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
    $copyText: any
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
    $copyText: any
  }
}
