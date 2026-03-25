'use client';

import { useEffect } from 'react';

function scrollToId(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) {
    return false;
  }
  el.scrollIntoView({ behavior: 'smooth' });
  return true;
}

/**
 * 別ページから /ja#about 等で来たとき、セクションが dynamic で遅延マウントするまでリトライする。
 */
export function HashScrollOnMount() {
  useEffect(() => {
    const raw = window.location.hash;
    if (!raw || raw.length < 2) {
      return;
    }
    const id = decodeURIComponent(raw.slice(1));
    if (!id) {
      return;
    }

    let attempts = 0;
    const maxAttempts = 50;

    const tick = () => {
      if (scrollToId(id)) {
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        window.setTimeout(tick, 60);
      }
    };

    tick();
  }, []);

  return null;
}
