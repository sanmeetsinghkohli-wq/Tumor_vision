'use client';

import { cn } from "@/lib/utils";

interface PageBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'soft' | 'intense';
}

export const PageBackground = ({
  children,
  className,
  variant = 'default',
}: PageBackgroundProps) => {
  const glowOpacity: Record<string, number> = {
    default: 0.12,
    soft: 0.08,
    intense: 0.2,
  };

  return (
    <div className={cn('min-h-screen w-full relative bg-[#FAF0E6]', className)}>
      {/* Centered blue glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% 0%, #528DCB 0%, transparent 70%)`,
          opacity: glowOpacity[variant],
        }}
      />
      {/* Bottom accent */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 40% at 80% 100%, #4B78A0 0%, transparent 60%)`,
          opacity: 0.06,
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default PageBackground;
