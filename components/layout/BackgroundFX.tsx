/**
 * Fixed, non-interactive ambient background  gradient aurora blobs + faint grid.
 * Rendered once in the root layout, behind everything.
 */
export default function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60rem 40rem at 85% -10%, rgba(79,124,255,0.12), transparent 60%), radial-gradient(50rem 36rem at -10% 30%, rgba(139,92,246,0.1), transparent 60%), radial-gradient(44rem 32rem at 60% 110%, rgba(192,91,255,0.08), transparent 60%)",
        }}
      />
      {/* Faint grid */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      {/* Top hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent" />
    </div>
  );
}
