'use client';

import React from 'react';
import { Ticker } from '@/components/ticker';

const T = {
  accent: '#b5fb6b', warn: '#ffb648', pink: '#ff5da2',
  blue: '#5ecfff', green: '#69e6a6', purple: '#b48cff',
};

const TICKER_ITEMS = [
  { k: 'MIT-STUDIO', v: '+12.4%', c: T.accent, tag: '90d' },
  { k: 'NEXT.JS', v: '16.0', c: T.blue },
  { k: 'REACT', v: '19.0', c: T.blue },
  { k: 'COMMITS-30D', v: '+184', c: T.accent, tag: 'up' },
  { k: 'ISSUES', v: '0', c: T.green },
  { k: 'UPTIME', v: '99.98%', c: T.green },
  { k: 'LAST-DEPLOY', v: '4m ago', c: T.warn },
  { k: 'CAPACITY-Q2', v: '2/3 SLOTS', c: T.warn },
  { k: 'LIGHTHOUSE', v: '99/100/96/100', c: T.accent },
  { k: 'i18n', v: 'JA·EN', c: T.purple },
  { k: 'RESPONSE', v: '<24h', c: T.pink },
];

export function TickerStrip() {
  return (
    <div
      style={{
        background: '#0e1116',
        borderBottom: '1px solid #1a1f28',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
        <Ticker items={TICKER_ITEMS} speed={32} />
      </div>
    </div>
  );
}
