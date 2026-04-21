import { motion } from "motion/react";
import { Ship, Info } from "lucide-react";

interface HomeViewProps {
  onStart: () => void;
  key?: string;
}

export function HomeView({ onStart }: HomeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto"
    >
      <div className="relative mb-16 px-12 py-16">
        <div className="absolute inset-0 border-2 border-ink opacity-20 outline outline-2 outline-offset-8 outline-ink/10 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-4 border border-ink opacity-10 pointer-events-none"></div>
        
        <h1 className="text-6xl md:text-8xl font-black text-ink tracking-[0.1em] font-serif relative z-10 leading-none flex flex-col items-center gap-6">
          <span className="font-calligraphy text-8xl md:text-[140px] text-ink z-10 block -rotate-3 text-shadow-sm mb-4">
            船长日记
          </span>
          <span className="block text-2xl md:text-3xl text-cinnabar tracking-[0.2em] font-serif">
            清明上河图 · 汴河篇
          </span>
        </h1>
        {/* Token Badge */}
        <div className="absolute -right-6 -bottom-6 bg-cinnabar text-white px-3 py-10 shadow-md flex items-center justify-center rotate-[8deg] rounded-sm mix-blend-multiply border-2 border-cinnabar/80">
          <span className="font-kai text-2xl font-bold tracking-widest" style={{ writingMode: 'vertical-rl' }}>宣和三年</span>
        </div>
      </div>

      <div className="space-y-6 text-left max-w-xl mx-auto text-ink leading-loose text-lg tracking-wider mb-20 relative">
        <p className="font-bold text-xl indent-8 font-kai">
          老朽撑船大半生，吃睡都在这水波之上。今日也是个寻常清明，从开船过桥，到卸货歇夜，全录在这旧本帖里。看看这汴河的水，怎么养活了岸上万千家。
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-8">
        <button
          onClick={onStart}
          className="action-token px-10 py-5 flex items-center justify-center gap-3 text-xl font-bold tracking-[0.2em] uppercase rounded-sm"
        >
          <Ship className="w-6 h-6" />
          翻开手札
        </button>

        <button
          onClick={() => window.open("https://zh.wikipedia.org/wiki/清明上河图", "_blank", "noopener,noreferrer")}
          className="action-token px-10 py-5 flex items-center justify-center gap-3 text-xl font-bold tracking-[0.2em] uppercase rounded-sm"
        >
          <Info className="w-6 h-6" />
          汴河背景
        </button>
      </div>
    </motion.div>
  );
}
