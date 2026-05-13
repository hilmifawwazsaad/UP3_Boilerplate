<script setup lang="ts">
import { watch } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { toast, Toaster } from 'vue-sonner'
import type { Data } from '@generated/data'
import Wrapper from './Wrapper.vue'

const page = usePage<Data.SharedProps>()

watch(
  () => page.url,
  () => toast.dismiss()
)

watch(
  () => page.props.flash.error,
  (error) => {
    if (error) toast.error(error)
  },
  { immediate: true }
)
</script>

<template>
  <Wrapper>
    <slot></slot>
  </Wrapper>

  <Toaster position="top-right" rich-colors />
</template>
