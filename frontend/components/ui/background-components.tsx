'use client';

import { cn } from "@/lib/utils";

interface PageBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  /** Which glow variant to use */
  variant?: 'default' | 'soft' | 'intense';
}

/**
 * Base background for all pages.
 * Dark #140E1C base with a centered rose/mauve radial glow.
 */
export const PageBackground = ({
  children,
  className,
  variant = 'default',
}: PageBackgroundProps) => {
  const glowStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundImage: `radial-gradient(circle at center, #683A46 0%, transparent 70%)`,
      opacity: 0.55,
    },
    soft: {
      backgroundImage: `radial-gradient(circle at center, #462037 0%, transparent 65%)`,
      opacity: 0.45,
    },
    intense: {
      backgroundImage: `radial-gradient(circle at center, #C5757C 0%, transparent 65%)`,
      opacity: 0.4,
    },
  };

  return (
    <div
      className={cn(
        'min-h-screen w-full relative',
        className
      )}
      style={{ background: '#140E1C' }}
    >
      {/* Radial rose glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={glowStyles[variant]}
      />

      {/* Secondary accent glow — top-right */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 20%, #462037 0%, transparent 50%)`,
          opacity: 0.3,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default PageBackground;
