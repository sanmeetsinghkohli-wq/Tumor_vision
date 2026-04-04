'use client';

import { cn } from "@/lib/utils";

interface PageBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'soft' | 'intense';
}

/**
 * Base background for all pages.
 * White base with a centered soft rose radial glow (multiply blend).
 */
export const PageBackground = ({
  children,
  className,
  variant = 'default',
}: PageBackgroundProps) => {
  const glowColor: Record<string, string> = {
    default: '#F9AAAD',
    soft:    '#f5c8ca',
    intense: '#C5757C',
  };

  return (
    <div
      className={cn('min-h-screen w-full relative bg-white', className)}
    >
      {/* Primary centered rose glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${glowColor[variant]} 0%, transparent 70%)`,
          opacity: 0.55,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Secondary accent glow — top-right */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 80% 15%, #F9AAAD 0%, transparent 55%)`,
          opacity: 0.3,
          mixBlendMode: 'multiply',
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
