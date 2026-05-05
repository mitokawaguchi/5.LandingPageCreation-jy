import type { SVGProps } from 'react';

export function ZennIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 17.5 15.8 6.7c1.2-1.2 3.2-.4 3.2 1.3v8.4c0 .9-.7 1.6-1.6 1.6H5.7c-.6 0-.9-.3-.7-.5Z"
        fill="currentColor"
      />
      <path
        d="M5 12.4 10.8 6.6c1-1 2.7-.3 2.7 1.1v4.8c0 .8-.6 1.4-1.4 1.4H5.6c-.5 0-.8-.8-.6-1.5Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}
