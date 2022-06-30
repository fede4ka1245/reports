import {ref, watch} from "vue";

export const useMutationEmitted = (target, ms = 5000) => {
  const isEmitted = ref(false);

  const watcher = (() => {
    let timeoutId;

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      isEmitted.value = true;

      timeoutId = setTimeout(() => {
        isEmitted.value = false;
      }, ms);
    }
  })()

  watch(target, watcher)

  return isEmitted;
}