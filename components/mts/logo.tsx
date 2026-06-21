type LogoMarkProps = { width?: number; height?: number; animated?: boolean };

/** MIT Tech Studio のワードマーク（M 字 + アクセントドット）。 */
export function LogoMark({ width = 34, height = 28, animated = true }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 120 100"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MIT Tech Studio logo"
    >
      <path
        d="M14 80 V26 L42 54 L70 26 V80"
        fill="none"
        stroke="#e9edf2"
        strokeWidth={12}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <rect
        x={90}
        y={74}
        width={12}
        height={12}
        rx={2}
        fill="var(--accent)"
        style={
          animated
            ? { transformBox: 'fill-box', transformOrigin: 'center', animation: 'logoDot 2.6s ease-in-out infinite' }
            : undefined
        }
      />
    </svg>
  );
}
