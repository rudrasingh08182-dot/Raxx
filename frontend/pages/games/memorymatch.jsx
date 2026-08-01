import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

const cardSets = {
  easy: [
    { id: 1, front: "H₂O", back: "Water" },
    { id: 2, front: "CO₂", back: "Carbon Dioxide" },
    { id: 3, front: "NaCl", back: "Salt" },
    { id: 4, front: "O₂", back: "Oxygen" },
    { id: 5, front: "H₂", back: "Hydrogen" },
    { id: 6, front: "Fe", back: "Iron" },
  ],
  medium: [
    { id: 1, front: "E=mc²", back: "Mass-Energy" },
    { id: 2, front: "F=ma", back: "Newton 2nd Law" },
    { id: 3, front: "V=IR", back: "Ohm's Law" },
    { id: 4, front: "PV=nRT", back: "Ideal Gas Law" },
    { id: 5, front: "a²+b²=c²", back: "Pythagoras" },
    { id: 6, front: "π=3.14", back: "Pi Value" },
    { id: 7, front: "Au", back: "Gold" },
    { id: 8, front: "Ag", back: "Silver" },
  ],
  hard: [
    { id: 1, front: "∫f(x)dx", back: "Integration" },
    { id: 2, front: "d/dx", back: "Derivative" },
    { id: 3, front: "∑", back: "Summation" },
    { id: 4, front: "λ=h/mv", back: "de Broglie" },
    { id: 5, front: "ΔG=ΔH-TΔS", back: "Gibbs Energy" },
    { id: 6, front: "pH=-log[H⁺]", back: "pH Formula" },
    { id: 7, front: "1857", back: "Revolt of Sepoys" },
    { id: 8, front: "1947", back: "Independence" },
    { id: 9, front: "DNA", back: "Genetic Code" },
    { id: 10, front: "ATP", back: "Energy Currency" },
  ],
};

const difficultyConfig = {
  easy: { label: "Easy", cols: 4, coins: 10, time: 60 },
  medium: { label: "Medium", cols: 4, coins: 20, time: 90 },
  hard: { label: "Hard", cols: 5, coins: 35, time: 120 },
};

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildDeck(level) {
  const pairs = cardSets[level];
  const cards = [];
  pairs.forEach((item, i) => {
    cards.push({ uid: `f-${i}`, pairId: item.id, text: item.front, matched: false });
    cards.push({ uid: `b-${i}`, pairId: item.id, text: item.back, matched: false });
  });
  return shuffle(cards);
}

export default function MemoryMatch() {
  const router = useRouter();
  const [screen, setScreen] = useState("home"); // home | game | result
  const [difficulty, setDifficulty] = useState("easy");
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [won, setWon] = useState(false);
  const [lock, setLock] = useState(false);

  const config = difficultyConfig[difficulty];

  // Timer
  useEffect(() => {
  if (screen !== "game") return;
  if (timeLeft <= 0) {
    setScreen("result");
    setWon(false);

    // Time up pe bhi partial score save karo
    const saveScore = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) return;
        const user = JSON.parse(userData);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/save-score`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_id: user.id,
            game_name: "memorymatch",
            score: matched.length * 5,
            time_taken: config.time,
            difficulty: difficulty,
          }),
        });
      } catch (err) { console.error("Score save error:", err); }
    };
    saveScore();
    return;
  }
  const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
  return () => clearTimeout(t);
}, [timeLeft, screen]);

  // Check win
  useEffect(() => {
  if (screen !== "game") return;
  if (deck.length > 0 && matched.length === deck.length) {
    const bonus = Math.floor(timeLeft * 0.5);
    const totalCoins = config.coins + bonus;
    setCoinsEarned(totalCoins);
    setWon(true);
    setScreen("result");

    // Backend pe save karo
    const saveScore = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) return;
        const user = JSON.parse(userData);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/save-score`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_id: user.id,
            game_name: "memorymatch",
            score: totalCoins,
            time_taken: config.time - timeLeft,
            difficulty: difficulty,
          }),
        });
      } catch (err) { console.error("Score save error:", err); }
    };
    saveScore();
  }
}, [matched, deck]);

  const startGame = (level) => {
    setDifficulty(level);
    const newDeck = buildDeck(level);
    setDeck(newDeck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTimeLeft(difficultyConfig[level].time);
    setCoinsEarned(0);
    setWon(false);
    setLock(false);
    setScreen("game");
  };

  const handleFlip = useCallback(
    (uid) => {
      if (lock) return;
      if (flipped.includes(uid)) return;
      if (matched.includes(uid)) return;
      if (flipped.length === 2) return;

      const newFlipped = [...flipped, uid];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        setLock(true);
        const [a, b] = newFlipped.map((u) => deck.find((c) => c.uid === u));
        if (a.pairId === b.pairId) {
          setTimeout(() => {
            setMatched((prev) => [...prev, a.uid, b.uid]);
            setFlipped([]);
            setLock(false);
          }, 600);
        } else {
          setTimeout(() => {
            setFlipped([]);
            setLock(false);
          }, 900);
        }
      }
    },
    [flipped, matched, deck, lock]
  );

  const isFlipped = (uid) => flipped.includes(uid) || matched.includes(uid);
  const isMatched = (uid) => matched.includes(uid);

  const cols = config.cols;

  // ─── HOME SCREEN ───
  if (screen === "home") {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
        <button
          onClick={() => router.push("/games")}
          className="absolute top-5 left-5 text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
        >
          ← Back to Games
        </button>

        <div className="text-6xl mb-4">🧩</div>
        <h1 className="text-4xl font-bold text-purple-400 mb-2">Memory Match</h1>
        <p className="text-gray-400 mb-8 text-center max-w-sm">
          Flip cards and match pairs — formulas, elements, historical dates & more!
        </p>

        <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
          {Object.entries(difficultyConfig).map(([key, val]) => (
            <button
              key={key}
              onClick={() => startGame(key)}
              className={`p-4 rounded-xl border-2 text-left transition-all hover:scale-105 ${
                key === "easy"
                  ? "border-green-500 bg-green-500/10 hover:bg-green-500/20"
                  : key === "medium"
                  ? "border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20"
                  : "border-red-500 bg-red-500/10 hover:bg-red-500/20"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">{val.label}</p>
                  <p className="text-gray-400 text-sm">
                    {cardSets[key].length * 2} cards • {val.time}s
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 font-bold">+{val.coins} coins</p>
                  <p className="text-gray-500 text-xs">+ time bonus</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 bg-gray-900 rounded-xl p-4 max-w-sm w-full">
          <p className="text-purple-400 font-semibold mb-2">How to Play</p>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>🔄 Click any card to flip it</li>
            <li>🎯 Find the matching pair</li>
            <li>⚡ Match all pairs before time runs out</li>
            <li>🪙 Earn coins + time bonus on win</li>
          </ul>
        </div>
      </div>
    );
  }

  // ─── RESULT SCREEN ───
  if (screen === "result") {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
        <div className="text-7xl mb-4">{won ? "🎉" : "😢"}</div>
        <h2 className="text-3xl font-bold mb-2 text-purple-400">
          {won ? "You Won!" : "Time's Up!"}
        </h2>
        <p className="text-gray-400 mb-6">
          {won
            ? `Matched all pairs in ${moves} moves!`
            : `Matched ${matched.length / 2} of ${deck.length / 2} pairs`}
        </p>

        <div className="bg-gray-900 rounded-xl p-6 w-full max-w-xs space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-400">Moves</span>
            <span className="font-bold">{moves}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Pairs Matched</span>
            <span className="font-bold">{matched.length / 2} / {deck.length / 2}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Time Left</span>
            <span className="font-bold">{timeLeft}s</span>
          </div>
          {won && (
            <div className="flex justify-between border-t border-gray-700 pt-3">
              <span className="text-yellow-400 font-bold">Coins Earned</span>
              <span className="text-yellow-400 font-bold">+{coinsEarned} 🪙</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 w-full max-w-xs">
          <button
            onClick={() => startGame(difficulty)}
            className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold transition"
          >
            Play Again
          </button>
          <button
            onClick={() => setScreen("home")}
            className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold transition"
          >
            Change Level
          </button>
        </div>

        <button
          onClick={() => router.push("/games")}
          className="mt-4 text-gray-500 hover:text-gray-300 text-sm"
        >
          ← Back to Games
        </button>
      </div>
    );
  }

  // ─── GAME SCREEN ───
  return (
    <div className="min-h-screen bg-gray-950 text-white px-3 py-5">
      {/* Header */}
      <div className="flex items-center justify-between max-w-2xl mx-auto mb-4">
        <button
          onClick={() => setScreen("home")}
          className="text-purple-400 hover:text-purple-300 text-sm"
        >
          ← Quit
        </button>
        <h1 className="text-lg font-bold text-purple-400">Memory Match</h1>
        <span className="text-xs text-gray-400 capitalize">{difficulty}</span>
      </div>

      {/* Stats bar */}
      <div className="flex justify-between max-w-2xl mx-auto mb-5 bg-gray-900 rounded-xl px-5 py-3">
        <div className="text-center">
          <p className="text-xs text-gray-500">Moves</p>
          <p className="font-bold text-white">{moves}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Matched</p>
          <p className="font-bold text-green-400">{matched.length / 2}/{deck.length / 2}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Time</p>
          <p className={`font-bold ${timeLeft <= 15 ? "text-red-400" : "text-white"}`}>
            {timeLeft}s
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Coins</p>
          <p className="font-bold text-yellow-400">+{config.coins}</p>
        </div>
      </div>

      {/* Card Grid */}
      <div
        className="max-w-2xl mx-auto grid gap-3"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {deck.map((card) => {
          const flippedState = isFlipped(card.uid);
          const matchedState = isMatched(card.uid);
          return (
            <div
              key={card.uid}
              onClick={() => handleFlip(card.uid)}
              className={`
                aspect-square rounded-xl flex items-center justify-center text-center
                text-xs sm:text-sm font-bold cursor-pointer transition-all duration-300 select-none
                ${
                  matchedState
                    ? "bg-green-500/30 border-2 border-green-500 text-green-300 scale-95"
                    : flippedState
                    ? "bg-purple-600 border-2 border-purple-400 text-white"
                    : "bg-gray-800 border-2 border-gray-700 hover:border-purple-600 hover:bg-gray-700 text-gray-950"
                }
              `}
            >
              {flippedState ? (
                <span className="px-1 leading-tight">{card.text}</span>
              ) : (
                <span className="text-2xl">?</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="max-w-2xl mx-auto mt-5">
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(matched.length / deck.length) * 100}%` }}
          />
        </div>
        <p className="text-center text-xs text-gray-500 mt-1">
          {Math.round((matched.length / deck.length) * 100)}% Complete
        </p>
      </div>
    </div>
  );
}