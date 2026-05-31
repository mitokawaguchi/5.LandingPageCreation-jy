'use client';

import React from 'react';
import { Ticker } from '@/components/ticker';

const TICKER_ITEMS = [
  { k: 'MIT-STUDIO', v: '+12.4%', c: '#b5fb6b' },
  { k: 'NEXT.JS', v: '16.0', c: '#5ecfff' },
  { k: 'REACT', v: '19.0', c: '#5ecfff' },
  { k: 'COMMITS-30D', v: '+184', c: '#b5fb6b' },
  { k: 'ISSUES', v: '0', c: '#69e6a6' },
  { k: 'UPTIME', v: '99.98%', c: '#69e6a6' },
  { k: 'LAST-DEPLOY', v: '4m ago', c: '#ffb648' },
  { k: 'CAPACITY-Q2', v: '2/3 SLOTS', c: '#ffb648' },
  { k: 'LIGHTHOUSE', v: '99/100/96/100', c: '#b5fb6b' },
  { k: 'i18n', v: 'JA·EN', c: '#b48cff' },
  { k: 'RESPONSE', v: '<24h', c: '#ff5da2' },
];

export function TickerStrip() {
  return (
    <div
      style={{
        background: '#0e1116',
        borderBottom: '1px solid #1a1f28',
        padding: '8px 0',
      }}
    >
      <Ticker items={TICKER_ITEMS} speed={35} />
    </div>
  );
}
