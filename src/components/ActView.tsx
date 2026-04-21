import { motion, AnimatePresence } from "motion/react";
import { ActData, ActionData } from "../data/story";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, FastForward, X } from "lucide-react";

interface ActViewProps {
  act: ActData;
  onNextAct: () => void;
  onPrevAct: () => void;
  isLastAct: boolean;
  isFirstAct: boolean;
  integrity: number;
  setIntegrity: React.Dispatch<React.SetStateAction<number>>;
  key?: string;
}

export function ActView({ act, onNextAct, onPrevAct, isLastAct, isFirstAct, integrity, setIntegrity }: ActViewProps) {
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());
  const [activePopup, setActivePopup] = useState<ActionData | null>(null);
  const [popupPos, setPopupPos] = useState<'left' | 'center' | 'right'>('center');
  const [shake, setShake] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showCoins, setShowCoins] = useState(false);

  // Act 6 Matching State
  const [selectedCargo, setSelectedCargo] = useState<string | null>(null);

  useEffect(() => {
    setCompletedActions(new Set());
    setActivePopup(null);
    setErrorMsg("");
    setSelectedCargo(null);
  }, [act.id]);

  useEffect(() => {
    if (activePopup) {
      const timer = setTimeout(() => {
        setActivePopup(null);
      }, 3500); // Auto dismiss tooltip after 3.5s
      return () => clearTimeout(timer);
    }
  }, [activePopup]);

  const allCompleted = completedActions.size === act.actions.length;

  const triggerShake = (msg: string) => {
    setErrorMsg(msg);
    setShake(true);
    setIntegrity(prev => Math.max(0, prev - 5));
    setTimeout(() => {
      setShake(false);
      setErrorMsg("");
    }, 2000);
  };


  const handleActionClick = (action: ActionData, e?: React.MouseEvent) => {
    if (e) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const buttonCenter = rect.left + rect.width / 2;
      
      if (buttonCenter < 120) {
        setPopupPos('left');
      } else if (screenWidth - buttonCenter < 120) {
        setPopupPos('right');
      } else {
        setPopupPos('center');
      }
    } else {
      setPopupPos('center');
    }

    // Act 3 specific logic ("辰时" / 虹桥关卡)
    if (act.id === 3) {
      if (action.id === "3-2" && !completedActions.has("3-1")) {
        triggerShake("必须先大喊降桅！");
        return;
      }
    }

    setActivePopup(action);
    setCompletedActions((prev) => {
      const next = new Set(prev);
      next.add(action.id);
      return next;
    });
  };

  const closePopup = () => setActivePopup(null);

  // --- Act 6 Custom Rendering logic (未时 / 结算系统) ---
  const isAct6 = act.id === 6;
  const cargos = act.actions.slice(0, 4); // First 4 actions are deliveries
  const settleAction = act.actions[4]; // 6-5 结算收钱

  const handleCargoSelect = (cargoId: string) => {
    if (completedActions.has(cargoId)) return;
    setSelectedCargo(cargoId);
  };

  const handleShopSelect = (cargoId: string) => {
    if (selectedCargo === cargoId) {
      // Matched!
      handleActionClick(act.actions.find(a => a.id === cargoId)!);
      setSelectedCargo(null);
    } else if (selectedCargo) {
      triggerShake("送错买家了！");
      setSelectedCargo(null);
    }
  };

  const handleSettle = () => {
    setShowCoins(true);
    setTimeout(() => setShowCoins(false), 1500);
    handleActionClick(settleAction);
  };

  return (
    <div className={`min-h-[100dvh] flex flex-col relative justify-center items-center py-6 md:py-12 ${shake ? 'animate-shake' : ''}`}>
      
      {/* 顶部简易状态栏 */}
      <header className="absolute top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-20">
        <div className="flex gap-2 items-center">
          <span className="text-sm font-bold text-ink/60 tracking-widest bg-ink/10 px-2 py-1 backdrop-blur-sm border border-ink/20">船只完好：{integrity}%</span>
        </div>
        <div className="flex gap-1.5 opacity-60">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <div key={num} className={`w-3 h-1 ${num <= act.id ? 'bg-ink' : 'bg-ink/20'}`} />
          ))}
        </div>
      </header>

      {/* Error Message Toast */}
      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-[60px] bg-white text-cinnabar px-6 py-2 font-bold tracking-widest shadow-lg border border-cinnabar z-50 text-sm"
          >
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Diary Open Book Layout */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row relative z-10 px-4 md:px-8 mt-10 mb-16 gap-0">
        
        {/* 书脊阴影 */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none z-20 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]"></div>

        {/* 左页：手绘图 */}
        <motion.div 
          className="w-full md:w-1/2 min-h-[400px] md:min-h-[600px] bg-[#F9F3E6] border-2 border-r-0 md:border-r border-ink/20 p-8 flex flex-col shadow-[-10px_0_20px_rgba(0,0,0,0.02)] relative origin-right"
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex justify-between items-end mb-6 border-b border-ink/10 pb-4">
            <h2 className="font-calligraphy text-5xl md:text-6xl text-ink leading-none">{act.time}</h2>
            <span className="text-xl font-bold tracking-widest text-ink/70">第 {act.id} 篇</span>
          </div>
          
          <div className="flex-1 border p-1 md:p-3 border-ink/10 bg-[#FAF6EE] relative shadow-inner">
            {act.imagePrompt ? (
               <img src={`https://image.pollinations.ai/prompt/${encodeURIComponent(act.imagePrompt)}?width=800&height=800&nologo=true&seed=${act.id + 10}`} alt={act.title} className="w-full h-full object-cover grayscale-[30%] sepia-[20%] contrast-[1.1] opacity-90 mix-blend-multiply" referrerPolicy="no-referrer" />
            ) : (
             <div className="w-full h-full border border-dashed border-ink/20 flex items-center justify-center text-ink/40">插画散失</div>
            )}
            
            {/* 模拟画角印章 */}
            <div className="absolute right-4 bottom-4 w-10 h-10 border border-cinnabar/60 flex items-center justify-center opacity-70">
              <span className="text-cinnabar font-kai text-sm writing-vertical-rl">大宋汴河</span>
            </div>
          </div>
        </motion.div>

        {/* Right Page: Text & Interaction */}
        <motion.div 
          className="w-full md:w-1/2 min-h-[500px] md:min-h-[600px] bg-[#F9F3E6] border-2 border-l-0 md:border-l border-ink/20 p-6 md:p-10 flex flex-col shadow-[10px_0_20px_rgba(0,0,0,0.02)] origin-left relative"
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Watermark/Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex flex-col z-0">
             {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="flex-1 w-full border-b border-red-900"></div>
             ))}
          </div>

          <h3 className="font-bold text-2xl md:text-3xl tracking-widest mb-6 relative z-10">{act.title.split('|')[1]?.trim() || act.title}</h3>
          
          <div className="space-y-4 mb-10 relative z-10 flex-1">
            {act.description.map((paragraph, index) => (
              <p key={index} className="text-lg md:text-xl leading-relaxed text-ink/90 indent-8 font-medium">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Action Area */}
          <div className="relative z-10 mt-auto border-t border-ink/20 pt-6">
            <h4 className="text-sm font-bold tracking-widest text-ink/50 mb-4 uppercase">今日待办事项</h4>
            
            {!isAct6 && (
              <div className="flex flex-wrap gap-3">
                {act.actions.map((action, index) => {
                  const isDone = completedActions.has(action.id);
                  const isActive = activePopup?.id === action.id;
                  const isFirst = popupPos === 'left';
                  const isLast = popupPos === 'right';

                  return (
                    <div key={action.id} className="relative">
                      <button
                        onClick={(e) => handleActionClick(action, e)}
                        disabled={isDone}
                        className={`px-4 py-2 text-base md:text-lg border-b-2 font-bold transition-all ${
                          isDone 
                          ? 'text-ink/30 border-transparent line-through text-shadow-none' 
                          : 'text-cinnabar border-cinnabar hover:bg-cinnabar/5 active:translate-y-1'
                        }`}
                      >
                        {action.label}
                      </button>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            className={`absolute bottom-full mb-2 w-[220px] sm:w-[max-content] sm:max-w-[260px] max-w-[calc(100vw-48px)] bg-[#F5E6D3] text-ink font-kai text-sm leading-relaxed p-3 shadow-xl border border-ink/30 z-[60] ${
                               isFirst ? 'left-0 sm:left-1/2 sm:-translate-x-1/2' 
                               : isLast ? 'right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2'
                               : 'left-1/2 -translate-x-1/2'
                            }`}
                          >
                            {/* Triangle Arrow */}
                            <div className={`absolute top-full border-[6px] border-transparent border-t-[#F5E6D3] z-10 ${
                                isFirst ? 'left-[20px] sm:left-1/2 sm:-translate-x-1/2' 
                                : isLast ? 'right-[20px] sm:right-auto sm:left-1/2 sm:-translate-x-1/2'
                                : 'left-1/2 -translate-x-1/2'
                            }`}></div>
                            <div className={`absolute top-full border-[7px] border-transparent border-t-ink/30 mt-[1px] ${
                                isFirst ? 'left-[19px] sm:left-1/2 sm:-translate-x-1/2' 
                                : isLast ? 'right-[19px] sm:right-auto sm:left-1/2 sm:-translate-x-1/2'
                                : 'left-1/2 -translate-x-1/2'
                            }`}></div>
                            
                            <span className="block text-[10px] font-bold text-cinnabar/80 mb-1 border-b border-ink/10 pb-1 font-sans">船长旁批</span>
                            <span className="text-base font-bold whitespace-normal">{action.popup}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}

            {isAct6 && (
              <div className="bg-[#FAF6EE] border border-ink/20 p-4 relative shadow-sm">
                <div className="text-xs text-ink/60 mb-4 pb-2 border-b border-ink/10 flex justify-between">
                  <span>货单对应账簿</span>
                  <span>点取货物 → 送达对应商铺</span>
                </div>
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {/* Left Column: Cargos */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase text-ink/40 tracking-wider">汴河卸货区</span>
                    {cargos.map((cargo) => {
                      const isDone = completedActions.has(cargo.id);
                      const isSelected = selectedCargo === cargo.id;
                      const isActive = activePopup?.id === cargo.id;

                      return (
                        <div key={'c-' + cargo.id} className="relative">
                          <button
                            onClick={() => handleCargoSelect(cargo.id)}
                            disabled={isDone}
                            className={`w-full text-left px-3 py-2 text-sm font-bold border transition-all ${
                              isDone ? 'opacity-40 border-dashed border-ink/30 line-through' 
                              : isSelected ? 'border-cinnabar bg-cinnabar/10 text-cinnabar shadow-sm scale-[1.02]' 
                              : 'border-ink/20 hover:border-ink/50 text-ink'
                            }`}
                          >
                            {cargo.label.replace('送', '').split('至')[0]}
                          </button>

                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                className="absolute bottom-full left-0 mb-2 w-[200px] max-w-[calc(100vw-32px)] sm:max-w-[220px] bg-[#F5E6D3] text-ink font-kai text-sm leading-relaxed p-3 shadow-xl border border-ink/30 z-[60]"
                              >
                                <div className="absolute top-full left-[20px] border-[6px] border-transparent border-t-[#F5E6D3] z-10"></div>
                                <div className="absolute top-full left-[19px] border-[7px] border-transparent border-t-ink/30 mt-[1px]"></div>
                                <span className="block text-[10px] font-bold text-cinnabar/80 mb-1 border-b border-ink/10 pb-1 font-sans">船长旁批</span>
                                <span className="text-base font-bold whitespace-normal">{cargo.popup}</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}
                  </div>

                  {/* Right Column: Shops */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase text-ink/40 tracking-wider">京城市井商铺</span>
                    {cargos.map((cargo) => {
                      const shopName = cargo.label.split('至')[1];
                      const isDone = completedActions.has(cargo.id);
                      return (
                        <button
                          key={'s-' + cargo.id}
                          onClick={() => handleShopSelect(cargo.id)}
                          className={`w-full text-left px-3 py-2 text-sm font-bold border transition-all bg-white ${
                            selectedCargo ? 'border-cinnabar hover:bg-cinnabar/5 cursor-crosshair' : 'border-ink/10'
                          } ${isDone ? 'opacity-50 border-dashed line-through' : ''}`}
                        >
                          {shopName}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Settle Action */}
                <div className="mt-6 flex justify-end h-10">
                <AnimatePresence>
                  {completedActions.size >= 4 && !completedActions.has(settleAction.id) && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={handleSettle}
                      className="text-white bg-cinnabar px-6 py-1.5 font-bold tracking-widest text-sm shadow-sm hover:bg-red-800"
                    >
                      {settleAction.label}
                    </motion.button>
                  )}
                </AnimatePresence>
                {showCoins && <div className="absolute right-4 bottom-12 animate-coins tracking-widest text-lg font-bold text-cinnabar">收訖 +100贯</div>}
                </div>
              </div>
            )}

            <AnimatePresence>
              {allCompleted && (
                <div className="absolute right-6 -bottom-6 w-32 h-32 md:w-40 md:h-40 z-30 pointer-events-none animate-stamp mix-blend-multiply flex items-center justify-center overflow-hidden">
                    <div className="w-24 h-24 md:w-32 md:h-32 border-[6px] border-cinnabar rounded-md flex items-center justify-center p-2 opacity-90 transform rotate-12">
                      <span className="text-cinnabar font-calligraphy text-6xl md:text-8xl">准</span>
                    </div>
                </div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </div>

      {/* 底部控制台：融入书桌木纹感 */}
      <div className="fixed bottom-0 w-full left-0 bg-[#2b1f14] border-t-2 border-[#1c120a] px-2 sm:px-4 md:px-8 py-3 flex justify-between items-center z-50 text-white/80 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <button 
          onClick={onPrevAct} 
          disabled={isFirstAct}
          className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-sm font-bold tracking-wider sm:tracking-widest transition-colors ${isFirstAct ? 'text-white/20 cursor-not-allowed' : 'hover:text-white'}`}
        >
          <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" /> 翻阅前页
        </button>

        <div className="flex gap-2 sm:gap-4">
          <button 
            onClick={onNextAct} 
            className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-sm font-bold tracking-widest text-[#d45d3c] hover:text-red-400 bg-white/5 py-1.5 px-2 sm:px-4 rounded-sm transition-colors border border-transparent hover:border-[#d45d3c]/50"
          >
            <FastForward className="w-3 h-3 md:w-4 md:h-4" /> 
            <span className="sm:hidden">跳过</span>
            <span className="hidden sm:inline">掠过轶事</span>
          </button>
        </div>

        <button 
          onClick={allCompleted ? onNextAct : () => triggerShake("本页日记尚未画押完成！")} 
          className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs md:text-sm font-bold tracking-wider sm:tracking-widest transition-all py-1.5 px-2 sm:px-4 border ${allCompleted ? 'bg-cinnabar text-white border-transparent hover:bg-red-800' : 'border-white/20 hover:bg-white/10'}`}
        >
          {isLastAct && allCompleted ? "合卷歇息" : "翻阅后页"} <ChevronRight className="w-3 h-3 md:w-4 md:h-4 list-none" />
        </button>
      </div>
    </div>
  );
}
