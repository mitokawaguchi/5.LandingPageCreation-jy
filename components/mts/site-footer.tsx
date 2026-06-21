import { Link } from '@/i18n/navigation';
import { LogoMark } from './logo';
import { mono, sans } from './tokens';

const LEGAL_LINKS: { href: '/privacy' | '/terms' | '/disclaimer' | '/tokushoho' | '/contact'; label: string }[] = [
  { href: '/privacy', label: 'プライバシーポリシー' },
  { href: '/terms', label: '利用規約' },
  { href: '/disclaimer', label: '免責事項' },
  { href: '/tokushoho', label: '特定商取引法に基づく表記' },
  { href: '/contact', label: 'お問い合わせ（窓口）' },
];

export function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid #11151b', padding: 'clamp(40px,6vh,64px) clamp(20px,5vw,56px) clamp(32px,5vh,48px)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <span style={{ display: 'inline-flex', width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
              <LogoMark width={32} height={26} />
            </span>
            <span style={{ fontWeight: 700, fontSize: 14, fontFamily: sans }}>MIT Tech Studio</span>
          </div>
          <div style={{ fontFamily: mono, fontSize: 11, color: '#5b6471', letterSpacing: '.04em' }}>
            © 2026 MIT Tech Studio · Tokyo, Japan
          </div>
        </div>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px' }} aria-label="法務・ポリシー">
          {LEGAL_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="channel-row"
              style={{ fontFamily: mono, fontSize: 11, color: '#5b6471', textDecoration: 'none', letterSpacing: '.02em' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
