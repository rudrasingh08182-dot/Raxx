// frontend/components/auth/AuthShell.jsx

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--background)" }} />
      <img
        src="/robot.jpg"
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 top-0 max-h-[75vh] w-full max-w-[560px] -translate-x-1/2 object-contain object-top opacity-75"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.13 0.008 160 / 35%) 0%, oklch(0.13 0.008 160 / 72%) 42%, var(--background) 78%)",
        }}
      />
      <div
        className="absolute -left-32 top-[-10%] h-[520px] w-[520px] rounded-full blur-[140px] animate-float-slow"
        style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)", opacity: 0.2 }}
      />
      <div
        className="absolute -right-40 top-1/3 h-[560px] w-[560px] rounded-full blur-[150px] animate-pulse-glow"
        style={{ background: "radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)", opacity: 0.16 }}
      />
      <div
        className="absolute bottom-[-20%] left-1/4 h-[480px] w-[480px] rounded-full blur-[160px] animate-float-slow"
        style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)", opacity: 0.12 }}
      />
    </div>
  );
}

export function BrandHeader({ tagline }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div
          className="absolute inset-0 rounded-[26px] blur-2xl animate-pulse-glow"
          style={{ background: "var(--gradient-emerald)" }}
        />
        <div
          className="glow-ring relative grid h-[74px] w-[74px] place-items-center rounded-[26px] text-3xl font-black"
          style={{ background: "var(--gradient-emerald)", color: "var(--primary-foreground)" }}
        >
          R
        </div>
      </div>
      <h1 className="mt-5 text-3xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>
        RAXX AI
      </h1>
      <div
        className="mt-3 flex items-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-xl"
        style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)" }}
      >
        <span className="h-2 w-2 rounded-full" style={{ background: "var(--primary)", boxShadow: "0 0 10px var(--primary)" }} />
        <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{tagline}</span>
      </div>
    </div>
  );
}

export function AuthLayout({ children }) {
  return (
    <main className="relative min-h-screen w-full">
      <AmbientBackground />
      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-end gap-6 px-5 pb-8 pt-[36vh]">
        {children}
      </div>
    </main>
  );
}

export function TrustRow() {
  return (
    <div className="animate-rise flex items-center justify-center gap-6 text-[11px] font-medium tracking-wide" style={{ color: "var(--muted-foreground)" }}>
      <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--primary)" }} /> Secure</span>
      <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--primary)", opacity: 0.6 }} /> Encrypted</span>
      <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--primary)", opacity: 0.4 }} /> AI-Powered</span>
    </div>
  );
}