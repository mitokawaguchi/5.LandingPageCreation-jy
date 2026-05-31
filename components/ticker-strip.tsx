'use client';

import React from 'react';
import { Ticker } from '@/components/ticker';
import { TICKER_ITEMS } from '@/data/site-content';

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
