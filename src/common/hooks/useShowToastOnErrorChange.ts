import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

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
        toast(error, {
          type: 'error',
        });
      }
    }
  }, [error, prevError, setPrevError]);
}
