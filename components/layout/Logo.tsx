import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  gradientId?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Velinno  home"
      className={cn("group flex items-center shrink-0", className)}
    >
      <div className="relative w-28 h-9 sm:w-32 sm:h-10 md:w-36 md:h-11 lg:w-40 lg:h-12 block isolate">
        {/* The Text Layer: Turned completely white using Tailwind filters */}
        <Image
          src="/images/velinno_logo.png"
          alt="Velinno Logo"
          fill
          sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 160px"
          priority
          className="object-contain object-left brightness-0 invert"
        />

        {/* The Gradient Restore Layer: Restores the colorful V-mark icon on top */}
        <div
          className="absolute inset-0 pointer-events-none object-contain bg-no-repeat object-left mix-blend-screen"
          style={{
            backgroundImage: "url('/images/velinno_logo.png')",
            backgroundSize: "contain",
            // Masking off the text section so only the square 'V' area gets the gradient back
            clipPath: "polygon(0 0, 32% 0, 32% 100%, 0 100%)"
          }}
        />
      </div>
    </Link>
  );
}







{/* <span className="grid h-9 w-9 place-items-center rounded-xl bg-surface ring-1 ring-white/10 transition-shadow duration-300 group-hover:shadow-glow">
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f7cff" />
          <stop offset="0.55" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#c05bff" />
        </linearGradient>
      </defs>
      <path
        d="M5 5 L12 19 L19 5"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.4 5 L12 10.6 L15.6 5"
        fill="none"
        stroke="#05070e"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
  <span className="font-display text-xl font-semibold tracking-tight text-white">
    Velinno
  </span> */}