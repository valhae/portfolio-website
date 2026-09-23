/**
 * The turbulence filters every brush stroke and torii mark points at, defined
 * once for the whole document. Repeating <defs> per instance would duplicate
 * ids, and a route change could unmount the one instance the rest reference.
 */
export function InkFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute" }}
    >
      <defs>
        <filter id="ink-hair" x="-5%" y="-40%" width="110%" height="180%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.4"
            numOctaves="3"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="ink-full" x="-5%" y="-40%" width="110%" height="180%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.32"
            numOctaves="3"
            seed="13"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="ink-torii" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035 0.09"
            numOctaves="4"
            seed="11"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
