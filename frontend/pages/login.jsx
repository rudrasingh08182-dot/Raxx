import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import supabase from "../utils/supabase";
import { Card } from "../components/ui/card";
import { Spotlight } from "../components/ui/spotlight";

const SplineScene = dynamic(
  () => import("../components/ui/spline-scene").then((mod) => ({ default: mod.SplineScene })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    ),
  }
);

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) {
        setError("Wrong email or password. Try again.");
        setLoading(false);
        return;
      }
      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single();

      const role = profile?.role;
      if (role === "teacher") router.push("/dashboard/teacher");
      else if (role === "parent") router.push("/dashboard/parent");
      else router.push("/dashboard/student");
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, -25px) scale(1.05); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.6; }
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleTap {
          0% { transform: scale(1); }
          50% { transform: scale(0.97); }
          100% { transform: scale(1); }
        }
        .rise { animation: rise 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .glass-btn:active { animation: scaleTap 0.2s ease; }
        input::placeholder { color: rgba(255,255,255,0.28); }
      `}</style>

      <div className="relative min-h-screen flex flex-col items-center px-4 py-8 overflow-hidden" style={{ background: "#090909" }}>
        {/* AMBIENT BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-20 w-[420px] h-[420px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,255,136,0.16) 0%, transparent 70%)", filter: "blur(90px)", animation: "floatSlow 12s ease-in-out infinite, pulseGlow 6s ease-in-out infinite" }} />
          <div className="absolute -bottom-32 -right-24 w-[380px] h-[380px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(41,241,156,0.14) 0%, transparent 70%)", filter: "blur(100px)", animation: "floatSlow 15s ease-in-out infinite 2s, pulseGlow 8s ease-in-out infinite 1s" }} />
        </div>

        <div className="relative z-10 w-full max-w-sm"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)" }}>

          {/* ── ROBOT SCENE ── */}
          <div className="w-full h-[200px] mb-5 rise">
            <Card className="w-full h-full bg-black/[0.25] border-[rgba(0,255,136,0.14)] relative overflow-hidden rounded-[28px]">
              <Spotlight className="-top-16 left-8" fill="#00FF88" size={140} />
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </Card>
          </div>

          {/* MAIN CARD */}
          <div
            className="relative rounded-[32px] p-8 overflow-hidden"
            style={{
              background: "linear-gradient(155deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(28px) saturate(1.4)",
              border: "1px solid rgba(0,255,136,0.14)",
              boxShadow: "0 30px 70px -20px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.06), 0 0 60px rgba(0,255,136,0.05)",
            }}
          >
            {/* LOGO */}
            <div className="text-center mb-8 rise">
              <div className="relative inline-flex mb-4">
                <div className="absolute inset-0 rounded-3xl blur-xl" style={{ background: "linear-gradient(135deg,#00FF88,#29F19C)", opacity: 0.35, animation: "pulseGlow 3.5s ease-in-out infinite" }} />
                <div
                  className="relative w-16 h-16 rounded-3xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#00FF88,#0a3d24)",
                    border: "1px solid rgba(0,255,136,0.35)",
                    boxShadow: "0 8px 30px rgba(0,255,136,0.25)",
                  }}
                >
                  <span className="text-2xl font-black text-black">R</span>
                </div>
              </div>
              <h1 className="text-[26px] font-black tracking-tight text-white">RAXX AI</h1>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
                style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.16)" }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "#00FF88" }} />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "#00FF88" }} />
                </span>
                <p className="text-[11px] font-medium tracking-wide text-white/50">India's Universal Study Platform</p>
              </div>
            </div>

            <div className="mb-6 text-center rise" style={{ animationDelay: "0.05s" }}>
              <h2 className="text-lg font-bold text-white mb-1">Welcome back</h2>
              <p className="text-[13px] text-white/40">Sign in to continue your learning journey</p>
            </div>

            {error && (
              <div className="mb-4 flex items-start gap-2 rounded-2xl px-4 py-3 text-[13px] rise"
                style={{ background: "rgba(255,90,90,0.08)", border: "1px solid rgba(255,90,90,0.25)", color: "#ff8a8a" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* EMAIL */}
            <div className="mb-4 rise" style={{ animationDelay: "0.1s" }}>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-white/35">Email</label>
              <div className="rounded-2xl flex items-center transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,255,136,0.12)" }}>
                <svg className="ml-4 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full bg-transparent px-3.5 py-3.5 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="mb-6 rise" style={{ animationDelay: "0.15s" }}>
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-white/35">Password</label>
              <div className="rounded-2xl flex items-center transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,255,136,0.12)" }}>
                <svg className="ml-4 shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full bg-transparent px-3.5 py-3.5 text-sm text-white focus:outline-none"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="mr-4 shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {showPass ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="glass-btn w-full rounded-2xl py-4 text-sm font-bold transition-all duration-300 disabled:opacity-60 rise"
              style={{
                animationDelay: "0.2s",
                background: "linear-gradient(135deg,#00FF88,#29F19C)",
                color: "#04140b",
                boxShadow: "0 10px 30px rgba(0,255,136,0.28)",
              }}
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Authenticating…
                  </>
                ) : (
                  <>
                    Sign In
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </span>
            </button>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(0,255,136,0.18), transparent)" }} />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">or</span>
              <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(0,255,136,0.18), transparent)" }} />
            </div>

            <p className="text-center text-[13px] text-white/40">
              New to RAXX AI?{" "}
              <a href="/register" className="font-bold" style={{
                background: "linear-gradient(90deg,#00FF88,#29F19C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Create an account →
              </a>
            </p>
          </div>

          <div className="mt-7 flex items-center justify-center gap-5 text-[11px] text-white/25 pb-6">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#00FF88" }} />
              Secure
            </span>
            <span className="h-3.5 w-px" style={{ background: "rgba(0,255,136,0.15)" }} />
            <span>Encrypted</span>
            <span className="h-3.5 w-px" style={{ background: "rgba(0,255,136,0.15)" }} />
            <span>AI-Powered</span>
          </div>
        </div>
      </div>
    </>
  );
}