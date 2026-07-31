import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../utils/supabase";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single();
        setUser(profile);
      }
    } catch (error) {
      console.error("Navbar user check error:", error);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    router.push("/login");
  };

  const publicLinks = [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "About", href: "/#about" },
  ];

  const dashboardRoute = (role) => {
    if (role === "teacher") return "/dashboard/teacher";
    if (role === "parent") return "/dashboard/parent";
    return "/dashboard/student";
  };

  return (
    <nav className="bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div
            onClick={() => router.push(user ? dashboardRoute(user.role) : "/")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <img src="/logo.png" alt="RAXX" className="w-20 h-20 object-contain" />
            <div className="flex items-center gap-1">
              
              
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {!loading && !user && publicLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-gray-400 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800/50 text-sm font-medium transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse" />
            ) : user ? (
              <>
                {/* Coins badge */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  🪙 <span>{user.coins || 0}</span>
                </div>

                {/* Notification bell */}
                <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 transition-all duration-200">
                  <span className="text-lg">🔔</span>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-950" />
                </button>

                {/* User avatar + dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 rounded-xl px-3 py-1.5 transition-all duration-200">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xs">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white text-sm font-medium">{user.name?.split(" ")[0]}</span>
                    <span className="text-gray-500 text-xs">▾</span>
                  </button>

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-52 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl shadow-black/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-800">
                      <p className="text-white text-sm font-semibold">{user.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{user.email}</p>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={() => router.push(dashboardRoute(user.role))}
                        className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl text-sm transition-all duration-150 flex items-center gap-2"
                      >
                        <span>🏠</span> Dashboard
                      </button>
                      <button
                        onClick={() => router.push("/progress")}
                        className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl text-sm transition-all duration-150 flex items-center gap-2"
                      >
                        <span>📊</span> My Progress
                      </button>
                      <button
                        onClick={() => router.push("/whatsapp-settings")}
                        className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl text-sm transition-all duration-150 flex items-center gap-2"
                      >
                        <span>💬</span> WhatsApp Alerts
                      </button>
                      <div className="border-t border-gray-800 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-xl text-sm transition-all duration-150 flex items-center gap-2"
                        >
                          <span>🚪</span> Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push("/login")}
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-gray-800/50 text-sm font-medium transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg shadow-orange-500/20"
                >
                  Get Started →
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white transition"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800/50 px-4 py-4 space-y-1">
          {!user && publicLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2.5 rounded-xl text-sm font-medium transition"
            >
              {link.label}
            </a>
          ))}

          {user ? (
            <>
              <div className="flex items-center gap-3 py-3 px-4 bg-gray-800/50 rounded-xl mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{user.name}</p>
                  <p className="text-gray-400 text-xs">🪙 {user.coins || 0} Coins</p>
                </div>
              </div>
              <button
                onClick={() => { router.push(dashboardRoute(user.role)); setMobileMenuOpen(false); }}
                className="w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition"
              >
                🏠 Dashboard
              </button>
              <button
                onClick={() => { router.push("/progress"); setMobileMenuOpen(false); }}
                className="w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition"
              >
                📊 My Progress
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-400 hover:bg-red-500/10 px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => router.push("/login")}
                className="w-full text-center border border-gray-700 text-gray-300 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/register")}
                className="w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-orange-500/20"
              >
                Get Started →
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}