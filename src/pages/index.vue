<template>
  <div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const message = 'test'
    return {
      message,
    }
  },
})
</script>
