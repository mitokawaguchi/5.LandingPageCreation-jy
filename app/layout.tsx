import React from "react"
import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP, Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: '--font-noto' });
const roboto = Roboto({ weight: ['400', '700'], subsets: ["latin"], variable: '--font-roboto' });

export const metadata: Metadata = {
  title: 'Mit Tech Studio | Engineering meets Creativity',
  description: 'Web制作・開発スタジオ Mit Tech Studio のポートフォリオ。デザインとエンジニアリングの融合により、未来を創るWeb体験を提供します。',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${inter.variable} ${notoSansJP.variable} ${roboto.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
