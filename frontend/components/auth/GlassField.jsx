// frontend/components/auth/GlassField.jsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function GlassField({ label, icon, revealable = false, className, type, ...props }) {
  const [reveal, setReveal] = useState(false);
  return (
    <div className="space-y-2">
      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--muted-foreground)" }}>
        {label}
      </label>
      <div
        className="group flex items-center gap-3 rounded-2xl px-4 backdrop-blur-xl transition-all duration-300"
        style={{ border: "1px solid var(--border)", background: "rgba(255,255,255,0.04)" }}
      >
        <span className="shrink-0 transition-colors" style={{ color: "var(--muted-foreground)" }}>{icon}</span>
        <input
          {...props}
          type={revealable ? (reveal ? "text" : "password") : type}
          className={`min-w-0 flex-1 bg-transparent py-4 text-sm outline-none ${className ?? ""}`}
          style={{ color: "var(--foreground)" }}
        />
        {revealable && (
          <button
            type="button"
            onClick={() => setReveal((v) => !v)}
            aria-label={reveal ? "Hide password" : "Show password"}
            className="shrink-0 transition-colors"
            style={{ color: "var(--muted-foreground)" }}
          >
            {reveal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}