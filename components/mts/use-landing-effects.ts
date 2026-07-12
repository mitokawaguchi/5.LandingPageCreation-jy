'use client';

import { useEffect, type RefObject } from 'react';

/**
 * MIT Tech Studio.dc.html の componentDidMount を React フックに移植したもの。
 * root 配下の `.reveal` / `.rise` / `.kc` / `[data-bar]` / `[data-countup]` を
 * DOM 操作で順次アニメーションさせ、オープニング演出・カスタムカーソル・
 * パララックスを起動する。prefers-reduced-motion を尊重する。
 */
export function useLandingEffects<T extends HTMLElement>(root: RefObject<T | null>): void {
  useEffect(() => {
    const el = root.current;
    if (!el || typeof window === 'undefined') return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let io: IntersectionObserver | null = null;
    let raf = 0;
    const cleanups: Array<() => void> = [];

    const animateNode = (node: HTMLElement) => {
      node.classList.add('in');
      node.classList.add('in-view');
      node.style.opacity = '1';
      node.style.transform = 'none';
      node.style.filter = 'none';
      if (node.classList.contains('wipe')) node.style.clipPath = 'inset(-18% -2% -18% -2%)';
      const bar = node.matches('[data-bar]') ? node : node.querySelector<HTMLElement>('[data-bar]');
      if (bar) {
        const v = bar.getAttribute('data-bar');
        requestAnimationFrame(() => {
          bar.style.width = `${v}%`;
        });
      }
      const cu =
        node.querySelector<HTMLElement>('[data-countup]') ??
        (node.matches('[data-countup]') ? node : null);
      if (cu && !cu.dataset.done) {
        cu.dataset.done = '1';
        const target = parseInt(cu.getAttribute('data-countup') ?? '0', 10) || 0;
        if (reduced) {
          cu.textContent = String(target);
        } else {
          const t0 = performance.now();
          const dur = 1100;
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            cu.textContent = String(Math.round(target * (1 - (1 - p) ** 3)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      }
    };

    const splitWord = (span: HTMLElement): HTMLElement[] => {
      const frag = document.createDocumentFragment();
      const letters: HTMLElement[] = [];
      Array.from(span.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          (n.textContent ?? '').split('').forEach((ch) => {
            const s = document.createElement('span');
            s.className = 'kc';
            s.textContent = ch === ' ' ? '\u00a0' : ch;
            frag.appendChild(s);
            letters.push(s);
          });
        } else if (n instanceof HTMLElement) {
          n.classList.add('kc');
          frag.appendChild(n);
          letters.push(n);
        }
      });
      span.textContent = '';
      span.appendChild(frag);
      return letters;
    };

    const heroSection = el.querySelector<HTMLElement>('#home');
    const allNodes = Array.from(el.querySelectorAll<HTMLElement>('.reveal, .rise'));
    const heroNodes = allNodes.filter((n) => heroSection?.contains(n));
    const restNodes = allNodes.filter((n) => !heroSection?.contains(n));

    let kinetic: HTMLElement[] = [];
    if (!reduced && heroSection) {
      const big = Array.from(heroSection.querySelectorAll<HTMLElement>('.hero-line > .rise'));
      [big[0], big[2]].filter(Boolean).forEach((t) => {
        t.classList.add('in');
        t.style.opacity = '1';
        t.style.transform = 'none';
        t.style.filter = 'none';
        kinetic = kinetic.concat(splitWord(t));
      });
    }

    const revealHero = () => {
      heroNodes.forEach((n, i) => timers.push(setTimeout(() => animateNode(n), 120 + i * 90)));
      kinetic.forEach((s, i) => timers.push(setTimeout(() => s.classList.add('in'), 280 + i * 30)));
    };

    // ── custom cursor ──
    if (!reduced && !window.matchMedia?.('(pointer:coarse)').matches) {
      const c = document.getElementById('cursor');
      const d = document.getElementById('cursorDot');
      if (c && d) {
        let cx = window.innerWidth / 2;
        let cy = window.innerHeight / 2;
        let x = cx;
        let y = cy;
        let active = false;
        const move = (e: MouseEvent) => {
          cx = e.clientX;
          cy = e.clientY;
          if (!active) {
            active = true;
            d.style.opacity = '1';
          }
          d.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        };
        window.addEventListener('mousemove', move, { passive: true });
        const loop = () => {
          x += (cx - x) * 0.18;
          y += (cy - y) * 0.18;
          c.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          raf = requestAnimationFrame(loop);
        };
        c.style.opacity = '0';
        d.style.opacity = '0';
        loop();
        const hot = 'a, button, .flip-card, .sns-card, input, textarea';
        const over = (e: MouseEvent) => {
          if ((e.target as HTMLElement)?.closest?.(hot)) document.body.classList.add('cursor-hot');
        };
        const out = (e: MouseEvent) => {
          const rel = e.relatedTarget as HTMLElement | null;
          if ((e.target as HTMLElement)?.closest?.(hot) && !rel?.closest?.(hot)) {
            document.body.classList.remove('cursor-hot');
          }
        };
        document.addEventListener('mouseover', over);
        document.addEventListener('mouseout', out);
        cleanups.push(() => {
          window.removeEventListener('mousemove', move);
          document.removeEventListener('mouseover', over);
          document.removeEventListener('mouseout', out);
          document.body.classList.remove('cursor-hot');
        });
      }
    }

    // ── parallax ──
    if (!reduced) {
      const els = Array.from(el.querySelectorAll<HTMLElement>('[data-parallax]'));
      if (els.length) {
        let ticking = false;
        const update = () => {
          ticking = false;
          const center = window.scrollY + window.innerHeight / 2;
          els.forEach((node) => {
            const r = node.getBoundingClientRect();
            const elCenter = window.scrollY + r.top + r.height / 2;
            const speed = parseFloat(node.getAttribute('data-parallax') ?? '0') || 0;
            node.style.transform = `translate3d(0, ${((elCenter - center) * speed).toFixed(1)}px, 0)`;
          });
        };
        const onScroll = () => {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
          }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        update();
        cleanups.push(() => {
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        });
      }
    }

    // ── scroll progress (--scrollp) ──
    if (!reduced) {
      let spTicking = false;
      const updateSp = () => {
        spTicking = false;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight || 1;
        const p = Math.min(1, Math.max(0, window.scrollY / max));
        doc.style.setProperty('--scrollp', p.toFixed(4));
      };
      const onSp = () => {
        if (!spTicking) {
          spTicking = true;
          requestAnimationFrame(updateSp);
        }
      };
      window.addEventListener('scroll', onSp, { passive: true });
      window.addEventListener('resize', onSp);
      updateSp();
      cleanups.push(() => {
        window.removeEventListener('scroll', onSp);
        window.removeEventListener('resize', onSp);
      });
    }

    // ── offscreen / tab-hidden pause for looping ambient motion ──
    if (!reduced && 'IntersectionObserver' in window) {
      const loopSections = Array.from(
        el.querySelectorAll<HTMLElement>('#home, #about, #works, #writing, #contact'),
      );
      const ioPause = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            (e.target as HTMLElement).classList.toggle('paused', !e.isIntersecting);
          });
        },
        { threshold: 0 },
      );
      loopSections.forEach((s) => ioPause.observe(s));
      const onVis = () => {
        document.documentElement.classList.toggle('tab-hidden', document.hidden);
      };
      document.addEventListener('visibilitychange', onVis);
      cleanups.push(() => {
        ioPause.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        document.documentElement.classList.remove('tab-hidden');
      });
    }

    // ── kinetic headings ([data-split]) + shine sweep ──
    if (!reduced) {
      const addChar = (ch: string, dest: Node, letters: HTMLElement[]) => {
        const s = document.createElement('span');
        s.className = 'kw';
        s.textContent = ch;
        dest.appendChild(s);
        letters.push(s);
      };
      const buildInto = (src: Node, dest: Node, letters: HTMLElement[]) => {
        Array.from(src.childNodes).forEach((n) => {
          if (n.nodeType === 3) {
            const text = n.textContent ?? '';
            if (text.includes(' ')) {
              // スペース区切り（英字など）は単語単位で改行を許し、語中では割らない
              const parts = text.split(' ');
              parts.forEach((part, wi) => {
                if (wi > 0) dest.appendChild(document.createTextNode(' '));
                if (part === '') return;
                const word = document.createElement('span');
                word.style.display = 'inline-block';
                word.style.whiteSpace = 'nowrap';
                for (const ch of part) addChar(ch, word, letters);
                dest.appendChild(word);
              });
            } else {
              // CJK など空白の無いテキストは 1 文字単位（自然な折り返しを維持）
              for (const ch of text) addChar(ch, dest, letters);
            }
          } else if (n.nodeName === 'BR') {
            dest.appendChild(document.createElement('br'));
          } else if (n instanceof HTMLElement) {
            const wrap = n.cloneNode(false) as HTMLElement;
            dest.appendChild(wrap);
            buildInto(n, wrap, letters);
          }
        });
      };
      const heads = Array.from(el.querySelectorAll<HTMLElement>('[data-split]'));
      const splitMap = new Map<HTMLElement, HTMLElement[]>();
      heads.forEach((h) => {
        const letters: HTMLElement[] = [];
        const holder = document.createElement('span');
        buildInto(h, holder, letters);
        h.textContent = '';
        while (holder.firstChild) h.appendChild(holder.firstChild);
        splitMap.set(h, letters);
      });
      const revealHead = (h: HTMLElement) => {
        const ws = splitMap.get(h) ?? [];
        ws.forEach((s, i) => timers.push(setTimeout(() => s.classList.add('in'), i * 26)));
        if (h.classList.contains('shine')) {
          timers.push(setTimeout(() => h.classList.add('lit'), Math.min(ws.length, 12) * 26 + 140));
        }
      };
      if ('IntersectionObserver' in window) {
        const ioH = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (!e.isIntersecting) return;
              ioH.unobserve(e.target);
              revealHead(e.target as HTMLElement);
            });
          },
          { threshold: 0.25, rootMargin: '0px 0px -8% 0px' },
        );
        heads.forEach((h) => ioH.observe(h));
        cleanups.push(() => ioH.disconnect());
      } else {
        heads.forEach(revealHead);
      }
    }

    // ── pointer-driven 3D tilt + magnetic (fine pointer only) ──
    if (!reduced && window.matchMedia?.('(pointer:fine)').matches) {
      el.querySelectorAll<HTMLElement>('[data-tilt]').forEach((node) => {
        let rafT = 0;
        const orig = node.style.transition;
        const onEnter = () => {
          if (node.classList.contains('reveal') && !node.classList.contains('in')) return;
          node.style.transition = 'transform .12s cubic-bezier(.16,1,.3,1)';
        };
        const onMove = (e: PointerEvent) => {
          if (node.classList.contains('reveal') && !node.classList.contains('in')) return;
          if (rafT) return;
          rafT = requestAnimationFrame(() => {
            rafT = 0;
            const r = node.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            const max = 5.5;
            node.style.transform = `perspective(900px) rotateY(${(px * max).toFixed(2)}deg) rotateX(${(-py * max).toFixed(2)}deg)`;
          });
        };
        const onLeave = () => {
          if (rafT) {
            cancelAnimationFrame(rafT);
            rafT = 0;
          }
          node.style.transition = orig || 'transform .5s cubic-bezier(.16,1,.3,1)';
          node.style.transform = node.classList.contains('reveal') ? 'none' : '';
        };
        node.addEventListener('pointerenter', onEnter);
        node.addEventListener('pointermove', onMove);
        node.addEventListener('pointerleave', onLeave);
        cleanups.push(() => {
          node.removeEventListener('pointerenter', onEnter);
          node.removeEventListener('pointermove', onMove);
          node.removeEventListener('pointerleave', onLeave);
        });
      });

      el.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((node) => {
        let rafM = 0;
        const onMove = (e: PointerEvent) => {
          if (rafM) return;
          rafM = requestAnimationFrame(() => {
            rafM = 0;
            const r = node.getBoundingClientRect();
            const mx = e.clientX - (r.left + r.width / 2);
            const my = e.clientY - (r.top + r.height / 2);
            node.style.transform = `translate(${(mx * 0.3).toFixed(1)}px, ${(my * 0.3).toFixed(1)}px)`;
          });
        };
        const onLeave = () => {
          if (rafM) {
            cancelAnimationFrame(rafM);
            rafM = 0;
          }
          node.style.transform = '';
        };
        node.addEventListener('pointermove', onMove);
        node.addEventListener('pointerleave', onLeave);
        cleanups.push(() => {
          node.removeEventListener('pointermove', onMove);
          node.removeEventListener('pointerleave', onLeave);
        });
      });
    }

    el.querySelectorAll<HTMLElement>('.sns-card[data-brand]').forEach((node) => {
      const b = node.getAttribute('data-brand');
      if (b) node.style.setProperty('--b', b);
    });
    el.querySelectorAll<HTMLElement>('.skill-card[data-c]').forEach((node) => {
      const c = node.getAttribute('data-c');
      if (c) node.style.setProperty('--c', c);
    });

    if (reduced || !('IntersectionObserver' in window)) {
      allNodes.forEach(animateNode);
      const intro0 = document.getElementById('intro');
      if (intro0) intro0.style.display = 'none';
      return () => {
        timers.forEach(clearTimeout);
        cleanups.forEach((fn) => fn());
      };
    }

    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const node = e.target as HTMLElement;
          io?.unobserve(node);
          const sibs = Array.from(node.parentElement?.children ?? []).filter(
            (c) => c.classList?.contains('reveal') || c.classList?.contains('rise'),
          );
          const i = Math.max(0, sibs.indexOf(node));
          timers.push(setTimeout(() => animateNode(node), i * 105));
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    restNodes.forEach((n) => io?.observe(n));

    timers.push(
      setTimeout(() => {
        restNodes.forEach((n) => {
          if (n.classList.contains('in')) return;
          const r = n.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) animateNode(n);
        });
      }, 3000),
    );

    // ── opening sequence ──
    const intro = document.getElementById('intro');
    if (intro) {
      document.body.style.overflow = 'hidden';
      try {
        window.scrollTo(0, 0);
      } catch {
        /* noop */
      }
      const flyLogo = () => {
        const ilogo = intro.querySelector<HTMLElement>('.ilogo');
        const isvg = ilogo?.querySelector('svg');
        const navMark = document.getElementById('navLogoMark');
        const navSvg = navMark?.querySelector('svg');
        if (!ilogo || !isvg || !navMark || !navSvg) return;
        const a = isvg.getBoundingClientRect();
        const b = navSvg.getBoundingClientRect();
        if (!a.width || !b.width) return;
        const scale = b.width / a.width;
        const dx = b.left + b.width / 2 - (a.left + a.width / 2);
        const dy = b.top + b.height / 2 - (a.top + a.height / 2);
        navMark.style.opacity = '0';
        ilogo.style.transition = 'transform 1s cubic-bezier(.76,0,.24,1)';
        requestAnimationFrame(() => {
          ilogo.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
        });
      };
      timers.push(setTimeout(() => intro.classList.add('charge'), 1480));
      timers.push(
        setTimeout(() => {
          intro.classList.remove('charge');
          const seam = intro.querySelector<HTMLElement>('.iseam');
          const dot = document.getElementById('iDot');
          if (seam && dot) {
            const r = dot.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cyPct = ((r.top + r.height / 2) / window.innerHeight) * 100;
            seam.style.top = `${r.top + r.height / 2}px`;
            seam.style.transformOrigin = `${cx}px center`;
            const itop = intro.querySelector<HTMLElement>('.itop');
            const ibot = intro.querySelector<HTMLElement>('.ibot');
            if (itop && ibot) {
              itop.style.height = `${cyPct.toFixed(2)}%`;
              ibot.style.height = `${(100 - cyPct).toFixed(2)}%`;
            }
          }
          intro.classList.add('seam');
        }, 1980),
      );
      timers.push(
        setTimeout(() => {
          intro.classList.add('open');
          flyLogo();
        }, 2480),
      );
      timers.push(setTimeout(revealHero, 2760));
      timers.push(
        setTimeout(() => {
          const navMark = document.getElementById('navLogoMark');
          if (navMark) navMark.style.opacity = '1';
          intro.style.display = 'none';
          document.body.style.overflow = '';
        }, 3720),
      );
    } else {
      revealHero();
    }

    return () => {
      timers.forEach(clearTimeout);
      if (io) io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
      document.body.style.overflow = '';
    };
  }, [root]);
}
