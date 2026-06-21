/** オープニング演出のオーバーレイ。アニメーションは use-landing-effects が駆動する。 */
export function Intro() {
  return (
    <div id="intro" aria-hidden>
      <div className="ipanel itop" />
      <div className="ipanel ibot" />
      <div className="iseam" />
      <div className="ilogo">
        <svg
          viewBox="0 0 120 100"
          width="clamp(120px,16vw,200px)"
          height="auto"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: 'clamp(120px,16vw,200px)', height: 'auto', overflow: 'visible' }}
        >
          <path
            className="idraw"
            pathLength={100}
            d="M14 80 V26 L42 54 L70 26 V80"
            fill="none"
            stroke="#e9edf2"
            strokeWidth={12}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <rect id="iDot" x={90} y={74} width={12} height={12} rx={2} fill="var(--accent)" />
          <circle className="iburst" cx={96} cy={80} r={5} fill="none" stroke="var(--accent)" strokeWidth={2} />
          <circle className="iburst iburst2" cx={96} cy={80} r={5} fill="none" stroke="var(--accent)" strokeWidth={1.4} />
        </svg>
      </div>
    </div>
  );
}
