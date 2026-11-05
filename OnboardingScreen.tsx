import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, Sprout, ShieldAlert, Coins, Ticket, Clock, Sparkles } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, isModal, onCloseModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Bem-vindo ao StrawHat! 🍓',
      subtitle: 'Transforme seu tempo de foco em uma fazenda próspera',
      icon: <Sprout size={56} color="var(--primary-strawberry)" />,
      content:
        'O StrawHat ajuda você a manter a disciplina digital. Respeitando os limites de redes sociais e sites, sua fazenda virtual floresce e gera morangos valiosos!',
    },
    {
      title: '1. Disciplina & Limites 🛡️',
      subtitle: 'Defina metas diárias para seus aplicativos',
      icon: <ShieldAlert size={56} color="#dd6b20" />,
      content:
        'Cadastre os aplicativos e sites que mais consomem seu tempo. Defina limites específicos para dias úteis e fins de semana e acompanhe seu quadro semanal de progresso.',
    },
    {
      title: '2. Crescimento da Fazenda 🌱',
      subtitle: 'O tempo de foco faz suas plantas evoluírem',
      icon: <Sprout size={56} color="var(--foliage-green)" />,
      content:
        'Sua planta passa por 5 estágios: Broto (6h), Planta (12h), Flor (18h), Fruto Verde (24h) até o Fruto Maduro (36h). Quanto maior a sua sequência de dias disciplinados, maior o bônus de produção (até +20%)!',
    },
    {
      title: '3. Colheita & Inventário 🍓',
      subtitle: 'Morango não vira moeda automaticamente',
      icon: <Coins size={56} color="var(--accent-gold)" />,
      content:
        'Ao colher frutos maduros, você pode tirar morangos Comuns, Grandes, Dourados ou até de Diamante! Guarde-os no inventário e venda quando quiser para acumular moedas.',
    },
    {
      title: '4. Mercado & Lootbox 🎟️',
      subtitle: 'Personalize com novos temas vibrantes',
      icon: <Ticket size={56} color="#805ad5" />,
      content:
        'Use moedas para desbloquear temas visuais como Manga, Melancia, Abacate, Pitaya, Sakura e Café! Abra lootboxes usando bilhetes ou moedas para ganhar prêmios raros.',
    },
    {
      title: '5. Minutos Extras & Tolerância ⏳',
      subtitle: 'Um respiro em dias corridos',
      icon: <Clock size={56} color="#3182ce" />,
      content:
        'Recebeu minutos extras em uma lootbox? Eles têm validade de 7 dias e podem ser usados para evitar penalidades de limite atingido em um momento importante.',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
      if (onCloseModal) onCloseModal();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const current = slides[currentSlide];

  return (
    <div
      className={isModal ? 'modal-overlay' : 'app-container'}
      style={isModal ? {} : { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}
    >
      <div
        className="card"
        style={{
          maxWidth: '580px',
          width: '100%',
          padding: '2.5rem',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>{current.icon}</div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          {current.title}
        </h2>
        <h4 style={{ fontSize: '1rem', color: 'var(--primary-strawberry)', fontWeight: 600, marginBottom: '1.25rem' }}>
          {current.subtitle}
        </h4>

        <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
          {current.content}
        </p>

        {/* Slide Progress Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentSlide === idx ? 'var(--primary-strawberry)' : '#cbd5e0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <button
            className="btn btn-secondary"
            onClick={handlePrev}
            disabled={currentSlide === 0}
            style={{ minWidth: '100px' }}
          >
            <ArrowLeft size={16} /> Anterior
          </button>

          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {currentSlide + 1} de {slides.length}
          </span>

          <button className="btn btn-primary" onClick={handleNext} style={{ minWidth: '120px' }}>
            {currentSlide === slides.length - 1 ? (
              <>
                Começar <CheckCircle2 size={16} />
              </>
            ) : (
              <>
                Próximo <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
