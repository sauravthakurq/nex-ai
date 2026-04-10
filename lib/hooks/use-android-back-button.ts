import { useEffect, useRef } from 'react';

export function useAndroidBackButton(isOpen: boolean, onClose: () => void) {
  const isHandlingPopState = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    const handlePopState = (e: PopStateEvent) => {
      isHandlingPopState.current = true;
      e.preventDefault();
      onClose();
    };

    // Push a dummy state to trap the next back navigation
    window.history.pushState({ modalOpen: true }, '');
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // Clean up the dummy state if the modal closed via other means (e.g. click outside)
      if (!isHandlingPopState.current) {
        if (window.history.state && window.history.state.modalOpen) {
          window.history.back();
        }
      }
      isHandlingPopState.current = false;
    };
  }, [isOpen, onClose]);
}
