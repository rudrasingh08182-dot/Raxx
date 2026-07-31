import { useState, useEffect, useRef } from "react";

const SUBJECTS = [
  "General Knowledge", "Mathematics", "Physics",
  "Chemistry", "Biology", "History", "Geography",
  "Computer Science", "Reasoning", "English",
];

export default function QuizBattle() {
  const [screen, setScreen] = useState("setup");
  const [subject, setSubject] = useState("General Knowledge");
  const [difficulty, setDifficulty] = useState("medium");
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState([]);
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (screen === "game" && !showResult) {
      setTimeLeft(15);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleAnswer(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [currentQ, screen, showResult]);

  const startQuiz = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:8000/games/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          difficulty,
          num_questions: 10,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setQuestions(data.questions);
        setCurrentQ(0);
        setScore(0);
        setAnswers([]);
        setStreak(0);
        setCoins(0);
        setScreen("game");
      } else {
        setError(data.detail || "Failed to generate quiz!");
      }
    } catch (err) {
      setError("Server error. Make sure backend is running.");
    }
    setLoading(false);
  };

  // 👇 Score save function
  const saveScoreToBackend = async (finalScore, finalCoins) => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) return;
      const user = JSON.parse(userData);

      await fetch('http://127.0.0.1:8000/games/save-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: user.id,
          game_name: 'quiz',
          score: finalScore,
          time_taken: 0,
          difficulty: difficulty,
        }),
      });
    } catch (err) {
      console.error('Score save error:', err);
    }
  };

  const handleAnswer = async (answerIndex) => {
    clearInterval(timerRef.current);
    setSelectedAnswer(answerIndex);

    const q = questions[currentQ];
    const isCorrect = answerIndex === q.correct;
    const coinsEarned = isCorrect ? (timeLeft > 10 ? 15 : timeLeft > 5 ? 10 : 5) : 0;

    let newScore = score;
    let newCoins = coins;

    if (isCorrect) {
      newScore = score + 1;
      newCoins = coins + coinsEarned;
      setScore(newScore);
      setStreak((prev) => prev + 1);
      setCoins(newCoins);
    } else {
      setStreak(0);
    }

    setAnswers((prev) => [...prev, {
      question: q.question,
      selected: answerIndex,
      correct: q.correct,
      isCorrect,
      options: q.options,
      explanation: q.explanation,
    }]);

    setShowResult(true);
    setTimeout(async () => {
      setShowResult(false);
      setSelectedAnswer(null);
      if (currentQ + 1 >= questions.length) {
        await saveScoreToBackend(newScore, newCoins); // 👈 save karo
        setScreen("result");
      } else {
        setCurrentQ((prev) => prev + 1);
      }
    }, 1500);
  };

  const timerColor = timeLeft > 10 ? "text-green-400" : timeLeft > 5 ? "text-yellow-400" : "text-red-400";
  const timerBg = timeLeft > 10 ? "bg-green-500" : timeLeft > 5 ? "bg-yellow-500" : "bg-red-500";

  // ── SETUP SCREEN ──
  if (screen === "setup") return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center gap-4 sticky top-0 z-50">
        <a href="/games" className="text-gray-400 hover:text-white transition text-sm">← Games</a>
        <div className="w-px h-6 bg-gray-700" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-xl">🎯</div>
          <div>
            <h1 className="text-white font-bold text-sm">Quiz Battle</h1>
            <p className="text-gray-400 text-xs">AI Generated Questions</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Battle</h2>
          <p className="text-gray-400">Test your knowledge with AI generated questions!</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
          <div>
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 block">
              Select Subject
            </label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSubject(s)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    subject === s
                      ? "bg-orange-500 text-white"
                      : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 block">
              Difficulty
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "easy", label: "Easy", icon: "😊" },
                { id: "medium", label: "Medium", icon: "😐" },
                { id: "hard", label: "Hard", icon: "😤" },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDifficulty(d.id)}
                  className={`py-3 rounded-xl text-sm font-bold transition flex flex-col items-center gap-1 border ${
                    difficulty === d.id
                      ? "bg-orange-500/20 border-orange-500 text-orange-400"
                      : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="text-2xl">{d.icon}</span>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
            <h4 className="text-orange-400 font-bold text-sm mb-2">📋 Rules</h4>
            <ul className="space-y-1">
              {[
                "10 questions — 15 seconds each",
                "Answer faster = more coins earned",
                "Build streak for bonus coins",
                "No negative marking",
              ].map((rule, i) => (
                <li key={i} className="text-gray-400 text-xs flex items-center gap-2">
                  <span className="text-orange-400">•</span> {rule}
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
              ⚠️ {error}
            </div>
          )}

          <button
            onClick={startQuiz}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating Questions...
              </>
            ) : (
              "🎯 Start Quiz!"
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // ── GAME SCREEN ──
  if (screen === "game" && questions.length > 0) {
    const q = questions[currentQ];
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <div className="bg-gray-900 border-b border-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-sm">
              Q {currentQ + 1}/{questions.length}
            </span>
            <div className="flex gap-1">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-6 rounded-full transition ${
                    i < currentQ ? "bg-orange-500" :
                    i === currentQ ? "bg-white" : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {streak > 1 && (
              <div className="bg-orange-500/20 text-orange-400 text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                🔥 {streak}x Streak!
              </div>
            )}
            <div className="text-yellow-400 text-sm font-bold">🪙 {coins}</div>
            <div className={`text-2xl font-bold ${timerColor}`}>{timeLeft}s</div>
          </div>
        </div>

        <div className="h-1 bg-gray-800">
          <div
            className={`h-1 ${timerBg} transition-all duration-1000`}
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          />
        </div>

        <div className="max-w-2xl mx-auto p-6 flex-1 flex flex-col justify-center">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                {subject}
              </span>
              <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-lg capitalize">
                {difficulty}
              </span>
            </div>
            <p className="text-white text-lg font-semibold leading-relaxed">
              {q.question}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {q.options.map((option, i) => {
              let btnClass = "bg-gray-900 border-gray-700 text-gray-300 hover:border-orange-500/50 hover:bg-gray-800";
              if (showResult) {
                if (i === q.correct) btnClass = "bg-green-500/20 border-green-500 text-green-400";
                else if (i === selectedAnswer && i !== q.correct) btnClass = "bg-red-500/20 border-red-500 text-red-400";
                else btnClass = "bg-gray-900 border-gray-800 text-gray-500";
              } else if (selectedAnswer === i) {
                btnClass = "bg-orange-500/20 border-orange-500 text-orange-400";
              }

              return (
                <button
                  key={i}
                  onClick={() => !showResult && selectedAnswer === null && handleAnswer(i)}
                  disabled={showResult || selectedAnswer !== null}
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition text-left ${btnClass}`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    showResult && i === q.correct ? "bg-green-500 text-white" :
                    showResult && i === selectedAnswer && i !== q.correct ? "bg-red-500 text-white" :
                    "bg-gray-800 text-gray-400"
                  }`}>
                    {["A", "B", "C", "D"][i]}
                  </span>
                  <span className="text-sm">{option}</span>
                  {showResult && i === q.correct && (
                    <span className="ml-auto text-green-400 text-lg">✓</span>
                  )}
                  {showResult && i === selectedAnswer && i !== q.correct && (
                    <span className="ml-auto text-red-400 text-lg">✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {showResult && q.explanation && (
            <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3">
              <p className="text-blue-400 text-sm">💡 {q.explanation}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── RESULT SCREEN ──
  if (screen === "result") {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gray-950 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center mb-6">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? "🏆" : percentage >= 60 ? "🎯" : percentage >= 40 ? "📚" : "💪"}
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">
              {score}/{questions.length} Correct
            </h2>
            <div className="text-5xl font-bold mb-2" style={{
              color: percentage >= 80 ? "#22c55e" : percentage >= 60 ? "#f97316" : percentage >= 40 ? "#eab308" : "#ef4444"
            }}>
              {percentage}%
            </div>
            <p className="text-gray-400 text-sm mb-6">
              {percentage >= 80 ? "Excellent! You're a genius!" :
               percentage >= 60 ? "Good job! Keep practicing!" :
               percentage >= 40 ? "Not bad! Study more!" :
               "Keep trying! You'll improve!"}
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                <div className="text-2xl font-bold text-green-400">{score}</div>
                <div className="text-gray-400 text-xs mt-1">Correct</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <div className="text-2xl font-bold text-red-400">{questions.length - score}</div>
                <div className="text-gray-400 text-xs mt-1">Wrong</div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
                <div className="text-2xl font-bold text-yellow-400">🪙 {coins}</div>
                <div className="text-gray-400 text-xs mt-1">Coins Earned</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setScreen("setup");
                  setQuestions([]);
                  setScore(0);
                  setCoins(0);
                  setStreak(0);
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
              >
                🔄 Play Again
              </button>
              <a href="/games"
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition text-center">
                🎮 All Games
              </a>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <h3 className="text-white font-bold text-lg mb-4">📋 Answer Review</h3>
            <div className="space-y-3">
              {answers.map((ans, i) => (
                <div
                  key={i}
                  className={`border rounded-xl p-4 ${
                    ans.isCorrect ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                      ans.isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}>
                      Q{i + 1}
                    </span>
                    <p className="text-gray-300 text-sm">{ans.question}</p>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className={ans.isCorrect ? "text-green-400" : "text-red-400"}>
                      Your answer: {ans.selected !== null ? ans.options[ans.selected] : "Time up!"}
                    </span>
                    {!ans.isCorrect && (
                      <span className="text-green-400">
                        ✓ Correct: {ans.options[ans.correct]}
                      </span>
                    )}
                  </div>
                  {ans.explanation && (
                    <p className="text-blue-400 text-xs mt-2">💡 {ans.explanation}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}