import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { storyData } from './data/story';
import { HomeView } from './components/HomeView';
import { ActView } from './components/ActView';
import { EndView } from './components/EndView';

type GameState = 'home' | 'playing' | 'end';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('home');
  const [currentActIndex, setCurrentActIndex] = useState(0);
  const [integrity, setIntegrity] = useState(100);

  const startGame = () => {
    setCurrentActIndex(0);
    setIntegrity(100);
    setGameState('playing');
  };

  const restartGame = () => {
    setGameState('home');
  };

  const nextAct = () => {
    if (currentActIndex < storyData.length - 1) {
      setCurrentActIndex((prev) => prev + 1);
    } else {
      setGameState('end');
    }
  };

  const prevAct = () => {
    if (currentActIndex > 0) {
      setCurrentActIndex((prev) => prev - 1);
    }
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-silk z-0">
      <div className="relative z-10 h-full max-w-7xl mx-auto border-x shadow-2xl border-ink/10 shadow-[0_0_50px_rgba(44,44,44,0.1)]">
        <AnimatePresence mode="wait">
          {gameState === 'home' && (
            <HomeView key="home" onStart={startGame} />
          )}
          {gameState === 'playing' && (
            <ActView 
              key={`act-${currentActIndex}`}
              act={storyData[currentActIndex]} 
              onNextAct={nextAct}
              onPrevAct={prevAct}
              isLastAct={currentActIndex === storyData.length - 1}
              isFirstAct={currentActIndex === 0}
              integrity={integrity}
              setIntegrity={setIntegrity}
            />
          )}
          {gameState === 'end' && (
            <EndView key="end" onRestart={restartGame} integrity={integrity} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

