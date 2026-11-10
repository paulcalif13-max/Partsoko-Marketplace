'use client';

interface CalreeLogoProps {
  variant?: 'light' | 'dark' | 'header';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showSlogan?: boolean;
  className?: string;
}

export default function CalreeLogo({
  variant = 'header',
  size = 'md',
  showSubtitle = true,
  showSlogan = false,
  className = '',
}: CalreeLogoProps) {
  // Height / scale sizing
  const emblemSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-4xl sm:text-5xl',
  };

  const subtitleSizes = {
    sm: 'text-[8px]',
    md: 'text-[9px] sm:text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  // Color schemes
  // variant='header': for white/light header bar, wordmark is dark slate, bottom emblem is slate-800 so it's visible on white
  // variant='dark': for dark backgrounds (footer, hero), wordmark is pure white, bottom emblem is crisp white
  // variant='light': for white cards
  const isDarkBg = variant === 'dark';
  const wordmarkColor = isDarkBg ? 'text-white' : 'text-slate-900';
  const subtitleColor = isDarkBg ? 'text-slate-400' : 'text-slate-500';
  const emblemBottomFill = isDarkBg ? '#FFFFFF' : '#1E293B';

  return (
    <div className={`flex items-center select-none ${className}`}>
      {/* Geometric 'C' Emblem */}
      <div className={`relative flex-shrink-0 ${emblemSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Facet: Vibrant Calree Emerald Green */}
          <path
            d="M 82 22 L 36 22 L 14 50 L 36 50 L 48 38 L 82 38 Z"
            fill="#00D066"
          />
          {/* Bottom Facet: Contrast Silver/Dark Slate depending on background */}
          <path
            d="M 14 50 L 36 78 L 82 78 L 82 62 L 48 62 L 36 50 Z"
            fill={emblemBottomFill}
          />
        </svg>
      </div>

      {/* Wordmark & Subtitle */}
      <div className="ml-2.5 sm:ml-3 flex flex-col justify-center leading-none">
        <div className="flex items-baseline">
          <span
            className={`font-black tracking-[0.14em] uppercase ${wordmarkColor} ${textSizes[size]}`}
            style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          >
            CALREE
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-bold tracking-[0.26em] uppercase mt-0.5 ${subtitleColor} ${subtitleSizes[size]}`}
          >
            AUTOMOTIVE MARKETPLACE
          </span>
        )}

        {showSlogan && (
          <span className="text-[11px] sm:text-xs text-emerald-400 font-medium tracking-wide mt-1 italic">
            Better parts. Smoother journeys.
          </span>
        )}
      </div>
    </div>
  );
}
