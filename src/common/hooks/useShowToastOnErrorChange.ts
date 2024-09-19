import { useState, useEffect } from 'react';

import { Toast } from '@/utils/Toast';

interface ShowToastOnErrorChangeOptions {
  error?: string | null;
}

export function useShowToastOnErrorChange({
  error,
}: ShowToastOnErrorChangeOptions) {
  const [prevError, setPrevError] = useState<string | null>(null);

  useEffect(() => {
    if (error !== prevError) {
      setPrevError(error || null);

      if (error) {
        Toast.showError(error);
      }
    }
  }, [error, prevError, setPrevError]);
}
