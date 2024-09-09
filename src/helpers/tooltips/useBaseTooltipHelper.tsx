import { useState } from 'react';
import {
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useDismiss,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react';

export function useBaseTooltipHelper() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
  ]);

  return { isOpen, refs, floatingStyles, getReferenceProps, getFloatingProps };
}
