<script setup lang="ts">
import { uploadWrapper, files, deleteFile } from './actions';

const layout = ref(true)
const compact = ref(false)

//const { upload, uploading } = useUpload()
//const url = await upload(target.files![0])

function changeLayout(bool = !layout.value) {
  uploadWrapper.flip(() => {
    layout.value = bool
  })
}

const urls = computed(() => {
  return files.value.map((file) => URL.createObjectURL(file))
})
</script>

<template>
  <div class="upload" :ref="uploadWrapper.element">
    <div class="layout" v-if="files.length || true">
      <p class="caption">layout: <span>{{ layout ? "image" : "file"}}</span></p>
      <Icon
        class="focus"
        :class="{active: layout, disabled: !files.length && false}"
        icon="i-pixelarticons:image-multiple" 
        @click="() => changeLayout(true)"
        @keyup.enter="() => changeLayout(true)"
        :tabindex="files.length && !layout ? 0 : -1"
      />
      <Icon
        class="focus"
        :class="{active: !layout, disabled: !files.length && false}"
        icon="i-pixelarticons:view-list"
        @click="() => changeLayout(false)"
        @keyup.enter="() => changeLayout(false)"
        :tabindex="files.length && layout ? 0 : -1"
      />
    </div>

    <div 
      class="images" 
      :class="{empty: !files.length}"
    >
      <ImageGallery
        v-if="layout"
        :images="urls"
        :nuxt="false"
        :compact="compact"
      />

      <ImageFiles 
        v-else
        :files="files"
        @delete="deleteFile"
      />
    </div>

    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.upload {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  width: 100%;
}

.layout {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: var(--space-xs);
  background: var(--background);
  padding: 0px var(--space-xs);
  border-radius: var(--radius);
  height: var(--block-size);
}

.layout .icon {
  cursor: pointer;
  height: var(--block-inner-size);
}

.layout .icon.active:not(.disabled) {
  cursor: default;
  pointer-events: none;
  color: var(--accent);
  background-color: var(--accent-20);
}

.layout .icon.disabled {
  pointer-events: none;
  opacity: 0.2;
}

.images.empty {
  display: none;
}
</style>