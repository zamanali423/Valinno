import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

/**
 * Infinite horizontal marquee. The list is rendered twice so the CSS
 * animation can translate -50% for a seamless loop.
 */
export default function Marquee({
  children,
  className,
  duration = 36,
}: MarqueeProps) {
  return (
    <div
      className={cn("relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div
        className="flex w-max shrink-0 animate-marquee items-center"
        style={{ animationDuration: "var(--marquee-duration)" }}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
