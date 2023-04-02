import { useEffect } from 'react';

export const useOutsideClick = (ref, action) => {

  useEffect(() => {
    document.addEventListener('mousedown', action);

    return () => document.removeEventListener('mousedown', action);
  });
}