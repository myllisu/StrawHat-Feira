import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Sparkles } from 'lucide-react';

interface FocusTimerWidgetProps {
  onSessionComplete?: (minutes: number) => void;
}

export const FocusTimerWidget: React.FC<FocusTimerWidgetProps> = ({ onSessionComplete }) => {
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // 25 min default Pomodoro
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = useState<number>(25);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (onSessionComplete) onSessionComplete(selectedDuration);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, selectedDuration, onSessionComplete]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectTime = (mins: number) => {
    setIsRunning(false);
    setSelectedDuration(mins);
    setTimeLeft(mins * 60);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedDuration * 60);
  };

  return (
    <div className="cozy-card">
      <div className="card-header-row">
        <div>
          <h2 className="card-title">
            <Coffee size={22} color="var(--coffee-medium)" />
            Sessão de Foco na Cafeteria
          </h2>
          <p className="card-subtitle">Prepare seu café e mantenha o foco para ganhar 🍓</p>
        </div>
      </div>

      <div className="timer-display-box">
        <div style={{ fontSize: '0.9rem', color: '#D7CCC8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={14} color="#FFE082" /> {isRunning ? 'Passando o café... Foco Ativo!' : 'Pronto para começar?'}
        </div>

        <div className="timer-clock">{formatTimer(timeLeft)}</div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[15, 25, 45, 60].map((mins) => (
            <button
              key={mins}
              onClick={() => handleSelectTime(mins)}
              style={{
                background: selectedDuration === mins ? 'var(--primary-strawberry)' : 'rgba(255,255,255,0.15)',
                color: '#FFF',
                padding: '0.3rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 600
              }}
            >
              {mins}m
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
          <button className="btn-primary" onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? (
              <><Pause size={18} /> Pausar</>
            ) : (
              <><Play size={18} /> Iniciar Foco</>
            )}
          </button>
          
          <button className="btn-secondary" onClick={handleReset} title="Reiniciar Timer">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
