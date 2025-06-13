'use client';

import { useEffect } from 'react';

/**
 * Hook to handle browser/mobile back button when a modal is open.
 * It prevents navigation by pushing a new history state when modal opens,
 * and listens for popstate events to run a closeModal function instead of navigating.
 *
 * @param isModalOpen boolean - whether the modal is currently open
 * @param closeModal () => void - function to close the modal
 */
export const useModalBackButton = (isModalOpen: boolean, closeModal: () => void) => {
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (isModalOpen) {
        event.preventDefault();
        closeModal();
        // Push the same state back so user stays on the same page
        history.pushState(null, '', location.href);
      }
    };

    if (isModalOpen) {
      // Push a new state when modal opens
      history.pushState(null, '', location.href);
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      if (isModalOpen) {
        window.removeEventListener('popstate', handlePopState);
      }
    };
  }, [isModalOpen, closeModal]);
};

