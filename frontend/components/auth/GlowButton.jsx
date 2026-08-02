// frontend/components/auth/GlowButton.jsx

export function GlowButton({ children, loading = false, ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      style={{ background: "var(--gradient-emerald)" }}
      className="glow-ring group flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
    >
      <span style={{ color: "var(--primary-foreground)" }} className="flex items-center gap-2">
        {loading ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2"
              style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "var(--primary-foreground)" }}
            />
            Authenticating…
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
}