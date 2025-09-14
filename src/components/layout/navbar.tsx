import { Search, Settings } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="h-14 w-full rounded-2xl border border-white/10 bg-[#0F172B] text-slate-300 shadow-xl">
      <div className="grid h-full grid-cols-3 items-center gap-2 px-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="size-2 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]"
          />
          <h1 className="text-white text-lg sm:text-xl font-semibold tracking-tight">
            UnityHQ
          </h1>
        </div>

        {/* Center: Dummy search (shown on md and up) */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              strokeWidth={1.75}
            />
            <input
              type="search"
              role="searchbox"
              placeholder="Search…"
              className="w-full rounded-xl border border-white/10 bg-[#0B1222] py-2 pl-10 pr-3 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-white/20 focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-3">
          {/* Compact search button for mobile */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-[#0B1222] p-2 text-slate-300 hover:text-white hover:border-white/20"
            aria-label="Search"
          >
            <Search className="size-4" strokeWidth={1.75} />
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-[#0B1222] p-2 text-slate-300 hover:text-white hover:border-white/20"
            aria-label="Settings"
          >
            list of users
          </button>
        </div>
      </div>
    </header>
  );
};
