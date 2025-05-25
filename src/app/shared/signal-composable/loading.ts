import { computed, signal } from '@angular/core';

export function useLoading() {
  const _loading = signal<boolean>(false);

  const loading = computed(() => _loading());

  const start = () => {
    _loading.set(true);
  };

  const stop = () => {
    _loading.set(false);
  };

  const wrap = async <T>(promise: Promise<T>): Promise<T> => {
    start();
    return promise.finally(stop);
  };

  return { loading: loading(), start, stop, wrap };
}
