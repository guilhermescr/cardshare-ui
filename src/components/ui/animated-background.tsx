interface AnimatedBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

function AnimatedBackground({
  children,
  className = '',
}: AnimatedBackgroundProps) {
  return (
    <div
      className={`min-h-screen flex relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-20 bg-white/40 backdrop-blur-sm rounded-xl shadow-lg rotate-12 border border-white/20 hidden md:block">
          <div className="p-4">
            <div className="w-full h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded mb-2 animate-pulse"></div>
            <div className="w-3/4 h-1 bg-gray-300 rounded mb-1 animate-pulse"></div>
            <div className="w-1/2 h-1 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="absolute top-40 right-20 w-28 h-18 bg-white/40 backdrop-blur-sm rounded-xl shadow-lg -rotate-6 border border-white/20 hidden md:block">
          <div className="p-3">
            <div className="w-full h-2 bg-gradient-to-r from-green-400 to-teal-400 rounded mb-2 animate-pulse"></div>
            <div className="w-2/3 h-1 bg-gray-300 rounded mb-1 animate-pulse"></div>
            <div className="w-1/3 h-1 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="absolute bottom-32 left-20 w-36 h-24 bg-white/40 backdrop-blur-sm rounded-xl shadow-lg rotate-6 border border-white/20 hidden md:block">
          <div className="p-4">
            <div className="w-full h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded mb-2 animate-pulse"></div>
            <div className="w-4/5 h-1 bg-gray-300 rounded mb-1 animate-pulse"></div>
            <div className="w-3/5 h-1 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="absolute bottom-20 right-16 w-30 h-20 bg-white/40 backdrop-blur-sm rounded-xl shadow-lg -rotate-12 border border-white/20 hidden md:block">
          <div className="p-3">
            <div className="w-full h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded mb-2 animate-pulse"></div>
            <div className="w-3/4 h-1 bg-gray-300 rounded mb-1 animate-pulse"></div>
            <div className="w-1/2 h-1 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-sm"></div>
        <div className="absolute top-3/4 right-1/4 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 left-1/6 w-8 h-8 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-sm"></div>
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-sm"></div>

        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23e2e8f0 fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=1/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>

      <div className="relative z-10 flex-1">{children}</div>
    </div>
  );
}

export { AnimatedBackground };
