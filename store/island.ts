export const useIsland = () => {
  const hover = ref(false)
  const mode = ref<'default' | 'text'>('default')
  const mode2 = ref<'default' | 'text'>('default')
  return useState('island', () => ({hover: hover.value, mode: mode.value, mode2: mode2.value}))
}
