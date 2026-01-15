import { useEffect } from 'react';

const DEFAULT_TITLE = 'Artificial Ignorance — Automating Business Operations, Conversations & Client Experiences.';

export function usePageTitle(title?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title || DEFAULT_TITLE;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
