// frontend/pages/login.jsx
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowRight, Lock, Mail, TriangleAlert } from "lucide-react";
import supabase from "../utils/supabase";
import { AuthLayout, BrandHeader, TrustRow } from "../components/auth/AuthShell";
import { GlassField } from "../components/auth/GlassField";
import { GlowButton } from "../components/auth/GlowButton";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;

      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single();

      const role = profile?.role;
      if (role === "teacher") router.push("/dashboard/teacher");
      else if (role === "parent") router.push("/dashboard/parent");
      else router.push("/dashboard/student");
    } catch (e) {
      setError(e?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <section className="glass-panel animate-rise rounded-[32px] px-6 py-9 sm:px-8" style={{ background: "rgba(255,255,255,0.06)" }}>
        <BrandHeader tagline="India's Universal Study Platform" />

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>Welcome back</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>Sign in to continue your learning journey</p>
        </div>

        {error && (
          <div
            className="mt-6 flex items-center gap-2 rounded-2xl px-4 py-3 text-xs"
            style={{ border: "1px solid oklch(0.62 0.22 22 / 30%)", background: "oklch(0.62 0.22 22 / 10%)", color: "var(--foreground)" }}
          >
            <TriangleAlert className="h-4 w-4 shrink-0" style={{ color: "var(--destructive)" }} />
            {error}
          </div>
        )}

        <div className="mt-7 space-y-5">
          <GlassField
            label="Email"
            icon={<Mail className="h-4 w-4" />}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <GlassField
            label="Password"
            icon={<Lock className="h-4 w-4" />}
            revealable
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        <div className="mt-8">
          <GlowButton loading={loading} onClick={handleLogin}>
            Sign In
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </GlowButton>
        </div>

        <div className="mt-7 flex items-center gap-4">
          <span className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--muted-foreground)" }}>or</span>
          <span className="h-px flex-1" style={{ background: "var(--border)" }} />
        </div>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
          New to RAXX AI?{" "}
          <Link href="/register" className="font-semibold transition-opacity hover:opacity-80" style={{ color: "var(--primary)" }}>
            Create an account →
          </Link>
        </p>
      </section>

      <TrustRow />
    </AuthLayout>
  );
}