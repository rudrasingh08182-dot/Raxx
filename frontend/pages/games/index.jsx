import { useState } from "react";
import { useRouter } from "next/router";

const C = {
  bg: "#0F1A14",
  surface: "#16241D",
  surfaceHi: "#1E3228",
  border: "rgba(232,221,208,0.08)",
  cream: "#E8DDD0",
  creamMute: "#8A9A8A",
  terra: "#C46B4A",
  terraGlow: "rgba(196,107,74,0.15)",
  forest: "#3D5A48",
  forestHi: "#4A8C6A",
  forestGlow: "rgba(61,90,72,0.2)",
  gold: "#D4A843",
  goldGlow: "rgba(212,168,67,0.15)",
  red: "#E05A5A",
  green: "#4A8C6A",
};

const games = [
  {
    id: "quiz",
    title: "Quiz Battle",
    icon: "🎯",
    desc: "AI generated questions — test your knowledge",
    accent: C.terra,
    accentGlow: C.terraGlow,
    border: `${C.terra}30`,
    players: "Solo or vs Friends",
    difficulty: "Easy to Hard",
    coins: "+10 per correct",
  },
  {
    id: "chess",
    title: "Chess",
    icon: "♟️",
    desc: "Coming soon — challenge AI in a battle of minds!",
    accent: C.creamMute,
    accentGlow: "rgba(138,154,138,0.15)",
    border: `${C.creamMute}25`,
    players: "vs AI",
    difficulty: "3 levels",
    coins: "+50 per win",
    upcoming: true,
  },
  {
    id: "sudoku",
    title: "Sudoku",
    icon: "🔢",
    desc: "Daily puzzle — train your logical thinking",
    accent: C.forestHi,
    accentGlow: C.forestGlow,
    border: `${C.forestHi}30`,
    players: "Solo",
    difficulty: "Easy to Hard",
    coins: "+30 per solve",
  },
  {
    id: "wordscramble",
    title: "Word Scramble",
    icon: "🔤",
    desc: "Unscramble subject related words",
    accent: C.green,
    accentGlow: "rgba(74,140,106,0.15)",
    border: `${C.green}30`,
    players: "Solo",
    difficulty: "Medium",
    coins: "+5 per word",
  },
  {
    id: "speedmath",
    title: "Speed Math",
    icon: "⚡",
    desc: "Rapid fire arithmetic — beat your high score",
    accent: C.gold,
    accentGlow: C.goldGlow,
    border: `${C.gold}30`,
    players: "Solo",
    difficulty: "Progressive",
    coins: "+2 per answer",
  },
  {
    id: "memorymatch",
    title: "Memory Match",
    icon: "🃏",
    desc: "Match formulas and facts — flip cards",
    accent: C.terra,
    accentGlow: C.terraGlow,
    border: `${C.terra}25`,
    players: "Solo",
    difficulty: "Medium",
    coins: "+15 per match",
  },
];

const leaderboard = [
  { rank: 1, name: "Ayush S.", score: 2450, game: "Quiz Battle", badge: "🥇" },
  { rank: 2, name: "Manu M.", score: 2100, game: "Speed Math", badge: "🥈" },
  { rank: 3, name: "Amit K.", score: 1850, game: "Chess", badge: "🥉" },
  { rank: 4, name: "Sneha R.", score: 1620, game: "Sudoku", badge: "4️⃣" },
  { rank: 5, name: "Vikash T.", score: 1400, game: "Word Scramble", badge: "5️⃣" },
];

export default function GamesHome() {
  const router = useRouter();
  const [hoveredGame, setHoveredGame] = useState(null);

  // Styles
  const app = {
    minHeight: "100vh",
    backgroundColor: C.bg,
    color: C.cream,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    maxWidth: 480,
    margin: "0 auto",
    position: "relative",
    overflowX: "hidden",
  };

  const head = {
    backgroundColor: "rgba(15,26,20,0.92)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: `1px solid ${C.border}`,
    padding: "14px 16px",
    position: "sticky",
    top: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const card = {
    backgroundColor: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
  };

  const chip = (color, bg) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    backgroundColor: bg,
    color: color,
    border: `1px solid ${bg}`,
  });

  const sectionTitle = {
    fontSize: 20,
    fontWeight: 800,
    color: C.cream,
    margin: "0 0 16px 0",
    letterSpacing: "-0.3px",
  };

  const safeBottom = { paddingBottom: 24 };

  return (
    <div style={app}>
      {/* HEADER */}
      <div style={head}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/dashboard/student" style={{ color: C.creamMute, fontSize: 20, textDecoration: "none" }}>
            ←
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32,
              height: 32,
              background: `linear-gradient(135deg, ${C.gold}, ${C.terra})`,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}>
              🎮
            </div>
            <div>
              <h1 style={{ fontWeight: 800, fontSize: 16, color: C.cream, margin: 0 }}>Games Zone</h1>
              <p style={{ fontSize: 11, color: C.creamMute, margin: "2px 0 0 0" }}>Learn while you play</p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={chip(C.gold, C.goldGlow)}>🪙 450</span>
          <span style={chip(C.terra, C.terraGlow)}>🔥 7</span>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* HERO */}
        <div style={{
          ...card,
          background: `linear-gradient(135deg, ${C.terraGlow} 0%, ${C.forestGlow} 100%)`,
          border: `1px solid ${C.terra}20`,
          position: "relative",
          overflow: "hidden",
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: C.cream, margin: "0 0 8px 0" }}>
            🎮 Welcome to <span style={{ color: C.terra }}>Games Zone!</span>
          </h2>
          <p style={{ fontSize: 14, color: C.creamMute, lineHeight: 1.5, margin: "0 0 16px 0" }}>
            Learn while you play! Every game sharpens your mind and boosts exam prep. Earn coins and climb the leaderboard!
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { icon: "🪙", label: "Earn Coins" },
              { icon: "🏆", label: "Leaderboard" },
              { icon: "🎯", label: "Learn & Fun" },
            ].map((item, i) => (
              <div key={i} style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.2)",
                border: `1px solid ${C.border}`,
                borderRadius: 14,
                padding: "12px 8px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.cream }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* GAMES GRID */}
        <h3 style={sectionTitle}>Choose Your Game</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => !game.upcoming && router.push(`/games/${game.id}`)}
              onMouseEnter={() => setHoveredGame(game.id)}
              onMouseLeave={() => setHoveredGame(null)}
              disabled={game.upcoming}
              style={{
                backgroundColor: game.upcoming ? `${C.surface}80` : C.surface,
                border: `1.5px solid ${hoveredGame === game.id ? game.border : C.border}`,
                borderRadius: 20,
                padding: 20,
                textAlign: "left",
                cursor: game.upcoming ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                opacity: game.upcoming ? 0.6 : 1,
                width: "100%",
                fontFamily: "inherit",
                color: "inherit",
              }}
            >
              {/* Icon */}
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${game.accent}40, ${game.accent}15)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                marginBottom: 14,
                border: `1px solid ${game.accent}30`,
              }}>
                {game.icon}
              </div>

              {/* Title & Desc */}
              <h4 style={{ fontSize: 18, fontWeight: 800, color: C.cream, margin: "0 0 4px 0" }}>
                {game.title}
              </h4>
              <p style={{ fontSize: 13, color: C.creamMute, lineHeight: 1.5, margin: "0 0 14px 0" }}>
                {game.desc}
              </p>

              {/* Stats */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                <span style={chip(C.creamMute, C.surfaceHi)}>👥 {game.players}</span>
                <span style={chip(C.creamMute, C.surfaceHi)}>📊 {game.difficulty}</span>
                <span style={chip(C.gold, C.goldGlow)}>🪙 {game.coins}</span>
              </div>

              {/* Play Button */}
              <div style={{
                width: "100%",
                padding: "12px",
                borderRadius: 14,
                background: game.upcoming ? C.surfaceHi : `linear-gradient(135deg, ${game.accent}, ${game.accent}dd)`,
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                opacity: game.upcoming ? 0.5 : 1,
              }}>
                {game.upcoming ? "🔒 Coming Soon" : "▶ Play Now"}
              </div>
            </button>
          ))}
        </div>

        {/* DAILY CHALLENGE */}
        <div style={{
          ...card,
          background: `linear-gradient(180deg, ${C.goldGlow} 0%, ${C.surface} 100%)`,
          border: `1px solid ${C.gold}25`,
          marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 40 }}>⚡</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: C.cream, margin: "0 0 4px 0" }}>Daily Challenge</h3>
              <p style={{ fontSize: 13, color: C.creamMute, lineHeight: 1.5, margin: 0 }}>
                Complete today's challenge and earn <span style={{ color: C.gold, fontWeight: 700 }}>100 bonus coins!</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push("/games/quiz")}
            style={{
              width: "100%",
              marginTop: 16,
              padding: "14px",
              borderRadius: 14,
              backgroundColor: C.gold,
              color: C.bg,
              fontSize: 15,
              fontWeight: 800,
              border: "none",
              cursor: "pointer",
              boxShadow: `0 4px 20px ${C.gold}30`,
            }}
          >
            Play Now →
          </button>
        </div>

        {/* LEADERBOARD */}
        <h3 style={sectionTitle}>🏆 Top Players Today</h3>
        <div style={card}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {leaderboard.map((player) => (
              <div
                key={player.rank}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  backgroundColor: C.surfaceHi,
                  borderRadius: 14,
                  padding: "14px 16px",
                  border: `1px solid ${C.border}`,
                }}
              >
                <span style={{ fontSize: 22 }}>{player.badge}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.cream, margin: "0 0 2px 0" }}>
                    {player.name}
                  </p>
                  <p style={{ fontSize: 12, color: C.creamMute, margin: 0 }}>{player.game}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 14, fontWeight: 800, color: C.gold, margin: 0 }}>
                    🪙 {player.score}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={safeBottom} />
      </div>
    </div>
  );
}