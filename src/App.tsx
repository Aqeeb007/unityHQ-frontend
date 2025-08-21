import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 flex items-center justify-center relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full opacity-10"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="#fff"
                strokeWidth="0.2"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      <main className="relative z-10 max-w-xl w-full bg-gray-900/80 rounded-2xl shadow-xl p-10 backdrop-blur-md border border-gray-800">
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
          UnityHQ for Coders
        </h1>
        <p className="text-lg text-slate-300 mb-8">
          A professional workspace for developers, teams, and tech enthusiasts.
          Fast, modern, and beautiful.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow">
          Get Started
        </Button>
      </main>
    </div>
  );
}

export default App;
