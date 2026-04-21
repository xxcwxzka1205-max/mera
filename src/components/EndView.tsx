import { motion } from "motion/react";
import { Ship, RotateCcw, Download, X } from "lucide-react";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

interface EndViewProps {
  onRestart: () => void;
  integrity: number;
  key?: string;
}

export function EndView({ onRestart, integrity }: EndViewProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generatePoster = async () => {
    if (!posterRef.current) return;
    try {
      setIsGenerating(true);
      const canvas = await html2canvas(posterRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: '#1a1a1a', 
      });
      
      const image = canvas.toDataURL("image/png");
      setGeneratedImage(image);
      
      // Also attempt native download
      try {
        const link = document.createElement("a");
        link.href = image;
        link.download = `汴河船老大_航行海报_${new Date().getTime()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) {
        console.log("Native download failed, bypassing to preview modal.");
      }
    } catch (err) {
      console.error("生成海报失败:", err);
      alert("生成海报失败，请重试！");
    } finally {
      setIsGenerating(false);
    }
  };

  const getTitle = () => {
    if (integrity >= 100) return "优质纲首";
    if (integrity >= 80) return "熟练梢公";
    return "及格船夫";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 text-center mx-auto relative overflow-hidden"
    >
      {/* 
        This is the container we will capture as a poster.
      */}
      <div 
        ref={posterRef}
        className="w-[90vw] md:w-full max-w-[320px] md:max-w-[400px] flex flex-col items-center mb-6 relative border-[10px] md:border-[12px] border-[#3E2914] shadow-2xl overflow-hidden shrink-0"
        style={{
          background: "#E6D5B8",
          aspectRatio: "2 / 3",
          maxHeight: "72vh" // Keep it manageable on screen
        }}
      >
        <img 
          src="https://image.pollinations.ai/prompt/A%20formal%20Song%20Dynasty%20commemorative%20poster.%20A%20magnificent%20traditional%20cargo%20ship%20sailing%20under%20the%20Rainbow%20Bridge.%20Golden%20silk%20background%2C%20large%20red%20wax%20seal%2C%20elegant%20border%20with%20traditional%20wave%20patterns.%20High%20resolution%2C%20masterpiece%2C%20cinematic%20lighting%2C%20historical%20prestige?width=1024&height=1536&nologo=true&seed=99" 
          alt="Poster Background" 
          crossOrigin="anonymous"
          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-40 z-0"
        />
        
        {/* Inner Border */}
        <div 
          className="absolute inset-4 border-2 z-10 pointer-events-none p-2"
          style={{ borderColor: 'rgba(92, 64, 34, 0.8)' }}
        >
            <div 
              className="w-full h-full border"
              style={{ borderColor: 'rgba(92, 64, 34, 0.6)' }}
            ></div>
        </div>

        {/* Content Container */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative z-20 w-full h-full flex flex-col justify-between p-5 md:p-8 overflow-hidden"
        >
          {/* Header */}
          <div className="text-center font-serif text-[#3E2914] shrink-0">
            <Ship className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 opacity-80" strokeWidth={1} />
            <div 
              className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase opacity-60 mb-2 border-b pb-1 inline-block"
              style={{ borderColor: 'rgba(62, 41, 20, 0.3)' }}
            >
              宣和三年 · 清明汴河
            </div>
            <h1 className="text-3xl md:text-4xl font-calligraphy tracking-wider mt-1 px-2 whitespace-nowrap" style={{ writingMode: 'horizontal-tb' }}>
              平安归航
            </h1>
          </div>

          {/* Calligraphy Body */}
          <div className="flex flex-col items-center justify-center flex-1 min-h-0 py-2">
             <div className="flex gap-4 md:gap-6 justify-center items-center h-full font-calligraphy text-xl md:text-3xl text-[#1a1a1a]">
                <div style={{ writingMode: 'vertical-rl', letterSpacing: '2px', borderLeftColor: 'rgba(62, 41, 20, 0.2)' }} className="border-l pl-2 md:pl-3 max-h-full whitespace-nowrap overflow-visible leading-snug shrink-0">
                  一船联百铺
                </div>
                <div style={{ writingMode: 'vertical-rl', letterSpacing: '2px', borderLeftColor: 'rgba(62, 41, 20, 0.2)' }} className="border-l pl-2 md:pl-3 max-h-full whitespace-nowrap overflow-visible leading-snug shrink-0">
                  水上供全城
                </div>
                <div style={{ writingMode: 'vertical-rl', letterSpacing: '2px', borderLeftColor: 'rgba(62, 41, 20, 0.2)' }} className="border-l pl-2 md:pl-3 max-h-full whitespace-nowrap overflow-visible leading-snug text-cinnabar shrink-0">
                  完好度：{integrity}
                </div>
             </div>
          </div>

          {/* Footer - Stamp */}
          <div className="flex justify-between items-end relative shrink-0 mt-1">
             <div 
               className="font-serif text-[10px] md:text-xs tracking-widest font-bold"
               style={{ color: 'rgba(62, 41, 20, 0.7)' }}
             >
               汴河渡船司 结
             </div>
             
             {/* Big Red Seal */}
             <div 
               className="w-16 h-16 md:w-20 md:h-20 border-[2px] border-cinnabar rotate-[-15deg] flex items-center justify-center p-1 opacity-90 mix-blend-multiply backdrop-blur-[1px] shrink-0"
               style={{ backgroundColor: 'rgba(178, 34, 34, 0.05)' }}
             >
               <div className="border border-cinnabar p-1 h-full w-full flex items-center justify-center">
                <span className="text-cinnabar font-calligraphy text-2xl md:text-3xl leading-none whitespace-nowrap">
                  {getTitle()}
                </span>
               </div>
             </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-xl z-20 shrink-0"
      >
        <button
          onClick={generatePoster}
          disabled={isGenerating}
          className="flex-[2] action-token flex justify-center items-center gap-2 px-6 py-4 font-bold tracking-[0.1em] text-base md:text-lg uppercase"
          style={{ background: 'linear-gradient(135deg, #B22222 0%, #8B0000 100%)', color: 'white', borderColor: '#5C4022', boxShadow: 'none' }}
        >
          <Download className="w-5 h-5" /> {isGenerating ? "生成中..." : "保存航行封赏榜"}
        </button>
        <button
          onClick={onRestart}
          className="flex-1 action-token flex justify-center items-center gap-2 px-6 py-4 font-bold tracking-[0.1em] text-base shadow-sm"
        >
          <RotateCcw className="w-5 h-5" /> 卷土重来
        </button>
      </motion.div>

      {/* Fullscreen Overlay for Native Image Saving */}
      {generatedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-full max-h-full flex flex-col items-center">
            <button 
              onClick={() => setGeneratedImage(null)}
              className="absolute -top-12 right-0 md:-right-12 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-white/80 font-serif mb-4 text-sm tracking-widest bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
              👇 长按上方图片 或 右键选择「图片另存为」
            </div>
            <img 
              src={generatedImage} 
              alt="最终封赏海报"
              className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded shadow-2xl border-2 border-[#5C4022]"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
