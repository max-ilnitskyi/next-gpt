import { useCallback, useState } from 'react';

export function useToggle(initialValue?: boolean) {
  const [value, setValue] = useState<boolean>(initialValue || false);

  const toggle = useCallback<() => void>(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle] as const;
}
