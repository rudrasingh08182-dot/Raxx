import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 3D Tilt
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  // Ambient particles
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setMounted(true);
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      drift: Math.random() * 20 - 10,
    }));
    setParticles(newParticles);
  }, []);

  // Subtle 3D tilt
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (y - 0.5) * -8, ry: (x - 0.5) * 8 });
    setGlowPos({ x: x * 100, y: y * 100 });
  }, []);

  const resetTilt = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setGlowPos({ x: 50, y: 50 });
  }, []);

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

  // Color palette from references
  const colors = {
    bgDeep: "#0D1117",
    bgWarm: "#1a1512",
    rust: "#8B3A2A",
    rustLight: "#A85D4A",
    amber: "#C8956C",
    cream: "#E8DDD4",
    creamDark: "#C4B5A5",
    forest: "#1B3A2F",
    forestLight: "#2D5A47",
    charcoal: "#1E1E1E",
    gold: "#D4A574",
  };

  return (
    <>
      <style>{`
        @keyframes drift {
          0% { transform: translate(0, 0); opacity: var(--start-op); }
          25% { transform: translate(var(--drift-x), -30px); opacity: calc(var(--start-op) * 1.5); }
          50% { transform: translate(calc(var(--drift-x) * -0.5), -60px); opacity: var(--start-op); }
          75% { transform: translate(calc(var(--drift-x) * 0.5), -30px); opacity: calc(var(--start-op) * 0.7); }
          100% { transform: translate(0, 0); opacity: var(--start-op); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0.9; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbitSlow {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        @keyframes orbitSlowReverse {
          0% { transform: rotate(0deg) translateX(70px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(70px) rotate(360deg); }
        }
        .particle {
          animation: drift var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }
        .rise-anim { animation: rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .shimmer-text {
          background: linear-gradient(90deg, #E8DDD4 0%, #D4A574 25%, #C8956C 50%, #D4A574 75%, #E8DDD4 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      <div
        className="relative min-h-screen overflow-hidden flex items-center justify-center px-4"
        style={{ background: `linear-gradient(160deg, ${colors.bgDeep} 0%, ${colors.bgWarm} 40%, ${colors.forest} 100%)` }}
      >
        {/* ── AMBIENT ORBS ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(139,58,42,0.25) 0%, transparent 70%)`,
              filter: "blur(80px)",
              animation: "breathe 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute -bottom-40 -right-20 w-[450px] h-[450px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(27,58,47,0.35) 0%, transparent 70%)`,
              filter: "blur(90px)",
              animation: "breathe 10s ease-in-out infinite 2s",
            }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(200,149,108,0.15) 0%, transparent 70%)`,
              filter: "blur(60px)",
              animation: "breathe 6s ease-in-out infinite 1s",
            }}
          />
        </div>

        {/* ── FLOATING PARTICLES ── */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.id % 3 === 0 ? colors.amber : p.id % 3 === 1 ? colors.rustLight : colors.creamDark,
                opacity: p.opacity,
                "--duration": `${p.duration}s`,
                "--delay": `${p.delay}s`,
                "--drift-x": `${p.drift}px`,
                "--start-op": p.opacity,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>

        {/* ── ORBITING ACCENTS ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ perspective: "1000px" }}>
          <div
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
            style={{
              background: colors.amber,
              opacity: 0.5,
              filter: "blur(2px)",
              animation: "orbitSlow 25s linear infinite",
              marginLeft: "-6px",
              marginTop: "-6px",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
            style={{
              background: colors.rustLight,
              opacity: 0.4,
              filter: "blur(1px)",
              animation: "orbitSlowReverse 18s linear infinite",
              marginLeft: "-4px",
              marginTop: "-4px",
            }}
          />
        </div>

        {/* ── MAIN CARD ── */}
        <div
          className="relative z-10 w-full max-w-md"
          style={{
            perspective: "1200px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
            style={{
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.15s ease-out",
            }}
            className="relative"
          >
            {/* Warm glow border */}
            <div
              className="absolute -inset-[1.5px] rounded-2xl opacity-70"
              style={{
                background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(200,149,108,0.5), rgba(139,58,42,0.3), transparent 55%)`,
                filter: "blur(12px)",
              }}
            />

            {/* Glass card */}
            <div
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: `linear-gradient(145deg, rgba(30,30,30,0.7) 0%, rgba(26,21,18,0.6) 100%)`,
                backdropFilter: "blur(24px) saturate(1.2)",
                border: "1px solid rgba(200,149,108,0.12)",
                boxShadow: `
                  0 32px 64px -16px rgba(0,0,0,0.6),
                  0 0 0 1px rgba(255,255,255,0.03),
                  inset 0 1px 1px rgba(255,255,255,0.06)
                `,
              }}
            >
              {/* Inner warm glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(200,149,108,0.08), transparent 50%)`,
                }}
              />

              {/* ── LOGO ── */}
              <div className="text-center mb-8" style={{ transform: "translateZ(40px)" }}>
                <div className="relative inline-block mb-5">
                  <div
                    className="absolute inset-0 rounded-2xl blur-xl opacity-40"
                    style={{
                      background: `linear-gradient(135deg, ${colors.rust}, ${colors.amber})`,
                      animation: "breathe 4s ease-in-out infinite",
                    }}
                  />
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${colors.rust}, ${colors.forestLight})`,
                      border: `1px solid rgba(200,149,108,0.25)`,
                      boxShadow: `0 8px 32px rgba(139,58,42,0.3)`,
                    }}
                  >
                    <span
                      className="text-2xl font-black"
                      style={{
                        color: colors.cream,
                        textShadow: `0 2px 12px rgba(0,0,0,0.4)`,
                      }}
                    >
                      R
                    </span>
                  </div>
                </div>

                <h1
                  className="text-3xl font-black tracking-tight shimmer-text"
                  style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}
                >
                  RAXX AI
                </h1>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
                  style={{
                    borderColor: "rgba(200,149,108,0.2)",
                    background: "rgba(200,149,108,0.06)",
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                      style={{ background: colors.forestLight }}
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full"
                      style={{ background: colors.forestLight }}
                    />
                  </span>
                  <p className="text-xs font-medium tracking-wide" style={{ color: colors.creamDark }}>
                    India's Universal Study Platform
                  </p>
                </div>
              </div>

              {/* ── TITLE ── */}
              <div className="mb-6 text-center" style={{ transform: "translateZ(25px)" }}>
                <h2 className="text-xl font-bold mb-1" style={{ color: colors.cream }}>
                  Welcome Back
                </h2>
                <p className="text-sm" style={{ color: colors.creamDark, opacity: 0.7 }}>
                  Sign in to continue your learning journey
                </p>
              </div>

              {/* ── ERROR ── */}
              {error && (
                <div
                  className="mb-4 flex items-start gap-2 rounded-xl px-4 py-3 text-sm rise-anim"
                  style={{
                    transform: "translateZ(20px)",
                    background: "rgba(139,58,42,0.15)",
                    border: "1px solid rgba(139,58,42,0.3)",
                    color: "#D4A574",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* ── EMAIL ── */}
              <div className="mb-4" style={{ transform: "translateZ(18px)" }}>
                <label
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: colors.creamDark, opacity: 0.6 }}
                >
                  Email
                </label>
                <div className="group relative rounded-xl transition-all duration-300">
                  <div
                    className="absolute -inset-[1px] rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${colors.rustLight}, ${colors.amber}, ${colors.forestLight})`,
                    }}
                  />
                  <div
                    className="relative flex items-center rounded-xl transition-all duration-300"
                    style={{
                      border: "1px solid rgba(200,149,108,0.12)",
                      background: "rgba(0,0,0,0.25)",
                    }}
                  >
                    <svg
                      className="ml-4 transition-colors"
                      style={{ color: colors.creamDark, opacity: 0.5 }}
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      className="w-full bg-transparent px-4 py-3.5 text-sm focus:outline-none placeholder-white/20"
                      style={{ color: colors.cream }}
                    />
                  </div>
                </div>
              </div>

              {/* ── PASSWORD ── */}
              <div className="mb-6" style={{ transform: "translateZ(18px)" }}>
                <label
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: colors.creamDark, opacity: 0.6 }}
                >
                  Password
                </label>
                <div className="group relative rounded-xl transition-all duration-300">
                  <div
                    className="absolute -inset-[1px] rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${colors.rustLight}, ${colors.amber}, ${colors.forestLight})`,
                    }}
                  />
                  <div
                    className="relative flex items-center rounded-xl transition-all duration-300"
                    style={{
                      border: "1px solid rgba(200,149,108,0.12)",
                      background: "rgba(0,0,0,0.25)",
                    }}
                  >
                    <svg
                      className="ml-4 transition-colors"
                      style={{ color: colors.creamDark, opacity: 0.5 }}
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      className="w-full bg-transparent px-4 py-3.5 text-sm focus:outline-none placeholder-white/20"
                      style={{ color: colors.cream }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="mr-4 transition-colors hover:opacity-80"
                      style={{ color: colors.creamDark, opacity: 0.5 }}
                    >
                      {showPass ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* ── LOGIN BUTTON ── */}
              <button
                onClick={handleLogin}
                disabled={loading}
                style={{ transform: "translateZ(35px)" }}
                className="group relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <div
                  className="absolute inset-0 rounded-xl transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${colors.rust}, ${colors.forestLight}, ${colors.amber})`,
                    backgroundSize: "200% 200%",
                    animation: "shimmer 3s ease infinite",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: `0 0 30px rgba(139,58,42,0.4), 0 0 60px rgba(200,149,108,0.2)`,
                  }}
                />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative flex items-center justify-center gap-2" style={{ color: colors.cream }}>
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Authenticating…
                    </>
                  ) : (
                    <>
                      Sign In
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </span>
              </button>

              {/* ── DIVIDER ── */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, rgba(200,149,108,0.2), transparent)` }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: colors.creamDark, opacity: 0.3 }}>
                  or
                </span>
                <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, rgba(200,149,108,0.2), transparent)` }} />
              </div>

              {/* ── REGISTER ── */}
              <p className="text-center text-sm" style={{ color: colors.creamDark, opacity: 0.6, transform: "translateZ(12px)" }}>
                New to RAXX AI?{" "}
                <a
                  href="/register"
                  className="font-bold hover:opacity-80 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, ${colors.amber}, ${colors.rustLight})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Create an account →
                </a>
              </p>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs" style={{ color: colors.creamDark, opacity: 0.35 }}>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: colors.forestLight }} />
              Secure
            </span>
            <span className="h-4 w-px" style={{ background: "rgba(200,149,108,0.15)" }} />
            <span>Encrypted</span>
            <span className="h-4 w-px" style={{ background: "rgba(200,149,108,0.15)" }} />
            <span>AI-Powered</span>
          </div>
          <p className="mt-4 text-center text-xs" style={{ color: colors.creamDark, opacity: 0.2 }}>
            RAXX AI Technologies © 2026 — Every Student. Every Board.
          </p>
        </div>
      </div>
    </>
  );
}