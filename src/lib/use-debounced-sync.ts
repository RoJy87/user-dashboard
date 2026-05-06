"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Локальный буфер поверх внешнего значения (обычно — из URL).
 *
 * Паттерн "adjust state when prop changes": external сравнивается с его
 * предыдущим известным значением в рендере и при расхождении буфер
 * синхронизируется. Коммит наверх — через debounce.
 *
 * `onCommit` не обязан быть стабильным: мы держим свежую ссылку в ref,
 * чтобы таймер не рестартовал при каждом пересоздании callback'а.
 */
export function useDebouncedSync(
  external: string,
  onCommit: (value: string) => void,
  delay = 300,
) {
  const [value, setValue] = useState(external);
  const [lastExternal, setLastExternal] = useState(external);

  if (external !== lastExternal) {
    setLastExternal(external);
    setValue(external);
  }

  const commitRef = useRef(onCommit);
  useEffect(() => {
    commitRef.current = onCommit;
  }, [onCommit]);

  useEffect(() => {
    if (value === external) return;
    const timer = setTimeout(() => commitRef.current(value), delay);
    return () => clearTimeout(timer);
  }, [value, external, delay]);

  return [value, setValue] as const;
}
