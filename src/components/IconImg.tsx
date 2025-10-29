import { useState } from 'react'

type IconImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackLabel?: string
}

export default function IconImg({ fallbackLabel = '', ...props }: IconImgProps) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <span
        aria-hidden
        className={props.className}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        title={fallbackLabel}
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" className="opacity-60">
          <rect x="3" y="3" width="18" height="18" rx="4" />
        </svg>
      </span>
    )
  }

  return <img {...props} onError={() => setErrored(true)} />
}


