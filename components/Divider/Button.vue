<script setup lang="ts">
interface Props {
  icon: string
}

withDefaults(defineProps<Props>(), {
  icon: 'i-pixelarticons:chevron-right'
})
</script>

<template>
  <button class="divider plain">
    <Divider
      style=""
      foreground="var(--foreground-20)"
      background="var(--background)"
      space="var(--space)"
    >
      <i :class="icon" />
    </Divider>
  </button>
</template>